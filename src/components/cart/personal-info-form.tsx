import React from "react";
import { RiUpload2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartFormData } from "./types";
import { Stepper } from "./stepper";

interface PersonalInfoFormProps {
  formData: CartFormData;
  setFormData: (data: CartFormData) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const PersonalInfoForm = ({
  formData,
  setFormData,
  onBack,
  onContinue,
}: PersonalInfoFormProps) => (
  <motion.div
    key="personal"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-10"
  >
    <div className="text-center">
      <h2 className="text-3xl font-black text-[#0D4B4D] mb-2">
        Información Personal
      </h2>
      <Stepper current={1} />
    </div>

    <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Paciente
          </label>
          <Input
            value={formData.nombre_completo}
            onChange={(e) =>
              setFormData({
                ...formData,
                nombre_completo: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="Nombre completo"
          />
        </div>
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Fecha Nacimiento
          </label>
          <Input
            type="date"
            value={formData.fecha_nacimiento}
            onChange={(e) =>
              setFormData({
                ...formData,
                fecha_nacimiento: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
          />
        </div>
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            País
          </label>
          <Select
            value={formData.pais}
            onValueChange={(v) => setFormData({ ...formData, pais: v })}
          >
            <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Puerto Rico">Puerto Rico</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Municipio
          </label>
          <Input
            value={formData.municipio}
            onChange={(e) =>
              setFormData({
                ...formData,
                municipio: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="San Juan..."
          />
        </div>
        <div className="space-y-2 lg:col-span-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Dirección Física
          </label>
          <Input
            value={formData.direccion}
            onChange={(e) =>
              setFormData({
                ...formData,
                direccion: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="Calle, Número, Urbanización"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Código Postal
          </label>
          <Input
            value={formData.codigo_postal}
            onChange={(e) =>
              setFormData({
                ...formData,
                codigo_postal: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="00XXX"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Teléfono
          </label>
          <Input
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="787..."
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Tipo de Identificación
          </label>
          <Select
            value={formData.tipo_documento}
            onValueChange={(v) =>
              setFormData({ ...formData, tipo_documento: v })
            }
          >
            <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Licencia de Conducir">
                Licencia de Conducir
              </SelectItem>
              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Número de Documento
          </label>
          <Input
            value={formData.numero_documento}
            onChange={(e) =>
              setFormData({
                ...formData,
                numero_documento: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="XXX-XXX-XXX"
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-bold text-[#0D4B4D] text-sm">
            Foto de Identificación
          </h4>
          <p className="text-[10px] text-slate-400">
            Escanee o suba una foto de su ID vigente.
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl font-bold h-10 border-slate-200 hover:bg-slate-50"
        >
          <RiUpload2Line className="mr-2" /> Seleccionar
        </Button>
      </div>

      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 italic">
        <p className="text-[11px] text-orange-600 leading-relaxed">
          *Si usted está adquiriendo la orden &quot;Back to School&quot;, se
          requiere que suba una imagen o PDF del Certificado Médico.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-8 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={onBack}
          className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12"
        >
          Volver
        </Button>
        <Button
          onClick={onContinue}
          className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10"
        >
          Continuar
        </Button>
      </div>
    </div>
  </motion.div>
);
