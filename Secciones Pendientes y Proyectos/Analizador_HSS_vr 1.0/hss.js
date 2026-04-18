// ===============================
// ESTADO GLOBAL
// ===============================
let modoRapido = false;

// ===============================
// 🎯 BASELINE POR CAMPO
// ===============================
const baselineCampos = {
    ATTACH_STATUS: { esperado: "2", tipo: "alerta" },
    GPRS_SUBSCRIPTION_ENABLED: { esperado: "1", tipo: "alerta" },
    E_UTRAN_ALLOWED: { esperado: "1", tipo: "warning" },
    BAIC: { esperado: "0", tipo: "alerta" },
    UTRAN_ALLOWED: { esperado: "1", tipo: "warning" },
    GERAN_ALLOWED: { esperado: "1", tipo: "warning" }
};

// ===============================
// 🎯 BASELINE POR ESTADO (con campo)
// ===============================
const baselineEstados = {
    red: { esperado: true, campo: "ATTACH_STATUS" },
    datos: { esperado: true, campo: "GPRS_SUBSCRIPTION_ENABLED" },
    lte: { esperado: true, campo: "E_UTRAN_ALLOWED" },
    voz: { esperado: true, campo: "BAIC" }
};

// ===============================
// LIMPIAR
// ===============================
function limpiarHSS() {
    document.getElementById("inputHSS").value = "";
    document.getElementById("resultadoHSS").innerHTML = "";
}

// ===============================
// TOGGLE MODO
// ===============================
function toggleModo() {
    modoRapido = !modoRapido;

    const btn = document.getElementById("btnModo");

    if (btn) {
        btn.textContent = modoRapido
            ? "Modo rápido: ON"
            : "Modo rápido: OFF";

        btn.classList.toggle("activo", modoRapido);
    }

    analizarHSS();
}
// ===============================
// ICONOS
// ===============================
function obtenerIcono(tipo) {
    return tipo === "ok" ? "🟢" :
           tipo === "alerta" ? "🔴" :
           tipo === "warning" ? "🟡" : "🔵";
}

// ===============================
// BLOQUE VISUAL
// ===============================
function crearCampo(nombre, valor, interpretacion, tipo = "ok") {
    const icono = obtenerIcono(tipo);

    return `
        <div class="campo-hss campo-${tipo}">
            <div class="crudo">${nombre}: ${valor ?? "N/A"}</div>
            <div class="interpretacion">
                <span class="icono">${icono}</span>
                ${interpretacion}
            </div>
        </div>
    `;
}

// ===============================
// FILTRO
// ===============================
function esCampoRelevante(campo, valor) {
    if (valor === null || valor === "") return false;
    if (valor === "0/0/0/0") return false;
    if (campo.includes("TIMER")) return false;
    return true;
}

// ===============================
// INTERPRETACIÓN GENÉRICA
// ===============================
function interpretarCampoDesconocido(campo) {
    if (campo.includes("QOS")) return "Parámetro QoS";
    if (campo.includes("APN")) return "Configuración APN";
    if (campo.includes("IMEI")) return "Identificador de equipo";
    if (campo.includes("IMSI")) return "Identificador SIM";
    if (campo.includes("MME")) return "Nodo LTE";
    if (campo.includes("MSC")) return "Nodo de voz";
    if (campo.includes("VLR")) return "Registro de localización";
    return "Campo no documentado";
}

// ===============================
// 🎨 EVALUAR ESTADO DEL CAMPO
// ===============================
function evaluarEstadoCampo(campo, valor) {
    const config = baselineCampos[campo];

    if (!config) return "ok";

    if (valor === config.esperado) return "ok";

    return config.tipo || "alerta";
}

