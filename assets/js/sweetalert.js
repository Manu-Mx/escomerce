function mensajeAdvertencia ( mensaje ) {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: mensaje,
        showConfirmButton: false,
        timer: 1000
    })
}

function mensajeDeExito(mensaje, redireccion) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 2500
    }).then(async function () {
        window.location = redireccion;
    })
}

function mensajeDeExitoS(mensaje) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 2500
    })
}

function agregadoAlCarrito() {
    Swal.fire({
        title: 'Agregado al carrito',
        width: 600,
        padding: '3em',
        background: 'rgba(255,255,255,0.9)',
        backdrop: `
          rgba(255,255,255,0.9)
          url("./assets/img/carrito2.gif")
         center -150px
          no-repeat
        `,
        timer: 1000,
        showConfirmButton: false
    })
}

 function procesandoPago() {
    Swal.fire({
        title: 'Procesando pago...',
        width: 600,
        padding: '3em',
        background: 'rgba(255,255,255,0.9)',
        backdrop: `
        rgba(255,255,255,0.9)
      url("./assets/img/procesandoPago.gif")
      top
      no-repeat
    `,
        timer: 5000,
        showConfirmButton: false
    }).then(()=>{
        pagoExitoso();
    })
}

async function pagoExitoso() {
    Swal.fire({
        title: 'Compra finalizada',
        width: 600,
        padding: '3em',
        background: 'rgba(255,255,255,0.9)',
        backdrop: `
          rgba(255,255,255,0.9)
          url("./assets/img/success.gif")
         center 50px
          no-repeat
        `,
        timer: 2000,
        showConfirmButton: false
    }).then(async function () {
        window.location = "./catalogo.html";
    })
}