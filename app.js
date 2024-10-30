// app.js

const apiKey = "UZFB4jqfuaDsDFKfwN4PCokemAXBwqLM"; // Your Polygon.io API key

// Function to fetch options data
const fetchOptionsData = async (symbol) => {
    try {
        const response = await fetch(`https://api.polygon.io/v3/snapshot/options/${symbol}?apiKey=${apiKey}`);
        const data = await response.json();

        if (data.results) {
            processOptionsData(data.results, symbol);
        } else {
            console.log(`No options data found for ${symbol}`);
        }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
    }
};

// Process and display options data
const processOptionsData = (data, symbol) => {
    const alertsDiv = document.getElementById("alerts");

    // Create a header for the symbol
    const symbolHeader = document.createElement("h2");
    symbolHeader.textContent = `Alerts for ${symbol}`;
    alertsDiv.appendChild(symbolHeader);

    data.forEach(option => {
        if (isHighProbability(option)) {
            const alert = document.createElement("div");
            alert.className = "alert";
            alert.textContent = `${symbol} - Target: ${option.target || 'N/A'} | Stop Loss: ${option.stop || 'N/A'}`;
            alertsDiv.appendChild(alert);
        }
    });
};

// Define high-probability criteria
const isHighProbability = (option) => {
    return option.greeks?.delta > 0.5 && option.open_interest > 100; // Adjust criteria as needed
};

// Fetch data for SPY and QQQ every minute
setInterval(() => {
    document.getElementById("alerts").innerHTML = ""; // Clear previous alerts
    fetchOptionsData("SPY");
    fetchOptionsData("QQQ");
}, 60000);

// Initial data fetch
fetchOptionsData("SPY");
fetchOptionsData("QQQ");
