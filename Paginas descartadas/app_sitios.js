// Función para calcular distancia en km entre dos coordenadas
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Buscar antenas dentro del radio indicado desde la coordenada dada
function buscarAntenasTabla() {
    const input = document.getElementById("coord-input").value.trim();
    const radio = parseFloat(document.getElementById("radio-select").value);

    if (!input.includes(",")) {
        alert("Por favor ingresa las coordenadas en formato latitud,longitud");
        return;
    }

    const [latStr, lngStr] = input.split(",");
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Ingresa coordenadas válidas en formato latitud,longitud");
        return;
    }

    // Filtrar antenas dentro del radio
    const cercanas = dataAntenas.map(a => {
        const dist = calcularDistancia(lat, lng, a.LATITUD, a.LONGITUD);
        return { ...a, distancia: dist };
    }).filter(a => a.distancia <= radio);

    // Mostrar resultados
    const resultadosElem = document.getElementById("resultados");
    resultadosElem.innerText = `Antenas encontradas: ${cercanas.length}`;

    const tbody = document.querySelector("#tabla-resultados tbody");
    tbody.innerHTML = "";

    // Ordenar por distancia
    cercanas.sort((a, b) => a.distancia - b.distancia).forEach(a => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${a.CLAVE || ""}</td>
            <td>${a["UBICACIÓN"] || ""}</td>
            <td>${a.Estado || a.ESTADO || ""}</td>
            <td>${a.Municipio || a.MUNICIPIO || ""}</td>
            <td>${a.Poblacion || a.POBLACION || ""}</td>
            <td>${a.LATITUD}</td>
            <td>${a.LONGITUD}</td>
            <td>${a.CP || ""}</td>
            <td>${a.TX || ""}</td>
            <td>${a["En Huella MBB"] || a["EN HUELLA MBB"] || ""}</td>
            <td>${a.Sectores || a.SECTORES || ""}</td>
            <td>${a["Usuarios activos MBB"] || a["USUARIOS ACTIVOS MBB"] || ""}</td>
            <td>${a["THP MBB (Mbps)"] || ""}</td>
            <td>${a.distancia.toFixed(3)}</td>
        `;
        tbody.appendChild(fila);
    });
}

function limpiarBusqueda() {
    document.getElementById("coord-input").value = "";
    document.getElementById("radio-select").value = "10";
    document.getElementById("resultados").innerText = "Antenas encontradas: 0";
    document.querySelector("#tabla-resultados tbody").innerHTML = "";
}

document.getElementById("btnBuscar").addEventListener("click", buscarAntenasTabla);
document.getElementById("btnLimpiar").addEventListener("click", limpiarBusqueda);
