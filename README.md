# Rimac Challenge

Reto tecnico Rimac, APP para realizar contizaciones de planes de seguros y sugerir planes acorde a su información.
Para completar el reto realice un proceso de 4 etapas:
1. Se realizo instalacion de React utilizando Vite, se configuro e instalo las dependencias necesarias para empezar el desarrollo.
2. Se dividio el proceso en 3 actividades para realizar cada pantalla especificada

   - Se realizo la maqueta y responsive de cada pantalla
   - Se realizo las funcionalidades basicas con informacion de prueba usando mocks
   - Se realizo la integracion de contexto y el uso del storage para conservar la informacion del usuario durante el uso de la app
  
3. Se realizo revision general de diseño y funcionalidad de la APP segun se especifico en el figma, y se aplicaron las correcciones necesarias.
4. Comparti la url publica del proyecto a personas con contexto del area para realizar pruebas de usabilidad.

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Versiones](#versiones)
3. [Uso](#uso)
4. [Dependencias](#dependencias)

# Demo
   [https://rimac.richarenas.dev/](https://rimac.richarenas.dev)

   [https://rimac-challenge-ten.vercel.app/](https://rimac-challenge-ten.vercel.app)

## Instalación
Antes de continuar con la instalacion tener en cuenta lo siguiente:

  - Tener [Node](https://nodejs.org/en) previamente instalado en el sistema
  - Tener [Git](https://git-scm.com/) previamente instalado en el sistema
  - Tener en cuenta las [versiones](#versiones) utilizadas en desarrollo

Usando la linea de comandos aplicar los comando en orden.

```bash

# Clonar el repositorio
git clone https://github.com/ErAo/rimac-challenge.git

# Entrar al directorio del proyecto
cd rimac-challenge

# Instalar dependencias
npm install

```


## Versiones
Las versiones son referenciales, todo deberia ir Ok si usas una version igual o superior a las especificadas
  - Node 18.17.0
  - NPM 9.6.7


## Uso
Una vez completados los pasos de [Instalación](#instalación) podemos ubicarnos en la raiz del proyecto en nuestra linea de comandos y ejecutar:

Iniciar desarrollo

```bash

npm run dev

```

Iniciar build de producción

```bash

npm run build

```

## Dependencias
 - [swiper](https://swiperjs.com/get-started) Slider con integracion simple y compatibilidad con React
 - [react-router-dom](https://reactrouter.com/en/main/start/overview) Para el manejo de nuestras las rutas internas de nuestro proyecto
 - [react-hook-form](https://react-hook-form.com/get-started) Para el control de formularios de forma simple, control de eventos, validaciones, estado, asincronismo, entre otras características.
 - [Sass](https://sass-lang.com/documentation/) Nos ayuda a trabajar nuestro CSS de manera eficiente usando variables, mixins, y otras características.
 - [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr) Facilita el uso de SVG importando el SVG como componente


