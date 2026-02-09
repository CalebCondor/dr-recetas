import React, { useState, useEffect } from "react";
import {
  RiUpload2Line,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiFileImageLine,
  RiFilePdf2Line,
  RiCloseLine,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [open, setOpen] = useState(false);
  const [existingUpload, setExistingUpload] = useState<{
    url: string;
    nombre: string;
    tamano_legible: string;
    tipo: string;
  } | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Create and cleanup file preview URL
  useEffect(() => {
    if (formData.identificacion_archivo) {
      const url = URL.createObjectURL(formData.identificacion_archivo);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFilePreviewUrl(null);
    }
  }, [formData.identificacion_archivo]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch user data and existing uploads from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("dr_user");
        if (!storedUser) {
          setIsLoadingData(false);
          return;
        }

        const { token } = JSON.parse(storedUser);
        const response = await fetch(
          "https://doctorrecetas.com/api/ver_uploads.php",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          console.error("Error fetching user uploads:", response.status);
          setIsLoadingData(false);
          return;
        }

        const data = await response.json();
        console.log("User uploads data:", data);

        if (data.success && data.data) {
          const { usuario, archivo, archivo_existe } = data.data;

          // Pre-fill form with user data if fields are empty
          setFormData({
            ...formData,
            nombre_completo:
              formData.nombre_completo || usuario?.us_nombres || "",
            email: formData.email || usuario?.us_email || "",
            numero_documento:
              formData.numero_documento || usuario?.num_id || "",
            tipo_documento:
              formData.tipo_documento ||
              (usuario?.num_id_tipo === "Licencia"
                ? "Licencia de Conducir"
                : usuario?.num_id_tipo === "Pasaporte"
                  ? "Pasaporte"
                  : formData.tipo_documento),
          });

          // Set existing file upload info if exists
          if (archivo_existe && archivo) {
            setExistingUpload({
              url: archivo.url,
              nombre: archivo.nombre,
              tamano_legible: archivo.tamano_legible,
              tipo: archivo.tipo,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalSubSteps = 3;

  const renderBasicInfo = () => {
    const date = formData.fecha_nacimiento
      ? new Date(formData.fecha_nacimiento)
      : undefined;
    return (
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full h-12 rounded-xl bg-white border-slate-200 justify-start font-normal"
              >
                {date ? date.toLocaleDateString() : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setFormData({
                      ...formData,
                      fecha_nacimiento: selectedDate
                        .toISOString()
                        .split("T")[0],
                    });
                  }
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
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
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            Correo Electrónico
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder="ejemplo@correo.com"
          />
        </div>
      </div>
    );
  };

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

      {/* Show loading state */}
      {isLoadingData ? (
        <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-[#0D4B4D] animate-spin" />
          </div>
          <p className="text-sm text-slate-400">Cargando información...</p>
        </div>
      ) : existingUpload && !formData.identificacion_archivo ? (
        /* Show existing uploaded file */
        <div className="p-8 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200 flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-bl-full -mr-10 -mt-10" />

          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
            <RiCheckLine size={28} />
          </div>

          <div className="space-y-1.5 relative z-10">
            <h4 className="font-black text-emerald-700 text-base">
              ID Ya Registrada
            </h4>
            <p className="text-[11px] text-emerald-600 font-medium max-w-[280px] leading-relaxed">
              Ya tienes una identificación guardada (
              {existingUpload.tamano_legible})
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={existingUpload.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl font-bold h-11 px-6 bg-emerald-100 border border-emerald-200 text-emerald-700 hover:bg-emerald-200 transition-all active:scale-95 shadow-sm text-sm"
            >
              <RiFileImageLine size={18} />
              Ver Archivo
            </a>
            <div className="relative">
              <input
                type="file"
                id="id-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, identificacion_archivo: file });
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("id-upload")?.click()}
                className="rounded-xl font-bold h-11 px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
              >
                Cambiar
              </Button>
            </div>
          </div>
        </div>
      ) : formData.identificacion_archivo ? (
        /* File selected - show preview */
        <div className="p-6 bg-white rounded-3xl border-2 border-emerald-200 flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-10 -mt-10" />

          {/* Preview - clickable to view full */}
          <div className="relative">
            {formData.identificacion_archivo.type === "application/pdf" ? (
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-24 h-24 rounded-2xl bg-red-50 flex flex-col items-center justify-center border-2 border-red-100 hover:bg-red-100 transition-colors cursor-pointer group"
              >
                <RiFilePdf2Line className="text-red-500" size={36} />
                <span className="text-[9px] font-bold text-red-400 mt-1 group-hover:text-red-600">
                  Click para ver
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-emerald-300 transition-all"
              >
                {filePreviewUrl && (
                  <img
                    src={filePreviewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            )}
            {/* Remove button */}
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, identificacion_archivo: null })
              }
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
            >
              <RiCloseLine size={16} />
            </button>
          </div>

          <div className="space-y-1 relative z-10">
            <h4 className="font-black text-emerald-700 text-base">
              Archivo Listo
            </h4>
            <p className="text-[11px] text-emerald-600 font-medium max-w-[280px] leading-relaxed truncate">
              {formData.identificacion_archivo.name}
            </p>
            <p className="text-[10px] text-slate-400">
              {(formData.identificacion_archivo.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <div className="flex gap-3">
            {/* View file button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreviewModal(true)}
              className="rounded-xl font-bold h-11 px-6 bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
            >
              <RiFileImageLine className="mr-2" size={18} />
              Ver Archivo
            </Button>

            {/* Change file */}
            <div className="relative">
              <input
                type="file"
                id="id-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, identificacion_archivo: file });
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("id-upload")?.click()}
                className="rounded-xl font-bold h-11 px-6 bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-all active:scale-95 shadow-sm"
              >
                Cambiar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* New file upload - no file selected */
        <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center text-center gap-4 hover:border-[#0D4B4D]/20 hover:bg-[#0D4B4D]/2 transition-all cursor-pointer group relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#0D4B4D]/2 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

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

          <div className="relative">
            <input
              type="file"
              id="id-upload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, identificacion_archivo: file });
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("id-upload")?.click()}
              className="rounded-xl font-bold h-11 px-8 transition-all active:scale-95 shadow-sm bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            >
              Seleccionar Archivo
            </Button>
          </div>
        </div>
      )}

      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 italic">
        <p className="text-[11px] text-orange-600 leading-relaxed">
          *Si usted está adquiriendo la orden &quot;Back to School&quot;, se
          requiere que suba una imagen o PDF del Certificado Médico.
        </p>
      </div>
    </div>
  );

  return (
    <>
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

      {/* File Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden rounded-2xl">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <RiCloseLine size={24} />
            </button>

            {/* File name header */}
            <div className="bg-slate-100 px-6 py-4 border-b">
              <p className="font-bold text-slate-700 truncate pr-12">
                {formData.identificacion_archivo?.name}
              </p>
              <p className="text-xs text-slate-400">
                {formData.identificacion_archivo &&
                  (formData.identificacion_archivo.size / 1024).toFixed(1)}{" "}
                KB
              </p>
            </div>

            {/* Content */}
            <div
              className="bg-slate-900 flex items-center justify-center"
              style={{ height: "calc(90vh - 120px)" }}
            >
              {formData.identificacion_archivo?.type === "application/pdf" ? (
                <iframe
                  src={filePreviewUrl || undefined}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              ) : (
                filePreviewUrl && (
                  <img
                    src={filePreviewUrl}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                )
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
