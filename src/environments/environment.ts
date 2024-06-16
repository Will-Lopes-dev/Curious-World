// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const environment = {
  production: true,

  firebaseConfig: {
    apiKey: "AIzaSyAonOTHfDm1X4cAy13hRkANNUJSmOiDhIo",
  authDomain: "curious-world-3f10a.firebaseapp.com",
  databaseURL: "https://curious-world-3f10a-default-rtdb.firebaseio.com",
  projectId: "curious-world-3f10a",
  storageBucket: "curious-world-3f10a.appspot.com",
  messagingSenderId: "14002433224",
  appId: "1:14002433224:web:bfe22dca5afd28f4b289fd",
  measurementId: "G-EVEKXRPVQP",
  },
  // apiKey: "AIzaSyAonOTHfDm1X4cAy13hRkANNUJSmOiDhIo",
  // authDomain: "curious-world-3f10a.firebaseapp.com",
  // databaseURL: "https://curious-world-3f10a-default-rtdb.firebaseio.com",
  // projectId: "curious-world-3f10a",
  // storageBucket: "curious-world-3f10a.appspot.com",
  // messagingSenderId: "14002433224",
  // appId: "1:14002433224:web:bfe22dca5afd28f4b289fd",
  // measurementId: "G-EVEKXRPVQP",
};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
