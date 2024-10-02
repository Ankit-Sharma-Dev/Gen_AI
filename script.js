// script.js
document.getElementById('fetchBtn').addEventListener('click', async () => {
    const url = document.getElementById('productUrl').value;
    const apiKey = "f117bd2af8f215c265d73291a4917add"; // Replace with your actual API key
    const apiUrl = `https://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiUrl);

        // Log the raw response for debugging
        const text = await response.text();
        console.log(text); // Log raw response

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Try to parse the response as JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            document.getElementById('result').innerText = 'Error parsing product details';
            return;
        }

        displayResult(data);
        
    } catch (error) {
        document.getElementById('result').innerText = 'Error fetching product details';
        console.error(error);
    }
});

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Check if data contains expected fields
    if (data && data.ip) {
        resultDiv.innerHTML += `<h2>Response from Scraper API:</h2>`;
        resultDiv.innerHTML += `<p>Your IP: ${data.ip}</p>`;
    } else {
        resultDiv.innerHTML += `<p>No valid IP returned from Scraper API.</p>`;
    }
}