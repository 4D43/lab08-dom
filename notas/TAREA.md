# Tarea: Mi componente interactivo

## Componente elegido

Registro de notas de estudiantes con promedio. Es un componente que me resulta útil porque reúne lo que se pide en una sola pantalla: un formulario para registrar a un estudiante y su nota, una lista que se actualiza sola, un buscador y el promedio general calculado en vivo. Usa la escala vigesimal (0 a 20) y se aprueba con 11 o más.

Código: carpeta tarea/ (index.html y app.js).

Página publicada: https://github.com/4D43/lab08-dom/tree/main/tarea

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

### Tres eventos distintos:

submit en el formulario: valida los datos y agrega al estudiante.
click en la lista (delegación de eventos): borra al estudiante cuyo botón se presionó.
input en el buscador: filtra la lista mientras se escribe.

función validar(), que devuelve un mensaje de error que se muestra en el párrafo #mensaje de la página (sin alert), y la función dibujar(), que vuelve a pintar la lista cada vez que los datos cambian. Los datos siguen guardados en dos arreglos paralelos.

Una página que no reacciona al usuario no sirve como componente. Usé delegación de eventos en la lista porque los botones "Borrar" se crean y se destruyen dinámicamente: con un solo click en el ul cubro todos los botones, incluso los que todavía no existen.

Ahora la lista empieza vacía y el usuario la construye: puede agregar estudiantes, ve errores en rojo cuando los datos no son válidos, borra con un botón y busca por nombre. El promedio se recalcula tras cada cambio.

```text

js
// Versión 2: DOM + eventos (submit, click, input), datos en arreglos simples
const nombres = [];
const notas = [];

const form = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputNota = document.getElementById("nota");
const buscador = document.getElementById("buscador");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const promedio = document.getElementById("promedio");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function validar(nombre, notaTexto) {
  if (nombre.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
  if (notaTexto.trim() === "") return "Ingresa una nota.";
  const nota = Number(notaTexto);
  if (Number.isNaN(nota) || nota < 0 || nota > 20) return "La nota debe ser un número entre 0 y 20.";
  return "";
}

function dibujar() {
  lista.replaceChildren();
  const texto = buscador.value.trim().toLowerCase();
  for (let i = 0; i < nombres.length; i++) {
    if (!nombres[i].toLowerCase().includes(texto)) continue;
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = nombres[i] + ": " + notas[i];
    const btn = document.createElement("button");
    btn.textContent = "Borrar";
    btn.className = "borrar";
    btn.dataset.indice = i;
    li.append(span, btn);
    lista.appendChild(li);
  }
  const suma = notas.reduce((a, b) => a + b, 0);
  promedio.textContent = notas.length
    ? "Promedio general: " + (suma / notas.length).toFixed(2)
    : "Aún no hay notas registradas.";
}

form.addEventListener("submit", (ev) => {          // evento 1: submit
  ev.preventDefault();
  const error = validar(inputNombre.value, inputNota.value);
  if (error) { mostrarMensaje(error, "error"); return; }
  nombres.push(inputNombre.value.trim());
  notas.push(Number(inputNota.value));
  form.reset();
  inputNombre.focus();
  mostrarMensaje("Nota agregada.", "ok");
  dibujar();
});

lista.addEventListener("click", (ev) => {           // evento 2: click
  const btn = ev.target.closest("button.borrar");
  if (!btn) return;
  const i = Number(btn.dataset.indice);
  nombres.splice(i, 1);
  notas.splice(i, 1);
  mostrarMensaje("Estudiante eliminado.", "ok");
  dibujar();
});

buscador.addEventListener("input", dibujar);        // evento 3: input

dibujar();

```

Con dos arreglos paralelos, borrar exige acordarse de quitar el mismo índice en ambos (splice dos veces).

## 3 Version 3: con clases y objetos

Dos clases:

Estudiante, con atributos id, nombre y nota, y métodos aprobado() y estado().
RegistroNotas, con el atributo estudiantes y los métodos agregar(), eliminar(), buscar() y promedio().

