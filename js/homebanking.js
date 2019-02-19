//Declaración de variables
var sesion;

var nombreUsuario = "Nazareno Morillo";
var clave = 4321;
var saldoCuenta = 1500;
var limiteExtraccion = 1000;

var servicioAgua = 350;
var servicioTelefono = 425;
var servicioLuz = 210;
var servicioInternet = 570;

var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla(clave);
    actualizarSaldoEnPantalla(clave);
    actualizarLimiteEnPantalla(clave);
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  if (clave == sesion) {
    var nuevoLimiteExtraccion = parseInt(prompt("Ingrese monto de límite de extracción"));
    limiteExtraccion = nuevoLimiteExtraccion;
  } else {
    alert("Cuenta bloqueada, no es posible realizar operaciones");
  }
  actualizarLimiteEnPantalla(clave);
}

function extraerDinero() {

  if (clave == sesion) {
    var extraccion = prompt("Ingrese monto a extraer");
    var saldoAnterior = saldoCuenta;

    if (billetesCien(extraccion) && montoValido(extraccion,limiteExtraccion, saldoCuenta)) {
      saldoCuenta -= extraccion;
      alert("Has extraído: $"+extraccion+"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $"+saldoCuenta);
    }else if (extraccion === null) {
    }
  } else {
    alert("Cuenta bloqueada, no es posible realizar operaciones");
  }
  actualizarSaldoEnPantalla(clave);
}

function depositarDinero() {

  if (clave == sesion) {
    var deposito = parseInt(prompt("Ingrese monto a depositar"));

    if (numValido(deposito, deposito, deposito)) {
      saldoAnterior = saldoCuenta;
      saldoCuenta += deposito;
      alert("Has depositado: $"+deposito+"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $"+saldoCuenta);
    } else {
      alert("Ingreso inválido, no se realizará ninguna acción");
    }
  } else {
    alert("Cuenta bloqueada, no es posible realizar operaciones");
  }
  actualizarSaldoEnPantalla(clave);
}

function pagarServicio() {
    if (clave == sesion) {
      var pagoServicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que desea pagar\n1. Agua\n2. Luz\n3. Internet\n4. Teléfono", ""));
      var saldoAnterior = saldoCuenta;
      var montoServicio, servicio;

      switch (pagoServicio) {
        case 1:
          montoServicio = servicioAgua;
          servicio = "Agua";
          break;
        case 2:
          montoServicio = servicioLuz;
          servicio = "Luz";
          break;
        case 3:
          montoServicio = servicioInternet;
          servicio = "Internet";
        break;
        case 4:
          montoServicio = servicioTelefono;
          servicio = "Teléfono";
        break;
        default:
          alert("No existe el servicio seleccionado!\nNo ha realizado ninguna acción");
      }

      if ((pagoServicio >=1) && (pagoServicio <=4) && (montoServicio < saldoCuenta)) {
        saldoCuenta -= montoServicio;
        alert("Has pagado el servicio de "+servicio+"\nSaldo anterior $"+saldoAnterior+"\nDinero descontado $"+montoServicio+"\nSaldo actual: $"+saldoCuenta);
      } else if (montoServicio > saldoCuenta) {
        alert("No hay saldo suficiente en tu cuenta para pagar el servicio de "+servicio+".\nDeposita dinero antes de pagar este servicio.");
      }
    } else {
      alert("Cuenta bloqueada, no es posible realizar operaciones");
    }
    actualizarSaldoEnPantalla(clave);
}

function transferirDinero() {
    if (clave == sesion) {
      var tranferencia = parseInt(prompt("Ingrese monto a transferir"));
      var saldoAnterior = saldoCuenta;
      var cuentaDestino = parseInt(prompt("Ingrese cuenta de destino"));

      if ((montoValido(tranferencia,limiteExtraccion, saldoCuenta))&&(existeCuenta(cuentaDestino))) {
        saldoCuenta -= tranferencia;
        alert("Se han transferido $"+tranferencia+"\nCuenta de destino "+cuentaDestino);
      }
    } else {
      alert("Cuenta bloqueada, no es posible realizar operaciones");
    }
  actualizarSaldoEnPantalla(clave);
}

function existeCuenta (destino){
  var res=false;

  if (destino === cuentaAmiga1 || destino === cuentaAmiga2) {
    return res=true;
  }else{
    alert("Solo puede transferirse dinero a una cuenta amiga.");
    return res;
  }
}

function iniciarSesion() {
  sesion = prompt("Sistema HomeBanking\nIngrese su código de seguridad");

  if (claveValida()===false) {
    nombreUsuario = "";
    saldoCuenta = 0;
    limiteExtraccion = 0;
    alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
  } else {
    alert("Bienvenido/a "+nombreUsuario+" ya puedes comenzar a realizar operaciones");
  }
}

function claveValida () {
  var res = false;
  if (sesion == clave) {
    res = true;
  }
  return res;
}

function numValido (monto, limite, saldo) {
  var tipo = typeof monto;
  var res = false;
  if (monto > 0 && monto <= limite && (monto <= saldo)) {
    return res =true;
  }
  return res;
}

function montoValido (monto, limite, saldo) {
  var res = false;
  if (monto > 0 && monto <= limite && (monto <= saldo)) {
    return res =true;
  } else if (monto > saldo) {
    alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.");
  } else if (monto > limite ) {
    alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extración\nIntenta con un monto inferior a $"+limite+" .");
  } else if (monto <= 0 && monto !=null) {
    alert("Has ingresado un monto inválido.");
  } else {
    alert("Has ingresado un valor nulo");
  }
  return res;
}

function billetesCien (monto) {
  var res=false;
  var billetesDeCien = Math.floor(parseInt(monto)/100);
  var extraccionSugerida = billetesDeCien*100;

  if(monto%100 === 0){
    return res = true;
  } else if (monto < 100) {
   alert("Solo puedes extraer billetes de $100");
  } else {
    alert("Solo puedes extraer billetes de $100\nEn lugar de solicitar $"+monto+" intente con $"+extraccionSugerida+".");
  }
  return res;
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(pass) {
  var nombUser="Usuario bloqueado";
  if (clave === pass) {
    nombUser= nombreUsuario;
  }
document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombUser;
}

function actualizarSaldoEnPantalla(pass) {
  var saldoC=0;
  if (clave === pass) {
    saldoC= saldoCuenta;
  }
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoC;
}

function actualizarLimiteEnPantalla(pass) {
  var limiteE=0;
  if (clave === pass) {
    limiteE= limiteExtraccion;
  }
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteE;
}
