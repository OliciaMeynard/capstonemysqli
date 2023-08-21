<?php


include 'config.php';



$response = array();


if(isset($_GET["show"])){

    $userId = json_decode($_GET["show"]);

            $query = "SELECT * FROM ".TBL_USERS." WHERE uid = '$userId' ";
            
            $result = $con->query($query);   
            $data = array();

            while ($row = $result->fetch_assoc()){
                $change = $row['signUpDate'];
                $row['formattedDateSignUp'] = date("M j, Y", strtotime($change));
                array_push($data, $row);
            }


            $username = $data[0]['username'];

            /////followers
            $followers = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo = '$username'";
            $resultfollowers = $con->query($followers);   
            $followersData = array();
            while ($row = $resultfollowers->fetch_assoc()){   
                array_push($followersData, $row);
            }

            for ($i = 0; $i < count($followersData); $i++) {

                // SELECT * FROM recipes INNER JOIN users WHERE recipes.uploadedBy = 'meynard' AND users.username = 'meynard';
                $queryFollowers = "SELECT * FROM ".TBL_USERS." WHERE username = '". $followersData[$i]['userFrom']."'";
                $queryFollowersData = $con->query($queryFollowers); 
                while ($row = $queryFollowersData->fetch_assoc()){
                    $followersData[$i]['profilePic'] = $row['profilePic'];
                    $followersData[$i]['uid'] = $row['uid'];
                }
          
            }

            $data[0]['followers'] = $followersData;

            //////following
            $following = ("SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userFrom = '$username'");
            $resultfollowing = $con->query($following); 
            $followingData = array();
            while ($row = $resultfollowing->fetch_assoc()){
                array_push($followingData, $row);
            }


            for ($i = 0; $i < count($followingData); $i++) {

                // SELECT * FROM recipes INNER JOIN users WHERE recipes.uploadedBy = 'meynard' AND users.username = 'meynard';
                $queryFollowing = "SELECT * FROM ".TBL_USERS." WHERE username = '". $followingData[$i]['userTo']."'";
                $queryFollowingData = $con->query($queryFollowing); 
                while ($row = $queryFollowingData->fetch_assoc()){
                    $followingData[$i]['profilePic'] = $row['profilePic'];
                    $followingData[$i]['uid'] = $row['uid'];
                }
          
            }


            $data[0]['following'] = $followingData;


            ///posted recipes
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
            
            
            ///favorite recipes
            // SELECT * FROM `favorites` INNER JOIN recipes WHERE favorites.username =
            // 'meynard' and favorites.recipeId = recipes.id;
            $recipeFavorite = "SELECT * FROM ".TBL_FAVORITES." INNER JOIN ".TBL_RECIPES." WHERE ".TBL_FAVORITES.".username
            = '$username' AND ".TBL_FAVORITES.".recipeId = ".TBL_RECIPES.".id";
            $resultrecipeFavorite = $con->query($recipeFavorite); 
            $recipeFavoriteData = array();

            while ($row = $resultrecipeFavorite->fetch_assoc()){
                array_push($recipeFavoriteData, $row);
            }


            for($i = 0; $i < count($recipeFavoriteData); $i++){
                $change = $recipeFavoriteData[$i]['uploadDate'];
                $recipeFavoriteData[$i]['formattedDate'] = date("M j, Y", strtotime($change));
            }

            $data[0]['recipeFavoriteData'] = $recipeFavoriteData;
            



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





//////////////////////DELETE RECIPE
if(isset($_POST['destroy'])){
    $recipeId = json_decode($_POST['destroy']);

    $query = ("DELETE FROM  ".TBL_RECIPES." WHERE id = '$recipeId' ");
    $isDeleted = $con->query($query);   



   
    if($isDeleted){
        $response = createResponse(200, "success", "successfully Deleted");

    } else {
        $response = createResponse(401, "Error", "Error deleting");
    }

    echo json_encode($response);
}






