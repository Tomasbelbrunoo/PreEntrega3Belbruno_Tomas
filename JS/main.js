let productos = [
    {"id": 1, "nombre": "Arroz", "precio": 250 },
    {"id": 2, "nombre": "Frijoles", "precio": 300},
    {"id": 3, "nombre": "Aceite de Oliva", "precio": 575},
    {"id": 4, "nombre": "Harina", "precio": 200},
    {"id": 5, "nombre": "Leche", "precio": 175},
    {"id": 6, "nombre": "Azúcar", "precio": 400},
    {"id": 7, "nombre": "Sal", "precio": 150},
    {"id": 8, "nombre": "Café", "precio": 450},
    {"id": 9, "nombre": "Vinagre", "precio": 325},
    {"id": 10, "nombre": "Pasta", "precio": 275},
    {"id": 11, "nombre": "Mantequilla", "precio": 525},
    {"id": 12, "nombre": "Tomate en lata", "precio": 375},
    {"id": 13, "nombre": "Cereal", "precio": 350},
    {"id": 14, "nombre": "Jabón", "precio": 200},
    {"id": 15, "nombre": "Cepillo de dientes", "precio": 150},
    {"id": 16, "nombre": "Papel higiénico", "precio": 300},
    {"id": 17, "nombre": "Pan", "precio": 175},
    {"id": 18, "nombre": "Jugo de naranja", "precio": 225},
    {"id": 19, "nombre": "Agua mineral", "precio": 100},
    {"id": 20, "nombre": "Galletas", "precio": 275} 
]
const productosSeleccionadoss = document.querySelector ("#productosSeleccionadoss")
let menorP = 1000;
let mayorP = 1; 
let productosSeleccionados = [];

function SumaDeProductosSeleccionados (productosSeleccionados){
    let total = 0;
    for (let i = 0; i < productosSeleccionados.length; i++){
        total += productosSeleccionados[i].precio;
    }
    return total;
}

const totalSumado = SumaDeProductosSeleccionados (productosSeleccionados);

// MOSTRAR PRODUCTOS EN EL MAIN

function mostrarProductos (produc){
    const productosContainer = document.getElementById ("productosContainer");
    productosContainer.innerHTML = "";
    
    produc.forEach (produc => {
        const card = document.createElement ("div")
        card.className = "card";
        card.style.width = "18rem"
        
        card.innerHTML = `
            <div class ="card" style= "width: 18rem;">
                <div class= "card-body">
                    <h5 class ="card-title"> ${produc.nombre} </h5>
                    <p class = "card-precio" ><stong>ID:</stong> ${produc.id}</p>
                    <p class = "card-precio" ><stong>Precio:</stong> ${produc.precio}</p>
                    <button href ="#" class="btn btn-primary comprar-btn">Comprar</button>
                </div>  
            </div>`
            
        productosContainer.appendChild(card);

        // Funcion del boton Comprar y contador

        const comprarBtn = card.querySelector(".comprar-btn");
        const contador = document.getElementById ("contador");
        comprarBtn.addEventListener("click", function() {
            productosSeleccionados.push(produc);    
            contador.textContent = "(" + productosSeleccionados.length + ")";
        });
        
        contador.textContent = "(" + productosSeleccionados.length + ")";
        
    });
};

mostrarTodos();

// INTERFAZ DE CARRITO 

const carritoBtn = document.getElementById("abrirCarrito");
carritoBtn.addEventListener("click", function() {
    mostrarCarrito(productosSeleccionados);  
});

function mostrarCarrito(productosSeleccionados) {
    const producSelec = document.getElementById("contenidoCarrito");
        producSelec.innerHTML = "";

// ABRIR, CERRAR, CERRAR POR FUERA (CARRITO)

    const cerrarCarritoBtn = document.createElement ("span")
        cerrarCarritoBtn.className = "cerrar";
        cerrarCarritoBtn.innerHTML = "&times;";
        cerrarCarritoBtn.id = "cerrarCarrito";
        contenidoCarrito.appendChild(cerrarCarritoBtn);

    const modal = document.getElementById("miCarrito");
    const botonAbrir = document.getElementById("abrirCarrito");
    const botonCerrar = document.getElementById("cerrarCarrito");

    // Cuando se hace clic en el botón, abrir el carrito
    botonAbrir.onclick = function() {
        modal.style.display = "block";
    };

    // Cuando se hace clic en el botón de cerrar, cerrar el carrito
    botonCerrar.onclick = function() {
        modal.style.display = "none";
    };

    // Cuando el usuario hace clic fuera del carrito, cerrarlo
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }};  

