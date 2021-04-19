---
title: "How to use mosquitto from the terminal"
date: 2020-05-02T00:36:27-04:00
author: "Víctor Díaz"
description: "Guia basica para conectarse a un servidor Mosquitto/MQTT mediante la linea de comandos."
keywords: ["mqtt", "mosquitto", "guia", "tutoriales"]
readTime: true
tags: ["mqtt", "mosquitto", "tutorial"]
categories: ["Desarrollo"]
---

## Guia basica para conectarse a un servidor Mosquitto/MQTT mediante la linea de comandos.

### Indíce
1. [Como subcribirse a una sala](#1-como-subcribirse-a-una-sala)
2. [Como publicar en una sala](#2-como-publicar-en-una-sala)
3. [Tips a seguir para poder publicar](#3-tips-a-seguir-para-poder-publicar)

### 1. Como subcribirse a una sala

```
mosquitto_sub -P "$contraseña" -u "$usuario" -h $servidor -t "$topics"
```

`mosquitto_sub` este comando seria la aplicación para conectarce.

`-P` contraseña a usar. [opcional]

`-u` nombre de usuario. [opcional]

`-h` servidor/host al cual conectarce.

`-t` topics (sala) al cual subcribirse.

### 2. Como publicar en una sala

```
mosquitto_pub -P "$contraseña" -u "$usuario" -h $servidor -m "$mensaje" -t "$topics"
```

`mosquitto_pub` este comando seria la aplicación para poder publicar.

`-P` contraseña a usar. [opcional]

`-u` nombre de usuario. [opcional]

`-h` servidor/host al cual conectarce.

`-m` $mensaje a enviar.

`-t` topics (sala) al cual enviar el mensaje.

### 3. Tips a seguir para poder publicar

Para publicar debemos seguir un protocolo (reglas), es de esta manera para poder identificarnos.

Cuando publiquemos debemos colocar entre `[]` el nombre del usuario seguido de dos puntos `:` y luego el mensaje.
ejemplo: `[diazvictor]: Hola Mundo`
