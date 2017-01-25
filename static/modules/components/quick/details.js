/*
  /static/modules/quicks/details.js task
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import Vue from "vue";
  import reqwest from "reqwest";

  let oQuickDetails = Vue.component( "quick-details", {
      "data": function() {
          return {
              "loaded": false,
              "quick": {},
              "error": null,
          };
      },
      "template": `
          <div class="quick-details">
            <router-link to="/">&lsaquo; retour</router-link>
            <div class="loading" v-if="!loaded">
              <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
              <p>
                <strong>Error:</strong> {{ error }}
              </p>
            </div>
            <div v-if="loaded">
              <h1>Détails du Quick de {{ quick.name }} </h1>
                <h2> {{ quick.slug }} </h2>
                <address class="adrs">{{ quick.address }}</address>
                <ul class="coords">
                  <li> Longitude : {{ quick.longitude }} </li>
                  <li> Latitude : {{ quick.latitude }}</li>
                </ul>
                <ul class=horaire>
                  <h3> Horaire :</h3>
                  <li class="eltH"> Lundi : {{quick.hours[0][0]}} - {{quick.hours[0][1]}} </li>
                  <li class="eltH"> Mardi : {{quick.hours[1][0]}} - {{quick.hours[1][1]}} </li>
                  <li class="eltH"> Mercredi : {{quick.hours[2][0]}} - {{quick.hours[2][1]}} </li>
                  <li class="eltH"> Jeudi : {{quick.hours[3][0]}} - {{quick.hours[3][1]}} </li>
                  <li class="eltH"> Vendredi : {{quick.hours[4][0]}} - {{quick.hours[4][1]}} </li>
                  <li class="eltH"> Samedi : {{quick.hours[5][0]}} - {{quick.hours[5][1]}} </li>
                </ul>
            </div>
        </div>
      `,
      mounted() {
              this.fetchInfos( this.$route.params.id );
      },
      "methods": {
          fetchInfos( sQuickId ) {
                      return reqwest( {
                          "url": `/quick/${ sQuickId }`,
                          "method": "get",
                  } )
                  .then( ( oResponse ) => {
                      let oQuick = oResponse.data;

                      this.loaded = true;
                      this.quick = oQuick;
                  } )
                  .catch( this.showError );
          },
        //  console.log(oQuick);
          showError( { message } ) {
              this.loaded = true;
              this.error = message;
          },
      },
  } );

  export default oQuickDetails;
