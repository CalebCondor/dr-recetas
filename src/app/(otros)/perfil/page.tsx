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
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "info");
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
      const data = await response.json();
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
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  const fetchOrders = useCallback(async (userId: string, token: string) => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch(
        `https://doctorrecetas.com/api/mis_ordenes.php?us_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log("Orders Raw Data:", data);
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

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
    try {
      const body: Record<string, string | number | undefined> = { ...formData };
      if (!body.us_clave) delete body.us_clave;

      const response = await fetch("https://doctorrecetas.com/api/perfil.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Perfil actualizado correctamente");
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("dr_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        toast.error(data.message || "Error al actualizar el perfil");
      }
    } catch {
      toast.error("Error de conexión al actualizar el perfil");
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
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto mb-8 h-auto flex-wrap">
              <TabsTrigger
                value="info"
                className="rounded-xl px-6 py-3 font-bold text-slate-500 data-[state=active]:bg-[#0D4B4D] data-[state=active]:text-white transition-all gap-2"
              >
                <User className="w-4 h-4" />
                Información Personal
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-xl px-6 py-3 font-bold text-slate-500 data-[state=active]:bg-[#0D4B4D] data-[state=active]:text-white transition-all gap-2"
              >
                <Package className="w-4 h-4" />
                Mis Órdenes
              </TabsTrigger>
            </TabsList>

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
