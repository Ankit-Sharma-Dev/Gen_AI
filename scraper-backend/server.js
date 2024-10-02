// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;
    const apiKey = "f117bd2af8f215c265d73291a4917add"; // Your Scraper API key

    try {
        const response = await axios.post('https://async.scraperapi.com/jobs', {
            apiKey: apiKey,
            url: url
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product details');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});