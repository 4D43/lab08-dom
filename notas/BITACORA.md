# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: (escribe aqui cual usaste)

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion                  | Que cambio en la pantalla                                                                 | Se mantiene al recargar (Si/No) |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------- |
| textContent desde la consola | Al modificar el app.js el contenido que se ingreso por consola se actualizo por el del js | no                              |
| textContent desde app.js     | El contenido se actualizo correctamente                                                   | si                              |
| style.color                  | Los colores ingresados por el js se actualizaron tambien                                  | si                              |
| classList.add                | El nuevo elemnto agregado a la lista se inserto correctamente                             | si                              |
| createElement + appendChild  | la creacion de item fue correcta                                                          | si                              |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara         | Cuanto suma por accion |
| -------------- | ----------------------------- | ---------------------- |
| click          | un click sobre el boton       | 1                      |
| dblclick       | dos clicks en el boton        | 1                      |
| mouseover      | pasar el mouse sobre el boton | 1                      |

## Ejercicio 4: Eventos input y submit

| Prueba                                  | Que paso en la pantalla                                                              | Se recargo la pagina (Si/No) |
| --------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| Escribir en el campo nombre             | junto al hola se empezo a mostrar el nombre simultaneamente con cada letra ingresada | no                           |
| Enviar sin preventDefault               | Se muestra por un muy corto moemnto el correo en pantalla                            | si                           |
| Enviar con preventDefault, correo sin @ | sale un mensaje de error de que el correo no contiene el @                           | no                           |
| Enviar con preventDefault, correo con @ | se muestra el correo en pantalla                                                     | no                           |

## Ejercicio 5: Clases y objetos

| Objeto  | nombre  | precio | descripcion()         | conDescuento(0.25) |
| ------- | ------- | ------ | --------------------- | ------------------ |
| laptop  | Laptop  | 2500   | 'Laptop - S/ 2500.00' | 1875               |
| mouse   | Mouse   | 45     | 'Mouse - S/ 45.00'    | 33.75              |
| teclado | Teclado | 120    | 'Teclado - S/ 120.00' | 90                 |
| monitor | Monitor | 680    | 'Monitor - S/ 680.00' | 510                |

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba          | Total que muestra la pagina | Correcto (Si/No) |
| --------------- | --------------------------- | ---------------- |
| Cuaderno 12.50  | 12.5                        | si               |
| + Lapicero 3.20 | 15.7                        | si               |
| + Mochila 89.90 | 105.6                       | ai               |
| Sin Number()    | no price                    | no               |

| Pieza  | Linea de tu codigo donde aparece                      | Para que sirve                           |
| ------ | ----------------------------------------------------- | ---------------------------------------- |
| DOM    | const carrito = new Carrito();                        | inicia el carrito                        |
| Evento | formProducto.addEventListener("submit", (evento) => { | evento para enviar                       |
| Objeto | const li = document.createElement("li");              | objeot que enntra en la lista en el html |
