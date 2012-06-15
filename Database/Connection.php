<?php


/**
 * Connects to the database
 * @return mysql_connection the connection
 * @throws Exception if the connection fails
 */
function connectToDB() 
{
    $con = new mysqli('127.0.0.1', 'root', 'root');
    if($con->connect_error)    
        throw new Exception('Could not connect to Database: ' . $con->connect_error);
    
    $con->select_db("bugcatcher");
    return $con;
}



?>
