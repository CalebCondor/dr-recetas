"use client";

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
} from "lucide-react";
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
