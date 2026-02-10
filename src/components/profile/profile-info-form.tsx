"use client";

import { useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  MapPin,
  Hash,
  ShieldCheck,
  Loader2,
  Upload,
  X,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProfileFormData } from "@/services/types/types";

interface ProfileInfoFormProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  isUpdatingProfile: boolean;
  handleUpdateProfile: (e: React.FormEvent) => Promise<void>;
}

export function ProfileInfoForm({
  formData,
  setFormData,
  isUpdatingProfile,
  handleUpdateProfile,
}: ProfileInfoFormProps) {
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const storedUser = localStorage.getItem("dr_user");
        if (!storedUser) return;

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

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.archivo_existe) {
            // Only update if we don't have a new file selected and url is different
            if (
              !formData.archivo &&
              formData.archivo_url !== data.data.archivo.url
            ) {
              setFormData({
                ...formData,
                archivo_url: data.data.archivo.url,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };

    fetchUploads();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border-none">
      <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
        <CardTitle className="text-xl font-bold text-[#0D4B4D]">
          Editar Perfil
        </CardTitle>
        <CardDescription className="text-slate-400 font-medium">
          Mantén tu información actualizada para una mejor experiencia.
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

            {/* Archivo Identificación */}
            <div className="space-y-4 md:col-span-2 border-t border-slate-100 pt-6 mt-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Documento de Identificación
              </label>

              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 transition-all hover:bg-slate-50/50 hover:border-[#0D4B4D]/30 group">
                {formData.archivo || formData.archivo_url ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                      {formData.archivo ? (
                        formData.archivo.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(formData.archivo)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onLoad={(e) =>
                              URL.revokeObjectURL(
                                (e.target as HTMLImageElement).src,
                              )
                            }
                          />
                        ) : (
                          <FileText className="w-8 h-8 text-slate-400" />
                        )
                      ) : formData.archivo_url ? (
                        formData.archivo_url.match(
                          /\.(jpg|jpeg|png|gif|webp)$/i,
                        ) ? (
                          <img
                            src={formData.archivo_url}
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
                        {formData.archivo
                          ? formData.archivo.name
                          : "Archivo actual"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formData.archivo
                          ? `${(formData.archivo.size / 1024).toFixed(1)} KB`
                          : "Documento guardado"}
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
                            if (
                              !["image/png", "image/jpeg"].includes(file.type)
                            ) {
                              toast.error(
                                "Solo se permiten archivos PNG o JPEG",
                              );
                              e.target.value = "";
                              return;
                            }
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("El archivo no debe superar los 5MB");
                              e.target.value = "";
                              return;
                            }
                            setFormData({ ...formData, archivo: file });
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
                        Cambiar
                      </Button>
                      {(formData.archivo || formData.archivo_url) && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              archivo: null,
                              archivo_url: "",
                            })
                          }
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
                        Sube tu identificación
                      </p>
                      <p className="text-xs text-slate-400">
                        Formatos: JPG o PNG (Máx 5MB)
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
                          if (
                            !["image/png", "image/jpeg"].includes(file.type)
                          ) {
                            toast.error("Solo se permiten archivos PNG o JPEG");
                            e.target.value = "";
                            return;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("El archivo no debe superar los 5MB");
                            e.target.value = "";
                            return;
                          }
                          setFormData({ ...formData, archivo: file });
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
                      Seleccionar Archivo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isUpdatingProfile}
              className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-5 py-3 rounded-xl font-semibold shadow-md shadow-[#0D4B4D]/20 transition-all active:scale-95 disabled:opacity-70 h-auto"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Actualizar Información"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
