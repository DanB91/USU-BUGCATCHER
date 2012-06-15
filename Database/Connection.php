<?php


/**
 * Connects to the database
 * @return mysql_connection the connection
 * @throws Exception if the connection fails
 */
function connectToDB() 
{
    $con = new mysqli('rm431-3.cs.usu.edu', 'root', 'abc123');
    if($con->connect_error)    
        throw new Exception('Could not connect to Database: ' . $con->connect_error);
    
    $con->select_db("bugcatcher");
    return $con;
}



?>
