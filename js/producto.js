const db = firebase.firestore();

var produ = document.getElementById('infop');
var spec = document.getElementById('specifications');
var rev = document.getElementById('reviews');
var rec = document.getElementById('recom');
var come = document.getElementById('come');
var impSuperior = document.getElementById('impProductos');
const addCarrito = (idCarritoProd, idCliente, infoProducto) => db.collection('carrito').doc(idCarritoProd).set({ idCliente, infoProducto });

var getNombrep = localStorage.getItem("nombre_variable");
var getCat = localStorage.getItem("cat_variable");
var getId = localStorage.getItem("id_variable");
let id = '';
let idCliente = sessionStorage.getItem('idCliente');
let idCarritoComprar = idCliente + '1';
const getProducto = (id) => db.collection('producto').doc(id).get();
var existeCarrito = false;
const datosProducto = [];
db.settings({ timestampsInSpanshots: true });
//console.log(getNombrep);

//window.onload = alert(localStorage.getItem("nombre_variable");
window.addEventListener('DOMContentLoaded', async (e) => {
    db.collection("producto").where("nombre_prod", "==", getNombrep, true).get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            produ.innerHTML = '';
            const infoD = doc.data()
            //console.log(`${doc.comentarios} => ${doc.data()}`);
            produ.innerHTML += `
            <img class="img-fluid d-block small-preview" src="${infoD.url_prod}">
            <img class="img-fluid d-block small-preview" src="${infoD.url_prod1}">
            <img class="img-fluid d-block small-preview" src="${infoD.url_prod2}"> `

            impSuperior.innerHTML = '';
            impSuperior.innerHTML=`
                        <div class="info">
                            <div class="nameP">
                                <h3>${infoD.nombre_prod}</h3>
                            </div>
                            <div class="calificacion">
                                <h5>Calificación: ${infoD.calif_prod} /10</h5>
                            </div>
                            <div class="disponible">
                                <h5>Cant. Disponible: ${infoD.cant_prod}</h5>
                            </div>
                            <div class="price">
                                <h3>$ ${infoD.prec_prod}</h3>
                            </div>
                            <div class="col-6 col-md-2 quantity">
                                <label class="form-label d-none d-md-block" for="quantity">Cantidad
                                </label>
                                <input type="number" id="cantidadverprod" class="form-control quantity-input" valor min="1" max="${infoD.cant_prod}" value="1">
                            </div>
                            <br>
                            <div>
                                <button class="btn btn-primary btn-add"  type="button" style="background: rgb(13,136,208);" >
                                Añadir Carrito
                                </button>
                            </div>
                            <div align="justify" class="summary">
                                <p>${infoD.desc_prod}.</p>
                            </div>
                        </div>`;

            const btnAdd = document.querySelectorAll('.btn-add');
            const btnZoom = document.querySelectorAll('#zoomedImg');

            btnZoom.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    
                })
            })

            btnAdd.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const updCant = document.getElementById('cantidadverprod')
                    const upcantint = Number(updCant.value)
                    console.log(upcantint)
                    console.log(getId);
                    const doc = await getProducto(getId);
                    const datoActualizar = doc.data();
                    //console.log(e.target.dataset.id)
                    const idProducto = e.target.dataset.id
                    var cant_prod_car = 1;
                    datoActualizar.id = doc.id;

                    console.log(datoActualizar.id)
                    console.log(idCliente)


                    function carritoActualizar() {
                        if (existeCarrito == true) { }
                    }
                    //SI EXISTE EL CARRITO
                    db.collection('carrito').where("idCliente", "==", idCliente).get()
                        .then((querySnapshot) => {

                            querySnapshot.forEach((doc) => {
                                existeCarrito = true;
                                consultCarrito = doc.data();
                                //console.log(consultCarrito.infoProducto)
                                const encontrarDato = consultCarrito.infoProducto.find(item => {
                                    return item.id_prod === getId;
                                })
                                const indexModificar = consultCarrito.infoProducto.findIndex(item => {
                                    return item.id_prod === getId;
                                })

                                //ACTUALIZAR CANTIDAD PROUDUCTO

                                if (!encontrarDato) {
                                    //Si No existe el producto, lo agrega al final
                                    console.log("NUEVO PRODUCTO:")
                                    consultCarrito.infoProducto.push({
                                        nombre_prod: datoActualizar.nombre_prod,
                                        desc_prod: datoActualizar.desc_prod,
                                        cant_prod: datoActualizar.cant_prod,
                                        prec_prod: datoActualizar.prec_prod,
                                        cond_prod: datoActualizar.cond_prod,
                                        url_prod: datoActualizar.url_prod,
                                        calif_prod: datoActualizar.calif_prod,
                                        cat_prod: datoActualizar.cat_prod,
                                        id_prod: getId,
                                        cant_prod_car: upcantint
                                    })
                                    console.log('1 cantidad a base de datos: ' + consultCarrito.infoProducto.cant_prod_car)
                                    addCarrito(idCarritoComprar, idCliente, consultCarrito.infoProducto)
                                    agregadoAlCarrito() 
                                    console.log('funcion 1 enviado')

                                } else {
                                    //Si existe el producto actualiza la cantidad
                                    //Valida que el contador no sobre pase el stock
                                    if (encontrarDato.cant_prod_car < encontrarDato.cant_prod) {
                                        encontrarDato.cant_prod_car += 1;
                                    }
                                    console.log("Nueva cantidad: " + encontrarDato.cant_prod_car);
                                    const datosProducto = {
                                        nombre_prod: encontrarDato.nombre_prod,
                                        desc_prod: encontrarDato.desc_prod,
                                        cant_prod: encontrarDato.cant_prod,
                                        prec_prod: encontrarDato.prec_prod,
                                        cond_prod: encontrarDato.cond_prod,
                                        url_prod: encontrarDato.url_prod,
                                        calif_prod: encontrarDato.calif_prod,
                                        cat_prod: encontrarDato.cat_prod,
                                        id_prod: getId,
                                        cant_prod_car: upcantint
                                    }
                                    console.log("Nuevo:")
                                    console.log(datosProducto)
                                    consultCarrito.infoProducto.splice(indexModificar, 1, datosProducto);
                                    console.log('2 cantidad a base de datos: ' + datosProducto.cant_prod_car)
                                    addCarrito(idCarritoComprar, idCliente, consultCarrito.infoProducto)
                                    agregadoAlCarrito() 
                                    console.log('funcion 2 enviado')
                                }
                            })
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        })




                    //db.collection('carrito').where("idCliente","",)
                    if (existeCarrito == false) {
                        console.log('cantidad ' + upcantint)
                        datosProducto.push({
                            nombre_prod: datoActualizar.nombre_prod,
                            desc_prod: datoActualizar.desc_prod,
                            cant_prod: datoActualizar.cant_prod,
                            prec_prod: datoActualizar.prec_prod,
                            cond_prod: datoActualizar.cond_prod,
                            url_prod: datoActualizar.url_prod,
                            calif_prod: datoActualizar.calif_prod,
                            cat_prod: datoActualizar.cat_prod,
                            id_prod: getId,
                            cant_prod_car: upcantint
                        })
                        const datosCarrito = datosProducto
                        console.log(datosCarrito)
                        await addCarrito(idCarritoComprar, idCliente, datosProducto);
                        agregadoAlCarrito() 
                        console.log('funcion 3 enviado')
                    }

                })
                
            })
            
        });

    });
        
        
});

