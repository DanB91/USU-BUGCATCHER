<?php

$problem = $_GET['problem'];

if(file_exists("../Problems/${problem}/${problem}.txt"))
{

    $file = file("../Problems/${problem}/${problem}.txt");

    $content = '';

    for($i = 0; $i < count($file); $i++)
    {
            $content .= $file[$i];
    }

echo $content;
}
else
    echo $problem . ".txt" . " does not exist please create it so you can see a preview of the problem.";


?>