// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyArxYCguc3tHkx_R25E1l8aPffnDZjgodE",
    authDomain: "con-worlds-unit-selection.firebaseapp.com",
    projectId: "con-worlds-unit-selection",
    storageBucket: "con-worlds-unit-selection.appspot.com", // FIXED
    messagingSenderId: "1056963708496",
    appId: "1:1056963708496:web:09c7e564bc2d06ed4ef355",
    measurementId: "G-P7TXFN0PDQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("unitForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const sasf = parseInt(document.getElementById("sasf").value);
    const mrl = parseInt(document.getElementById("mrl").value);
    const tds = parseInt(document.getElementById("tds").value);
    const ah = parseInt(document.getElementById("ah").value);

    db.collection("submissions").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        sasf: sasf,
        mrl: mrl,
        tds: tds,
        ah: ah
    })
    .then(() => {
        document.getElementById("warning").innerText = "Submission successful!";
        console.log("Data added to Firestore!");
    })
    .catch(error => console.error("Error adding document: ", error));
});

