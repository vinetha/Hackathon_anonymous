var source, destination;
var directionsDisplay;

var latitude,longitude;
//var directionsService = new google.maps.DirectionsService();

google.maps.event.addDomListener(window, 'load', function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('txtSource'));
           
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                var address = place.formatted_address;
                 latitude = place.geometry.location.lat();
                 longitude = place.geometry.location.lng();
                
            });
        });

