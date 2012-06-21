<?php
$fileLineNumber = $_GET['fileLine'];
$compID = $_GET['compID'];
$comp = new Competition($compID);

switch ($fileLineNumber)
{
    case 1: 
        echo $comp->duration;
        break;
    case 2:
        echo $comp->getNumProblems();
        break;
    case 3:
        echo $comp->codecoverage;
        break;
    case 4:
        if ($comp->password == NULL)
            echo 0;
        else
            echo 1;
        break;
    default:
        echo "There was a problem getting competition information.";
}
?>