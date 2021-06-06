var db = firebase.firestore();

var produ = document.getElementById('infop');


db.collection("producto").where("nombre_prod", "==", "Multimetro Digital", true).get().then((querySnapshot) => {
    produ.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        produ.innerHTML += `
       <div class="d-flex block-heading" style="width: 100vw;"><button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">Regresar</button></div>
       <div class="block-content" >
           <div class="product-info">
               <div class="row">
                   <div class="col-md-6">
                       <div class="gallery">
                           <div id="product-preview" class="vanilla-zoom">
                               <div class="zoomed-image"><img class="img-fluid d-block small-preview" src="${doc.data().url_prod}"></div>                         
                           </div>
                       </div>
                   </div>
                   <div class="col-md-6">
                       <div class="info">
                           <div class="nameP">
                               <h3>${doc.data().nombre_prod}</h3>
                           </div>
                           <div class="calificacion">
                           <h3>${doc.data().calif_prod} </h3>
                            </div>
                           <div class="price">
                               <h3>$ ${doc.data().prec_prod}</h3>
                           </div>
                           <a href="carrito.html">
                           <button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">
                           <i class="icon-basket"></i>
                           Añadir al carrito
                           </button>
                            </a>
                           <div class="summary">
                               <p>${doc.data().desc_prod}.</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br>
           <div class="product-info">
               <div>
                   <ul class="nav nav-tabs" role="tablist" id="myTab">
                       <li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-bs-toggle="tab" id="specifications-tabs" href="#specifications">Especificaciones</a></li>
                       <li class="nav-item" role="presentation"><a class="nav-link active" role="tab" data-bs-toggle="tab" id="reviews-tab" href="#reviews">Comentarios del producto</a></li>
                   </ul>
                   <div class="tab-content" id="myTabContent">
                       <div class="tab-pane fade specifications" role="tabpanel" id="specifications">
                           <div class="table-responsive">
                               <table class="table table-bordered">
                                   <tbody>
                                       <tr>
                                           <td class="stat">Especificacion 1</td>
                                           <td> Sin Especificar por el vendedor</td>
                                       </tr>
                                       <tr>
                                           <td class="stat">Especificacion 2</td>
                                           <td> Sin Especificar por el vendedor</td>
                                       </tr>
                                       <tr>
                                           <td class="stat">Especificacion 3</td>
                                           <td> Sin Especificar por el vendedor</td>
                                       </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade show active" role="tabpanel" id="reviews">
                           <div class="reviews">
                               <div class="review-item">
                                   <div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-empty.svg"></div>
                                   <h4>Titulo opinion&nbsp;</h4><span class="text-muted"><a href="#">Nombre de usuario</a>, Fecha de la opinion</span>
                                   <p>Opinion.</p>
                               </div>
                           </div>
                           <div class="reviews">
                               <div class="review-item">
                                   <div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-empty.svg"></div>
                                   <h4><strong>Titulo opinion&nbsp;</strong><br></h4><span class="text-muted"><a href="#">Nombre de usuario</a>, Fecha de opinion&nbsp;</span>
                                   <p>Opinion.</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

       </div>
   </div>                
          `
    });
});







