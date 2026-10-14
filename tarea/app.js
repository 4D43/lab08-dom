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
  if (nombre.trim().length < 2)
    return "El nombre debe tener al menos 2 caracteres.";
  if (notaTexto.trim() === "") return "Ingresa una nota.";
  const nota = Number(notaTexto);
  if (Number.isNaN(nota) || nota < 0 || nota > 20)
    return "La nota debe ser un número entre 0 y 20.";
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
    vacio.textContent =
      registro.estudiantes.length === 0
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
