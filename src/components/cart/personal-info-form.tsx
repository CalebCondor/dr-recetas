import React, { useState, useEffect } from "react";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCloseLine,
} from "react-icons/ri";
import { FileText, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useTranslations } from "next-intl";
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
  setFormData: (data: CartFormData | ((prev: CartFormData) => CartFormData)) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const PersonalInfoForm = ({
  formData,
  setFormData,
  onBack,
  onContinue,
}: PersonalInfoFormProps) => {
  const t = useTranslations("Cart.Personal");
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
  const [previewMode, setPreviewMode] = useState<"local" | "remote">("local");

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

        const parsedUser = JSON.parse(storedUser);
        const { token } = parsedUser;

        // Normalize date to YYYY-MM-DD for <input type="date" />
        const normalizeDate = (dateStr: string | undefined | null): string => {
          if (!dateStr || typeof dateStr !== "string") return "";
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
          if (dateStr.includes("/")) {
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              const day = parts[0].padStart(2, "0");
              const month = parts[1].padStart(2, "0");
              const year = parts[2].length === 4 ? parts[2] : `20${parts[2]}`;
              return `${year}-${month}-${day}`;
            }
          }
          if (dateStr.includes(" ")) {
            const datePart = dateStr.split(" ")[0];
            if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return datePart;
          }
          return dateStr;
        };

        const [perfilRes, uploadsRes] = await Promise.all([
          fetch("https://doctorrecetas.com/api/perfil.php", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://doctorrecetas.com/api/ver_uploads.php", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        let profileData: Record<string, string> = {};
        if (perfilRes.ok) {
          const perfilJson = await perfilRes.json();
          if (perfilJson.success && perfilJson.data) {
            profileData = perfilJson.data;
            // Update localStorage with fresh data
            localStorage.setItem(
              "dr_user",
              JSON.stringify({ ...parsedUser, ...profileData }),
            );
          }
        }

        setFormData((prev) => ({
          ...prev,
          nombre_completo:
            profileData.us_nombres || parsedUser.us_nombres || prev.nombre_completo || "",
          email:
            profileData.us_email || parsedUser.us_email || prev.email || "",
          telefono:
            profileData.us_telefono || parsedUser.us_telefono || prev.telefono || "",
          fecha_nacimiento:
            normalizeDate(profileData.us_fech_nac || parsedUser.us_fech_nac) ||
            prev.fecha_nacimiento,
          municipio:
            profileData.us_ciudad || parsedUser.us_ciudad || prev.municipio || "",
          pais:
            profileData.us_pais || parsedUser.us_pais || prev.pais || "Puerto Rico",
          direccion:
            profileData.us_direccion || parsedUser.us_direccion || prev.direccion || "",
          codigo_postal:
            profileData.us_code_postal || parsedUser.us_code_postal || prev.codigo_postal || "",
        }));

        // --- ver_uploads.php: documento number + existing file ---
        if (uploadsRes.ok) {
          const uploadsJson = await uploadsRes.json();
          if (uploadsJson.success && uploadsJson.data) {
            const { usuario, archivo, archivo_existe } = uploadsJson.data;

            if (usuario) {
              const rawDocType = usuario.us_tipo_doc || usuario.num_id_tipo || "";
              const normalizeDocType = (val: string): string => {
                if (val === "Licencia" || val === "Licencia de Conducir") return "Licencia de Conducir";
                if (val === "Pasaporte") return "Pasaporte";
                return val;
              };
              setFormData((prev) => ({
                ...prev,
                numero_documento:
                  prev.numero_documento ||
                  usuario.us_documento ||
                  usuario.num_id ||
                  "",
                tipo_documento:
                  prev.tipo_documento ||
                  normalizeDocType(rawDocType) ||
                  "Licencia de Conducir",
              }));
            }

            if (archivo_existe && archivo) {
              setExistingUpload({
                url: archivo.url,
                nombre: archivo.nombre,
                tamano_legible: archivo.tamano_legible,
                tipo: archivo.tipo,
              });
            }
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
            {t("form.patient")}
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
            placeholder={t("form.patientPlaceholder")}
          />
        </div>
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            {t("form.birthDate")}
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full h-12 rounded-xl bg-white border-slate-200 justify-start font-normal"
              >
                {date ? date.toLocaleDateString() : t("form.birthDatePlaceholder")}
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
            {t("form.country")}
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
            {t("form.municipality")}
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
            placeholder={t("form.municipalityPlaceholder")}
          />
        </div>
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            {t("form.email")}
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
            placeholder={t("form.emailPlaceholder")}
          />
        </div>
      </div>
    );
  };

  const renderAddressInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="space-y-2 lg:col-span-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
          {t("form.address")}
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
          placeholder={t("form.addressPlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
          {t("form.zipCode")}
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
          placeholder={t("form.zipCodePlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
          {t("form.phone")}
        </label>
        <Input
          value={formData.telefono}
          onChange={(e) =>
            setFormData({ ...formData, telefono: e.target.value })
          }
          className="h-12 rounded-xl bg-white border-slate-200"
          placeholder={t("form.phonePlaceholder")}
        />
      </div>
    </div>
  );

  const renderIdentification = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            {t("form.idType")}
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
                {t("idTypes.license")}
              </SelectItem>
              <SelectItem value="Pasaporte">{t("idTypes.passport")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
            {t("form.idNumber")}
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
            placeholder={t("form.idNumberPlaceholder")}
          />
        </div>
      </div>

      {/* Show loading state */}
      {isLoadingData ? (
        <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-[#0D4B4D] animate-spin" />
          </div>
          <p className="text-sm text-slate-400">{t("form.uploadLoading")}</p>
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 transition-all hover:bg-slate-50/50 hover:border-[#0D4B4D]/30 group">
          {formData.identificacion_archivo || existingUpload ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                {formData.identificacion_archivo ? (
                  formData.identificacion_archivo.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(formData.identificacion_archivo)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onLoad={(e) =>
                        URL.revokeObjectURL((e.target as HTMLImageElement).src)
                      }
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-slate-400" />
                  )
                ) : existingUpload ? (
                  existingUpload.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ||
                    existingUpload.tipo.startsWith("image/") ? (
                    <img
                      src={existingUpload.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-slate-400" />
                  )
                ) : null}
              </div>

              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <p className="font-bold text-slate-700 truncate text-sm">
                  {formData.identificacion_archivo
                    ? formData.identificacion_archivo.name
                    : existingUpload?.nombre || "Archivo actual"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formData.identificacion_archivo
                    ? `${(formData.identificacion_archivo.size / 1024).toFixed(1)} KB`
                    : existingUpload?.tamano_legible || "Documento guardado"}
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/png,image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (!["image/png", "image/jpeg"].includes(file.type)) {
                        toast.error("Solo se permiten archivos PNG o JPEG");
                        e.target.value = "";
                        return;
                      }
                      setFormData({
                        ...formData,
                        identificacion_archivo: file,
                      });
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("profile-upload")?.click()
                  }
                  className="h-9 px-3 rounded-lg text-xs font-bold border-slate-200 text-slate-600 hover:text-[#0D4B4D] hover:bg-white"
                >
                  {t("form.uploadChange")}
                </Button>
                {(formData.identificacion_archivo || existingUpload) && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        identificacion_archivo: null,
                      });
                    }}
                    className="h-9 w-9 p-0 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-5 h-5 text-[#0D4B4D]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-700">
                  {t("form.uploadId")}
                </p>
                <p className="text-xs text-slate-400">
                  {t("form.uploadHint")}
                </p>
              </div>
              <input
                type="file"
                id="profile-upload-new"
                className="hidden"
                accept="image/png,image/jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (!["image/png", "image/jpeg"].includes(file.type)) {
                      toast.error("Solo se permiten archivos PNG o JPEG");
                      e.target.value = "";
                      return;
                    }
                    setFormData({ ...formData, identificacion_archivo: file });
                  }
                }}
              />
              <Button
                type="button"
                onClick={() =>
                  document.getElementById("profile-upload-new")?.click()
                }
                variant="outline"
                className="h-9 rounded-lg border-[#0D4B4D]/20 text-[#0D4B4D] hover:bg-[#0D4B4D] hover:text-white font-bold text-xs"
              >
                {t("form.uploadButton")}
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 italic">
        <p className="text-[11px] text-orange-600 leading-relaxed">
          {t("form.backToSchoolHint")}
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
            {t("title")}
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
                    {t("steps.step", { current: subStep, total: totalSubSteps })}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D4B4D]">
                    {subStep === 1 && t("steps.basic")}
                    {subStep === 2 && t("steps.contact")}
                    {subStep === 3 && t("steps.id")}
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
                {t("navigation.back")}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setSubStep((s) => s - 1)}
                className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12 order-2 sm:order-1"
              >
                <RiArrowLeftLine className="mr-2" /> {t("navigation.previous")}
              </Button>
            )}

            {!isMobile || subStep === totalSubSteps ? (
              <Button
                onClick={onContinue}
                className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10 order-1 sm:order-2"
              >
                {t("navigation.continue")}
              </Button>
            ) : (
              <Button
                onClick={() => setSubStep((s) => s + 1)}
                className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10 order-1 sm:order-2"
              >
                {t("navigation.next")} <RiArrowRightLine className="ml-2" />
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
              {previewMode === "local" ? (
                <>
                  <p className="font-bold text-slate-700 truncate pr-12">
                    {formData.identificacion_archivo?.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formData.identificacion_archivo &&
                      (formData.identificacion_archivo.size / 1024).toFixed(1)}
                    KB
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-700 truncate pr-12">
                    {existingUpload?.nombre}
                  </p>
                  <p className="text-xs text-slate-400">
                    {existingUpload?.tamano_legible}
                  </p>
                </>
              )}
            </div>

            {/* Content */}
            <div
              className="bg-slate-900 flex items-center justify-center"
              style={{ height: "calc(90vh - 120px)" }}
            >
              {previewMode === "local" ? (
                formData.identificacion_archivo?.type === "application/pdf" ? (
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
                )
              ) : (
                // Remote file preview
                existingUpload &&
                (existingUpload.tipo.startsWith("image/") ? (
                  <img
                    src={existingUpload.url}
                    alt={existingUpload.nombre}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={existingUpload.url}
                    className="w-full h-full"
                    title="Remote File Preview"
                  />
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
