

function initialize() {
    //Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379,30.519131),
        zoom: 11
    };

    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);
    //Карта створена і показана

    //Write functions here!
    var point = new google.maps.LatLng(50.464379,30.519131);

    var marker = new google.maps.Marker({
    position: point,
    //map - це змінна карти створена за допомогою new google.maps.Map(...)
    map:  map,
    icon: "assets/images/map-icon.png"
    });


    var end_marker = new google.maps.Marker({
      position: null,
      map: map,
      icon: "assets/images/home-icon.png"
    });


    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
    var directionsService = new google.maps.DirectionsService();

    directionsDisplay.setMap(map);

    google.maps.event.addListener(map, 'click',function(me){
      var coordinates = me.latLng;
      geocodeLatLng(coordinates,  function(err, address){
        if(!err)  {
          //Дізналися адресу
          $("#inputAddress").val(address);
          //print address to information order block
          $("#delivery_address").text(address);
          geocodeAddress(address, function(err, coordinates){
            if (!err) {
              end_marker.setPosition(coordinates);
              calculateRoute(point, coordinates, function(err, length){
                //console.log(length.duration);
                $("#delivery_time").text(length.duration.text);
              });
            }
          });
        } else  {
          console.log("Немає адреси")
        }
      });
    });


    $("#inputAddress").keyup(function(){
      var TIME_OUT = 2000;
      setTimeout(function(){
        var address = $("#inputAddress").val();
        //$("#delivery_address").text($("#inputAddress").val())
        $("#delivery_address").text(address);
        geocodeAddress(address, function(err, coordinates){
          if(!err) {
            end_marker.setPosition(coordinates);
            calculateRoute(point, coordinates, function(err, length){
                //console.log(length.duration);
                if (!err) {
                  $("#delivery_time").text(length.duration.text);
                }
            });
          }
        });
      }, TIME_OUT);
    });

  //address from coordinate
  function  geocodeLatLng(latlng, callback){
    //Модуль за роботу з адресою
    var geocoder  = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng},  function(results, status) {
      if  (status === google.maps.GeocoderStatus.OK &&  results[1]) {
        var address =  results[1].formatted_address;
        callback(null,  address);
      } else  {
        callback(new  Error("Can't  find  address"));
      }
    });
  }

  //coordinates from address
  function  geocodeAddress(address, callback)  {
    var geocoder  = new google.maps.Geocoder();
    geocoder.geocode({'address':  address}, function(results, status) {
      if  (status === google.maps.GeocoderStatus.OK &&  results[0]) {
        var coordinates = results[0].geometry.location;
        callback(null,  coordinates);
      } else  {
        callback(new  Error("Can  not find  the address"));
      }
    });
  }

  function  calculateRoute(A_latlng,   B_latlng,  callback) {
    var directionService =  new google.maps.DirectionsService();
    directionService.route({
      origin: A_latlng,
      destination:  B_latlng,
      travelMode: google.maps.TravelMode.DRIVING
    },  function(response,  status) {
      if ( status === google.maps.DirectionsStatus.OK ) {
        var leg = response.routes[0].legs[0];
        
        directionsDisplay.setDirections(response);
        
        callback(null,  {
          duration: leg.duration,
        });
      } else  {
        callback(new  Error("Can' not find  direction"));
      }
    });
  }

}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);

