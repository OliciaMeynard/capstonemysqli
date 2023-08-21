<?php
    require_once("config.php");
   

    $account = new Account($con);
    // echo hash("sha512", "password");



    $response = array();
    $allowedTypes = ['jpg', 'png', 'jpeg', 'webp'];


if(!empty($_POST['username']) || !empty($_POST['firstName']) || !empty($_POST['lastName']) || !empty($_POST['email']) || !empty($_POST['idRef'])){

    $username = FormSanitizer::sanitizeFormUserName($_POST['username']);
    ///////check if username is still the same
        $query = "SELECT username FROM ".TBL_USERS." WHERE uid = '".$_POST['idRef']."'";
        $usernameResult = array();
        $resultsUsername = $con->query($query);
        while ($row = $resultsUsername->fetch_assoc()) {
            array_push($usernameResult, $row);
        }
        if($usernameResult[0]['username'] != $username ){
        ////validate username
        $query = "SELECT username FROM ".TBL_USERS." WHERE username = '$username'";
        $results = $con->query($query);
        $users = array();
        while ($row = $results->fetch_assoc()) {
            array_push($users, $row);
        }
            if(count($users) != 0){
                    $response = createResponse(400, 'Error update', 'Error update', Constants::$userNameTaken );
                    echo json_encode($response);
                    exit();            
            }
            if(count($users) === 0){
                $username = $username;
                       
            }

        }
    
    /////validate username

    $firstName = FormSanitizer::sanitizeFormString($_POST['firstName']);
    $lastName = FormSanitizer::sanitizeFormString($_POST['lastName']);
    $email = FormSanitizer::sanitizeFormEmail($_POST['email']);
    $profilePicRef = $_POST['profilePicRef'];
    $image = $_FILES['file'] ?? null;
    $idRef = $_POST['idRef'];
    // $uploadedFile = '';

    if($image && $image['tmp_name']){

    //     //////DELETE IF IMAGE IF THERE IS EXISTING IMAGE
        if($profilePicRef){
            unlink("../uploads/profpic/".$profilePicRef);
        }

      $fileName = uniqid() . basename($image["name"]) ;
      $fileName = str_replace(" ", "_",$fileName);
      $targetDir = "../uploads/profpic/".$fileName;

      move_uploaded_file($image['tmp_name'], $targetDir);

      $query = "UPDATE ".TBL_USERS." SET username = '$username', firstName = '$firstName',  lastName = '$lastName',
                                  email = '$email', profilePic = '$fileName' WHERE uid = '$idRef'";
      $wasSuccessful = $con->query($query);

        

            if($wasSuccessful){
                
                unset($_SESSION["userLoggedIn"]);
                $_SESSION["userLoggedIn"] = $username;

                $response = createResponse(200, 'updated', 'Successfully Updated' );

            }
            else{
                $response = createResponse(404, 'update Failed', 'Failed update');

            }

    }



    else {

        $query = "UPDATE ".TBL_USERS." SET username = '$username', firstName = '$firstName',  lastName = '$lastName',
        email = '$email' WHERE uid = '$idRef'";
        $wasSuccessful = $con->query($query);
  
  


            if($wasSuccessful){
                unset($_SESSION["userLoggedIn"]);
                $_SESSION["userLoggedIn"] = $username;
                $response = createResponse(200, 'updated', 'Successfully Updated' );

            }
            else{
                $response = createResponse(404, 'update Failed', 'Failed update');

            }

    }




    echo json_encode($response);
}







//     require_once("config.php");
   

//     $account = new Account($con);
//     // echo hash("sha512", "password");



//     $response = array();
//     $allowedTypes = ['jpg', 'png', 'jpeg', 'webp'];


// if(!empty($_POST['username']) || !empty($_POST['firstName']) || !empty($_POST['lastName']) || !empty($_POST['email']) || !empty($_POST['idRef'])){


//     ////////////////////////USERNAME validation
//     $username = validateUsername($_POST['username'], $con);
//     ////////////////////////USERNAME validation END


//     $firstName = FormSanitizer::sanitizeFormString($_POST['firstName']);
//     $lastName = FormSanitizer::sanitizeFormString($_POST['lastName']);
//     $email = FormSanitizer::sanitizeFormEmail($_POST['email']);
//     $profilePicRef = $_POST['profilePicRef'];
//     $image = $_FILES['file'] ?? null;
//     $idRef = $_POST['idRef'];
//     // $uploadedFile = '';

//     if($image && $image['tmp_name']){

//     //     //////DELETE IF IMAGE IF THERE IS EXISTING IMAGE
//         if($profilePicRef){
//             unlink("../uploads/profpic/".$profilePicRef);
//         }

//       $fileName = uniqid() . basename($image["name"]) ;
//       $fileName = str_replace(" ", "_",$fileName);
//       $targetDir = "../uploads/profpic/".$fileName;

//       move_uploaded_file($image['tmp_name'], $targetDir);

//       $query = "UPDATE ".TBL_USERS." SET firstName = '$firstName',  lastName = '$lastName',
//                                   email = '$email', profilePic = '$fileName' WHERE uid = '$idRef'";
//       $wasSuccessful = $con->query($query);

        

//             if($wasSuccessful){
//                 $response = createResponse(200, 'updated', 'Successfully Updated' );

//             }
//             else{
//                 $response = createResponse(404, 'update Failed', 'Failed update');

//             }

//     }



//     else {

//         $query = "UPDATE ".TBL_USERS." SET firstName = '$firstName',  lastName = '$lastName',
//         email = '$email' WHERE uid = '$idRef'";
//         $wasSuccessful = $con->query($query);
  
  


//             if($wasSuccessful){
//                 $response = createResponse(200, 'updated', 'Successfully Updated' );

//             }
//             else{
//                 $response = createResponse(404, 'update Failed', 'Failed update');

//             }

//     }




//     echo json_encode($response);
// }

// function validateUsername($username, $con){
//     $response = '';

//     FormSanitizer::sanitizeFormUserName($username);
//     if(strlen($username) > 30 || strlen($username) < 5){
//         $response = createResponse(200, 'error updated', 'error Updated', Constants::$userNameCharacters );
//         echo json_encode($response);
//         exit(); 
//     }
//     $query = "SELECT username FROM ".TBL_USERS." WHERE username = '$username'";
//     $results = $con->query($query);
//     $users = array();
//     while ($row = $results->fetch_assoc()) {
//         array_push($users, $row);
//     }
//     if(count($users) != 0){
//             $response = createResponse(200, 'updated', 'Successfully Updated', Constants::$userNameTaken );
//             echo json_encode($response);
//             exit();            
//     }


//     echo json_encode($response);
//     exit(); 
    
// }




