const apiKey = 'd68a2ac9d30df41f9d6ca649fb111b00';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('city-search');
  const forecastContainer = document.getElementById('forecast-container');

  searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city !== '') {
      getWeatherData(city);
      searchInput.value = '';
    }
  });

  const cityButtons = document.querySelectorAll('.city-option');

  cityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const city = button.textContent;
      getWeatherData(city);
    });
  });

  function displayForecast(forecastArray) {
    forecastContainer.innerHTML = '';

    const currentDate = new Date();
    const currentDayContainer = createForecastItemContainer('Today', forecastArray[0]);
    forecastContainer.appendChild(currentDayContainer);

    for (let i = 1; i < forecastArray.length; i++) {
      const forecast = forecastArray[i];
      const forecastDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const forecastItemContainer = createForecastItemContainer(forecastDate.toLocaleDateString('en-US', { weekday: 'long' }), forecast);
      forecastContainer.appendChild(forecastItemContainer);
    }
  }

  function createForecastItemContainer(day, forecast) {
    const forecastItemContainer = document.createElement('div');
    forecastItemContainer.classList.add('forecast-item');

    const forecastDay = document.createElement('h2');
    forecastDay.textContent = day;

    const forecastDescription = document.createElement('p');
    forecastDescription.textContent = forecast.weather[0].description;

    const forecastTemperature = document.createElement('p');
    forecastTemperature.textContent = `Temperature: ${forecast.main.temp} K`;

    const forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = `Humidity: ${forecast.main.humidity}%`;

    const forecastWindSpeed = document.createElement('p');
    forecastWindSpeed.textContent = `Wind Speed: ${forecast.wind.speed} m/s`;

    forecastItemContainer.appendChild(forecastDay);
    forecastItemContainer.appendChild(forecastDescription);
    forecastItemContainer.appendChild(forecastTemperature);
    forecastItemContainer.appendChild(forecastHumidity);
    forecastItemContainer.appendChild(forecastWindSpeed);

    return forecastItemContainer;
  }

  function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const forecastData = data.list.slice(0, 6);
        displayForecast(forecastData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
});
