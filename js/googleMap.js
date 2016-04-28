var map;
var geocoder;
var heatmap;


function initializeMap(){
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		zoom: 7,
		center: new google.maps.LatLng(36.7783, -119.4179),	//Center of California
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function fillMap(type){
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open('GET', "php/rateQuery.php?type="+type,true);
	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText.toString());
			//console.log(data);
			//putting data on map
			var heatMapData=[];
			var lat1;
			var lng1;
			var desiredRadiusMeters = 100;
			var pixelsPerMeter = 1;
			
			for(var r in data){
				lat1=parseFloat(data[r][0]);
				lng1=parseFloat(data[r][1]);
				latlng = new google.maps.LatLng(lat1, lng1);
				heatMapData.push({
					location:new google.maps.LatLng({lat: lat1, lng: lng1}),
					weight: Number(parseFloat(data[r][2])),
					radius: Math.floor(desiredRadiusMeters*pixelsPerMeter)
				});
			}

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatMapData,
				dissipating: false,
				map: map
			});
		}
	}
	xmlhttp.send();
}

function clearHeatmap(){
	if(heatmap!=null){
		heatmap.setMap(null);
	}
}

$(document).ready(function() {
	initializeMap();
	$("#resButton").click(function(){
		clearHeatmap();
		fillMap("Res_Rate");
	});
	$("#comButton").click(function(){
		clearHeatmap();
		fillMap("Comm_Rate");
	});
	$("#indButton").click(function(){
		clearHeatmap();
		fillMap("Ind_Rate");
	});
});