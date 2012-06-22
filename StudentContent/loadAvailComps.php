<?php

require_once "../header.php";


session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$isCaptain = trim($_POST['isCaptn']);

if ($team != NULL) {
    if ($user != NULL) {
        if ($isCaptain == "true"){
            $compArray = Competition::getJoinableCompetitions();
        }
        else{
            $compArray = $team->getCompetitions();
        }
        //if no competitions are available, disable drop down
        if (count($compArray)==0){
            $content = "<select disabled style='width:200px;'>";
            $content .= "<option>No competitions available.</option>";
            $content .= "</select>";
            echo $content;
            return;
        }
        $content = "<select onChange='showCompInfo(this.value)' style='width:200px;'>";
        $content .= "<option value='-1'>Select a competition</option>";
        $competitions = array();
        foreach ($compArray as $value) {
            $content .= "<option value='".$value->compid."' ondblclick='joinComp(this.value);'>";
            $content .= $value->compname."</option>";
        }

        $content .= "</select>";

        echo $content;

        //$_SESSION['compList'] = $competitions;
    }
    else
        echo "<option>You must be logged in to view.</option>";
}
else
    echo "<option>You must be on a team to view competitions.</option>";
?>
