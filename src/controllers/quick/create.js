/*
  src/controllers/quick/create.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */


  import getQuicks from "../../models/quicks";
  import { send, error } from "../../core/utils/api";
  import checkPosition from "../../core/utils/position";

  export default function( oRequest, oResponse ) {
      const POST = oRequest.body;

      let iLatitude = +POST.latitude,
          iLongitude = +POST.longitude,
          sName = ( POST.name ).trim(),
          sAddress = ( POST.address || "" ).trim(),
          sSlug = ( POST.name || "" ).trim().toLowerCase(),
          aHours = ( POST.hours || "" ).trim(),
          oPosition = checkPosition( iLatitude, iLongitude ),
          oQuick;

      if ( !oPosition ) {
          return error( oRequest, oResponse, "Invalid position", 400 );
      }

      oQuick = {
          "latitude": oPosition.latitude,
          "longitude": oPosition.longitude,
          "created_at": new Date(),
          "updated_at": new Date(),
      };

      sName && ( oQuick.name = sName );
      sSlug && ( oQuick.slug = sSlug );
      sAddress && ( oQuick.address = sAddress );
      aHours && ( oQuick.hours = aHours );

      getQuicks()
          .insertOne( oQuick )
          .then( () => {
              send( oRequest, oResponse, oQuick, 201, {
                  "id": oQuick._id,
                  "name": oQuick.name,
                  "slug": oQuick.slug || null,
                  "address": oQuick.address || null,
                  "hours": oQuick.hours || null,
                  "latitude": oQuick.latitude,
                  "longitude": oQuick.longitude,
              }, 201 );
          } )
          .catch( ( oError ) => error( oRequest, oResponse, oError ) );


  }
