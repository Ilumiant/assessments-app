# Assessments App

Aplicación para crear, asignar y responder assessments: los managers generan evaluaciones para candidatos, los candidatos responden un cuestionario y el manager recibe la notificación.

## Requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL (configurable)

## Instalación
1) Instalar dependencias backend:
	```bash
	composer install
	```
2) Instalar dependencias frontend y compilar assets:
	```bash
	npm install
	npm run build
	```
3) Copiar variables de entorno y ajustar credenciales:
	```bash
	cp .env.example .env
	```
	- Configura `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.
	- Para correos en log: `MAIL_MAILER=log` (se registran en `storage/logs/laravel.log`).

## Migraciones y seeders
1) Generar clave y correr migraciones/seeders:
	```bash
	php artisan key:generate
	php artisan migrate --seed
	```

## Ejecución en desarrollo
1) Levantar backend:
	```bash
	php artisan serve
	```
2) Levantar frontend (Vite):
	```bash
	npm run dev
	```
3) Abrir `http://127.0.0.1:8000`.

## Flujo principal
- Inicias sesión y entras al módulo "Assessments".
- Crear assessment: eliges manager, datos del evaluado y guardas. Se envía correo de acceso al evaluado (registrado en el log si `MAIL_MAILER=log`).
- El evaluado ingresa con el enlace `/assessment/{token}` y responde.
- Al enviar, se marca como completado y se notifica al manager.

## Tecnologías Utilizadas

- **Laravel**: Framework backend principal. Se utilizó para la estructura MVC, gestión de base de datos (Eloquent ORM), autenticación (Fortify), validaciones y lógica de negocio (envío de correos, gestión de assessments).
- **Inertia.js**: Puente entre el backend y el frontend. Permitió construir una Single Page Application (SPA) manteniendo el routing y controladores clásicos de Laravel, pasando datos directamente a las vistas de React sin necesidad de una API REST completa.
- **React**: Librería de frontend. Se usó para renderizar todas las vistas de la aplicación, manejar el estado local de los formularios y la interactividad del usuario.
- **Laravel Starter Kits (UI)**: Se utilizó el [Laravel React Starter Kit](https://laravel.com/starter-kits) como base. Proporcionó el scaffolding inicial, la estructura de autenticación y una colección de componentes de UI reutilizables (basados en Shadcn/Radix) como botones, inputs y layouts, los cuales fueron personalizados para adaptarse al diseño de la aplicación.

## Producción (resumen)
- Ejecutar `npm run build` y configurar un servidor web (Nginx/Apache) apuntando a `public/`.
- Configurar `APP_ENV=production`, `APP_DEBUG=false`, cachés (`php artisan config:cache route:cache view:cache`).
