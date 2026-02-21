document.addEventListener("DOMContentLoaded", function () {

    const tipoRegistro = document.getElementById("tipoRegistro");
    const categoriaPlantilla = document.getElementById("categoriaPlantilla");
    const plantillaFinal = document.getElementById("plantillaFinal");
    const editorPlantilla = document.getElementById("editorPlantilla");
    const copiarBtn = document.getElementById("copiarBtn");
    const limpiarBtn = document.getElementById("limpiarBtn");

    /* =========================
       MENU 1 → CATEGORIAS
    ========================= */
    tipoRegistro.addEventListener("change", function () {

        const tipo = this.value;

        categoriaPlantilla.innerHTML = '<option value="">Selecciona...</option>';
        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';
        editorPlantilla.innerHTML = "";

        plantillaFinal.disabled = true;

        if (!tipo || !window.PLANTILLAS[tipo]) {
            categoriaPlantilla.disabled = true;
            return;
        }

        categoriaPlantilla.disabled = false;

        const categorias = Object.keys(window.PLANTILLAS[tipo]);

        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            categoriaPlantilla.appendChild(option);
        });

    });


    /* =========================
       MENU 2 → PLANTILLAS
    ========================= */
    categoriaPlantilla.addEventListener("change", function () {

        const tipo = tipoRegistro.value;
        const categoria = this.value;

        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';
        editorPlantilla.innerHTML = "";

        if (!categoria) {
            plantillaFinal.disabled = true;
            return;
        }

        plantillaFinal.disabled = false;

        const plantillas = window.PLANTILLAS[tipo][categoria];

        Object.keys(plantillas).forEach(nombrePlantilla => {
            const option = document.createElement("option");
            option.value = nombrePlantilla;
            option.textContent = nombrePlantilla;
            plantillaFinal.appendChild(option);
        });

    });


    /* =========================
       MENU 3 → CONTENIDO
    ========================= */
    plantillaFinal.addEventListener("change", function () {

        const tipo = tipoRegistro.value;
        const categoria = categoriaPlantilla.value;
        const nombrePlantilla = this.value;

        if (!nombrePlantilla) {
            editorPlantilla.innerHTML = "";
            return;
        }

        editorPlantilla.innerText =
            window.PLANTILLAS[tipo][categoria][nombrePlantilla];

    });


    /* =========================
       BOTON COPIAR
    ========================= */
    copiarBtn.addEventListener("click", function () {

        const texto = editorPlantilla.innerText;

        if (!texto.trim()) return;

        navigator.clipboard.writeText(texto)
            .then(() => {

                const textoOriginal = copiarBtn.innerText;

                copiarBtn.innerText = "¡Copiado!";
                copiarBtn.disabled = true;

                setTimeout(() => {
                    copiarBtn.innerText = textoOriginal;
                    copiarBtn.disabled = false;
                }, 1500);

            })
            .catch(() => {

                copiarBtn.innerText = "Error";
                setTimeout(() => {
                    copiarBtn.innerText = "Copiar Plantilla";
                }, 1500);

            });

    });


    /* =========================
       BOTON LIMPIAR
    ========================= */
    limpiarBtn.addEventListener("click", function () {

        editorPlantilla.innerHTML = "";

        tipoRegistro.selectedIndex = 0;

        categoriaPlantilla.innerHTML = '<option value="">Selecciona...</option>';
        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';

        categoriaPlantilla.disabled = true;
        plantillaFinal.disabled = true;

    });

});