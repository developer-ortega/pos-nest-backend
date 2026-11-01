# POS Nest — Sistema de punto de venta

API REST de un sistema de punto de venta (POS) construida con **NestJS** y **TypeScript**, con base de datos **PostgreSQL** (TypeORM) y carga de imágenes a **Cloudinary**. El frontend se desarrollará con **Next.js** en un repositorio aparte.

> Proyecto de práctica **en desarrollo**. Este README se actualiza a medida que avanza.

## Stack

| Capa | Tecnología |
|------|------------|
| Backend | NestJS 12, TypeScript |
| Base de datos | PostgreSQL con TypeORM |
| Imágenes | Cloudinary |
| Frontend | Next.js (repositorio aparte) |
| Pruebas y calidad | Vitest, Oxlint, Prettier |

## Requisitos

- Node.js 22 o superior
- PostgreSQL (local o en Docker)
- Cuenta de [Cloudinary](https://cloudinary.com/) (plan gratuito)

## Cómo ejecutarlo

1. Clonar e instalar:
   ```bash
   git clone https://github.com/developer-ortega/pos-nest.git
   cd pos-nest
   npm install
   ```
   Si npm falla con `Cannot read properties of null (reading 'edgesOut')`, usar `npm install --legacy-peer-deps`.

2. Crear el archivo `.env` a partir del ejemplo y completar los valores:
   ```bash
   cp .env.example .env
   ```

3. Iniciar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

La API queda en `http://localhost:3000`.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto de la API |
| `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME` | Conexión a PostgreSQL |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Credenciales de Cloudinary |

> **Nunca subas el `.env` ni las claves al repositorio.** Solo se versiona `.env.example`, sin valores reales.

## Scripts

```bash
npm run start:dev   # Desarrollo con recarga automática
npm run build       # Compila a /dist
npm run start:prod  # Ejecuta el build
npm run lint        # Oxlint
npm run test        # Pruebas unitarias (Vitest)
npm run test:e2e    # Pruebas end to end
```

## Estado

- [x] Proyecto base con NestJS y TypeScript
- [ ] Conexión a PostgreSQL con TypeORM
- [ ] Módulos de productos, categorías y ventas
- [ ] Carga de imágenes con Cloudinary
- [ ] Frontend con Next.js

## Autor

**Renato Ortega** · [GitHub](https://github.com/developer-ortega) · [LinkedIn](https://www.linkedin.com/in/renato-ortega-dev/)
