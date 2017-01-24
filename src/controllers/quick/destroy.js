/*
  src/controllers/quick/destroy.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

import { ObjectID } from "mongodb";
import { send, error } from "../../core/utils/api";
import getQuicks from "../../models/quicks";

export default function( oRequest, oResponse ) {

    let oQuickID;

    try {
        oQuickID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    getQuicks()
        .deleteOne( {
            "_id": oQuickID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deletion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
