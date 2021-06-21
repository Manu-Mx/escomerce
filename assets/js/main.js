/*Codigos de los modales*/
/*
window.onload = function() {
    document.getElementById('divDireccion').style.display = 'none';
};
*/
/*Modal para agregar una direccion de compra*/
var modalDireccion = document.getElementById('modalDireccion')
var btnAgregarDireccionCompra = document.getElementById('btnAgregarDireccionCompra')
/*
modalDireccion.addEventListener('shown.bs.modal', function() {
    btnAgregarDireccionCompra.focus()
})
*/
/*modal para recuperar contraseña*/
var modalOlvidastePassword = document.getElementById('modalOlvidastePassword')
var linkOlvidastePassword = document.getElementById('linkOlvidastePassword')
/*
modalOlvidastePassword.addEventListener('shown.bs.modal', function() {
    linkOlvidastePassword.focus()
})
*/
/*Modal para agregar o modificar productos a la venta*/
var modalProductosProveedor = document.getElementById('modalProductosProveedor')
var btnEditarProductos = document.getElementById('btnEditarProductos')
/*
modalProductosProveedor.addEventListener('shown.bs.modal', function() {
    btnEditarProductos.focus()
})
*/
/*Modal para editar tarjetas*/
var modalEditarTarjeta = document.getElementById('modalEditarTarjeta')
var btnEditarTarjeta = document.getElementById('btnEditarTarjeta')
/*
modalEditarTarjeta.addEventListener('shown.bs.modal', function() {
    btnEditarTarjeta.focus()
})
*/
/*modal para editar direcciones*/

var modalDireccionEdit = document.getElementById('modalDireccionEdit')
var btnEditarDireccion = document.getElementById('btnEditarDireccion')
/*
modalDireccionEdit.addEventListener('shown.bs.modal', function() {
    btnEditarDireccion.focus()
})
*/
/*Funciones para abrir páginas desde botones*/
function verCarrito() {
    window.location = "./carrito.html";
}

function registrate() {
    window.location = "./registro.html";
}

function inicio() {
    window.location = "./index.html";
}

function catalogo() {
    window.location = "./catalogo.html";
}

function realizarPedido() {
    window.location = "./realizarPedido.html";
}

function verProducto() {
    window.location = "./descripcionProducto.html";
}
/*Funciones que muestran opciones  dependiendo el boton seleccionado*/
function showMetodoEntregaUA() {
    element = document.getElementById("divUnidadAcademica");
    element1 = document.getElementById("divDireccion");
    element.style.display = 'block';
    element1.style.display = 'none';
}

function showMetodoEntregaDireccion() {
    element = document.getElementById("divUnidadAcademica");
    element1 = document.getElementById("divDireccion");
    element.style.display = 'none';
    element1.style.display = 'block';
}

function showQuieroVender() {
    element = document.getElementById("opcionesQuieroVender");
    check = document.getElementById("checkVendedorRegistro");
    if (check.checked) {
        element.style.display = 'block';
        document.getElementById('llenar_ine').setAttribute("required", "");
        document.getElementById('llenar_comprobante_domicilio').setAttribute("required", "");
        document.getElementById('llenar_clabe').setAttribute("required", "");
    } else {
        element.style.display = 'none';
        document.getElementById('llenar_ine').removeAttribute("required");
        document.getElementById('llenar_comprobante_domicilio').removeAttribute("required");
        document.getElementById('llenar_clabe').removeAttribute("required");
    }
}

async function logout() {
    document.addEventListener('DOMContentLoaded', async (e) => {
        e.preventDefault();
        if (sessionStorage.getItem('estadoCuenta') == 'true') {
            document.getElementById('login_header').innerHTML = '<a href="./perfilUsuario.html"><i class="la la-user"></i></a>'+
            '<a href="login.html" style="font-family: Montserrat, sans-serif;"> cerrar sesión </a>';
            document.getElementById('login_header').addEventListener('click', function () {
                sessionStorage.removeItem('idCliente');
                sessionStorage.setItem('estadoCuenta', false);
            });

        } else {
            
            document.getElementById('login_header').innerHTML = '<a href="login.html" style="font-family: Montserrat, sans-serif;"> iniciar sesión/registrarse </a>';
            document.getElementById('login_header').addEventListener('click', function () {
                window.location = './login.html';
            });
        }
    })
}

addEventListener('DOMContentLoaded', logout());

async function numCar() {

    db.collection("carrito").where("idCliente", "==", sessionStorage.getItem('idCliente'))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const cantidadCarrito = doc.data()
                console.log(cantidadCarrito.infoProducto.length);
                document.getElementById('numCart').innerHTML = cantidadCarrito.infoProducto.length;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
}

addEventListener('click', numCar());
