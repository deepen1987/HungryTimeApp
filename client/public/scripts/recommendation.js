
export async function userRecommendation() {

    const recommendedRestaurants = document.getElementById("recommended-restaurants");

    let data;
    let url = `http://localhost:5000/user/userRec`;
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        mode: "cors"
    })
    data = await response.json();
    const userID = data.data._id;
    const cuisineList = data.data.cuisines;

    for (const cuisine of cuisineList) {

        for (const restaurant of cuisine.restaurants) {

            const searchAddress = restaurant.restaurant_name.replace(" ", "+") + "+" + restaurant.city + "+" + restaurant.state
            const restaurantCard = `<a href="https://www.google.com/maps/search/?api=1&query=${searchAddress}" target="_blank" class="geo-link">
                    <div class="card mb-4 rounded-3 shadow-sm card-shadow">
                    <div class="card-header py-3 card-design">
                        <h4 class="my-0 fw-normal">${restaurant.restaurant_name}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                            <li><img src="./images/restaurant_black_24dp.svg" alt=""> ${restaurant.cuisine_name}</li>
                            <li>${restaurant.stars}<img src="./images/star_rate_white_24dp.svg" alt="">  ${restaurant.review_count} Reviews</li>
                            <li><img src="./images/place_black_24dp.svg" alt=""> ${restaurant.street}, ${restaurant.city} ${restaurant.state}-${restaurant.postal_code}</li>
                        </ul>
                        <!-- <button type="button" class="w-100 btn btn-lg btn-primary">Submit Rating</button> -->
                    </div>
                </div>
                </a>`;
            let div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = restaurantCard;
            recommendedRestaurants.insertAdjacentElement("beforeend", div);
        }
    }
};

export async function cityRecommendation(city, state, cuisine) {

    const recommendedRestaurants = document.getElementById("recommended-restaurants");
    recommendedRestaurants.innerHTML = "";

    let data;
    let url = `http://localhost:5000/user/cityRec?city=${city}&state=${state}&cuisine=${cuisine}`;
    const response = await fetch(url, { method: "GET" })
    data = await response.json();
    const restaurants = data.data;


    for (const restaurant of restaurants) {

        const searchAddress = restaurant.restaurant_name.replace(" ", "+") + "+" + restaurant.city + "+" + restaurant.state
        const restaurantCard = `<a href="https://www.google.com/maps/search/?api=1&query=${searchAddress}" target="_blank" class="geo-link">
        <div class="card mb-4 rounded-3 shadow-sm card-shadow">
                    <div class="card-header py-3 card-design">
                        <h4 class="my-0 fw-normal">${restaurant.restaurant_name}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                        <li><img src="./images/restaurant_black_24dp.svg" alt=""> ${restaurant.cuisine_name}</li>
                        <li>${restaurant.stars}<img src="./images/star_rate_white_24dp.svg" alt="">  ${restaurant.review_count} Reviews</li>
                        <li><img src="./images/place_black_24dp.svg" alt=""> ${restaurant.street}, ${restaurant.city} ${restaurant.state}-${restaurant.postal_code}</li>
                        </ul>
                        <!-- <button type="button" class="w-100 btn btn-lg btn-primary">Sign up for free</button> -->
                    </div>
                </div>
                </a>`
        let div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = restaurantCard;
        recommendedRestaurants.insertAdjacentElement("beforeend", div);
    }

}




