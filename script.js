const apiKey = '574c0bebdd0130264c8d650decc8db35';
const weatherContainer = document.getElementById('weatherContainer');

async function searchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    
    if (cityInput) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === '404') {
                displayError('City not found');
            } else {
                displayWeather(data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError('An error occurred while fetching weather data');
        }
    } else {
        displayError('Please enter a city');
    }
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherContainer.innerHTML = weatherHTML;
}

function displayError(message) {
    const errorHTML = `<p style="color: red;">${message}</p>`;
    weatherContainer.innerHTML = errorHTML;
}

