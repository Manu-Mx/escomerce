let m = 8;
let f = 1;

function sumaIntegrantes(val1, val2) {
    let sumEq = val1 + val2;
    //Mostrar un mensaje en pantalla
    //window.alert("¡Hola Guapetones! :)");
    // Mostrar un mensaje en consola del numero de integrantes del equipo 
    console.log("Esto es una prueba: " + sumEq);
    return sumEq;
}
//Funcion para hacer conteo de miembros
function countMem(numMem){
    var ul = document.getElementById("miembros");
    var i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    document.getElementById("numIntegrantes").innerHTML ="Hay " + itemCount + " de " + numMem + " Integrantes registrados:";
}

//Funcion para mostrar las opciones de direcciones
function showContent() {
    element = document.getElementById("content");
    check = document.getElementById("check");
    if (check.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
    }
}

//Funcion para mostrar las opciones para ser vendedor

function showContent1() {
    element = document.getElementById("content1");
    check = document.getElementById("check1");
    if (check1.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
    }
}

let integrantes= sumaIntegrantes(m,f);
countMem(integrantes);