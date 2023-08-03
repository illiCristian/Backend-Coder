const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessageEmail");
const spinner = document.getElementById("spinner");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  spinner.style.display = "block";
  fetch("/api/session/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error("Hubo un error en el registro");
      }
      spinner.style.display = "none";
      return result.json();
    })
    .then((json) => {
      console.log(json);
      if (json.status === "success") {
        alert("Usuario creado con éxito");
        window.location.replace("/login");
      }
    })
    .catch((error) => {
      console.error(error);
      errorMessage.style.display = "block";
      spinner.style.display = "none";
    });
});

/* const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/session/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => console.log(json));
});
 */
