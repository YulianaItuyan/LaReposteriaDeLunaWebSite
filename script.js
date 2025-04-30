// ---- Carrito de compras ----
let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoElemento = document.getElementById('carrito');
  const totalElemento = document.getElementById('total');

  carritoElemento.innerHTML = '';

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} - $${item.precio.toLocaleString()}`;
    li.onclick = () => eliminarDelCarrito(index);
    carritoElemento.appendChild(li);
  });

  totalElemento.textContent = `Total: $${total.toLocaleString()}`;
}

function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio;
  carrito.splice(indice, 1);
  actualizarCarrito();
}

// ---- Botón de Whasap ----
const btnSubir = document.getElementById('btn-subir');

window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btnSubir.style.display = "block";
  } else {
    btnSubir.style.display = "none";
  }
};

btnSubir.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

btnSubir.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
