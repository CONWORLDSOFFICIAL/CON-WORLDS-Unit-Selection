const firebaseConfig = {
  apiKey: "AIzaSyArxYCguc3tHkx_R25E1l8aPffnDZjgodE",
  authDomain: "con-worlds-unit-selection.firebaseapp.com",
  projectId: "con-worlds-unit-selection",
  storageBucket: "con-worlds-unit-selection.appspot.com",
  messagingSenderId: "1056963708496",
  appId: "1:1056963708496:web:09c7e564bc2d06ed4ef355",
  measurementId: "G-P7TXFN0PDQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


document.getElementById("unitForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop form submission

    const maxElectronics = 40000;
    const maxSupplies = 40000;
    const maxComponents = 40000;

    const unitCosts = {
        sasf: { electronics: 1600, components: 1500, supplies: 0 },
        mrl: { electronics: 800, components: 0, supplies: 1500 },
        tds: { electronics: 900, components: 0, supplies: 1500 },
        ah: { electronics: 750, components: 900, supplies: 0 }
    };

    const sasf = parseInt(document.getElementById("sasf").value);
    const mrl = parseInt(document.getElementById("mrl").value);
    const tds = parseInt(document.getElementById("tds").value);
    const ah = parseInt(document.getElementById("ah").value);

    let totalElectronics = (sasf * unitCosts.sasf.electronics) +
                           (mrl * unitCosts.mrl.electronics) +
                           (tds * unitCosts.tds.electronics) +
                           (ah * unitCosts.ah.electronics);

    let totalSupplies = (sasf * unitCosts.sasf.supplies) +
                        (mrl * unitCosts.mrl.supplies) +
                        (tds * unitCosts.tds.supplies) +
                        (ah * unitCosts.ah.supplies);

    let totalComponents = (sasf * unitCosts.sasf.components) +
                          (mrl * unitCosts.mrl.components) +
                          (tds * unitCosts.tds.components) +
                          (ah * unitCosts.ah.components);

    if (totalElectronics > maxElectronics || totalSupplies > maxSupplies || totalComponents > maxComponents) {
        document.getElementById("warning").innerText = "Resource limit exceeded! Adjust your selections.";
    } else {
        document.getElementById("warning").innerText = "Submission successful!";

      
    db.collection("submissions").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        sasf: sasf,
        mrl: mrl,
        tds: tds,
        ah: ah
    })
    .then(() => document.getElementById("warning").innerText = "Submission successful!")
    .catch(error => console.error("Error adding document: ", error));

      
        // Send Data to Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbzrTOugW34sq8uTAa2Th9mR9iy_o9AwEqIDxqgH3YxXhNSSGW_OPceDpamWvVe0TGBCVQ/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sasf, mrl, tds, ah })
        });
    }
});
