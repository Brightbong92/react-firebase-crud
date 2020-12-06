import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD9doDmgxCaT0-q7gwUCYVN8onpnIBqKSc",
  authDomain: "people-5aeae.firebaseapp.com",
  databaseURL: "https://people-5aeae.firebaseio.com",
  projectId: "people-5aeae",
  storageBucket: "people-5aeae.appspot.com",
  messagingSenderId: "133010569553",
  appId: "1:133010569553:web:202bc3c2334ec05a6d3b70",
  measurementId: "G-4NRSK5RGSF",
};

var fireDb = firebase.initializeApp(firebaseConfig);

//export default fireDb.database().ref();
export default fireDb.firestore();
