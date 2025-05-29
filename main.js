let productos = [];
let carrito = [];

// Cargar productos desde un archivo JSON
async function cargarProductos() {
  try {
    const respuesta = await fetch("productos.json");
    productos = await respuesta.json();
    renderizarProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Renderizar productos en el HTML
function renderizarProductos() {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = ""; // limpiar contenido previo
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p >
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

// Actualizar el contenido del carrito en el HTML
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");

  lista.innerHTML = "";
  let totalCarrito = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarDelCarrito(index);

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    totalCarrito += item.precio;
  });

  total.textContent = totalCarrito;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    Swal.fire("Tu carrito está vacío", "Agrega productos antes de comprar.", "warning");
    return;
  }

  Swal.fire({
    title: "Compra realizada!",
    text: "Gracias por tu compra.",
    icon: "success",
    confirmButtonText: "Aceptar"
  });

  carrito = [];
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  const btnFinalizar = document.getElementById("finalizar-compra");
  btnFinalizar.addEventListener("click", finalizarCompra);
});
