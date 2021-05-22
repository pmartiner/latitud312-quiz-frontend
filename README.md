# Front-end para el quiz de representación de diputades de Latitud 3°12

## Tecnologías elegidas
Este proyecto fue desarrollado para [Latitud 3°12](https://www.latitud312.com/) y con licencia GNU AGPLv3. El front-end fue desarrollado con `react@17`, `webpack@5` y `typescript@4`. Opté por usar `styled-components@5` sobre un loader de css para no generar más archivos.

## Uso y desarrollo
Para poder probar el código localmente, es necesario contar con una versión de `node` LTS y `yarn`.

Primero, es necesario instalar todos los paquetes con el siguiente comando:
```
yarn install
```
Una vez instalados los paquetes, es necesario crear un archivo `.env` en la carpeta raíz del repositorio con los siguientes datos:
```
API_URL=${URL a la cuál accederán las peticiones XHR}
```
Se deberá sustituir el fragmento `${URL a la cuál accederán las peticiones XHR}` de arriba con la URL que se usará.

Después de la instalación, el servidor local se puede ejecutar con el comando:
```
yarn start
```

## Construcción y despliegue
Este trabajo fue desarrollado considerando su uso como una web app. Sin embargo, si se desea hacer un paquete de JavaScript con él, se deberá modificar la configuración de webpack `webpack.config.ts`.

Una vez modificado (o no) el archivo de `webpack`, se puede construir el proyecto con el siguiente comando:
```
yarn build
```
Este comando transpilará el código de TypeScript a JavaScript, creará un archivo para los polyfills y depositará ambos en `@/dist`, donde la `@` es la dirección de la carpeta raíz de este proyecto. Esta aplicación está desplegada en [Vercel](https://vercel.com).

### Contribución
Si deseas contribuir a mejorar este proyecto, te pido crees un *Issue* de GitHub y/o crees un Pull Request con los cambios que propones.
