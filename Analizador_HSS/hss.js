// ================================================
// ANALIZADOR HSS - VERSIÓN FINAL 2.9 (Limpia)
// ================================================

console.log("✅ hss.js v2.9 - Versión final limpia");

// ====================== VALIDACIÓN DE IMEI ======================
function validarIMEI(imei) {
    if (!imei || typeof imei !== "string") {
        return { mensaje: "IMEI no encontrado" };
    }

    const cleaned = imei.replace(/\D/g, '');
    if (cleaned.length !== 15 && cleaned.length !== 16) {
        return { mensaje: `Longitud inválida (${cleaned.length} dígitos)` };
    }

    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }

    const esValido = (sum % 10 === 0);
    return {
        mensaje: esValido ? "✅ IMEI válido" : "❌ IMEI inválido",
        tipo: cleaned.length === 15 ? "IMEI estándar" : "IMEISV"
    };
}

// ====================== MCC/MNC ======================
function getPlmnInfo(mcc, mnc) {
    if (!window.mccMncData) return null;
    const mccNum = parseInt(mcc);
    const mncStr = String(mnc).trim();

    const registro = window.mccMncData.find(entry => 
        parseInt(entry.MCC) === mccNum && String(entry.MNC).trim() === mncStr
    );

    if (!registro) return null;

    return {
        pais: registro.Pais || "Desconocido",
        operador: registro.Operador || "Operador desconocido",
        home: (mcc === "334" && (mnc === "140" || mnc === 140))
    };
}

function mostrarInfoPLMN(p) {
    const mcc = p.VISITED_PLMN_ID_MCC;
    const mnc = p.VISITED_PLMN_ID_MNC;
    if (!mcc || !mnc) return "";

    const info = getPlmnInfo(mcc, mnc);
    if (!info) return `<strong>MCC ${mcc} - MNC ${mnc}</strong>`;

    return `
        <strong>🌍 ${info.pais} - ${info.operador}</strong>
        ${info.home 
            ? ` <span style="color:#2ecc71;font-weight:bold;">(Red Local - Altan)</span>` 
            : ` <span style="color:#e74c3c;font-weight:bold;">⚠️ ROAMING</span>`}
    `;
}

function bpsToMbps(bps) {
    if (!bps) return "N/A";
    return (parseInt(bps) / 1000000) + " Mbps";
}

// ====================== INTERPRETACIÓN DE CAMPOS ======================
function interpretarCampoDesconocido(campo) {
    const c = campo.toUpperCase();
    if (c.includes("QOS") || c.includes("EPS_QOS")) return "Perfil de Calidad de Servicio (QoS)";
    if (c.includes("PDP_CTX")) return "Clase de Servicio PDP";
    if (c.includes("APN_CONFIG_ENTRY_NAME")) return "Nombre del APN";
    if (c.includes("TIMER")) return "Temporizador de red";
    if (c.includes("STATE_ATT")) return "Estado de Attach";
    if (c.includes("SERVING_")) return "Nodo de red actual";
    if (c === "SERVING_SGSN_NUM") return "SGSN (0 = sin registro 2G/3G)";
    if (c.includes("MSC") || c.includes("VLR")) return "Elementos de red de voz";
    return "Campo técnico específico del HSS";
}

// ====================== DIAGNÓSTICO INTELIGENTE ======================
function generarDiagnostico(p) {
    let items = [];
    const esRoaming = p.VISITED_PLMN_ID_MCC && p.VISITED_PLMN_ID_MCC !== "334";

    if (p.ATTACH_STATUS === "3" || p.ATTACH_STATUS === "2") 
        items.push("✅ Línea correctamente adjunta en la red");
    else 
        items.push("⚠️ Posible problema de registro");

    if (esRoaming) 
        items.push("🌍 Usuario en roaming internacional");
    else 
        items.push("🏠 Usuario en red local (Altan)");

    if (p.GPRS_SUBSCRIPTION_ENABLED === "1") items.push("🌐 Datos habilitados");
    if (p.E_UTRAN_ALLOWED === "1" && p.UTRAN_ALLOWED === "1" && p.GERAN_ALLOWED === "1") 
        items.push("📡 Todas las tecnologías permitidas");

    if (p.APN_CONFIG_ENTRY_NAMES && p.APN_CONFIG_ENTRY_NAMES.includes("IMS")) 
        items.push("✅ VoLTE configurado");

    const ambrDL = parseInt(p.AMBR_MAX_REQ_BANDWIDTH_DL || 0) / 1000000;
    if (ambrDL >= 200) items.push(`⚡ Buen perfil de velocidad (${ambrDL} Mbps bajada)`);

    if (p.SERVING_SGSN_NUM === "1/1/1/0") 
        items.push("ℹ️ Solo registrado en LTE");

    return items;
}

