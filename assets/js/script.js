var apiUrlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=Anaheim&units=imperial&appid=b2f5c5fd56830b2ca51bd32529509771"
var inputEl = document.querySelector("#city")
var submitButtonEl = document.querySelector("#city-submit")





//handler for current weather submit button currentWeather
var currentWeather = function (city) {
    var apiUrl5Day = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771"

    fetch(apiUrl5Day)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {});
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Weather");
        });
    
    $

    //change current weather data in main area
    //call 5dayForcast(with submit buttons input) 
}
    

//handler for 5dayForcast var 5dayForcast = function (city) {}
    // fetch apiUrl5Day
    // append data to 5 day forcast container


//save city to local storage
    //put cities an array
    //set array in local

// getCityHistory()
    //get array from local
    //parse array
    //append items

// getCityHistory();
// currentWeather(Anaheim);

var buttonClickHandler = function(event){
    var city = event.value
    if (city) {
        currentWeather(city.trim());      
         //clear old content
        inputEl.value = "";
      }
}

$(submitButtonEl).on("click", function() {
    event.preventDefault();
    buttonClickHandler(inputEl);    
});