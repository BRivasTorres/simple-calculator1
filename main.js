var botonNumeros = document.getElementsByName("data-number");
var botonOpera = document.getElementsByName("data-opera");
var botonDelete = document.getElementsByName("data-delete")[0];
var botonIgual = document.getElementsByName("data-igual")[0];
var result = document.getElementById("result");
var operacionActual = "";
var operacionAnterior = "";
var operacion;
botonNumeros.forEach(function (boton) {
    boton.addEventListener("click", function () {
        agregarNumero(parseInt(boton.innerText));
    });
});
botonOpera.forEach(function (boton) {
    boton.addEventListener("click", function () {
        selectOperacion(boton.innerText);
    });
});
botonIgual.addEventListener("click", function () {
    calcular();
    actualizarDisplay();
});
botonDelete.addEventListener("click", function () {
    clear();
    actualizarDisplay();
});
function selectOperacion(op) {
    (operacionActual !== "") ? calcular() : null;
    operacion = op;
    operacionAnterior = operacionActual;
    operacionActual = "";
}
function calcular() {
    var calculo;
    var anterior = parseFloat(operacionAnterior);
    var actual = parseFloat(operacionActual);
    if (isNaN(anterior) || isNaN(actual))
        return;
    switch (operacion) {
        case "+":
            calculo = anterior + actual;
            break;
        case "-":
            calculo = anterior - actual;
            break;
        case "*":
            calculo = anterior * actual;
            break;
        case "/":
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    operacionActual = calculo.toString();
    operacion = undefined;
    operacionAnterior = "";
}
function agregarNumero(num) {
    operacionActual = operacionActual.toString() + num.toString();
    actualizarDisplay();
}
function clear() {
    operacionActual = "";
    operacionAnterior = "";
    operacion = undefined;
}
clear();
function actualizarDisplay() {
    result.value = operacionActual;
}
