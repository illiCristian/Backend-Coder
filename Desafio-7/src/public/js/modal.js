function openModal(btn) {
  const productId = btn.dataset.id;

  // Obtener el producto correspondiente mediante una petición AJAX
  // y agregar su contenido al modal
  fetch(`/api/productsDatabase/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const modal = document.getElementById("product-modal");
      const modalContent = modal.querySelector(".modal-content");

      modal.style.display = "block";
      console.log(product);
      modalContent.innerHTML = `<div>
      <h2 class="text-red-800 font-bold">${product.title}</h2>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onclick="addToCart('${product._id}')"
      >Agregar al carrito</button>
      <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onclick="closeModal()"
      >Cerrar</button></div>
    `;
    });
}
async function addToCart(id) {
  try {
    const result = await fetch(`http://localhost:8080/api/cartsDb/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
}
