export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  duracion: number; // en minutos
  precio: number;
  imagenUrl?: string;
  categoria: string;
  estado: 'activo' | 'inactivo';
  catalogos?: Catalogo[];
}

export interface Catalogo {
  id?: number;
  nombre: string;
  descripcion: string;
  archivoUrl: string; // URL del PDF
  servicioId: number;
}
