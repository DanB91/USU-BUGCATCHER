<?php

$studentName = $_GET['q'];
$studNum	 = $_GET['studName'];

$name_String  = '<select name="'.$studNum.'" id="'.$studNum.'" class="MStudentSelect" onchange="currentSelection(this, id)">';
$name_String .= "<option> ${studentName} </option>";
$name_String .= '</select>';

echo $name_String;

?>