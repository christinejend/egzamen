/*
  src/models/quicks.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */
  
import { db } from "../core/mongodb";

export default function() {
    return db.collection( "quicks" );
}
