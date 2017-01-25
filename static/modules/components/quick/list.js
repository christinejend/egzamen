/*
  /static/modules/quicks/list.js task
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let oQuicksList = Vue.component( "quicks-list", {
    "data": function() {
        return {
            "loaded": false,
            "error": null,
            "quicks": [],
        };
    },
    "template": `
        <div class="quicks-list">


            <h1>Liste des Quick les plus proches de vous</h1>

            <div class="loading" v-if="!loaded">
                  <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
              <p>
                <strong>Error:</strong> {{ error }}
              </p>
            </div>
            <ul class=infos>
              <li v-for="quick in quicks">
                <router-link :to="quick._id">
                  <h2>{{quick.name}} </h2>
                </router-link>
                  <p class="adrs">Addresse :<address> {{ quick.address}}</address></p>
                <!--  <p>Le quick est {{quick.bstate}}</p>-->
              </li>
            </ul>
        </div>
    `,
    mounted() {
          this.updateQuick();
    },
    "methods": {

        updateQuick() {
            // 1. get user's position
            return getLocation()

              .then( ( { coords } ) => {
                  console.log( "latitude:", coords.latitude );
                       console.log( "longitude:", coords.longitude );
                    // 2. get quicks at position
                    return reqwest( {
                        "url": "/quick",
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                  let oQuick = oResponse.data;

                  this.loaded = true;
                  this.quicks = oQuick;
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oQuicksList;
