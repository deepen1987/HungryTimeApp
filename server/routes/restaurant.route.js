import { Router } from "express";
import restController from "../controller/restaurant.controller.js";
import catchAsync from "../middleware/catchAsync.js";
import authenticate from '../middleware/authenticate.js';

const { userRecommendation, cityRecommendation, cuisines, cities, states } = restController;

const restRouter = Router();

restRouter.get('/userRec', authenticate, catchAsync(userRecommendation));
restRouter.get('/cityRec', authenticate, catchAsync(cityRecommendation));
restRouter.get('/cuisines', authenticate, catchAsync(cuisines));
restRouter.get('/cities', authenticate, catchAsync(cities));
restRouter.get('/states', authenticate, catchAsync(states));

export default restRouter;