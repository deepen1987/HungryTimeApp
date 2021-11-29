export const state = document.getElementById("floatingState");
export const city = document.getElementById("floatingCity");
export const cuisine = document.getElementById("floatingCuisines");
// export const addCuisine = document.getElementById("addCuisine");
// const cuisineOptions = document.getElementById("cuisineOptions")
const preferences = [];

let stateClick = 0;
let cityClick = 0;
let cuisineClick = 0;


// Fetching the states from MongoDB
export async function getState() {

    if (stateClick === 0) {

        let url = `http://localhost:5000/user/states`;
        let states, data;

        const response = await fetch(url, { method: "GET" });
        if (response.ok) data = await response.json();
        if (data.status === "success") states = data.data;

        for (const value of states) {
            let option = document.createElement("option");
            option.value = value;
            option.textContent = value;

            state.insertAdjacentElement("beforeend", option);
        }

        stateClick += 1;
    };

    state.onchange = function () {
        city.innerHTML = "";
        // cuisineOptions.innerHTML = "";
        cuisine.innerHTML = "";
        cityClick = 0;
        cuisineClick = 0;
    };

}

// Fetching the cities from MongoDB
export async function getcity() {

    if (cityClick === 0 && state.value !== "") {

        let url = `http://localhost:5000/user/cities?state=${state.value}`;
        let cities, data;

        const response = await fetch(url, { method: "GET" });
        if (response.ok) data = await response.json();
        if (data.status === "success") cities = data.data;

        for (const value of cities) {
            let option = document.createElement("option");
            option.value = value;
            option.textContent = value;

            city.insertAdjacentElement("beforeend", option);
        }

        cityClick += 1;
    };

    city.onchange = function () {
        // cuisineOptions.innerHTML = "";
        cuisine.innerHTML = "";
        cuisineClick = 0;
    };

};

// Fetching the cuisines from MongoDB
export async function getCuisines() {

    if (cuisineClick === 0 && state.value !== "" && city.value !== "") {

        let url = `http://localhost:5000/user/cuisines?state=${state.value}&city=${city.value}`;
        let cuisines, data;

        const response = await fetch(url, { method: "GET" });
        if (response.ok) data = await response.json();
        if (data.status === "success") cuisines = data.data;

        for (const value of cuisines) {
            let option = document.createElement("option");
            option.value = value;
            option.textContent = value;

            cuisine.insertAdjacentElement("beforeend", option);
        }

        cuisineClick += 1;
    }
};

// Creating Cuisine list

