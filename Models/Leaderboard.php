<?php

require_once dirname(__FILE__) . '/../Database/Connection.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Leaderboard
 *
 * @author danielbokser
 */
class Leaderboard {
    
    private $competition;
    private $teamsStats;
    
    
    public function __construct(Competiton $competition) {
        $this->competition = $competition;
        
        $this->load();
    }
    
    
    /**
     * Updates the leaderboard and returns an array of team stats sorted by place
     * Access the each value  array using 
     * $array['teamName']
     * @return type 
     */
    public function getStats()
    {
        $this->teamsStats = array();
        $this->load();
        return $this->teamsStats;
    }
    
    
    private function load()
    {
        $teamsThatHaveFoundBugs = array();
        
        
        
        $connection = connectToDB();
        
        $sql = 'select TEAMS.teamname, count(TEAM_FOUND_BUG.bugid) as bugsfound, max(TEAM_FOUND_BUG.timestamp) as latest'.
                ' from TEAM_FOUND_BUG inner join TEAMS on TEAM_FOUND_BUG.teamid = TEAMS.teamid where compid = '. 
                $this->competition->getPrimaryKeyValue() .' group by TEAM_FOUND_BUG.teamid order by bugsfound desc, latest asc';
        
        
        if(!$result = $connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
        
        while(($row = $result->fetch_assoc()))
        {
            $teamsThatHaveFoundBugs[] = $row['teamname'];
            
            $this->teamsStats[] = $this->getStatsArray($row['teamname'], $row['bugsfound'], $row['latest']);
            
           
        }
        
        //take care of the case where the team hasn't found a bug yet
        $sql = 'select teamname from TEAMS inner join TEAM_COMPETITION_LINK on TEAMS.teamid = TEAM_COMPETITION_LINK where '.
            'compid = ' . $this->competition->getPrimaryKeyValue();
        
        if(!$result = $connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
        
        while(($row = $result->fetch_assoc()))
        {
            if(!in_array($row['teamname'], $teamsThatHaveFoundBugs))
            {
                $this->teamsStats[] =  $this->getStatsArray($row['teamName'], 0, '0000-00-00 00:00:00');
            }
           
        }
        
        
        
        
    }
    
    /**
     *Retruns a stats array that contains the teamname, bugsfound and the time the last time bug was found
     * @param type $teamName
     * @param type $bugsFound
     * @param type $lastTimeFound 
     */
    private function getStatsArray($teamName, $bugsFound, $lastTimeBugFound)
    {
       return array('teamName' => $teamName, 'bugsFound' => $bugsFound, 'lastTimeBugFound' => $lastTimeBugFound); 
    }
    
    
}

?>
