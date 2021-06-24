// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC5pkmnPgxN2fF58oCj47RMMQBBoqJXTyc",
    authDomain: "escommerce-6dadb.firebaseapp.com",
    databaseURL: "https://escommerce-6dadb-default-rtdb.firebaseio.com",
    projectId: "escommerce-6dadb",
    storageBucket: "gs://escommerce-6dadb.appspot.com",
    messagingSenderId: "963353940793",
    appId: "1:963353940793:web:168c75d0b777d32a230ee8",
    measurementId: "G-G7D0QTM0PQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var defaultStorage = firebase.storage();