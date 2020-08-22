
//global variables
var histBtn = [];
var latitude = "";
var longitude = "";




$(document).ready(function(){
initView();
addDate();


$("#submitBtn").click(function(event){
event.preventDefault();
getLocation();
save();
makeBtn();
});


$(document).on("click", ".oldcity", function(event){
    event.preventDefault();
    var ocity = $(this).attr("data-name");
    console.log(ocity)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ocity+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $("#location").text(ocity.toUpperCase());

            getWeather();
        });
})

//adding dates
function addDate(){
const date = moment().format('MMMM Do YYYY');
$(".date").text(date);
const dateZero = moment().calendar();
$("#date0").text(dateZero);
const dateOne = moment().add(1,'days').calendar();
$("#date1").text(dateOne);
const dateTwo = moment().add(2,'days').calendar();
$("#date2").text(dateTwo);
const dateThree = moment().add(3,'days').calendar();
$("#date3").text(dateThree);
const dateFour = moment().add(4,'days').calendar();
$("#date4").text(dateFour);
const dateFive = moment().add(5,'days').calendar();
$("#date5").text(dateFive);

}

//submit button


function getLocation(){
    var city = $("#input").val();
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $("#location").text(city.toUpperCase());

            getWeather();
        });

}
function initView(){

        var oscity = JSON.parse(localStorage.getItem("cities"))
        if(oscity == null){
            return
        }
        
        console.log(oscity)
        var scity = oscity[oscity.length-1]
        console.log(scity)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+scity+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
     

        render();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            $("#location").text(scity.toUpperCase());
    
                getWeather();
            });
}


// ajax call for weather
function getWeather(){
    var queryURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=fecdb578259a1a724a8226c96828ee6d"; 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
//today
    $(".temperature").text(response.current.temp)
    $("#wind").text(response.current.wind_speed)
    $("#uv").text(response.current.uvi)
    $("#condition").text(response.current.weather[0].main);
// tomorrow
    $("#temperature1").text(response.daily[1].temp.day)
    $("#condition1").text(response.daily[1].weather[0].main);
//day 2
$("#temperature2").text(response.daily[2].temp.day)
$("#condition2").text(response.daily[2].weather[0].main);
//day 3
$("#temperature3").text(response.daily[3].temp.day)
$("#condition3").text(response.daily[3].weather[0].main);
//day 4
$("#temperature4").text(response.daily[4].temp.day)
$("#condition4").text(response.daily[4].weather[0].main);
//day 5
$("#temperature5").text(response.daily[5].temp.day)
$("#condition5").text(response.daily[5].weather[0].main);
        console.log(response);
uvColor();
iconMake();
    });



}

//local storage
function save(){
    var city = $("#input").val();
    histBtn.push(city);

    localStorage.setItem("cities", JSON.stringify(histBtn));
    console.log(JSON.parse(localStorage.getItem("cities")));


}

//create history buttons
function makeBtn(){
    var savedBtns = JSON.parse(localStorage.getItem("cities"));
    $("#btnContainer").empty();
    if(savedBtns== null){
        return;
    }
    for(var i=0; i< savedBtns.length;i++){
        var newList = $("<li class = 'list-group-item'> </li>")
        var listBtn = $("<button>");
        listBtn.addClass("oldcity")
        listBtn.attr("data-name", savedBtns[i])
        listBtn.text(savedBtns[i])
        $("#btnContainer").prepend(newList);
        newList.append(listBtn);
        
    }

}



//clear history
$("#clear").click(function(){
    clearHist();
    
})
function clearHist(){

$("#btnContainer").empty();
localStorage.clear();
histBtn =[]
}
//render
function render(){
makeBtn();
}

})