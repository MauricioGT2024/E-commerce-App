# Aplicación de E-commerce

Esta es una aplicación de e-commerce simple construida con React, Tailwind CSS y Supabase.

## Características

- Catálogo de Productos
- Carrito de Compras
- Autenticación de Usuario (Registro, Inicio de Sesión)
- Proceso de Pago
- Historial de Pedidos
- Panel de Administración para gestionar productos

## Tecnologías Utilizadas

- React
- Tailwind CSS
- Supabase
- Vite

## Configuración

1. Clona el repositorio.
2. Navega al directorio `ecommerce-app`.
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. **Configuración de Supabase:**
   - Crea un proyecto en Supabase (https://supabase.com/).
   - Ve a `Settings` -> `API` en tu proyecto de Supabase.
   - Copia la `Project URL` y la `anon` `public key`.
   - Crea un archivo `.env` en la raíz del directorio `ecommerce-app` si no existe.
   - Añade tus credenciales al archivo `.env` de la siguiente manera (reemplaza los placeholders):
     ```env
     VITE_SUPABASE_URL=TU_PROJECT_URL
     VITE_SUPABASE_ANON_KEY=TU_ANON_PUBLIC_KEY
     ```
5. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

- `public/`: Archivos estáticos.
- `src/`: Código fuente.
  - `components/`: Componentes reutilizables de React.
  - `pages/`: Componentes de React para las diferentes páginas (Catálogo, Carrito, etc.).
  - `services/`: Archivos de servicio (ej. servicio de productos, cliente de Supabase).
- `index.html`: Archivo HTML principal.
- `package.json`: Dependencias y scripts del proyecto.
- `tailwind.config.js`, `postcss.config.js`: Configuración de Tailwind CSS.
- `vite.config.js`: Configuración de Vite.

