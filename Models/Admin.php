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
        foreach($registerData as $fieldName => &$value)
        {
            if($fieldName === 'password')
                continue;
            $value = "'" . $value . "'";
        }
        
        Model::addRow('ADMINS', $registerData);
    }
    
    /**
     * If username and password match, this method returns an admin object, else it returns false
     * @param type $username username of the user
     * @param type $password plain text password of the user
     * @return boolean|\User the user itself if password matches the username (and username exists) , else false
     */
    public static function login($username, $password)
    {
        
        try{
            $user = new User($username, 'username');
            
            if($user->password !== crypt($password, SALT))
                    return FALSE;
            
            return $user;
        }
        catch(BugCatcherException $ex)
        {
            echo $ex->getMessage();
            return FALSE;
            
        }
        
        
        
    }
}

?>
