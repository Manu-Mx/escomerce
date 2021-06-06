const db = firebase.firestore();

const taskForm = document.getElementById('form_registro');
const taskContainer = document.getElementById('printclientes');

let editStatus = false;
let id = 'dcphNe6TVdMqaJGr2bJf';

//Funcion para guardar la informacion en la base de datos
const saveclientes = (nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('clientes').doc().set({ 
        nombreCliente,
        apCliente,
        amCliente,
        boletaCliente,
        emailCliente,
        passwordCliente,
        escuelaCliente,
        telCliente
    })

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetclientes((querySnapshot) => {
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

//Funcion para imprimir la informacion
const getclientes = () => db.collection('clientes').get();
const getcliente = (id) => db.collection('clientes').doc(id).get();
const onGetclientes = (callback) => db.collection('clientes').onSnapshot(callback);
const deleteclientes = (id) => db.collection('clientes').doc(id).delete();
const editclientes = (id) => db.collection('clientes').doc(id).get();
const updateclientes = (id, updatedclientes) => db.collection('clientes').doc(id).update(updatedclientes);

//función para validar chekbox
var checkbox = document.getElementById('vendedor12');

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
       var verdadero = new Boolean(true);
    }
});

//función para valdiad contraseña
if (contraseña_cuenta12 != contraseña_cuenta42) 
    {
    alert("Las passwords deben de coincidir");
    return false;
  }
   else 
  {
    return true;  
}

            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getcliente(e.target.dataset.id);
                    const clientes = doc.data();
                
                    editStatus = true;
                    id = doc.id;
                    taskForm['nombre_usa12'].value = clientes.nombreCliente;
                    taskForm['a_paterno12'].value = clientes.apCliente;
                    taskForm['a_materno12'].value = clientes.amCliente;
                    taskForm['no_boleta_empleado12'].value = clientes.boletaCliente;
                    taskForm['correo_cuenta12'].value = clientes.emailCliente;
                    taskForm['contraseña_cuenta12'].value = clientes.passwordCliente;
                    taskForm['escuela_procedencia12'].value = clientes.escuelaCliente;
                    taskForm['telefono_10dig12'].value = clientes.telCliente;

                    //Boton de actualizar info (No Tocar)
                    taskForm['actualizar_datos'].innerText = 'Update';
                })
            })
//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const nombreCliente = taskForm['nombre_usa12'].value;
    const apCliente = taskForm['a_paterno12'].value;
    const amCliente = taskForm['a_materno12'].value;
    const boletaCliente = taskForm['no_boleta_empleado12'].value;
    const emailCliente = taskForm['correo_cuenta12'].value;
    const passwordCliente = taskFormcontraseña_cuenta12value;
    const escuelaCliente = taskForm['escuela_procedencia12'].value;
    const telCliente = taskForm['telefono_10dig12'].value;

    if (!editStatus) {
        await saveclientes(url_foto, nombre_integrante, escuela_integrante, desc_integrante, social_integrante);
    } else {

        await updateclientes(id, {
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