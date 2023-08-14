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
        array_push($data, $row);
    }


      return $data;
}











function formatDate($date){
    return date("M j, Y", strtotime($date));
}