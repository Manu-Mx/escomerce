var db = firebase.firestore();

/*db.collection("pedido").get().set({
    cantidad,
    condicion,
    fecha_compra,
    fecha_entrega,
    id_cliente,
    id_producto,
    imagen,
    nombre,
    numero_tarjeta,
    precio_unitario,
    total_pagar
})

.then(function(docRef){
   console.log("Document written with ID: ", docRef.id);
})
.catch(function (error) {
    console.error("Error adding document: ", error);
})*/
//Leer documentos

var tabla = document.getElementById('compras');
db.collection("pedido").get().then((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
       tabla.innerHTML += `
                                    <div class="items">
                                        <div class="product">
                                            <div class="row justify-content-center align-items-center">
                                                <div class="col-md-3">
                                                    <div class="product-image"><img class="img-fluid d-block mx-auto image" src=${doc.data().imagen}></div>
                                                </div>
                                                <div class="col-md-5 product-info">
                                                    <div><span>ID de compra:&nbsp;${doc.id}</span><br><span>Fecha de compra:&nbsp;${doc.data().fecha_compra}</span><br><span class="value">Fecha de llegada:&nbsp;${doc.data().fecha_entrega}</span></div><br><a class="product-name" href="#" style="color: rgb(13,136,208);">${doc.data().nombre}</a>
                                                    <div class="product-specs">
                                                    <div><span>Detalles:&nbsp;</span><span class="value"></span></div><a href="#" class="product-name">Direccion de Envio</a><br><a href="#" class="product-name">Metodo de Pago</a>
                                                        <div><span>Vendedor:&nbsp;</span><a class="product-name" href="#">david</a></span></div>
                                                        <div><span>Estado de la entrega:&nbsp;</span><span class="value">Entregada</span></div>
                                                        <div><span>Precio por unidad:&nbsp;$</span><span class="value">${doc.data().precio_unitario}</span></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Total de la compra</label><span>$${doc.data().total_pagar}</span></div>
                                                <div class="col"><button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">Volver a comprar</button></div>
                                            </div>                   
          `
    });
});
