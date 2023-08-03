const spinner = document.getElementById("spinner");
const sucessMessage = document.getElementById("sucessMessage");
function openModal(btn) {
  const productId = btn.dataset.id;

  spinner.style.display = "block";
  fetch(`/api/productsDatabase/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const modal = document.getElementById("product-modal");
      const modalContent = modal.querySelector(".modal-content");
      modal.style.display = "block";
      spinner.style.display = "none";
      console.log(product);
      modalContent.innerHTML = `<div class="bg-white shadow-md p-4 rounded-lg">
      <h2 class="text-red-800 font-bold text-xl">${product.title}</h2>
      <p class="text-gray-600">${product.description}</p>
      <p class="text-green-500 font-semibold">Precio: $${product.price}</p>
      <p class="text-blue-500 font-semibold">Stock: ${product.stock}</p>
      <img src=${product.thumbnail} class="w-64 h-64 object-contain mx-auto my-4 rounded-md shadow-md" alt="${product.title}"/>
      <div class="flex justify-center space-x-4">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onclick="addToCart('${product._id}')"
        >Agregar al carrito</button>
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onclick="closeModal()"
        >Cerrar</button>
      </div>
    </div>
    
    `;
    });
}
async function addToCart(id, req) {
  spinner.style.display = "block";
  try {
    const result = await fetch(`http://localhost:8080/api/cartsDb/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.status === 404) {
      spinner.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al agregar al carrito",
        footer: "Producto actualmente sin stock!",
      });
    }
    if (result.statusText === "Unauthorized") {
      spinner.style.display = "none";
      alert("Debes estar logueado para agregar productos al carrito");
      window.location.href = "/login";
    }
    if (result.status === 200) {
      spinner.style.display = "none";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert("Error al agregar al carrito");
    console.log(error);
  }
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
}

// Obtener referencias a los elementos del dropdown
const dropdownToggleButton = document.getElementById("dropdownDefaultButton");
const dropdownMenu = document.getElementById("dropdown");

// Función para alternar la visibilidad del menú desplegable
function toggleDropdown() {
  dropdownMenu.classList.toggle("hidden");
}

// Agregar evento click al botón del dropdown
dropdownToggleButton.addEventListener("click", toggleDropdown);
