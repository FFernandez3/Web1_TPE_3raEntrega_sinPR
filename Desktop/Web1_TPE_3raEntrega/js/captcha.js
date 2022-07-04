document.addEventListener("DOMContentLoaded", iniciarPaginaCaptcha);
function iniciarPaginaCaptcha() {
    "use strict";
    document.querySelector("#nuevoCaptcha").addEventListener("click", recargarValor);
    document.querySelector("#comprobar").addEventListener("click", validarCaptcha);
    let res = document.querySelector("#resultado");
    let form = document.querySelector(".formulario");
    form.addEventListener("submit", obtenerRegistro);

    valorAletorio(); //llamo a la funcion cuando la pag se abre
    ocultarBoton(); //oculta el boton desde el inicio
    console.log("aplica ocultar boton");


    function recargarValor(event) {
        event.preventDefault();
        valorAletorio();
        ocultarBoton();
        res.innerHTML = "Resultado";
    }


    function valorAletorio() {
        let num = Math.floor((Math.random() * 100) + 1);
        let divRandom = document.querySelector("#aleatorio");
        divRandom.innerHTML = num;
    }


    function validarCaptcha(event) {
        event.preventDefault();
        let numIngresado = document.querySelector("#resultadoUsuario").value;
        let numAleatorio = document.querySelector("#aleatorio").innerHTML;


        if (numIngresado == numAleatorio) {
            res.innerHTML = "¡Correcto! No sos un robot.";
            mostrarBoton();
        }
        else {
            res.innerHTML = "¡Incorrecto! Volve a intentarlo.";
            ocultarBoton();
        }

    }
    document.querySelector(".formulario").reset();
    function mostrarBoton() {
        document.getElementById("enviar").classList.remove("ocultar");
    }
    function ocultarBoton() {
        document.getElementById("enviar").classList.add("ocultar");
    }

    function obtenerRegistro() {
        let formData = new FormData(form);
        let nombre = formData.get("name");
        let apellido = formData.get("apellido");
        let email = formData.get("email");
        let mensaje = formData.get("mensaje");

        let registro = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "mensaje": mensaje
        }
        return registro;
    }
}
