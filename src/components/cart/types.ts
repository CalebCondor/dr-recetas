export interface CartFormData {
  nombre_completo: string;
  fecha_nacimiento: string;
  pais: string;
  municipio: string;
  direccion: string;
  apartamento: string;
  codigo_postal: string;
  telefono: string;
  tipo_documento: string;
  numero_documento: string;
  order_names: Record<string, string>;
  payment_method: "ath" | "tarjeta";
}
