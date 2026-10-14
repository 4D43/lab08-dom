# Tarea: Mi componente interactivo

## Componente elegido

Registro de notas de estudiantes con promedio. Es un componente que me resulta útil porque reúne lo que se pide en una sola pantalla: un formulario para registrar a un estudiante y su nota, una lista que se actualiza sola, un buscador y el promedio general calculado en vivo. Usa la escala vigesimal (0 a 20) y se aprueba con 11 o más.

Código: carpeta tarea/ (index.html y app.js).

Página publicada: https://github.com/4D43/lab08-dom.git/tarea/

## Version 1: solo DOM

Dos arreglos con datos fijos (nombres y notas) y un bucle que recorre los arreglos, crea un <li> por estudiante con createElement, le pone el texto con textContent y lo inserta con appendChild. Al final calcula el promedio y lo escribe en el párrafo #promedio.

Por qué. comprobar que se puede construir elementos desde JavaScript y mostrarlos en la página antes de pensar en la interacción.

Al abrir la página aparecen tres estudiantes y el promedio (13.67). Todavía no se puede hacer nada: el formulario existe en el HTML pero no responde, y los datos solo se cambian editando el código.

```text

// Versión 1: solo DOM (datos fijos, sin eventos)
const nombres = ["Ana Torres", "Luis Pérez", "Marta Quispe"];
const notas = [15, 8, 18];

const lista = document.getElementById("lista");
const promedio = document.getElementById("promedio");

let suma = 0;
for (let i = 0; i < nombres.length; i++) {
  const li = document.createElement("li");
  li.textContent = nombres[i] + ": " + notas[i];
  lista.appendChild(li);
  suma += notas[i];
}

promedio.textContent = "Promedio general: " + (suma / notas.length).toFixed(2);

```

## Version 2: con eventos

## Version 3: con clases y objetos

## Donde uso DOM, eventos y objetos

## Pruebas realizadas

## Por que disene asi mi clase
