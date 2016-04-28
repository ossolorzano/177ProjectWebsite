function doQuery(q, type){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			document.getElementById("table").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","php/queryTable.php?q="+q+"&type="+type,true);
	xmlhttp.send();
}

function populateDropdown(dropdown, type){
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open('GET', "php/populateDropdown.php?type="+type,true);
	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var response = JSON.parse(xmlhttp.responseText.toString());
			//console.log(response);
			$("#"+dropdown).autocomplete({
				source: response
			});
		}
	};
	xmlhttp.send();
}

$(document).ready(function() {
	populateDropdown("zipDropdown", "Zip");
	populateDropdown("stateDropdown", "State");
	$("#zipButton").click(function(){
		doQuery($("#zipDropdown").val(), "Zip");
	});
	$("#stateButton").click(function(){
		doQuery($("#stateDropdown").val(), "State");
	});
});
