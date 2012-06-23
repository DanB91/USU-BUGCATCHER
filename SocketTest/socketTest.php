<?php 

    $val = $_GET['val'];

    // form not yet submitted

    // form submitted
    // where is the socket server?
    //set_time_limit(5);
    $host="localhost";
    $port = 12327;
    // open a client connection
    $fp = fsockopen ($host, $port, $errno, $errstr);
    
       
    if (!$fp)
    {
        $result = "Error: could not open socket connection";
    }
    else
    {

        // write the user string to the socket
        fputs ($fp, $val);
        // get the result
   
        $result = fgets ($fp, 1024);
            //echo $result;
       
        // close the connection
        fputs ($fp, "END");
        fclose ($fp);
        // trim the result and remove the starting ?
        $result = trim($result);
    }
        echo $result;


?>

<?php

//    $val = $_GET['val'];
//  
//// form not yet submitted
//
//// form submitted
//// where is the socket server?
//set_time_limit(5);
//$host="localhost";
//$port = 12327;
//// create socket
//$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
//
//// connect to server
//$result = socket_connect($socket, $host, $port) or die("Could not connect to server\n");
//
//// send string to server
//socket_write($socket, $val, strlen($val)) or die("Could not send data to server\n");
//
//// get server response
//$result = socket_read ($socket, 1024) or die("Could not read server response\n");
//
//// end session
//socket_write($socket, "END", 3) or die("Could not end session\n");
//
//// close socket
//socket_close($socket);
//
//// clean up result
//$result = trim($result);
//
//// print result to browser
//echo $result;


?>