// ====================== COPIAR ANÁLISIS ======================
function copiarAnalisis() {
    const resultadoDiv = document.getElementById("resultadoHSS");
    if (!resultadoDiv) return;

    const texto = resultadoDiv.innerText || resultadoDiv.textContent;
    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.getElementById("btnCopiar");
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = "✅ ¡Copiado!";
            btn.style.backgroundColor = "#27ae60";
            setTimeout(() => { btn.innerHTML = original; btn.style.backgroundColor = ""; }, 2000);
        }
    }).catch(() => alert("No se pudo copiar"));
}

// ====================== FUNCIONES BÁSICAS ======================
function limpiarHSS() {
    document.getElementById("inputHSS").value = "";
    document.getElementById("resultadoHSS").innerHTML = "";
}

// ====================== FUNCIÓN PRINCIPAL ======================
function analizarHSS() {
    const input = document.getElementById("inputHSS").value.trim();
    const output = document.getElementById("resultadoHSS");

    if (!input) {
        output.innerHTML = `<div class="error-hss">⚠️ Pega un perfil HSS primero</div>`;
        return;
    }

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

    const imeiValidation = validarIMEI(p.IMEI);

    let html = `<div class="resumen-hss"><h2>📊 Análisis de Perfil HSS</h2></div>`;

    html += generarResumenNarrativo(p, imeiValidation);

    // Detalle de Campos
    html += `<h3 class="titulo-seccion-hss">🔍 Detalle de Campos</h3>`;

    let bloqueConocidos = "";
    let bloqueDesconocidos = "";

    for (let campo in p) {
        let valor = p[campo];
        if (valor === null || valor === "" || valor === "0/0/0/0") continue;

        let campoNormalizado = campo.replace(/-/g, "_");

        if (diccionarioHSS && diccionarioHSS[campoNormalizado]) {
            const info = diccionarioHSS[campoNormalizado];
            let interpretacion = info.valores?.[valor] || info.descripcion || "Valor registrado";
            bloqueConocidos += crearCampo(`${campo} (${info.nombre})`, valor, interpretacion, "ok");
        } else {
            const interpretacion = interpretarCampoDesconocido(campo);
            bloqueDesconocidos += crearCampo(campo, valor, interpretacion, "warning");
        }
    }

    if (bloqueConocidos) html += bloqueConocidos;
    if (bloqueDesconocidos) {
        html += `<h3 class="titulo-seccion-hss">🟡 Campos adicionales</h3>` + bloqueDesconocidos;
    }

    output.innerHTML = html;
}

