import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApLPBQkM4qTWZejNZNADhqpilEQV8p080",
    authDomain: "shopping-cart-485ed.firebaseapp.com",
    databaseURL: "https://shopping-cart-485ed.firebaseio.com",
    projectId: "shopping-cart-485ed",
    storageBucket: "shopping-cart-485ed.appspot.com",
    messagingSenderId: "62586888407",
    appId: "1:62586888407:web:64e026e8246ad47eff1092",
    measurementId: "G-H13V8CS4VX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;