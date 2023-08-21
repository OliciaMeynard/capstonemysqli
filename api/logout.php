<?php

require_once 'config.php';

if(isset($_POST['LOGOUT'])){
    unset($_SESSION["userLoggedIn"]);
    $response = createResponse(200, 'logout', 'Successfully');
    echo json_encode($response);

}


if(isset($_POST['LOGOUTADMIN'])){
    unset($_SESSION["adminLoggedIn"]);
    $response = createResponse(200, 'logout', 'Successfully');
    echo json_encode($response);

}



