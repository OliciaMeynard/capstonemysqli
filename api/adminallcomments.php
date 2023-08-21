<?php


require_once 'config.php';


if(isset($_GET['allcomments'])){
    
    $response = array();
    $data = array(); 
                    
                    $query = "SELECT * FROM ".TBL_COMMENTS." INNER JOIN ".TBL_USERS." WHERE ".TBL_COMMENTS.".postedBy = ".TBL_USERS.".username ORDER BY ".TBL_COMMENTS.".datePosted DESC";

                    $followings = $con->query($query); 
                    while ($row = $followings->fetch_assoc()){
                        $timestamp=strtotime($row['datePosted']);
                        $formattedDate = ago( $timestamp );
                        $row['formattedDate'] = $formattedDate;
                        array_push($data, $row);
                    }


    
     $response = createResponse(200 , 'all Comments', 'all comments', $data);
    
        


    echo json_encode($response);
    

} 

