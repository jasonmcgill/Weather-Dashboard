var inputEl = document.querySelector("#city")
var submitButtonEl = document.querySelector("#city-submit")


//using visitors IP it looks up the city it belongs to
var localIp = function () {
    getUserIp = "https://json.geoiplookup.io/"

    fetch(getUserIp)
        .then(function (response) {

            if (response.ok) {
                //parse data for JSON payload
                response.json()
                    .then(function (data) {
                            //displays current weather with the city from the JSON payload
                            currentWeather(data.city);
                        }

                    )
            } else {
                alert("Error: " + response.statusText);
            }
        })
}



//handler for fetching current weather with city info passed from buttonClickHandler
var currentWeather = function (city) {
    var apiUrl5Day = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771"

    fetch(apiUrl5Day)
        .then(function (response) {
            //if we have input in the field
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        //add the values into their respective html spans
                        $("#default-city").text(data.city.name);
                        $("#default-date").text(moment().format('MMMM Do, YYYY'));
                        $("#default-temperature").text(Math.round(data.list[0].main.temp) + "°");
                        $("#default-humidity").text(data.list[0].main.humidity + "%");
                        $("#default-wind-speed").text(data.list[0].wind.speed);
                        //adds the icon
                        var iconcode = data.list[0].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);

                        //new api that has UV index, contatenated with latitude and longitude from previus fetch
                        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&apikey=b2f5c5fd56830b2ca51bd32529509771")
                            .then(function (response) {
                                response.json()
                                    .then(function (data) {
                                        //depending on the UV index display background color of how favorable it is
                                        if (data.current.uvi <= 3) {
                                            $("#default-uv-index").text(data.current.uvi);
                                            $("#default-uv-index").addClass("text-white bg-success")
                                        }
                                        if (data.current.uvi > 4 && data.current.uvi < 7) {
                                            $("#default-uv-index").text(data.current.uvi);
                                            $("#default-uv-index").addClass("text-white bg-warning")
                                        }
                                        if (data.current.uvi > 8) {
                                            $("#default-uv-index").text(data.current.uvi);
                                            $("#default-uv-index").addClass("text-white bg-danger");
                                        }

                                    });
                            });
                    });
                //if we get error from server display their error
            } else {
                alert("Error: " + response.statusText);
            }

        })
        .catch(function (error) {
            alert("Unable to connect to Weather");
        });

    fiveDayForcast(city);
}
var fiveDayForcast = function (city) {
    // fetch apiUrl5Day
    var apiUrl5Day = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771"

    fetch(apiUrl5Day)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        //add the values into their respective html spans
                        $("#date-1").text(moment(data.list[5].dt_txt).format('MMMM Do'));
                        $("#tempday1").text(Math.round(data.list[5].main.temp) + "°");
                        $("#humid-1").text(data.list[5].main.humidity + "%");                        
                        //adds the icon
                        var iconcode = data.list[5].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-1').attr('src', iconurl);

                        // day 2
                        $("#date-2").text(moment(data.list[13].dt_txt).format('MMMM Do'));
                        $("#tempday2").text(Math.round(data.list[13].main.temp) + "°");
                        $("#humid-2").text(data.list[13].main.humidity + "%");                        
                        //adds the icon
                        var iconcode = data.list[13].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-2').attr('src', iconurl);

                        // day 3
                        $("#date-3").text(moment(data.list[21].dt_txt).format('MMMM Do'));
                        $("#tempday3").text(Math.round(data.list[21].main.temp) + "°");
                        $("#humid-3").text(data.list[21].main.humidity + "%");                        
                        //adds the icon
                        var iconcode = data.list[21].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-3').attr('src', iconurl);

                        // day 4
                        $("#date-4").text(moment(data.list[29].dt_txt).format('MMMM Do'));
                        $("#tempday4").text(Math.round(data.list[29].main.temp) + "°");
                        $("#humid-4").text(data.list[29].main.humidity + "%");                        
                        //adds the icon
                        var iconcode = data.list[29].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-4').attr('src', iconurl);

                        // day 5
                        $("#date-5").text(moment(data.list[37].dt_txt).format('MMMM Do'));
                        $("#tempday5").text(Math.round(data.list[37].main.temp) + "°");
                        $("#humid-5").text(data.list[37].main.humidity + "%");                        
                        //adds the icon
                        var iconcode = data.list[37].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-5').attr('src', iconurl);

                    })
                
            }
        });
};



//save city to local storage
//put cities an array
//set array in local

// getCityHistory()
//get array from local
//parse array
//append items

// getCityHistory();


var buttonClickHandler = function (event) {
    var city = event.value
    if (city) {
        currentWeather(city.trim());
        //clear old content
        inputEl.value = "";
    }
}

$(submitButtonEl).on("click", function () {
    event.preventDefault();
    buttonClickHandler(inputEl);
});


localIp();