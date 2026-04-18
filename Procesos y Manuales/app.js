document.addEventListener("DOMContentLoaded", () => {

    // ==================== ELEMENTOS ====================
    const accordions = document.querySelectorAll(".accordion");
    const panels = document.querySelectorAll(".panel");
    const iframe = document.querySelector(".pdf-viewer");
    const menuBtn = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu-desplegable");

    // ==================== ACCORDIONS ====================
    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function () {
            const panel = this.nextElementSibling;
            const isPanelVisible = panel.style.display === "block";

            // Cerrar todos los paneles
            panels.forEach((p) => {
                p.style.display = "none";
                p.previousElementSibling.setAttribute("aria-expanded", "false");
            });

            // Si el panel actual no estaba visible, lo abrimos
            if (!isPanelVisible) {
                panel.style.display = "block";
                this.setAttribute("aria-expanded", "true");
            } 
            // Si ya estaba abierto, lo cerramos y ocultamos el PDF
            else {
                this.setAttribute("aria-expanded", "false");
                if (iframe) {
                    iframe.style.display = "none";
                    iframe.src = ""; // Limpiar el iframe
                }
            }
        });
    });

    // ==================== ENLACES DE PDFs ====================
    document.querySelectorAll('.panel a').forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            if (iframe) {
                iframe.style.display = "block";     // Mostrar el visor
                iframe.src = this.href;             // Cargar el PDF
            }
        });
    });

    // ==================== MENÚ HAMBURGUESA ====================
    if (menuBtn && menu) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("mostrar");
        });

        // Evitar que el clic dentro del menú lo cierre
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener("click", () => {
            menu.classList.remove("mostrar");
        });
    }

    // ==================== BOTÓN EXPANDIR PDF ====================
    const btnExpandir = document.getElementById("btnExpandirPDF");
    const body = document.body;

    if (btnExpandir) {
        btnExpandir.addEventListener("click", () => {
            body.classList.toggle("modo-full");

            if (body.classList.contains("modo-full")) {
                btnExpandir.textContent = "🔙 Salir modo completo";
            } else {
                btnExpandir.textContent = "🔍 Expandir PDF";
            }
        });
    }

});