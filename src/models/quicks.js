/*
  src/models/quicks.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

import { db } from "../core/mongodb";
/*
let fCheckQuick;

fCheckQuick = function( sQuickID ) {
    let oQuickID;

    if ( !sQuickID ) {
        return Promise.resolve( false );
    }

    try {
        oQuickID = new ObjectID( sQuickID );
    } catch ( oError ) {
        return Promise.reject( new Error( "Invalid Quick ID!" ) );
    }

    return db.collection( "quicks" )
        .findOne( {
            "_id": oQuickID,
        } )
        .then( ( oQuick ) => {
            if ( oQuick ) {
                return Promise.resolve( true );
            }

            return Promise.reject( new Error( "Unknown Quick!" ) );
        } );
};
*/

export default function() {
    return db.collection( "quicks" );
}
/*

export {
    fCheckQuick as checkQuick,
};
*/
