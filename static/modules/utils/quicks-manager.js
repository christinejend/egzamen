/*
  /static/modules/utlis/quicks-manager.js task
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import reqwest from "reqwest";

  // NOTE: the goal here is to have a function, which can be called with or without a QuickID, and will fetch banks from server, caching it in a variable, to avoid reloading all over again

  let oQuick = {};

  export default function( sQuickId = null ) {
      if ( sQuickId && oQuick[ sQuickId ] ) {
          return oQuick[ sQuickId ];
      }

      return reqwest( {
          "url": "/quick",
          "method": "get",
          "data": {
              "country": "BE", // NOTE: it's hardcoded. Not really good.
          },
      } )
          .then( ( oResponse ) => {
              for ( let oQuick of oResponse.data ) {
                  oQuick[ oQuick.id ] = oQuick;
              }

              return oQuick[ sQuickId ] || null;
          } );
  }
