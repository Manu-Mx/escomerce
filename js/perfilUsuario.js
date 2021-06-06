const db = firebase.firestore();

const taskForm = document.getElementById('form_usuarioPago');
//const taskContainer = document.getElementById('printMetodoPagos');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveMetodoPagos = (titular_metodoPago, month_metodoPago, year_metodoPago) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('metodoPago').doc().set({
        titular_metodoPago,
       // numeroTarjeta_metodoPago,
       // cvc_metodoPago,
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
    //    taskContainer.innerHTML ='';
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
          /*  const btnEdit = document.querySelectorAll('btnEditarTarjeta');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getMetodoPago(e.target.dataset.id);
                    const metodoPago = doc.data();

                    editStatus = true;
                    id = doc.id;

                    taskForm['card_holder_mpago'].value = metodoPago.titular_metodoPago;
                   // taskForm['card_number-1'].value = metodoPago.numeroTarjeta_metodoPago;
                   // taskForm['cvc-1'].value = metodoPago.cvc_metodoPago;
                    taskForm['card_month_mpago'].value = metodoPago.month_metodoPago;
                    taskForm['card_year_mpago'].value = metodoPago.year_metodoPago;


                    //Boton de actualizar info (No Tocar)
                    taskForm['btn_guardar'].innerText = 'Update';
                })
            }) */
        })

    })

});

//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const titular_metodoPago = taskForm['card_holder_mpago'].value;
   // const numeroTarjeta_metodoPago = taskForm['card_number-1'].value;
    //const cvc_metodoPago = taskForm['cvc-1'].value;
    const month_metodoPago = taskForm['card_month_mpago'].value;
    const year_metodoPago = taskForm['card_year_mpago'].value;

    
    await saveMetodoPagos(titular_metodoPago, month_metodoPago, year_metodoPago);
    if (!editStatus) {
        
    } else {

        await updateMetodoPago(id, {
            titular_metodoPago,
          //  numeroTarjeta_metodoPago,
          //  cvc_metodoPago,
            month_metodoPago,
            year_metodoPago
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['btn_guardar'].innerText = 'Guardar';

    }

    getMetodoPagos();
    taskForm.reset();   //console.log(titular__metodoPago, numeroTarjeta_metodoPago);
})