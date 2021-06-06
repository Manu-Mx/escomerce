
const db = firebase.firestore();
const form = document.getElementById('form_login');
let op = false;
var idCliente;
var email;
var password;
var estadoCuentaf;
/*const taskForm = document.getElementById('form_login');*/

form.addEventListener('input', async (e) => {
    db.collection("clientes").where("emailCliente", "==", document.getElementById('emailCliente').value)
        .where("passwordCliente", "==", document.getElementById('passwordCliente').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                idCliente = doc.id;
                console.log(idCliente);
                sessionStorage.setItem('estadoCuenta', true);
                estadoCuentaf = sessionStorage.getItem('estadoCuenta');
                console.log(estadoCuentaf/*sessionStorage.getItem('estadoCuenta')*/);
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

function login() {

    if (estadoCuentaf == 'true') {
        document.getElementById('login_header').innerHTML = "Cerrar Sesión";
        sessionStorage.setItem('idCliente', idCliente);
        window.location = './catalogo.html';
    } else {
        console.log("datos de ingreso incorrectos");
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
