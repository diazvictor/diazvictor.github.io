---
title: "Primeros pasos con LGI"
date: 2021-01-21T23:57:10-04:00
author: "Víctor Díaz"
description: "En este tutorial te enseñare a construir una interfaz con
lua y gtk usando la librería LGI"
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

* https://github.com/pavouk/lgi/blob/master/docs/overview.md
* https://github.com/pavouk/lgi/blob/master/docs/guide.md
* https://github.com/pavouk/lgi/blob/master/docs/gtk.md

Puedes instalar lgi usando LuaRocks:

```
luarocks install lgi
```

O con el gestor de paquetes de tu distro (si está disponible).

## Ejemplo Simple

Para comenzar con nuestro tutorial crearemos el ejemplo más simple posible.
Este programa creará una ventana vacía de `200x200` píxeles.

![simple-window.lua](/images/post/primeros-pasos-con-lua-gtk/screen1.jpg)

Primero crearemos un archivo de nombre `sample-window.lua`
con el siguiente código:

```lua
local lgi = require("lgi")
local Gtk = lgi.require("Gtk", "3.0")

local window = Gtk.Window {
	title = "Sample - Window",
	width = 200,
	height = 200,
	window_position = Gtk.WindowPosition.CENTER,
	on_destroy = function()
		Gtk.main_quit()
	end
}

window:show_all()
Gtk.main()
```

A continuación explicaremos con detalle cada línea del ejemplo.

```lua
local lgi = require('lgi')
local Gtk = lgi.require('Gtk', '3.0')
```

Para disponer de las clases y funciones de **GTK+**, es necesario primero cargar la
librería **LGI** y luego el módulo **Gtk**. Como el sistema de un usuario puede tener varias
versiones de **GTK+** instaladas al mismo tiempo, queremos asegurarnos de que cuando
cargamos **Gtk** se refiere a **GTK 3** y no a cualquier otra versión de la librería,
que es el propósito de la sentencia `lgi.require("Gtk", "3.0")`.

La siguiente línea crea una ventana vacía con un título, un tamaño de `200x200`,
centramos la ventana en el centro de la pantalla y conectamos la ventana al evento
`destroy` (que sucede cuando destruimos la ventana o la cerramos) para asegurarnos
de que la aplicación se termina si hacemos clic en la `X` de la ventana.

Cabe aclarar que con **LGI** las señales se conectan con _on_<nombre de la señal>_

```lua
window = Gtk.Window {
	title = "Sample - Window", -- título
	width = 200, -- ancho
	height = 200, -- alto
	window_position = Gtk.WindowPosition.CENTER, -- posición
	on_destroy = function() -- evento
		Gtk.main_quit()
	end
}
```

En el siguiente paso mostramos la ventana.

```lua
window:show_all()
```

Por último, iniciamos el bucle de procesamiento de **GTK+**, del cual saldremos
cuando la ventana sea cerrada (ver línea 15).

```lua
Gtk.main()
```

Para ejecutar el programa, abra una terminal, cambie al directorio del archivo y
ingrese el comando:

```sh
lua sample-window.lua
```

## Ejemplo Extendido

Para algo un poco más útil, aquí está la versión en **LGI** del clásico
programa _Hello World_.

![hello-world.lua](/images/post/primeros-pasos-con-lua-gtk/screen2.jpg)

```lua
local lgi = require("lgi")
local Gtk = lgi.require("Gtk", "3.0")
local MyWindow = Gtk.Window:derive("MyWindow")

function MyWindow:_init()
	self.title = "Hello World"

	local button = Gtk.Button({ label = "Click Aquí" })
	function button:on_clicked()
		print("Hello World")
	end
	self:add(button)
end

local window = MyWindow()
window.on_destroy = Gtk.main_quit
window:show_all()

Gtk.main()
```

A diferencia del ejemplo simple, aquí creamos una sub-clase de `Gtk.Window` para
definir nuestra propia clase `MyWindow`.

```lua
local MyWindow = Gtk.Window:derive("MyWindow")
```

En el constructor de la clase, le diremos que dé el valor de `Hello World` a la
propiedad `title`.

```lua
self.title = "Hello World"
```

Las próximas cinco líneas son usadas para crear un botón
(_[widget](http://es.wikipedia.org/wiki/Widget)_), conectarlo a su señal
`clicked`, y adicionarlo como hijo a la ventana.

```lua
local button = Gtk.Button({ label = "Click Here" })
function button:on_clicked()
	print("Hello World")
end
self:add(button)
```

El último bloque, fuera de la clase, es muy similar al del ejemplo simple de más
arriba, pero en lugar de crear una instancia de la cláse genérica `Gtk.Window`,
creamos una instancia de `MyWindow`.
