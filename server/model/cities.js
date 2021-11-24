import mongoose from "mongoose";

const CitiesSchema = new mongoose.Schema({
    state: String,
    cities: [ String ]
});

const Cities = mongoose.model("cities", CitiesSchema);

export { Cities };