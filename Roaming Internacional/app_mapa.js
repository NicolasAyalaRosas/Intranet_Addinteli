let map;
let paisLayer;
let marcador = null;
let mapeoNombres = {};  // Se generará dinámicamente

// Coordenadas fijas como fallback para países clave
const coordenadasFallback = {
    "estados unidos": [38.0, -97.0], // Centro de Estados Unidos
    "italia": [41.9, 12.5],         // Centro de Italia
    "alemania": [51.0, 10.0],       // Centro de Alemania
    "francia": [46.0, 2.0]          // Centro de Francia
};

// 🔹 Normalizar texto (quita acentos y pasa a minúsculas)
function normalizarTexto(texto) {
    return texto
        ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        : "";
}

// 🔹 Similitud básica para tolerar variaciones (e.g., acentos faltantes)
function similitudBasica(str1, str2, umbral = 0.8) {
    if (str1.length === 0 || str2.length === 0) return 0;
    const minLen = Math.min(str1.length, str2.length);
    const coincidencias = str1.split('').filter((char, i) => char === str2[i]).length;
    return coincidencias / minLen >= umbral;
}

// ============================
// Cargar recursos iniciales
// ============================
function cargarRecursos() {
    try {
        // Verificar que paisesSugerencias esté definida
        if (typeof paisesSugerencias === 'undefined' || !paisesSugerencias.length) {
            throw new Error('No se pudo cargar paises_sugerencias.js');
        }
        
        // Generar mapeoNombres dinámicamente
        paisesSugerencias.forEach(pais => {
            const espNorm = normalizarTexto(pais.espanol);
            const ingNorm = normalizarTexto(pais.ingles);
            mapeoNombres[espNorm] = ingNorm;
        });
        console.log('✅ Mapeo de nombres generado dinámicamente.', Object.keys(mapeoNombres).length, 'entradas');
        // Debug específico para Estados Unidos
        console.log('🔍 Mapeo para "estados unidos":', mapeoNombres['estados unidos']);

        // Llenar datalist con sugerencias
        const datalist = document.getElementById('paises-sugeridos');
        paisesSugerencias.forEach(pais => {
            const option = document.createElement('option');
            option.value = pais.espanol;
            option.textContent = `${pais.espanol} (${pais.ingles})`;
            datalist.appendChild(option);
        });
        console.log('✅ Sugerencias de países cargadas:', paisesSugerencias.length);

        // Verificar que dataPaises esté definida
        if (typeof dataPaises === 'undefined' || !dataPaises.length) {
            throw new Error('No se pudo cargar Paises_Roaming_Internacional.js');
        }
        console.log('✅ Datos de roaming cargados. Total entradas:', dataPaises.length);

        // Inicializar mapa
        inicializarMapa();
    } catch (error) {
        console.error('❌ Error al cargar recursos:', error);
        alert('Error al cargar los datos necesarios. Revisa la consola para más detalles.');
    }
}

// ============================
// Inicializar mapa
// ============================
function inicializarMapa() {
    console.log("✅ Iniciando mapa...");

    if (!dataPaises || dataPaises.length === 0) {
        console.error("❌ ERROR: dataPaises no está definido. Revisa Paises_Roaming_Internacional.js.");
        alert("Error: No se cargaron los datos de roaming.");
        return;
    }

    map = L.map("map").setView([20, 0], 2);

    // Capa base OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Verificar que worldGeoJSON esté disponible
    if (typeof worldGeoJSON === "undefined") {
        console.error("❌ ERROR: worldGeoJSON no está definido. Revisa world_geojson.js");
        alert("Error: No se pudo cargar el mapa de países. Revisa la consola.");
        return;
    }

    // Cargar países desde GeoJSON
    paisLayer = L.geoJSON(worldGeoJSON, {
        style: { color: "#13479a", weight: 1, fillOpacity: 0.1 },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
        },
    }).addTo(map);

    console.log("✅ Capa mundial cargada en el mapa. Features:", worldGeoJSON.features.length);
}

