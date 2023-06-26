let searchButton = document.getElementById('search-button');
let weatherInput = document.querySelector('#weather-search');
let repoContainer = document.querySelector('#repo-container');
let repoSearchTerm = document.querySelector('#repo-search-term');
let apiKey = "d68a2ac9d30df41f9d6ca649fb111b00";
let ident = "...";

function getApi(searchTerm) {
    var recipeURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"+apiKey+"&app_id="+ident+"&q="+searchTerm+"&type=public";
    fetch(recipeURL).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data.hits);
            displayRecipes(data.hits);
            saveRecipes(data.hits);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
    });
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var ingrSearch = recipeInput.value.trim();
    if (ingrSearch) {
      getApi(ingrSearch);
      recipeInput.value = '';
    } else {
      alert('Please enter a city to search with');
    }
};