Cada estudiante recibe un id único, así el botón "Borrar" guarda ese id en data-id y ya no depende de la posición en el arreglo. Además, la lista ahora pinta cada fila según aprobado() (verde o rojo) y muestra un mensaje cuando no hay datos o la búsqueda no encuentra nada.

Los datos y las reglas del problema (qué es aprobar, cómo se saca el promedio, cómo se busca) quedan dentro de los objetos. El código del DOM solo pide la información y la dibuja, así que cada parte tiene una sola responsabilidad.

Para el usuario se ve casi igual, con tres mejoras visibles: el estado (Aprobado/Desaprobado) junto a cada nota, el color de cada fila y los mensajes cuando la lista está vacía. Por dentro, el código es más ordenado y borrar ya no puede desincronizar nada.

```text

js

class Estudiante {
  constructor(nombre, nota) {
    this.id = ++Estudiante.contador;
    this.nombre = nombre;
    this.nota = nota;
  }
  aprobado() {
    return this.nota >= 11;
  }
  estado() {
    return this.aprobado() ? "Aprobado" : "Desaprobado";
  }
}
Estudiante.contador = 0;

class RegistroNotas {
  constructor() {
    this.estudiantes = [];
  }
  agregar(nombre, nota) {
    const estudiante = new Estudiante(nombre, nota);
    this.estudiantes.push(estudiante);
    return estudiante;
  }
  eliminar(id) {
    this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
  }
  buscar(texto) {
    const t = texto.trim().toLowerCase();
    return this.estudiantes.filter((e) => e.nombre.toLowerCase().includes(t));
  }
  promedio() {
    if (this.estudiantes.length === 0) return 0;
    const suma = this.estudiantes.reduce((acc, e) => acc + e.nota, 0);
    return suma / this.estudiantes.length;
  }
}

function validar(nombre, notaTexto) {
  if (nombre.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
  if (notaTexto.trim() === "") return "Ingresa una nota.";
  const nota = Number(notaTexto);
  if (Number.isNaN(nota) || nota < 0 || nota > 20) return "La nota debe ser un número entre 0 y 20.";
  return "";
}

const registro = new RegistroNotas();

const form = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputNota = document.getElementById("nota");
const buscador = document.getElementById("buscador");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const promedio = document.getElementById("promedio");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function dibujar() {
  lista.replaceChildren();
  const visibles = registro.buscar(buscador.value);

  visibles.forEach((e) => {
    const li = document.createElement("li");
    li.className = e.aprobado() ? "aprobado" : "desaprobado";

    const span = document.createElement("span");
    span.textContent = `${e.nombre}: ${e.nota} (${e.estado()})`;

    const btn = document.createElement("button");
    btn.textContent = "Borrar";
    btn.className = "borrar";
    btn.dataset.id = e.id;

    li.append(span, btn);
    lista.appendChild(li);
  });

  if (visibles.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = registro.estudiantes.length === 0
      ? "Agrega la primera nota con el formulario."
      : "Ningún estudiante coincide con la búsqueda.";
    lista.appendChild(vacio);
  }

  promedio.textContent = registro.estudiantes.length
    ? `Promedio general: ${registro.promedio().toFixed(2)}`
    : "Aún no hay notas registradas.";
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const error = validar(inputNombre.value, inputNota.value);
  if (error) {
    mostrarMensaje(error, "error");
    return;
  }
  registro.agregar(inputNombre.value.trim(), Number(inputNota.value));
  form.reset();
  inputNombre.focus();
  mostrarMensaje("Nota agregada.", "ok");
  dibujar();
});

lista.addEventListener("click", (ev) => {
  const btn = ev.target.closest("button.borrar");
  if (!btn) return;
  registro.eliminar(Number(btn.dataset.id));
  mostrarMensaje("Estudiante eliminado.", "ok");
  dibujar();
});

buscador.addEventListener("input", dibujar);

dibujar();
```

