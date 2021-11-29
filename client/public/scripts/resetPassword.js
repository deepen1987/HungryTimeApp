if (!getCookie("jwt")) {
    window.location.href = "signin.html";
};

document.addEventListener("DOMContentLoaded", () => {


    const logout = document.getElementById("logout");
    const reset = document.getElementById("reset");
    const email = document.getElementById("floatingEmail");
    const passwordOld = document.getElementById("floatingOldPassword");
    const passwordNew = document.getElementById("floatingPassword");
    const resetForm = document.getElementById("reset-form");
    const resetButton = document.getElementById("resetBtn");
    const inError = document.getElementById("in-error");

    resetButton.addEventListener("click", async () => {

        const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.value.match(validateEmail)) {
            email.classList.add("is-invalid");
        } else {
            email.classList.remove("is-invalid");
            resetForm.classList.add("was-validated");
        }

        if (email.value.match(validateEmail) && passwordOld.value.length >= 8 && passwordNew.value.length >= 8) {

            let url = `http://localhost:5000/auth/resetPassword`;
            let data = new URLSearchParams({
                email: email.value,
                password: passwordOld.value,
                newPassword: passwordNew.value
            });

            const response = await fetch(url, {
                method: "PUT",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            if (response.status === 200) {
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "signin.html";
            } else if (response.status === 401){
                inError.innerHTML = ""
                inError.innerHTML = `Incorrect email or password.`
            }else {
                // data = await response.json()
                // console.log("data")
            }
            
        };

    });

    // Reset Password
    reset.addEventListener("click", () => {
        window.location.href = "resetPassword.html";
    });

    // Logging out
    logout.addEventListener("click", () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "signin.html";
    });


});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}