/// javascript file
var historyButton = [];
var latitude = "";
var longitude = "";

$(document).ready(function () {
  initView();
  addDate();

  $("#submitButton").click(function (event) {
    event.preventDefault();
    getLocation();
    save();
    makeButton();
  });

  function ajaxone(){
    var search = $("#search").val()
   console.log(search)
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://community-open-weather-map.p.rapidapi.com/forecast?q="+scity+ "",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "008509dc35mshc6146dbc6641739p1cd995jsncb83ec825d20"
      }
    }}

  $(document).on("click", ".previouscity", function (event) {
    event.preventDefault();
    var scity = $(this).attr("data-name");
    console.log(scity);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      scity +
      "&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      $("#location").text(scity.toLowerCase());

      getWeather();
    });
  });

  function addDate() {
    const date = moment().format("MMMM Do YYYY");
    $(".day").text(date);
    const dateZero = moment().calendar();
    $("#day0").text(dateZero);
    const dateOne = moment().add(1, "days").calendar();
    $("#day1").text(dateOne);
    const dateTwo = moment().add(2, "days").calendar();
    $("#day2").text(dateTwo);
    const dateThree = moment().add(3, "days").calendar();
    $("#day3").text(dateThree);
    const dateFour = moment().add(4, "days").calendar();
    $("#day4").text(dateFour);
    const dateFive = moment().add(5, "days").calendar();
    $("#day5").text(dateFive);
  }

  function getLocation() {
    var city = $("#search").val();

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      $("#location").text(city.toLowerCase());
      getWeather();
    });
  }
  function initView() {
    var cities = JSON.parse(localStorage.getItem("cities"));
    if (cities == null) {
      return;
    }
// "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        //"x-rapidapi-key": "008509dc35mshc6146dbc6641739p1cd995jsncb83ec825d20"
        // may need these for the rapidapi ajax call I am using - but trying another way first. 

    console.log(cities);
    var scity = cities[cities.length - 1];
    console.log(scity);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      scity +
      "&appid=834fc904f66ef35ce03a84b6fe8c29b5";

    render();
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      $("#location").text(scity.toLowerCase());

      getWeather();
    });
  }

  function getWeather() {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=imperial&appid=fecdb578259a1a724a8226c96828ee6d";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $(".temperature").text(response.current.temp);
      $("#wind").text(response.current.wind_speed);
      $("#uv").text(response.current.uvi);
      $("#humidity").text(response.current.humidity)
      $("#cond").text(response.current.weather[0].main);
      $("#temperature1").text(response.daily[1].temp.day);
      $("#cond1").text(response.daily[1].weather[0].main);
      $("#temperature2").text(response.daily[2].temp.day);
      $("#cond2").text(response.daily[2].weather[0].main);
      $("#temperature3").text(response.daily[3].temp.day);
      $("#cond3").text(response.daily[3].weather[0].main);
      $("#temperature4").text(response.daily[4].temp.day);
      $("#cond4").text(response.daily[4].weather[0].main);
      $("#temperature5").text(response.daily[5].temp.day);
      $("#cond5").text(response.daily[5].weather[0].main);
      console.log(response);
     
    });
  }

  function save() {
    var city = $("#search").val();
    historyButton.push(city);

    localStorage.setItem("cities", JSON.stringify(historyButton));
    console.log(JSON.parse(localStorage.getItem("cities")));
  }

  function makeButton() {
    var savedButtons = JSON.parse(localStorage.getItem("cities"));
    $("#buttonContainer").empty();
    if (savedButtons == null) {
      return;
    }
    for (var i = 0; i < savedButtons.length; i++) {
      var newList = $("<li class = 'list-group-item'> </li>");
      var listBtn = $("<button>");
      listBtn.addClass("previouscity");
      listBtn.attr("data-name", savedButtons[i]);
      listBtn.text(savedButtons[i]);
      $("#buttonContainer").prepend(newList);
      newList.append(listBtn);
    }
  }

  // this does not work :( - come back with tutor to fix
  function iconMake() {
    var forecast = [
      $("#date0"),
      $("#date1"),
      $("#date2"),
      $("#date3"),
      $("#date4"),
      $("#date5"),
    ];
    var fcondition = [
      $("#cond").text(),
      $("#cond1").text(),
      $("#cond2").text(),
      $("#cond3").text(),
      $("#cond4").text(),
      $("#cond5").text(),
    ];

        // not sure what to do with the icons - will work with tutor
    for (var i = 0; i < fcondition.length; i++) {
      var rain = $(
        "<&#xf73d;>"
      );

      var cloud = $(
        "<&#xf75f;>"
      );

      var snow = $(
        "<&#xf2dc;>"
      );

      if (fcondition[i] == "Clear Skies") {
        forecast[i].empty();
        forecast[i].prepend(sun);
      } else if (fcondition[i] == "Rainy") {
        forecast[i].empty();
        forecast[i].prepend(rain);
      } else if (fcondition[i] == "Cloudy") {
        forecast[i].empty();
        forecast[i].prepend(cloud);
      } else if (fcondition[i] == "Snowy") {
        forecast[i].empty();
        forecast[i].prepend(snow);
      }
    }
  }

  $("#clear").click(function () {
    clearHistory();
  });
  function clearHistory() {
    $("#buttonContainer").empty();
    localStorage.clear();
    historyButton = [];
  }
 
  function render() {
    makeButton();
  }
});
