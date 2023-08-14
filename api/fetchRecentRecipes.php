<?php
require_once 'config.php';


if(isset($_POST['getRecentRecipes'])){

    $response = array();

    $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy ORDER BY ".TBL_RECIPES.".uploadDate DESC LIMIT 6";
    $results = $con->query($query);
    $data = array();

    if($results){
        
        while ($row = $results->fetch_assoc()){
            array_push($data, $row);
        }
    
        for($i = 0; $i < count($data); $i++){
            $change = $data[$i]['uploadDate'];
            $data[$i]['formattedDate'] = date("M j, Y", strtotime($change));
        }
    
        $response = createResponse(200 , 'recipe recent', 'all recipe recent', $data);
    
        

    }

    else{
        $response = createResponse(404 , 'failed recent recipes', 'failed all recipe recent', $data);
    }

    echo json_encode($response);
    

}

?>