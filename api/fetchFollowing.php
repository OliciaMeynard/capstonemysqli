<?php
require_once 'config.php';


if(isset($_POST['getFollowingUpdates'])){
    
    $response = array();
    $data = array();
    
    if(isset($_SESSION["userLoggedIn"])){
            // $data[0]['userLoggedInData'] = $userLoggedInObj->getUserData();

        
                //////CHECK IF SUBBED
                    
                    $loggedInUser = $userLoggedInObj->getUserName();
                    $query = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userFrom = '$loggedInUser' ";
                    // SELECT * FROM recipes INNER JOIN subscribers WHERE recipes.uploadedBy = "jdCoke" AND subscribers.userFrom = "jdCoke";

                    $followings = $con->query($query); 
                    $datafollowings = array();

                    while ($row = $followings->fetch_assoc()){
                        array_push($datafollowings, $row);
                    }

                    $dataFollowingsRecipes = array();

                    for ($i = 0; $i < count($datafollowings); $i++) {

                        // SELECT * FROM recipes INNER JOIN users WHERE recipes.uploadedBy = 'meynard' AND users.username = 'meynard';
                        $queryRecipe = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_RECIPES.".uploadedBy = '".$datafollowings[$i]['userTo']."' AND ".TBL_USERS.".username = '".$datafollowings[$i]['userTo']."' ORDER BY ".TBL_RECIPES.".uploadDate DESC LIMIT 6";
                        $queryRecipeData = $con->query($queryRecipe); 
                        while ($row = $queryRecipeData->fetch_assoc()){
                            $change = $row['uploadDate'];
                            $row['formattedDate'] = date("M j, Y", strtotime($change));
                            array_push($dataFollowingsRecipes, $row);
                        }
                  
                      }
         
                    // $data[0]['ifSubbed'] = count($datares);
                    $data['loggedInUser'] = $loggedInUser;
                    $data['datafollowings'] = $datafollowings;
                    $data['dataFollowingsRecipes'] = $dataFollowingsRecipes;
              
    }

    else {
        $data['loggedInUser'] = null;
              
    }




    // $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy ORDER BY ".TBL_RECIPES.".uploadDate DESC LIMIT 6";
    // $results = $con->query($query);

    // if($results){
        
    //     while ($row = $results->fetch_assoc()){
    //         array_push($data, $row);
    //     }
    
    //     for($i = 0; $i < count($data); $i++){
    //         $change = $data[$i]['uploadDate'];
    //         $data[$i]['formattedDate'] = date("M j, Y", strtotime($change));
    //     }
    
        $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
        

    // }

    // else{
    //     $response = createResponse(404 , 'failed recent recipes', 'failed all recipe recent', $data);
    // }

    echo json_encode($response);
    

}

?>