<?php

require_once dirname(__FILE__) . '/../../Models/Team.php';
require_once dirname(__FILE__) . '/../../Models/Competition.php';

/**
 * Test class for Team.
 * Generated by PHPUnit on 2012-06-13 at 23:56:44.
 */
class TeamTest extends PHPUnit_Framework_TestCase {

    /**
     * @var Team
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
        $this->object = new Team(1);
    }

    public function testFields(){
	$this->assertSame($this->object->teamname, 'testTeam');
	$this->assertSame($this->object->teamleaderid, '21');
	$this->assertSame($this->object->hidden, '0');
	$this->assertSame($this->object->joinable, '0');
	
    }
    
    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        
    }

    /**
     * @covers Team::createTeam
     * @todo Implement testCreateTeam().
     */
    public function testCreateTeam() {
        Team::createTeam(array('teamname' => 'A-team', 'teamleaderid' => 10, 'hidden' => 1));
	$team = new Team(28);
	$this->assertSame($team->teamname, 'A-team');
	$this->assertSame($team->teamleaderid, '10');
	$this->assertSame($team->hidden, '1');
	$this->assertSame($team->joinable, '0');
    }
    
    public function testAddTeamToCompetition() {
	$competition=new Competition(20);
	$this->assertSame($competition->compname, '123');
	$this->object->addTeamToCompetition($competition);
	//$this->assertSame($competition->teamids[0], '1');
	//$this->assertSame($this->object->compids[0], '1');
    }

    public function testRemoveTeamFromCompetition() {
	$competition=new Competition(20);
	$this->assertSame($competition->compname, '123');
	$this->object->removeTeamFromCompetition($competition);
	//$this->assertSame($competition->teamids, array());
	//$this->assertSame($this->object->compids, array());
    }
<<<<<<< HEAD
=======
    
    public function testFoundBugInCompetition(){
	$bug=new Bug(1);
	$comp=new Competition(20);
	$this->object->foundBugInCompetition($bug, $comp);
    }
    
    public function testHasFoundBugInCompetition(){
	$bug=new Bug(1);
	$comp=new Competition(20);
	$time=$this->object->hasFoundBugInCompetition($bug, $comp);
	echo $time;
	
    }
    
    public function testGetNumberOfStudentsOnTeam(){
	$this->assertSame($this->object->getNumberOfStudentsOnTeam(), 1);
    }
>>>>>>> e8a42aeeb52a6c7c92b930250a76487a98c4eb04

}

?>
