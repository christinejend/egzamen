/*
  src/controllers/quick/list.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */
  import getQuicks from "../../models/quicks";
  import { send, error } from "../../core/utils/api";
  import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const ARC_KILOMETER = 0.009259, // 1 décimale de lat/lng vaut X km.
    DEFAULT_RADIUS = 7, // aussi haut car j'habite trop loin d'un quick -> alleur
    MAX_RADIUS = 10;

  export default function( oRequest, oResponse ) {
/* LES QUICKS SONT UNIQUEMENT EN BELGIUE DANS LE DOSSIER
      let sCountryCode = ( oRequest.query.country || "" ).toUpperCase();

      if ( !sCountryCode ) {
          error( oRequest, oResponse, "Mandatory country query params not found!", 400 );
      }
*/

let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
      iSearchRadius = +oRequest.query.radius;

  if ( !oCurrentPosition ) {
      return error( oRequest, oResponse, "Invalid position!", 400 );
  }

  isNaN( iSearchRadius ) && ( iSearchRadius = DEFAULT_RADIUS );
  ( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
  ( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );

  iSearchRadius *= ARC_KILOMETER; // convert radius from kilometer to arc

      getQuicks()
          .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude": {
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
            "deleted_at": null,
        }  )
          .toArray()
          .then( ( aQuicks = [] ) => {
            let aCleanQuick/*,
            aQuickToReset = []*/;

            // clean empty state on Quicks, clean useless properties AND compute distance
            aCleanQuick = aQuicks.map( ( {  _id, name, address } ) => ({
               _id, name, address
                }));

        // sort by distance
        aCleanQuick.sort( ( oQuickOne, oQuickTwo ) => oQuickOne.distance - oQuickTwo.distance );

        send( oRequest, oResponse, aCleanQuick );
    } )

    .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
