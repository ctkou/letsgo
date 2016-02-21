
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('event-map'), {
		center: {lat: 0, lng: 0},
		zoom: 8
	});
}

function updateMap(lat,lng) {
	var latLng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
	    position: latLng
	});
	map.setCenter(latLng);
	marker.setMap(map);
}