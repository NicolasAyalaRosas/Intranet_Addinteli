const tituloMapa = document.getElementById("titulo-mapa");
const contenidoMapa = document.getElementById("contenido-mapa");
const seccionTemario = document.getElementById("temario");
const seccionMapa = document.getElementById("mapa-mental");

let historial = [];

function mostrarMapa(tipo) {
  seccionTemario.style.display = "none";
  seccionMapa.style.display = "block";

  let archivo;
  switch (tipo) {
    case "llamadas":
      archivo = "../Troubleshooting/flujo_llamadas.js";
      tituloMapa.textContent = "📞 Flujo: Llamadas";
      break;
    case "mensajes":
      archivo = "../Troubleshooting/flujo_mensajes.js";
      tituloMapa.textContent = "✉️ Flujo: Mensajes";
      break;
    case "datos":
      archivo = "../Troubleshooting/flujo_datos.js";
      tituloMapa.textContent = "🌐 Flujo: Datos móviles";
      break;
    default:
      console.error("Flujo no reconocido");
      return;
  }

  import(archivo).then((flujo) => {
    historial = []; // reiniciar historial
    mostrarPaso(flujo.default);
  });
}

function mostrarPaso(nodo) {
  historial.push(nodo);
  renderizarNodo(nodo);
}

function volverPasoAnterior() {
  if (historial.length > 1) {
    historial.pop(); // quitar nodo actual
    const nodoAnterior = historial[historial.length - 1];
    renderizarNodo(nodoAnterior);
  }
}

function renderizarNodo(nodo) {
  contenidoMapa.innerHTML = "";

  const pregunta = document.createElement("div");
  pregunta.className = "burbuja-pregunta";
  pregunta.textContent = nodo.texto;
  contenidoMapa.appendChild(pregunta);

  if (nodo.hijos && nodo.hijos.length > 0) {
    nodo.hijos.forEach((hijo) => {
      const btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = hijo.texto;
      btn.onclick = () => mostrarPaso(hijo);
      contenidoMapa.appendChild(btn);
    });
  }
}

function regresarAlTemario() {
  seccionMapa.style.display = "none";
  seccionTemario.style.display = "block";
  contenidoMapa.innerHTML = "";
  tituloMapa.textContent = "";
}

function reiniciarFlujo() {
  if (historial.length > 0) {
    mostrarPaso(historial[0]); // vuelve al nodo raíz del flujo actual
  }
}

window.reiniciarFlujo = reiniciarFlujo;
window.mostrarMapa = mostrarMapa;
window.regresarAlTemario = regresarAlTemario;
window.volverPasoAnterior = volverPasoAnterior;
