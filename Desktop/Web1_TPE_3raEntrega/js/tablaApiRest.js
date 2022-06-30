document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
   "use strict";
    document.querySelector("#btn-mostrar").addEventListener("click", mostrar_tabla);
    document.querySelector("#btn-agregar").addEventListener("click", cargar_datos);
    const URL = "https://62b617a46999cce2e8fee570.mockapi.io/Dramas";
    /* obtener_e_imprimir_datos(); */
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

    async function cargar_datos() {
        //agarro los valores de los inputs
        console.log("se ejecuta cargar datos");
        event.preventDefault();
        let genero = document.querySelector("#genero").value;
        let titulo = document.querySelector("#titulo").value;
        let anio = document.querySelector("#año").value;
        let capitulos = document.querySelector("#capitulos").value;
        let estado = document.querySelector("#estado").value;
        let drama = {
            "thing": {
                "generoDrama": genero,
                "tituloDrama": titulo,
                "anioDrama": anio,
                "capDrama": capitulos,
                "estadoDrama": estado
            }
        }
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
            mostrar_tabla(nuevoDrama);
        }
        catch (error) {
            console.log(error);
        }
    }

    /* function asignarEditarBotones() {
        let botones = document.querySelectorAll(".btn-editar");
        for (const boton of botones) {
            boton.addEventListener("click", function () {
                editar_fila(boton);
            })
        }
    }
    
    function aisignarEliminaraBotones() {
        let botones = document.querySelectorAll(".btn-borrarFila");
        for (const boton of botones) {
            boton.addEventListener("click", function () {
                borrar_fila(boton);
            });
        }
    } */

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
        let genero = document.querySelector("#genero").value;
        let titulo = document.querySelector("#titulo").value;
        let anio = document.querySelector("#año").value;
        let capitulos = document.querySelector("#capitulos").value;
        let estado = document.querySelector("#estado").value;
        let drama = {
            "thing": {
                "generoDrama": genero,
                "tituloDrama": titulo,
                "anioDrama": anio,
                "capDrama": capitulos,
                "estadoDrama": estado
            }
        }
        try {
            let response = await fetch(URL + "/" + id, {         //debo darle un parametro de opciones que es un json, 
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(drama)        //esto es un string que adentro tiene escrito un json, no un objeto    
            });

            let nuevoDrama = await response.json();
            mostrar_tabla();
        }
        catch (error) {
            console.log(error);
        }
    }
}
