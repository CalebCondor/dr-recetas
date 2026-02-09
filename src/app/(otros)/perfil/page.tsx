"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Package, ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { PageWrapper } from "@/components/page-wrapper";
import { ProfileInfoForm } from "@/components/profile/profile-info-form";
import { ProfileOrdersList } from "@/components/profile/profile-orders-list";
import { Order, UserData } from "@/services/types/types";

function PerfilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    us_nombres: "",
    us_telefono: "",
    us_email: "",
    us_direccion: "",
    us_ciudad: "",
    us_pais: "",
    us_fech_nac: "",
    us_code_postal: "",
    us_clave: "",
  });

  const fetchProfile = useCallback(async (token: string) => {
    setIsLoadingProfile(true);
    try {
      const response = await fetch("https://doctorrecetas.com/api/perfil.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Profile server returned ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        const data = JSON.parse(text);
        if (data.success && data.data) {
          const profileData = data.data;
          setFormData({
            us_nombres: profileData.us_nombres || "",
            us_telefono: profileData.us_telefono || "",
            us_email: profileData.us_email || "",
            us_direccion: profileData.us_direccion || "",
            us_ciudad: profileData.us_ciudad || "",
            us_pais: profileData.us_pais || "",
            us_fech_nac: profileData.us_fech_nac || "",
            us_code_postal: profileData.us_code_postal || "",
            us_clave: "",
          });

          // Update local storage with latest info
          const storedUser = localStorage.getItem("dr_user");
          const currentStored = storedUser ? JSON.parse(storedUser) : {};
          const updatedUser = { ...currentStored, ...profileData, token };
          setUser(updatedUser);
          localStorage.setItem("dr_user", JSON.stringify(updatedUser));
        }
      } catch (parseError) {
        console.error("Failed to parse profile JSON:", text, parseError);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  const fetchOrders = useCallback(async (userId: string, token: string) => {
    console.log(
      "Fetching orders for userId:",
      userId,
      "Token starts with:",
      token?.substring(0, 10),
    );
    setIsLoadingOrders(true);
    try {
      const url = `https://doctorrecetas.com/api/mis_ordenes.php?us_id=${userId}`;
      console.log("Fetch URL:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const text = await response.text();

      if (!text) {
        console.warn("Empty response received from server");
        setOrders([]);
        return;
      }

      try {
        const data = JSON.parse(text);
        if (data.success) {
          setOrders(data.data || []);
        } else {
          console.warn("Order fetch success was false:", data.message);
          setOrders([]);
        }
      } catch (parseError) {
        console.error("Failed to parse orders JSON:", text, parseError);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  // Sincronizar tab con query parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const validTab =
      tabParam === "orders" || tabParam === "info" ? tabParam : "info";
    setActiveTab(validTab);
  }, [searchParams]);

  // Actualizar URL cuando cambia el tab
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/perfil?tab=${newTab}`);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("dr_user");
    if (!storedUser) {
      router.push("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch latest data
      fetchProfile(parsedUser.token);
      fetchOrders(parsedUser.us_id, parsedUser.token);
    } catch (e) {
      console.error("Error parsing user data", e);
      router.push("/");
    }
  }, [router, fetchProfile, fetchOrders]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdatingProfile(true);

    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        const body: Record<string, string | number | undefined> = {
          ...formData,
        };
        if (!body.us_clave) delete body.us_clave;

        const response = await fetch(
          "https://doctorrecetas.com/api/perfil.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          throw new Error(`Update server returned ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
          throw new Error("Respuesta vacía del servidor");
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error(
            "Failed to parse update profile JSON:",
            text,
            parseError,
          );
          throw new Error("Respuesta del servidor no válida");
        }

        if (data.success) {
          const updatedUser = { ...user, ...formData };
          localStorage.setItem("dr_user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          resolve(data);
        } else {
          reject(new Error(data.message || "Error al actualizar"));
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(updatePromise, {
      loading: "Actualizando tu información...",
      success: "¡Perfil actualizado correctamente!",
      error: (err) => err.message || "No se pudo actualizar el perfil",
    });

    try {
      await updatePromise;
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (!user || (isLoadingProfile && !formData.us_nombres)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#0D4B4D] animate-spin" />
          <p className="text-slate-400 font-bold animate-pulse">
            Cargando perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 md:px-8 lg:px-[8%] flex flex-col items-center">
        <div className="w-full max-w-7xl space-y-12 flex-1">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-[#0D4B4D] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-xl shadow-[#0D4B4D]/20">
                {user.us_nombres.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {user.us_nombres}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-slate-200/50 text-slate-600 border-none px-3 py-1 font-bold"
                  >
                    ID: {user.us_id}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#0D4B4D]" />
                    Usuario Verificado
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center md:justify-start mb-10">
              <TabsList className="bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/50 h-auto gap-1">
                <TabsTrigger
                  value="info"
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-2"
                >
                  <User className="w-4 h-4" />
                  Información
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-2"
                >
                  <Package className="w-4 h-4" />
                  Mis Órdenes
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="info" className="mt-0 outline-none">
              <ProfileInfoForm
                formData={formData}
                setFormData={setFormData}
                isUpdatingProfile={isUpdatingProfile}
                handleUpdateProfile={handleUpdateProfile}
              />
            </TabsContent>

            <TabsContent value="orders" className="mt-0 outline-none">
              <ProfileOrdersList
                orders={orders}
                isLoadingOrders={isLoadingOrders}
                onViewServices={() => router.push("/servicios")}
                expandedOrderId={expandedOrderId}
                setExpandedOrderId={setExpandedOrderId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
}

export default function PerfilPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-[#0D4B4D] animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse">
              Cargando...
            </p>
          </div>
        </div>
      }
    >
      <PerfilContent />
    </Suspense>
  );
}
