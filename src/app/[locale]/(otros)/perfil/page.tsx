"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Package, ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/page-wrapper";
import { ProfileInfoForm } from "@/components/profile/profile-info-form";
import { ProfileOrdersList } from "@/components/profile/profile-orders-list";
import { Order, UserData, ProfileFormData } from "@/services/types/types";
import {
  ProfileTransactionList,
  Transaction,
} from "@/components/profile/profile-transaction-list";

function PerfilContent() {
  const t = useTranslations("Profile.Page");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<ProfileFormData>({
    us_nombres: "",
    us_telefono: "",
    us_email: "",
    us_direccion: "",
    us_ciudad: "",
    us_pais: "",
    us_fech_nac: "",
    us_code_postal: "",
    us_clave: "",
    archivo: null,
    archivo_url: "",
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
            archivo: null,
            archivo_url: profileData.archivo_url || profileData.archivo || "",
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
    setIsLoadingOrders(true);
    try {
      const url = `https://doctorrecetas.com/api/mis_ordenes.php?us_id=${userId}`;

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

  const fetchTransactions = useCallback(async (token: string) => {
    setIsLoadingTransactions(true);
    try {
      const response = await fetch(
        "https://doctorrecetas.com/api/mis_pagos.php",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );


      if (!response.ok) throw new Error("Error fetching transactions");

      const data = await response.json();
      if (data.success && data.data?.pagos) {
        setTransactions(data.data.pagos);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, []);

  // Sincronizar tab con query parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const validTab =
      tabParam === "orders" || tabParam === "info" || tabParam === "history"
        ? tabParam
        : "info";
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
      const token = parsedUser.token;

      if (token) {
        setUser(parsedUser);
        fetchProfile(token);
        fetchOrders(parsedUser.us_id, token);
        fetchTransactions(token);
      } else {
        console.error("User token not found in stored data.");
        router.push("/");
      }
    } catch (e) {
      console.error("Error parsing user data", e);
      router.push("/");
    }
  }, [router, fetchProfile, fetchOrders, fetchTransactions]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdatingProfile(true);

    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        const formDataPayload = new FormData();

        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "archivo" || key === "archivo_url") return;
          if (key === "us_clave" && !value) return; // Skip empty password
          if (value !== undefined && value !== null) {
            formDataPayload.append(key, String(value));
          }
        });

        // Append file if exists
        if (formData.archivo) {
          formDataPayload.append("archivo", formData.archivo);
        }

        const response = await fetch(
          "https://doctorrecetas.com/api/actualizar_perfil.php",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              // Content-Type header is set automatically with FormData
            },
            body: formDataPayload,
          },
        );

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Failed to parse response:", text);
        }

        if (!response.ok) {
          const errorMessage =
            data?.message || t("errors.serverError", { status: response.status });
          throw new Error(errorMessage);
        }

        if (!data) {
          throw new Error(t("errors.emptyResponse"));
        }

        if (data.success) {
          // Update local state and storage
          const updatedUser = {
            ...user,
            ...formData,
            ...(data.data?.usuario || {}),
          };

          localStorage.setItem("dr_user", JSON.stringify(updatedUser));
          setUser(updatedUser);

          // Also update `archivo_url` in form data if returned
          if (data.data?.usuario?.archivo_url) {
            setFormData((prev) => ({
              ...prev,
              archivo_url: data.data.usuario.archivo_url,
              archivo: null,
            }));
          }

          resolve(data);
        } else {
          reject(new Error(data.message || t("errors.updateError")));
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(updatePromise, {
      loading: t("toast.updating"),
      success: t("toast.success"),
      error: (err: Error) => err.message || t("toast.error"),
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
            {t("loading")}
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
                    {t("verifiedUser")}
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
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <TabsList className="bg-slate-100/80 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200/50 h-auto gap-1 w-full sm:w-auto grid grid-cols-3 sm:flex">
                <TabsTrigger
                  value="info"
                  className="rounded-lg sm:rounded-xl px-2 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-1.5 sm:gap-2 flex items-center justify-center"
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="sm:hidden">{t("tabs.infoShort")}</span>
                  <span className="hidden sm:inline">{t("tabs.info")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="rounded-lg sm:rounded-xl px-2 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-1.5 sm:gap-2 flex items-center justify-center"
                >
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="sm:hidden">{t("tabs.ordersShort")}</span>
                  <span className="hidden sm:inline">{t("tabs.orders")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-lg sm:rounded-xl px-2 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-1.5 sm:gap-2 flex items-center justify-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="sm:hidden">{t("tabs.historyShort")}</span>
                  <span className="hidden sm:inline">{t("tabs.history")}</span>
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

            <TabsContent value="history" className="mt-0 outline-none">
              <ProfileTransactionList
                transactions={transactions}
                isLoading={isLoadingTransactions}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
}

export default function PerfilPage() {
  const t = useTranslations("Profile.Page");
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-[#0D4B4D] animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse">
              {t("suspenseLoading")}
            </p>
          </div>
        </div>
      }
    >
      <PerfilContent />
    </Suspense>
  );
}
