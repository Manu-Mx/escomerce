//const db = firebase.firestore();
var idCliente;
var calle;
var noExt;
var noInt;
var colonia;
var alcaldia;
var CP;
var referencias;
//const taskContainer = document.getElementById('printMetodoPagos');
var dirRef;
var cont = 0;
let editStatus = false;
let id = '';
var existeDir = false;

//Funcion para guardar la informacion en la base de datos
const saveMetodoPagos = (titular_metodoPago, numeroTarjeta_metodoPago, cvc_metodoPago, month_metodoPago, year_metodoPago) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('metodoPago').doc().set({
        titular_metodoPago,
        numeroTarjeta_metodoPago,
        cvc_metodoPago,
        month_metodoPago,
        year_metodoPago
    })
    
    //Funcion para imprimir la informacion
const getMetodoPagos = () => db.collection('metodoPago').get();
const getMetodoPago = (id) => db.collection('metodoPago').doc(id).get();
const onGetMetodoPagos = (callback) => db.collection('metodoPago').onSnapshot(callback);
const deleteMetodoPago = (id) => db.collection('metodoPago').doc(id).delete();
const editMetodoPago = (id) => db.collection('metodoPago').doc(id).get();
const updateMetodoPago = (id, updatedMetodoPago) => db.collection('metodoPago').doc(id).update(updatedMetodoPago);


//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetMetodoPagos((querySnapshot) => {
        //Borra el contenido anterior dentro del div
       // taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        
        querySnapshot.forEach(doc => {
          
            const MetodoPagoDato = doc.data()
            MetodoPagoDato.id = doc.id;

            
            /*Genera un html
            taskContainer.innerHTML += '<div class="tarjeta_MetodoPago"><div class="img_MetodoPago"><img src="' + MetodoPagoDato.titular_metodoPago +
                '" alt="' + MetodoPagoDato.titular_metodoPago +
                '"></div><h3>' + MetodoPagoDato.numeroTarjeta_metodoPago +
                '</h3><div class="desc_MetodoPago"><h4>' + MetodoPagoDato.cvc_metodoPago +
                '</h4><p>' + MetodoPagoDato.month_metodoPago+
                '</p><a href="#"><p>' + metodoPago.month_metodoPago +
                '</p></a></div> <div class="botones_carta"><button class="btn btn-primary btn-delete" data-id="' + MetodoPagoDato.id + '">Eliminar</button><button class="btn btn-secundary btn-edit" data-id="' + MetodoPagoDato.id + '">Editar</button></div></div>';
*/

            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteMetodoPago(e.target.dataset.id)
                })
            })
           /* const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getMetodoPago(e.target.dataset.id);
                    const metodoPago = doc.data();

                    editStatus = true;
                    id = doc.id;

                    taskForm['card_holder-1'].value = metodoPago.titular_metodoPago;
                    taskForm['card_number-1'].value = metodoPago.numeroTarjeta_metodoPago;
                    taskForm['cvc-1'].value = metodoPago.cvc_metodoPago;
                    taskForm['card_month-1'].value = metodoPago.month_metodoPago;
                    taskForm['card_year-1'].value = metodoPago.year_metodoPago;


                    //Boton de actualizar info (No Tocar)
                    taskForm['btn_pagar'].innerText = 'Update';
                })
            }) */
        })

    })

});



//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const titular_metodoPago = taskForm['card_holder-1'].value;
    const numeroTarjeta_metodoPago = taskForm['card_number-1'].value;
    const cvc_metodoPago = taskForm['cvc-1'].value;
    const month_metodoPago = taskForm['card_month-1'].value;
    const year_metodoPago = taskForm['card_year-1'].value;
    
    await saveMetodoPagos(titular_metodoPago, numeroTarjeta_metodoPago, cvc_metodoPago, month_metodoPago, year_metodoPago);


    if (!editStatus) {
    } else {

        await updateIntegrante(id, {
            url_foto,
            nombre_integrante,
            escuela_integrante,
            desc_integrante,
            social_integrante
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['subir_registro'].innerText = 'Guardar';

    }

    getMetodoPagos();
    taskForm.reset();

   
    //console.log(url_foto, nombre_integrante);
})

function showMetodoCash(){
    element = document.getElementById("divPagoCard");
    element1 = document.getElementById("divPagoCash");
    element.style.display = 'none';
    element1.style.display = 'block';
}

function showMetodoCard(){
    element = document.getElementById("divPagoCard");
    element1 = document.getElementById("divPagoCash");
    if(tarjetaCredito == true){
        element.style.display = 'block';
        element1.style.display = 'none';
    } if(tarjetaCredito == false) {
        element.style.display = 'none';
        element1.style.display = 'block';
    } 
}

document.getElementById("payCard").addEventListener('click',async(e)=>{
    efectivo = false;
    tarjetaCredito= true; 
    showMetodoCard()});

