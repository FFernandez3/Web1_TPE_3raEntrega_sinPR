"use strict";
let btnCargar = document.querySelector("#nuevoCaptcha");
let ingreso = document.querySelector("#resultadoUsuario");
let btncheck = document.querySelector("#comprobar");
let res = document.querySelector("#resultado");

valorAletorio(); //llamo a la funcion cuando la pag se abre
ocultarBoton(); //oculta el boton desde el inicio
console.log("aplica ocultar boton");
btnCargar.addEventListener("click", valorAletorio);


function valorAletorio() {
    let num = Math.floor((Math.random() * 100) + 1);
    let random = document.querySelector("#aleatorio");
    console.log(num);
    random.innerHTML = num;


    btncheck.addEventListener("click", validarCaptcha);
    function validarCaptcha() {
        event.preventDefault();
        let entrada = ingreso.value;
        console.log(entrada);

        if (entrada == num) {
            res.innerHTML = "¡Correcto! No sos un robot.";
            mostrarBoton();
            /*OTRA OPCION
            setTimeout(removerResultado, 4000); 
             setTimeout(valorAletorio, 4000);*/
          /*   setTimeout(() => {
                removerResultado();
                valorAletorio();
            }
                , 4000)
                console.log("se ejecuto set time out"); */
        } //cuatro segundos
        else {
            res.innerHTML = "¡Incorrecto! Volve a intentarlo.";
            ocultarBoton();
            setTimeout(() => {
                removerResultado();
                valorAletorio();
            }
                , 4000)
                console.log("se ejecuto set time out");
        }
    }
}

function removerResultado() {
    res.innerHTML = "";
    ingreso.value = "";
}
function mostrarBoton(){
    document.getElementById("enviar").classList.remove("ocultar");
    console.log("aplica mostrar boton")
}
function ocultarBoton (){
    document.getElementById("enviar").classList.add("ocultar");
}



