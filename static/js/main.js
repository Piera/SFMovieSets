var map;
var positions = [];

$(document).ready(function() {
    initialize();
});

$('#movie-form').submit(function(evt) {
    evt.preventDefault();  
    // coordinates_array = [];
    var movie = $("#movie").val()

  $.get(
        "/lookup", {
            movie: movie
        },

        function (response) {
            clearAllMap();
            coordinates_array=[];
            for (var i in response) {
                local_response = response[i] + ' SF';
                console.log(local_response);
                geocoder.geocode({ 
                    address: local_response}, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                console.log("results from geocode " + results)
                                var lat = results[0].geometry.location.lat();
                                var lng = results[0].geometry.location.lng();
                                console.log("lat and long from geocode results " + lat, lng);
                                var coordinates = new google.maps.LatLng(lat,lng);
                                console.log("google map coordinates " + coordinates);
                                marker = new google.maps.Marker ({
                                    map: map,
                                    position: coordinates,
                                    animation: google.maps.Animation.DROP,
                                    });
                                    positions.push(marker);
                                // }
                            }

                            else  {
                                alert('WOAH:' + status);
                            }
                    }
                )
            }
        },
    "json"
    )
});

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7577, -122.4376)
  };
  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}

function clearAllMap(map) {
    if (positions.length !=0) {
        for (var i = 0; i < positions.length; i++) {
        positions[i].setMap(null)
         }
        positions = [];
    } else {
        console.log("Nothing to clear");
    }
}


