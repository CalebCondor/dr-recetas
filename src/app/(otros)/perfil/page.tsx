"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Globe,
  Hash,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Loader2,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PageWrapper } from "@/components/page-wrapper";

interface Order {
  cp_id: string;
  cp_code: string;
  cp_est: string;
  cp_fecha: string;
  pq_titulo: string;
  url_orden: string;
  url_paquetes?: { titulo: string; url: string }[];
  [key: string]: unknown;
}

interface UserData {
  us_id: string;
  us_nombres: string;
  us_email?: string;
  us_telefono?: string;
  us_direccion?: string;
  us_ciudad?: string;
  us_pais?: string;
  us_fech_nac?: string;
  us_code_postal?: string;
  token: string;
  [key: string]: string | number | undefined;
}

export default function PerfilPage() {
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

  // Helper to extract nested or prefixed fields from API responses
  const getOrderField = (
    order: Record<string, unknown>,
    field: string,
  ): unknown => {
    if (!order) return "";

    // Specific mapping for the new data structure provided by user
    if (field === "id") return order.cp_code || order.cp_id || order.id || "";
    if (field === "estado") return order.cp_est || order.estado || "Procesando";
    if (field === "fecha") return order.cp_fecha || order.fecha || "";
    if (field === "titulo" || field === "nombre")
      return order.pq_titulo || order.titulo || order.nombre || "Pedido";
    if (field === "total") return order.total || order.monto || "0";

    const val = order[field];
    if (val !== undefined) return val;

    // Check for common prefixes like or_ (orden), tr_ (transaccion), pq_ (paquete), cp_ (compra)
    const prefixes = ["or_", "tr_", "ord_", "pq_", "cp_"];
    for (const p of prefixes) {
      const prefixedVal = order[p + field];
      if (prefixedVal !== undefined) return prefixedVal;
    }

    return order[field] || "";
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
              <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border-none">
                <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                  <CardTitle className="text-xl font-bold text-[#0D4B4D]">
                    Editar Perfil
                  </CardTitle>
                  <CardDescription className="text-slate-400 font-medium">
                    Mantén tu información actualizada para una mejor
                    experiencia.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nombres */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Nombre y Apellido
                        </label>
                        <Input
                          value={formData.us_nombres}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_nombres: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Correo Electrónico
                        </label>
                        <Input
                          type="email"
                          value={formData.us_email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_email: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="ejemplo@correo.com"
                        />
                      </div>

                      {/* Teléfono */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          Teléfono
                        </label>
                        <Input
                          value={formData.us_telefono}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_telefono: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="+57 300 000 0000"
                        />
                      </div>

                      {/* Fecha Nacimiento */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Fecha de Nacimiento
                        </label>
                        <Input
                          type="date"
                          value={formData.us_fech_nac}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_fech_nac: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                        />
                      </div>

                      {/* Ciudad */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          Ciudad
                        </label>
                        <Input
                          value={formData.us_ciudad}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_ciudad: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="Tu ciudad"
                        />
                      </div>

                      {/* País */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          País
                        </label>
                        <Input
                          value={formData.us_pais}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_pais: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="Tu país"
                        />
                      </div>

                      {/* Dirección */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Dirección
                        </label>
                        <Input
                          value={formData.us_direccion}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_direccion: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="Dirección completa"
                        />
                      </div>

                      {/* Código Postal */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-slate-400" />
                          Código Postal
                        </label>
                        <Input
                          value={formData.us_code_postal}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_code_postal: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="000000"
                        />
                      </div>

                      {/* Clave */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                          Nueva Contraseña (opcional)
                        </label>
                        <Input
                          type="password"
                          value={formData.us_clave}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              us_clave: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 py-6 rounded-2xl font-bold shadow-lg shadow-[#0D4B4D]/20 transition-all active:scale-95 disabled:opacity-70 h-auto"
                      >
                        {isUpdatingProfile ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Guardando...
                          </>
                        ) : (
                          "Guardar Cambios"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-0 outline-none">
              {isLoadingOrders ? (
                <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 border border-slate-100">
                  <Loader2 className="w-8 h-8 text-[#0D4B4D] animate-spin" />
                  <p className="text-slate-500 font-medium tracking-tight">
                    Cargando tus pedidos...
                  </p>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                    <Package className="w-10 h-10 text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      Aún no tienes órdenes
                    </h3>
                    <p className="text-slate-500 max-w-sm font-medium">
                      Parece que todavía no has realizado ninguna compra.
                      ¡Explora nuestros servicios y comienza hoy!
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/servicios")}
                    className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-8 py-4 rounded-xl font-bold"
                  >
                    Ver Servicios
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {orders.map((order, index) => {
                    const orderId = getOrderField(order, "id") as string;
                    const uniqueId = `${orderId}-${index}`;
                    const isExpanded = expandedOrderId === uniqueId;
                    const status = getOrderField(order, "estado") as string;
                    const isPaid =
                      status?.toLowerCase() === "pagado" ||
                      status?.toLowerCase() === "completado";

                    return (
                      <Card
                        key={`order-${uniqueId}`}
                        className={`border-slate-100 transition-all overflow-hidden rounded-2xl shadow-sm hover:shadow-md ${
                          isExpanded
                            ? "ring-2 ring-[#0D4B4D]/20 border-[#0D4B4D]/30 shadow-lg"
                            : "hover:border-[#0D4B4D]/30"
                        }`}
                      >
                        <CardContent className="p-0">
                          <div
                            className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-6 cursor-pointer select-none"
                            onClick={() =>
                              setExpandedOrderId(isExpanded ? null : uniqueId)
                            }
                          >
                            <div
                              className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                isExpanded
                                  ? "bg-[#0D4B4D] text-white"
                                  : "bg-slate-50 text-[#0D4B4D]"
                              }`}
                            >
                              <Package className="w-8 h-8" />
                            </div>

                            <div className="flex-1 space-y-1 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                  Orden #{orderId}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`font-bold ${
                                    isPaid
                                      ? "border-emerald-500/20 text-emerald-600 bg-emerald-50"
                                      : "border-[#0D4B4D]/20 text-[#0D4B4D] bg-[#0D4B4D]/5"
                                  }`}
                                >
                                  {status || "Procesando"}
                                </Badge>
                              </div>
                              <h4 className="text-lg font-bold text-slate-900 line-clamp-1">
                                {String(
                                  getOrderField(order, "titulo") ||
                                    getOrderField(order, "nombre") ||
                                    "Pedido Sin Nombre",
                                )}
                              </h4>
                              <p className="text-sm font-medium text-slate-500">
                                {(() => {
                                  const rawDate = getOrderField(
                                    order,
                                    "fecha",
                                  ) as string;
                                  if (!rawDate) return "Fecha no disponible";
                                  // The API returns DD/MM/YYYY based on the user's snippet "04/08/2025"
                                  // Let's handle it carefully
                                  if (rawDate.includes("/")) {
                                    return rawDate;
                                  }
                                  const date = new Date(rawDate);
                                  return isNaN(date.getTime())
                                    ? rawDate
                                    : date.toLocaleDateString("es-ES", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      });
                                })()}
                              </p>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                              <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                  Estado
                                </p>
                                <p
                                  className={`text-lg font-black ${
                                    isPaid
                                      ? "text-emerald-600"
                                      : "text-[#0D4B4D]"
                                  }`}
                                >
                                  {isPaid ? "Confirmado" : "Pendiente"}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-slate-100"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-[#0D4B4D] rotate-180 transition-transform" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-slate-400" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Order Result */}
                                <div className="space-y-3">
                                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#0D4B4D]" />
                                    Orden General (PDF)
                                  </h5>
                                  <Button
                                    asChild
                                    className="w-full bg-white hover:bg-emerald-50 text-[#0D4B4D] border border-slate-200 h-auto py-4 justify-between group shadow-sm"
                                  >
                                    <a
                                      href={order.url_orden}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-200">
                                          <Download className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                          <p className="font-bold text-sm">
                                            Descargar Orden PDF
                                          </p>
                                          <p className="text-[10px] text-slate-400 font-medium">
                                            Documento oficial de laboratorio
                                          </p>
                                        </div>
                                      </span>
                                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                                    </a>
                                  </Button>
                                </div>

                                {/* Package Specific Items */}
                                {order.url_paquetes &&
                                  order.url_paquetes.length > 0 && (
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Package className="w-4 h-4 text-[#0D4B4D]" />
                                        Resultados por Prueba (
                                        {order.url_paquetes.length})
                                      </h5>
                                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {order.url_paquetes.map((pkg, pIdx) => (
                                          <Button
                                            key={`pkg-${pIdx}`}
                                            asChild
                                            variant="outline"
                                            className="w-full bg-white hover:border-[#0D4B4D]/30 text-slate-700 h-auto py-3 px-4 justify-between group"
                                          >
                                            <a
                                              href={pkg.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <span className="flex items-center gap-3 truncate max-w-[85%]">
                                                <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#0D4B4D]/10 group-hover:text-[#0D4B4D] transition-colors">
                                                  <FileText className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-sm font-bold truncate">
                                                  {pkg.titulo}
                                                </span>
                                              </span>
                                              <Download className="w-4 h-4 text-slate-300 group-hover:text-[#0D4B4D] transition-colors" />
                                            </a>
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
}
