//Formulario
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var nombre = document.querySelector('form input[name="nombre"]').value;
    alert('¡Gracias ' + nombre + ', tu mensaje ha sido enviado correctamente!');
    document.querySelector('form').reset();
  });
  // Obtén todos los elementos de la clase 'jornadas'
  var jornadasLinks = document.querySelectorAll('.jornadas a');

  // Agrega un evento click solo a los enlaces de la jornada 3 hasta la jornada 10
  for (var i = 2; i < 10; i++) {
    jornadasLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      alert('Estas jornadas aún no están implementadas','Lo sentimos');
    });
  }