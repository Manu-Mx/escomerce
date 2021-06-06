const db = firebase.firestore();

const onGetVerIdProducto = (callback) => db.collection('ver_Producto').onSnapshot(callback);
const onGetProductos = (callback) => db.collection('producto').onSnapshot(callback);
const getProducto = (id) => db.collection('producto').doc(id).get();
const deleteProductoTemporal = (id) => db.collection('ver_Producto').doc(id).delete();

const addCarrito = (idProducto, nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod, cant_prod_car) => db.collection('carrito').doc().set(
    { idProducto, 
        nombre_prod, 
        desc_prod, 
        cant_prod, 
        prec_prod, cond_prod,
        url_prod, 
        calif_prod, 
        cat_prod, 
        cant_prod_car 
    });
const imprProducto = document.getElementById('imp-producto-arriba');
const regresarBTN = document.getElementById('back-btn')

window.addEventListener('DOMContentLoaded', async (e) => {
    
    db.collection('ver_Producto').get().then((Snapshot) => {
        Snapshot.docs.forEach(doc =>{
            let consulta = doc.data()
            consulta.id = doc.id;
            console.log(consulta.idProducto)
            sessionStorage.setItem('IDVerProducto', consulta.id)
            sessionStorage.setItem('IDObtenido', consulta.idProducto)
        })
    })
    imprProducto.innerHTML = ''
    const obtenerID = db.collection('producto').get().then((Snapshot) => {
        Snapshot.docs.forEach(doc =>{
            let prod = doc.data()
            prod.id = doc.id;
            imprID = sessionStorage.getItem('IDObtenido')
            
            if (prod.id == imprID) {
            imprProducto.innerHTML = `
            <div class="row">
            <div class="col-md-6">
                <div class="gallery">
                    <div id="product-preview" class="vanilla-zoom">
                        <div class="">
                        <img class="img-fluid d-block small-preview" src="${prod.url_prod}"></div>
                        <div class="sidebar"><img class="img-fluid d-block small-preview" src="${prod.url_prod}"><img class="img-fluid d-block small-preview" src="${prod.url_prod}"><img class="img-fluid d-block small-preview" src="${prod.url_prod}"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="info">
                    <h3>${prod.nombre_prod}</h3>
                    <div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-half-empty.svg"><img src="assets/img/star-empty.svg"></div>
                    <div class="price">
                        <h3>$ ${prod.prec_prod}</h3>
                    </div><button data-id="${prod.id}" class="btn btn-primary btn-add" type="button" style="background: rgb(13,136,208);"><i class="icon-basket"></i>Añadir al carrito</button>
                    <div class="summary">
                        <p>${prod.desc_prod}</p>
                    </div>
                </div>
            </div>`;
            const btnAdd = document.querySelectorAll('.btn-add');
            btnAdd.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getProducto(e.target.dataset.id);
                    const datoActualizar = doc.data();
                    console.log(e.target.dataset.id)
                    const idProducto = e.target.dataset.id
                    var cant_prod_car = 1;
                   await addCarrito(idProducto,
                        datoActualizar.nombre_prod,
                        datoActualizar.desc_prod,
                        datoActualizar.cant_prod,
                        datoActualizar.prec_prod,
                        datoActualizar.cond_prod,
                        datoActualizar.url_prod,
                        datoActualizar.calif_prod,
                        datoActualizar.cat_prod,
                        cant_prod_car
                    );
                    function redireccionar() { location.href = "carrito.html"; }
                   await  setTimeout(redireccionar(), 25000);
                
                })
            })
            }
        })
    })
})
regresarBTN.addEventListener('click', async (e) => {
     function redireccionar() { location.href = "catalogo.html"; }
                   
//Borramos el producto que se muestra en pantalla
                    idProdDelete = sessionStorage.getItem('IDVerProducto')
                    console.log("Eliminado: " + idProdDelete)
                    await deleteProductoTemporal(idProdDelete)
                    await  setTimeout(redireccionar(), 25000);
})