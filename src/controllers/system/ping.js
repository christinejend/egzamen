/* leny/kach
 *
 * /src/controllers/system/ping.js - Controller for system ping
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    send( oRequest, oResponse, true );
}