document.getElementById("payCash").addEventListener('click',async(e)=>{
    efectivo = true;
    tarjetaCredito= false;
    showMetodoCard()});

const saveDireccion = (idCliente, calle, noInt, noExt, colonia, alcaldia, CP, referencias) =>

db.collection('direcciones').doc().set({
    idCliente,
    calle, 
    noInt, 
    noExt, 
    colonia, 
    alcaldia, 
    CP, 
    referencias
})

document.getElementById("btnAgregarDireccionCompra").addEventListener("click", async (e) => {
    document.getElementById('calle').setAttribute("required", "");
    document.getElementById('noExt').setAttribute("required", "");
    document.getElementById('colonia').setAttribute("required", "");
    document.getElementById('alcaldia').setAttribute("required", "");
    document.getElementById('cp').setAttribute("required", "");
    document.getElementById('referencias').setAttribute("required", "");
})
document.getElementById("btnClose").addEventListener("click", async (e) => {
    document.getElementById('calle').removeAttribute("required");
    document.getElementById('noExt').removeAttribute("required");
    document.getElementById('colonia').removeAttribute("required");
    document.getElementById('alcaldia').removeAttribute("required");
    document.getElementById('cp').removeAttribute("required");
    document.getElementById('referencias').removeAttribute("required");
})
document.getElementById("btnCerrar").addEventListener("click", async (e) => {
    document.getElementById('calle').removeAttribute("required");
    document.getElementById('noExt').removeAttribute("required");
    document.getElementById('colonia').removeAttribute("required");
    document.getElementById('alcaldia').removeAttribute("required");
    document.getElementById('cp').removeAttribute("required");
    document.getElementById('referencias').removeAttribute("required");
})

document.getElementById('btnGuardarDir').addEventListener("click", async (e) => {
    e.preventDefault();
    if(existeDir == true){
        mensajeAdvertencia('Esta direccion ya esta en tus opciones');
        return;
    }else{
        idCliente = sessionStorage.getItem('idCliente');
        calle = document.getElementById("calle").value.toUpperCase();
        noInt = Number(document.getElementById("noInt").value);
        noExt = Number(document.getElementById("noExt").value);
        colonia = document.getElementById("colonia").value.toUpperCase();
        alcaldia = document.getElementById("alcaldia").value.toUpperCase();
        CP = Number(document.getElementById("cp").value);
        referencias = document.getElementById("referencias").value.toUpperCase();
        await saveDireccion (idCliente, calle, noInt, noExt, colonia, alcaldia, CP, referencias);
        mensajeDeExito('Direccion registrada con exito', './realizarPedido.html');
        location.reload();
    }
})



addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    db.collection("direcciones").where("idCliente", "==", sessionStorage.getItem('idCliente'))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            dirRef = doc.data();
            dirId = doc.id;
            var select = document.getElementById("selectDir")
            var option = document.createElement("option");
            option.innerHTML = '<option id="'+dirId+'" value="'+dirId +'" selected="">' + dirRef.calle + " #" + dirRef.noExt + '</option>';
            select.appendChild(option);
        })
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    })
})

document.getElementById('modalDireccion').addEventListener('keyup', async (e) => {
    existeDir = false;
    db.collection("direcciones").where("calle", "==", document.getElementById('calle').value.toUpperCase())
    .where("idCliente", "==", sessionStorage.getItem('idCliente'))
    .where("noExt", "==", Number(document.getElementById('noExt').value))
    .where("colonia", "==", document.getElementById('colonia').value.toUpperCase())
    .where("alcaldia", "==", document.getElementById('alcaldia').value.toUpperCase())
    .where("CP", "==", Number(document.getElementById('cp').value))
    .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existeDir = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});

document.getElementById('modalDireccion').addEventListener('click', async (e) => {
    existeDir = false;
    db.collection("direcciones").where("calle", "==", document.getElementById('calle').value.toUpperCase())
    .where("idCliente", "==", sessionStorage.getItem('idCliente'))
    .where("noExt", "==", Number(document.getElementById('noExt').value))
    .where("colonia", "==", document.getElementById('colonia').value.toUpperCase())
    .where("alcaldia", "==", document.getElementById('alcaldia').value.toUpperCase())
    .where("CP", "==", Number(document.getElementById('cp').value))
    .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existeDir = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});

document.getElementById('modalDireccion').addEventListener('input', async (e) => {
    existeDir=false;
    db.collection("direcciones").where("calle", "==", document.getElementById('calle').value.toUpperCase())
    .where("idCliente", "==", sessionStorage.getItem('idCliente'))
    .where("noExt", "==", Number(document.getElementById('noExt').value))
    .where("colonia", "==", document.getElementById('colonia').value.toUpperCase())
    .where("alcaldia", "==", document.getElementById('alcaldia').value.toUpperCase())
    .where("CP", "==", Number(document.getElementById('cp').value))
    .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existeDir = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});