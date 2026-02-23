document.addEventListener("DOMContentLoaded", function () {

    const botonesTipo = document.querySelectorAll(".btn-tipo");
    const bloqueCategorias = document.getElementById("bloqueCategorias");
    const contenedorCategorias = document.getElementById("contenedorCategorias");
    const bloquePlantillas = document.getElementById("bloquePlantillas");
    const contenedorPlantillas = document.getElementById("contenedorPlantillas");
    const editor = document.getElementById("editorPlantilla");
    const copiarBtn = document.getElementById("copiarBtn");
    const limpiarBtn = document.getElementById("limpiarBtn");

    let tipoSeleccionado = null;
    let categoriaSeleccionada = null;

    function limpiarActivos(grupo) {
        grupo.forEach(btn => btn.classList.remove("activo"));
    }

    function resetTodo() {
        tipoSeleccionado = null;
        categoriaSeleccionada = null;
        editor.innerText = "";
        bloqueCategorias.classList.add("oculto");
        bloquePlantillas.classList.add("oculto");
        contenedorCategorias.innerHTML = "";
        contenedorPlantillas.innerHTML = "";
        limpiarActivos(botonesTipo);
    }

    /* =========================
       BOTONES TIPO
    ========================== */
    botonesTipo.forEach(btn => {
        btn.addEventListener("click", function () {

            limpiarActivos(botonesTipo);
            this.classList.add("activo");

            tipoSeleccionado = this.dataset.tipo;
            categoriaSeleccionada = null;

            editor.innerText = "";
            contenedorCategorias.innerHTML = "";
            contenedorPlantillas.innerHTML = "";
            bloquePlantillas.classList.add("oculto");

            const data = window.PLANTILLAS[tipoSeleccionado];

            if (!data) return;

            // Si es estructura directa (correo/escalamiento)
            const esDirecto = typeof Object.values(data)[0] === "string";

            if (esDirecto) {
                bloqueCategorias.classList.add("oculto");
                bloquePlantillas.classList.remove("oculto");

                Object.keys(data).forEach(nombre => {
                    crearBotonPlantilla(nombre, data[nombre]);
                });

            } else {
                bloqueCategorias.classList.remove("oculto");

                Object.keys(data).forEach(categoria => {
                    const btnCat = document.createElement("button");
                    btnCat.textContent = categoria;

                    btnCat.addEventListener("click", function () {

                        const botonesCat = contenedorCategorias.querySelectorAll("button");
                        limpiarActivos(botonesCat);
                        this.classList.add("activo");

                        categoriaSeleccionada = categoria;
                        contenedorPlantillas.innerHTML = "";
                        bloquePlantillas.classList.remove("oculto");

                        Object.keys(data[categoria]).forEach(nombre => {
                            crearBotonPlantilla(nombre, data[categoria][nombre]);
                        });

                    });

                    contenedorCategorias.appendChild(btnCat);
                });
            }
        });
    });

    function crearBotonPlantilla(nombre, contenido) {
        const btn = document.createElement("button");
        btn.textContent = nombre;

        btn.addEventListener("click", function () {
            const botonesPlant = contenedorPlantillas.querySelectorAll("button");
            limpiarActivos(botonesPlant);
            this.classList.add("activo");
            editor.innerText = contenido;
        });

        contenedorPlantillas.appendChild(btn);
    }

    /* =========================
       COPIAR
    ========================== */
    copiarBtn.addEventListener("click", function () {

        const texto = editor.innerText;
        if (!texto.trim()) return;

        navigator.clipboard.writeText(texto).then(() => {

            const original = copiarBtn.innerText;

            copiarBtn.innerText = "¡Copiado!";
            copiarBtn.disabled = true;

            setTimeout(() => {
                copiarBtn.innerText = original;
                copiarBtn.disabled = false;
                resetTodo();
            }, 1200);

        });
    });

    /* =========================
       LIMPIAR
    ========================== */
    limpiarBtn.addEventListener("click", function () {
        resetTodo();
    });

});