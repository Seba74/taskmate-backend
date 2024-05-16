<!-- Create a readme to explain how to run the project -->

# Taskmate - Backend

Back end para la aplicación Taskmate

## Requisitos Previos

- [Node.js](https://nodejs.org/) (21+ - preferible LTS)
- [pnpm](https://pnpm.io/) - podes usar el siguiente comando:
  `npm i -g pnpm`
- [Docker](https://www.docker.com/products/docker-desktop/)

## Configuración Inicial

### Configuración en Windows

- Ingresa a la powershell como administrator y ejecuta el siguiente comando
  `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Agregar Typescript de forma global

- `npm i -g typescript`

### Clonar el Repositorio

- `git clone git@github.com:Seba74/taskmate-backend.git`

### Instalar Dependencias

- `pnpm i`

### Crear Contenedor

- Una vez corriendo Docker desktop, desde la terminal del proyecto:
  `docker compose up`

### Migrar base de datos a Taskmate_db

- `docker exec -it taskmate_backend npx prisma migrate dev --name init`
