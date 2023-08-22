<?php
require_once 'config.php';

$response = [];
$message = new Message($con);

if(isset($_POST['store'])){

    $res = json_decode($_POST['store']);


    $name = $res->name;
    $messageBody = $res->message;

    $wasSuccesful = $message->sendMessage($name, $messageBody);

    if($wasSuccesful){

        $response = createResponse(200, 'message sent', 'message sent', $res);
    }
    
    else {
        $response = createResponse(400, 'message not sent', 'message not sent', $res);

    }
    echo json_encode($response);
    exit();
}


if(isset($_GET['index'])){

    $wasSuccesful = $message->getMessages();

    if($wasSuccesful != false){
        $response = createResponse(200, 'successfully fetch messages', 'successful', $wasSuccesful);
    }

    else {
        $response = createResponse(400, 'could not fetch messages', 'could not fetch messages', $wasSuccesful);
    }

 echo json_encode($response);
 exit();
}


if(isset($_POST['destroy'])){

    $id = $_POST['destroy'];

    $wasSuccesful = $message->deleteMessage($id);

    if($wasSuccesful != false){
        $response = createResponse(200, 'successful', 'successfully deleted message', $wasSuccesful);
    }

    else {
        $response = createResponse(400, 'could not delete message', 'could not delete', $wasSuccesful);
    }

 echo json_encode($response);
 exit();
}




?>