// ============================
// Buscar país y resaltar
// ============================
function buscarPais() {
    // Remover marcador anterior y cerrar popups
    if (marcador) {
        map.removeLayer(marcador);
        marcador = null;
    }
    map.closePopup();

    const input = document.getElementById("pais-input").value.trim();
    const inputNormalizado = normalizarTexto(input);
    console.log(`🔍 Buscando: "${input}" (normalizado: "${inputNormalizado}")`);

    if (!inputNormalizado) {
        document.getElementById('resultados').textContent = 'Por favor, escribe un país para buscar.';
        return;
    }

    if (!paisLayer) {
        document.getElementById('resultados').textContent = 'El mapa aún no está listo. Intenta nuevamente.';
        return;
    }

    // Resetear estilos de países anteriores
    paisLayer.eachLayer((layer) =>
        layer.setStyle({ color: "#13479a", weight: 1, fillOpacity: 0.1 })
    );

    // Buscar en dataPaises (todos los operadores)
    const paisesEncontrados = dataPaises.filter((p) => {
        const nombre = p.Pais || p.pais || p.País || p["PAÍS"] || "";
        const nombreNorm = normalizarTexto(nombre);
        return nombreNorm === inputNormalizado || similitudBasica(nombreNorm, inputNormalizado);
    });
    console.log(`📊 Encontrados ${paisesEncontrados.length} operadores en dataPaises`);

    // Determinar el nombre en inglés para el GeoJSON
    let nombreInglesNormalizado = mapeoNombres[inputNormalizado] || inputNormalizado;
    console.log(`🌍 Nombre en inglés usado para GeoJSON: "${nombreInglesNormalizado}"`);

    // Buscar nombre en español para el popup (si la entrada fue en inglés)
    let nombreEspanol = input;
    if (!mapeoNombres[inputNormalizado]) {
        const paisSugerencia = paisesSugerencias.find(p => normalizarTexto(p.ingles) === inputNormalizado);
        if (paisSugerencia) {
            nombreEspanol = paisSugerencia.espanol;
        }
    }

    // Verificar si el país está en dataPaises
    if (paisesEncontrados.length === 0) {
        document.getElementById('resultados').textContent = `"${input}" no tiene datos de roaming disponibles, pero se resalta en el mapa.`;
        console.warn(`⚠️ No hay datos de roaming para "${input}", pero procedemos con mapa.`);
    } else {
        document.getElementById('resultados').textContent = `✅ Encontrados ${paisesEncontrados.length} operadores para "${input}".`;
        console.log(`✅ Encontrados ${paisesEncontrados.length} operadores para "${input}".`);
    }

    // Resaltar país en el mapa y agregar marcador (coincidencia exacta para marcador)
    let resaltado = false;
    let boundsDelPais = null;
    paisLayer.eachLayer((layer) => {
        const nombreLayer = normalizarTexto(layer.feature.properties.name);
        console.log(`🔎 Comparando GeoJSON feature: "${nombreLayer}" vs "${nombreInglesNormalizado}"`);
        // Resaltar con coincidencia exacta o similar
        if (nombreLayer === nombreInglesNormalizado || similitudBasica(nombreLayer, nombreInglesNormalizado)) {
            layer.setStyle({
                color: "red",
                weight: 3,
                fillColor: "#FFFF99",
                fillOpacity: 0.4
            });
        }

        // Marcador SOLO con coincidencia exacta para evitar mismatches
        if (nombreLayer === nombreInglesNormalizado && !resaltado) {
            boundsDelPais = layer.getBounds();
            map.fitBounds(boundsDelPais, { padding: [20, 20] });
            let centro = boundsDelPais.getCenter();
            // Fallback para Estados Unidos
            if (nombreInglesNormalizado === 'united states' && (centro.lat > 45 || centro.lng > -50)) {
                console.warn(`⚠️ Centro incorrecto para Estados Unidos (${centro.lat}, ${centro.lng}). Usando fallback.`);
                centro = { lat: coordenadasFallback['estados unidos'][0], lng: coordenadasFallback['estados unidos'][1] };
            }
            marcador = L.marker([centro.lat, centro.lng]).addTo(map);
            marcador.bindPopup(`<b>${nombreEspanol}</b>`).openPopup();
            resaltado = true;
            console.log(`📍 Marcador colocado en centro de ${nombreEspanol}: ${centro.lat}, ${centro.lng}`);
        }
    });

    if (!resaltado) {
        console.warn(`⚠️ El país "${input}" no se encontró en worldGeoJSON (verifica mapeo).`);
        // Intentar con coordenadas fallback si existe
        if (coordenadasFallback[inputNormalizado]) {
            map.setView(coordenadasFallback[inputNormalizado], 5);
            marcador = L.marker(coordenadasFallback[inputNormalizado]).addTo(map);
            marcador.bindPopup(`<b>${nombreEspanol}</b>`).openPopup();
            console.log(`📍 Usando coordenadas fallback para ${nombreEspanol}: ${coordenadasFallback[inputNormalizado]}`);
            document.getElementById('resultados').textContent = `✅ ${input} resaltado usando coordenadas fallback (sin datos de roaming).`;
        } else {
            document.getElementById('resultados').textContent = `El país "${input}" no se pudo resaltar en el mapa. Verifica el nombre en inglés.`;
            map.setView([20, 0], 2);
        }
    }

    // Mostrar info en tabla (solo si hay datos)
    if (paisesEncontrados.length > 0) {
        mostrarResultadosTabla(paisesEncontrados);
    } else {
        document.querySelector("#tabla-resultados tbody").innerHTML = "";
    }
}

// ============================
// Mostrar resultados en tabla
// ============================
function mostrarResultadosTabla(paises) {
    const tbody = document.querySelector("#tabla-resultados tbody");
    tbody.innerHTML = "";  // Limpia siempre

    paises.forEach((p) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.Pais || p.pais || p.País || p["PAÍS"] || ""}</td>
            <td>${p.TADIG || ""}</td>
            <td>${p.Connection || ""}</td>
            <td>${p.Operador || ""}</td>
            <td>${p["Service Type"] || ""}</td>
            <td>${p["Country Code"] || ""}</td>
            <td>${p.MCC || ""}</td>
            <td>${p["IMSI Roamability"] || ""}</td>
        `;
        tbody.appendChild(fila);
    });
}

// ============================
// Limpiar búsqueda
// ============================
function limpiarBusqueda() {
    document.getElementById("pais-input").value = "";

    if (paisLayer) {
        paisLayer.eachLayer((layer) =>
            layer.setStyle({ color: "#13479a", weight: 1, fillOpacity: 0.1 })
        );
    }

    // Eliminar marcador y cerrar popups
    if (marcador) {
        map.removeLayer(marcador);
        marcador = null;
    }
    map.closePopup();

    // Limpiar tabla y resultados
    document.querySelector("#tabla-resultados tbody").innerHTML = "";
    document.getElementById('resultados').textContent = '';
    map.setView([20, 0], 2);
}

// ============================
// Eventos
// ============================
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnBuscar").addEventListener("click", buscarPais);
    document.getElementById("btnLimpiar").addEventListener("click", limpiarBusqueda);
    cargarRecursos();  // Inicia carga al cargar DOM
});