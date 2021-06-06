const db = firebase.firestore();
const taskForm = document.getElementById('form_registro');

//import {logout} from 'login';
//variables para verificar registro
var correoRegistrado = false;
var boletaRegistrado = false;
//variables datos cliente
var nombreCliente;
var apCliente;
var amCliente;
var boletaCliente;
var emailCliente;
var passwordCliente;
var password2;
var escuelaCliente;
var telCliente;
var ineCliente;
var tipoCliente = false;
var direcciones = [calle, numeroExterior, numeroInterior, colonia, alcaldia, CP, referencias];
var direccion;
//variables direccion cliente
var calle;
var numeroExterior;
var numeroInterior;
var colonia;
var alcaldia;
var CP;
var referencias;
/*const checkDireccion = document.getElementById('checkDireccion');*/
let idDireccion;

//addEventListener('DOMContentLoaded', logout());

//Funcion para guardar los clientes
const saveClientes = (nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCliente/*, ineCliente, direcciones*/) =>
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
        telCliente,
        tipoCliente/*,
        ineCliente,
        direcciones*/
    })

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (passwordCliente == password2) {
        if (correoRegistrado == true) {
            alert("el correo ya esta registrado");
            correoRegistrado = false;
            return;
        } if (boletaRegistrado == true) {
            alert("la boleta ya esta registrado")
            boletaRegistrado = false;
            return;
        } if (correoRegistrado == false && boletaRegistrado == false) {
            console.log("correo electronico");
            password2 = taskForm['llenar_confirmar_password_cliente'].value;
            nombreCliente = taskForm['llenar_nombre_cliente'].value.toUpperCase();
            apCliente = taskForm['llenar_a_paterno_cliente'].value.toUpperCase();
            amCliente = taskForm['llenar_a_materno_cliente'].value.toUpperCase();
            boletaCliente = Number(taskForm['llenar_boleta_cliente'].value);
            emailCliente = taskForm['llenar_email_cliente'].value.toLowerCase();
            passwordCliente = taskForm['llenar_password_cliente'].value;
            escuelaCliente = taskForm['llenar_escuela_cliente'].value;
            telCliente = Number(taskForm['llenar_telefono_cliente'].value);
            console.log(nombreCliente);
            await saveClientes(nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCliente/*, direcciones*/);
            alert("registro exitoso")
            document.getElementById('form_registro').submit();
            window.location = './login.html';
        }
    } else {
        alert("Las contraseñas no coinciden");
        return;
    }
});


taskForm.addEventListener('input', async (e) => {
    db.collection("clientes").where("emailCliente", "==", document.getElementById('llenar_email_cliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                correoRegistrado = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })

    db.collection("clientes").where("boletaCliente", "==", document.getElementById('llenar_boleta_cliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                boletaRegistrado = true;
                console.log("boleta estado" + boletaRegistrado);
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});


/*const saveDireccion = (calle, numeroExterior, numeroInterior, colonia, alcaldia, CP, referencias) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('direcciones').doc().set({
        calle,
        numeroExterior,
        numeroInterior,
        colonia,
        alcaldia,
        CP,
        referencias
    });*/


//funcion para guardar una direccion
/*taskForm.addEventListener('input', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    calle = taskForm['calle'].value;
    numeroExterior = taskForm['numExt'].value;
    numeroInterior = taskForm['numInt'].value;
    colonia = taskForm['colonia'].value;
    alcaldia = taskForm['alcaldia'].value;
    CP = taskForm['cp'].value;
    referencias = taskForm['referencias'].value;
    direccion = [calle, numeroExterior, numeroInterior, colonia, alcaldia, CP, referencias];
})*/
