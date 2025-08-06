function formatoHtml(texto) {
    const lines = texto.split('\n').map(line => line.trim());
    let html = '';
    let inList = false;
  
    lines.forEach(line => {
      // Detectar títulos o negritas si la línea termina con ":" o empieza con palabra clave
      if (/^(Funciones|Requisitos|Ventajas|Desventajas|Características|Cómo funciona|Proceso de obtención de licencia|Diferencias|Historia|Usos|Características de|Uso en|Dónde se aplica|Ejemplos):?$/.test(line)) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<strong>${line.replace(/:$/, '')}</strong><br>`;
      } 
      // Detectar listas con guión, asterisco o números (ejemplo: "- texto" o "* texto" o "1. texto")
      else if (/^(\-|\*|\d+\.)\s+/.test(line)) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        // Eliminar el marcador de lista al mostrar
        const itemText = line.replace(/^(\-|\*|\d+\.)\s+/, '');
        html += `<li>${itemText}</li>`;
      } 
      else if (line === '') {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<br>';
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        // Reemplazar texto entre **negritas**
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html += `<p>${formattedLine}</p>`;
      }
    });
  
    if (inList) {
      html += '</ul>';
    }
  
    return html;
  }
  
  
  function renderGlossary(glosario) {
    const dl = document.querySelector('dl');
    dl.innerHTML = '';
  
    glosario.forEach(item => {
      const dt = document.createElement('dt');
      dt.textContent = item.termino;
  
      const dd = document.createElement('dd');
      dd.innerHTML = formatoHtml(item.significado);
  
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  }
  
  function searchGlossary() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const terms = document.querySelectorAll('dt');
    const definitions = document.querySelectorAll('dd');
  
    terms.forEach((term, index) => {
      const termText = term.textContent.toLowerCase();
      const defText = definitions[index].textContent.toLowerCase();
  
      if (termText.includes(searchTerm) || defText.includes(searchTerm)) {
        term.style.display = 'block';
        definitions[index].style.display = 'block';
      } else {
        term.style.display = 'none';
        definitions[index].style.display = 'none';
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderGlossary(glosario);
  
    document.getElementById('searchInput').addEventListener('input', searchGlossary);
  
    const volverArriba = document.querySelector("#volver-arriba a");
    if (volverArriba) {
      volverArriba.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
  