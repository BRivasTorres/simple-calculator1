let botonNumeros = document.getElementsByName("data-number");
let botonOpera = document.getElementsByName("data-opera");
let botonDelete = document.getElementsByName("data-delete")[0];
let botonIgual = document.getElementsByName("data-igual")[0];
let result = document.getElementById("result") as HTMLInputElement;
let operacionActual: string = "";
let operacionAnterior: string = "";
let operacion: string | undefined;


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


function selectOperacion(op: string) {
    (operacionActual !== "") ? calcular() : null;
    operacion = op;
    operacionAnterior = operacionActual;
    operacionActual = "";
}

function calcular(){
    let calculo: number;
    let anterior: number = parseFloat(operacionAnterior);
    let actual: number = parseFloat(operacionActual);
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

function agregarNumero(num: number) {
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
