<?php
    // set some variables
    $clients = array();
    $host = "localhost";
    $port = 12327;
    // don't timeout!
    set_time_limit(0);
    // create socket
    $socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");

    // bind socket to port
    $result = socket_bind($socket, $host, $port) or die("Could not bind to socket\n");
    

    
    // start listening for connections
    $result = socket_listen($socket, 25) or die("Could not set up socket listener\n");
    //socket_set_nonblock($socket);
    
//while(1)
//{
    // accept incoming connections
    // spawn another socket to handle communication
    
    //if(($spawn = socket_accept($socket)) !== false)
        //$clients[] = $spawn;
    
    $spawn = socket_accept($socket) or die("Could not accept connection");
    
    // read client input

        if (false == ($input = socket_read($spawn, 1024))) {
            echo "socket_bind() failed: reason: " . socket_strerror(socket_last_error($socket)) . "\n";
        }
            
        //clean up input string
        $input = trim($input);
        //reverse client input and send back
        $output = strrev($input) . "\n";


   
        socket_write($spawn, $output, strlen ($output)) or die("Could not write output\n");
                
            
    
//}
    // close sockets
    socket_close($spawn);
    socket_close($socket);

?>

