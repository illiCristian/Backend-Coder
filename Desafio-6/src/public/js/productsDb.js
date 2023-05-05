const product = [];
const form = document.getElementById("product-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  product.push({ title, description, price, thumbnail, code, stock, category });
  console.log(product);

  fetch("/api/productsDatabase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
    })
    .catch((error) => {
      console.error(error.message + "algun error random");
    });
});

//Borrar producto por id
const deleteForm = document.getElementById("productdeleteForm");

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = deleteForm.elements.id.value;
  console.log(id);
  fetch(`/api/productsDatabase/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Delete successful:", data);
    })
    .catch((error) => {
      console.error("There was a problem deleting the resource:", error);
    });
});
