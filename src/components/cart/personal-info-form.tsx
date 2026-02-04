import React, { useState, useEffect } from "react";
import {
  RiUpload2Line,
  RiArrowRightLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
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
}: PersonalInfoFormProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [subStep, setSubStep] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalSubSteps = 3;

  const renderBasicInfo = () => (
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
    </div>
  );

  const renderAddressInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );

  const renderIdentification = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
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

      <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center text-center gap-4 hover:border-[#0D4B4D]/20 hover:bg-[#0D4B4D]/[0.02] transition-all cursor-pointer group relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0D4B4D]/[0.02] rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#0D4B4D] group-hover:bg-white group-hover:shadow-md transition-all duration-300 border border-slate-100">
          <RiUpload2Line size={28} />
        </div>

        <div className="space-y-1.5 relative z-10">
          <h4 className="font-black text-[#0D4B4D] text-base">
            Foto de Identificación
          </h4>
          <p className="text-[11px] text-slate-400 font-medium max-w-[240px] leading-relaxed">
            Sube una foto clara de tu ID vigente (Licencia o Pasaporte).
            Formatos: JPG, PNG o PDF.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-xl font-bold h-11 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-8 transition-all active:scale-95 shadow-sm"
        >
          Seleccionar Archivo
        </Button>
      </div>

      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 italic">
        <p className="text-[11px] text-orange-600 leading-relaxed">
          *Si usted está adquiriendo la orden &quot;Back to School&quot;, se
          requiere que suba una imagen o PDF del Certificado Médico.
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      key="personal"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="text-center">
        <h1 className="text-3xl font-black text-[#0D4B4D] mb-6">
          Información Personal
        </h1>
        <Stepper current={1} />
      </div>

      <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100">
        <AnimatePresence mode="wait">
          {!isMobile ? (
            <div className="space-y-8">
              {renderBasicInfo()}
              <div className="pt-6 border-t border-slate-200">
                {renderAddressInfo()}
              </div>
              <div className="pt-6 border-t border-slate-200">
                {renderIdentification()}
              </div>
            </div>
          ) : (
            <motion.div
              key={subStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D4B4D]/40">
                  Paso {subStep} de {totalSubSteps}
                </span>
                <h3 className="text-xl font-bold text-[#0D4B4D]">
                  {subStep === 1 && "Datos del Paciente"}
                  {subStep === 2 && "Contacto y Dirección"}
                  {subStep === 3 && "Identificación"}
                </h3>
              </div>
              {subStep === 1 && renderBasicInfo()}
              {subStep === 2 && renderAddressInfo()}
              {subStep === 3 && renderIdentification()}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 mt-8 border-t border-slate-100">
          {!isMobile || subStep === 1 ? (
            <Button
              variant="outline"
              onClick={onBack}
              className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12 order-2 sm:order-1"
            >
              Volver
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setSubStep((s) => s - 1)}
              className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12 order-2 sm:order-1"
            >
              <RiArrowLeftLine className="mr-2" /> Anterior
            </Button>
          )}

          {!isMobile || subStep === totalSubSteps ? (
            <Button
              onClick={onContinue}
              className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10 order-1 sm:order-2"
            >
              Continuar
            </Button>
          ) : (
            <Button
              onClick={() => setSubStep((s) => s + 1)}
              className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10 order-1 sm:order-2"
            >
              Siguiente <RiArrowRightLine className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
