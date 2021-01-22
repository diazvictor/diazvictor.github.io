---
title: "Primeros pasos con LGI (lua y gtk) | Getting started with GI (lua and gtk)"
date: 2020-05-12T21:57:10-04:00
author: "Víctor Díaz"
description: "En este tutorial te enseñare a constuir una interfaz con lua y gtk usando la libreria LGI"
keywords: ["lua", "gtk", "lgi"]
readTime: true
tags: ["lua", "gtk", "lgi", "tutorial"]
categories: ["Desarrollo"]
---

## Cómo empezar

Más que un tutorial, es el ejemplo más simple de como crear una ventana vacía.
Luego, extenderemos el script para agregarle un botón que realiza una determinada acción.

Antes de comenzar, recomiendo los siguientes documentos para que podamos aprender
un poco más sobre LGI:

- https://github.com/pavouk/lgi/blob/master/docs/overview.md
- https://github.com/pavouk/lgi/blob/master/docs/guide.md
- https://github.com/pavouk/lgi/blob/master/docs/gtk.md

Puedes instalar lgi usando LuaRocks:

```
luarocks install lgi
```

O con el gestor de paquetes de tu distro (si está disponible).

## Ejemplo Simple

Para comenzar con nuestro tutorial crearemos el ejemplo más simple posible.
Este programa creará una ventana vacía de 200 x 200 píxeles.

Primero crearemos un archivo de nombre `sample-window.lua`
con el siguiente codigo:

```lua
local lgi = require('lgi')
local Gtk = lgi.require('Gtk', '3.0')

local window = Gtk.Window {
	title = 'Sample - Window',
	width = 200,
	height = 200,
	window_position = 3,
	on_destroy = function()
		Gtk.main_quit()
	end
}

window:show_all()
Gtk.main()
```

A continuación explicaremos cada línea del ejemplo.

```lua
local lgi = require('lgi')
local Gtk = lgi.require('Gtk', '3.0')
```

Al principio, tenemos que requerir la libreria Lgi y luego el módulo Gtk para
poder acceder a las clases y funciones de GTK+. Como el sistema de un usuario
puede tener varias versiones de GTK+ instaladas al mismo tiempo, queremos asegurarnos
de que cuando requerimos Gtk se refiere a GTK+ 3 y no a cualquier otra versión de la
librería, que es el propósito de la sentencia `lgi.require('Gtk', '3.0')`.

La siguiente línea crea una ventana vacía con un titulo, un tamaño de 200 x 200,
centramos la ventana en el centro de la pantalla y conectamos la ventana al evento
`on_destroy` (al destruir/cerrar) para asegurarnos de que la aplicación se termina
si hacemos clic en la x de la ventana.

```lua
window = Gtk.Window {
	title = 'Sample - Window', -- titulo
	width = 200, -- ancho
	height = 200, -- alto
	window_position = 3, -- posición
	on_destroy = function() -- evento
		Gtk.main_quit()
	end
}
```

En el siguiente paso mostramos la ventana.

```lua
window:show_all()
```

Por último, iniciamos el bucle de procesamiento de GTK+, del cual saldremos
cuando la ventana sea cerrada (ver línea 13).

```lua
Gtk.main()
```

Para ejecutar el programa, abra una terminal, cambie al directorio del archivo y
ingrese el comando:

```sh
lua sample-window.lua
```
