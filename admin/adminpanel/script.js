


let usersTable;
const sectionRecipes = document.querySelector('.sectionRecipes')
const signoutbtn = document.getElementById('signoutbtn')



// "adminLoggedIn"

// import * as Routes from './routes.js'


function checkLoggedIn () {
    $.ajax({
        url : '../../api/adminCheckIfLoggedin.php', //URL of the API
        type : "POST", //GET and POST 
        success : function (response) { //success yung response
            console.log(response)
            const parseResponse = JSON.parse(response)       
            if(parseResponse.status == 200){
                dashboard()
                fetchUsers()
                fetchRecipes()
                fetchComments()
                fetchMessages()
                
            } else {
                window.location.href = '../index.html'
                
            }
           
            // $("#total_users").text(parseResponse.data[0].total_users);

        },
        "error" : function (xhr, status, error) { //error yung response
            console.log(parseResponse)
        }
    });

    

}



window.addEventListener('load', checkLoggedIn)





// function fetchAllRecipes() {
//     $.ajax({
//         "url" : '../../api/adminallrecipes.php', 
//         "type" : "POST", 
//         "data" : "getRecipes", 

//         "success" : function (response) { //success yung response
//             parseResponse = JSON.parse(response)
//             console.log(parseResponse)
//             $("#total_users").text(parseResponse.data)
//         },
//         "error" : function (xhr, status, error) { //error yung response
//             alert("Error")
//         }
//     });
// }


function dashboard() {
    $.ajax({
        "url" : '../../api/admindashboard.php', 
        "type" : "POST", 
        "data" : "getDashboard", 

        "success" : function (response) { //success yung response
            parseResponse = JSON.parse(response)
            console.log(parseResponse)
            $('.recipeContainerCard').text(parseResponse.data.allrecipes)
            $('.viewsContainerCard').text(parseResponse.data.sumviews)
            $('.usersContainerCard').text(parseResponse.data.allusers)
            $('.commentContainerCard').text(parseResponse.data.allComments)
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}


// allcommentsTest()

// function allcommentsTest() {
//     $.ajax({
//         "url" : '../../api/adminallcomments.php', 
//         "type" : "GET", 
//         "data" : "allcomments", 

//         "success" : function (response) { //success yung response
//             parseResponse = JSON.parse(response)
//             console.log(parseResponse)

//         },
//         "error" : function (xhr, status, error) { //error yung response
//             alert("Error")
//         }
//     });
// }


/////////USERS fetch




function fetchUsers() {
    usersTable = $("#userrecords").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : '../../api/adminallusers.php' + "?index",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let id = response.data[i].uid
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        // id : response.data[i].uid,
                        profilePic :  `<img src="../../uploads/profpic/${response.data[i].profilePic === null ? 'default.webp' : response.data[i].profilePic}" alt="" class="userimage">`,
                        firstName :  response.data[i].firstName,
                        lastName :  response.data[i].lastName,
                        username :  response.data[i].username,
                        followers :  response.data[i].followers,
                        recipePosted :  response.data[i].recipePosted,
                        following :  response.data[i].following,
                        action : "<button onclick='viewUser(" + id + ")' class='btn btn-secondary'><ion-icon name='create-outline'></ion-icon></button> <button class='btn btn-dark' onclick='destroyUser(" + id + ")'><ion-icon name='trash-outline'></ion-icon></button></td>"
                    });
                }

                return return_data;
            },
            complete : function() {
                //@TODO
                //@var change databale 
                $('#userrecords').on('dblclick', 'td', function() {
                    let data = $('#userrecords')
                        .DataTable()
                        .row(this)
                        .data()
                    alert(data.uid)
  
                });
            },
        },
        columns : [

            // { data : 'id' },
            { data : 'profilePic' },
            { data : 'firstName' },
            { data : 'lastName' },
            { data : 'username' },
            { data : 'followers' },
            { data : 'following' },
            { data : 'recipePosted' },
            { data : 'action' },
        ],
        // dom : 'lBfrtip',
        // buttons : [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'print',
        //     'pdf'
        // ]
    });
}
//////////////////////RECIPES fetch





function fetchRecipes() {


    
    usersTable = $("#reciperecords").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : '../../api/adminallrecipes.php' + "?index",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let id = response.data[i].id
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        // id : response.data[i].id,
                        filePath :  `<img src="../../uploads/recipeImgs/${response.data[i].filePath}" alt="" class="userimage">`,
                        title :  response.data[i].title,
                        numFavorites :  response.data[i].numFavorites,
                        views :  response.data[i].views,
                        allComments :  response.data[i].allComments,
                        category :  response.data[i].category,
                        action : "<button onclick='viewRecipe(" + id + ")' class='btn btn-secondary'><ion-icon name='create-outline'></ion-icon></button> <button class='btn btn-dark' onclick='destroyRecipe(" + id + ")'><ion-icon name='trash-outline'></ion-icon></button></td>"
                    });
                }

                return return_data;
            },
            complete : function() {
                //@TODO
                //@var change databale 
                $('#reciperecords').on('dblclick', 'td', function() {
                    let data = $('#reciperecords')
                        .DataTable()
                        .row(this)
                        .data()
                    alert(data.id)
  
                });
            },
        },
        columns : [


            { data : 'filePath' },
            { data : 'title' },
            { data : 'numFavorites' },
            { data : 'views' },
            { data : 'allComments' },
            { data : 'category' },
            { data : 'action' },
        ],
        // dom : 'lBfrtip',
        // buttons : [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'print',
        //     'pdf'
        // ]
    });
}