## Donde uso DOM, eventos y objetos

Tabla sobre el código final (`app.js`):

| Parte       | Dónde aparece en el código final                                           | Para qué sirve                                                           |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **DOM**     | `document.getElementById(...)` al inicio                                   | Obtener el formulario, los campos, la lista, el mensaje y el promedio    |
| **DOM**     | `document.createElement("li")`, `"span"`, `"button"` dentro de `dibujar()` | Crear una fila por cada estudiante                                       |
| **DOM**     | `textContent`, `className`, `dataset.id`, `append`, `appendChild`          | Escribir el texto, colorear la fila y enlazar el botón con el estudiante |
| **DOM**     | `lista.replaceChildren()`                                                  | Borrar las filas viejas antes de volver a pintar                         |
| **DOM**     | `mostrarMensaje()`                                                         | Mostrar errores y confirmaciones en la página (sin `alert`)              |
| **Eventos** | `form.addEventListener("submit", ...)`                                     | Validar y agregar un estudiante                                          |
| **Eventos** | `lista.addEventListener("click", ...)`                                     | Borrar un estudiante con su botón                                        |
| **Eventos** | `buscador.addEventListener("input", ...)`                                  | Filtrar la lista mientras se escribe                                     |
| **Objetos** | `class Estudiante` y `new Estudiante(...)`                                 | Representar a un estudiante con su nota y su estado                      |
| **Objetos** | `class RegistroNotas` y `const registro = new RegistroNotas()`             | Guardar la colección y calcular promedio, buscar y eliminar              |

## Pruebas realizadas

Probé la versión final con cada acción en el orden de la tabla (cada fila parte del estado que dejó la anterior). Las ejecuté en un navegador simulado (jsdom) disparando los eventos `submit`, `input` y `click` sobre la página; conviene repetirlas a mano en tu navegador antes de entregar.

| #   | Acción                               | Resultado esperado                                   | Resultado obtenido                                                               | ¿Cumple? |
| --- | ------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| 1   | Agregar "Ana Torres" con nota 15     | Aparece 1 fila y el promedio es 15.00                | Una fila, "Promedio general: 15.00", mensaje "Nota agregada."                    | Sí       |
| 2   | Enviar con el nombre vacío y nota 10 | Mensaje de error visible y no se agrega nada         | "El nombre debe tener al menos 2 caracteres." en rojo; la lista sigue con 1 fila | Sí       |
| 3   | Agregar "Luis Pérez" con nota 25     | Error por nota fuera de rango y no se agrega         | "La nota debe ser un número entre 0 y 20."; la lista sigue con 1 fila            | Sí       |
| 4   | Agregar "Luis Pérez" con nota 8      | 2 filas, promedio 11.50, Ana en verde y Luis en rojo | 2 filas, "Promedio general: 11.50", clases `aprobado` y `desaprobado`            | Sí       |
| 5   | Enviar nombre "Marta" sin nota       | Mensaje "Ingresa una nota."                          | "Ingresa una nota."                                                              | Sí       |
| 6   | Escribir "lu" en el buscador         | Solo se ve a Luis                                    | Solo "Luis Pérez: 8 (Desaprobado)"                                               | Sí       |
| 7   | Vaciar el buscador y borrar a Ana    | Queda solo Luis y el promedio pasa a 8.00            | Solo Luis, "Promedio general: 8.00", mensaje "Estudiante eliminado."             | Sí       |
| 8   | Borrar al último estudiante          | Lista vacía con aviso y sin promedio                 | "Aún no hay notas registradas." y "Agrega la primera nota con el formulario."    | Sí       |

## Por que disene asi mi clase

Separé el problema en dos clases porque hay dos cosas distintas que modelar. `Estudiante` representa un dato individual: tiene `nombre` y `nota` porque es lo único que el usuario ingresa, y un `id` porque necesito identificar a cada estudiante sin depender de su posición en la lista (así el botón "Borrar" siempre elimina al correcto).
