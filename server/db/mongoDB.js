import mongoose from "mongoose";
import { config } from "dotenv";
import debug from "debug";
config();

const DEBUG = debug("dev");

const mongo_url = process.env.MONGO_DB;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongo_url, options)
  .then( () => { 
      DEBUG("MongoDB is connected");
    })
  .catch( error => {
      DEBUG("MongoDB connection unsuccessful");
      DEBUG(error);
});