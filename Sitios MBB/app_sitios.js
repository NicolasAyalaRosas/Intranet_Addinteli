// Inicialización de variables globales
let map;
let markersGroup; // Layer group para los marcadores
const radioCircleOptions = { color: 'blue', fillColor: '#3399ff', fillOpacity: 0.2 };

// Icono rojo para el punto ingresado por el usuario
const marcadorBusquedaIcono = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function iniciarMapa() {
    // Centra el mapa en México (o en coordenadas neutras)
    map = L.map('map').setView([23.6345, -102.5528], 5);

    // Capa base OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);
}

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

function buscarAntenasMapa() {
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

    // Mostrar resultados en tabla
    mostrarResultadosTabla(cercanas);

    // Mostrar resultados en mapa
    mostrarResultadosMapa(cercanas, lat, lng, radio);
}

function mostrarResultadosTabla(antenas) {
    const resultadosElem = document.getElementById("resultados");
    resultadosElem.innerText = `Antenas encontradas: ${antenas.length}`;

    const tbody = document.querySelector("#tabla-resultados tbody");
    tbody.innerHTML = "";

    antenas.sort((a, b) => a.distancia - b.distancia).forEach(a => {
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

function mostrarResultadosMapa(antenas, lat, lng, radio) {
    // Limpiar marcadores previos y círculo
    markersGroup.clearLayers();
    if (window.radioCircle) {
        map.removeLayer(window.radioCircle);
    }

    // Centrar mapa en la coordenada de búsqueda
    map.setView([lat, lng], 12);

    // Dibujar círculo de radio
    window.radioCircle = L.circle([lat, lng], {
        radius: radio * 1000, // metros
        ...radioCircleOptions,
    }).addTo(map);

    // Marcador rojo para el punto de búsqueda
    L.marker([lat, lng], {
        title: "Punto de búsqueda",
        icon: marcadorBusquedaIcono
    }).addTo(markersGroup);

    // Marcadores azules por defecto para las antenas
    antenas.forEach(a => {
        const marker = L.marker([a.LATITUD, a.LONGITUD], { title: a.CLAVE || "Antena" });
        const popupContent = `
            <b>CLAVE:</b> ${a.CLAVE || ""}<br>
            <b>UBICACIÓN:</b> ${a["UBICACIÓN"] || ""}<br>
            <b>Estado:</b> ${a.Estado || a.ESTADO || ""}<br>
            <b>Municipio:</b> ${a.Municipio || a.MUNICIPIO || ""}<br>
            <b>Distancia:</b> ${a.distancia.toFixed(3)} km
        `;
        marker.bindPopup(popupContent);
        marker.addTo(markersGroup);
    });
}

function limpiarBusqueda() {
    document.getElementById("coord-input").value = "";
    document.getElementById("radio-select").value = "10";
    document.getElementById("resultados").innerText = "Antenas encontradas: 0";
    document.querySelector("#tabla-resultados tbody").innerHTML = "";

    markersGroup.clearLayers();
    if (window.radioCircle) {
        map.removeLayer(window.radioCircle);
    }

    // Recentrar mapa a vista general
    map.setView([23.6345, -102.5528], 5);
}

// Eventos para los botones
document.getElementById("btnBuscar").addEventListener("click", buscarAntenasMapa);
document.getElementById("btnLimpiar").addEventListener("click", limpiarBusqueda);

// Iniciar mapa al cargar la página
window.onload = iniciarMapa;
