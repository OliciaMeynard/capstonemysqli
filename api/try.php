<?php

require_once("config.php");

       $query = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo = 'sheene' AND
                                userFrom = 'blazeDreyden'";

        $results= $con->query($query);
                        
        $data = array();
                        
        while ($row = $results->fetch_assoc()){
        array_push($data, $row);
        }

      echo count($data) . '<br>';







$username = 'meynard';
$Nuser = new User($con, $username);



var_dump($Nuser->getProfilePic());


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<h1><?php  echo $userLoggedInObj->getUserName();?></h1>
<h1><?php $results ?></h1>
    
</body>
</html>