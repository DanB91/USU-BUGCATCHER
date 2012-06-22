<?php
require_once 'Model.php';
require_once 'Bug.php';
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
    
    public function addProblemToCompetition(Competition $comp)
    {
        $this->createRelationToModel($comp, 'COMPETITION_PROBLEM_LINK');	
    }
    
    public function removeProblemFromCompetition(Competition $comp)
    {
	$this->removeRelationFromModel($comp, 'COMPETITION_PROBLEM_LINK');
    }
    
    
    public function getBugs()
    {
        $retBugs = array();
        $this->connection = connectToDB();
        
        $sql = 'SELECT bugid FROM BUGS WHERE problemid = ' . $this->getPrimaryKeyValue();
        if(!$result = $this->connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
        while(($row = $result->fetch_assoc()))
        {          
            $retBugs[] = new Bug($row['bugid']);
        }
        
        return $retBugs;
    }
    
    public static function getAllProblems()
    {
        $retProbs = array();
        
        $connection = connectToDB();
        
        $sql = 'SELECT problemid FROM PROBLEMS';
        if(!$result = $connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
          
        
        while(($row = $result->fetch_assoc()))
        {          
            $retProbs[] = new Problem($row['problemid']);
        }
        
        return $retProbs;   
    }
    
    
    /**
     *Adds problem to the database with bug information
     * @param array $problemData array of db data
     * @param array $bugsData array bugs which each conatains an array of db data (so this is a double array)\
     * important to note that $bugsData does not contain 'problemid' as we do not have it yet.  It is added automatically 
     */
    public static function addProblemToDB(array $problemData, array $bugsData)
    {
        
        foreach($problemData as &$value)
        {
            $value = "'" . $value . "'";
        }
        
        
        Model::addRow('PROBLEMS', $problemData);
        
        $problem = new Problem($problemData['problemname'], 'problemname');
        
        //needed for adding bugs
        $problemID = $problem->problemid;
        
        
        
        foreach ($bugsData as &$bugData)
        {
            $bugData['problemid'] = $problemID;
            Bug::addBugToDB($bugData);
        }
        
        
    }
    
   
}

?>
