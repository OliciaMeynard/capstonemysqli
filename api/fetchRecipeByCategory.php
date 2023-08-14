<?php
require_once 'config.php';




if(isset($_POST['allRecipes'])){

    $response = array();
    $data = array();    


    $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy ORDER BY ".TBL_RECIPES.".uploadDate DESC";
    
    $success = $con->query($query);
    
    while ($row = $success->fetch_assoc()){
        array_push($data, $row);
    }
    ////////////////////////////////////
    for($i = 0; $i < count($data); $i++){
        $change = $data[$i]['uploadDate'];
        $data[$i]['formattedDate'] = date("M j, Y", strtotime($change));
    }
    $response = createResponse(200, 'fetched recipes', 'result of recipes', $data);

    echo json_encode($response);

}



if(isset($_POST['asiancuisine'])){
    $data = fetchRecipeByCategory($_POST['asiancuisine']);    
    $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
    echo json_encode($response);

}

if(isset($_POST['drinks'])){
    $data = fetchRecipeByCategory($_POST['drinks']);    
    $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
    echo json_encode($response);

}
if(isset($_POST['salad'])){
    $data = fetchRecipeByCategory($_POST['salad']);    
    $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
    echo json_encode($response);

}


if(isset($_POST['europeandish'])){
    $data = fetchRecipeByCategory($_POST['europeandish']);    
    $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
    echo json_encode($response);

}


if(isset($_POST['vegetarian'])){
    
    $data = fetchRecipeByCategory($_POST['vegetarian']);    
    $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
    echo json_encode($response);

}


function fetchRecipeByCategory($issetCat){
        global $con;
        $category = json_decode($issetCat);

        $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_RECIPES.".category = '$category' AND ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy  ORDER BY ".TBL_RECIPES.".uploadDate DESC";

        // $query = $con->prepare("SELECT * FROM  " .  TBL_RECIPES. "  WHERE category = :category");
    

        $data = array();    
        $success = $con->query($query);
    
        while ($row = $success->fetch_assoc()){
            array_push($data, $row);
        }
        ////////////////////////////////////
        for($i = 0; $i < count($data); $i++){
            $change = $data[$i]['uploadDate'];
            $data[$i]['formattedDate'] = date("M j, Y", strtotime($change));
        }


        return $data;
    }





?>