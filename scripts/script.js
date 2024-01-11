// Función para generar la estructura del details
const generarDetails = (equipoData, containerClass) => {
const posiciones = Array.from(new Set(equipoData.jugadores.map(jugador => jugador.posicion)));

return `
    <details class="${containerClass}">
        <summary class="toggle-summary">${equipoData.nombreEquipo}<span class="toggle-button">▶</span></summary>
        <h1><u>Entrenador</u></h1>
        <div class="divjugadores">
            <div class="equipo-container">
                <img class="fotoequipos" src="${equipoData.entrenadorImagen}" alt="${equipoData.entrenadorNombre}">
                <div class="divjugadores">
                    <p>${equipoData.entrenadorNombre}</p>
                </div>
            </div>
        </div>
        <hr>
        <h1>Jugadores:</h1>
        ${posiciones.map(posicion => `
            <h1><u>${posicion}</u></h1>
            <div class="divjugadores">
                ${equipoData.jugadores
                    .filter(jugador => jugador.posicion === posicion)
                    .map(jugador => `
                        <div class="equipo-container">
                            <img class="fotoequipos" src="${jugador.imagen}" alt="${jugador.nombre}">
                            <div class="divjugadores">
                                <p>${jugador.nombre}</p>
                            </div>
                        </div>`).join('')}
            </div>`).join('')}
    </details>`;
};

const equiposContainer = document.getElementById("equipos-container");

// Obtener datos de los equipos desde el archivo XML
fetch('../datos.xml')
.then(response => response.text())
.then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // Extraer datos del equipo "Cardinals"
    const cardinalsData = {
        nombreEquipo: xmlDoc.querySelector('cardinals nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('cardinals entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('cardinals entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('cardinals jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };

    // Extraer datos del equipo "Cowboys"
    const cowboysData = {
        nombreEquipo: xmlDoc.querySelector('cowboys nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('cowboys entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('cowboys entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('cowboys jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const raidersData = {
        nombreEquipo: xmlDoc.querySelector('raiders nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('raiders entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('raiders entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('raiders jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const steelersData = {
        nombreEquipo: xmlDoc.querySelector('steelers nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('steelers entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('steelers entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('steelers jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const ramsData = {
        nombreEquipo: xmlDoc.querySelector('rams nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('rams entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('rams entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('rams jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const chiefsData = {
        nombreEquipo: xmlDoc.querySelector('chiefs nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('chiefs entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('chiefs entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('chiefs jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const bengalsData = {
        nombreEquipo: xmlDoc.querySelector('bengals nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('bengals entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('bengals entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('bengals jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };
    const bearsData = {
        nombreEquipo: xmlDoc.querySelector('bears nombre').textContent,
        entrenadorNombre: xmlDoc.querySelector('bears entrenador nombre').textContent,
        entrenadorImagen: xmlDoc.querySelector('bears entrenador imagen').textContent,
        jugadores: Array.from(xmlDoc.querySelectorAll('bears jugador')).map(jugador => {
            return {
                nombre: jugador.querySelector('nombre').textContent,
                posicion: jugador.getAttribute('posicion'),
                imagen: jugador.querySelector('imagen').textContent
            };
        })
    };

    // Generar la estructura del details para ambos equipos con las clases correspondientes
    equiposContainer.innerHTML =
        generarDetails(cardinalsData, 'cardinals-bg') +
        generarDetails(cowboysData, 'cowboys-bg')+
        generarDetails(raidersData, 'raiders-bg')+
        generarDetails(steelersData, 'steelers-bg')+
        generarDetails(ramsData, 'rams-bg')+
        generarDetails(chiefsData, 'chiefs-bg')+
        generarDetails(bengalsData, 'bengals-bg')+
        generarDetails(bearsData, 'bears-bg');


})
.catch(error => console.error('Error al obtener el archivo XML:', error));

//Formulario
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var nombre = document.querySelector('form input[name="nombre"]').value;
    alert('¡Gracias ' + nombre + ', tu mensaje ha sido enviado correctamente!');
    document.querySelector('form').reset();
  });