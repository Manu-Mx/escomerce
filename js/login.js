
const db = firebase.firestore();
const form = document.getElementById('form_login');
let op = false;
var idCliente;
var email;
var password;
/*const taskForm = document.getElementById('form_login');*/

form.addEventListener('keyup', async (e) => {
    sessionStorage.setItem('estadoCuenta', false);
    db.collection("clientes").where("emailCliente", "==", document.getElementById('emailCliente').value)
        .where("passwordCliente", "==", document.getElementById('passwordCliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                idCliente = doc.id;
                console.log('hola');
                sessionStorage.setItem('estadoCuenta', true);
                console.log(sessionStorage.getItem('estadoCuenta'));
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});


document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    login();
});

async function login() {

    if (sessionStorage.getItem('estadoCuenta') == 'true') {
        sessionStorage.setItem('idCliente', idCliente);
        mensajeDeExito('Inicio de sesion exitoso', './catalogo.html');
    } else {
       mensajeAdvertencia( 'Los datos que ingreso son incorrectos' );
       return;
    }

}

/*document.getElementById('login_header').addEventListener('click', async (estadoCuenta) => {
    e.preventDefault();
    if (estadoCuenta == false) {
        document.getElementById('login_header').innerHTML = "iniciar sesión/registrarse";
        window.location = './login.html'
        return idCliente;
    } else {
        document.getElementById('login_header').innerHTML = "Cerrar Sesión";
        estadoCuenta = false;
    }
})*/
