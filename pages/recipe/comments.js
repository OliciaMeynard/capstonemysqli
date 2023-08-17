import * as script from './script.js'
import * as Routes from '../../js/routes.js'

const commentsContainer = document.getElementById('comments')

function store(){
    let record = {
        "body" : commentBodyId.value,
        "recipeId" : script.idUrl,
        "postedBy" : script.loggedUser
    }





    $.ajax({
        "url" : Routes.comments, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "store=" + JSON.stringify(record), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);

            if(parseResponse.status === 200){

                commentsContainer.textContent = '';
                console.log(parseResponse.data.length)
                $('.commentCount').text(parseResponse.data.length + ' Comments')

                 parseResponse.data.map((comment)=>{

                    


                    script.displayComment(comment, script.loggedUser, script.uploadedBy)
                    
    
                 })

             }


        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}

addCommentBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!commentBodyId.value){
        return alert("cant store empty comment");
    }
    if(script.loggedUser === null){
        window.location.href = '../login'
        return;
    }
  
    store()
    commentBodyId.value = '';
})

