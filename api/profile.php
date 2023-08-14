<?php


include 'config.php';



$response = array();


if(isset($_GET["show"])){

    $userId = json_decode($_GET["show"]);

            $query = "SELECT * FROM ".TBL_USERS." WHERE uid = '$userId' ";
            
            $result = $con->query($query);   
            $data = array();

            while ($row = $result->fetch_assoc()){
                array_push($data, $row);
            }


            $username = $data[0]['username'];

            $followers = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo = '$username'";
            $resultfollowers = $con->query($followers);   
            $followersData = array();
            while ($row = $resultfollowers->fetch_assoc()){
                array_push($followersData, $row);
            }


            $data[0]['followers'] = $followersData;


            $following = ("SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userFrom = '$username'");
            $resultfollowing = $con->query($following); 
            $followingData = array();
            while ($row = $resultfollowing->fetch_assoc()){
                array_push($followingData, $row);
            }

            $data[0]['following'] = $followingData;



            $recipePosted = "SELECT * FROM ".TBL_RECIPES." WHERE uploadedBy = '$username'";
            $resultrecipePosted = $con->query($recipePosted); 
            $recipePostedData = array();

            while ($row = $resultrecipePosted->fetch_assoc()){
                array_push($recipePostedData, $row);
            }


            for($i = 0; $i < count($recipePostedData); $i++){
                $change = $recipePostedData[$i]['uploadDate'];
                $recipePostedData[$i]['formattedDate'] = date("M j, Y", strtotime($change));
            }

            $data[0]['recipePostedData'] = $recipePostedData;




    if(isset($_SESSION["userLoggedIn"])){
            $data[0]['userLoggedInData'] = $userLoggedInObj->getUserData();

        
                //////CHECK IF SUBBED
                    
                    $userFrom = $userLoggedInObj->getUserName();
                    $query = ("SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo= '$username' AND
                    userFrom= '$userFrom'");
                    $result = $con->query($query); 
                    $datares = array();

                    while ($row = $result->fetch_assoc()){
                        array_push($datares, $row);
                    }
         
                    $data[0]['ifSubbed'] = count($datares);
              
    }

    if(!isset($_SESSION["userLoggedIn"])){
        $data[0]['userLoggedInData'] = 'none';
        $data[0]['ifSubbed'] = null;
    }






    $response = createResponse(200, 'Id Request', 'Positive', $data[0]); 
    echo json_encode($response);
}






if(isset($_POST['destroy'])){
    $userId = json_decode($_POST['destroy']);

    $query = ("DELETE FROM  ".TBL_RECIPES." WHERE id = '$userId' ");
    $isDeleted = $con->query($query);   



   
    if($isDeleted){
        $response = createResponse(200, "success", "successfully Deleted");

    } else {
        $response = createResponse(401, "Error", "Error deleting");
    }

    echo json_encode($response);
}






