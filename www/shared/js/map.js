// JavaScript Document
function initialize() {

  var latlng = new google.maps.LatLng(35.700216, 139.524237);

  var myOptions = {
    zoom: 16, 
    center: latlng, 
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
    mapTypeControl: false,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('gmap'), myOptions);
  /*Æ’AÆ’CÆ’RÆ’â€œÂÆ¯â€™Ã¨*/
  var icon = new google.maps.MarkerImage('shared/img/access/pin.png',
    new google.maps.Size(140,70),
    new google.maps.Point(0,0)
    );
  var markerOptions = {
    position: latlng,
    map: map,
    icon: icon,
    title: 'é€¸æ¥½'
  };
  var marker = new google.maps.Marker(markerOptions);
  /*取得スタイルの貼り付け*/
  var styleOptions = [
  {
    "stylers": [
    { "hue": "#000" }, { "lightness": 0 }, { "gamma": 1.44 }, { "saturation": -180 }
    ]
  }
  ];
  var styledMapOptions = { name: 'MAP' }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');
}
google.maps.event.addDomListener(window, 'load', initialize);