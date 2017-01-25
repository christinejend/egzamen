/*
  src/controllers/quick/update.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import { ObjectID } from "mongodb";

  import getQuicks from "../../models/quicks";
  import { send, error } from "../../core/utils/api";
  import distance from "jeyo-distans";
  import checkPosition from "../../core/utils/position";

  const MAX_MOVE_DISTANCE = 1; // in km

  export default function( oRequest, oResponse ) {

    // 1. get values

    const POST = oRequest.body;

    let oQuickID,
        sAddress = ( POST.address || "" ).trim(),
        bEmpty = !!POST.empty,
        iLatitude = POST.latitude,
        iLongitude = POST.longitude,
        aModifications = [],
        oPosition;

    try {
        oQuickID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    // 2. check if Quick exists

    getQuicks()
        .findOne( {
            "_id": oQuickID,
        } )
        .then( ( oQuick ) => {
            if ( !oQuick ) {
                return error( oRequest, oResponse, new Error( "Unknown Quick" ), 404 );
            }
            // 3. check values

            // 3a. check position
            if ( iLatitude != null && iLongitude != null ) {
                oPosition = checkPosition( +iLatitude, +iLongitude );
                if ( !oPosition ) {
                    return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
                }

                // if position ≠ old position, check move distance
                if ( oQuick.latitude !== oPosition.latitude || oQuick.longitude !== oPosition.longitude ) {
                    if ( distance( oPosition, oQuick ) > MAX_MOVE_DISTANCE ) {
                        return error( oRequest, oResponse, new Error( "Movement is too big" ), 400 );
                    }
                    oQuick.latitude = oPosition.latitude;
                    oQuick.longitude = oPosition.longitude;
                    aModifications.push( "latitude", "longitude" );
                }
            }
            // 3b. check address
          if ( sAddress ) {
              oQuick.address = sAddress;
              aModifications.push( "address" );
          }
        

          let oModificationsToApply = {};

          aModifications.forEach( ( sPropertyName ) => {
                  oModificationsToApply[ sPropertyName ] = oQuick[ sPropertyName ];
              } );

              oModificationsToApply.updated_at = new Date();

          return getQuicks()

                      .updateOne( {
                          "_id": oQuick._id,
                      }, {
                          "$set": oModificationsToApply,
                      } )
                      .then( ( { matchedCount, modifiedCount } ) => {
                          if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                              return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                          }

                          return send( oRequest, oResponse, null, 204 );

                      } );
                } )
                .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
