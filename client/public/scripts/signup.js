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
    const inError = document.getElementById("in-error");

    utilLocCuisine.state.addEventListener("click", utilLocCuisine.getState);
    utilLocCuisine.city.addEventListener("click", utilLocCuisine.getcity);
    utilLocCuisine.cuisine.addEventListener("click", utilLocCuisine.getCuisines);

    signup.addEventListener("click", async () => {

        const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

        if(password.value.trim() === ""){
            password.value= "";
        }

        let fieldsPopulated = false;
        if (email.value.match(validateEmail) && firstname.value.length > 0 && lastname.value.length > 0 && state.value.length > 0 && city.value.length > 0 && cuisine.value.length > 0 && password.value.length >= 8 && email.value.trim() !=="" && password.value.trim() !== "") {
            fieldsPopulated = true;
        }

        if (fieldsPopulated) {

            const response = await fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            if (response.status === 201) {
                window.location.href = "signin.html";
            } else if (response.status === 409) {
                window.location.href = "signupError.html"
                inError.innerHTML = ""
                inError.innerHTML = "Email already registered."
            } else {
                // data = await response.json()
                // console.log("data")
            }
        }


    });

});
