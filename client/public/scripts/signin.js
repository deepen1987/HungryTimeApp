document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("floatingEmail");
  const password = document.getElementById("floatingPassword");
  const signup = document.getElementById("signup");
  const signin = document.getElementById("signin");
  const inError = document.getElementById("in-error");

  signin.addEventListener("click", () => {
    let url = `http://localhost:5000/auth/login`;
    let data = new URLSearchParams({
      email: email.value,
      password: password.value,
    });

    if(email.value.trim() !=="" && password.value.trim() !== ""){

      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            inError.innerHTML = ""
            inError.innerHTML = `Incorrect email or password.`
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {

            let key = "jwt";
            let value = encodeURIComponent(data.token);
            let min = 60 * 60 * 1;
            document.cookie = `${key}=${value};path=/;max-age=${min}`;
            window.location.href = "home.html";
          }
        })
        .catch((err) => {
            console.log(err.message)
        });
    }



  });

  signup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
});