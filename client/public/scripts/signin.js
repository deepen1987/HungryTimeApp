
document.addEventListener("DOMContentLoaded", () => {
    const email = document.getElementById("floatingEmail")
    const password = document.getElementById("floatingPassword")
    const signup = document.getElementById("signup");
    const signin = document.getElementById("signin");

    signin.addEventListener("click", () => {

        let url = `http://localhost:5000/auth/login`;
        let data = new URLSearchParams({
            'email': email.value,
            'password': password.value
        })
        let cookie;

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = "index.html"
                console.log(data)
            });


        // console.log(document.cookie)

    });

    signup.addEventListener("click", () => {
        window.location.href = "register.html"
    });


});


// let userName = document.getElementById("floatingUsername")
// let password = document.getElementById("floatingPassword")

// export function signinForm(){
//     const mainForm = document.getElementsByClassName("form-signin");

//     mainForm[0].innerHTML = signinHTML
//     }


