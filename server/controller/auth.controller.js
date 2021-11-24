import passport from "passport";
import debug from "debug";
import passportLocal from "../services/passport/passport-local.js";
import { ApplicationError } from "../helpers/errors.js";

const DEBUG = debug("dev");

// We are sending response from here...
const createCookieFromToken = (user, statusCode, req, res) => {
  const token = user.generateVerificationToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true, secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  };
  // console.log(cookieOptions.expires.toUTCString())
  res.cookie("jwt-hungry", token, cookieOptions);
  res.status(statusCode).json({status: "success", token, data: {user}});
};

export default {
  signup: async (req, res, next) => {
    passport.authenticate(
      "signup",
      { session: false },
      async (err, user, info) => {
        try {
          if (err || !user) {
            const { statusCode = 400, message } = info;
            return res.status(statusCode).json({status: "error", error: {message}});
          }
          createCookieFromToken(user, 201, req, res);

        } catch (error) {
          console.log(error);
          throw new ApplicationError(500, error);
        }
      }
    )(req, res, next);
  },

  deleteAccount: async (req, res, next) => {
    passport.authenticate(
      'deleteAccount', { session: false }, async (err, user, info) => {
        if (err || !user) {
          let message = err;
          if (info) {
            message = info.message;
          }
          return res.status(401).json({status: "error", error: {message}});
        }
        res.status(200).json({status: "success", data: {message: "Account Deleted Successfully."}});
      })(req, res, next);
  },

  resetPassword: async (req, res, next) => {
    passport.authenticate(
      'resetPassword', { session: false }, async (err, user, info) => {
        if (err || !user) {
          let message = err;
          if (info) {
            message = info.message;
          }
          return res.status(401).json({status: "error", error: {message}});
        }
        // generate a signed json web token with the contents of user object and return it in the response
        createCookieFromToken(user, 200, req, res);
      })(req, res, next);
  },

  login: (req, res, next) => {
    passport.authenticate("login", {session: false}, (err, user, info) => {
      if (err || !user) {
        let message = err;
        if (info) {
          message = info.message;
        }
        return res.status(401).json({status: "error", error: {message}});
      }
      // generate a signed json web token with the contents of user object and return it in the response
      createCookieFromToken(user, 200, req, res);
    })(req, res, next);
  },

  protectedRoute: async (req, res) => {
    res.status(200).json({status: "success", data: {message: "Congratulations"}});
  }

};