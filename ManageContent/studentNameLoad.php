<?php
//The purpose of this code is to return an option containing just one student's name
//so it can be listed when a student on the team.

$studentName = $_GET['q'];
$studNum	 = $_GET['studName'];

$name_String  = '<select name="'.$studNum.'" id="'.$studNum.'" class="MStudentSelect" onchange="currentSelection(this, id)">';
$name_String .= "<option> ${studentName} </option>";
$name_String .= '</select>';

echo $name_String;

?>