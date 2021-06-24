//let idCliente = sessionStorage.getItem('idCliente');
//console.log(idCliente);

const fecha = new Date();
const añoActual = fecha.getFullYear();
const hoy = fecha.getDate();
const mesActual = fecha.getMonth() + 1;

var tabla = document.getElementById('compras');

db.collection("pedido").where("idUsuario", "==",sessionStorage.getItem('idCliente'))
.get()
.then((querySnapshot) => {

    tabla.innerHTML = '';
    
    querySnapshot.forEach((doc) => {

        const infoD = doc.data()
        infoD.id = doc.id;

        localStorage.setItem("idPed",infoD.id);
        //infoD.DatosPedido.forEach((datos) => {
        tabla.innerHTML += `
        <div class="items">
            <div class="product">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-3">
                        <div class="product-image">
                            <img class="img-fluid d-block mx-auto image" src="assets/img/paquete.png">
                        </div>
                    </div>
                    <div class="col-md-5 product-info">
                        <div>
                            <span>
                                ID Pedido:&nbsp;
                                <span class="value">
                                    ${infoD.id}
                                </span>
                            </span>
                        </div>
                        <br>
                        <div>
                            <span>
                                Fecha de Compra:&nbsp;
                                <span class="value">
                                    ${hoy}/${mesActual}/${añoActual}
                                </span>
                            </span>
                        </div>
                        <br>
                        <div>
                            <span>
                                Fecha de llegada: 
                                <span class="value">
                                    Pendiente
                                </span>
                            </span>
                        </div>
                        <br>
                        <a class="product-name" href="ticket.html" style="color: rgb(13,136,208);">
                            Detalles del Pedido
                        </a>
                    </div>
                
                    <div class="col-6 col-md-2 quantity">
                        <label class="form-label d-none d-md-block" for="quantity">
                            Total de la compra
                        </label>
                        <span>
                            $${infoD.pagoTotal}
                        </span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">
                            Volver a comprar
                        </button>
                    </div>
                </div>    
            </div>
        </div>`;
        //})
    })
})
.catch((error) => {
        console.log("Error getting documents: ", error);
});