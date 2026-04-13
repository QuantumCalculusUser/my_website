const weatherCodeMap = {
    0: { desc: 'Clear Sky', icon: '\u2600\uFE0F' },
    1: { desc: 'Partly Cloudy', icon: '\u26C5' },
    2: { desc: 'Cloudy', icon: '\u2601\uFE0F' },
    3: { desc: 'Overcast', icon: '\u2601\uFE0F' },
    45: { desc: 'Foggy', icon: '\uD83C\uDF2B\uFE0F' },
    48: { desc: 'Foggy', icon: '\uD83C\uDF2B\uFE0F' },
    51: { desc: 'Light Drizzle', icon: '\uD83C\uDF26\uFE0F' },
    53: { desc: 'Drizzle', icon: '\uD83C\uDF26\uFE0F' },
    55: { desc: 'Heavy Drizzle', icon: '\uD83C\uDF26\uFE0F' },
    61: { desc: 'Rainy', icon: '\uD83C\uDF27\uFE0F' },
    63: { desc: 'Rainy', icon: '\uD83C\uDF27\uFE0F' },
    65: { desc: 'Heavy Rain', icon: '\u26C8\uFE0F' },
    71: { desc: 'Snowing', icon: '\u2744\uFE0F' },
    73: { desc: 'Snowing', icon: '\u2744\uFE0F' },
    75: { desc: 'Heavy Snow', icon: '\u2744\uFE0F' },
    77: { desc: 'Snow Grains', icon: '\u2744\uFE0F' },
    80: { desc: 'Rain Showers', icon: '\uD83C\uDF26\uFE0F' },
    81: { desc: 'Rain Showers', icon: '\uD83C\uDF27\uFE0F' },
    82: { desc: 'Heavy Showers', icon: '\u26C8\uFE0F' },
    85: { desc: 'Snow Showers', icon: '\u2744\uFE0F' },
    86: { desc: 'Heavy Snow Showers', icon: '\u2744\uFE0F' },
    95: { desc: 'Thunderstorm', icon: '\u26C8\uFE0F' },
    96: { desc: 'Thunderstorm', icon: '\u26C8\uFE0F' },
    99: { desc: 'Thunderstorm', icon: '\u26C8\uFE0F' }
};

function getColorScheme(weatherCode, temperature) {
    const root = document.documentElement;
    let primaryColor1;
    let primaryColor2;
    let buttonColor;
    let buttonHover;
    let cardBg;
    let textColor;

    if (weatherCode >= 95) {
        primaryColor1 = '#2a2e4a';
        primaryColor2 = '#3d1e3f';
        buttonColor = '#ff5722';
        buttonHover = '#e64a19';
        cardBg = 'rgba(30, 34, 60, 0.75)';
        textColor = '#ffffff';
    } else if (weatherCode >= 71 || weatherCode === 85 || weatherCode === 86) {
        primaryColor1 = '#a8d8ea';
        primaryColor2 = '#e0f4ff';
        buttonColor = '#0088cc';
        buttonHover = '#0066aa';
        cardBg = 'rgba(240, 250, 255, 0.85)';
        textColor = '#0f2030';
    } else if (weatherCode >= 61 || [80, 81, 82].includes(weatherCode)) {
        primaryColor1 = '#0a5d7e';
        primaryColor2 = '#1a7a9f';
        buttonColor = '#00bcd4';
        buttonHover = '#0097a7';
        cardBg = 'rgba(10, 50, 70, 0.75)';
        textColor = '#f7fbff';
    } else if ((weatherCode >= 45 && weatherCode < 61) || [51, 53, 55].includes(weatherCode)) {
        primaryColor1 = '#78909c';
        primaryColor2 = '#546e7a';
        buttonColor = '#90a4ae';
        buttonHover = '#78909c';
        cardBg = 'rgba(220, 230, 235, 0.85)';
        textColor = '#28343f';
    } else if (weatherCode >= 2) {
        primaryColor1 = '#546e7a';
        primaryColor2 = '#78909c';
        buttonColor = '#90caf9';
        buttonHover = '#64b5f6';
        cardBg = 'rgba(95, 120, 135, 0.75)';
        textColor = '#f7fbff';
    } else if (temperature >= 30) {
        primaryColor1 = '#ff6f00';
        primaryColor2 = '#ff8f00';
        buttonColor = '#ffa726';
        buttonHover = '#ff9800';
        cardBg = 'rgba(255, 230, 190, 0.9)';
        textColor = '#2a1600';
    } else if (temperature >= 20) {
        primaryColor1 = '#ffa726';
        primaryColor2 = '#ffb74d';
        buttonColor = '#66bb6a';
        buttonHover = '#4caf50';
        cardBg = 'rgba(255, 245, 220, 0.85)';
        textColor = '#222222';
    } else if (temperature >= 10) {
        primaryColor1 = '#4db6ac';
        primaryColor2 = '#26a69a';
        buttonColor = '#42a5f5';
        buttonHover = '#2196f3';
        cardBg = 'rgba(210, 245, 250, 0.85)';
        textColor = '#102a33';
    } else {
        primaryColor1 = '#29b6f6';
        primaryColor2 = '#0288d1';
        buttonColor = '#ab47bc';
        buttonHover = '#7b1fa2';
        cardBg = 'rgba(220, 240, 255, 0.9)';
        textColor = '#102a33';
    }

    root.style.setProperty('--primary-color-1', primaryColor1);
    root.style.setProperty('--primary-color-2', primaryColor2);
    root.style.setProperty('--background-color', primaryColor1);
    root.style.setProperty('--button-color', buttonColor);
    root.style.setProperty('--button-hover', buttonHover);
    root.style.setProperty('--card-bg', cardBg);
    root.style.setProperty('--primary-color-text', textColor);
}

