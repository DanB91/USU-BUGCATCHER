<?php
if (isset($_SESSION['userObject']) && $_SESSION['userObject'] != NULL)
    echo 1;
else echo 0;
?>
