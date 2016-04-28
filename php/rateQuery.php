<?php
$type = strval($_GET['type']);
$con = mysqli_connect('athena.ecs.csus.edu:3306/drocck','drocck','drocck_db','drocck');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"drocck");
$sql="SELECT Latitude, Longitude, ".$type."
FROM LOCATION, UTILITY
WHERE LOCATION.LocId=UTILITY.Location_Id";
$result = mysqli_query($con,$sql);
$return_arr = array();

while($row = mysqli_fetch_array($result)){
	$a=array($row['Latitude'], $row['Longitude'], $row[$type]);
	array_push($return_arr,$a);
}
array_shift($return_arr);
echo json_encode($return_arr);

mysqli_close($con);
?>