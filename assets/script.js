const apiKey = 'd68a2ac9d30df41f9d6ca649fb111b00';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('city-search');
    const city = searchInput.value;

    if (city.trim() !== '') {
      getWeatherData(city);
      searchInput.value = '';
    }
  });
});

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data);
      displayForecast(data.list); // Pass the forecast array to the display function
    })
    .catch(error => {
      // Handle any errors that occurred during the API request
      console.log('An error occurred:', error);
    });
}

function displayForecast(forecastArray) {
  const forecastContainer = document.getElementById('forecast-container');

  // Clear previous forecast data
  forecastContainer.innerHTML = '';

  // Loop through the forecast array
  forecastArray.forEach(forecast => {
    const forecastItem = document.createElement('div');
    forecastItem.textContent = forecast.weather[0].description; // Display the weather description

    // Add the forecast item to the container
    forecastContainer.appendChild(forecastItem);
  });
}
