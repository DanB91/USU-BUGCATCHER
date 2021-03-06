<?php

require_once dirname(__FILE__) . '/../../Models/Competition.php';

/**
 * Test class for Competition.
 * Generated by PHPUnit on 2012-06-15 at 11:59:54.
 */
class CompetitionTest extends PHPUnit_Framework_TestCase {

    /**
     * @var Competition
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
	$this->object = new Competition(20);
	$this->assertNotNull($this->object);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
	
    }

    /**
     * @covers Competition::getProblems
     * @todo Implement testGetProblems().
     */
    public function testGetProblems() {
	$arr=$this->object->getProblems();
	//$this->assertNotNull($arr);
	//$this->assertSame($arr, array('1'));
    }
    
    public function testGetJoinableCompetition()
    {
        $arr = Competition::getJoinableCompetitions();
        
        $this->assertSame($arr[0]->compid, '20');
    }

}

?>
