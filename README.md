# 🧾 InventoryPro

**Sistema de gestión de inventario** desarrollado con **React + Spring Boot + MongoDB**.

---

## Funcionalidades principales

- Registrar productos con validaciones
- Control de stock con filtros y alertas visuales
- Movimientos de inventario (entradas, ajustes, devoluciones)
- Historial detallado de cada movimiento
- Interfaz moderna, responsiva y limpia

---

## Tecnologías utilizadas

| Tecnología       | Descripción                          |
|------------------|--------------------------------------|
| React            | Frontend SPA                         |
| Spring Boot      | Backend REST API                     |
| MongoDB          | Base de datos NoSQL                  |
| Axios            | Comunicación cliente-servidor        |
| Bootstrap        | Estilos y componentes responsivos    |

## Estructura del proyecto


InventoryProject/
│
├── inventory-backend/ # Proyecto Spring Boot
│ └── src/...
│
├── inventory-frontend/ # Proyecto React
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── api/
│ │ └── App.jsx
│ └── package.json
│
└── README.md



## Cómo ejecutar el proyecto

### 🔧 Requisitos

- Java 17 o superior
- Node.js 18+ y npm
- MongoDB en local o nube (puerto 27017 por defecto)

---

### 1. Backend (Spring Boot)
Depende que tipo de maven se tenga instalado

```bash
cd inventory-backend
.\mvnw spring-boot:run o mvn spring-boot:run 
```

### 2. Frontend (React)
```bash
cd inventory-frontend
npm install
npm run dev
```

Luis Fernando Herrera
Estudiante de Ingeniería de Sistemas
Universidad de Antioquia
