<?php
require_once 'Model.php';
//require_once 'Competition.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Represents a single Problem.  You should not have to instatiate the problem directly.
 * Please use the static methods or methods of other models to get a team object.
 * 
 * Read the Model class description accessing and using fields
 *
 * @author chelynnd
 */
class Problem extends Model {
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
        parent::__construct('PROBLEMS', $uniqueValue, $uniqueFieldName, array('COMPETITION_PROBLEM_LINK'));
    }
    
    public function addProblemToCompetition(Competition &$comp)
    {
        $this->createRelationToModel($comp, 'COMPETITION_PROBLEM_LINK');	
    }
    
    public function removeProblemFromCompetition(Competition $comp)
    {
	$this->removeRelationFromModel($comp, 'COMPETITION_PROBLEM_LINK');
    }
}

?>
