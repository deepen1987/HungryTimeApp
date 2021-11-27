import * as utilLocCuisine from "./utilityStateCityCuisine.js"

document.addEventListener("DOMContentLoaded", () => {
    const firstname = document.getElementById("floatingFirstName");
    const lastname = document.getElementById("floatingLastname");
    const email = document.getElementById("floatingEmail");
    const password = document.getElementById("floatingPassword");
    const signup = document.getElementById("signup");
    const state = document.getElementById("floatingState");
    const city = document.getElementById("floatingCity");
    const cuisine = document.getElementById("floatingCuisines");
    const signupForm = document.getElementById("signup-form");

    utilLocCuisine.state.addEventListener("click", utilLocCuisine.getState);
    utilLocCuisine.city.addEventListener("click", utilLocCuisine.getcity);
    utilLocCuisine.cuisine.addEventListener("click", utilLocCuisine.getCuisines);

    signup.addEventListener("click", async () => {

        var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.value.match(validateEmail)) {
            email.classList.add("is-invalid");
        } else {
            email.classList.remove("is-invalid");
            signupForm.classList.add("was-validated");
        }

        let url = `http://localhost:5000/auth/signup`;
        let data = new URLSearchParams({
            firstName: firstname.value,
            lastName: lastname.value,
            state: state.value,
            city: city.value,
            preferences: cuisine.value,
            email: email.value,
            password: password.value,
        });

        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        if (response.ok) {
            window.location.href = "signin.html";
        } else {
            data = await response.json()
        }


    });

});
