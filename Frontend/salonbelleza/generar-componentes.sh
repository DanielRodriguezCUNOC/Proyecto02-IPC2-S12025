#!/bin/bash

# Módulos
ng generate module citas
ng generate module marketing
ng generate module servicios
ng generate module empleados
ng generate module clientes
ng generate module administracion
ng generate module shared
ng generate module auth

# Componentes compartidos
ng generate component shared/navbar
ng generate component shared/footer
ng generate component shared/sidebar
ng generate component shared/loading-spinner
ng generate component shared/alert
ng generate component shared/modal
ng generate component shared/pdf-viewer

# Componentes de autenticación
ng generate component auth/login
ng generate component auth/register
ng generate component auth/profile

# Componentes de citas
ng generate component citas/cita-list
ng generate component citas/cita-form
ng generate component citas/cita-detail
ng generate component citas/calendario-disponibilidad

# Componentes de marketing
ng generate component marketing/anuncio-list
ng generate component marketing/anuncio-form
ng generate component marketing/anuncio-display

# Componentes de servicios
ng generate component servicios/servicio-list
ng generate component servicios/servicio-detail
ng generate component servicios/catalogo-servicios

# Componentes de empleados
ng generate component empleados/empleado-list
ng generate component empleados/empleado-profile
ng generate component empleados/empleado-agenda

# Componentes de clientes
ng generate component clientes/historial-citas
ng generate component clientes/facturas
ng generate component clientes/lista-negra

# Componentes de administración
ng generate component administracion/dashboard
ng generate component administracion/gestion-usuarios
ng generate component administracion/reportes
ng generate component administracion/configuracion-horario

# Servicios
ng generate service auth/auth
ng generate service citas/cita
ng generate service marketing/anuncio
ng generate service servicios/servicio
ng generate service empleados/empleado
ng generate service clientes/cliente
ng generate service administracion/admin
ng generate service shared/reportes

# Guards
ng generate guard auth/auth
ng generate guard auth/admin