const db = firebase.firestore();

const taskContainer = document.getElementById('impr-carrito');
const getPago = document.getElementById('impr-carrito');
const printPago = document.getElementById('pagar-div');
const pagarButton = document.getElementById('pagar-btn');

let carritoOn = false;
let editStatus = false;
let id = '';
//Funcion para guardar la informacion en la base de datos

//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('producto').get();
const getCarrito = (id) => db.collection('carrito').doc(id).get();
const updateCarrito = (id, infoProducto) => db.collection('carrito').doc(id).update({ infoProducto });
const onGetCarritos = (callback) => db.collection('carrito').onSnapshot(callback);
const deleteProductoCarrito = (id, infoProducto) => db.collection('carrito').doc(id).update({ infoProducto });
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);
const onGetProductos = (callback) => db.collection('producto').onSnapshot(callback);
const getProducto = (id) => db.collection('producto').doc(id).get();
const onGetPrecio = (callback) => db.collection('producto').onSnapshot(callback);

const addVerProducto = (idProducto, datosProducto, precioProducto) => db.collection('ver_Producto').doc().set({
    idProducto,
    datosProducto,
    precioProducto
});


//BD DE PEDIDO


const addCarrito_pedido = (idPedido, idCarritoFinal) => db.collection("Carrito_pedido").doc().set({ idPedido, idCarritoFinal });

const addPedido = (idCarrito, idCliente, total_pagado, infoPedido) => db.collection("Carrito_pedido").doc().set({
    idCarrito,
    idCliente,
    total_pagado,
    infoPedido
});

