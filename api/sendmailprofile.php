<?php
require_once 'config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPmailer.php';
require 'phpmailer/src/SMTP.php';

if(isset($_POST["email"])){
    $formData = json_decode($_POST['email']);
    $data = $formData;
    $response = array();


    //////////////PHP MAILER CODE
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'recipeshare26@gmail.com';
    $mail->Password = 'hlqzcncffpvkoywr';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    
    $mail->setFrom('recipeshare26@gmail.com', $data->name);
    $mail->addAddress($data->emailSendto);
    $mail->isHTML(true);
    $mail->Subject = $data->subject;
    $mail->Body = "Sender Email: ".$data->email.
                    "
                    "
                    ."message: ". $data->message;
    $mail->send();
    
    // echo "
    // <script>
    // alert('Sent Successfully');
    // document.location.href = 'index.php'
    // </script>
    // ";
    //////////////PHP MAILER CODE
    $response = createResponse('200', 'ok data email', 'ok data email', $data);
    echo json_encode($response);
    
}


//////////////////EMAIL VERIFY
// <?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'phpmailer/src/Exception.php';
// require 'phpmailer/src/PHPmailer.php';
// require 'phpmailer/src/SMTP.php';

// if(isset($_POST["send"])){
//     $mail = new PHPMailer(true);

//     $mail->isSMTP();
//     $mail->Host = 'smtp.gmail.com';
//     $mail->SMTPAuth = true;
//     $mail->Username = 'olicia.meynard2@gmail.com';
//     $mail->Password = 'hpdqwwbizumlihya';
//     $mail->SMTPSecure = 'ssl';
//     $mail->Port = 465;

//     $mail->setFrom('olicia.meynard@gmail.com');
//     $mail->addAddress($_POST["email"]);
//     $mail->isHTML(true);
//     $mail->Subject = $_POST["subject"];
//     $mail->Body = $_POST["message"];
//     $mail->send();

//     echo "
//     <script>
//     alert('Sent Successfully');
//     document.location.href = 'index.php'
//     </script>
//     ";
// }