import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'
import * as deleteComment from './deleteComment.js'
import * as subscribe from './subscribe.js'
import * as comments from './comments.js'
import * as checkLoggedIn from '../../js/checkLoggedIn.js'



export let commentsContainer = document.getElementById('comments')
const recipeImg = document.getElementById('recipeImg')
const favoriteButton = document.getElementById('favoriteButton')
const favoriteHearticon = document.getElementById('favoriteHearticon')
const uploaderImg = document.getElementById('uploaderImg')
const subButton = document.getElementById('subButton')
const addCommentBtn = document.getElementById('addCommentBtn')
const commentBodyClass = document.getElementById('commentBodyId')
const userProfilePic = document.getElementById('userProfilePic')
const divIngredients = document.getElementById('divIngredients')
const divHowToCook = document.getElementById('divHowToCook')
let uploaderDiv = document.querySelector('.uploaderDiv')


export let uploadedBy;
export let loggedUser;
export let isLoggedIn;




export let idUrl = ''

function viewUser(id){
    window.location.href = '../pages/recipe/index.html?q=20'+id
}

const urlparams = new URLSearchParams(window.location.search)
idUrl = urlparams.get('q')
console.log('idUrl', idUrl)
show(urlparams.get('q'))



function show(){
    let idRequest = {
        "id" : idUrl
    } 
    $.ajax({
        "url" : Routes.recipeSinglePage, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "show=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            console.log(response)
            console.log(parseResponse.data)

            uploaderDiv.setAttribute('href', '../../pages/profile/index.html?uid='+ parseResponse.data.uploaderId)

            let ingredients= parseResponse.data.ingredients
            let ingredientsArr = ingredients.split('\r\n\r\n')
            
            let howToCook = parseResponse.data.howtocook
            let howToCookArr = howToCook.split('\r\n\r\n')

            ingredientsArr.map((ing) =>{
                const markup = `  <p class='ingredient'>•  ${ing}</p>`

                divIngredients.insertAdjacentHTML('beforeend', markup)

            })

            howToCookArr.map((step, i) =>{
                const markup = `  <h5>STEP ${i + 1}</h5><p class='ingredient'>•  ${step}</p>`

                divHowToCook.insertAdjacentHTML('beforeend', markup)

            })


            
            if(parseResponse.data.loggedUser != null && parseResponse.data.loggedUser === parseResponse.data.uploadedBy){
                let txt =  "EDIT RECIPE";
                $('#subButton').text(txt)
                $('#subButton').click(function(){ window.location.href = `../../pages/editrecipe/index.html?q=${parseResponse.data.id}`})
                
            } else {
                let txt = parseResponse.data.ifSubbed > 0 ? "UNSUBSCRIBE" : "SUBSCRIBE";
                $('#subButton').text(txt)
            }

            if(parseResponse.data?.loggedUserProfilePic){
                userProfilePic.src = `../../uploads/profpic/${parseResponse.data.loggedUserProfilePic === null ? 'default.webp' : parseResponse.data?.loggedUserProfilePic}`
            }


            recipeImg.src =  '../../uploads/recipeImgs/'+ parseResponse.data.filePath
            checkIfLiked(parseResponse.data.checkIfLiked, parseResponse.data.favorites)
            $('.recipeTitle').text(parseResponse.data.title)
            $('.viewsText').text(`Total Views: ${parseResponse.data.views}`) 
            $('#dateUploaded').text(parseResponse.data.formattedDate);  
            $('#uploadedByText').text(parseResponse.data.uploadedBy)
            $('.commentCount').text(parseResponse.data.sumOfComments + ' Comments')
            $('.descriptionRecipe').text(parseResponse.data.description)

            uploadedBy = parseResponse.data.uploadedBy
            loggedUser = parseResponse.data.loggedUser
            isLoggedIn = parseResponse.data.ifLoggedIn


            uploaderImg.setAttribute("src", `../../uploads/profpic/${parseResponse.data.uploaderProfilePic === null ? 'default.webp' : parseResponse.data.uploaderProfilePic}`);
    

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}



function checkIfLiked (data, favoriteTextData){
     let src = data > 0 ?  '../../assets/imgs/icons/heart-active.png' : '../../assets/imgs/icons/heart.png';
     const favoriteText = data > 0 ? 'REMOVE FAVORITES' : 'ADD TO FAVORITES'
     favoriteHearticon.setAttribute("src", src)
     $('.totalfavorites').text( `${favoriteText} ${favoriteTextData}`)
     console.log(data)   
}




const addToFavorite = (recipeId) =>{
    console.log('clicked')
    $.post("../../api/favoriteRecipe.php", {recipeId: recipeId})
    .done(function(data){
        let parseResponse = JSON.parse(data);

        if(parseResponse.data === false){
            window.location.href = '../login'
        }
        else{
            checkIfLiked(+parseResponse.data.checkIfLiked, parseResponse.data.getFavorites)
            // console.log(parseResponse)

        }
    });

}



////favorite
favoriteButton.addEventListener('click', (e)=>{
    e.preventDefault()
    addToFavorite(idUrl)
  
})



////////////FETCH ALL COMMENTS
export function fetchAllComments(){
    let idRequest = {
        "id" : idUrl
    } 
    $.ajax({
        "url" : Routes.allComments, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "allComments=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            console.log(parseResponse.data)
             console.log(uploadedBy, loggedUser, isLoggedIn)
            
             if(parseResponse.status === 200){

                commentsContainer.innerHTML = '';
                

                 parseResponse.data.map((comment, i)=>{

                    displayComment(comment, loggedUser,  uploadedBy, parseResponse.data)
    
                 })

             }


        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}
window.addEventListener('load', fetchAllComments)



// nav.createNav (imgSrcLogo, apiLogout, apiCheckLogIn, homeLink,  shareRecipeLink, loginLink, allrecipelink)




nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '../../pages/allrecipes', '../../pages/allrecipes/index.html?search', '../../pages/profile','../../uploads/profpic/', '../../pages/about')
footer.createFooter('../../assets/imgs/logo.png');



export function displayComment(comment, loggedUser,  uploadedBy){

    
    const singleCommentDiv = document.createElement('div')
    singleCommentDiv.classList.add('singleCommentDiv', 'mb-5')
    singleCommentDiv.setAttribute('data-comment', `${comment.postedBy}`)

    const profileImageCommenterDiv = document.createElement('div')
    profileImageCommenterDiv.classList.add('profileImageCommenterDiv')
    const profileImageCommenter = document.createElement('img')
    profileImageCommenter.setAttribute('src', `../../uploads/profpic/${comment.profilePic === null ? 'default.webp' : comment.profilePic}`)
    profileImageCommenter.classList.add('profileImageCommenter')
    profileImageCommenterDiv.append(profileImageCommenter)
    singleCommentDiv.append(profileImageCommenterDiv)

    const commenterInfo = document.createElement('div')
    commenterInfo.classList.add('commenterInfo')
    const commenterName = document.createElement('h3')
    commenterName.classList.add('commenterName', 'mb-2')
    commenterName.innerText = comment.postedBy
    const datePosted = document.createElement('p')
    datePosted.classList.add('datePosted', 'text-muted', 'fs-5')
    datePosted.innerText = comment.formattedDate
    const commentBody = document.createElement('p')
    commentBody.classList.add('commentBody')
    commentBody.innerText = comment.body

    commenterInfo.append(commenterName, datePosted, commentBody)
    singleCommentDiv.append(commenterInfo)




    if(loggedUser === null){
        return commentsContainer.append(singleCommentDiv)

    }
    else if(loggedUser === undefined && uploadedBy === undefine){
        return commentsContainer.append(singleCommentDiv)

    }
    
    else if( loggedUser === uploadedBy){
        const deleteCommentDiv = document.createElement('div')
        deleteCommentDiv.classList.add('deleteCommentDiv')
        const deleteCommentBtn = document.createElement('button')
        deleteCommentBtn.classList.add('deleteCommentBtn')
        deleteCommentBtn.innerHTML = `<ion-icon name="trash-outline" class='deleteCommentIcon'></ion-icon>`
        deleteCommentDiv.append(deleteCommentBtn)
        deleteCommentBtn.addEventListener('click', () =>
        deleteComment.deleteComment(comment)
        )

        singleCommentDiv.append(deleteCommentDiv)
        commentsContainer.append(singleCommentDiv)

    }

    else if(loggedUser != null && loggedUser != uploadedBy){
        const deleteCommentDiv = document.createElement('div')
        deleteCommentDiv.classList.add('deleteCommentDiv', `${singleCommentDiv.dataset.comment === loggedUser ? 'show' : 'hideCommentDeleteDiv'}`)
        const deleteCommentBtn = document.createElement('button')
        deleteCommentBtn.classList.add('deleteCommentBtn')
        deleteCommentBtn.innerHTML = `<ion-icon name="trash-outline" class='deleteCommentIcon'></ion-icon>`
        deleteCommentDiv.append(deleteCommentBtn)
        deleteCommentBtn.addEventListener('click', () =>
        deleteComment.deleteComment(comment)
        )
        

        singleCommentDiv.append(deleteCommentDiv)
        commentsContainer.append(singleCommentDiv)
    }

}

