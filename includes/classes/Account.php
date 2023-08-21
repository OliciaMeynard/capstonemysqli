<?php
// require_once "../../api/config.php";
require_once "Constants.php";


class Account{


    private $con;
    public $errorArray = array();
  
    

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function login($userName, $password){
            $password = hash("sha512", $password);
            $sql = "SELECT * FROM ".TBL_USERS." WHERE username = '$userName' AND password = '$password'";
            $results = $this->con->query($sql);

            $users = array();
            

            while ($row = $results->fetch_assoc()) {
                array_push($users, $row);
            }
     


        if(count($users) === 1){
            return true;
        }
        else {
            array_push($this->errorArray, Constants::$errorLogIn);
        }
    }



    public function getErr(){
        return $this->errorArray;
    }

    public function register($firstName,
                            $lastName,
                            $userName,
                            $email,
                            $email2,
                            $password,
                            $password2){
        $this->validateFirstname($firstName);
        $this->validatelastname($lastName);
        $this->validateUsername($userName);
        $this->validateEmail($email, $email2);
        $this->validatePassword($password, $password2);

         if(empty($this->errorArray)){
            return $this->insertUserDetails($firstName,
                                        $lastName,
                                        $userName,
                                        $email,
                                        $password);
         }  else {

            return false;
         }                     
    }

    public function insertUserDetails($firstName,
                                        $lastName,
                                        $userName,
                                        $email,
                                        $password){
                /////////HASHING PASSWORD
                $password = hash("sha512", $password);
                /////////HASHING PASSWORD
         
                $query = "INSERT INTO ".TBL_USERS."(firstName, lastName, username, email, password,profilePic)
                                             VALUES('$firstName', '$lastName', '$userName', '$email', '$password', NULL)";
                return $this->con->query($query);          
        
    }

    private function validateFirstname($firstName){
        if(strlen($firstName) > 30 || strlen($firstName) < 2){
            array_push($this->errorArray, Constants::$firstNameCharacters);
        }
    }
    private function validateLastname($lastName){
        if(strlen($lastName) > 30 || strlen($lastName) < 2){
            array_push($this->errorArray, Constants::$lastNameCharacters);
        }
    }
    private function validateUsername($userName){
        if(strlen($userName) > 30 || strlen($userName) < 5){
            array_push($this->errorArray, Constants::$userNameCharacters);
        }

    $query = "SELECT username FROM ".TBL_USERS." WHERE username = '$userName'";
    $results = $this->con->query($query);


    $users = array();
            

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }



    if(count($users) != 0){
        
            array_push($this->errorArray, Constants::$userNameTaken);           
    }
}


    private function validateEmail($email, $email2){
        if( $email != $email2){
            array_push($this->errorArray, Constants::$emailsNotmatch);

        }

           //Filters a variable with a specified filter
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) { ///FILTER_VALIDATE_EMAIL built in
                array_push($this->errorArray, Constants::$emailInvalid);
                // return;
            }
            $query = "SELECT email FROM users WHERE email= '$email'";
            $results = $this->con->query($query);

            $users = array();
            

            while ($row = $results->fetch_assoc()) {
                array_push($users, $row);
            }
          
        if(count($users) != 0){
            array_push($this->errorArray, Constants::$emailTaken);           
        }

    }

    private function validatePassword($password, $password2){
        if( $password != $password2){
            array_push($this->errorArray, Constants::$passwordsNotmatch);
            // $this->errorArray[] = Constants::$emailsNotmatch;
            // return;
        }
        if( preg_match("/[^A-Za-z0-9]/",$password)){
            array_push($this->errorArray, Constants::$passwordNotAlphaNumeric);
            // $this->errorArray[] = Constants::$emailsNotmatch;
            // return;
        }

        if(strlen($password) > 30 || strlen($password) < 5){
            array_push($this->errorArray, Constants::$passwordLength);
            // return;
        }

    }

    // public function getError($error){
    //     if(in_array($error, $this->errorArray)){
    //         echo "<span class='errorMessage'>$error</span>";
    //     }
    // }

    public function getErrors(){
        return $this->errorArray;
    }



    


} 