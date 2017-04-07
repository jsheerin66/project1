console.log("Hello world!");
console.log("Whad up!!!")

//Global Varialbes

var search = $("#search")[0];
// var dropdown = $("#dropdown")[0];
var weather = $("#weather")[0];
var time = $("#time")[0];
var map;

// API KEYS
var darkSkyStartingURL = "https://api.darksky.net/forecast/2986ea0966ad3706b67a762d0401bb58/";
var query;
var latitude = 48.858093;
var longitude = 2.294694;
var searchURL = darkSkyStartingURL + latitude + "," + longitude;

  //Need to add API key for Google
var googlePlacesStartingURL = "AIzaSyDhTdCqizerwwDfQ5C2w4oDOAwfwkXkETo";
var query;
var lat;
var lng;


$(search).on("keypress", function(e) {
    if (e.which == 13) {
        console.log('You pressed enter');
        console.log(this.value);
        query = this.value;
        $.ajax({
            url: searchURL,
            type: 'GET',
            dataType: 'jsonp',
            success: function(res) {
                console.log(res);
            }
        });
    }
})

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}
initMap();
