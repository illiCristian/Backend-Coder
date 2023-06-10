const socket = io();

socket.on("log", (data) => {
  console.log(data);
});
//Esto es lado cliente, Envio un mensaje al servidor
socket.emit("message", {
  mensaje: "nuevo ingreso enviado como data a",
});

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

const form = document.getElementById("product-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  /* status= document.getElementById("status").checked, */
  /*   */

  socket.emit("newproduct", {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  });
});

const deleteForm = document.getElementById("productdeleteForm");

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = parseInt(deleteForm.elements.id.value);
  console.log(event);
  socket.emit("deleteProduct", { id });
});

socket.on("printData", (data) => {
  try {
    renderizarTabla(data);
  } catch (error) {
    console.error(error);
  }
});

const renderizarTabla = (data) => {
  const tbody = document.getElementById("printListProducts");
  const productsMap = data
    .map((item) => {
      return `<tr>
  <th>${item.id}</th>
  <td>${item.title}</td>
  <td>${item.price}</td>
  <td>${item.stock}</td>
  </tr>
  `;
    })
    .join("");
  tbody.innerHTML = productsMap;
};
