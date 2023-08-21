<?php
require_once 'config.php';



$response = array();

if(isset($_GET['getUser'])){

    $userUid = json_decode($_GET['getUser']);

    $query = "SELECT * FROM ".TBL_USERS." WHERE uid = '$userUid' ";
            
    $result = $con->query($query);   
    $data = array();

    while ($row = $result->fetch_assoc()){
        array_push($data, $row);
    }

    $response = createResponse(200, "Successfully fetch", "User is fetched", $data[0]);


    echo json_encode($response);

}