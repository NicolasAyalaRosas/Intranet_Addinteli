// ===============================
// BASE DE DATOS TEMPORAL (LUEGO LA CONECTAMOS A JSON)
// ===============================

const BASE_PLANTILLAS = {

    callcenter: {
        validaciones: {
            sin_red: "Cliente reporta línea sin red.\nSe validan servicios activos.\nSe realizan pruebas básicas.",
            sin_datos: "Cliente reporta sin navegación.\nSe valida APN.\nSe solicita reinicio de equipo."
        },
        informacion: {
            saldo: "Se informa saldo actual.\nSe explica vigencia del plan."
        }
    },

    correo: {
        bienvenida: {
            nuevo_cliente: "Estimado cliente,\n\nLe damos la bienvenida a nuestro servicio.\n\nSaludos cordiales."
        }
    },

    tickets: {
        soporte: {
            escalamiento: "Se escala caso a segundo nivel.\nSe adjuntan evidencias.\nPendiente seguimiento."
        }
    }

};

// ===============================
// ELEMENTOS
// ===============================

const tipoRegistro = document.getElementById("tipoRegistro");
const categoriaPlantilla = document.getElementById("categoriaPlantilla");
const plantillaFinal = document.getElementById("plantillaFinal");
const editor = document.getElementById("editorPlantilla");
const copiarBtn = document.getElementById("copiarBtn");

// ===============================
// EVENTO MENÚ 1
// ===============================

tipoRegistro.addEventListener("change", () => {

    resetSelect(categoriaPlantilla);
    resetSelect(plantillaFinal);
    editor.innerHTML = "";

    const tipo = tipoRegistro.value;

    if (!tipo) return;

    categoriaPlantilla.disabled = false;

    const categorias = Object.keys(BASE_PLANTILLAS[tipo]);

    categorias.forEach(cat => {
        categoriaPlantilla.innerHTML += `<option value="${cat}">${formatearTexto(cat)}</option>`;
    });

});

// ===============================
// EVENTO MENÚ 2
// ===============================

categoriaPlantilla.addEventListener("change", () => {

    resetSelect(plantillaFinal);
    editor.innerHTML = "";

    const tipo = tipoRegistro.value;
    const categoria = categoriaPlantilla.value;

    if (!categoria) return;

    plantillaFinal.disabled = false;

    const plantillas = Object.keys(BASE_PLANTILLAS[tipo][categoria]);

    plantillas.forEach(pl => {
        plantillaFinal.innerHTML += `<option value="${pl}">${formatearTexto(pl)}</option>`;
    });

});

// ===============================
// EVENTO MENÚ 3
// ===============================

plantillaFinal.addEventListener("change", () => {

    const tipo = tipoRegistro.value;
    const categoria = categoriaPlantilla.value;
    const plantilla = plantillaFinal.value;

    if (!plantilla) return;

    const contenido = BASE_PLANTILLAS[tipo][categoria][plantilla];

    editor.innerText = contenido;

});

// ===============================
// COPIAR
// ===============================

copiarBtn.addEventListener("click", () => {

    const texto = editor.innerText;

    navigator.clipboard.writeText(texto)
        .then(() => alert("Plantilla copiada"))
        .catch(() => alert("Error al copiar"));

});

// ===============================
// FUNCIONES AUXILIARES
// ===============================

function resetSelect(select) {
    select.innerHTML = `<option value="">Selecciona...</option>`;
    select.disabled = true;
}

function formatearTexto(texto) {
    return texto.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}