// ====================== RESUMEN NARRATIVO (Sin botón IMEI) ======================
function generarResumenNarrativo(p, imeiValidation) {
    const ambrDL = bpsToMbps(p.AMBR_MAX_REQ_BANDWIDTH_DL);
    const ambrUL = bpsToMbps(p.AMBR_MAX_REQ_BANDWIDTH_UL);
    const apns = (p.APN_CONFIG_ENTRY_NAMES || "").split(",").filter(a => a.trim() && a.trim() !== ",");

    const mccVisited = p.VISITED_PLMN_ID_MCC || "N/A";
    const mncVisited = p.VISITED_PLMN_ID_MNC || "N/A";
    const infoVisited = getPlmnInfo(mccVisited, mncVisited);
    const esRoaming = infoVisited && !infoVisited.home;

    const diagnosticoHTML = generarDiagnostico(p).map(item => `<li>${item}</li>`).join('');

    const imeiHTML = p.IMEI ? `
        <li>
            <strong>IMEI:</strong> ${p.IMEI}<br>
            <small style="color:#555;">${imeiValidation.mensaje} — ${imeiValidation.tipo}</small>
        </li>` : `<li><strong>IMEI:</strong> No disponible</li>`;

    return `
        <div style="background: linear-gradient(135deg, #f8fbff, #e6f0ff); padding: 28px; border-radius: 12px; margin: 30px 0; border: 2px solid #3498db;">
            <h3 style="margin-top:0; color:#0C2545;">📋 Resumen / Diagnóstico rápido</h3>

            <div style="background:#fff; padding:20px; border-radius:10px; border:3px solid #3498db; margin:15px 0;">
                <strong>🌍 Red actual (Visited PLMN):</strong><br><br>
                <div style="font-size:16px; margin-bottom:10px;">
                    🌍 <strong>${infoVisited ? infoVisited.pais + " - " + infoVisited.operador : "Desconocido"}</strong>
                    ${esRoaming ? ` <span style="color:#e74c3c;font-weight:bold;">⚠️ ROAMING</span>` : ` <span style="color:#2ecc71;font-weight:bold;">(Red Local)</span>`}
                </div>
                <div style="display:flex; gap:25px; font-size:14.5px;">
                    <div><span style="color:#3498db;">🏷️</span> <strong>MCC:</strong> ${mccVisited}</div>
                    <div><span style="color:#3498db;">🏷️</span> <strong>MNC:</strong> ${mncVisited}</div>
                </div>
            </div>

            <h4>👤 Información general del suscriptor</h4>
            <ul style="line-height:1.9; padding-left:22px;">
                <li><strong>IMSI:</strong> ${p.IMSI || "N/A"}</li>
                ${imeiHTML}
            </ul>

            <h4>📍 Estado de registro y ubicación actual</h4>
            <ul style="line-height:1.9; padding-left:22px;">
                <li><strong>ATTACH_STATUS:</strong> ${p.ATTACH_STATUS || "N/A"} → ${p.ATTACH_STATUS === "3" || p.ATTACH_STATUS === "2" ? "✅ Adjuntado correctamente" : "⚠️ Posible problema"}</li>
                <li><strong>SERVING_MME_NAME:</strong> ${p.SERVING_MME_NAME || "N/A"}</li>
            </ul>

            <h4>📡 Accesos de Radio permitidos</h4>
            <ul style="line-height:1.9; padding-left:22px;">
                <li>LTE: ${p.E_UTRAN_ALLOWED === "1" ? "✅" : "❌"} | 3G: ${p.UTRAN_ALLOWED === "1" ? "✅" : "❌"} | 2G: ${p.GERAN_ALLOWED === "1" ? "✅" : "❌"}</li>
            </ul>

            <h4>🔌 APNs configurados</h4>
            <div style="background:#ffffff; padding:16px; border-radius:10px; border:2px solid #3498db; font-family:Consolas,monospace;">
                ${apns.map(apn => `• ${apn.trim()}`).join("<br>")}
            </div>

            <h4>⚡ Velocidades máximas</h4>
            <ul style="line-height:1.9; padding-left:22px;">
                <li>Bajada: <strong>${ambrDL}</strong> | Subida: <strong>${ambrUL}</strong></li>
            </ul>

            <h4>🔍 Diagnóstico Inteligente</h4>
            <ul style="background:#f0fff0; padding:15px; border-radius:8px; border:1px solid #90ee90; line-height:1.8;">
                ${diagnosticoHTML}
            </ul>

            <button id="btnCopiar" onclick="copiarAnalisis()" 
                    style="margin-top:20px; padding:12px 24px; background:#3498db; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
                📋 Copiar Análisis Completo
            </button>
        </div>`;
}

function crearCampo(nombre, valor, interpretacion, tipo = "ok") {
    const icono = tipo === "ok" ? "🟢" : tipo === "alerta" ? "🔴" : tipo === "warning" ? "🟡" : "🔵";
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

// ====================== ATAJO CTRL + ENTER ======================
document.getElementById("inputHSS").addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === "Enter") {
        analizarHSS();
    }
});