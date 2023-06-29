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
