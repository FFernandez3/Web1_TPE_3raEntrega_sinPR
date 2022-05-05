"use strict";
let btnCargar= document.querySelector("#nuevoCaptcha");
let ingreso=document.querySelector("#resultadoUsuario");
let btncheck =document.querySelector("#comprobar");
let res= document.querySelector("#resultado");

valorAletorio(); //llamo a la funcion cuando la pag se abre

btnCargar.addEventListener("click", valorAletorio);
//btncheck.addEventListener("click", validarCaptcha);


function valorAletorio(){
    let num =Math.floor((Math.random()*100)+1);
    let random =document.querySelector("#aleatorio");
    console.log(num);
    random.innerHTML=num;


btncheck.addEventListener("click", validarCaptcha);
function validarCaptcha(){
    
 let entrada=ingreso.value;
    console.log(entrada);
    
    if (entrada==num) { 
    res.innerHTML="¡Correcto! No sos un robot.";
    setTimeout(()=>{
            removerResultado();
            valorAletorio();
        }
     ,4000)} //cuatro segundos
     else{
        res.innerHTML="¡Incorrecto! Volve a intentarlo.";
        
        
     }
}  }

function removerResultado (){
    res.innerHTML="";
    ingreso.value="";
}





/*"use strict"

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
}*/