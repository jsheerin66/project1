console.log("Hello world!")
$(document) ready(function() {

    // var skycons = new Skycons({"color": "black"});

    var dailyWeather = document.getElementsByClassName("dailyWeather");
    console.log(dailyWeather)
    //variable for API link/key
    var darkSkyStartingURL = "https://api.darksky.net/forecast/2986ea0966ad3706b67a762d0401bb58/";
    //variable undefined which will later be set to the darkSkyStartingURL conceanting lat and long coordinates pulled from google api
    var searchURL;
    //function to call the long and lat coordinates from google places api object
    function getWeather(longitude, latitude) {

        searchURL = darkSkyStartingURL + longitude + "," + latitude;
        console.log(searchURL)

        $.ajax({
            url: searchURL,
            type: 'GET',
            dataType: 'jsonp',
            success: function(res) {
                console.log(res);
                console.log(res.daily.data[0])
                // for (var i = 0; i < 5; i++) {
                //   console.log(dailyWeather[i])
                //   console.log(res.daily.data[i])
                // }


                for (var i = 0; i < 5; i++) {
                    var max = res.daily.data[i].temperatureMax
                    var min = res.daily.data[i].temperatureMin
                    var summary = res.daily.data[i].summary

                    // icon = icon.replace(/-/g, "_")
                    // icon = "Skycons." + icon.toUpperCase();
                    // console.log(icon)
                    // //

                    // console.log(res.daily.data[i].temperatureMax)
                    // console.log(res.daily.data[i].temperatureMin)
                    // console.log(res.daily.data[i].icon)
                    // console.log(dailyWeather[i])



                    var weatherDisplay = "<p>" + max + "</p>" + "<p>" + summary + "</p>" + "<p>" + min + "</p>"
                    var id = "icon" + i
                    console.log(id)

                    // "maxTemp: " + max + "\nminTemp: " + min + "\nicon: " + icon
                    dailyWeather[i].innerHTML = weatherDisplay;
                    // skycons.play();
                }
            }
        });
    }

    function getAverage(a, b) {
        return (a + b) / 2
    }

    // 40.2109788 and -74.0090647
    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.7406,
                lng: -74.0060
            },
            zoom: 12,
            mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('search');
        var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                console.log(place)
                // console.log(place.geometry);
                // console.log(place.geomerty.location);
                // console.log()
                // console.log(place.geometry);
                // console.log(place.geometry.viewport);
                //created varible latitude and set it equal to the avaerage of the two coordinates available from google api which displays coordinates centered on map
                var latitude = getAverage(place.geometry.viewport.b.b, place.geometry.viewport.b.f);
                var longitude = getAverage(place.geometry.viewport.f.b, place.geometry.viewport.f.f);
                //checking latitude and longitude are pulled correctly
                console.log(latitude);
                console.log(longitude);
                //console logging the latitude and longitude up to the period
                console.log(latitude.toString().indexOf("."))
                console.log(longitude.toString().indexOf("."))
                //creating variable which displays 5 intingers passed the "."
                //consolelog to check that the proper amount of intigers was pulled from the google api lat and long

                var endOfLatitude = latitude.toString().indexOf(".") + 5;
                console.log(endOfLatitude);
                var endOfLongitude = longitude.toString().indexOf(".") + 5;
                console.log(endOfLongitude);
                //seting latitude.toString  and longitude.toString to remove the reamianing inigers passed 4 decimal points????

                //was that right?
                latitude = latitude.toString().slice(0, endOfLatitude);


                longitude = longitude.toString().slice(0, endOfLongitude);

                console.log(latitude);
                console.log(longitude);
                //not completely sure- is this the start of the API hard code? line 208-240
                getWeather(longitude, latitude);
                //
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };


                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }

});
