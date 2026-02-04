"use client";

import {
  Package,
  Loader2,
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  ExternalLink,
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
      <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 border border-slate-100">
        <Loader2 className="w-8 h-8 text-[#0D4B4D] animate-spin" />
        <p className="text-slate-500 font-medium tracking-tight">
          Cargando tus pedidos...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
          <Package className="w-10 h-10 text-slate-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            Aún no tienes órdenes
          </h3>
          <p className="text-slate-500 max-w-sm font-medium">
            Parece que todavía no has realizado ninguna compra. ¡Explora
            nuestros servicios y comienza hoy!
          </p>
        </div>
        <Button
          onClick={onViewServices}
          className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-8 py-4 rounded-xl font-bold"
        >
          Ver Servicios
        </Button>
      </div>
    );
  }

  return (
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
                onClick={() => setExpandedOrderId(isExpanded ? null : uniqueId)}
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
                      const rawDate = getOrderField(order, "fecha") as string;
                      if (!rawDate) return "Fecha no disponible";
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
                        isPaid ? "text-emerald-600" : "text-[#0D4B4D]"
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
                    {order.url_paquetes && order.url_paquetes.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#0D4B4D]" />
                          Resultados por Prueba ({order.url_paquetes.length})
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
  );
}
