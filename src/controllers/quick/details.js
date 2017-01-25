/*
  src/controllers/quick/details.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

import getQuicks from "../../models/quicks";
import { send, error } from "../../core/utils/api";
import { ObjectID } from "mongodb";
import distance from "jeyo-distans";

import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    let sQuickID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sQuickID ) {
        error( oRequest, oResponse, "Invalid ID!", 400 );
    }

oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

    getQuicks()
        .findOne( {
            "_id": new ObjectID( sQuickID ),
            "deleted_at": null,
        } )
        .then( ( oQuick ) => {
            if ( !oQuick ) {
                return error( oRequest, oResponse, "Unknown Quick", 404 );
            }

            let { _id, name, address, latitude,longitude, hours, empty, slug } = oQuick,
                oCleanQuick;

            oCleanQuick = {
                "id": _id,
                "empty": !!empty, name, address, latitude, longitude, hours, slug
            };

            if ( oCurrentPosition ) {
                oCleanQuick.distance = distance( oCurrentPosition, oCleanQuick ) * 1000;
            }

            send( oRequest, oResponse, oCleanQuick );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
