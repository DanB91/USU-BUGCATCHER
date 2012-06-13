<?php

if(!file_exists("c:\DropBox\htdocs\NewDesign\Test.txt"))
{
    echo "Help file could not be found.";
    return;
}

$file = file("c:\DropBox\htdocs\NewDesign\Test.txt");

$count = count($file);
$helpContent = '';

for($i = 0; $i < $count; $i++)
{
    $helpContent .= $file[$i];
}

echo $helpContent;

?>
