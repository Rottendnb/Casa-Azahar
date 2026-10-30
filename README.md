# Casa Azahar

Sitio web conceptual para una floristería local contemporánea. El proyecto combina una identidad visual profesional con un catálogo de ramos, buscador, filtros y carrito de compra, además de la preparación del pedido mediante WhatsApp.

> **Proyecto demostrativo:** Casa Azahar es una marca ficticia creada para portfolio. No representa una floristería real y no procesa pedidos ni pagos.

## Demo

- [Ver la web publicada](https://rottendnb.github.io/Casa-Azahar/)
- [Ver el repositorio en GitHub](https://github.com/Rottendnb/Casa-Azahar)

## Características

- Diseño profesional adaptable a móvil, tablet y ordenador.
- Catálogo con seis ramos y composiciones florales diferentes.
- Filtros por estilo y buscador de productos.
- Carrito con cantidades, eliminación de productos y subtotal.
- Carrito conservado en el navegador mediante LocalStorage.
- Preparación de un pedido demostrativo mediante WhatsApp.
- Secciones para ocasiones, ramos personalizados y presentación del taller.
- Fotografías originales creadas específicamente para el proyecto.
- Avisos visibles que identifican la página como demostración.
- Preparada para publicarse con GitHub Pages.

## Tecnologías

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- GitHub Pages

No utiliza frameworks, dependencias ni proceso de compilación.

## Estructura del proyecto

```text
casa-azahar/
├── assets/
│   ├── catalogo-ramos.png
│   ├── hero-casa-azahar.png
│   └── logo-casa-azahar.svg
├── CSS/
│   ├── style.css
│   └── professional.css
├── JS/
│   └── script.js
├── index.html
├── .nojekyll
└── README.md
```

## Cómo abrirla en local

Abre `index.html` directamente en el navegador. Para trabajar con recarga automática también puedes utilizar una extensión como Live Server en Visual Studio Code.

No es necesario instalar paquetes ni ejecutar comandos de construcción.

## Funcionamiento del carrito

Los productos seleccionados se guardan en LocalStorage. El usuario puede cambiar las cantidades, eliminar artículos y preparar un mensaje de pedido mediante WhatsApp.

La operación es únicamente demostrativa: no se registra el pedido, no se comprueba inventario y no se realiza ningún cobro.

## Personalización para un negocio real

Antes de utilizar la web para una floristería real habría que:

1. Sustituir el nombre, logotipo y datos de contacto.
2. Incorporar productos, precios y fotografías auténticas.
3. Definir horarios, zonas de reparto y gastos de entrega.
4. Conectar el catálogo a un sistema real de inventario y pedidos.
5. Integrar una pasarela de pago si se desea vender directamente en la web.
6. Añadir aviso legal, política de privacidad y política de cookies.
7. Revisar el contenido comercial y legal antes de publicar.

## Publicación en GitHub Pages

1. Crea un repositorio llamado `Casa-Azahar`.
2. Sube todo el contenido de esta carpeta manteniendo `index.html` en la raíz.
3. En GitHub, entra en **Settings > Pages**.
4. Selecciona la rama principal y la carpeta raíz (`/root`).
5. Guarda los cambios y espera a que GitHub publique la página.

La dirección resultante será:

```text
https://rottendnb.github.io/Casa-Azahar/
```

## Autor

Diseñado y desarrollado por **Fernando Graciani — Graciani Web Studio**.

- GitHub: [@Rottendnb](https://github.com/Rottendnb)
- Correo: [fernandoga89@gmail.com](mailto:fernandoga89@gmail.com)

## Licencia y uso

Proyecto creado como muestra de portfolio. No se autoriza su reutilización comercial, redistribución o venta sin permiso del autor.
