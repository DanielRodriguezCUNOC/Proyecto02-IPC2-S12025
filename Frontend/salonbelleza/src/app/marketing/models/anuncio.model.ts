export interface Anuncio {
  id?: number;
  titulo: string;
  tipo: 'texto' | 'imagen' | 'video';
  contenido: string; // Para texto o URL de imagen/video
  fechaInicio: string; // formato YYYY-MM-DD
  fechaFin: string;
  diasVigencia: number;
  precio: number;
  intereses: string[]; // Temas de interés para targeting
  estado: 'activo' | 'inactivo' | 'pendiente';
  vecesMostrado: number;
  creadoPor: number; // ID del usuario de marketing
  fechaCreacion?: string;
}
