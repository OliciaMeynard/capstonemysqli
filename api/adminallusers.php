<?php
// require_once 'config.php';


// if(isset($_POST['getUsers'])){
    
//     $response = array();
//     $data = array(); 
                    
//                     $query = "SELECT * FROM ".TBL_USERS;

//                     $followings = $con->query($query); 
//                     while ($row = $followings->fetch_assoc()){
//                         array_push($data, $row);
//                     }

    
//     for ($i = 0; $i < count($data); $i++) {
//         $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_RECIPES."` WHERE uploadedBy = '".$data[$i]['username']."'");
//         $row2 = $queryRecipes->fetch_assoc(); 
//         $data[$i]['recipePosted'] = $row2['COUNT'];


//         $queryFollowers = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userTo= '".$data[$i]['username']."'");
//         $row2 = $queryFollowers->fetch_assoc(); 
//         $data[$i]['followers'] = $row2['COUNT'];

//         $queryFollowing = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userFrom= '".$data[$i]['username']."'");
//         $row2 = $queryFollowing->fetch_assoc(); 
//         $data[$i]['following'] = $row2['COUNT'];

//       };


    
//      $response = createResponse(200 , 'all users', 'all users', $data);
    
        


//     echo json_encode($response);
//     exit();

// }




/////////////////////other

require_once 'config.php';


if(isset($_GET['index'])){
    
    $response = array();
    $data = array(); 
                    
                    $query = "SELECT * FROM ".TBL_USERS;

                    $followings = $con->query($query); 
                    while ($row = $followings->fetch_assoc()){
                        array_push($data, $row);
                    }

    
    for ($i = 0; $i < count($data); $i++) {
        $queryRecipes = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_RECIPES."` WHERE uploadedBy = '".$data[$i]['username']."'");
        $row2 = $queryRecipes->fetch_assoc(); 
        $data[$i]['recipePosted'] = $row2['COUNT'];


        $queryFollowers = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userTo= '".$data[$i]['username']."'");
        $row2 = $queryFollowers->fetch_assoc(); 
        $data[$i]['followers'] = $row2['COUNT'];

        $queryFollowing = $con->query("SELECT COUNT(*) AS COUNT FROM `".TBL_SUBSCRIBERS."` WHERE userFrom= '".$data[$i]['username']."'");
        $row2 = $queryFollowing->fetch_assoc(); 
        $data[$i]['following'] = $row2['COUNT'];

      };


    
     $response = createResponse(200 , 'all users', 'all users', $data);
    
        


    echo json_encode($response);
    

} 

