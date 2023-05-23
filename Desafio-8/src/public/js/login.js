const form = document.getElementById("loginForm");

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
