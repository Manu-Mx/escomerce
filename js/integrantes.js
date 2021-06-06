const db = firebase.firestore();

const taskForm = document.getElementById('form_datos_int');
const taskContainer = document.getElementById('printIntegrantes');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveIntegrantes = (url_foto, nombre_integrante, escuela_integrante, desc_integrante, social_integrante) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('clientes').doc().set({
        url_foto,
        nombre_integrante,
        escuela_integrante,
        desc_integrante,
        social_integrante
    })
//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('clientes').get();
const getIntegrante = (id) => db.collection('clientes').doc(id).get();
const onGetIntegrantes = (callback) => db.collection('clientes').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('clientes').doc(id).delete();
const editIntegrante = (id) => db.collection('clientes').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('clientes').doc(id).update(updatedIntegrante);

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {
        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {

            const integranteDato = doc.data()
            integranteDato.id = doc.id;

            //Genera un html
            taskContainer.innerHTML += '<div class="tarjeta_Integrante"><div class="img_Integrante"><img src="' + integranteDato.url_foto +
                '" alt="' + integranteDato.url_foto +
                '"></div><h3>' + integranteDato.nombre_integrante +
                '</h3><div class="desc_Integrante"><h4>' + integranteDato.escuela_integrante +
                '</h4><p>' + integranteDato.desc_integrante +
                '</p><a href="#"><p>' + integranteDato.social_integrante +
                '</p></a></div> <div class="botones_carta"><button class="btn btn-primary btn-delete" data-id="' + integranteDato.id + '">Eliminar</button><button class="btn btn-secundary btn-edit" data-id="' + integranteDato.id + '">Editar</button></div></div>';

            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteIntegrante(e.target.dataset.id)
                })
            })
            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getIntegrante(e.target.dataset.id);
                    const integrante = doc.data();

                    editStatus = true;
                    id = doc.id;

                    taskForm['llenar_foto'].value = integrante.url_foto;
                    taskForm['llenar_nombre'].value = integrante.nombre_integrante;
                    taskForm['llenar_escuela'].value = integrante.escuela_integrante;
                    taskForm['llenar_desc'].value = integrante.desc_integrante;
                    taskForm['llenar_social'].value = integrante.social_integrante;

                    //Boton de actualizar info (No Tocar)
                    taskForm['subir_registro'].innerText = 'Update';
                })
            })
        })

    })

});

//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const url_foto = taskForm['llenar_foto'].value;
    const nombre_integrante = taskForm['llenar_nombre'].value;
    const escuela_integrante = taskForm['llenar_escuela'].value;
    const desc_integrante = taskForm['llenar_desc'].value;
    const social_integrante = taskForm['llenar_social'].value;

    if (!editStatus) {
        await saveIntegrantes(url_foto, nombre_integrante, escuela_integrante, desc_integrante, social_integrante);
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

    getIntegrantes();
    taskForm.reset();


    //console.log(url_foto, nombre_integrante);
})