<?php
function createResponse($status, $title, $description, $data = array()) {
    $response = array();
    $response["status"] = $status;
    $response["description"] = $description;
    $response["title"] = $title;
    $response["data"] = $data;
    
    return $response;
}

///////////////////////GET PROFILE PIC ON COMMENTS

function getAllComments($con, $recipeId){

    // $query = $con->prepare("SELECT * FROM ".TBL_COMMENTS." INNER JOIN ".TBL_USERS." WHERE  ".TBL_COMMENTS.".recipeId = :recipeId
    //                                             AND ".TBL_USERS.".username = ".TBL_COMMENTS.".postedBy ORDER BY datePosted DESC");
    // $query->bindParam(":recipeId", $recipeId);
    // $query->execute();
    


    // $results = $query->fetchAll(PDO::FETCH_ASSOC);
    // return $results;



    $query = "SELECT * FROM ".TBL_COMMENTS." INNER JOIN ".TBL_USERS." WHERE  ".TBL_COMMENTS.".recipeId = '$recipeId'
                 AND ".TBL_USERS.".username = ".TBL_COMMENTS.".postedBy ORDER BY datePosted DESC";
    $results= $con->query($query);

    $data = array();

    while ($row = $results->fetch_assoc()){

        
        $timestamp=strtotime($row['datePosted']);
        $formattedDate = ago( $timestamp );
        $row['formattedDate'] = $formattedDate;
        array_push($data, $row);
    }


      return $data;
}




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

// $date='2016-01-21 23:15:00';
// $timestamp=strtotime($date);
// echo ago( $timestamp );






function formatDate($date){
    return date("M j, Y", strtotime($date));
}