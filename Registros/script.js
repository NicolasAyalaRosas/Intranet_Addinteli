document.addEventListener("DOMContentLoaded", function () {

    const botonesTipo = document.querySelectorAll(".btn-tipo");
    const bloqueCategorias = document.getElementById("bloqueCategorias");
    const contenedorCategorias = document.getElementById("contenedorCategorias");
    const bloquePlantillas = document.getElementById("bloquePlantillas");
    const contenedorPlantillas = document.getElementById("contenedorPlantillas");
    const editor = document.getElementById("editorPlantilla");
    const copiarBtn = document.getElementById("copiarBtn");
    const limpiarBtn = document.getElementById("limpiarBtn");

    const buscadorInput = document.getElementById("buscadorInput");
    const sugerenciasBox = document.getElementById("sugerencias");

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

        buscadorInput.value = "";
        sugerenciasBox.classList.add("oculto");
    }

    // 🔥 SCROLL CENTRADO
    function scrollCentrado(elemento) {
        const rect = elemento.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const offset = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);

        window.scrollTo({
            top: offset,
            behavior: "smooth"
        });
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

            const esDirecto = typeof Object.values(data)[0] === "string";

            if (esDirecto) {
                bloqueCategorias.classList.add("oculto");
                bloquePlantillas.classList.remove("oculto");

                Object.keys(data).forEach(nombre => {
                    crearBotonPlantilla(nombre, data[nombre]);
                });

                scrollCentrado(bloquePlantillas);

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

                        scrollCentrado(bloquePlantillas);
                    });

                    contenedorCategorias.appendChild(btnCat);
                });

                scrollCentrado(bloqueCategorias);
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

            scrollCentrado(editor);
        });

        contenedorPlantillas.appendChild(btn);
    }

    /* =========================
       BUSCADOR INTELIGENTE
    ========================== */

    function obtenerTodasLasPlantillas() {
        const resultado = [];

        Object.keys(window.PLANTILLAS).forEach(tipo => {
            const data = window.PLANTILLAS[tipo];

            const esDirecto = typeof Object.values(data)[0] === "string";

            if (esDirecto) {
                Object.keys(data).forEach(nombre => {
                    resultado.push({
                        nombre,
                        contenido: data[nombre],
                        tipo
                    });
                });
            } else {
                Object.keys(data).forEach(cat => {
                    Object.keys(data[cat]).forEach(nombre => {
                        resultado.push({
                            nombre,
                            contenido: data[cat][nombre],
                            tipo,
                            categoria: cat
                        });
                    });
                });
            }
        });

        return resultado;
    }

    const TODAS = obtenerTodasLasPlantillas();

    /* 🧠 KEYWORDS */
    const KEYWORDS = {
        "sin señal": ["sin red", "sin servicio", "no tiene señal", "sin cobertura"],
        "datos": ["no navega", "sin internet", "datos lentos", "no carga"],
        "sms": ["no llegan sms", "no recibe mensajes", "no envia sms"],
        "voz": ["no puede llamar", "no salen llamadas", "no entran llamadas"],
        "sim": ["sim swap", "cambio sim", "chip"],
        "portabilidad": ["portar", "cambio de compañía"],
        "suspension": ["linea suspendida", "sin servicio por pago"],
        "reactivacion": ["reactivar linea", "volver a activar"]
    };

    buscadorInput.addEventListener("input", function () {

        const valor = this.value.toLowerCase().trim();
        sugerenciasBox.innerHTML = "";

        if (!valor) {
            sugerenciasBox.classList.add("oculto");
            return;
        }

        const palabras = valor.split(" ");

        const filtradas = TODAS
            .map(p => {

                let score = 0;
                const nombre = p.nombre.toLowerCase();
                const contenido = p.contenido.toLowerCase();
                const categoria = (p.categoria || "").toLowerCase();

                if (nombre.includes(valor)) score += 5;
                if (contenido.includes(valor)) score += 3;

                palabras.forEach(palabra => {
                    if (nombre.includes(palabra)) score += 2;
                    if (contenido.includes(palabra)) score += 1;
                });

                Object.keys(KEYWORDS).forEach(key => {
                    KEYWORDS[key].forEach(k => {
                        if (valor.includes(k)) {
                            if (
                                nombre.includes(key) ||
                                categoria.includes(key) ||
                                contenido.includes(key)
                            ) {
                                score += 10;
                            }
                        }
                    });
                });

                return { ...p, score };
            })
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        filtradas.forEach(p => {

            const div = document.createElement("div");

            div.innerHTML = `
                <strong>${p.nombre}</strong><br>
                <small>${p.tipo}${p.categoria ? " → " + p.categoria : ""}</small>
            `;

            div.addEventListener("click", () => {
                seleccionarDesdeBusqueda(p);
            });

            sugerenciasBox.appendChild(div);
        });

        sugerenciasBox.classList.remove("oculto");
    });

    function seleccionarDesdeBusqueda(p) {

        editor.innerText = p.contenido;

        bloqueCategorias.classList.add("oculto");
        bloquePlantillas.classList.add("oculto");

        scrollCentrado(editor);

        sugerenciasBox.classList.add("oculto");
        buscadorInput.value = "";
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