var existeProd;
var idCliente;
var calif_prod;
var cant_prod;
var cat_prod;
var cond_prod;
var desc_prod;
var nombre_prod;
var prec_prod;
var url_prod;
var url_prod1;
var url_prod2;
var idClienteDatos;

//Agregar Producto
const getCliente = (id) => db.collection('clientes').doc(id).get();
const saveProducto = (idCliente, calif_prod, cant_prod, cat_prod, cond_prod, desc_prod, nombre_prod, prec_prod, url_prod, url_prod1, url_prod2) =>

    db.collection('producto').doc().set({
        idCliente,
        calif_prod,
        cant_prod,
        cat_prod,
        cond_prod,
        desc_prod,
        nombre_prod,
        prec_prod,
        url_prod,
        url_prod1,
        url_prod2
    })

document.getElementById("btnAgregarProd").addEventListener("click", async (e) => {
    document.getElementById('nombreProd').setAttribute("required", "");
    document.getElementById('cantProd').setAttribute("required", "");
    document.getElementById('precioUnitario').setAttribute("required", "");
    document.getElementById('urlImg').setAttribute("required", "");
    document.getElementById('condProd').setAttribute("required", "");
    document.getElementById('descProd').setAttribute("required", "");
    document.getElementById('selectCat').setAttribute('required', "");
})
document.getElementById("btnClose").addEventListener("click", async (e) => {
    document.getElementById('nombreProd').removeAttribute("required");
    document.getElementById('cantProd').removeAttribute("required");
    document.getElementById('precioUnitario').removeAttribute("required");
    document.getElementById('urlImg').removeAttribute("required");
    document.getElementById('condProd').removeAttribute("required");
    document.getElementById('descProd').removeAttribute("required");
    document.getElementById('selectCat').removeAttribute("required");
})
document.getElementById("btnCerrar").addEventListener("click", async (e) => {
    document.getElementById('nombreProd').removeAttribute("required");
    document.getElementById('cantProd').removeAttribute("required");
    document.getElementById('precioUnitario').removeAttribute("required");
    document.getElementById('urlImg').removeAttribute("required");
    document.getElementById('condProd').removeAttribute("required");
    document.getElementById('descProd').removeAttribute("required");
    document.getElementById('selectCat').removeAttribute("required");
})

addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    db.collection("catalogo")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            catRef = doc.data();
            catId = doc.id;
            console.log(catRef)
            var select = document.getElementById("selectCat");
            var option = document.createElement("option");
            option.innerHTML = '<option id="'+catId+'" value="'+catId +'">' + catRef.nombre_cat + '</option>';
            select.appendChild(option);
        })
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    })
    const impDireccion =sessionStorage.getItem('idCliente');
    //consulta el ID de la direccion
    const docDir = await getCliente(impDireccion);
    const idClienteDatos = docDir.data();
    console.log(idClienteDatos.tipoCuenta)

    if(idClienteDatos.tipoCuenta == false){
    document.getElementById('catalogo-tab').style.display = 'none';
    document.getElementById('ventas-tab').style.display = 'none';
    }if(idClienteDatos.tipoCuenta == true){
        document.getElementById('catalogo-tab').style.display = 'block';
        document.getElementById('-tab').style.display = 'block';
    }
})

document.getElementById('btnGuardarProd').addEventListener("click", async (e) => {
    e.preventDefault();
    if (existeProd == true) {
        mensajeAdvertencia('Este producto ya lo tiene registrado');
        return;
    } else {
        idCliente = sessionStorage.getItem('idCliente');
        calif_prod = document.getElementById('califProdN').value;
        cant_prod = document.getElementById('cantProdN').value;
        cat_prod = document.getElementById('selectCat').options[document.getElementById('selectCat').selectedIndex].lastChild.value;
        cond_prod = document.getElementById('condProdN').value;
        desc_prod = document.getElementById('descProdN').value;
        nombre_prod = document.getElementById('nombreProdN').value;
        prec_prod = document.getElementById('precioUnitarioN').value;
        await saveProducto(idCliente, calif_prod, cant_prod, cat_prod, cond_prod, desc_prod, nombre_prod, prec_prod, url_prod, url_prod1, url_prod2);
        await mensajeDeExitoS('Producto registrado con exito');
        location.reload();
    }
})

document.getElementById('urlImgN').addEventListener('input', async (e) => {
    await subirImagenes();
});
document.getElementById('urlImg1N').addEventListener('input', async (e) => {
    await subirImagenes1();
});
document.getElementById('urlImg2N').addEventListener('input', async (e) => {
    await subirImagenes2();
});

document.getElementById('modalAgregarProd').addEventListener('keyup', async (e) => {
    existeProd = false;
    db.collection("producto").where("nombre_prod", "==", document.getElementById('nombreProd').value.toUpperCase())
        .where("idCliente", "==", sessionStorage.getItem('idCliente'))
        .where("cat_prod", "==", document.getElementById('selectCat').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existeProd = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});
document.getElementById('modalAgregarProd').addEventListener('click', async (e) => {
    existeProd = false;
    db.collection("producto").where("nombre_prod", "==", document.getElementById('nombreProd').value.toUpperCase())
        .where("idCliente", "==", sessionStorage.getItem('idCliente'))
        .where("cat_prod", "==", document.getElementById('selectCat').value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existeProd = true;
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
});

subirImagenes = async () => {
    var imagen = document.getElementById("urlImgN").files[0];

    if (!imagen) {
        return;
    } else {
        //var file = document.getElementById("llenar_ine").files[0];
        var storageRef = defaultStorage.ref('/imagenesProductos/' + sessionStorage.getItem(idCliente) + '/' + imagen.name);
        let uploadTask = storageRef.put(imagen);
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            cargando('cargando imagen ' + progress + '%');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log(error)
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                url_prod = downloadURL;
            });
        });
    }
};

subirImagenes1 = async () => {
    var imagen1 = document.getElementById("urlImg1N").files[0];

    if (!imagen1) {
        return;
    } else {
        //var file = document.getElementById("llenar_ine").files[0];
        var storageRef1 = defaultStorage.ref('/imagenesProductos/' + sessionStorage.getItem(idCliente) + '/' + imagen1.name);
        let uploadTask1 = storageRef1.put(imagen1);
        uploadTask1.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            cargando('cargando imagen' + progress + '%');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log(error)
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL1) {
                url_prod1 = downloadURL1;
            });
        });
    }
};

subirImagenes2 = async () => {
    var imagen2 = document.getElementById("urlImg2N").files[0];

    if (!imagen2) {
        return;
    } else {
        //var file = document.getElementById("llenar_ine").files[0];
        var storageRef2 = defaultStorage.ref('/imagenesProductos/' + sessionStorage.getItem(idCliente) + '/' + imagen2.name);
        let uploadTask2 = storageRef2.put(imagen2);
        uploadTask2.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            cargando('cargando imagen ' + progress + '%');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log(error)
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask2.snapshot.ref.getDownloadURL().then(function (downloadURL2) {
                url_prod2 = downloadURL2;
            });
        });
    }
};


//RESTRINGIR PESTAÑAS

window.addEventListener('DOMContentLoaded', async (e) => {

})