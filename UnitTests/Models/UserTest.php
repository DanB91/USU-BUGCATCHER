<?php

require_once dirname(__FILE__) . '/../../Models/User.php';

/**
 * Test class for User.
 * Generated by PHPUnit on 2012-06-07 at 11:41:27.
 */
class UserTest extends PHPUnit_Framework_TestCase {

    /**
     * @var User
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
        $this->object = new User(0);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        
    }
    
    public function testFields()
    {
        
        
        $this->assertSame('dansbok', $this->object->username);
        //echo $this->object->password . "\n";
        
    }
    
    public function testCommitToDB()
    {
        /*
       
        //$this->object->username = 'dansbok';
        $this->object->password = 'test';
        echo $this->object->password;
        
        //var_dump(connectToDB()->query('SELECT * from USERS where username = \'dsio\'')->fetch_assoc());
        
        $this->object->commitToDB();  
       */
    }
    
    public function testLogin()
    {
        $this->assertEquals(User::login('dansb', 'tedst'), FALSE);
    }
    
    public function testRegister()
    {
        //User::registerUser(array('username' => 'mid', 'password' => 'test', 'fname' => 'sid', 'lname' => 'b'));
    }
    
    public function testLoadLinks()
    {
        var_dump($this->object->teamids);
    }
    
    

}

?>
