export interface Factura {
  id: number;
  numero: string;
  fechaEmision: Date;
  total: number;
  detalles: DetalleFactura[];
}

export interface DetalleFactura {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
