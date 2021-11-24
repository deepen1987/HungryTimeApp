import mongoose from "mongoose";

const TopCityRestaurantsSchema = new mongoose.Schema({
    city: String,
    state: String,
    cuisine_name: String,
    restaurants: {
        type: [{
            restaurant_id: Number,
            restaurant_name: String,
            street: String,
            city: String,
            state: String,
            postal_code: Number,
            latitude: Number,
            longitude: Number,
            stars: Number,
            review_count: Number,
            cuisine_name: String,
        }]
    }

});

const TopCityRestaurants = mongoose.model("topcityrestaurant", TopCityRestaurantsSchema);

export { TopCityRestaurants };