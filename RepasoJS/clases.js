class Coche {
  constructor(modelo, marca, anio, velocidad) {
    this.modelo = modelo;
    this.marca = marca;
    this.anio = anio;
    this.velocidad = velocidad;
  }

  acelerar() {
    this.velocidad += 10;
  }

  desacelerar() {
    this.velocidad -= 10;
  }

  setModelo(lnk_modelo) {
    this.modelo = lnk_modelo;
  }
}

class Autobus extends Coche {
  constructor(modelo, marca, anio, velocidad) {
    super(modelo, marca, anio, velocidad);
  }
}

var autobus1 = new Autobus("Anfibio", "raquita", 2000, 20);

var coche1 = new Coche("Focus", "Ford", 2019, 0);
var coche2 = new Coche("Fiesta", "Ford", 2014, 0);
var coche3 = new Coche("Cruze", "Chevrolet", 2017, 0);
var coche4 = new Coche("208", "Peugeot", 2011, 0);
document.write("Autobus: " + autobus1.marca);
document.write("Velocidad: " + coche1.marca);
coche1.acelerar();
coche1.acelerar();
coche1.acelerar();
document.write("Velocidad: " + coche1.velocidad);
console.log(coche1);
console.log(autobus1);
