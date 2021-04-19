---
title: "Getting started with LGI"
date: 2021-01-21T23:57:10-04:00
author: "Víctor Díaz"
description: "In this tutorial I will show you how to build an interface with
lua and gtk using the LGI library."
keywords: ["lua", "gtk", "lgi"]
readTime: true
tags: ["lua", "gtk", "lgi", "tutorial"]
categories: ["Desarrollo"]
---

## How to get started

More than a tutorial, this is the simplest example of how to create an empty
window. Then, we will extend the script to add a button to it that performs a
certain action.

Before we start, I recommend the following documents so that we can learn a
little more about LGI:

* https://github.com/pavouk/lgi/blob/master/docs/overview.md
* https://github.com/pavouk/lgi/blob/master/docs/guide.md
* https://github.com/pavouk/lgi/blob/master/docs/gtk.md

You can install lgi using LuaRocks:

```
luarocks install lgi
```

Or with your distro's package manager (if available).

## Simple Example

To begin our tutorial we will create the simplest example possible.
This program will create an empty window of `200x200` pixels.

![simple-window.lua](/images/post/primeros-pasos-con-lua-gtk/screen1.jpg)

First we will create a file named `sample-window.lua`
with the following code:

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

Each line of the example is explained in detail below.

```lua
local lgi = require('lgi')
local Gtk = lgi.require('Gtk', '3.0')
```

To have **GTK+** classes and functions available, it is necessary to first load
the **LGI** library and then the **GTK+** module. **LGI** library and then the
**Gtk** module. Since a user's system may have several versions of **GTK+**
installed at the same time, we want to make sure that when we load **Gtk** we
mean **GTK 3** and not any other version of the library, which is the purpose
of the `lgi.require("Gtk", "3.0")` statement.

The next line creates an empty window with a title, a size of `200x200`,
we center the window in the middle of the screen and connect the window to the
`destroy` event (which happens when we destroy the window or close it) to make
sure that the application is terminated if we click on the `X` of the window.

It should be clarified that with **LGI** the signals are
connected with _on_<signal name>_.

```lua
window = Gtk.Window {
	title = "Sample - Window", -- title
	width = 200, -- ancho
	height = 200, -- alto
	window_position = Gtk.WindowPosition.CENTER, -- position
	on_destroy = function() -- event
		Gtk.main_quit()
	end
}
```

In the next step we show the window.

```lua
window:show_all()
```

Finally, we start the **GTK+** processing loop, from which we will exit
when the window is closed (see line 15).

```lua
Gtk.main()
```

To run the program, open a terminal, change to the directory of the file, and
enter the command:

```sh
lua sample-window.lua
```

## Extended Example

For something a little more useful, here's the **LGI** version of the classic
program _Hello World_.

![hello-world.lua](/images/post/primeros-pasos-con-lua-gtk/screen2.jpg)

```lua
local lgi = require("lgi")
local Gtk = lgi.require("Gtk", "3.0")
local MyWindow = Gtk.Window:derive("MyWindow")

function MyWindow:_init()
	self.title = "Hello World"

	local button = Gtk.Button({ label = "Click Here" })
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

Unlike the simple example, here we create a subclass of `Gtk.Window` to
define our own `MyWindow` class.

```lua
local MyWindow = Gtk.Window:derive("MyWindow")
```

In the constructor of the class, we will tell it to give the value of
`Hello World` to the `title` property.

```lua
self.title = "Hello World"
```

The next five lines are used to create a button
(_[widget](http://es.wikipedia.org/wiki/Widget)_), connect it to its
`clicked` signal, and add it as a child to the window.

```lua
local button = Gtk.Button({ label = "Click Here" })
function button:on_clicked()
	print("Hello World")
end
self:add(button)
```

The last block, outside the class, is very similar to the simple example above,
but instead of creating an instance of the generic `Gtk.Window` class,
we create an instance of `MyWindow`.
