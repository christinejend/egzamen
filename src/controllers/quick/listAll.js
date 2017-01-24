/*
  src/controllers/quick/list.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */
  import getQuicks from "../../models/quicks";
  import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
  getQuicks()
      .find()
      .toArray()
      .then( ( aQuicks) => {
           send( oRequest, oResponse, aQuicks );
      } )
    .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
