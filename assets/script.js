

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
