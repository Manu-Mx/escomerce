const db = firebase.firestore();
const impEstado = document.getElementById("changeStatus");
const imprPedido = document.getElementById("precioProductoStatus")



const impIdPedido = sessionStorage.getItem('idProdPedido');
let idCliente = sessionStorage.getItem('idCliente');

const getDireccion = (id) => db.collection('direcciones').doc(id).get();
const updPedido = (id, estatus_pedido) => db.collection('pedido').doc(id).update(estatus_pedido);

console.log(idCliente)

function verificar(){
    const btnStatus = document.querySelector('input[name="estadoSelect"]:checked').value;
    console.log(btnStatus);
    impEstado.innerHTML = `${btnStatus}`
    const impIdPedido =sessionStorage.getItem('idPedido');
    console.log("idPedido: "+impIdPedido)
    updPedido(impIdPedido, {
        estatus_pedido : btnStatus
    });
    //sessionStorage.setItem('idPedido',datosPedido.id);
}


window.addEventListener('DOMContentLoaded',async (e) => {
    
    db.collection('pedido').where('idUsuario', '==', idCliente)
            .get().then((querySnapshot) => {

                imprPedido.innerHTML = ''
                //totalPedido.innerHTML = '';

                querySnapshot.forEach((doc) => {
                    const impIDTicket = document.getElementById("impIDticket");

                    const datosPedido = doc.data();
                    datosPedido.id = doc.id;
                    impIDTicket.innerHTML=`<p>ID TICKET: ${datosPedido.id} </p>`
                    //Guardamos el id de direccion para hacer la consulta:
                    sessionStorage.setItem('idDireccionPedido',datosPedido.idDireccion);
                    sessionStorage.setItem('idPedido',datosPedido.id);
                    const pedidoConfirmado = []
                    
                    
                    //console.log(doc.id, "=>", doc.data());
                    datosPedido.DatosPedido.forEach(datos => {

                        imprPedido.innerHTML += `
                        <span class="price">$ ${datos.costo_producto}</span>
                            <p class="item-name" id="nombreProductoStatus"><span id="cantidadProductoStatus">${datos.cantidad_prod} | </span>${datos.nombre_prod}&nbsp;</p>`;


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
                    const totalPedido = document.getElementById('impTotal');
                    
                    
                    //totalPedidoEstado.innerHTML=``;
                    //totalPedidoEstado.innerHTML += `<span>Total</span><span class="price">$ ${datosPedido.pagoTotal}</span>`;     
                    totalPedido.innerHTML= ``;
                    totalPedido.innerHTML += `<span>Total</span><span class="price">$ ${datosPedido.pagoTotal}</span>`;                  
                    const ticketEstado = document.getElementById("impEstadoTicket")
                    ticketEstado.innerHTML=""
                    ticketEstado.innerHTML=`<span>Estado actual del pedido</span><span class="price">${datosPedido.estatus_pedido}</span>`
                })

            


            }).catch((error) => {
                console.log("Error getting documents in pedido:", error)
            })


            //Imprimir la direccion
            const impDireccion =sessionStorage.getItem('idDireccionPedido');
            console.log("direccion: "+ impDireccion)
            //consulta el ID de la direccion
            const docDir = await getDireccion(impDireccion);
            const direccion = docDir.data();
            
            const setDireccion = document.getElementById("impDireccion")
            
            setDireccion.innerHTML=""
            setDireccion.innerHTML=`<p class="item-name" style="margin-top: 25px;"><span class="price">${direccion.calle}, # ${direccion.noExt}, ${direccion.colonia} </span>Dirección o UA</p>`

            

})

