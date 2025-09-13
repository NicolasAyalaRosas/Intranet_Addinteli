import flujoLlamadas from './flujo_llamadas.js';
import flujoMensajes from './flujo_mensajes.js';
import flujoDatos from './flujo_datos.js';

const flujos = {
  llamadas: flujoLlamadas,
  mensajes: flujoMensajes,
  datos: flujoDatos
};

// Obtener elementos del DOM
const input = document.getElementById("chatbot-input");
const content = document.getElementById("chatbot-content");

// Inicializar modelo de Hugging Face
let model;
async function loadModel() {
  try {
    model = await transformers.AutoModelForCausalLM.from_pretrained("facebook/blenderbot-400M-distill");
    console.log("Modelo cargado");
    addLine("🤖", "¡Bienvenido al Asistente Técnico! Escribe 'llamadas', 'mensajes' o 'datos' para soporte guiado, o cualquier consulta técnica para asistencia general.");
  } catch (e) {
    console.error("Error al cargar el modelo:", e);
    addLine("🤖", "Error al cargar el asistente. Escribe 'llamadas', 'mensajes' o 'datos' para soporte guiado.");
  }
}

// Procesar entrada del usuario
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const msg = input.value.trim().toLowerCase();
    input.value = "";
    addLine("👤", msg);

    // Buscar en los flujos
    if (msg.includes("llamada")) {
      renderFlujo(flujos.llamadas);
    } else if (msg.includes("mensaje")) {
      renderFlujo(flujos.mensajes);
    } else if (msg.includes("dato")) {
      renderFlujo(flujos.datos);
    } else {
      // Usar IA para consultas genéricas
      try {
        const inputs = await transformers.AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill").encode(msg);
        const outputs = await model.generate(inputs, { 
          max_length: 150, 
          temperature: 0.7, 
          top_k: 50 
        });
        const response = await transformers.AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill").decode(outputs[0]);
        addLine("🤖", response || "No entendí tu consulta. Escribe 'llamadas', 'mensajes' o 'datos' para soporte guiado, o intenta de nuevo.");
      } catch (e) {
        console.error("Error con el modelo:", e);
        addLine("🤖", "Error al procesar la consulta. Escribe 'llamadas', 'mensajes' o 'datos' para soporte guiado.");
      }
    }
  }
});

// Añadir línea al chat
function addLine(from, text) {
  const line = document.createElement("div");
  line.innerHTML = `<strong>${from}</strong>: ${text}`;
  content.appendChild(line);
  content.scrollTop = content.scrollHeight;
}

// Renderizar nodo del flujo
function renderFlujo(nodo) {
  addLine("🤖", nodo.texto);
  if (nodo.hijos) {
    nodo.hijos.forEach((h) => {
      const b = document.createElement("button");
      b.textContent = h.texto;
      b.className = "opcion-btn";
      b.onclick = () => {
        addLine("👤", h.texto);
        renderFlujo(h);
      };
      content.appendChild(b);
    });
    content.scrollTop = content.scrollHeight;
  }
}

// Cargar modelo al iniciar la página
document.addEventListener("DOMContentLoaded", loadModel);