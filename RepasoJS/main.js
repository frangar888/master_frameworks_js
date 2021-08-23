var nombre = " Fran";
var apellido = " Garcia";
var dni = " 35770799";

var elem_nombre = document.getElementById("nombre");
elem_nombre.innerHTML += nombre;
var elem_apellido = document.getElementById("apellido");
elem_apellido.innerHTML += apellido;
var elem_dni = document.getElementById("dni");
elem_dni.innerHTML += dni;

var saludar = new Promise((resolve, reject) => {
  setTimeout(() => {
    var saludo = "Hola Repaso JS";
    saludo = false;
    if (saludo) {
      resolve(saludo);
    } else {
      reject("No hay saludo");
    }
  }, 5000);
});

saludar
  .then((resultado) => {
    alert(resultado);
  })
  .catch((err) => {
    alert(err);
  });
