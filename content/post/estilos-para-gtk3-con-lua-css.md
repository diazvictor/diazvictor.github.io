---
title: "Agregando estilos css con LGI (lua + gtk)"
date: 2021-02-09T05:57:10-04:00
author: "Víctor Díaz"
description: "En este tutorial agregaremos estilos css para usarlos con los widgets de gtk+"
keywords: ["lua", "gtk", "lgi", "css"]
readTime: true
tags: ["lua", "gtk", "lgi", "tutorial", "css"]
categories: ["Desarrollo"]
---

En este tutorial no enseñare CSS, solo la manera de agregarlo con gtk mediante LGI.

# Empezemos con algo de Lua

Nuestro punto de partida es un documento Lua. Puedes copiar el código de abajo
si quieres trabajar en tu ordenador. Guarda el siguiente código como `main.lua`
en una carpeta de tu equipo.

```lua {hl_lines=[4]}
local lgi = require('lgi')
local Gtk = lgi.require('Gtk', '3.0')
local Gdk = lgi.require('Gdk', '3.0')
assert = lgi.assert -- Con esta función confirmare si un archivo existe (en este caso custom.css)

local window = Gtk.Window {
	title = 'Agregando Estilos CSS',
	width = 200,
	height = 200,
	window_position = Gtk.WindowPosition.CENTER,
	{
		Gtk.Button {
			id = 'myButton',
			label = 'Ejemplo del label con css'
		}
	},
	on_destroy = function()
		Gtk.main_quit()
	end
}

window:show_all()
Gtk.main()
```

# Agregando el CSS

Lo primero que se debes hacer es incluir los estilos CSS en el documento Lua.

Recomiendo leer estos documentos para más información sobre los selectores y
las propiedades que se pueden usar:

- https://developer.gnome.org/gtk3/stable/chap-css-overview.html
- https://developer.gnome.org/gtk3/stable/chap-css-properties.html

Crea un archivo en el mismo directorio que tu documento Lua y guárdalo como `custom.css`
con el siguiente código.

```css
/**
 * Le añado a los hijos de window (GtkWindow) que sean botones (GtkButton)
 * un color azul
 */
window button {
	color: #1E90FF;
}
/**
 * los label que esten dentro de los botones y tengan la clase red
 * tendran un color rojo
 */
button.red label {
	color: #E32424;
}
```

Para agregar `custom.css` a `main.lua`, añade las siguientes líneas en algún lugar
dentro del documento Lua antes de mostrar la ventana (GtkWindow) como esta en este ejemplo:

```lua {hl_lines=[6,"3-13"],linenostart=4}
assert = lgi.assert -- Con esta función confirmare si el archivo css existe

--- Cargo mi css
local provider = Gtk.CssProvider()
-- Muestro un mensaje si custom.css no existe
assert(provider:load_from_path('custom.css'), 'ERROR: no se encontro el custom.css')
--- Añado mi css a la ventana actual
local screen = Gdk.Display.get_default_screen(Gdk.Display:get_default())
local GTK_STYLE_PROVIDER_PRIORITY_APPLICATION = 600
Gtk.StyleContext.add_provider_for_screen(
	screen, provider,
	GTK_STYLE_PROVIDER_PRIORITY_APPLICATION
)

local window = Gtk.Window {
```

Una vez hecho los pasos anteriores podemos ejecutar con `lua main.lua`.

![main.lua](/images/post/estilos-para-gtk3-con-lua-css/screen1.png)

Como pueden ver, le hemos añadido a nuestro pequeño ejemplo los estilos CSS deseados

Para extender más el tutorial, ahora le añadiremos una clase a nuestro botón
cuando lo presionemos, usando el de método `add_class`

```lua {hl_lines=[29,"5-7"],linenostart=25}
	{
		Gtk.Button {
			id = 'myButton',
			label = 'Ejemplo del label con css',
			on_clicked = function (self)
				self:get_style_context():add_class('red')
			end
		}
	},
```

Si ya has trabajado con Javascript, el código anterior seria traducido a esto:

```javascript
document.getElementById('myButton').addEventListener('click', function () {
	this.classList.add('red');
});
```

Con esto ya sabes como agregar estilos CSS con LGI, ahora tus proyectos se verán muy bien,
recuerda revisar los enlaces de arriba para más información sobre los selectores y propiedades que son compatibles con GTK+.
