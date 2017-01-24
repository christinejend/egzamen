/*
  src/core/express.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import express from "express";
  import bodyParser from "body-parser";
  import responseTime from "response-time";
  import mitanEko from "mitan-eko";
  import zouti from "zouti";

  import systemRoutes from "../routes/system";
  import quicksRoutes from "../routes/quicks";
  import pagesRoutes from "../routes/pages";

  const APP_PORT = 12345;

  let oApp,
      fInit;

  fInit = function( iAppPort = APP_PORT ) {
      if ( oApp ) {
          return oApp;
      }

      oApp = express();

      // configure middlewares
      oApp.use( mitanEko( "egzamen" ) );
      oApp.use( responseTime() );
      oApp.use( bodyParser.json() );
      oApp.use( bodyParser.urlencoded( {
          "extended": true,
      } ) );

      console.log( `${ __dirname }/../../static` );
      oApp.use( express.static( `${ __dirname }/../../static` ) );

      // configure templates
      oApp.set( "views", `${ __dirname }/../views` );
      oApp.set( "view engine", "pug" );

      // routes
      oApp.use( systemRoutes );
      oApp.use( quicksRoutes );
      oApp.use( pagesRoutes );

      // listening
      oApp.listen( iAppPort, () => {
          zouti.success( `Server is listening on ${ iAppPort }.`, "egzamen" );
      } );
  };

  export {
      fInit as init,
  };
