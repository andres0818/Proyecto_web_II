# 📦 EduLend Inventory

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![FastAPI](https://img.shields.io/badge/FastAPI-Analytics-009688?logo=fastapi)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**EduLend Inventory** es una solución integral y moderna para la gestión de inventarios y control de préstamos. Diseñada para instituciones educativas o empresas que requieren un seguimiento riguroso de sus activos, combinando una interfaz de usuario fluida con análisis de datos avanzado.

---

## ✨ Características Principales

- 🔐 **Autenticación Segura:** Sistema de login y registro con roles de usuario.
- 📦 **Gestión de Inventario:** Control total sobre artículos, stock disponible y estado de los productos.
- 🤝 **Sistema de Préstamos:** Registro detallado de quién tiene qué y cuándo debe devolverlo.
- 📊 **Dashboard Analítico:** Visualizaciones interactivas (Recharts) potenciadas por un motor de análisis en Python (FastAPI + Pandas).
- 🏷️ **Categorización:** Organización lógica de artículos para búsquedas rápidas.
- 📱 **Diseño Responsivo:** Interfaz adaptada para trabajar desde cualquier dispositivo.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + Vite + React Router 7.
- **Estilos:** CSS3 Moderno con variables y Flexbox/Grid.
- **Gráficos:** Recharts para visualización de datos.
- **Backend Analítico:** Python FastAPI + Pandas (integrado mediante `AnalyticsService`).
- **Base de Datos:** Prisma ORM (PostgreSQL).

---

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Requisitos Previos
- Node.js (v20 o superior recomendado)
- npm o yarn

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/andres0818/Proyecto_web_II.git
   cd Proyecto_web_II
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env` en la raíz con las siguientes variables (ajusta según tus servicios):
   ```env
   VITE_API_BASE_URL=https://tu-api-principal.com/api
   VITE_API_TOKEN=tu-token-seguro
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173/Proyecto_web_II/`

---

## 📖 Guía de Uso

### 1. Registro e Inicio de Sesión
Accede a la pantalla de Login. Si no tienes cuenta, dirígete a **Register**. El sistema cuenta con una animación interactiva (Yeti) que reacciona a tus acciones.

### 2. Gestión de Inventario
En la sección **Inventory**, puedes visualizar todos los artículos. Podrás ver el stock total, el disponible y aquellos que están dañados.

### 3. Realizar Préstamos
En la sección **Loans**, selecciona el artículo y el usuario para registrar un nuevo préstamo. El sistema calculará automáticamente las fechas de entrega.

### 4. Análisis de Datos (Analytics)
Visita la pestaña **Analytics** para ver el estado real de tu operación:
- **KPIs:** Resumen rápido de stock y alertas.
- **Gráfico de Barras:** Artículos más solicitados.
- **Distribución:** Qué categorías dominan tu inventario.
- **Tendencias:** Compara préstamos vs devoluciones en el tiempo.

---

## 🌐 Despliegue

El proyecto está configurado para desplegarse automáticamente en **GitHub Pages** mediante GitHub Actions.

- **URL de Producción:** [https://andres0818.github.io/Proyecto_web_II/](https://andres0818.github.io/Proyecto_web_II/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---
Desarrollado con ❤️ para la gestión eficiente de activos.
