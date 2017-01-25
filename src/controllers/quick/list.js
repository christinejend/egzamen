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
// LES QUICKS SONT UNIQUEMENT EN BELGIUE DANS LE DOSSIER

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
            let aCleanQuick,
            bState,
            iCurrentDay = new Date().getDay(),
            iCurrentHours = new Date().getHours() + ( new Date().getMinutes()/60 );


            // clean empty state on Quicks
            aCleanQuick = aQuicks.map( ( {  _id, name, address} ) =>
/*          {
              if ( iCurrentDay >= hours[ iCurrentDay][0] && iCurrentHours <= hours[iCurrentDay][1]) {
                bState = "ouvert";
              }else {
                bState = "fermé";
              }

              return {
                  "id": _id,
                  "bState": bState,
                  "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                  name, address,
              };*/
              ({
                   _id, name, address
                    }));

        // sort by distance
        aCleanQuick.sort( ( oQuickOne, oQuickTwo ) => oQuickOne.distance - oQuickTwo.distance );

        send( oRequest, oResponse, aCleanQuick );
    } )

    .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
