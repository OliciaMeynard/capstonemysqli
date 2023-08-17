<?php
 require_once 'config.php';

//  let record = {
//     "body" : commentBodyId.value,
//     "recipeId" : script.idUrl,
//     "uploadedBy" : script.uploadedBy
// }


if(isset($_POST['store'])) {
    $response = '';
    $data = json_decode($_POST['store']);

    $postedBy = $data->postedBy;
    $recipeId = $data->recipeId;
    $body = $data->body;

    $userLoggedInObj = new User($con, $_SESSION["userLoggedIn"]);

    $query = "INSERT INTO ".TBL_COMMENTS."(postedBy, recipeId, body)
                VALUES('$postedBy', '$recipeId', '$body')";
    $wasSuccessful = $con->query($query);

    if($wasSuccessful ){

        
        $results = getAllComments($con, $recipeId);
        $response = createResponse(200,'OK', 'Successfully Added and fetch new comment', $results  );
    }

    if(!$wasSuccessful){
        $response = "One or more parameters are not passed into subscribe.php the file";
    }


    echo json_encode($response);

    // $userLoggedInObj = new User($con, $_SESSION["userLoggedIn"]);
    // $newComment = new Comment($con, $con->lastInsertId(), $userLoggedInObj, $recipeId );
    // echo $newComment->getLastInserted();

    // return new comment html

}

if(isset($_POST['destroy'])){
    $id = json_decode($_POST['destroy']);

    $query = ("DELETE FROM  ".TBL_COMMENTS." WHERE id = '$id' ");
    $isDeleted = $con->query($query);   



   
    if($isDeleted){
        $response = createResponse(200, "success", "successfully Deleted");

    } else {
        $response = createResponse(401, "Error", "Error deleting");
    }

    echo json_encode($response);
}




?>