//consulta id producto
const onGetPedido = (callback) => db.collection('Confirmar_Pedido').onSnapshot(callback);
//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetCarritos((querySnapshot) => {

        //Guardamos los precios en este array
        var arrayPrecios = [];
        const infoPedido = [];

        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {

            const infoDato = doc.data()
            //ID CARRITO
            infoDato.id = doc.id;
            //console.log("ID Carrito: " + infoDato.id)
            console.log(infoDato.infoProducto)
            sessionStorage.setItem('IDClientePago', infoDato.idCliente)
            sessionStorage.setItem('IDCarritoPago', infoDato.id)

            infoDato.infoProducto.forEach((datos) => {
                //ID de los Productos
                //console.log(datos.id_prod)

                taskContainer.innerHTML += '<div class="product">' +
                    '<div class="row justify-content-center align-items-center">' +
                    '<div class="col-md-3">' +
                    '<div class="product-image"><img class="img-fluid d-block mx-auto image" src="' + datos.url_prod + '"></div>' +
                    '</div>' +
                    '<div class="col-md-5 product-info"><a data-id="' + datos.id_prod + '" class="product-name btn-desc"  style="color: rgb(13,136,208);">' + datos.nombre_prod + '</a>' +
                    '<div class="product-specs">' +
                    '<div><span>Detalles:&nbsp;</span><span class="value">' + datos.desc_prod + '</span></div>' +
                    '<div></div>' +
                    '<div></div>' +
                    '<div></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="' + datos.id_prod + '" data-id="' + datos.id_prod + '" class="form-control quantity-input valor" min="1" max="' + datos.cant_prod + '"value="' + datos.cant_prod_car + '"></div>' +
                    '<div class="col-6 col-md-2 price"><span>$ ' + datos.prec_prod + '</span></div><div class="d-flex justify-content-around product-name " style="margin-top: 30px; "><button class="btn btn-primary btn-delete" data-id="' + datos.id_prod + '" type="button " style="background: rgb(13,136,208); ">Eliminar</button>' +
                    '</div>' +
                    '</div>';


                let precio = Number(datos.prec_prod);
                const btnDesc = document.querySelectorAll('.btn-desc');

                //Vamos  la vista Descripcion del producto
                btnDesc.forEach(btn => {

                    btn.addEventListener('click', async (e) => {

                        const doc = await getProducto(e.target.dataset.id);
                        const datoVer = doc.data();
                        const idProducto = e.target.dataset.id
                        const precioProducto = datoVer.prec_prod
                        console.log(datoVer)

                        const datosProducto = [{
                            nom_prod: datoVer.nombre_prod,
                            desc_prod: datoVer.desc_prod,
                            cantidad_prod: datoVer.cant_prod,
                            estado_prod: datoVer.cond_prod,
                            foto_prod: datoVer.url_prod,
                            rate_prod: datoVer.calif_prod,
                            categoria_prod: datoVer.cat_prod,
                        }];
                        await addVerProducto(idProducto, datosProducto, precioProducto);
                        function redireccionar() { location.href = "descripcionProducto.html"; }
                        setTimeout(redireccionar(), 25000);

                    })
                })

                //Boton para actualizar la cantidad del producto en el carrito
                const addCantidad = document.querySelectorAll('.valor');

                addCantidad.forEach((valor) => {
                    valor.addEventListener('click', async (e) => {
                        const doc = await getCarrito(infoDato.id);
                        const idCarrito = infoDato.id; //ID del Carrito
                        const actualizarCarrito = (doc.data());
                        //actualizarCarrito.infoProducto //Selecciona todos los productos 
                        const datoCantidad = document.getElementById(e.target.dataset.id)
                        const cant_prod_car = Number(datoCantidad.value);
                        const encontrarDato = actualizarCarrito.infoProducto.find(item => {
                            return item.id_prod === e.target.dataset.id;
                        })

                        const indexModificar = actualizarCarrito.infoProducto.findIndex(item => {
                            return item.id_prod === e.target.dataset.id;
                        })

                        /*
                        console.log("Objeto: ")
                        console.log(infoDato.infoProducto)
                        console.log("Busqueda: ")
                        console.log("Indice: "+ indexModificar + " : " + encontrarDato.nombre_prod)
                        */

                        var DBproduc = db.collection("producto");
                        //Consulta en firebase para conseguir nombre del producto 
                        DBproduc.where("nombre_prod", "==", encontrarDato.nombre_prod).get()
                            .then((querySnapshot) => {

                                querySnapshot.forEach((doc) => {

                                    //Aqui validamos si el ID del producto coincide con el ID del producto en el carrito
                                    datoOficial = doc.data()

                                    if (doc.id == encontrarDato.id_prod) {
                                        const prec_prod = Number(cant_prod_car * datoOficial.prec_prod);
                                        //console.log(doc.id, " => ", prec_prod);
                                        //Valida que la cantidad esté dentro del rango
                                        //console.log(indexModificar + "Consulta Antes: ")
                                        const datosProducto = {
                                            nombre_prod: encontrarDato.nombre_prod,
                                            desc_prod: encontrarDato.desc_prod,
                                            cant_prod: encontrarDato.cant_prod,
                                            prec_prod: prec_prod,
                                            cond_prod: encontrarDato.cond_prod,
                                            url_prod: encontrarDato.url_prod,
                                            calif_prod: encontrarDato.calif_prod,
                                            cat_prod: encontrarDato.cat_prod,
                                            id_prod: encontrarDato.id_prod,
                                            cant_prod_car: cant_prod_car
                                        }
                                        //console.log(actualizarCarrito.infoProducto)
                                        const modificarDato = actualizarCarrito.infoProducto.splice(indexModificar, 1, datosProducto)
                                        //console.log(indexModificar +"Consulta Despues: ")
                                        //console.log(actualizarCarrito.infoProducto)

                                        updateCarrito(idCarrito, actualizarCarrito.infoProducto)
                                        console.log('Enviado')
                                    }

                                });

                            })
                            .catch((error) => {
                                console.log("Error getting documents: ", error);
                            });
                    })
                })

                //BOTON eliminar producto especific
                //console.log(arrayPrecios);
                const btnDelete = document.querySelectorAll('.btn-delete');
                //console.log(btnDelete)
                btnDelete.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        //console.log("ID a ELIMINAR: " + e.target.dataset.id)
                        const idCarrito = infoDato.id; //ID del Carrito
                        const actualizarCarrito = (doc.data());
                        //actualizarCarrito.infoProducto //Selecciona todos los productos 
                        //Buscamos el objeto a eliminar
                        const buscarDato = actualizarCarrito.infoProducto.find(item => {
                            return item.id_prod === e.target.dataset.id;
                        })
                        //Indice del objeto a eliminar
                        const indexEliminar = actualizarCarrito.infoProducto.findIndex(item => {
                            return item.id_prod === e.target.dataset.id;
                        })
                        //Comprobamos si ese es el objeto a eliminar
                        //console.log("Eliminar indice:" + indexEliminar + " Nombre del objeto: " +buscarDato.nombre_prod)
                        console.log("Antes:")
                        console.log(actualizarCarrito.infoProducto)

                        //Eliminamos el objeto especifico del carrito
                        const eliminarProducto = actualizarCarrito.infoProducto.splice(indexEliminar, 1);
                        console.log("Despues:")
                        console.log(actualizarCarrito.infoProducto)
                        await deleteProductoCarrito(idCarrito, actualizarCarrito.infoProducto);
                    })
                })

                arrayPrecios.push(precio);
                infoPedido.push(
                    {
                        id_producto: datos.id_prod,
                        nombre_prod: datos.nombre_prod,
                        descripcion_prod: datos.desc_prod,
                        imagen_producto: datos.url_prod,
                        cantidad_prod: datos.cant_prod_car,
                        costo_producto: datos.prec_prod,
                    });
            })
        })

        //Aquí agregamos la suma total de los productos
        var sumaPago = 0;
        var descDevolucion = 0;
        var costoEnvio = 0;
        var total_pagado = 0;



        for (var i = 0; i < arrayPrecios.length; i++) {
            sumaPago += arrayPrecios[i];
        }

        total_pagado = sumaPago + descDevolucion + costoEnvio;

        printPago.innerHTML = '<div class="summary" style="background: url(&quot;https://cdn.bootstrapstudio.io/placeholders/1400x800.png&quot;);">' +
            '<h3 style="color: rgb(13,136,208);">Resumen</h3>' +
            '<h4><span class="text">Subtotal</span><span class="price">$ ' + sumaPago + '</span></h4>' +
            '<h4><span class="text">Descuento</span><span class="price">$ ' + descDevolucion + '</span></h4>' +
            '<h4><span class="text">Costo de envío</span><span class="price">$ ' + costoEnvio + '</span></h4>' +
            '<h4><span class="text" style="color: rgb(13,136,208);">Total</span><span class="price" style="color: rgb(13,136,208);">$ ' + total_pagado + '</span></h4><button id="pagar-btn" class="btn btn-pay btn-primary btn-lg d-block w-100" type="button" style="background: rgb(13,136,208);"' +
            '>Proceder al pago</button>' +
            '</div>';

        const PayBtn = document.querySelectorAll('.btn-pay')
        PayBtn.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const idClientePagar = String(sessionStorage.getItem('IDClientePago'));
                const idCarritoPagar = String(sessionStorage.getItem('IDCarritoPago'));

                //console.log(idCarritoPagar,idClientePagar,total_pagado,infoPedido);
                await addPedido(idCarritoPagar, idClientePagar, total_pagado, infoPedido);
                console.log("Enviado al Pago")
                function redireccionar() { location.href = "./realizarPedido.html"; }
                setTimeout(redireccionar(), 25000);
            })
        })

    })

});