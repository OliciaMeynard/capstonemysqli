<?php

require_once 'config.php';

$response = array();


if(isset($_GET['search'])){
    $search = json_decode($_GET['search']);


    $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_RECIPES.".title LIKE '%$search%' AND ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy  ORDER BY ".TBL_RECIPES.".uploadDate DESC";

    
} else {
      $query = "SELECT * FROM ".TBL_RECIPES." INNER JOIN ".TBL_USERS." WHERE ".TBL_USERS.".username = ".TBL_RECIPES.".uploadedBy ORDER BY ".TBL_RECIPES.".uploadDate DESC";


}

$success = $con->query($query);

if($success){


    
  $data = array();

  while ($row = $success->fetch_assoc()){
      array_push($data, $row);
  }
  


  ////////////////////////////////////
  for($i = 0; $i < count($data); $i++){
      $change = $data[$i]['uploadDate'];
      $data[$i]['formattedDate'] = date("M j, Y", strtotime($change));
  }
  $response = createResponse(200, 'fetched recipes', 'result of recipes', $data);


}




else{
  $response = createResponse(400, 'Error', 'could not fetch recipes');
}

echo json_encode($response);


