import * as script from './script.js'
import * as Routes from '../../js/routes.js'

export function deleteComment (comment, allComments){
   

    if(window.confirm('delete this comment?')){
        $.ajax({
            "url" : Routes.comments, //URL of the API
            "type" : "POST", //GET and POST 
            "data" : "destroy=" + JSON.stringify(comment.id), //auth will be our php variable $_POST['auth']
            "success" : function (response) { //success yung response
                let parseResponse = JSON.parse(response);
                if(parseResponse.status === 200){

                    script.fetchAllComments()
                }
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        });

    }

        // console.log(comment.id, script.loggedUser, script.uploadedBy)
    
}


console.log('comment delete')