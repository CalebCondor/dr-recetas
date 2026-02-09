import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiFileList2Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiSecurePaymentLine,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TransactionItem {
  titulo: string;
  precio: number;
  a_nombre_de: string;
  fecha_servicio: string | null;
}

export interface Transaction {
  cp_code: string;
  fecha: string;
  estado: string;
  metodo: string;
  transaction_id: string | null;
  total: number;
  items: TransactionItem[];
}

interface ProfileTransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function ProfileTransactionList({
  transactions,
  isLoading,
}: ProfileTransactionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-[2.5rem] shadow-sm border border-slate-100/50 p-8">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <RiMoneyDollarCircleLine className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No hay transacciones
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          Aún no has realizado ningún pago. Tu historial de transacciones
          aparecerá aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.cp_code}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden"
        >
          {/* Header de la Transacción */}
          <div
            className="p-5 sm:p-6 cursor-pointer"
            onClick={() => toggleExpand(transaction.cp_code)}
          >
            <div className="flex items-start justify-between gap-4">
              {/* IZQUIERDA: Icono + Info Principal */}
              <div className="flex items-start gap-3 sm:gap-4 overflow-hidden">
                {/* Icono */}
                <div
                  className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl shrink-0 transition-colors
                  ${transaction.estado === "aprobado" ? "bg-emerald-100/50 text-emerald-600" : "bg-red-100/50 text-red-600"}
                `}
                >
                  {transaction.estado === "aprobado" ? (
                    <RiCheckboxCircleLine />
                  ) : (
                    <RiCloseCircleLine />
                  )}
                </div>

                {/* Textos */}
                <div className="flex flex-col gap-1 min-w-0">
                  {/* Fila 1: ID */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-lg truncate leading-tight">
                      {transaction.transaction_id
                        ? `#${transaction.transaction_id}`
                        : "Transacción"}
                    </h3>
                  </div>

                  {/* Fila 2: Fecha • Método */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium leading-tight">
                    <span>
                      {format(new Date(transaction.fecha), "dd MMM yyyy", {
                        locale: es,
                      })}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="capitalize">
                      {transaction.metodo || "Tarjeta"}
                    </span>
                  </div>

                  {/* Fila 3: Badge Status (Visible siempre, compacta) */}
                  <div className="pt-1">
                    <Badge
                      variant={
                        transaction.estado === "aprobado"
                          ? "default"
                          : "destructive"
                      }
                      className="uppercase text-[10px] tracking-wider px-1.5 py-0 h-4 sm:h-5 w-fit"
                    >
                      {transaction.estado}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* DERECHA: Precio + Flecha */}
              <div className="flex flex-col items-end justify-between self-stretch gap-2 pl-2">
                <p className="text-base sm:text-xl font-black text-[#0D4B4D]">
                  ${Number(transaction.total).toFixed(2)}
                </p>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-slate-100 text-slate-400 h-8 w-8 sm:h-10 sm:w-10 mt-auto"
                >
                  {expandedId === transaction.cp_code ? (
                    <RiArrowUpSLine size={20} />
                  ) : (
                    <RiArrowDownSLine size={20} />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Detalles Expandibles */}
          <AnimatePresence>
            {expandedId === transaction.cp_code && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-50 border-t border-slate-100"
              >
                <div className="p-6 pt-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-widest pl-1">
                    <RiFileList2Line className="text-[#0D4B4D]" />
                    Detalle de la Orden
                  </div>

                  <div className="grid gap-3">
                    {transaction.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 mb-1">
                            {item.titulo}
                          </p>
                          <p className="text-slate-500 text-xs font-medium">
                            Paciente:{" "}
                            <span className="text-slate-700">
                              {item.a_nombre_de}
                            </span>
                          </p>
                          {item.fecha_servicio && (
                            <p className="text-slate-400 text-xs mt-1">
                              Servicio: {item.fecha_servicio}
                            </p>
                          )}
                        </div>
                        <div className="font-bold text-[#0D4B4D] bg-emerald-50 px-3 py-1 rounded-lg self-start md:self-center">
                          ${Number(item.precio).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs text-slate-400 font-medium px-1">
                    <span>
                      Código de Referencia:{" "}
                      <span className="font-mono text-slate-600">
                        {transaction.cp_code}
                      </span>
                    </span>
                    {transaction.items.length > 1 && (
                      <span>{transaction.items.length} artículos</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
