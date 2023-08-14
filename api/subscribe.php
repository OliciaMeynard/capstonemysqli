<?php

    include 'config.php';
    $response = array();


    if(isset($_POST['sub'])){
        $sub = json_decode($_POST['sub']);
        $userTo = $sub->userTo;
        $userFrom = $sub->userFrom;

        //check if the user is subbed
        $query = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo = '$userTo' AND
                                userFrom = '$userFrom'";

        $results= $con->query($query);
                        
        $data = array();
                        
        while ($row = $results->fetch_assoc()){
        array_push($data, $row);
        }

        if(count($data) == 0){
            //insert
            $query = ("INSERT  INTO ".TBL_SUBSCRIBERS."(userTo, userFrom)
                        VALUES('$userTo', '$userFrom')");
            $con->query($query);

        }

        else {
            //delete
            $query = ("DELETE FROM ".TBL_SUBSCRIBERS." WHERE userTo = '$userTo' AND
            userFrom = '$userFrom'");
            $con->query($query);
            
        }
        
        //return new number of subs
        $query = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo= '$userTo'";
        $con->query($query);
        
        function ifSubbed (){
            global $con, $userFrom, $userTo;
            
            $query = "SELECT * FROM ".TBL_SUBSCRIBERS." WHERE userTo = '$userTo' AND
            userFrom = '$userFrom'";
            $results= $con->query($query);
      
            $data = array();
                        
            while ($row = $results->fetch_assoc()){
                array_push($data, $row);
            }

        return count($data);
            
        }

        $resData['ifSubbed'] = ifSubbed();
        $resData['subsNum'] = count($data);
        $resData['from'] =  $userFrom;
        $resData['To'] =  $userTo;
        $response = createResponse(200, 'user from to', 'user from to', $resData);
        echo json_encode($response);


      
    }

    else{
        echo json_encode('Invalid');
    }