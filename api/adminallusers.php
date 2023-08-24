<?php


require_once 'config.php';


if(isset($_GET['index'])){
    
    $response = array();
    $data = array(); 
                    
                    $query = "SELECT * FROM ".TBL_USERS." ORDER BY signUpDate DESC";

                    $followings = $con->query($query); 
                    while ($row = $followings->fetch_assoc()){
                        array_push($data, $row);
                    }

    
    for ($i = 0; $i < count($data); $i++) {
        $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_RECIPES."` WHERE uploadedBy = '".$data[$i]['username']."'");
        $row2 = $queryRecipes->fetch_assoc(); 
        $data[$i]['recipePosted'] = $row2['COUNT'];


        $queryFollowers = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userTo= '".$data[$i]['username']."'");
        $row2 = $queryFollowers->fetch_assoc(); 
        $data[$i]['followers'] = $row2['COUNT'];

        $queryFollowing = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userFrom= '".$data[$i]['username']."'");
        $row2 = $queryFollowing->fetch_assoc(); 
        $data[$i]['following'] = $row2['COUNT'];

      };


    
     $response = createResponse(200 , 'all users', 'all users', $data);
    
        


    echo json_encode($response);
    

} 


if(isset($_POST['block'])){

    $response = array();
    $data = array(); 

    $id = json_decode($_POST['block']);

    $query = "SELECT * FROM ".TBL_USERS." WHERE uid = '$id'";
    $toBlock = $con->query($query); 
    while ($row = $toBlock->fetch_assoc()){
        array_push($data, $row);
    }




    if($data[0]['status'] === 'block'){
        $query = "UPDATE ".TBL_USERS." SET status = 'unblock' WHERE uid = '$id'";
        $wasSuccessful = $con->query($query);
        
        if($wasSuccessful){
            $response = createResponse(200, 'block updated', 'Successfully blocked' );
        }
        else{
            $response = createResponse(404, 'block Failed', 'Failed block');
        }

    }
    else{
        $query = "UPDATE ".TBL_USERS." SET status = 'block' WHERE uid = '$id'";
        $wasSuccessful = $con->query($query);
        
        if($wasSuccessful){
            $response = createResponse(200, 'unblock updated', 'Successfully unblocked' );
        }
        else{
            $response = createResponse(404, 'unblock Failed', 'Failed unblock');
        }
    }

    $response = createResponse(200, 'successful block', 'block unblock', $data[0]);
    echo json_encode($response);

}