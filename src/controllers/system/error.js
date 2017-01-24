/* leny/kach
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    error( oRequest, oResponse, { "message": "There's an error!" } );
}
