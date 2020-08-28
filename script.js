var histBtn = [];
var latitude = "";
var longitude = "";

$(document).ready(function () {
  initView();
  addDate();

  $("#submitBtn").click(function (event) {
    event.preventDefault();
    getLocation();
    save();
    makeBtn();
  });

  $(document).on("click", ".oldcity", function (event) {
    event.preventDefault();
    var ocity = $(this).attr("data-name");
    console.log(ocity);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      ocity +
      "&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      $("#location").text(ocity.toUpperCase());

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
    var city = $("#input").val();

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
      $("#location").text(city.toUpperCase());

      getWeather();
    });
  }
  function initView() {
    var oscity = JSON.parse(localStorage.getItem("cities"));
    if (oscity == null) {
      return;
    }

// "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        //"x-rapidapi-key": "008509dc35mshc6146dbc6641739p1cd995jsncb83ec825d20"
        // may need these for the rapidapi ajax call I am using - but trying another way first. 

    console.log(oscity);
    var scity = oscity[oscity.length - 1];
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
      $("#location").text(scity.toUpperCase());

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
      $("#condition").text(response.current.weather[0].main);
      $("#temperature1").text(response.daily[1].temp.day);
      $("#condition1").text(response.daily[1].weather[0].main);
      $("#temperature2").text(response.daily[2].temp.day);
      $("#condition2").text(response.daily[2].weather[0].main);
      $("#temperature3").text(response.daily[3].temp.day);
      $("#condition3").text(response.daily[3].weather[0].main);
      $("#temperature4").text(response.daily[4].temp.day);
      $("#condition4").text(response.daily[4].weather[0].main);
      $("#temperature5").text(response.daily[5].temp.day);
      $("#condition5").text(response.daily[5].weather[0].main);
      console.log(response);
     
    });
  }

  function save() {
    var city = $("#input").val();
    histBtn.push(city);

    localStorage.setItem("cities", JSON.stringify(histBtn));
    console.log(JSON.parse(localStorage.getItem("cities")));
  }

  function makeBtn() {
    var savedBtns = JSON.parse(localStorage.getItem("cities"));
    $("#btnContainer").empty();
    if (savedBtns == null) {
      return;
    }
    for (var i = 0; i < savedBtns.length; i++) {
      var newList = $("<li class = 'list-group-item'> </li>");
      var listBtn = $("<button>");
      listBtn.addClass("oldcity");
      listBtn.attr("data-name", savedBtns[i]);
      listBtn.text(savedBtns[i]);
      $("#btnContainer").prepend(newList);
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
      $("#condition").text(),
      $("#condition1").text(),
      $("#condition2").text(),
      $("#condition3").text(),
      $("#condition4").text(),
      $("#condition5").text(),
    ];

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

      if (fcondition[i] == "Clear Skys") {
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
    clearHist();
  });
  function clearHist() {
    $("#btnContainer").empty();
    localStorage.clear();
    histBtn = [];
  }
 
  function render() {
    makeBtn();
  }
});
