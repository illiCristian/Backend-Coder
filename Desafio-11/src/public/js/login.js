const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status === "success") {
        localStorage.setItem("token", json.acces_token);
        window.location.href = "/products";
      } else {
        alert(json.error);
      }
    });
});

/* const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  try {
    const response = await fetch("/api/session/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      window.location.href = "/products";
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
 */
