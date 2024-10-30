const apiKey = "UZFB4jqfuaDsDFKfwN4PCokemAXBwqLM"; // Your Polygon.io API key

// Function to fetch options data (mock version for testing)
const fetchOptionsData = async (symbol) => {
    console.log(`Fetching data for ${symbol}`); // Log fetching

    // Mock data for SPY options
    const mockData = {
        results: [
            {
                greeks: { delta: 0.6 },
                open_interest: 150,
                target: '450',
                stop: '440',
            },
            {
                greeks: { delta: 0.3 },
                open_interest: 80,
                target: '460',
                stop: '455',
            }
        ]
    };

    // Simulate a delay like a real API call
    setTimeout(() => {
        processOptionsData(mockData.results, symbol);
    }, 1000); // Simulating network delay of 1 second
};

// Process and display options data
const processOptionsData = (data, symbol) => {
    const alertsDiv = document.getElementById("alerts");

    // Clear previous content
    alertsDiv.innerHTML = ""; 

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

// Fetch data for SPY every minute (mocked)
setInterval(() => {
    fetchOptionsData("SPY");
}, 60000);

// Initial data fetch
fetchOptionsData("SPY");
