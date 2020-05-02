---
title: "Guia Mqtt Desde La Terminal"
date: 2020-05-02T00:36:27-04:00
description: "Guia basica para conectarse a un servidor Mosquitto/MQTT mediante la linea de comandos."
tags: ["mqtt", "mosquitto", "protocolos"]
categories: ["Desarrollo"]
---

## Guia basica para conectarse a un servidor Mosquitto/MQTT mediante la linea de comandos.

1. Como subcribirse a la sala
2. Como publicar en la sala
3. Tips a seguir para poder publicar

### 1. Como subcribirse a la sala

Para conectarse debe insetar ciertas lineas de comando.

`mosquitto_sub -P "$contraseña" -u "$user" -h $server -t "$topics"`

`mosquitto_sub` este comando seria la aplicación para conectarce.

`-P` contraseña a usar.

`-u` nombre de usuario.

`-h` servidor/host al cual conectarce.

`-t` topics (sala) al cual subcribirse.

### 2. Como publicar en la sala

Para publicar en la sala lineas de comando.

`mosquitto_pub -P "$contraseña" -u "$usuario" -h $servidor -m "$mensaje" -t "$topics"`

`mosquitto_pub` este comando seria la aplicación para poder publicar.

`-P` contraseña a usar.

`-u` nombre de usuario.

`-h` servidor/host al cual conectarce.

`-m` $mensaje a enviar.

`-t` topics (sala) al cual enviar el mensaje.

### 3. Tips a seguir para poder publicar

Para publicar debemos seguir un protocolo (reglas), es de esta manera para poder identificarnos.
cuando publiquemos debemos poner en el mensaje entre `[]` el nombre del usuario y luego colocamos el mensaje.