let botonNumeros = document.getElementsByName("data-number");
let botonOpera = document.getElementsByName("data-opera");
let botonDelete = document.getElementsByName("data-delete")[0];
let botonIgual = document.getElementsByName("data-igual")[0];
let result = document.getElementById("result") as HTMLInputElement;
let operacionActual = "";
let operacionAnterior = "";
let operacion: unknown = undefined;


botonNumeros.forEach(function (boton) {
    boton.addEventListener("click", function (): void {
        agregarNumero(boton.innerText);
    });
});
botonOpera.forEach(function (boton) {
    boton.addEventListener("click", function (): void {
        selectOperacion(boton.innerText);
    });
});
botonIgual.addEventListener("click", function (): void {
    calcular();
    actualizarDisplay();
});
botonDelete.addEventListener("click", function () {
    clear();
    actualizarDisplay();
});
function selectOperacion(op: string) {
    if (operacionActual === "") return;
    if (operacionAnterior !== "") {
        calcular();
    }
    operacion = op.toString();
    operacionAnterior = operacionActual;
    operacionActual = "";
}
function calcular() {
    var calculo;
    var anterior: number = parseFloat(operacionAnterior);
    var actual: (number | string) = parseFloat(operacionActual);
    if (isNaN(anterior) || isNaN(actual)) return;
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
function agregarNumero(num: (string | number)) {
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
