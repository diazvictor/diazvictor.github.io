+++
title = "Adding css styles with LGI"
date = 2021-02-09T05:57:10-04:00
author = "Víctor Díaz"
description = "In this tutorial we will add css styles for use with gtk+."
keywords = ["lua", "gtk", "lgi", "css"]
readTime = true
tags = ["lua", "gtk", "lgi", "tutorial", "css"]
categories = ["Desarrollo"]
+++

In this tutorial I will not teach **CSS**, only how to add it with **GTK+** using **LGI**.

# Let's start with some Lua

Our starting point is a **Lua** document. You can copy the code below if you
want to work on your computer. Save the following code as `main.lua` in a
directory on your computer.

```lua
local lgi = require("lgi")
local Gtk = lgi.require("Gtk", "3.0")
local Gdk = lgi.require("Gdk", "3.0")
assert = lgi.assert

local window = Gtk.Window {
	title = "Adding CSS Styles",
	width = 200,
	height = 200,
	window_position = Gtk.WindowPosition.CENTER,
	{
		Gtk.Button {
			id = "myButton",
			label = "Example of the label with css"
		}
	},
	on_destroy = function()
		Gtk.main_quit()
	end
}

window:show_all()
Gtk.main()
```

# Adding the CSS

The first thing to do is to include the **CSS** styles in the **Lua** document.

I recommend reading these documents for more information about the selectors
and the properties that can be used:

* https://developer.gnome.org/gtk3/stable/chap-css-overview.html
* https://developer.gnome.org/gtk3/stable/chap-css-properties.html

Create a file in the same directory as your **Lua** document and save it as
`custom.css` with the following code.

```css
window button {
	color: #1E90FF;
}
button.red label {
	color: #E32424;
}
```

To add `custom.css` to `main.lua`, add the following lines somewhere inside
the **Lua** document before displaying the window (GtkWindow) like this in this example:

```lua
assert = lgi.assert -- With this function I will confirm if the css file exists.

--- I load my css
local provider = Gtk.CssProvider()
-- Show a message if custom.css does not exist
assert(provider:load_from_path("custom.css"), "ERROR: custom.css not found")
--- I add my css to the current window
local screen = Gdk.Display.get_default_screen(Gdk.Display:get_default())
local GTK_STYLE_PROVIDER_PRIORITY_APPLICATION = 600
Gtk.StyleContext.add_provider_for_screen(
	screen, provider,
	GTK_STYLE_PROVIDER_PRIORITY_APPLICATION
)

local window = Gtk.Window {
```

Once the previous steps are done we can execute `lua main.lua`.

![main.lua](/images/post/estilos-para-gtk3-con-lua-css/screen1.png)

As you can see, we have added the desired **CSS** styles to our little example.

---

To extend the tutorial further, we will now add a class to our button when
we press it, using the `add_class` method.

```lua {hl_lines=[29,"5-7"],linenostart=25}
{
	Gtk.Button {
		id = "myButton",
		label = "Example of the label with css",
		on_clicked = function (self)
			self:get_style_context():add_class("red")
		end
	}
},
```

If you have already worked with **Javascript**, the above code would be translated to this:

```javascript
document.getElementById("myButton").addEventListener("click", function () {
	this.classList.add("red");
});
```
