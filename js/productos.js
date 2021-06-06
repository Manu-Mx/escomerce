const db = firebase.firestore();

const taskForm = document.getElementById('form_datos_prod');
const taskContainer = document.getElementById('printIntegrantes');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveIntegrantes = (nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('producto').doc().set({
        nombre_prod,
        desc_prod,
        cant_prod,
        prec_prod,
        cond_prod,
        url_prod,
        calif_prod,
        cat_prod
    }) 
    
//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('producto').get();
const getIntegrante = (id) => db.collection('producto').doc(id).get();
const onGetIntegrantes = (callback) => db.collection('producto').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('producto').doc(id).delete();
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {
        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {
            
            const infoDato = doc.data()
            infoDato.id = doc.id;
            console.log(infoDato);
            /*Genera un html
            taskContainer.innerHTML += '<div class="tarjeta_Integrante"><div class="img_Integrante"><img src="' + integranteDato.url_foto +
                '" alt="' + integranteDato.url_foto +
                '"></div><h3>' + integranteDato.nombre_integrante +
                '</h3><div class="desc_Integrante"><h4>' + integranteDato.escuela_integrante +
                '</h4><p>' + integranteDato.desc_integrante +
                '</p><a href="#"><p>' + integranteDato.social_integrante +
                '</p></a></div> <div class="botones_carta"><button class="btn btn-primary btn-delete" data-id="' + integranteDato.id + '">Eliminar</button><button class="btn btn-secundary btn-edit" data-id="' + integranteDato.id + '">Editar</button></div></div>';
*/
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
                    const datoActualizar = doc.data();

                    editStatus = true;
                    id = doc.id;
                    taskForm['nombre_producto'].value = datoActualizar.nombre_prod;
                    taskForm['desc_producto'].value = datoActualizar.desc_prod;
                    taskForm['cantidad_producto'].value = datoActualizar.cant_prod;
                    taskForm['precio_producto'].value = datoActualizar.prec_prod;
                    taskForm['condicion_producto'].value = datoActualizar.cond_prod;
                    taskForm['foto_producto'].value = datoActualizar.url_prod;
                    taskForm['calif_producto'].value = datoActualizar.calif_prod
                    taskForm['categoria_producto'].value = datoActualizar.cat_prod;
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

    const nombre_prod = taskForm['nombre_producto'].value;
    const desc_prod = taskForm['desc_producto'].value;
    const cant_prod = Number(taskForm['cantidad_producto'].value);
    const prec_prod = Number(taskForm['precio_producto'].value);
    const cond_prod = taskForm['condicion_producto'].value;
    const url_prod = taskForm['foto_producto'].value;
    const calif_prod = Number(taskForm['calif_producto'].value);
    const cat_prod = taskForm['categoria_producto'].value;

    if (!editStatus) {
        await saveIntegrantes(nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod);
    } else {

        await updateIntegrante(id, {
            nombre_prod,
            desc_prod,
            cant_prod,
            prec_prod,
            cond_prod,
            url_prod,
            calif_prod,
            cat_prod
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['subir_registro'].innerText = 'Guardar';

    }
    getIntegrantes();
    taskForm.reset();
    //console.log(url_foto, nombre_integrante);
})