import mongoose from "mongoose";

const RestaurantRecommendationSchema = new mongoose.Schema({
    cuisines: {
        type: [ { 
            cuisine_name: String,
            restaurants: [ {
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
            } ]
        } ]
    }
});

const RestaurantRecommendation = mongoose.model("restaurantrecommendation", RestaurantRecommendationSchema);

export { RestaurantRecommendation };