
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

            const restaurantCard = `<div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">${restaurant.restaurant_name}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Cuisine: ${restaurant.cuisine_name}</li>
                            <li>Address: ${restaurant.street} ${restaurant.city} ${restaurant.state} ${restaurant.postal_code}</li>
                            <li>Stars: ${restaurant.stars}</li>
                            <li>Review Count: ${restaurant.review_count}</li>
                        </ul>
                        <!-- <button type="button" class="w-100 btn btn-lg btn-primary">Submit Rating</button> -->
                    </div>
                </div>`;
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

        const restaurantCard = `<div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">${restaurant.restaurant_name}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Cuisine: ${restaurant.cuisine_name}</li>
                            <li>Address: ${restaurant.street} ${restaurant.city} ${restaurant.state} ${restaurant.postal_code}</li>
                            <li>Stars: ${restaurant.stars}</li>
                            <li>Review Count: ${restaurant.review_count}</li>
                        </ul>
                        <!-- <button type="button" class="w-100 btn btn-lg btn-primary">Sign up for free</button> -->
                    </div>
                </div>`
        let div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = restaurantCard;
        recommendedRestaurants.insertAdjacentElement("beforeend", div);
    }

}




