// ---- Carrito de compras ----
let carrito = [];
let total = 0;

// Recuperar carrito desde localStorage al cargar la página
window.addEventListener('load', () => {
  const savedCarrito = localStorage.getItem('carrito');
  if (savedCarrito) {
    carrito = JSON.parse(savedCarrito);
    total = carrito.reduce((sum, item) => sum + item.precio, 0);
    actualizarCarrito();
  }
});

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarCarrito();
}

function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio;
  carrito.splice(indice, 1);
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

  // Guardar carrito en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Simula creación de preferencia y renderiza botón de pago
  crearPreferenciaFicticia().then(preferenceId => {
    console.log("Preferencia simulada:", preferenceId);
    renderBotonMercadoPago(preferenceId);
  });
}

// ---- Mercado Pago Bricks (simulación de diseño) ----

const mp = new MercadoPago('TEST-3d91fdea-4cdc-41b4-97d9-15614eb7dc48', {
  locale: 'es-CO'
});

let bricksBuilder = null;

function crearPreferenciaFicticia() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("fake-preference-id-" + Date.now());
    }, 300);
  });
}

function renderBotonMercadoPago(preferenceId) {
  if (bricksBuilder) {
    bricksBuilder.unmount();
  }

  mp.bricks().create("wallet", "pago-container", {
    initialization: {
      preferenceId: preferenceId
    },
    customization: {
      texts: {
        valueProp: 'smart_option'
      }
    }
  }).then((brick) => {
    bricksBuilder = brick;
  }).catch(error => {
    console.error("Error al renderizar Brick:", error);
  });
}

// ---- Botón subir arriba ----
const btnSubir = document.getElementById('btn-subir');

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btnSubir.style.display = "block";
  } else {
    btnSubir.style.display = "none";
  }
};

btnSubir.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


