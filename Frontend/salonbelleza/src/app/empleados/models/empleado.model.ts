export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidades: number[]; // IDs de servicios que puede realizar
  fotoUrl?: string;
  descripcion?: string;
  horarioTrabajo?: HorarioTrabajo[];
  estado: 'activo' | 'inactivo';
}

export interface HorarioTrabajo {
  diaSemana: number; // 0: Domingo, 1: Lunes, etc.
  horaInicio: string; // formato 'HH:mm'
  horaFin: string;
}
