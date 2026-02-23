document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // REFERENCIAS DOM
    // =========================
    const tipoRegistro = document.getElementById("tipoRegistro");
    const categoriaPlantilla = document.getElementById("categoriaPlantilla");
    const plantillaFinal = document.getElementById("plantillaFinal");
    const editorPlantilla = document.getElementById("editorPlantilla");
    const copiarBtn = document.getElementById("copiarBtn");
    const limpiarBtn = document.getElementById("limpiarBtn");

    // =========================
    // ASEGURAR ESTRUCTURA BASE
    // =========================
    window.PLANTILLAS = window.PLANTILLAS || {};

    // =========================
    // FUNCION RESET GENERAL
    // =========================
    function resetFormulario() {

        editorPlantilla.innerText = "";

        tipoRegistro.selectedIndex = 0;

        categoriaPlantilla.innerHTML = '<option value="">Selecciona...</option>';
        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';

        categoriaPlantilla.disabled = true;
        plantillaFinal.disabled = true;
    }

    // =========================
    // DETECTAR SI UN TIPO ES DIRECTO
    // (Automático según estructura)
    // =========================
    function esTipoDirecto(tipo) {

        if (!window.PLANTILLAS[tipo]) return false;

        const valores = Object.values(window.PLANTILLAS[tipo]);

        // Si el primer valor es string → es directo
        return typeof valores[0] === "string";
    }

    // =========================
    // CAMBIO DE TIPO REGISTRO
    // =========================
    tipoRegistro.addEventListener("change", function () {

        const tipo = this.value;

        // Reset parcial
        categoriaPlantilla.innerHTML = '<option value="">Selecciona...</option>';
        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';
        editorPlantilla.innerText = "";

        categoriaPlantilla.disabled = true;
        plantillaFinal.disabled = true;

        if (!tipo || !window.PLANTILLAS[tipo]) return;

        // 🔥 Detecta automáticamente si es directo
        if (esTipoDirecto(tipo)) {

            plantillaFinal.disabled = false;

            Object.keys(window.PLANTILLAS[tipo]).forEach(nombre => {
                const option = document.createElement("option");
                option.value = nombre;
                option.textContent = nombre;
                plantillaFinal.appendChild(option);
            });

            return;
        }

        // 🟢 Caso con categorías
        categoriaPlantilla.disabled = false;

        Object.keys(window.PLANTILLAS[tipo]).forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            categoriaPlantilla.appendChild(option);
        });

    });

    // =========================
    // CAMBIO DE CATEGORIA
    // =========================
    categoriaPlantilla.addEventListener("change", function () {

        const tipo = tipoRegistro.value;
        const categoria = this.value;

        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';
        editorPlantilla.innerText = "";
        plantillaFinal.disabled = true;

        if (!categoria || !window.PLANTILLAS[tipo]) return;

        const plantillas = window.PLANTILLAS[tipo][categoria];

        if (!plantillas) return;

        plantillaFinal.disabled = false;

        Object.keys(plantillas).forEach(nombre => {
            const option = document.createElement("option");
            option.value = nombre;
            option.textContent = nombre;
            plantillaFinal.appendChild(option);
        });

    });

    // =========================
    // CAMBIO DE PLANTILLA FINAL
    // =========================
    plantillaFinal.addEventListener("change", function () {

        const tipo = tipoRegistro.value;
        const categoria = categoriaPlantilla.value;
        const nombre = this.value;

        editorPlantilla.innerText = "";

        if (!nombre || !window.PLANTILLAS[tipo]) return;

        // 🔥 Si es directo
        if (esTipoDirecto(tipo)) {
            editorPlantilla.innerText =
                window.PLANTILLAS[tipo][nombre] || "";
        }
        // 🟢 Si tiene categoría
        else {
            editorPlantilla.innerText =
                window.PLANTILLAS[tipo][categoria]?.[nombre] || "";
        }

    });

    // =========================
    // BOTON COPIAR (con reset automático)
    // =========================
    copiarBtn.addEventListener("click", function () {

        const texto = editorPlantilla.innerText;

        if (!texto.trim()) return;

        navigator.clipboard.writeText(texto)
            .then(() => {

                const original = copiarBtn.innerText;

                copiarBtn.innerText = "¡Copiado!";
                copiarBtn.disabled = true;

                setTimeout(() => {
                    copiarBtn.innerText = original;
                    copiarBtn.disabled = false;

                    // 🔥 Limpieza automática después de copiar
                    resetFormulario();

                }, 1000);

            })
            .catch(() => {

                copiarBtn.innerText = "Error";

                setTimeout(() => {
                    copiarBtn.innerText = "Copiar Plantilla";
                }, 700);

            });

    });

    // =========================
    // BOTON LIMPIAR (manual)
    // =========================
    limpiarBtn.addEventListener("click", function () {
        resetFormulario();
    });
});