import axios from 'axios';
import express from 'express'
import http from 'http';
import { parse } from 'url';
import cors from 'cors'
const app = express()
app.use(cors())
const apiKey = '51c66b3c-c93d-49d6-8c42-b128f10a5332'; // Replace with your actual API key

async function getCryptoData(symbol, convert = 'CAD') {
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${convert}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-CMC_PRO_API_KEY': apiKey,
            },
        });

        if (response.data && response.data.data && response.data.data[symbol]) {
            const cryptoData = response.data.data[symbol];
            const name = cryptoData.name;
            const symbol_response = cryptoData.symbol; // Changed this line
            const price = cryptoData.quote[convert].price;
            const percentChange1h = cryptoData.quote[convert].percent_change_1h;
            const percentChange24h = cryptoData.quote[convert].percent_change_24h;
            const percentChange7d = cryptoData.quote[convert].percent_change_7d;
            const marketCap = cryptoData.quote[convert].market_cap;
            const volume24h = cryptoData.quote[convert].volume_24h;
            const lastUpdated = cryptoData.quote[convert].last_updated;

            return {
                name,
                symbol: symbol_response, // And this line
                price,
                percentChange1h,
                percentChange24h,
                percentChange7d,
                marketCap,
                volume24h,
                lastUpdated,
            };
        } else {
            return { error: 'Crypto data not found' };
        }
    } catch (error) {
        if (error.response) {
            console.error("CoinMarketCap API Error:", error.response.status, error.response.data);
            return { error: `API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}` };
        } else if (error.request) {
            console.error("No response from CoinMarketCap API:", error.request);
            return { error: 'No response from CoinMarketCap API' };
        } else {
            console.error("Error setting up the request:", error.message);
            return { error: `Error setting up the request: ${error.message}` };
        }
    }
}

const server = http.createServer(async (req, res) => {
    const reqUrl = parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;

    if (path === '/crypto') {
        const symbol = query.symbol ? query.symbol.toUpperCase() : 'SOL'; // Default to BTC if no symbol is provided
        const convert = query.convert ? query.convert.toUpperCase() : 'CAD'; // Default to CAD

        const cryptoData = await getCryptoData(symbol, convert);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cryptoData));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = 3500;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