// CARTAS DE PRODUCTOS EN CARRITO (productosSeleccionados)

    productosSeleccionados.forEach(produc => {
        const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem"
        
        card.innerHTML = `
        
            <div class ="card" style= "width: 18rem;">
                <span class="cerrarP" data-id="${produc.id}">&times;</span>
                    <div class= "card-body">
                        <h5 class ="card-title"> ${produc.nombre} </h5>
                        <p class = "card-precio" ><stong>ID:</stong> ${produc.id}</p>
                        <p class = "card-precio" ><stong>Precio:</stong> ${produc.precio}</p>
                    </div>  
            </div>`
            contenidoCarrito.appendChild(card);

    });

    // BORRAR PRODUCTOS SELECCIONADOS
    
    const cerrarBotones = document.querySelectorAll('.cerrarP');
    cerrarBotones.forEach(boton => {    
        boton.addEventListener('click', function(event) {
            event.preventDefault();
            const idProducto = event.target.dataset.id; 
            eliminarProductoDelLocalStorage(idProducto);
            const productoAEliminar = event.target.closest('.card');
            productoAEliminar.remove();
        });
    });
  
    // SUMA DE PRODUCTOS SELECCIONADOS

    const totalSumado = SumaDeProductosSeleccionados(productosSeleccionados);
    const sumaProductos = document.createElement("div");
        sumaProductos.className = "suma"
        sumaProductos.innerHTML = `<p> Suma de Productos: $${totalSumado} </p>`;
        producSelec.appendChild(sumaProductos);

    // GUARDADO EN LOCALSTORAGE

    sicronizarStorage ();

};
function eliminarProductoDelLocalStorage(id) {
    productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    const productoEliminado = productosSeleccionados.find(producto => producto.id === parseInt(id));
    const precioProductoEliminado = productoEliminado.precio;

    const nuevosProductos = productosSeleccionados.filter(producto => producto.id !== parseInt(id));

    localStorage.setItem('productosSeleccionados', JSON.stringify(nuevosProductos));

    const totalSumadoDespuesDeEliminar = SumaDeProductosSeleccionados(nuevosProductos);

    const sumaProductos = document.querySelector(".suma");
    if (sumaProductos) {
        sumaProductos.innerHTML = `<p> Suma de Productos: $${totalSumadoDespuesDeEliminar} </p>`;
    }
}

function sicronizarStorage (){
    localStorage.setItem ('productosSeleccionados', JSON.stringify (productosSeleccionados));
    localStorage.setItem ('contador',productosSeleccionados.length)
};

// Filtrado por precio

function menorAMayor(){
    const menor = productos.filter (productos => productos.precio <= menorP )
    .sort ((a, b) => a.precio - b.precio);
    
    mostrarProductos (menor);
};

function mayorAMenor(){
    const mayor = productos.filter (productos =>
        productos.precio >= mayorP)
        .sort ((a,b) =>b.precio - a.precio);
        
        mostrarProductos(mayor)
    };

function mostrarTodos (){
    mostrarProductos(productos);
};

// ACCESO A LOS BOTONES DE FILTRADO

let botonMenor = document.getElementById("PrecioBajo");
botonMenor.addEventListener("click", menorAMayor);

let botonMayor = document.getElementById("PrecioAlto");
botonMayor.addEventListener("click", mayorAMenor);

// GUARDADO EN LOCALSTORAGE

document.addEventListener ('DOMContentLoaded', () => {
    productosSeleccionados = JSON.parse (localStorage.getItem ('productosSeleccionados')) || [];
    contadorValor= Number(localStorage.getItem ('contador')) || 0 ;
});