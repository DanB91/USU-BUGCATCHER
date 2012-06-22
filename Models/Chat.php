<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'Model.php';
/**
 * Class the represents admin
 *
 * @author danielbokser
 */
class Chat extends Model{
    
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
        parent::__construct('CHATS', $uniqueValue, $uniqueFieldName);
    }
}

?>
