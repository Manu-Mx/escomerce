const numCarrito = document.getElementById('cantCarrito');
const getCarrito = (callback) => db.collection('carrito').onSnapshot(callback)
getCarrito((querySnapshot) => {

    querySnapshot.forEach(doc => {
        cantidadCarrito = doc.data()

        console.log(cantidadCarrito.infoProducto.length)
        numCarrito.innerHTML = `
            <span>${cantidadCarrito.infoProducto.length}</span><i class="fa fa-shopping-cart" style="margin-left: 10px;"></i>`
    })
})