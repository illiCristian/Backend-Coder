const form = document.getElementById("loginForm");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errorLogin = document.getElementById("errorLoginMessage");
  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  spinner.style.display = "block";
  fetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (!result.ok) {
        errorLogin.style.display = "block";
        spinner.style.display = "none";
      }
      return result.json(); // Si la respuesta es exitosa, convertimos el resultado a JSON
    })
    .then((json) => {
      console.log(json);
      if (json.status === "success") {
        localStorage.setItem("token", json.acces_token);
        spinner.style.display = "none";
        window.location.href = "/products";
      }
    });
});

function toggleForgotPassword() {
  const forgotPasswordContainer = document.getElementById(
    "forgotPasswordContainer"
  );
  if (forgotPasswordContainer.style.display === "none") {
    forgotPasswordContainer.style.display = "block";
  } else {
    forgotPasswordContainer.style.display = "none";
  }
}

function sendForgotPasswordEmail() {
  const email = document.getElementById("emailForgot").value;

  spinner.style.display = "block";
  fetch("/api/session/forgotpassword", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      const errorMessageElement = document.getElementById("errorMessage");
      const sucessMessageElement = document.getElementById("sucessMessage");
      if (json.status === "success") {
        errorMessageElement.style.display = "none";
        sucessMessageElement.style.display = "block";
        spinner.style.display = "none";
      } else {
        errorMessageElement.style.display = "block";
        spinner.style.display = "none";
      }
    });
}
