// Cargar el XML
var url = '../xm_xs/calendar_t3.xml';

fetch(url)
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'application/xml');

    // Llamar a la función para construir la tabla
    construirTabla(xmlDoc);
  })
  .catch(error => console.error('Error al cargar el XML:', error));

// Función para construir la tabla con los datos del XML
function construirTabla(xml) {
  // Obtener la referencia al cuerpo de la tabla
  var tbody = document.getElementById('tablaBody');

  // Crear objetos para realizar un seguimiento de partidos jugados, victorias, derrotas, empates y puntos totales por cada equipo
  var partidosJugados = {};
  var victorias = {};
  var derrotas = {};
  var empates = {};
  var puntosRecibidos = {};

  // Obtener la lista de jornadas del XML
  var jornadas = xml.querySelectorAll('jornada');

  // Iterar sobre las jornadas y construir las filas de la tabla
  jornadas.forEach(function (jornada) {
    // Obtener la lista de partidos de la jornada
    var partidos = jornada.querySelectorAll('partido');

    // Iterar sobre los partidos y actualizar los objetos partidosJugados, victorias, derrotas, empates y puntosRecibidos
    partidos.forEach(function (partido) {
      var equipos = partido.querySelectorAll('local, visitante');
      var puntos = partido.querySelectorAll('puntoslocal, puntosvisitante');
  
      // Obtener nombres y puntos de los equipos
      var nombreLocal = equipos[0].textContent;
      var imagenLocal = `<img class="logito" src='../imagenes/otras/logosequipos/${nombreLocal}.png'>`;
      var nombreVisitante = equipos[1].textContent;
  
      // Verificar si los puntos son números antes de convertirlos
      var puntosLocal = isNaN(parseInt(puntos[0].textContent)) ? null : parseInt(puntos[0].textContent);
      var puntosVisitante = isNaN(parseInt(puntos[1].textContent)) ? null : parseInt(puntos[1].textContent);
  
      // Verificar si ambos equipos tienen números en los puntos antes de actualizar los contadores
      if (puntosLocal !== null && puntosVisitante !== null) {
          // Resto del código sin cambios...
  
          // Actualizar partidos jugados para ambos equipos
          actualizarContador(partidosJugados, nombreLocal);
          actualizarContador(partidosJugados, nombreVisitante);
  
          // Determinar el resultado del partido y actualizar victorias, derrotas, empates y puntosRecibidos
          if (puntosLocal > puntosVisitante) {
              actualizarContador(victorias, nombreLocal);
              actualizarContador(derrotas, nombreVisitante);
          } else if (puntosVisitante > puntosLocal) {
              actualizarContador(victorias, nombreVisitante);
              actualizarContador(derrotas, nombreLocal);
          } else {
              actualizarContador(empates, nombreLocal);
              actualizarContador(empates, nombreVisitante);
          }
  
          // Actualizar puntos recibidos para el equipo local y visitante
          actualizarPuntosRecibidos(puntosRecibidos, nombreLocal, puntosVisitante);
          actualizarPuntosRecibidos(puntosRecibidos, nombreVisitante, puntosLocal);
      }
    });
  });

  // Agregar las filas a la tabla con el número de partidos jugados, victorias, derrotas, empates y puntos recibidos por cada equipo
  var filas = [];

  for (var equipo in partidosJugados) {
    var fila = document.createElement('tr');
    var imagenLocal = `<img class="logito" src='../imagenes/otras/logosequipos/${equipo}.png'>`;
    var claseEquipo = equipo.charAt(0).toLowerCase() + equipo.slice(1);
    var tdLogito = fila.insertCell(0);
    tdLogito.innerHTML = imagenLocal;
    tdLogito.classList.add(claseEquipo);
    fila.insertCell(1).textContent = equipo;
    fila.insertCell(2).textContent = partidosJugados[equipo];
    fila.insertCell(3).textContent = victorias[equipo] || 0;
    fila.insertCell(4).textContent = derrotas[equipo] || 0;
    fila.insertCell(5).textContent = empates[equipo] || 0;
    fila.insertCell(6).textContent = puntosRecibidos[equipo] || 0;
    filas.push(fila);
  }

  // Función para comparar filas y ordenarlas
  function compararFilas(a, b) {
    if (parseInt(b.cells[3].textContent) - parseInt(a.cells[3].textContent) !== 0) {
      return parseInt(b.cells[3].textContent) - parseInt(a.cells[3].textContent);
    } else if (parseInt(b.cells[4].textContent) - parseInt(a.cells[4].textContent) !== 0) {
      return parseInt(b.cells[4].textContent) - parseInt(a.cells[4].textContent);
    } else if (parseInt(b.cells[5].textContent) - parseInt(a.cells[5].textContent) !== 0) {
      return parseInt(b.cells[5].textContent) - parseInt(a.cells[5].textContent);
    } else {
      return parseInt(b.cells[6].textContent) - parseInt(a.cells[6].textContent);
    }
  }

  // Ordenar el array de filas
  filas.sort(compararFilas);

  // Agregar las filas ordenadas al cuerpo de la tabla
  filas.forEach(function(fila) {
    tbody.appendChild(fila);
  });
}

// Función para actualizar el contador de partidos jugados, victorias, derrotas o empates para un equipo
function actualizarContador(contador, equipo) {
  if (!contador[equipo]) {
    contador[equipo] = 0;
  }
  contador[equipo]++;
}

// Función para actualizar los puntos recibidos para un equipo
function actualizarPuntosRecibidos(puntosRecibidos, equipo, puntos) {
  if (!puntosRecibidos[equipo]) {
    puntosRecibidos[equipo] = 0;
  }
  puntosRecibidos[equipo] += puntos;
}