//////////////////////FETCH COMMENTS



function fetchComments() {


    
    usersTable = $("#commentsrecords").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : '../../api/adminallcomments.php' + "?allcomments",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let id = response.data[i].id
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        // id : response.data[i].id,
                        profilePic :  `<img src="../../uploads/profpic/${response.data[i].profilePic === null ? 'default.webp' : response.data[i].profilePic}" alt="" class="userimage">`,
                        postedBy :  response.data[i].username,
                        body :  response.data[i].body,
                        datePosted :  response.data[i].formattedDate,
                        action : " <button class='btn btn-dark' onclick='destroyComment(" + id + ")'><ion-icon name='trash-outline'></ion-icon></button></td>"
                    });
                }

                return return_data;
            },
            complete : function() {
                //@TODO
                //@var change databale 
                $('#commentsrecords').on('dblclick', 'td', function() {
                    let data = $('#commentsrecords')
                        .DataTable()
                        .row(this)
                        .data()
                    alert(data.id)
  
                });
            },
        },
        columns : [


            { data : 'profilePic' },
            { data : 'postedBy' },
            { data : 'body' },
            { data : 'datePosted' },
            { data : 'action' },
        ],
        // dom : 'lBfrtip',
        // buttons : [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'print',
        //     'pdf'
        // ]
    });
}





function viewUser(id){
    window.location.href = `./edituser/index.html?id=${id}`

}
function viewRecipe(id){
    window.location.href = `./editrecipe/index.html?q=${id}`
    

}



//////////////////////////////FETCH MESSAGES
function fetchMessages() {


    
    usersTable = $("#messagerecords").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : '../../api/message.php' + "?index",
            dataSrc : function (response) {
                console.log(response)
                let return_data = new Array();

                for (let i = 0; i<response.data.length; i++) 
                {
                    let id = response.data[i].id
                    return_data.push({
                        id :  id,
                        name :  response.data[i].name,
                        message :  response.data[i].message,
                        date :  response.data[i].date,
                        action : " <button class='btn btn-dark' onclick='destroyMessage(" + id + ")'><ion-icon name='trash-outline'></ion-icon></button></td>"
                    });
                }

                return return_data;
            },
            complete : function() {
                //@TODO
                //@var change databale 
                $('#messagerecords').on('dblclick', 'td', function() {
                    let data = $('#messagerecords')
                        .DataTable()
                        .row(this)
                        .data()
                    alert(data.id)
  
                });
            },
        },
        columns : [


            { data : 'id' },
            { data : 'name' },
            { data : 'message' },
            { data : 'date' },
            { data : 'action' },
        ],
        // dom : 'lBfrtip',
        // buttons : [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'print',
        //     'pdf'
        // ]
    });
}






////////////////////////DELETE USER
function destroyUser(id){

    if(window.confirm("Do you want to delete this User?")){
        $.ajax({
            "url" : '../../api/admindashboard.php', 
            "type" : "POST", 
             "data" : "destroyUser=" + JSON.stringify(id), 
    
            "success" : function (response) { //success yung response
                parseResponse = JSON.parse(response)
                console.log(parseResponse)
                if(parseResponse.status === 200){
                    console.log('deleted')
                    alert('Successfully Deleted')
                    location.reload();
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });

    }


}



////////////////DELETE RECIPE
function destroyRecipe(id){

    if(window.confirm("Do you want to delete this Recipe?")){
        $.ajax({
            "url" : '../../api/profile.php', 
            "type" : "POST", 
             "data" : "destroy=" + JSON.stringify(id), 
    
            "success" : function (response) { //success yung response
                parseResponse = JSON.parse(response)
                console.log(parseResponse)
                if(parseResponse.status === 200){
                    console.log('deleted')
                    alert('Successfully Deleted')
                    location.reload();
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });

    }


}
////////////////DELETE COMMENT
function destroyComment(id){

    if(window.confirm("Do you want to delete this Recipe?")){
        $.ajax({
            "url" : '../../api/comments.php', 
            "type" : "POST", 
             "data" : "destroy=" + JSON.stringify(id), 
    
            "success" : function (response) { //success yung response
                parseResponse = JSON.parse(response)
                console.log(parseResponse)
                if(parseResponse.status === 200){
                    console.log('deleted')
                    alert('Successfully Deleted')
                    location.reload();
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });

    }


}
////////////////DELETE MESSAGE
function destroyMessage(id){

    if(window.confirm("Do you want to delete this Recipe?")){
        $.ajax({
            "url" : '../../api/message.php', 
            "type" : "POST", 
             "data" : "destroy=" + JSON.stringify(id), 
    
            "success" : function (response) { //success yung response
                parseResponse = JSON.parse(response)
                console.log(parseResponse)
                if(parseResponse.status === 200){
                    console.log('deleted')
                    alert('Successfully Deleted')
                    location.reload();
                }

                else{
                    alert('Could not Delete')
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });

    }


}




//////////////////////////////////LOGOUT

function logOut (){

        $.post('../../api/logout.php', 'LOGOUTADMIN')
        .done(function(data){
            let parseResponse = JSON.parse(data);
            console.log(parseResponse)
            window.location.href = '../index.html'
        });
    

}

signoutbtn.addEventListener('click', logOut)