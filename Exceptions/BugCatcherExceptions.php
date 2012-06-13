<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BugCatcherException
 *
 * @author danielbokser
 */
class BugCatcherException extends Exception {
    
   public function __construct($message, $code = 0, $previous = NULL) {
       parent::__construct($message, $code, $previous);
   }
}

class ModelAlreadyExistsException extends BugCatcherException{
    //put your code here
}

?>
