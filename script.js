document.getElementById("unitForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop form submission

    // Resource Limits
    const maxElectronics = 40000;
    const maxSupplies = 40000;
    const maxComponents = 40000;

    // Unit Costs
    const unitCosts = {
        sasf: { electronics: 1600, components: 1500, supplies: 0 },
        mrl: { electronics: 800, components: 0, supplies: 1500 },
        tds: { electronics: 900, components: 0, supplies: 1500 },
        ah: { electronics: 750, components: 900, supplies: 0 }
    };

    // Get User Selections
    const sasf = parseInt(document.getElementById("sasf").value);
    const mrl = parseInt(document.getElementById("mrl").value);
    const tds = parseInt(document.getElementById("tds").value);
    const ah = parseInt(document.getElementById("ah").value);

    // Calculate Total Resource Usage
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

    // Check if Limits Are Exceeded
    if (totalElectronics > maxElectronics || totalSupplies > maxSupplies || totalComponents > maxComponents) {
        document.getElementById("warning").innerText = "Resource limit exceeded! Adjust your selections.";
    } else {
        document.getElementById("warning").innerText = "Selection submitted successfully!";
    }
});
