<?php
//Expires all of the user's cookies
setcookie('usertype', '', time()-60);
setcookie('userID', '', time()-60);
setcookie('compID','',time()-60);
?>