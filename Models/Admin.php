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
class Admin extends Model{
    
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
        parent::__construct('ADMINS', $uniqueValue, $uniqueFieldName);
    }
    
    public static function registerAdmin(array $registerData)
    {
        foreach($registerData as &$value)
        {
            $value = "'" . $value . "'";
        }
        
        Model::addRow('ADMINS', $registerData);
    }
}

?>
