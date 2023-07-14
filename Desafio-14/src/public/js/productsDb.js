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

//Editar producto
const formEdit = document.getElementById("product-form-edit");

formEdit.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("idEdit").value;
  const title = document.getElementById("titleEdit").value;
  const description = document.getElementById("descriptionEdit").value;
  const price = document.getElementById("priceEdit").value;
  const thumbnail = document.getElementById("thumbnailEdit").value;
  const code = document.getElementById("codeEdit").value;
  const stock = document.getElementById("stockEdit").value;
  const category = document.getElementById("categoryEdit").value;

  const requestBody = {};
  if (title) {
    requestBody.title = title;
  }
  if (description) {
    requestBody.description = description;
  }
  if (price) {
    requestBody.price = price;
  }
  if (thumbnail) {
    requestBody.thumbnail = thumbnail;
  }
  if (code) {
    requestBody.code = code;
  }
  if (stock) {
    requestBody.stock = stock;
  }
  if (category) {
    requestBody.category = category;
  }

  fetch(`/api/productsDatabase/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Update successful:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the resource:", error);
    });
});
