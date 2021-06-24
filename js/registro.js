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
var tipoCuenta = false;
var direcciones = [calle, numeroExterior, numeroInterior, colonia, alcaldia, CP, referencias];
var direccion;
var urlINE;
var urlComprobante;
var clabe;
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
const saveVendedor = (nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCuenta, ineVendedor, comprobanteVendedor, clabeVendedor) =>
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
        tipoCuenta,
        ineVendedor,
        comprobanteVendedor,
        clabeVendedor
    })
    const saveClientes = (nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCuenta) =>
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
        tipoCuenta
    })

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (taskForm['llenar_password_cliente'].value == taskForm['llenar_confirmar_password_cliente'].value) {
        if (correoRegistrado == true) {
            mensajeAdvertencia('Este correo ya esta registrado');
            return;
        } if (boletaRegistrado == true) {
            mensajeAdvertencia('Esta boleta ya esta registrada');
            return;
        } if (correoRegistrado == false && boletaRegistrado == false) {
            if (document.getElementById("checkVendedorRegistro").checked) {
                password2 = taskForm['llenar_confirmar_password_cliente'].value;
                nombreCliente = taskForm['llenar_nombre_cliente'].value.toUpperCase();
                apCliente = taskForm['llenar_a_paterno_cliente'].value.toUpperCase();
                amCliente = taskForm['llenar_a_materno_cliente'].value.toUpperCase();
                boletaCliente = Number(taskForm['llenar_boleta_cliente'].value);
                emailCliente = taskForm['llenar_email_cliente'].value.toLowerCase();
                passwordCliente = taskForm['llenar_password_cliente'].value;
                escuelaCliente = taskForm['llenar_escuela_cliente'].value;
                telCliente = Number(taskForm['llenar_telefono_cliente'].value);
                tipoCuenta = true;
                await subirINE();
                await subirComprobante();
                urlINE = sessionStorage.getItem('urlINE');
                urlComprobante = sessionStorage.getItem('urlComprobante');
                clabe = Number(taskForm['llenar_clabe'].value);
                console.log(urlINE); 
                await saveVendedor(nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCuenta, sessionStorage.getItem('urlINE'), sessionStorage.getItem('urlComprobante'), clabe);
                //sessionStorage.removeItem('urlINE');
                //sessionStorage.removeItem('urlComprobante');
                await mensajeDeExito('Registro exitoso', './login.html');
                //function redireccionar() { location.href = "./login.html"; }
                //setTimeout(redireccionar(), 35000);

            } else {
                password2 = taskForm['llenar_confirmar_password_cliente'].value;
                nombreCliente = taskForm['llenar_nombre_cliente'].value.toUpperCase();
                apCliente = taskForm['llenar_a_paterno_cliente'].value.toUpperCase();
                amCliente = taskForm['llenar_a_materno_cliente'].value.toUpperCase();
                boletaCliente = Number(taskForm['llenar_boleta_cliente'].value);
                emailCliente = taskForm['llenar_email_cliente'].value.toLowerCase();
                passwordCliente = taskForm['llenar_password_cliente'].value;
                escuelaCliente = taskForm['llenar_escuela_cliente'].value;
                telCliente = Number(taskForm['llenar_telefono_cliente'].value);
                tipoCuenta = false;
                console.log(nombreCliente);
                await saveClientes(nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente, tipoCuenta);
                await mensajeDeExito('Registro exitoso', './login.html');
            }
        }
    } else {
        mensajeAdvertencia("Las contraseñas no coinciden");
        return;
    }
});

taskForm.addEventListener('input', async (e) => {
    correoRegistrado = false;
    boletaRegistrado = false;
    db.collection("clientes").where("emailCliente", "==", document.getElementById('llenar_email_cliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                correoRegistrado = true;
            })
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        })

    db.collection("clientes").where("boletaCliente", "==", document.getElementById('llenar_boleta_cliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                boletaRegistrado = true;
                console.log("boleta estado" + boletaRegistrado);
            })
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        })
});

subirComprobante = function () {
    var comprobante = document.getElementById("llenar_comprobante_domicilio").files[0];
    if(!comprobante){
        return;
    }else{
    //var file = document.getElementById("llenar_ine").files[0];
    console.log(comprobante.name);
    var storageRef = defaultStorage.ref('/documentsValidacionVendedor/'+boletaCliente+'/'+comprobante.name);
    var uploadTask = storageRef.put(comprobante);
    uploadTask.on('state-changed', function(snapshot) {

    }, function (error) {
        console.log(error)
    }, function (){
        storageRef.getDownloadURL().then((url) =>{
            sessionStorage.setItem('urlComprobante', url);
        });
    });
}
};
subirINE = function () {
    var ine = document.getElementById("llenar_ine").files[0];
    if(!ine){
        return;
    }else{
    //var file = document.getElementById("llenar_ine").files[0];
    console.log(ine.name);
    var storageRef = defaultStorage.ref('/documentsValidacionVendedor/'+boletaCliente+'/'+ ine.name);
    var uploadTask = storageRef.put(ine);
    uploadTask.on('state-changed', function(snapshot) {

    }, function (error) {
        console.log(error)
    }, function (){
        storageRef.getDownloadURL().then((url) =>{
            sessionStorage.setItem('urlINE', url);
                setTimeout(8000);
        });
        console.log(urlINE);
    });
}
};

