import debug from 'debug';
import { Strategy } from 'passport-local';
import passport from 'passport';
import { User, insertUser, validateEmail } from "../../model/user.model.js";

const DEBUG = debug('dev');

const authFields = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

passport.use(
  'login',
  new Strategy(authFields, async (req, email, password, cb) => {
    try {
        // const user = await User.findOne({$or: [{email}, {userName: email}]}); old code updated to check username
        const user = await User.findOne({email});

        if (!user || !user.password) {
            return cb(null, false, { message: 'Incorrect email or password.'});
        }

        const checkPassword = await user.comparePassword(password);

        if (!checkPassword) {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }

        return cb(null, user, {message: 'Logged In Successfully'});

    } catch (err) {
        console.log(err);
        return cb(null, false, {statusCode: 400, message: err.message});
    }
  }),
);

passport.use(
    'signup',
    new Strategy(authFields, async (req, email, password, cb) => {
      try {
        
        const validEmail = validateEmail(email) 
        if(!validEmail) {
          return cb(null, false, {statusCode: 400, message: "Invaild email address."});
        }

        const checkEmail = await User.checkExistingField('email', email);
  
        if (checkEmail) {
          return cb(null, false, {statusCode: 409, message: 'Email already registered, log in instead'});
        }
  
        // Not using username field.

        // const checkUserName = await User.checkExistingField('userName', req.body.userName);
        // if (checkUserName) {
        //   return cb(null, false, {statusCode: 409, message: 'Username exists, please try another'});
        // }
  
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.state = req.body.state;
        newUser.city = req.body.city;
        newUser.preferences = req.body.preferences;
        
        await newUser.save();

        // Inserting records in PostgreSQL Stored Procedure
        insertUser(newUser._id.valueOf(), newUser.city, newUser.state);

        return cb(null, newUser);

      } catch (err) {
          console.log(err);
          return cb(null, false, {statusCode: 400, message: err.message});
      }
    }),
  );

  passport.use(
    'deleteAccount',
    new Strategy(authFields, async (req, email, password, cb) => {
      try {
          const user = await User.findOne({email});
  
          if (!user || !user.password) {
              return cb(null, false, { message: 'Incorrect email or password.'});
          }
  
          const checkPassword = await user.comparePassword(password);
  
          if (!checkPassword) {
              return cb(null, false, {message: 'Incorrect email or password.'});
          }
  
          const deletedUser = await User.findByIdAndDelete(user._id)
          return cb(null, deletedUser, {message: 'Account deleted Successfully'});
  
      } catch (err) {
          console.log(err);
          return cb(null, false, {statusCode: 400, message: err.message});
      }
    }),
  );

  passport.use(
    'resetPassword',
    new Strategy(authFields, async (req, email, password, cb) => {
      try {
          const user = await User.findOne({email});
  
          if (!user || !user.password) {
              return cb(null, false, { message: 'Incorrect email or password.'});
          }
  
          const checkPassword = await user.comparePassword(password);
  
          if (!checkPassword) {
              return cb(null, false, {message: 'Incorrect email or password.'});
          }
          
          if (!req.body.newPassword){
            return cb(null, false, {message: 'New Password is required.'});
          }

          user.password = req.body.newPassword;
          await user.save();
          return cb(null, user);
  
      } catch (err) {
          console.log(err);
          return cb(null, false, {statusCode: 400, message: err.message});
      }
    }),
  );

  export default passport;