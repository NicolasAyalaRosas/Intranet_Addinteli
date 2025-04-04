/**
 * Función para realizar la búsqueda en tiempo real en el glosario.
 * Obtiene el término de búsqueda, recorre los términos y definiciones,
 * y muestra u oculta los elementos según coincidan con la búsqueda.
 */
function searchGlossary() {
    // Obtiene el valor del campo de búsqueda y lo convierte a minúsculas
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Obtiene todos los términos (dt) y definiciones (dd) del glosario
    const terms = document.querySelectorAll('dt');
    const definitions = document.querySelectorAll('dd');

    // Recorre todos los términos y definiciones
    terms.forEach((term, index) => {
        // Obtiene el texto del término y la definición en minúsculas
        const termText = term.textContent.toLowerCase();
        const definitionText = definitions[index].textContent.toLowerCase();

        // Verifica si el término o la definición coinciden con la búsqueda
        if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
            // Si coincide, muestra el término y la definición
            term.style.display = 'block';
            definitions[index].style.display = 'block';
        } else {
            // Si no coincide, oculta el término y la definición
            term.style.display = 'none';
            definitions[index].style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#volver-arriba a").addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


/**
 * Escucha el evento 'input' en el campo de búsqueda.
 * Cada vez que el usuario escribe, se ejecuta la función searchGlossary.
 */
document.getElementById('searchInput').addEventListener('input', searchGlossary);