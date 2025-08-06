const accordions = document.querySelectorAll(".accordion");
const panels = document.querySelectorAll(".panel");
const iframe = document.querySelector(".pdf-viewer");

accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
        const panel = this.nextElementSibling;
        const isPanelVisible = panel.style.display === "block";

        // Cerrar todos los paneles antes de abrir o cerrar el actual
        panels.forEach((p) => {
            p.style.display = "none";
            p.previousElementSibling.setAttribute("aria-expanded", "false");
        });

        // Mostrar u ocultar el panel correspondiente
        if (!isPanelVisible) {
            panel.style.display = "block";
            this.setAttribute("aria-expanded", "true");
        } else {
            this.setAttribute("aria-expanded", "false");
        }

        // Si se cierra el panel, también ocultar el iframe
        if (panel.style.display === "none") {
            iframe.style.display = "none";
            iframe.src = ""; // Limpiar el contenido del iframe
        }
    });
});

// Función para manejar el clic en los enlaces dentro de los paneles
document.querySelectorAll('.panel a').forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevenir la navegación por defecto
        iframe.style.display = "block"; // Asegurarse de que el iframe sea visible
        iframe.src = this.href; // Cargar el PDF en el iframe
    });
});