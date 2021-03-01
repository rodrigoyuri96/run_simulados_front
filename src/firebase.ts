import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCN1-IKyLxi2hUx7NQIAuWEUOhNvwQAEHQ",
    authDomain: "run-simulado.firebaseapp.com",
    databaseURL: "https://run-simulado.firebaseio.com",
    projectId: "run-simulado",
    storageBucket: "run-simulado.appspot.com",
    messagingSenderId: "141689471021",
    appId: "1:141689471021:web:1997df513adaf4a3a3f8a4",
    measurementId: "G-4PQT962C3P"
});

firebaseApp.analytics()


export default firebaseApp;
