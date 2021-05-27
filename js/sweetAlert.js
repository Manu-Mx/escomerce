function clicEliminar() {
    Swal.fire({
        title: 'Estas seguro que deseas eliminar este producto  ?',
        text: "El proceso no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        //width: '20%',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar.'

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado',
                'success'
            )
        }
    });
}

function esperar() {
    let timerInterval
    Swal.fire({
        title: 'Cargando datos del producto',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
            location.href = 'index.html'
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Finalizado.')
        }
    });
}

function agregarProducto() {

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu producto ha sido publicado',
        showConfirmButton: false,
        timer: 1500
    });
}