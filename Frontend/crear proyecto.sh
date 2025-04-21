#!/bin/bash

# Crear proyecto Angular sin tests, con routing y SCSS
ng new salon-belleza-frontend --routing --style=css --skip-tests

# Verificar que se creó correctamente
cd salon-belleza-frontend || { echo "❌ Error: No se pudo entrar al proyecto"; exit 1; }

# Instalar Tailwind y dependencias
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Configurar Tailwind
cat > tailwind.config.js <<EOL
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Agregar Tailwind a styles.scss
echo -e "@tailwind base;\n@tailwind components;\n@tailwind utilities;" >> src/styles.scss

# Instalar otras dependencias
npm install @angular/material @angular/cdk @angular/animations ngx-toastr pdf-viewer ngx-spinner
npm install date-fns @auth0/angular-jwt

echo "✅ Proyecto Angular creado y dependencias instaladas."
