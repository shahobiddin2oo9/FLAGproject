let form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let user = {
    email: this.elements.email.value,
    password: this.elements.password.value,
  };
  console.log(user);

  try {
    let data = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": " reqres-free-v1",
      },
      body: JSON.stringify(user),
    });
    if (data.ok) {
      location.href = "../index.html";
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
