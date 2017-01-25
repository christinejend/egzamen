/*
  src/controllers/quick/details.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "hello, world!";

    send( oRequest, oResponse, sEcho );
}
