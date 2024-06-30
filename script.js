var Api= 'https://api.yumserver.com/17057/products';
function ObtenerProductos(){
    fetch (Api)
    .then(MostrarProductos)
    .then(response=>response.json())
    .catch(error=>console.log('Error',error));
}
function MostrarProductos(productos){
    let variable= '';
    for (let i = 0; i < productos.length; i++) {
        variable+=`
        <tr>
            <td>${productos[i].idcod}</td>
            <td>${productos[i].titulo}</td>
            <td>${productos[i].precioPeso}</td>
            <td>${productos[i].precioDolar}</td>
            <td>${productos[i].fecha}</td>
        <td><button onclick="Borrar('${productos[i].idcod}')">Borrar</button></td>
        <td><button onclick ="Cambiar('${productos[i].idcod}','${productos[i].titulo}','${productos[i].precioPeso}','${productos[i].precioDolar}','${productos[i].fecha}')">Editar</button></td>
        </tr>
        `;

    }
    document.getElementById('Resultados').innerHTML=variable;
}
var Ids=['Listas','NuevoProducto','Cambios'];
function mostrar(_div){
    for (let i = 0; i < Ids.length; i++) {
        document.getElementById(Ids[i]).setAttribute('style','display:none');
        
    }
    document.getElementById(_div).removeAttribute('style');
}

function CrearNuevoProducto(){
    let producto={
        titulo:document.getElementById('titulo').value,
        precioPeso:document.getElementById('precioventa').value,
        precioDolar:document.getElementById('preciodolar').value,
        fecha:document.getElementById('fecha').value
    };
    fetch(Api, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(producto)
})
.then(response => response.text())
.then(
function (texto){
    if(texto.trim()=="OK"){
        alert('Se ha creado el producto');
        ObtenerProductos()
    }else{
        alert(texto);
    }
}
)
.catch(error => console.error('Error:', error))
}
function Cambiar(idcod, titulo, precioPeso, precioDolar, fecha) {
    mostrar('Cambios');
    document.getElementById('nuevotitulo').value = titulo;
    document.getElementById('nuevoprecioventa').value = precioPeso;
    document.getElementById('nuevopreciodolar').value = precioDolar;
    document.getElementById('nuevafecha').value = fecha;
    let html=`<button onclick=Modificar('${idcod}')>Cambiar</button>`
    document.getElementById('Muestra').innerHTML=html
}

function Modificar(_idcod){
fetch(Api,{
    method:'PATCH',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({
idcod:_idcod,
titulo:document.getElementById('nuevotitulo').value,
precioPeso:document.getElementById('nuevoprecioventa').value,
precioDolar:document.getElementById('nuevopreciodolar').value,
fecha:document.getElementById('nuevafecha').value
    })
})
.then(response=>response.text())
.then(function(texto){
    if(texto.trim()=="OK"){
alert("Se ha modificado correctamente")
mostrar('Listas')
ObtenerProductos()
    }else{
        alert(texto);
    }
})
.catch(error=>console.log('Error',error));
}
function Borrar(_idcod){
    if(confirm("Esta seguro que desea eliminar el producto?")){
        fetch(Api,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                idcod:_idcod
            })

        })
        .then(response=>response.text())
        .then(function(texto){
            if(texto.trim()=="OK"){
                alert("Producto se ha eliminado correctamente");
                ObtenerProductos()
            }else{
                alert(texto)
            }
        })
    }
}
function MostrarMenu() {
    var principales = document.getElementById('Principales');
    principales.classList.toggle('botones');
}