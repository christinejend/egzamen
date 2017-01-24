/*
  src/routes/pages.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */


import { Router } from "express";

import homepageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;
