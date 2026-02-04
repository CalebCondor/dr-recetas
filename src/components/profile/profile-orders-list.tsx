"use client";

import {
  Package,
  Loader2,
  ChevronRight,
  FileText,
  Download,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/services/types/types";

interface ProfileOrdersListProps {
  orders: Order[];
  isLoadingOrders: boolean;
  onViewServices: () => void;
  expandedOrderId: string | null;
  setExpandedOrderId: (id: string | null) => void;
}

export function ProfileOrdersList({
  orders,
  isLoadingOrders,
  onViewServices,
  expandedOrderId,
  setExpandedOrderId,
}: ProfileOrdersListProps) {
  // Helper to extract nested or prefixed fields from API responses
  const getOrderField = (
    order: Record<string, unknown>,
    field: string,
  ): unknown => {
    if (!order) return "";

    if (field === "id") return order.cp_code || order.cp_id || order.id || "";
    if (field === "estado") return order.cp_est || order.estado || "Procesando";
    if (field === "fecha") return order.cp_fecha || order.fecha || "";
    if (field === "titulo" || field === "nombre")
      return order.pq_titulo || order.titulo || order.nombre || "Pedido";
    if (field === "total") return order.total || order.monto || "0";

    const val = order[field];
    if (val !== undefined) return val;

    const prefixes = ["or_", "tr_", "ord_", "pq_", "cp_"];
    for (const p of prefixes) {
      const prefixedVal = order[p + field];
      if (prefixedVal !== undefined) return prefixedVal;
    }

    return order[field] || "";
  };

  if (isLoadingOrders) {
    return (
      <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 border border-slate-100 shadow-sm">
        <Loader2 className="w-8 h-8 text-[#0D4B4D] animate-spin" />
        <p className="text-slate-400 font-bold tracking-tight">
          Cargando tus pedidos...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-6 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
          <Package className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Aún no tienes órdenes
          </h3>
          <p className="text-slate-500 max-w-sm font-medium text-sm leading-relaxed">
            Parece que todavía no has realizado ninguna compra. ¡Explora
            nuestros servicios y comienza hoy!
          </p>
        </div>
        <Button
          onClick={onViewServices}
          className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-[#0D4B4D]/20 transition-all active:scale-95 h-auto text-sm"
        >
          Explorar Servicios
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
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
            className={`border-none transition-all duration-300 rounded-[2rem] overflow-hidden ${
              isExpanded
                ? "ring-2 ring-[#0D4B4D] shadow-2xl shadow-[#0D4B4D]/10 translate-y-[-2px]"
                : "shadow-lg shadow-slate-200/60 hover:shadow-xl hover:shadow-slate-200/80 hover:translate-y-[-2px]"
            }`}
          >
            <CardContent className="p-0">
              <button
                className="w-full text-left flex flex-col p-5 md:p-7 gap-5 transition-colors hover:bg-slate-50/50"
                onClick={() => setExpandedOrderId(isExpanded ? null : uniqueId)}
              >
                {/* Header Row - Status & ID */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                        isExpanded
                          ? "bg-[#0D4B4D] text-white"
                          : "bg-slate-100 text-[#0D4B4D]"
                      }`}
                    >
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        Orden ID
                      </span>
                      <span className="text-sm font-bold text-slate-900 leading-none">
                        #{orderId}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase border-none tracking-wider ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100"
                        : "bg-amber-50 text-amber-600 shadow-sm shadow-amber-100"
                    }`}
                  >
                    {status || "En Proceso"}
                  </Badge>
                </div>

                {/* Body - Title & Date */}
                <div className="space-y-2">
                  <h4 className="text-lg md:text-xl font-extrabold text-[#0D4B4D] leading-tight tracking-tight">
                    {String(
                      getOrderField(order, "titulo") ||
                        getOrderField(order, "nombre") ||
                        "Pedido Sin Nombre",
                    )}
                  </h4>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1.5 bg-slate-100/50 px-2 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold leading-none">
                        {(() => {
                          const rawDate = getOrderField(
                            order,
                            "fecha",
                          ) as string;
                          if (!rawDate) return "N/A";
                          if (rawDate.includes("/")) return rawDate;
                          const date = new Date(rawDate);
                          return isNaN(date.getTime())
                            ? rawDate
                            : date.toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              });
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer - Interactions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      {isPaid ? "Listo para descargar" : "Pendiente de pago"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D4B4D] group">
                    <span className="text-xs font-bold transition-transform group-hover:translate-x-1">
                      {isExpanded ? "Cerrar detalles" : "Ver detalles"}
                    </span>
                    <div
                      className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="bg-slate-50/80 border-t border-slate-100 p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Main Order Result */}
                    <div className="space-y-4">
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D4B4D]" />
                        Documentación Principal
                      </h5>
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-[#0D4B4D] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <Button
                          asChild
                          className="relative w-full bg-white hover:bg-emerald-50 text-[#0D4B4D] border border-emerald-100/50 h-auto py-5 px-6 rounded-2xl justify-between shadow-sm transition-all"
                        >
                          <a
                            href={order.url_orden}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-200">
                                <Download className="w-5 h-5" />
                              </div>
                              <div className="text-left space-y-0.5">
                                <p className="font-bold text-sm">
                                  Orden Médica PDF
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                  Validación Oficial Dr.Recetas
                                </p>
                              </div>
                            </span>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Results per item */}
                    {order.url_paquetes && order.url_paquetes.length > 0 && (
                      <div className="space-y-4">
                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0D4B4D]" />
                          Resultados Específicos ({order.url_paquetes.length})
                        </h5>
                        <div className="grid grid-cols-1 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                          {order.url_paquetes.map((pkg, pIdx) => (
                            <Button
                              key={`pkg-${pIdx}`}
                              asChild
                              variant="outline"
                              className="w-full hover:border-[#0D4B4D]/30 hover:bg-[#0D4B4D]/5 text-slate-700 h-auto py-4 px-5 rounded-xl justify-between group border-slate-100 bg-white shadow-sm transition-all"
                            >
                              <a
                                href={pkg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="flex items-center gap-4 truncate max-w-[85%]">
                                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#0D4B4D]/10 group-hover:text-[#0D4B4D] transition-colors">
                                    <FileText className="w-4 h-4" />
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
  );
}
