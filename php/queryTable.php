<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
	margin-bottom: 20px;
	color: white;
}

table, td, th {
    border: 1px solid;
    padding: 5px;
	
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = strval($_GET['q']);
$type = strval($_GET['type']);

$con = mysqli_connect('athena.ecs.csus.edu:3306/drocck','drocck','drocck_db','drocck');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"drocck");
$sql="SELECT DISTINCT ".$type.", Utility_Name, Comm_Rate, Ind_Rate, Res_Rate
FROM UTILITY, LOCATION 
WHERE LOCATION.".$type." = '".$q."' AND LOCATION.LocID=UTILITY.Location_Id;";
$result = mysqli_query($con,$sql);
echo "<table>
<tr>
<th>".$type."</th>
<th>Name</th>
<th>CommRate</th>
<th>IndRate</th>
<th>ResRate</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row[$type] . "</td>";
    echo "<td>" . $row['Utility_Name'] . "</td>";
    echo "<td>" . $row['Comm_Rate'] . "</td>";
    echo "<td>" . $row['Ind_Rate'] . "</td>";
    echo "<td>" . $row['Res_Rate'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>