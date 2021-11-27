import passport from "passport";
import debug from "debug";
import passportLocal from "../services/passport/passport-local.js";
import { ApplicationError } from "../helpers/errors.js";
import { RestaurantRecommendation } from "../model/restaurant.recommendation.js"
import { TopCityRestaurants } from "../model/city.restaurants.js";
import { Cuisines } from "../model/cuisines.js";
import { Cities } from "../model/cities.js";
import { States } from "../model/states.js"

const DEBUG = debug("dev");

export default {
    userRecommendation: async (req, res) => {
        const userID = req.user._id.valueOf()

        const restaurants = await RestaurantRecommendation.findById(userID).select("cuisines ")
        
        if (req.headers.origin == "http://localhost:8888" || req.headers.origin == "http://localhost:3001" ) {
            res.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
        }
        
        res.header('Access-Control-Allow-Credentials', true);
        res.status(200).json({ status: "success", data: restaurants });
    },
    cityRecommendation: async (req, res) => {
        const cityRec = req.query.city
        const stateRec = req.query.state
        const cuisineNameRec = req.query.cuisine

        const cityRestaurants = await TopCityRestaurants
            .find({ state: stateRec, city: cityRec, cuisine_name: cuisineNameRec }).select("restaurants -_id");
        res.status(200).json({ status: "success", data: cityRestaurants[0].restaurants });
    },
    cuisines: async (req, res) => {
        const cityReq = req.query.city
        const stateReq = req.query.state

        const cuisines = await Cuisines.find({ state: stateReq, city: cityReq });
        res.status(200).json({ status: "success", data: cuisines[0].cuisines });
    },
    cities: async (req, res) => {
        const stateReq = req.query.state

        const cities = await Cities.find({ state: stateReq });
        res.status(200).json({ status: "success", data: cities[0].cities });
    },
    states: async (req, res) => {
        const states = await States.find().select("states -_id");
        res.status(200).json({ status: "success", data: states[0].states });
    }

};