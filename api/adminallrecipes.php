<?php
require_once 'config.php';


if(isset($_GET['index'])){
    
    $response = array();
    $data = array(); 
                    
                    $query = "SELECT * FROM ".TBL_RECIPES;

                    $followings = $con->query($query); 
                    while ($row = $followings->fetch_assoc()){
                        array_push($data, $row);
                    }

    
    for ($i = 0; $i < count($data); $i++) {
        $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_COMMENTS."` WHERE recipeId = '".$data[$i]['id']."'");
        $row2 = $queryRecipes->fetch_assoc(); 
        $data[$i]['allComments'] = $row2['COUNT'];

        $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_FAVORITES."` WHERE recipeId = '".$data[$i]['id']."'");
        $row2 = $queryRecipes->fetch_assoc(); 
        $data[$i]['numFavorites'] = $row2['COUNT'];

      };


    
     $response = createResponse(200 , 'recipes', 'all recipe recent', $data);
    
        


    echo json_encode($response);
    

}

?>