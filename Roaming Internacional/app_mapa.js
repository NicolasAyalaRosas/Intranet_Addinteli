let map;
let paisLayer;

// Inicializar mapa mundial
function iniciarMapa() {
    map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    paisLayer = L.geoJSON(null, {
        style: { color: "#13479a", weight: 1, fillOpacity: 0.1 },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.name);
        }
    }).addTo(map);

    // Cargar GeoJSON del mundo
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(res => res.json())
        .then(geojson => paisLayer.addData(geojson));
}

// Buscar país
function buscarPais() {
    const input = document.getElementById("pais-input").value.trim().toLowerCase();
    if (!input) return;

    // Limpiar estilos previos
    paisLayer.eachLayer(layer => layer.setStyle({ color: "#13479a", fillOpacity: 0.1 }));

    const paisEncontrado = dataPaises.find(p => p.pais.toLowerCase() === input);
    if (!paisEncontrado) {
        alert("País no encontrado en la base de datos.");
        return;
    }

    // Resaltar país en mapa
    paisLayer.eachLayer(layer => {
        if (layer.feature.properties.name.toLowerCase() === input) {
            layer.setStyle({ color: "red", fillOpacity: 0.5 });
            map.fitBounds(layer.getBounds());
        }
    });

    // Mostrar info en tabla
    mostrarResultadosTabla([paisEncontrado]);
}

function mostrarResultadosTabla(paises) {
    const tbody = document.querySelector("#tabla-resultados tbody");
    tbody.innerHTML = "";
    paises.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.Pais}</td>
            <td>${p.TADIG}</td>
            <td>${p.Connection}</td>
            <td>${p.Operador}</td>
            <td>${p["Service Type"]}</td>
            <td>${p["Country Code"]}</td>
            <td>${p.MCC}</td>
            <td>${p["IMSI Roamability"]}</td>
        `;
        tbody.appendChild(fila);
    });
}

function limpiarBusqueda() {
    document.getElementById("pais-input").value = "";
    paisLayer.eachLayer(layer => layer.setStyle({ color: "#13479a", fillOpacity: 0.1 }));
    document.querySelector("#tabla-resultados tbody").innerHTML = "";
    map.setView([20, 0], 2);
}

document.getElementById("btnBuscar").addEventListener("click", buscarPais);
document.getElementById("btnLimpiar").addEventListener("click", limpiarBusqueda);

window.onload = iniciarMapa;
