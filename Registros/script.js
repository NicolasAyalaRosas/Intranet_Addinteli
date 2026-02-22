document.addEventListener("DOMContentLoaded", function () {

    const tipoRegistro = document.getElementById("tipoRegistro");
    const categoriaPlantilla = document.getElementById("categoriaPlantilla");
    const plantillaFinal = document.getElementById("plantillaFinal");
    const editorPlantilla = document.getElementById("editorPlantilla");
    const copiarBtn = document.getElementById("copiarBtn");
    const limpiarBtn = document.getElementById("limpiarBtn");

    tipoRegistro.addEventListener("change", function () {

        const tipo = this.value;

        categoriaPlantilla.innerHTML = '<option value="">Selecciona...</option>';
        plantillaFinal.innerHTML = '<option value="">Selecciona...</option>';
        editorPlantilla.innerHTML = "";

        plantillaFinal.disabled = true;

        if (!tipo) {
            categoriaPlantilla.disabled = true;
            return;
        }

        /* 🔥 CASO ESPECIAL */
        if (tipo === "tickets" || tipo === "escalamiento") {

            categoriaPlantilla.disabled = true;
            plantillaFinal.disabled = false;

            const plantillas = window.PLANTILLAS[tipo];

            Object.keys(plantillas).forEach(nombre => {
                const option = document.createElement("option");
                option.value = nombre;
                option.textContent = nombre;
                plantillaFinal.appendChild(option);
            });

            return;
        }

        /* NORMAL */
        categoriaPlantilla.disabled = false;

        const categorias = Object.keys(window.PLANTILLAS[tipo]);

        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            categoriaPlantilla.appendChild(option);
        });

    });

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

        Object.keys(plantillas).forEach(nombre => {
            const option = document.createElement("option");
            option.value = nombre;
            option.textContent = nombre;
            plantillaFinal.appendChild(option);
        });

    });

    plantillaFinal.addEventListener("change", function () {

        const tipo = tipoRegistro.value;
        const categoria = categoriaPlantilla.value;
        const nombre = this.value;

        if (!nombre) {
            editorPlantilla.innerHTML = "";
            return;
        }

        if (tipo === "tickets" || tipo === "escalamiento") {
            editorPlantilla.innerText =
                window.PLANTILLAS[tipo][nombre];
        } else {
            editorPlantilla.innerText =
                window.PLANTILLAS[tipo][categoria][nombre];
        }

    });

});