<?php
require_once("config.php");

$response = array();
$account = new Admin($con);

if(isset($_POST['authAdmin'])){

    $data = json_decode($_POST['authAdmin']);
    

    $userName = FormSanitizer::sanitizeFormUserName($data->userName);
    $password = FormSanitizer::sanitizeFormPassword($data->password);
    

    $wasSuccessful = $account->login($userName, $password);

    if($wasSuccessful){
        $_SESSION["adminLoggedIn"] = $userName;
        // SUCCESS
        $response = createResponse(200, "Successful", "Successfully Logged In", $userLoggedInObj->getUserData());
  
    }

    else {

        $response = createResponse(401, "Failed", "Sign In Failed", $account->getErrors());
    }
    
    
}

echo json_encode($response);



?>