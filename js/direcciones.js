const db = firebase.firestore();

const taskForm = document.getElementById('form_direcciones');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveDirecciones = (calle, no_interior, no_exterior, colonia, alcaldia, cp) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('direcciones').doc().set({
        calle, 
        no_interior, 
        no_exterior, 
        colonia, 
        alcaldia, 
        cp
    })

//Funcion para imprimir la informacion
const getDirecciones = () => db.collection('direcciones').get();
const getDireccione = (id) => db.collection('direcciones').doc(id).get();
const onGetDirecciones = (callback) => db.collection('direcciones').onSnapshot(callback);
const deleteDirecccione = (id) => db.collection('direcciones').doc(id).delete();
const editDireccione = (id) => db.collection('direcciones').doc(id).get();
const updateDireccione = (id, updateddireccione) => db.collection('direcciones').doc(id).update(updateddireccione);

    
//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const calle = taskForm['calle12'].value;
    const no_interior = taskForm['no_interior12'].value;
    const no_exterior = taskForm['no_exterior12'].value;
    const colonia = taskForm['colonia12'].value;
    const alcaldia = taskForm['alcaldia12'].value;
    const cp = taskForm['cp12'].value;


    if (!editStatus) {      
    await saveDirecciones(calle, no_interior, no_exterior, colonia, alcaldia, cp);
    console.log("enviado")
    } else {

        await updateDireccione(id, {
            calle, 
            no_interior, 
            no_exterior, 
            colonia, 
            alcaldia, 
            cp
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['Guardar12'].innerText = 'Guardar';


    }
})