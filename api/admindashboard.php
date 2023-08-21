<?php
require_once 'config.php';


if(isset($_POST['getDashboard'])){
    
    $response = array();
    $data = array(); 
                    

        $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM ".TBL_USERS);
        $row2 = $queryRecipes->fetch_assoc(); 
        $data['allusers'] = $row2['COUNT'];


        $queryFollowers = $con->query("SELECT COUNT(*) AS COUNT FROM ".TBL_RECIPES);
        $row2 = $queryFollowers->fetch_assoc(); 
        $data['allrecipes'] = $row2['COUNT'];

        $queryFollowing = $con->query("SELECT COUNT(*) AS COUNT FROM ".TBL_COMMENTS);
        $row2 = $queryFollowing->fetch_assoc(); 
        $data['allComments'] = $row2['COUNT'];

        $queryViews = $con->query("SELECT SUM(views) AS SUM FROM ".TBL_RECIPES);
        $row3 = $queryViews->fetch_assoc(); 
        $data['sumviews'] = $row3['SUM'];



    
     $response = createResponse(200 , 'dashboard', 'dashboard results', $data);
    
        


    echo json_encode($response);
    

}


///////user Delete

if(isset($_POST['destroyUser'])){
    $userId = json_decode($_POST['destroyUser']);

    $query = ("DELETE FROM  ".TBL_USERS." WHERE uid = '$userId' ");
    $isDeleted = $con->query($query);   



   
    if($isDeleted){
        $response = createResponse(200, "success", "successfully Deleted");
        unset($_SESSION["userLoggedIn"]);

    } else {
        $response = createResponse(401, "Error", "Error deleting");
    }

    echo json_encode($response);
}




?>