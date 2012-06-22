<?php
require_once 'Model.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Represents a single Bug.  You should not have to instatiate the bug directly.
 * Please use the static methods or methods of other models to get a team object.
 * 
 * Read the Model class description accessing and using fields
 *
 * @author chelynnd
 */
class Bug extends Model {
    public function __construct($uniqueValue) {
        parent::__construct('BUGS', $uniqueValue);
    }
    
    public static function addBugToDB(array $data)
    {
        foreach($data as $fieldName => &$value)
        {
            if($fieldName === 'abpath' || $fieldName === 'abpath')
                $value = "'" . $value . "'";
        }
        
        Model::addRow('BUGS', $data);
    }
}

?>