// ===============================
// 🧠 MOTOR DE REGLAS
// ===============================
function evaluarReglas(p) {

    const errores = [];
    const sugerencias = [];

    const estado = {
        red: p.ATTACH_STATUS === "2",
        datos: p.GPRS_SUBSCRIPTION_ENABLED === "1",
        lte: p.E_UTRAN_ALLOWED === "1",
        voz: p.BAIC === "0"
    };

    // ===============================
    // 🔴 VALIDACIÓN BASELINE ESTADOS
    // ===============================
    Object.keys(baselineEstados).forEach(key => {

        const config = baselineEstados[key];

        if (estado[key] !== config.esperado) {

            errores.push({
                campo: config.campo,
                valor: p[config.campo],
                mensaje: `El estado de ${key.toUpperCase()} no coincide con lo esperado`,
                tipo: "alerta"
            });
        }
    });

    // ===============================
    // 🧠 REGLAS AVANZADAS
    // ===============================
    const reglas = [

        {
            condicion: (p, estado) => estado.lte && !estado.red,
            campo: "ATTACH_STATUS",
            error: "LTE permitido pero sin registro en red",
            sugerencia: "Validar cobertura o SIM"
        },

        {
            condicion: (p, estado) => p.SERVING_MME_NAME && !estado.red,
            campo: "SERVING_MME_NAME",
            error: "Sesión LTE activa sin registro",
            sugerencia: "Reiniciar sesión de red"
        },

        {
            condicion: (p, estado) => estado.datos && !p.SERVING_MME_NAME,
            campo: "SERVING_MME_NAME",
            error: "Datos activos sin sesión LTE",
            sugerencia: "Revisar APN o red"
        },

        {
            condicion: (p) =>
                p.APN_CONFIG_ENTRY_NAMES?.includes("IMS") &&
                !p.EPS_QOS_COS_NAME_3,
            campo: "EPS_QOS_COS_NAME_3",
            error: "IMS sin QoS (posible falla VoLTE)",
            sugerencia: "Validar perfil IMS"
        },

        {
            condicion: (p) =>
                p.UTRAN_ALLOWED === "0" && p.GERAN_ALLOWED === "1",
            campo: "UTRAN_ALLOWED",
            error: "Línea limitada a red 2G",
            sugerencia: "Validar cobertura",
            tipo: "warning"
        }
    ];

    reglas.forEach(r => {
        if (r.condicion(p, estado)) {
            errores.push({
                campo: r.campo || "-",
                valor: p[r.campo],
                mensaje: r.error,
                tipo: r.tipo || "alerta"
            });

            if (r.sugerencia) {
                sugerencias.push(r.sugerencia);
            }
        }
    });

    return { errores, sugerencias, estado };
}

// ===============================
// ANALIZAR HSS
// ===============================
function analizarHSS() {

    const input = document.getElementById("inputHSS").value;
    const output = document.getElementById("resultadoHSS");

    let data;

    try {
        data = JSON.parse(input);
    } catch (e) {
        output.innerHTML = `<div class="error-hss">❌ JSON inválido</div>`;
        return;
    }

    const p = data?.result?.profile_hss?.[0];
    if (!p) {
        output.innerHTML = `<div class="error-hss">❌ No se encontró perfil HSS</div>`;
        return;
    }

    const { errores, sugerencias, estado } = evaluarReglas(p);

    let bloqueConocidos = "";
    let bloqueDesconocidos = "";
    let bloqueErrores = "";
    let bloqueSugerencias = "";

    // ===============================
    // CAMPOS
    // ===============================
    for (let campo in p) {

        let valor = p[campo];
        if (!esCampoRelevante(campo, valor)) continue;

        let campoNormalizado = campo.replace(/-/g, "_");

        if (typeof diccionarioHSS !== "undefined" && diccionarioHSS[campoNormalizado]) {

            const info = diccionarioHSS[campoNormalizado];
            let interpretacion = info.valores[valor] || "Valor no documentado";

            const tipoCampo = evaluarEstadoCampo(campoNormalizado, valor);

            bloqueConocidos += crearCampo(
                `${campo} (${info.nombre})`,
                valor,
                `${interpretacion}. ${info.descripcion}`,
                tipoCampo
            );

        } else {

            bloqueDesconocidos += crearCampo(
                campo,
                valor,
                interpretarCampoDesconocido(campo),
                "warning"
            );
        }
    }

    // ===============================
    // ERRORES
    // ===============================
    if (errores.length === 0) {
        bloqueErrores += crearCampo("RESULTADO", "OK", "Sin inconsistencias", "ok");
    } else {
        errores.forEach(e => {

            const lineaHSS = e.campo
                ? `"${e.campo}": "${e.valor ?? "N/A"}"`
                : "-";

            bloqueErrores += crearCampo(
                "ERROR",
                lineaHSS,
                e.mensaje,
                e.tipo
            );
        });
    }

    // ===============================
    // SUGERENCIAS
    // ===============================
    sugerencias.forEach(s => {
        bloqueSugerencias += crearCampo("Sugerencia", "-", s, "warning");
    });

    // ===============================
    // RESUMEN
    // ===============================
    let resumen = `
        <div class="resumen-hss">
            <div>📶 Red: ${estado.red ? "OK" : "X"}</div>
            <div>🌐 Datos: ${estado.datos ? "OK" : "X"}</div>
            <div>📞 Voz: ${estado.voz ? "OK" : "X"}</div>
            <div>📡 LTE: ${estado.lte ? "OK" : "X"}</div>
        </div>
    `;

    // ===============================
    // RENDER
    // ===============================
    let html = resumen;

    if (!modoRapido && bloqueDesconocidos) {
        html += `<h3 class="titulo-seccion-hss">🟡 Campos sin documentar</h3>` + bloqueDesconocidos;
    }

    if (bloqueConocidos) {
        html += `<h3 class="titulo-seccion-hss">🟢 Campos interpretados</h3>` + bloqueConocidos;
    }

    html += `<h3 class="titulo-seccion-hss">🚨 Inconsistencias</h3>` + bloqueErrores;

    if (bloqueSugerencias) {
        html += `<h3 class="titulo-seccion-hss">🛠️ Sugerencias</h3>` + bloqueSugerencias;
    }

    output.innerHTML = html;
}