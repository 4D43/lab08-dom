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
  if (nombre.trim().length < 2)
    return "El nombre debe tener al menos 2 caracteres.";
  if (notaTexto.trim() === "") return "Ingresa una nota.";
  const nota = Number(notaTexto);
  if (Number.isNaN(nota) || nota < 0 || nota > 20)
    return "La nota debe ser un número entre 0 y 20.";
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

form.addEventListener("submit", (ev) => {
  // evento 1: submit
  ev.preventDefault();
  const error = validar(inputNombre.value, inputNota.value);
  if (error) {
    mostrarMensaje(error, "error");
    return;
  }
  nombres.push(inputNombre.value.trim());
  notas.push(Number(inputNota.value));
  form.reset();
  inputNombre.focus();
  mostrarMensaje("Nota agregada.", "ok");
  dibujar();
});

lista.addEventListener("click", (ev) => {
  // evento 2: click
  const btn = ev.target.closest("button.borrar");
  if (!btn) return;
  const i = Number(btn.dataset.indice);
  nombres.splice(i, 1);
  notas.splice(i, 1);
  mostrarMensaje("Estudiante eliminado.", "ok");
  dibujar();
});

buscador.addEventListener("input", dibujar); // evento 3: input

dibujar();
