      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;
        
        

var latitude,longitude;
var dlat,dlng;
//var directionsService = new google.maps.DirectionsService();

google.maps.event.addDomListener(window, 'load', function () {
          var  places = new google.maps.places.Autocomplete(document.getElementById('txtSource'));
           
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                var address = place.formatted_address;
                 latitude = place.geometry.location.lat();
                 longitude = place.geometry.location.lng();
                


            });
        });

      function initMap() {
        var pyrmont = {lat: latitude, lng: longitude};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 10
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['home_goods_store']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location

        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);

          dlat = place.geometry.location;
          dlng = place.geometry.location.lng();

          //window.alert(dlat);

        });
      }

var curr = navigator.geolocation.getCurrentPosition();
     function init() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: latitude, lng: longitude}
        });
        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        if (navigator.geolocation) {
         pos = navigator.geolocation.getCurrentPosition();
    }
        directionsService.route({
          origin:curr,
          destination: dlat,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
