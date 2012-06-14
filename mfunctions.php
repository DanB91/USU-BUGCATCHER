<?php

function sanitizeOne($var, $type){       

        switch ( $type ) {

                        case 'int': // integer

                        $var = (int) $var;

                        break;



                        case 'str': // trim string

                        $var = trim ( $var );

                        break;



                        case 'nohtml': // trim string, no HTML allowed

                        $var = htmlentities ( trim ( $var ), ENT_QUOTES );

                        break;

                        

                        case 'plain': // trim string, no HTML allowed, plain text

                        $var =  htmlentities ( trim ( $var ) , ENT_NOQUOTES )  ;

                        break;



                        case 'upper_word': // trim string, upper case words

                        $var = ucwords ( strtolower ( trim ( $var ) ) );

                        break;



                        case 'ucfirst': // trim string, upper case first word

                        $var = ucfirst ( strtolower ( trim ( $var ) ) );

                        break;



                        case 'lower': // trim string, lower case words

                        $var = strtolower ( trim ( $var ) );

                        break;



                        case 'urle': // trim string, url encoded

                        $var = urlencode ( trim ( $var ) );

                        break;



                        case 'trim_urle': // trim string, url decoded

                        $var = urldecode ( trim ( $var ) );

                        break;

                        

                        case 'telephone': // True/False for a telephone number

                        $size = strlen ($var) ;

                        for ($x=0;$x<$size;$x++)

                        {

                                if ( ! ( ( ctype_digit($var[$x] ) || ($var[$x]=='+') || ($var[$x]=='*') || ($var[$x]=='p')) ) )

                                {

                                        return false;

                                }

                        }

                        return true;

                        break;

                        

                        case 'pin': // True/False for a PIN

                        if ( (strlen($var) != 13) || (ctype_digit($var)!=true) )

                        {

                                return false;

                        }

                        return true;

                        break;

                        

                        case 'id_card': // True/False for an ID CARD

                        if ( (ctype_alpha( substr( $var , 0 , 2) ) != true ) || (ctype_digit( substr( $var , 2 , 6) ) != true ) || ( strlen($var) != 8))

                        {

                                return false;

                        }

                        return true;

                        break;

                        

                        case 'sql': // True/False if the given string is SQL injection safe

                        //  insert code here, I usually use ADODB -> qstr() but depending on your needs you can use mysql_real_escape();

                        return mysql_real_escape_string($var);

                        break;

                }       

        return $var;

        

}

function basicCheck($var){
      $var = str_replace(" ","",$var);  
      $var = str_replace("/","",$var); 
      $var = str_replace("-","",$var); 
      return $var;
}
function normalInputProtext($var){
    $var=(stripslashes(sanitizeOne($var,'plain'))); 
    $var =filter_var($var, FILTER_SANITIZE_EMAIL);
    $var = str_replace(" ","",$var);  
    $var = str_replace("'","",$var);  
    $var = str_replace("/","",$var); 
    return $var;
}
function normalInputProtextChat($var){
    $var=(stripslashes(sanitizeOne($var,'plain'))); 
    $var = str_replace("'","",$var);  
    $var = str_replace("/","",$var); 
    $var = str_replace("^","",$var); 
    $var = str_replace("-","",$var); 
    $var = str_replace('[',"",$var);  
    $var = str_replace("]","",$var); 
    $var = str_replace("^","",$var); 
    $var = str_replace("\"","",$var); 
    //$var = ereg_replace("^[a-z0-9\s]", "", $var );
    return $var;
}
    

?>
