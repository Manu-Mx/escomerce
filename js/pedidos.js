const db = firebase.firestore();

const imprPedido = document.getElementById('imp-pedido');
const totalPedido = document.getElementById('divTotal');
const taskForm = document.getElementById('form_metodoPago');
const btnEfectivo = document.getElementById('btn-pagarEfectivo')

let carritoOn = false;
let idCarritoBuscar = ''
let productosConfirmados = [];
let idUsuario = sessionStorage.getItem('idCliente');
let idCarrito = idUsuario + "1";
//Funcion para imprimir la informacion
const onGetCarrito = (callback) => db.collection('carrito').onSnapshot(callback);
const onGetPedido = (callback) => db.collection('Confirmar_Pedido').onSnapshot(callback);
db.collection('Confirmar_Pedido');

const addPedido = (idPedido, idUsuario, DatosPedido, idDireccion,pagoTotal) => db.collection('pedido').doc().set({
    idPedido,
    idUsuario,
    DatosPedido,
    idDireccion,
    pagoTotal
})


//Imprimir


window.addEventListener('DOMContentLoaded', async (e) => {
    onGetCarrito(querySnapshot => {

        querySnapshot.forEach(doc => {
            const consultaCarrito_Pedido = doc.data();
            consultaCarrito_Pedido.id = doc.id;
            //console.log("ID Carrito:"+consultaCarrito_Pedido.id)
            //console.log("ID Pedido:"+consultaCarrito_Pedido.idPedido)
            console.log("ID: " + consultaCarrito_Pedido.id)
            idCarritoBuscar = consultaCarrito_Pedido.id;

        });

        db.collection('Carrito_pedido').where('idCarrito', '==', idCarritoBuscar)
            .get().then((querySnapshot) => {

                imprPedido.innerHTML = ''
                totalPedido.innerHTML = '';

                querySnapshot.forEach((doc) => {

                    const datosPedido = doc.data();
                    datosPedido.id = doc.id;
                    const pedidoConfirmado = []
                    
                    console.log(datosPedido.idCliente)
                    //console.log(doc.id, "=>", doc.data());
                    datosPedido.infoPedido.forEach(datos => {

                        imprPedido.innerHTML += `
                            <div class="item"><span class="price">$ ${datos.costo_producto}</span>
                                <p class="item-name">${datos.nombre_prod}</p>
                                <p class="item-description">Descripcion producto: ${datos.descripcion_prod}</p>
                            </div>`;


                        pedidoConfirmado.push(
                            {
                                id_producto: datos.id_producto,
                                nombre_prod: datos.nombre_prod,
                                descripcion_prod: datos.descripcion_prod,
                                imagen_producto: datos.imagen_producto,
                                cantidad_prod: datos.cantidad_prod,
                                costo_producto: datos.costo_producto,
                            });

                    })
                    totalPedido.innerHTML += `<span>Total</span><span class="price">$ ${datosPedido.total_pagado}</span>`;

                    console.log(pedidoConfirmado)
                    taskForm.addEventListener('submit', async (e) => {

                        console.log(datosPedido.id, idUsuario, pedidoConfirmado, datosPedido.total_pagado);
                        combo = document.getElementById("selectDir");
                        console.log(combo.options);
                        console.log(combo.options[combo.selectedIndex].lastChild.value);
                        const idDireccion = combo.options[combo.selectedIndex].lastChild.value
                        await addPedido(datosPedido.id, idUsuario, pedidoConfirmado,idDireccion, datosPedido.total_pagado);
                         procesandoPago()
                        
                        console.log("Enviado")
                        const borrarCarrito = (id) => db.collection('carrito').doc(id).delete();
                        await borrarCarrito(idCarrito);
                        const borrarCarritoPedido = (id) => db.collection('Carrito_pedido').doc(id).delete();
                        await borrarCarritoPedido(datosPedido.id);
                        function redireccionar() { location.href = "catalogo.html"; }
                        //setTimeout(redireccionar(), 25000);
                    })
                    btnEfectivo.addEventListener('click',async(e)=>{
                        console.log(datosPedido.id, idUsuario, pedidoConfirmado, datosPedido.total_pagado);
                        combo = document.getElementById("selectDir");
                        console.log(combo.options);
                        console.log(combo.options[combo.selectedIndex].lastChild.value);
                        const idDireccion = combo.options[combo.selectedIndex].lastChild.value
                        await addPedido(datosPedido.id, idUsuario, pedidoConfirmado,idDireccion, datosPedido.total_pagado);
                         procesandoPago()
                         const borrarCarrito = (id) => db.collection('carrito').doc(id).delete();
                        await borrarCarrito(idCarrito);
                        const borrarCarritoPedido = (id) => db.collection('Carrito_pedido').doc(id).delete();
                        await borrarCarritoPedido(datosPedido.id);
                        console.log("Enviado")
                        function redireccionar() { location.href = "catalogo.html"; }
                        //setTimeout(redireccionar(), 25000);
                    })

                })

            }).catch((error) => {
                console.log("Error getting documents:", error)
            })
        //console.log("Tengo el ID: " + idCarritoBuscar)
    })
})

