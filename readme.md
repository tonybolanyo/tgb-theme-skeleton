# TGB-Theme-Skeleton

La idea del proyecto es crear un esqueleto preparado para la creación de un tema web.

## Dependencias

El proyecto asume que vamos a trabajar con:

* jade: para facilitar la creación de las páginas del tema.
* coffeescript: para ayudarnos a crear nuestros scripts.
* less: como preprocesador para nuestras hojas de estilo

Las dependencias de desarrollo se gestionan con ``npm`` y las dependencias del frontend con ``bower``.

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias npm
3. Instalar las dependencias bower
4. Compilar
5. Arrancar el servidor y mostrar el resultado en el navegador http://localhost:1337

```bash
git clone https://github.com/tonybolanyo/tgb-theme-skeleton.git mi-proyecto
cd mi-projecto
npm install
bower install
grunt build
grunt serve
```

## Modo de empleo

Para el desarrollo continuo, basta con lanzar grunt. La tarea definida por defecto arranca el servidor interno en el puesto 1337 y vigila los cambios de los archivos jade, less y coffeescript.

```bash
grunt
```

## Autores

Tony G. Bolaño<tonybolanyo@gmail.com>