// ================================================
// ANALIZADOR HSS - VERSIÓN 3.1 (Diagnóstico Inteligente + Visual Mejorado)
// ================================================

console.log("✅ hss.js v3.1 - Diagnóstico Inteligente + Iconos Mejorados");

// ====================== VALIDACIÓN DE IMEI ======================
function validarIMEI(imei) {
    if (!imei || typeof imei !== "string") {
        return { mensaje: "IMEI no encontrado", tipo: "warning", imeiType: "" };
    }

    const cleaned = imei.replace(/\D/g, '');
    if (cleaned.length !== 15 && cleaned.length !== 16) {
        return { mensaje: `Longitud inválida (${cleaned.length} dígitos)`, tipo: "alerta", imeiType: "" };
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
        mensaje: esValido ? "✅ IMEI válido" : "❌ IMEI inválido (checksum fallido)",
        tipo: esValido ? "ok" : "alerta",
        imeiType: cleaned.length === 15 ? "IMEI" : "IMEISV"
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

// ====================== DIAGNÓSTICO INTELIGENTE AVANZADO ======================
function generarDiagnostico(p) {
    let alertas = [];
    let warnings = [];
    let sugerencias = [];

    const attach = String(p.ATTACH_STATUS || "");
    const esRoaming = p.VISITED_PLMN_ID_MCC && p.VISITED_PLMN_ID_MCC !== "334";
    const ambrDL = parseInt(p.AMBR_MAX_REQ_BANDWIDTH_DL || 0) / 1000000;
    const tieneIMS = p.APN_CONFIG_ENTRY_NAMES && p.APN_CONFIG_ENTRY_NAMES.includes("IMS");

    // ==================== ALERTAS CRÍTICAS ====================
    if (!["2", "3"].includes(attach)) {
        alertas.push("🔴 La línea NO está adjunta correctamente a la red");
        sugerencias.push("→ Forzar Attach o reiniciar registro en Provisioning");
    }
    if (p.GPRS_SUBSCRIPTION_ENABLED === "0") {
        alertas.push("🔴 Datos móviles deshabilitados");
        sugerencias.push("→ Activar GPRS_SUBSCRIPTION_ENABLED = 1");
    }
    if (p.E_UTRAN_ALLOWED === "0") {
        alertas.push("🔴 Acceso LTE bloqueado");
        sugerencias.push("→ Activar E_UTRAN_ALLOWED = 1");
    }

    // ==================== ADVERTENCIAS Y DETECCIONES AVANZADAS ====================

    if (esRoaming) {
        warnings.push("🌍 Usuario en ROAMING internacional");
        sugerencias.push("→ Confirmar que el cliente tiene roaming activo");
    }

    if (p.BAIC === "1") {
        warnings.push("📵 Bloqueo de llamadas entrantes activado (BAIC)");
        sugerencias.push("→ Desactivar BAIC si el cliente no recibe llamadas");
    }

    if (!tieneIMS) {
        warnings.push("⚠️ APN IMS no configurado");
        sugerencias.push("→ Agregar APN IMS para habilitar VoLTE y VoWiFi");
    }

    if (ambrDL > 0 && ambrDL < 50) {
        warnings.push(`🐌 Perfil de velocidad bajo (${ambrDL} Mbps bajada)`);
        sugerencias.push("→ Aumentar AMBR_MAX_REQ_BANDWIDTH_DL");
    }

    // ==================== NUEVAS DETECCIONES ====================

    // Timers raros
    if (p.MONTE_RAU_TAU_TIMER && p.MONTE_RAU_TAU_TIMER !== null) {
        warnings.push(`⏱️ Timer RAU/TAU personalizado: ${p.MONTE_RAU_TAU_TIMER}`);
        sugerencias.push("→ Verificar si este timer está causando reconexiones frecuentes");
    }

    // Restricciones de Roaming
    if (p.ROAM_RESTRICT_NAME && p.ROAM_RESTRICT_NAME !== "ALLNATALLI") {
        warnings.push(`🌐 Restricción de roaming: ${p.ROAM_RESTRICT_NAME}`);
        sugerencias.push("→ Revisar ROAM_RESTRICT_NAME en el perfil");
    }

    // Solo 2G/3G activo (sin LTE)
    if (p.E_UTRAN_ALLOWED === "0" && (p.UTRAN_ALLOWED === "1" || p.GERAN_ALLOWED === "1")) {
        warnings.push("📶 Solo acceso 2G/3G permitido (sin LTE)");
        sugerencias.push("→ Activar LTE (E_UTRAN_ALLOWED = 1)");
    }

    // SGSN activo (registrado en 2G/3G)
    if (p.SERVING_SGSN_NUM && p.SERVING_SGSN_NUM !== "1/1/1/0") {
        warnings.push("📡 Usuario registrado en red 2G/3G (SGSN activo)");
        sugerencias.push("→ Normal en zonas sin buena cobertura LTE");
    }

    // QoS / Clase de Servicio baja
    const cosFields = [p.EPS_QOS_COS_NAME_1, p.EPS_QOS_COS_NAME_2, p.PDP_CTX_COS_NAME_1, p.PDP_CTX_COS_NAME_2];
    if (cosFields.some(cos => cos && (cos.includes("Bajo") || cos.includes("Low") || cos.includes("PREPAGO")))) {
        warnings.push("📉 Perfil QoS bajo o de Prepago detectado");
        sugerencias.push("→ Evaluar mejora de clase de servicio");
    }

    // Posible Prepago
    if (p.HPLMN_COS && /PRE|PREPAGO|PAGO/i.test(p.HPLMN_COS)) {
        warnings.push("💰 Posible línea de Prepago detectada");
    }

    // Estado Attach en GSM extraño
    if (p.GSM_MS_STATE_ATT === "0" && p.GERAN_ALLOWED === "1") {
        warnings.push("📶 Registrado en 2G pero con estado Attach = 0");
    }

    return { alertas, warnings, sugerencias };
}

// ====================== DIAGNÓSTICO CLÁSICO ======================
function generarDiagnosticoClasico(p) {
    let items = [];
    const attach = String(p.ATTACH_STATUS || "");
    const esRoaming = p.VISITED_PLMN_ID_MCC && p.VISITED_PLMN_ID_MCC !== "334";
    const ambrDL = parseInt(p.AMBR_MAX_REQ_BANDWIDTH_DL || 0) / 1000000;
    const tieneIMS = p.APN_CONFIG_ENTRY_NAMES && p.APN_CONFIG_ENTRY_NAMES.includes("IMS");

    if (["2", "3"].includes(attach))
        items.push("✅ Línea correctamente adjunta en la red");
    else 
        items.push("⚠️ Posible problema de registro");

    if (esRoaming)
        items.push("🌍 Usuario en roaming internacional");
    else 
        items.push("🏠 Usuario en red local (Altan)");

    if (p.GPRS_SUBSCRIPTION_ENABLED === "1") 
        items.push("🌐 Datos habilitados");

    if (p.E_UTRAN_ALLOWED === "1" && p.UTRAN_ALLOWED === "1" && p.GERAN_ALLOWED === "1") 
        items.push("📡 Todas las tecnologías permitidas");

    if (tieneIMS) 
        items.push("✅ VoLTE configurado");

    if (ambrDL >= 200) 
        items.push(`⚡ Buen perfil de velocidad (${ambrDL} Mbps bajada)`);

    return items.map(item => `<li>${item}</li>`).join('');
}

// ====================== CREARCAMPO MEJORADO (Iconos más llamativos) ======================
function crearCampo(nombre, valor, interpretacion, tipo = "ok") {
    let iconoHTML = "";
    let color = "#27ae60";

    switch(tipo) {
        case "ok":
            iconoHTML = "✅";
            color = "#27ae60";
            break;
        case "alerta":
            iconoHTML = "🚨";
            color = "#e74c3c";
            break;
        case "warning":
            iconoHTML = "⚠️";
            color = "#f1c40f";
            break;
        default:
            iconoHTML = "ℹ️";
            color = "#3498db";
    }

    return `
        <div class="campo-hss campo-${tipo}">
            <div class="crudo">${nombre}: ${valor ?? "N/A"}</div>
            <div class="interpretacion">
                <span class="icono" style="color:${color}; font-size:19px;">${iconoHTML}</span>
                ${interpretacion}
            </div>
        </div>
    `;
}

// ====================== RESUMEN NARRATIVO FINAL (v3.3) ======================
function generarResumenNarrativo(p, imeiValidation) {
    const diag = generarDiagnostico(p);
    const ambrDL = bpsToMbps(p.AMBR_MAX_REQ_BANDWIDTH_DL);
    const ambrUL = bpsToMbps(p.AMBR_MAX_REQ_BANDWIDTH_UL);
    const apns = (p.APN_CONFIG_ENTRY_NAMES || "").split(",").filter(a => a.trim() && a.trim() !== ",");

    const mccVisited = p.VISITED_PLMN_ID_MCC || "N/A";
    const mncVisited = p.VISITED_PLMN_ID_MNC || "N/A";
    const infoVisited = getPlmnInfo(mccVisited, mncVisited);
    const esRoaming = infoVisited && !infoVisited.home;

    let html = `
    <div style="background: linear-gradient(135deg, #f8fbff, #e6f0ff); padding: 28px; border-radius: 14px; margin: 25px 0; border: 3px solid #3498db;">
        <h3 style="margin-top:0; color:#0C2545;">📊 Diagnóstico Inteligente HSS</h3>`;

    // === ALERTAS CRÍTICAS ===
    if (diag.alertas.length > 0) {
        html += `
        <div style="background:#fff0f0; border:2px solid #e74c3c; border-radius:12px; padding:20px; margin:18px 0;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <span style="font-size:28px;">🚨</span>
                <strong style="font-size:18px; color:#c0392b;">PROBLEMAS CRÍTICOS (${diag.alertas.length})</strong>
            </div>
            <ul style="margin:0 0 15px 0; padding-left:8px;">${diag.alertas.map(a => `<li>${a}</li>`).join('')}</ul>
            
            <strong style="color:#c0392b;">💡 Sugerencias de Acción:</strong>
            <ul style="margin:8px 0 0 0; padding-left:8px; color:#c0392b;">${diag.sugerencias.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>`;
    }

    // === ADVERTENCIAS ===
    if (diag.warnings.length > 0) {
        html += `
        <div style="background:#fff9e6; border:2px solid #f1c40f; border-radius:12px; padding:20px; margin:18px 0;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <span style="font-size:26px;">⚠️</span>
                <strong style="font-size:17.5px; color:#d68910;">ADVERTENCIAS (${diag.warnings.length})</strong>
            </div>
            <ul style="margin:0 0 12px 0; padding-left:8px;">${diag.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
        </div>`;
    }

    // === TODO BIEN ===
    if (diag.alertas.length === 0 && diag.warnings.length === 0) {
        html += `
        <div style="background:#e8f5e9; border:2px solid #27ae60; border-radius:12px; padding:20px; text-align:center; margin:18px 0;">
            <span style="font-size:32px;">✅</span><br>
            <strong style="color:#27ae60;">No se detectaron anomalías importantes</strong>
        </div>`;
    }

    // === INFORMACIÓN DETALLADA ===
    html += `
        <h4>🌍 Red actual (Visited PLMN)</h4>
        <div style="background:#fff; padding:20px; border-radius:10px; border:2px solid #3498db; margin:15px 0;">
            <strong>🌍 ${infoVisited ? infoVisited.pais + " - " + infoVisited.operador : "Desconocido"}</strong>
            ${esRoaming ? ` <span style="color:#e74c3c;">⚠️ ROAMING</span>` : ` <span style="color:#2ecc71;">✓ Red Local</span>`}<br><br>
            <div style="display:flex; gap:30px; font-size:14.5px;">
                <div><strong>MCC:</strong> ${mccVisited}</div>
                <div><strong>MNC:</strong> ${mncVisited}</div>
            </div>
        </div>

        <h4>👤 Información general del suscriptor</h4>
        <ul style="line-height:1.9; padding-left:22px;">
            <li><strong>IMSI:</strong> ${p.IMSI || "N/A"}</li>
            <li><strong>IMEI:</strong> ${p.IMEI || "N/A"} — <small>${imeiValidation.mensaje}</small></li>
        </ul>

        <h4>📍 Estado de registro</h4>
        <ul style="line-height:1.9; padding-left:22px;">
            <li><strong>ATTACH_STATUS:</strong> ${p.ATTACH_STATUS || "N/A"} 
                ${["2","3"].includes(String(p.ATTACH_STATUS)) ? "✅" : "❌"}</li>
            <li><strong>SERVING_MME_NAME:</strong> ${p.SERVING_MME_NAME || "N/A"}</li>
        </ul>

        <h4>📡 Tecnologías permitidas</h4>
        <ul style="line-height:1.9; padding-left:22px;">
            <li>LTE: ${p.E_UTRAN_ALLOWED === "1" ? "✅" : "❌"} | 
                3G: ${p.UTRAN_ALLOWED === "1" ? "✅" : "❌"} | 
                2G: ${p.GERAN_ALLOWED === "1" ? "✅" : "❌"}</li>
        </ul>

        <h4>🔌 APNs configurados</h4>
        <div style="background:#ffffff; padding:16px; border-radius:10px; border:2px solid #3498db; font-family:Consolas,monospace;">
            ${apns.length ? apns.map(apn => `• ${apn.trim()}`).join("<br>") : "Ninguno configurado"}
        </div>

        <h4>⚡ Velocidades máximas</h4>
        <ul style="line-height:1.9; padding-left:22px;">
            <li>Bajada: <strong>${ambrDL}</strong> | Subida: <strong>${ambrUL}</strong></li>
        </ul>

        <!-- ====================== DIAGNÓSTICO INTELIGENTE CLÁSICO ====================== -->
        <h3 class="titulo-seccion-hss">🔍 Diagnóstico Inteligente</h3>
        <div style="background: #f8f9fa; padding: 18px; border-radius: 10px; border: 1px solid #e0e0e0;">
            <ul style="line-height: 2.1; padding-left: 20px;">
                ${generarDiagnosticoClasico(p)}
            </ul>
        </div>
    </div>`;

    return html;
}

// ====================== FUNCIONES AUXILIARES ======================
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
            setTimeout(() => { 
                btn.innerHTML = original; 
                btn.style.backgroundColor = ""; 
            }, 2000);
        }
    });
}

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

    let html = generarResumenNarrativo(p, imeiValidation);

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

// ====================== ATAJO CTRL + ENTER ======================
document.getElementById("inputHSS").addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === "Enter") {
        analizarHSS();
    }
});