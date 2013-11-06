var map;
function initialize() {
	var mapOptions = {
	    zoom: 11,
	    center: new google.maps.LatLng(53.195, -3.112),
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);	

	var mapData = jQuery.parseJSON('{"clinics":[{"name":"CHAT Buckley Health Clinic","lat":"53.163317","long":"-3.080142","address1":"Padeswood Road","address2":"Buckley","phone":"01244 545277","open":"Thursday 4:00PM to 5:30PM"},{"name":"The Quay Health Centre","lat":"53.213659","long":"-3.051165","address1":"Fron Road","address2":"Connahs Quay","phone":"01244 813486","open":"Monday 9:30AM to 7:00PM"},{"name":"Mold Clinic","lat":"53.171833","long":"-3.137391","address1":"Kings Street","address2":"Mold","phone":"01352 753637","open":"Thursday 9:30AM to 7:00PM"}]}');
	//	var mapData = [];
	//  mapData.clinics = [];
	// jQuery.getJSON('data/mapdata.json', function(data) {
	// 	jQuery.each(data, function(key, val) {
	// 		mapData.clinics.push(val);
	// 	}); 
	// });	

	var infowindow = new google.maps.InfoWindow({content: "Holding..."});
	// console.log(mapData.clinics);
	var icon = 'images/mapicon.png';
	var infoData = [];
	var mapMarkers = [];
	for (var i = 0; i < mapData.clinics.length; i++) {		
		infoData[i] = "<h3>"+ mapData.clinics[i].name +"</h3><p>"+ mapData.clinics[i].address1 +"<br> "+ mapData.clinics[i].address2 +"<br><strong> "+ mapData.clinics[i].phone +"</strong><br> "+ mapData.clinics[i].open +"</p></div>";
		mapMarkers[i] = new google.maps.Marker({
			position: new google.maps.LatLng(mapData.clinics[i].lat, mapData.clinics[i].long),
			map: map,
			title: mapData.clinics[i].name,
			icon: icon
		});
		mapMarkers[i].html = infoData[i];
		google.maps.event.addListener(mapMarkers[i], 'click', function() {
			infowindow.setContent("<div class=\"popupInfo\">" + this.html + "</div>");
			infowindow.open(map, this);
		});
		$('#clinic-list').append(infoData[i] + "<hr>");

		function resizeMap()
		{
			google.maps.event.trigger(map,'resize');
			map.setZoom(11);
			map.setCenter(new google.maps.LatLng(53.195, -3.112));
		}
		jQuery("body").on("pagechange", function( event ) {
			//console.log("pagechange event");
			setTimeout(function(){resizeMap()},200);
		});
	}
}




google.maps.event.addDomListener(window, 'load', initialize);






