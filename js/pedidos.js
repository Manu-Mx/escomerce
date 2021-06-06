const db = firebase.firestore();

const imprPedido = document.getElementById('imp-pedido');
const totalPedido = document.getElementById('divTotal');
const taskForm = document.getElementById('form_metodoPago');

let carritoOn = false;
let idCarritoBuscar = ''
let productosConfirmados = [];
let idUsuario = ''
//Funcion para imprimir la informacion
const onGetCarrito = (callback) => db.collection('carrito').onSnapshot(callback);
const onGetPedido = (callback) => db.collection('Confirmar_Pedido').onSnapshot(callback);
db.collection('Confirmar_Pedido');

const addPedido = (idPedido, idUsuario, DatosPedido, pagoTotal) => db.collection('pedido').doc().set({
    idPedido,
    idUsuario,
    DatosPedido,
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
            console.log("ID: "+consultaCarrito_Pedido.id)
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
                    idUsuario = datosPedido.idCliente;
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
                        
                        console.log(datosPedido.id,idUsuario, pedidoConfirmado, datosPedido.total_pagado);
                        
                        await addPedido(datosPedido.id,idUsuario, pedidoConfirmado, datosPedido.total_pagado);
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

