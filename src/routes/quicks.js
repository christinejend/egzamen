/*
  src/routes/quicks.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import { Router } from "express";


import list from "../controllers/quick/list";
import listAll from "../controllers/quick/listAll";
import details from "../controllers/quick/details";
import create from "../controllers/quick/create";
import destroy from "../controllers/quick/destroy";
import update from "../controllers/quick/update";


let oRouter = new Router();

oRouter.get( "/quick", list );
oRouter.get( "/quicks", listAll );
oRouter.get( "/quick/:id", details );
oRouter.post( "/quick", create );
oRouter.delete( "/quick/:id", destroy );
oRouter.patch( "/quick/:id", update );

export default oRouter;
