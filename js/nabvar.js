const numCarrito = document.getElementById('navcol-1');
const getCarrito = (callback) => db.collection('carrito').onSnapshot(callback)
getCarrito((querySnapshot) => {

    querySnapshot.forEach(doc => {
        cantidadCarrito = doc.data()

        console.log(cantidadCarrito.infoProducto.length)
        numCarrito.innerHTML = `
        <ul class="navbar-nav d-flex align-items-center align-content-center ms-auto">
                <li class="nav-item"></li>
                <li class="nav-item"><a class="nav-link active" href="catalogo.html">catalogo</a></li>
                <li class="nav-item d-flex flex-row-reverse"><button class="btn btn-primary" type="button" style="background: rgb(13,136,208);border-radius: 10px;border-top-right-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;font-family: Montserrat, sans-serif;"
                        onclick="verCarrito()"><span>${cantidadCarrito.infoProducto.length}</span><i class="fa fa-shopping-cart" style="margin-left: 10px;"></i></button></li>
                <li class="nav-item d-flex flex-row-reverse">
                    <div class="d-flex flex-column-reverse">
                        <div>
                            <div class="input-group"><input class="form-control" type="text" style="border-color: RGB(13,136,208);border-top-left-radius: 10px;border-bottom-left-radius: 10px;width: 190px;"><button class="btn btn-primary" type="button" style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;background: rgb(13,136,208);"><i class="fa fa-search" style="width: 80%;"></i></button></div>
                        </div>
                        <div class="d-flex flex-row-reverse justify-content-around"><a href="./perfilUsuario.html"><i class="la la-user"></i></a><a id="login_header" href="login.html" style="font-family: Montserrat, sans-serif;">Cerrar Sesión</a></div>
                    </div>
                </li>
            </ul>`
    })
})