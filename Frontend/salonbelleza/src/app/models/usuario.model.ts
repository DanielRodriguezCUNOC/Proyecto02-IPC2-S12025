// usuario.model.ts
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'administrador' | 'empleado' | 'cliente' | 'marketing';
  estado: 'activo' | 'inactivo';
  fechaRegistro: Date;
  ultimoAcceso?: Date;
  // Campos específicos por rol
  especialidad?: string; // Para empleados
  dpi?: string; // Para clientes
}
