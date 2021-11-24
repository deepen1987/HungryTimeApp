import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import validator from "validator";
import pg from "../db/postgreDB.js"

config();

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        max: 50,
        required: [true, "Firstname is required"]
    },
    lastName: {
        type: String,
        max: 50,
        required: [true, "Lastname is required"]
    },
    city: {
        type: String,
        max: 50,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        max: 4,
        required: [true, "State is required"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        required: [true, 'Email is required'],
        unique: true
  },
  password: {
      type: String,
      required: [true, "password is required"],
      minlength: 8,
  },
  newPassword: {
    type: String,
    minlength: 8,
},
preferences: {
    type: [ String ],
    validate: {
        validator: function(value){
            return Array.isArray(value) && !value.length < 1 && value.length < 11
        },
        message: "preferences are required"
    },
    required: true
},
});

userSchema.pre("save", async function (next) {
    if (!this.password || !this.isModified("password")) {
        return next;
    }

    this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH));
    next();
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = function () {
    return jwt.sign({id: this._id}, jwtPrivateSecret, {
        expiresIn: "10d",
        algorithm: "RS256"});
};

userSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await User.findOne({ [`${field}`]: value });
    return checkField;
};

const User = mongoose.model("User", userSchema);

function insertUser(userID, userCity, userState){
    pg.query(`CALL public.insert_in_users('${userID}', '${userCity}', '${userState}')`);
}

export { User, insertUser };