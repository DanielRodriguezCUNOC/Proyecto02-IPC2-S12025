// reporte.model.ts
export interface Reporte {
  id: string;
  nombre: string;
  descripcion: string;
  parametros: ParametroReporte[];
}

export interface ParametroReporte {
  nombre: string;
  tipo: 'fecha' | 'texto' | 'numero' | 'lista';
  requerido: boolean;
  valores?: any[]; // Para tipo lista
}
