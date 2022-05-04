"use strict"

let btn = document.querySelector("#button");
let suma = document.querySelector("#suma");
let resultado = document.querySelector("#resultado");
btn.addEventListener("click", captcha);

let num1 = Math.floor((Math.random() * 9)+ 1);
let num2 = Math.floor((Math.random() * 9)+ 1);
console.log("Numeros: " +num1+ "," +num2);
let resultadoSuma = num1 + num2;
suma.innerHTML = num1+ "+" +num2;
    
let ingreso = document.querySelector("#resultadoUsuario").value;
console.log(ingreso);



function captcha() {
    if(ingreso == resultadoSuma){
        resultado.innerHTML = "El resultado es correcto";
        console.log(resultado);
    }
    else {
        resultado.innerHTML = "El resultado es incorrecto. Vuelva a intentarlo";
    }
}