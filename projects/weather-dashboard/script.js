// Simulated weather data
const weatherData = {
    'new york': {
        city: 'New York',
        temperature: 22,
        description: 'partly cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '⛅'
    },
    'london': {
        city: 'London',
        temperature: 18,
        description: 'rainy',
        humidity: 80,
        windSpeed: 8,
        icon: '🌧️'
    },
    'tokyo': {
        city: 'Tokyo',
        temperature: 26,
        description: 'sunny',
        humidity: 70,
        windSpeed: 5,
        icon: '☀️'
    },
    'mumbai': {
        city: 'Mumbai',
        temperature: 32,
        description: 'hot and humid',
        humidity: 85,
        windSpeed: 15,
        icon: '🌡️'
    }
};

const defaultCities = ['new york', 'london', 'tokyo', 'mumbai'];

function getWeatherIcon(description) {
    const icons = {
        'sunny': '☀️',
        'partly cloudy': '⛅',
        'cloudy': '☁️',
        'rainy': '🌧️',
        'hot and humid': '🌡️',
        'snowy': '❄️',
        'stormy': '⛈️'
    };
    return icons[description] || '☀️';
}

function displayWeather(cityKey) {
    const data = weatherData[cityKey.toLowerCase()];
    if (!data) {
        alert('City not found! Try New York, London, Tokyo, or Mumbai.');
        return;
    }

    document.getElementById('city-name').textContent = data.city;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind: ${data.windSpeed} km/h`;
    document.getElementById('weather-icon').textContent = data.icon;
}

function displayForecast() {
    const forecastContainer = document.getElementById('forecast-container');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    forecastContainer.innerHTML = days.map((day, index) => {
        const temp = Math.floor(Math.random() * 15) + 15; // Random temp between 15-30
        const descriptions = ['sunny', 'partly cloudy', 'cloudy', 'rainy'];
        const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
        const icon = getWeatherIcon(desc);

        return `
            <div class="forecast-day">
                <div class="day">${day}</div>
                <div class="icon">${icon}</div>
                <div class="temp">${temp}°C</div>
                <div class="desc">${desc}</div>
            </div>
        `;
    }).join('');
}

function searchWeather() {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        displayWeather(cityInput);
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', searchWeather);
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize with default city
displayWeather('new york');
displayForecast();