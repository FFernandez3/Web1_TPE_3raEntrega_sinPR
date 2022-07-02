document.addEventListener("DOMContentLoaded", iniciarPaginaTabla);
function iniciarPaginaTabla() {
    "use strict";
    let divResultado=document.querySelector("#resultadoOperacion");
    //document.querySelector("#btn-mostrar").addEventListener("click", mostrar_tabla);
    let form = document.querySelector("#form");
    form.addEventListener("submit", cargar_datos);
    const URL = "https://62b617a46999cce2e8fee570.mockapi.io/Dramas";

    const tabla = document.querySelector("#cuerpoTabla");
    mostrar_tabla();

    async function mostrar_tabla() {
        /*  event.preventDefault(); */  /*SI SE LO PONGO NO CARGA LA PAG AL INICIO */
        try {
            let response = await fetch(URL);
            if(response.ok){
                let json = await response.json(); /*lo q trae es el json stringifiado que le mande en cargar_datos, y lo vuelve a convertir a json */
                tabla.innerHTML = " ";
                divResultado.classList.toggle("mostrarResultado");
                console.log(json);
                for (const drama of json) {
                    mostrarLinea(drama);
                }
                document.querySelectorAll(".btn-borrarFila").forEach(boton => boton.addEventListener("click", function () {
                    eliminar_fila_en_servidor(boton)
                }));
                document.querySelectorAll(".btn-editar").forEach(boton => boton.addEventListener("click", function () {
                    editar_fila_en_servidor(boton)
                }));
               }
               
        }
        catch (error) {
            console.log(error);
            divResultado.classList.toggle("mostrarResultado");
            divResultado.innerHTML="ERROR: No se puede cargar la tabla."
        }
    }

    function mostrarLinea(drama) {
        let genero = drama.generoDrama;
        let titulo = drama.tituloDrama;
        let anio = drama.anioDrama;
        let capitulos = drama.capDrama;
        let estado = drama.estadoDrama;
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
        let drama=obtener_datos_inputs();
    
        try {
            let response = await fetch(URL, {         //debo darle un parametro de opciones que es un json, 
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
            
                "body": JSON.stringify(drama)        //esto es un string que adentro tiene escrito un json, no un objeto    
            });
            if(response.status==201){
                let nuevoDrama = await response.json(); //(lo q recibo lo desconvierto de texto a json) ESTO LO HAGO DESPUES  EN OBTENER DATOS     
                mostrarLinea(nuevoDrama);
                divResultado.classList.toggle("mostrarResultado");
                divResultado.innerHTML="¡El drama fue agregado con éxito!"
                setTimeout(function(){
                    divResultado.classList.toggle("mostrarResultado");
                }, 2000);
            }
        
        }
        catch (error) {
            console.log(error);
            divResultado.classList.toggle("mostrarResultado");
            divResultado.innerHTML="ERROR: No pudo cargarse el drama a la tabla."
            setTimeout (mostrar_tabla, 2000);
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

    async function eliminar_fila_en_servidor(boton) {
            /*  let id=this.dataset.dramaId;  */
    let id = boton.getAttribute("data-id");
    /*  console.log(id); */
    try {
        let response = await fetch(URL + "/" + id, {
            method: "DELETE",
        });
        if (response.ok){
            let json = response.json();
            borrar_fila_html(boton); //con esto evito borrar toda la tabla y mostrarla otra vez
            divResultado.classList.add("mostrarResultado");
            divResultado.innerHTML="Se eliminó con éxito el drama."
        } 
    }
    catch (error) {
        console.log(error);
        divResultado.classList.add("mostrarResultado");
        divResultado.innerHTML="ERROR: No pudo eliminarse el drama de la tabla."
        setTimeout(mostrar_tabla, 2000);
   
    }
}
function borrar_fila_html(boton){ //borra la fila de la vista
    let fila =boton.parentNode.parentNode;
    console.log(fila);
    fila.innerHTML="";
    /* fila.remove();  */ 
}

async function editar_fila_en_servidor(boton) {
    let id = boton.getAttribute("data-id");
    event.preventDefault();
    let drama=obtener_datos_inputs();
    try {
        let response = await fetch(URL + "/" + id, {         //debo darle un parametro de opciones que es un json, 
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(drama)        //esto es un string que adentro tiene escrito un json, no un objeto    
        });

        if(response.ok){
            let nuevoDrama = await response.json(); 
            editarFila(boton, nuevoDrama);
        }
       
      
    }
    catch (error) {
        console.log(error);
        divResultado.classList.add("mostrarResultado");
        divResultado.innerHTML="ERROR: No pudo editarse este drama de la tabla."
        setTimeOut (mostrar_tabla, 2000);
        
    }
}
function editarFila(boton, nuevoDrama) { //actualizo la fila en la vista 
    /* let id = boton.getAttribute("data-id"); */
    let fila =boton.parentNode.parentNode;
    /* fila.setAttribute("data-id", id); */
    console.log("Estoy editando la fila");
    
    fila.innerHTML = `<tr>
                         <td>${nuevoDrama.generoDrama}</td>
                         <td>${nuevoDrama.tituloDrama}</td>
                         <td>${nuevoDrama.anioDrama}</td>
                         <td>${nuevoDrama.capDrama}</td>
                         <td>${nuevoDrama.estadoDrama}</td>
                         <td>
                             <button data-id="${nuevoDrama.id}" class="btn-editar">Editar</button>
                             <button data-id="${nuevoDrama.id}" type="submit" class="btn-borrarFila">Eliminar</button>
                        </td>
                    </tr>`
}
}
