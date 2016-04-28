<?php
$type = strval($_GET['type']);
$con = mysqli_connect('athena.ecs.csus.edu:3306/drocck','drocck','drocck_db','drocck');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"drocck");
$sql="SELECT DISTINCT ".$type." FROM LOCATION";
$result = mysqli_query($con,$sql);
$return_arr = array();

while($row = mysqli_fetch_array($result)){
	array_push($return_arr,$row[$type]);
}
echo json_encode($return_arr);

mysqli_close($con);
?>