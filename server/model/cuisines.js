import mongoose from "mongoose";

const CuisinesSchema = new mongoose.Schema({
    city: String,
    state: String,
    cuisines: [ String ]
});

const Cuisines = mongoose.model("cuisines", CuisinesSchema);

export { Cuisines };