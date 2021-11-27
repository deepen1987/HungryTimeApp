document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("floatingEmail");
  const password = document.getElementById("floatingPassword");
  const signup = document.getElementById("signup");
  const signin = document.getElementById("signin");

  signin.addEventListener("click", () => {
    let url = `http://localhost:5000/auth/login`;
    let data = new URLSearchParams({
      email: email.value,
      password: password.value,
    });

    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          let key = "jwt";
          let value = encodeURIComponent(data.token);
          let min = 60 * 60 * 1;
          document.cookie = `${key}=${value};path=/;max-age=${min}`;
          window.location.href = "index.html";
        }
      })
      .catch((err) => console.log(err.message));

    // console.log(document.cookie)
  });

  signup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
});

// let userName = document.getElementById("floatingUsername")
// let password = document.getElementById("floatingPassword")

// export function signinForm(){
//     const mainForm = document.getElementsByClassName("form-signin");

//     mainForm[0].innerHTML = signinHTML
//     }
