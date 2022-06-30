window.onload=(event)=>{ //cuando inicie la pag
    /* window["about"].addEventListener("DOMContentLoaded", (event)=>push(event)); */
    window["inicio"].addEventListener("click", (event)=>push(event));
    window["recomendados"].addEventListener("click", (event)=>push(event));
    window["registrarme"].addEventListener("click", (event)=>push(event));
    cargar("inicio"); //que aparezca about cuando se inicia 
}
function select_tab(id){
    document.querySelectorAll(".route").forEach((item)=>item.classList.remove("selected"));
    document.querySelectorAll("#" + id).forEach((item)=>item.classList.add("selected"));

}
async function load_content(id){
    let response=await fetch(`${window.location.origin}/${id}.html`); 
    let contenedor= document.querySelector("#content");
    try{
        if (response.ok) {
            let content =await response.text();
            contenedor.innerHTML=content;
            if(id=="recomendados"){
                agregarScripts();
            }
           
        }
        else {
           contenedor.innerHTML="Error loading for /"+ id+"...";
        }
    }
    catch(error){
        contenedor.innerHTML="Error";
    }
   

}
function agregarScripts(){
    let div =document.querySelector("#scripts");
    div.innerHTML="<script src='js/tablaApiRest.js'></script>";
    console.log("Se ejecuta agregar scripts");
    
}
//para volver a la pagina anterior
window.addEventListener("popstate", (event)=>{ 
    let stateId=event.state.id; //agarro el estado anterior
    console.log("stateId =", stateId);
    select_tab(stateId); //agarro el tab del contenido anterior
    load_content(stateId); //agarro el contenido anterior
})
function push (event){
    let id=event.target.id;
    cargar(id);
    /* select_tab(id);
    document.title=id; //se va a cambiar el nombre del tab
    load_content(id);
    window.history.pushState({id}, `${id}`, `/page/${id}`); //cambia la URL */

}
function cargar(id){
    select_tab(id);
    document.title=id; //se va a cambiar el nombre del tab
    load_content(id);
    window.history.pushState({id}, `${id}`, `/page/${id}`); //cambia la URL
}
