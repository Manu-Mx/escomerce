const db = firebase.firestore();

const taskForm = document.getElementById('imp-catalogo');
const imprPedido = document.getElementById('imp-pedido');
const totalPedido = document.getElementById('divTotal');

let carritoOn = false;
let editStatus = false;
let idCarritoBuscar = '';

//Funcion para imprimir la informacion
const onGetCarrito = (callback) => db.collection('Carrito_pedido').onSnapshot(callback);
const onGetPedido = (callback) => db.collection('Confirmar_Pedido').onSnapshot(callback);
db.collection('Confirmar_Pedido');

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {
    onGetCarrito(querySnapshot => {
        querySnapshot.forEach(doc => {
            const consultaCarrito_Pedido = doc.data();
            consultaCarrito_Pedido.id = doc.id;
            //console.log("ID Carrito:"+consultaCarrito_Pedido.idCarritoFinal)
            //console.log("ID Pedido:"+consultaCarrito_Pedido.idPedido)
            idCarritoBuscar = consultaCarrito_Pedido.idCarritoFinal;

        });
        db.collection('Confirmar_Pedido').where('idCarrito', '==', idCarritoBuscar )
            .get().then((querySnapshot) => {
                imprPedido.innerHTML = ''
                querySnapshot.forEach((doc) => {
                    const datosPedido = doc.data();
                    datosPedido.id = doc.id;

                    console.log(doc.id, "=>", doc.data());
                    datosPedido.infoPedido.forEach(datos => {
                        imprPedido.innerHTML += `
                            <div class="item"><span class="price">$ ${datos.costo_producto}</span>
                                <p class="item-name">${datos.nombre_prod}</p>
                                <p class="item-description">Descripcion producto: ${datos.descripcion_prod}</p>
                            </div>`;
                    })
                    totalPedido.innerHTML = '';
                    totalPedido.innerHTML += `<span>Total</span><span class="price">$ ${datosPedido.total_pagado}</span>`;
                    


                })
            }).catch((error) => {
                console.log("Error getting documents:",error)
            })
        //console.log("Tengo el ID: " + idCarritoBuscar)
    })
})
