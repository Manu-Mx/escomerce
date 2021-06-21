const db = firebase.firestore();

const taskForm = document.getElementById('imp-catalogo');
const taskContainer = document.getElementById('imp-catalogo');
const numCarrito = document.getElementById('navcol-1');

let carritoOn = false;
let editStatus = false;
let id = '';
let idCliente = sessionStorage.getItem('idCliente');
var existeCarrito = false;

let idCarritoComprar = idCliente +'1';
const datosProducto = [];
//Funcion para guardar la informacion en la base de datos
const saveIntegrantes = (nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('producto').doc().set({
        nombre_prod,
        desc_prod,
        cant_prod,
        prec_prod,
        cond_prod,
        url_prod,
        calif_prod,
        cat_prod
    })

//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('producto').get();
const getProducto = (id) => db.collection('producto').doc(id).get();
const addCarrito = (idCarritoProd,idCliente,infoProducto) => db.collection('carrito').doc(idCarritoProd).set({idCliente,infoProducto });
const onGetIntegrantes = (callback) => db.collection('producto').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('producto').doc(id).delete();
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);

//Pagina ver producto
const onGetVerIdProducto = (callback) => db.collection('ver_Producto').onSnapshot(callback);
const onGetProductos = (id) => db.collection('producto').doc(id).get();
const getCarrito = (callback) => db.collection('carrito').onSnapshot(callback)


