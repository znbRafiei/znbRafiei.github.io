const apiUrl = "https://converter2.liara.run/convert/";

async function convertWeight() {
    const value = document.getElementById("value").value;
    const unit = document.getElementById("unit_to").value;
    const resultDiv = document.getElementById("responseMessage");

    if (!value || isNaN(value)) {
        resultDiv.innerText = "Please enter a valid number.";
        return;
    }
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                value: parseFloat(value),
                unit_to: unit
            })
        })

        if (response.ok) {
            const result = await response.json();
            resultDiv.innerText = unit + " " + result;
        } else {
            const error = await response.json();
            resultDiv.innerText = `Error: ${error.error}`;
        }
    } catch (error) {
        resultDiv.innerText = "Error connecting to the server.";
    }
}
