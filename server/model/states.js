import mongoose from "mongoose";

const StatesSchema = new mongoose.Schema({
    states: [ String ]
});

const States = mongoose.model("states", StatesSchema);

export { States };