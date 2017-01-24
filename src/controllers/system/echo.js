/* leny/kach
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "hello, world!";

    send( oRequest, oResponse, sEcho );
}
