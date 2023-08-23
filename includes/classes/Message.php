<?php
class Message{

    private $con;

    public function __construct($con)
    {
        $this->con = $con;
        
    }

    public function getMessages(){
        $sql = "SELECT * FROM ".TBL_MESSAGES." ORDER BY date DESC";
        $results= $this->con->query($sql);

        if($results){
            
            $messages = array();
    
            while ($row = $results->fetch_assoc()) {
                $timestamp=strtotime($row['date']);
                $formattedDate = ago( $timestamp );
                $row['formattedDate'] = $formattedDate;
                array_push($messages, $row);
            }
    
            return $messages;
        }

        else{
            return false;
        }
    }

    public function sendMessage($name, $message){
        $query = "INSERT INTO ".TBL_MESSAGES."(name, message)
                    VALUES('$name', '$message')";
        return $this->con->query($query);          

    }

    public function deleteMessage($id){
        $query = ("DELETE FROM  ".TBL_MESSAGES." WHERE id = '$id' ");
        return $this->con->query($query);   

    }

    
    


    

}