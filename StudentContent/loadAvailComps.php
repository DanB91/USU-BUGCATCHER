<?php

require_once "../header.php";


session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];

if ($team != NULL) {
    if ($user != NULL) {
	$compArray = Competition::getJoinableCompetitions();

        $content = "<select size='15' onclick='showCompInfo(this.value)' style='width:150px;'>";
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
