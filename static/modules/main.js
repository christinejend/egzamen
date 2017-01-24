/*
  static/modules/main.js
  coded CHRISTINE JEND.
  started at 04/01/2017
  */

  import Vue from "vue";
  import VueRouter from "vue-router";

  Vue.use( VueRouter );

  import QuicksList from "./components/quick/list";
  import QuicksDetails from "./components/quick/details.js";

  let oRouter, oApp;

  oRouter = new VueRouter( {
      "routes": [
          { "path": "/",
            "component": QuicksList },

          { "path": "/:id",
            "component": QuicksDetails },
      ],
  } );

  oApp = new Vue( {
      "template": `
          <div class="wrapper">
              <header>
                  <h1>Egzamen</h1>
              </header>
              <main>
                  <router-view> </router-view>
              </main>
              <footer>
                  <a href="https://github.com/christinejend/egzamen">christinejend/egzamen</a>
              </footer>
          </div>
      `,
      "router": oRouter,
  } );

oApp.$mount( "#app" );
/*
  let oApp = new Vue( {
    "el": "#app",
    "data": {
      "msg": "go one",
    }
  });
*/