async function getCoordinates(cityName) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert('City not found!');
            return null;
        }

        const [result] = data.results;
        return {
            name: result.name,
            country: result.country || '',
            latitude: result.latitude,
            longitude: result.longitude
        };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        alert('Error fetching location data!');
        return null;
    }
}

async function fetchWeatherData(coords) {
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=celsius`;
    const response = await fetch(forecastUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

function formatDayLabel(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
}

function renderCurrentWeather(coords, data) {
    const current = data.current;
    const weatherInfo = weatherCodeMap[current.weather_code] || {
        desc: 'Unknown',
        icon: '\uD83C\uDF24\uFE0F'
    };

    getColorScheme(current.weather_code, current.temperature_2m);

    document.getElementById('city-name').textContent = coords.country ? `${coords.name}, ${coords.country}` : coords.name;
    document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}\u00B0C`;
    document.getElementById('description').textContent = weatherInfo.desc;
    document.getElementById('humidity').textContent = `Humidity: ${Math.round(current.relative_humidity_2m)}%`;
    document.getElementById('wind-speed').textContent = `Wind: ${Math.round(current.wind_speed_10m)} km/h`;
    document.getElementById('weather-icon').textContent = weatherInfo.icon;
}

function renderForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    const dailyData = data.daily;
    const forecastDays = dailyData.time.slice(0, 5);

    forecastContainer.innerHTML = forecastDays.map((dateString, index) => {
        const weatherCode = dailyData.weather_code[index];
        const weatherInfo = weatherCodeMap[weatherCode] || {
            desc: 'Unknown',
            icon: '\uD83C\uDF24\uFE0F'
        };
        const maxTemp = Math.round(dailyData.temperature_2m_max[index]);
        const minTemp = Math.round(dailyData.temperature_2m_min[index]);

        return `
            <div class="forecast-day">
                <div class="day">${formatDayLabel(dateString)}</div>
                <div class="icon">${weatherInfo.icon}</div>
                <div class="temp">${maxTemp}\u00B0C / ${minTemp}\u00B0C</div>
                <div class="desc">${weatherInfo.desc}</div>
            </div>
        `;
    }).join('');
}

async function updateWeather(cityName) {
    const coords = await getCoordinates(cityName);
    if (!coords) return;

    try {
        const data = await fetchWeatherData(coords);
        renderCurrentWeather(coords, data);
        renderForecast(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Error fetching weather data! Check console for details.');
    }
}

function searchWeather() {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        updateWeather(cityInput);
    }
}

document.getElementById('search-btn').addEventListener('click', searchWeather);
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

updateWeather('new york');
