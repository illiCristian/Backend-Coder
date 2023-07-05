function increaseQuantity(index) {
  const quantityElement = document.getElementById(`quantity${index}`);
  const currentQuantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = currentQuantity + 1;
}

function decreaseQuantity(index) {
  const quantityElement = document.getElementById(`quantity${index}`);
  const currentQuantity = parseInt(quantityElement.textContent);
  if (currentQuantity > 0) {
    quantityElement.textContent = currentQuantity - 1;
  }
}

const deleteButton = document.getElementById("deleteProduct");
async function deleteProduct(productId) {
  try {
    const res = await fetch("/api/session/current");
    const userData = await res.json();
    const cartId = userData.payload.cart;
    console.log(cartId);

    const response = await fetch(
      `/api/cartsDb/${cartId}/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
/* deleteProduct.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}); */

const cartCheckout = document.getElementById("checkout");
cartCheckout.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/session/current");
    const data = await response.json();
    const cartId = data.payload.cart;
    console.log(cartId);

    const purchaseResponse = await fetch(`/api/cartsdb/${cartId}/purchase`);
    const purchaseData = await purchaseResponse.json();
    console.log(purchaseData);
  } catch (error) {
    console.log(error);
  }
});
