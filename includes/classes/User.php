<?php
class User{

    private $con, $sqlData;

    public function __construct($con, $userName)
    {
        $this->con = $con;
        $sql = "SELECT * FROM ".TBL_USERS." WHERE username = '$userName'";
        $results= $this->con->query($sql);


        $users = array();

        while ($row = $results->fetch_assoc()) {
            array_push($users, $row);
        }

        $this->sqlData =  $users;

        
    }


    public function getUserName(){
        return $this->sqlData[0]["username"];
    }
    public function getUserId(){
        return $this->sqlData[0]["uid"];
    }
    public function getName(){
        return $this->sqlData[0]["firstName"]. " ".$this->sqlData[0]["lastName"];
    }
    public function getEmail(){
        return $this->sqlData[0]["email"];
    }
    public function getProfilePic(){
        return $this->sqlData[0]["profilePic"];
    }
    public function getSignUpDate(){
        return $this->sqlData[0]["signUpDate"];
    }


    public function getUserData(){
        return $this->sqlData;
    }

    // return $this->sqlData;

    

}