const addVerProducto = (idProducto, datosProducto, precioProducto) => db.collection('ver_Producto').doc().set({ idProducto, datosProducto, precioProducto });

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {
    
    onGetIntegrantes((querySnapshot) => {
        
        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {
            
            const infoDato = doc.data()
            infoDato.id = doc.id;
            //console.log(infoDato);
            //Genera un html
            taskContainer.innerHTML += '<div class="col-12 col-md-6 col-lg-4"><div class="clean-product-item"><div class="product-name"><a href="#">' + infoDato.nombre_prod + '</a></div>' +
                '<div class="image"><a><img class="img-fluid d-block mx-auto" src="' + infoDato.url_prod + '"></a></div>' +
                '<div class="product-name"><a>' + infoDato.desc_prod + ' ID:' + infoDato.id + '</a></div><div class="product-name"></div><div class="about"><div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-half-empty.svg"><img src="assets/img/star-empty.svg"></div>' +
                '<div class="price"><h3>$' + infoDato.prec_prod + '</h3></div>' +
                '</div><div class="d-flex justify-content-around product-name" style="margin-top: 30px;">' +
                '<button data-id="' + infoDato.id + '" class="btn btn-primary btn-desc" type="button" style="background: rgb(13,136,208);">Ver</button><button data-id="' + infoDato.id + '"class="btn btn-primary btn-add" type="button" style="background: rgb(13,136,208);">Añadir Carrito</button></div></div></div>';

            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteIntegrante(e.target.dataset.id);
                })
            })

            const btnAdd = document.querySelectorAll('.btn-add');

            btnAdd.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getProducto(e.target.dataset.id);
                    const datoActualizar = doc.data();
                    //console.log(e.target.dataset.id)
                    const idProducto = e.target.dataset.id
                    var cant_prod_car = 1;
                    datoActualizar.id = doc.id;
                    console.log(datoActualizar.id)
                    console.log(idCliente)
                    
                    
                    function carritoActualizar() {
                        if(existeCarrito == true){}
                    }
                    //SI EXISTE EL CARRITO
                    db.collection('carrito').where("idCliente","==", idCliente).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            consultCarrito = doc.data();
                            console.log(consultCarrito.infoProducto)
                            const encontrarDato = consultCarrito.infoProducto.find(item => {
                                return item.id_prod === e.target.dataset.id;
                            })
                            const indexModificar = consultCarrito.infoProducto.findIndex(item => {
                                return item.id_prod === e.target.dataset.id;
                            })

                            //ACTUALIZAR CANTIDAD PROUDUCTO

                            if(!encontrarDato) {
                                //Si No existe el producto, lo agrega al final
                                console.log("NUEVO PRODUCTO:")
                                consultCarrito.infoProducto.push({
                                    nombre_prod : datoActualizar.nombre_prod,
                                    desc_prod : datoActualizar.desc_prod,
                                    cant_prod : datoActualizar.cant_prod,
                                    prec_prod : datoActualizar.prec_prod,
                                    cond_prod : datoActualizar.cond_prod,
                                    url_prod : datoActualizar.url_prod,
                                    calif_prod : datoActualizar.calif_prod,
                                    cat_prod : datoActualizar.cat_prod,
                                    id_prod : idProducto,
                                    cant_prod_car: cant_prod_car
                                })
                                addCarrito(idCarritoComprar,idCliente,consultCarrito.infoProducto)

                            } else {
                                //Si existe el producto actualiza la cantidad
                                //Valida que el contador no sobre pase el stock
                            if(encontrarDato.cant_prod_car < encontrarDato.cant_prod){
                                encontrarDato.cant_prod_car += 1;
                            }
                            console.log("Nueva cantidad: "+encontrarDato.cant_prod_car);
                            const datosProducto = {
                                nombre_prod: encontrarDato.nombre_prod,
                                desc_prod: encontrarDato.desc_prod,
                                cant_prod: encontrarDato.cant_prod,
                                prec_prod: encontrarDato.prec_prod,
                                cond_prod: encontrarDato.cond_prod,
                                url_prod: encontrarDato.url_prod,
                                calif_prod: encontrarDato.calif_prod,
                                cat_prod: encontrarDato.cat_prod,
                                id_prod: encontrarDato.id_prod,
                                cant_prod_car: encontrarDato.cant_prod_car
                            }
                            console.log("Nuevo:")
                            console.log(datosProducto) 
                            consultCarrito.infoProducto.splice(indexModificar, 1, datosProducto);
                            addCarrito(idCarritoComprar,idCliente,consultCarrito.infoProducto)
                            }
                        })
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    })
                    
                    
                    
                     
                    //db.collection('carrito').where("idCliente","",)
                    datosProducto.push({
                        nombre_prod : datoActualizar.nombre_prod,
                        desc_prod : datoActualizar.desc_prod,
                        cant_prod : datoActualizar.cant_prod,
                        prec_prod : datoActualizar.prec_prod,
                        cond_prod : datoActualizar.cond_prod,
                        url_prod : datoActualizar.url_prod,
                        calif_prod : datoActualizar.calif_prod,
                        cat_prod : datoActualizar.cat_prod,
                        id_prod : idProducto,
                        cant_prod_car: cant_prod_car
                    })
                    const datosCarrito = datosProducto
                    
                    await addCarrito(idCarritoComprar,idCliente,datosCarrito);
                })
            })

            const btnDesc = document.querySelectorAll('.btn-desc');

            //Vamos  la vista Descripcion del producto
            btnDesc.forEach(btn => {

                btn.addEventListener('click', async (e) => {

                    const doc = await getProducto(e.target.dataset.id);
                    const datoVer = doc.data();
                    //console.log(e.target.dataset.id)
                    const idProducto = e.target.dataset.id
                    const precioProducto = datoVer.prec_prod
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

            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getProducto(e.target.dataset.id);
                    const datoActualizar = doc.data();

                    editStatus = true;
                    //Obtenemos el id del producto
                    id = doc.id;
                    taskForm['nombre_producto'].value = datoActualizar.nombre_prod;
                    taskForm['desc_producto'].value = datoActualizar.desc_prod;
                    taskForm['cantidad_producto'].value = datoActualizar.cant_prod;
                    taskForm['precio_producto'].value = datoActualizar.prec_prod;
                    taskForm['condicion_producto'].value = datoActualizar.cond_prod;
                    taskForm['foto_producto'].value = datoActualizar.url_prod;
                    taskForm['calif_producto'].value = datoActualizar.calif_prod
                    taskForm['categoria_producto'].value = datoActualizar.cat_prod;
                    //Boton de actualizar info (No Tocar)
                    taskForm['subir_registro'].innerText = 'Update';
                })
            })
            //console.log(infoDato.id)
        })

    })
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

});

//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;

    const nombre_prod = taskForm['nombre_producto'].value;
    const desc_prod = taskForm['desc_producto'].value;
    const cant_prod = Number(taskForm['cantidad_producto'].value);
    const prec_prod = Number(taskForm['precio_producto'].value);
    const cond_prod = taskForm['condicion_producto'].value;
    const url_prod = taskForm['foto_producto'].value;
    const calif_prod = Number(taskForm['calif_producto'].value);
    const cat_prod = taskForm['categoria_producto'].value;

    if (!editStatus) {
        await saveIntegrantes(nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod);
    } else {

        await updateIntegrante(id, {
            nombre_prod,
            desc_prod,
            cant_prod,
            prec_prod,
            cond_prod,
            url_prod,
            calif_prod,
            cat_prod
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['subir_registro'].innerText = 'Guardar';

    }
    //console.log(id)
    getIntegrantes();
    taskForm.reset();
    //console.log(url_foto, nombre_integrante);
})