//<button data-id="' + infoDato.id + '"class="btn btn-primary btn-add" type="button" style="background: rgb(13,136,208);">Añadir Carrito</button>
//<button id="aña" class="btn btn-primary btn-add"  type="button" style="background: rgb(13,136,208);"><i class="icon-basket"></i>Añadir al carrito</button></a>

/*function hizoClick() {
    alert("Enviado");
    db.collection("carrito").doc().set({
        idCliente: "pruebaid" ,
            infoProducto: { 
            cant_prod: 1,
            cond_prod: "Usado",
            idProducto: getId,
            url_prod: "https://detqhtv6m6lzl.cloudfront.net/wp-content/uploads/2020/08/7501147413249.jpg",
            nombre_prod: getNombrep,
            prec_prod: 1,
            desc_prod: "prueba",
            cat_prod: getCat,
            cant_prod_car: 1,
            }
        
    })
  }*/



















/*db.collection("carrito").doc().set({
    cant_prod: 1,
    cond_prod: "Usado",
    idProducto: "4qa7PBd5Njb4pVBg3fQ6",
    url_prod: "https://detqhtv6m6lzl.cloudfront.net/wp-content/uploads/2020/08/7501147413249.jpg",
    nombre_prod: "prueba",
    prec_prod: 1,
    desc_prod: "prueba",
    cat_prod: "prueba",
    cant_prod_car: 1

})*/


/*const taskform = document.getElementById('aña');

taskform.addEventListener('submit',e=>{
    e.preventDefault();
    console.log('submiting')
})
*/


const col = db.collection('producto');
const query = col.where('specs', 'array-contains', getNombrep)
spec.innerHTML = '';
query.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        const infoD = doc.data()
        //console.log(doc.id,doc.data())
        spec.innerHTML += `
        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr><td> ${infoD.specs[0]}</td></tr>
                    <tr><td> ${infoD.specs[1]}</td></tr>
                    <tr><td> ${infoD.specs[2]}</td></tr>
                    <tr><td> ${infoD.specs[3]}</td></tr>
                    <tr><td> ${infoD.specs[4]}</td></tr>
                    <tr><td> ${infoD.specs[5]}</td></tr>
                    <tr><td> ${infoD.specs[6]}</td></tr>
                </tbody>
            </table>
        </div>`
    })
})

const col2 = db.collection('comentarios');
const query2 = col2.where('comentario', 'array-contains', getNombrep)
rev.innerHTML = '';
query2.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        const infoD = doc.data()
        //console.log(doc.id,doc.data())
        rev.innerHTML += `
        <div class="reviews">
            <div class="review-item">
                <h4>${infoD.comentario[3]}&nbsp;</h4>
                <span class="text-muted"><a href="#">${infoD.comentario[1]}</a>, ${infoD.comentario[0]}</span>
                <p>${infoD.comentario[2]}</p>
            </div>
        </div>`
    })
})

db.collection("producto").where("cat_prod", "!=", getCat, true).limit(3).get().then((querySnapshot) => {
    rec.innerHTML = '';
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        rec.innerHTML += `
        <div class="col-sm-6 col-lg-4">
            <div class="clean-related-item">
                <div class="image">
                    <a href="#"><img class="img-fluid d-block mx-auto" src="${doc.data().url_prod}"></a>
                </div>
                    <div class="related-name"><a href="#">${doc.data().nombre_prod}</a>
                        <h4>$${doc.data().prec_prod}</h4>
                    </div>
                </div>
            </div>
        </div>`
    });
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

