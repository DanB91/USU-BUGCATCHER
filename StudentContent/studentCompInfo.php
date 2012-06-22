<?php
require_once "../header.php";
$compInfoNumber = $_GET['fileLine'];
$compID = $_GET['compID'];
$comp = new Competition($compID);

switch ($compInfoNumber)
{
    case 0: 
        echo $comp->duration;
        break;
    case 1:
        echo $comp->getNumProblems();
        break;
    case 2:
        echo $comp->codecoverage;
        break;
    case 3:
        if (($comp->password == NULL)||($comp->password == crypt("",SALT)))
            echo 0;
        else
            echo 1;
        break;
    default:
        echo "There was a problem getting competition information.";
}
?>