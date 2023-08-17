<?php

require_once("config.php");

                    
function ago( $time ){
    $periods = array("second", "minute", "hour", "day", "week", "month", "year", "decade");
    $lengths = array("60","60","24","7","4.35","12","10");
 
    $now = time();
 
        $difference     = $now - $time;
        $tense         = "ago";
 
    for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
        $difference /= $lengths[$j];
    }
 
    $difference = round($difference);
 
    if($difference != 1) {
        $periods[$j].= "s";
    }
 
    return "$difference $periods[$j] ago ";
}

$date='2016-01-21 23:15:00';
$timestamp=strtotime($date);
echo ago( $timestamp );



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