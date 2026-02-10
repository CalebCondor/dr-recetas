export interface Order {
  cp_id: string;
  cp_code: string;
  cp_est: string;
  cp_fecha: string;
  pq_titulo: string;
  url_orden: string;
  url_paquetes?: { titulo: string; url: string }[];
  [key: string]: unknown;
}

export interface UserData {
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

export interface ProfileFormData {
  us_nombres: string;
  us_telefono: string;
  us_email: string;
  us_direccion: string;
  us_ciudad: string;
  us_pais: string;
  us_fech_nac: string;
  us_code_postal: string;
  us_clave?: string;
  archivo?: File | null;
  archivo_url?: string;
}
