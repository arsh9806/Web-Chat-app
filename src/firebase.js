import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAoI102DIc73gmxCjkfZtF4GoFAnrpsp58",
    authDomain: "whatsapp-clone-51192.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-51192.firebaseio.com",
    projectId: "whatsapp-clone-51192",
    storageBucket: "whatsapp-clone-51192.appspot.com",
    messagingSenderId: "1098334263393",
    appId: "1:1098334263393:web:6db6c181b44d8083637220",
    measurementId: "G-NNYB79PHG7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;