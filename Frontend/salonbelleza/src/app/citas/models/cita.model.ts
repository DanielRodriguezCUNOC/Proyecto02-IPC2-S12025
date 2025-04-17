export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number; // en minutos
  precio: number;
  imagenUrl?: string;
}

export interface Empleado {
  id: number;
  nombre: string;
  especialidades: number[]; // IDs de servicios
  fotoUrl?: string;
  descripcion?: string;
}

export interface HorarioAtencion {
  diaSemana: number; // 0: Domingo, 1: Lunes, etc.
  horaInicio: string; // formato 'HH:mm'
  horaFin: string;
}

export interface Cita {
  id?: number;
  fecha: string; // formato 'YYYY-MM-DD'
  horaInicio: string; // formato 'HH:mm'
  horaFin: string;
  servicioId: number;
  empleadoId: number;
  clienteId: number;
  estado:
    | 'pendiente'
    | 'confirmada'
    | 'completada'
    | 'cancelada'
    | 'no-presentado';
  notas?: string;
  fechaCreacion?: string;
}
