document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict";
    document.querySelector("#btn-mostrar").addEventListener("click", mostrar_tabla);
    let form = document.querySelector("#form");
    form.addEventListener("submit", cargar_datos);
    const URL = "https://62b617a46999cce2e8fee570.mockapi.io/Dramas";

    const tabla = document.querySelector("#cuerpoTabla");
    async function mostrar_tabla() {
        /*  event.preventDefault(); */  /*SI SE LO PONGO NO CARGA LA PAG AL INICIO */
        try {
            let response = await fetch(URL); /* pedido http al servidor (GET) */
            let json = await response.json(); /*lo q trae es el json stringifiado que le mande en cargar_datos, y lo vuelve a convertir a json */
            tabla.innerHTML = " ";
            console.log(json);
            for (const drama of json) {
                mostrarLinea(drama);
            }
            document.querySelectorAll(".btn-borrarFila").forEach(boton => boton.addEventListener("click", function () {
                borrar_fila(boton)
            }));
            document.querySelectorAll(".btn-editar").forEach(boton => boton.addEventListener("click", function () {
                editar_fila(boton)
            }));
        }
        catch (error) {
            console.log(error);
        }
    }

    function mostrarLinea(drama) {
        let genero = drama.generoDrama;
        let titulo = drama.tituloDrama;
        let anio = drama.anioDrama;
        let capitulos = drama.capDrama;
        let estado = drama.thing.estadoDrama;
        let id = drama.id;

        tabla.innerHTML += `<tr>
                        <td>${genero}</td>
                        <td>${titulo}</td>
                        <td>${anio}</td>
                        <td>${capitulos}</td>
                        <td>${estado}</td>
                        <td><button data-id="${id}" class="btn-editar">Editar</button>
                        <button data-id="${id}" type="submit" class="btn-borrarFila">Eliminar</button></td>
                    </tr>`
    }

    async function cargar_datos(event) {
        //agarro los valores de los inputs
        console.log("se ejecuta cargar datos");
        event.preventDefault();
        let drama = obtener_datos_inputs();
        try {
            let response = await fetch(URL, {         //debo darle un parametro de opciones que es un json, 
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(drama)        //esto es un string que adentro tiene escrito un json, no un objeto    
            });

            let nuevoDrama = await response.json(); //(lo q recibo lo desconvierto de texto a json) ESTO LO HAGO DESPUES  EN OBTENER DATOS     
            //como remplazo esto para q no se cargue toda la pag de nuevo???????????????????
            mostrarLinea(nuevoDrama);
        }
        catch (error) {
            console.log(error);
        }
    }
    function obtener_datos_inputs() {
        let formData = new FormData(form);
        let genero = formData.get("genero");
        let titulo = formData.get("titulo");
        let anio = formData.get("año");
        let capitulos = formData.get("capitulos");
        let estado = formData.get("estado");

        let drama = {
            "generoDrama": genero,
            "tituloDrama": titulo,
            "anioDrama": anio,
            "capDrama": capitulos,
            "estadoDrama": estado
        }
        return drama;
    }

    async function borrar_fila(boton) {
        /*  let id=this.dataset.dramaId;  */
        let id = boton.getAttribute("data-id");
        /*  console.log(id); */
        try {
            let response = await fetch(URL + "/" + id, {
                method: "DELETE",
            });
            let json = response.json();
            mostrar_tabla();
            /* mostrarLinea(json); */
        }
        catch (error) {
            console.log(error);
        }
    }

    async function editar_fila(boton) {
        let id = boton.getAttribute("data-id");
        event.preventDefault();
        let drama = obtener_datos_inputs();
        try {
            let response = await fetch(URL + "/" + id, {         //debo darle un parametro de opciones que es un json, 
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(drama)        //esto es un string que adentro tiene escrito un json, no un objeto    
            });

            let nuevoDrama = await response.json();
            /* mostrar_tabla(); */ //si lo pongo me lo ejecuta en loop 
        }
        catch (error) {
            console.log(error);
        }
    }
}
