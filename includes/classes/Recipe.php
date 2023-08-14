<?php
class Recipe{

    private $con, $sqlData, $userLoggedInObj;

    public function __construct($con, $input, $userLoggedInObj)
    {
        $this->con = $con;
        $this->userLoggedInObj = $userLoggedInObj;

        if(is_array($input)){
            $this->sqlData = $input;
        }

        else {
            
            $query = "SELECT * FROM ".TBL_RECIPES." WHERE id = '$input'";
            $results = $con->query($query);
            $data = array();
        
            while ($row = $results->fetch_assoc()){
            array_push($data, $row);

            $this->sqlData = $data[0];
        }
    
 
        }




    }

    public function getUserName(){
        return $this->sqlData["username"];
    }
    public function getId(){
        return $this->sqlData["id"];
    }
    public function getUploadedBy(){
        return $this->sqlData["uploadedBy"];
    }
    public function getTitle(){
        return $this->sqlData["title"];
    }
    public function getDescription(){
        return $this->sqlData["description"];
    }
    public function getPrivacy(){
        return $this->sqlData["privacy"];
    }
    public function getFilePath(){
        return $this->sqlData["filePath"];
    }
    public function getCategory(){
        return $this->sqlData["category"];
    }
    public function getUploadDate() {
        $date = $this->sqlData["uploadDate"];
        return date("M j, Y", strtotime($date));
    }
    public function getViews(){
        return $this->sqlData["views"];
    }

    public function incrementViews(){
        $recipeId = $this->getId();
        $query = "UPDATE ".TBL_RECIPES." SET views=views+1 WHERE id = '$recipeId'";
        $this->con->query($query);
    }

    public function getFavorites(){
        $recipeId = $this->getId();
        $query = "SELECT * FROM ".TBL_FAVORITES." WHERE recipeId = '$recipeId'";
        $results= $this->con->query($query);

        $data = array();

        while ($row = $results->fetch_assoc()){
            array_push($data, $row);
        }


          return count($data);

    }


    public function getSumComments(){

        $recipeId = $this->getId();
        $query = "SELECT *  FROM ".TBL_COMMENTS." WHERE recipeId = '$recipeId'";
        $results= $this->con->query($query);

        $data = array();

        while ($row = $results->fetch_assoc()){
            array_push($data, $row);
        }


          return count($data);
    }


    public function favorite(){
        $id = $this->getId();
        $username = $this->userLoggedInObj->getUserName();
        $query = "SELECT * FROM ".TBL_FAVORITES." where username = '$username' AND recipeId = '$id'";
        $results= $this->con->query($query);
        $data = array();

        while ($row = $results->fetch_assoc()){
            array_push($data, $row);
        }




        if(count($data) > 0){
            //user has already Liked     
        $query = "DELETE FROM ".TBL_FAVORITES." where username = '$username' AND recipeId = '$id'";
        $results= $this->con->query($query);
        }

        else {
            //user has not liked
            $query = "INSERT INTO ".TBL_FAVORITES."(`username`, `recipeId`) VALUES('$username', '$id')";
            $this->con->query($query);
        }
    }

    


    public function getRecipeData(){
        return $this->sqlData;
    }

    // return $this->sqlData;

    public function checkIfLiked(){

        $id = $this->getId();
        $username = $this->userLoggedInObj->getUserName();
        $query = "SELECT * FROM ".TBL_FAVORITES." where username = '$username' AND recipeId = '$id'";
        $results= $this->con->query($query);
        $data = array();

        while ($row = $results->fetch_assoc()){
            array_push($data, $row);
        }

        return count($data);

    }
    public function getUploaderProfilePic(){    
        $username = $this->sqlData["uploadedBy"];
        $uploader = new User($this->con, $username);
        return $uploader->getProfilePic();

    }
    public function getUploaderId(){    
        $username = $this->sqlData["uploadedBy"];

        $uploader = new User($this->con, $username);
        return $uploader->getUserId();
    }

    

}