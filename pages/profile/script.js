import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'
// import * as checkLoggedIn from '../../js/checkLoggedIn.js'



nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '../../pages/allrecipes', '../../pages/allrecipes/index.html?search', '#','../../uploads/profpic/', '../../pages/about', '../../pages/contact')
footer.createFooter('../../assets/imgs/logo.png');




export let idUrl = ''


const recipePostSection = document.querySelector('.recipePostSection')
const recipeFavoriteDiv = document.querySelector('.recipeFavoriteDiv')
const ctaProfilePage = document.querySelector('.ctaProfilePage')
const ctaProfileEmail = document.querySelector('.ctaProfileEmail')
const divSpinner = document.querySelector('.divSpinner')
const containerFollowersUl = document.querySelector('.containerFollowersUl')
const containerFollowingUl = document.querySelector('.containerFollowingUl')




const urlparams = new URLSearchParams(window.location.search)
idUrl = urlparams.get('uid')
console.log('idUrl', idUrl)



let dataName;
let loggeduserName;

const sectionFollowers = document.querySelector('.sectionFollowers')
const sectionFollowing = document.querySelector('.sectionFollowing')
const recipesPostedDiv = document.querySelector('.recipesPostedDiv')
const recipesFavoriteDiv = document.querySelector('.recipesFavoriteDiv')

function show(idRequest){

    $.ajax({
        "url" : Routes.profile, //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "show=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        beforeSend: function(){
            divSpinner.style.display = 'flex'
        },
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            let data = parseResponse.data
   

            recipePostSection.innerHTML = '';




            dataName = data.username
            loggeduserName = data.userLoggedInData[0].username

            console.log(parseResponse)

            $('#followersProfilePage').text(data.followers.length)
            $('#totalRecipeProfilePage').text(data.recipePostedData.length)
            $('#followingProfilePage').text(data.following.length)
            data.profilePic === null ?  $('.profilePicProfilePage').attr('src', '../../uploads/profpic/default.webp' ) : $('.profilePicProfilePage').attr('src', '../../uploads/profpic/'+data.profilePic );
            // $('.profilePicProfilePage').attr('src', '../../uploads/profpic/'+data.profilePic )
            $('#firstLastNameProfilepage').text(`${data.firstName} ${data.lastName}`)
            $('#usernameProfilePage').text(`Username: ${data.username}`)
            $('#emailProfilePage').text(`Member since: ${data.formattedDateSignUp}`)
            ctaProfileEmail.href = `../../pages/sendemailprofile/index.html?uid=${data.uid}`
            if(data.followers.length === 0){
                sectionFollowers.style.display = 'none'
            }
            if(data.following.length === 0){
                sectionFollowing.style.display = 'none'
            }

            if(data.recipePostedData.length === 0){
                recipesPostedDiv.style.display = 'none' 
            }
            if(data.recipeFavoriteData.length === 0){
                recipesFavoriteDiv.style.display = 'none' 
            }

             ///////followers
             /////display followers
             const followersHtml = data.followers.map((follower)=>{
                return `
                <li class="singleFollower">
                <a href="../../pages/profile/index.html?uid=${follower.uid}">
                  <img src="${follower.profilePic === null ? '../../uploads/profpic/default.webp' : `../../uploads/profpic/${follower.profilePic}`}" alt="" class="followerImg">
                  <h5>${follower.userFrom}</h5>
                </a>
  
              </li>
                
                `
            }).join('')

            containerFollowersUl.innerHTML = followersHtml
                ///////followers


             ///////following
             /////display following
             const followingHtml = data.following.map((follower)=>{
                return `
                <li class="singleFollower">
                <a href="../../pages/profile/index.html?uid=${follower.uid}">
                  <img src="${follower.profilePic === null ? '../../uploads/profpic/default.webp' : `../../uploads/profpic/${follower.profilePic}`}" alt="" class="followerImg">
                  <h5>${follower.userTo}</h5>
                </a>
  
              </li>
                
                `
            }).join('')

            containerFollowingUl.innerHTML = followingHtml
                ///////following


            
            if( data.recipePostedData.length > 0){
                cardRecipes(data.recipePostedData, recipePostSection, data.userLoggedInData[0].username, data.username )
                 ////////////////////LONG CODE FOR RECIPE POSTED
             }

            if( data.recipeFavoriteData.length > 0){
                cardRecipes(data.recipeFavoriteData, recipeFavoriteDiv, data.userLoggedInData[0].username, data.username )
                 ////////////////////LONG CODE FOR RECIPE POSTED
             }




                if(data?.userLoggedInData[0] && data.userLoggedInData[0].username === data.username){
                    $('.ctaProfilePage').text('EDIT PROFILE')
                    $('.ctaProfilePage').on("click", function(){ 
                        window.location.href = `../../pages/editprofile/index.html?id=${data.uid}`
                        ;})
                   ctaProfileEmail.style.display = 'none';
                         
                }









            if(data.userLoggedInData != 'none' && data.userLoggedInData[0].username != data.username){
                $('.ctaProfilePage').text(`${data.ifSubbed > 0 ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}`)
                $('.ctaProfilePage').on("click", function(){ 
                    console.log('sub') ;})     
            }
            if(data.userLoggedInData === 'none'){
                $('.ctaProfilePage').text('SUBSCRIBE')
                $('.ctaProfilePage').on("click", function(){ 
                    window.location.href = `../../pages/login`
                    ;})
                
                
            }
            
            if(!data.recipePostedData){
                recipePostSection.html = '<h3>No Posted Recipe</h3>'
            }





           

            divSpinner.style.display = 'none'


        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}




/////////////////////////////cards for populate
function cardRecipes (recipes, containerCards, userlogUsername, username){
    recipes.map((recipe)=>{
    
        const card = document.createElement('div')
        card.classList.add("card", "col-xs-4")
        card.style["max-width"] = "35rem"
        

        const recipeImg = document.createElement('img')
        recipeImg.classList.add('card-img-top' , 'card-img-post')
        recipeImg.setAttribute('src', '../../uploads/recipeImgs/'+recipe.filePath)
        card.append(recipeImg)

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        card.append(cardBody)

        const title = document.createElement('h2')
        title.classList.add('card-title', 'mb3')
        title.innerText = recipe.title
        const infoDiv = document.createElement('a')
        infoDiv.classList.add('infoDiv')

        const span1 = document.createElement('span')
        span1.innerHTML = `<ion-icon name="eye-outline"></ion-icon> ${recipe.views} `
        const span2 = document.createElement('span')
        span2.innerHTML = `<ion-icon name="heart-outline"></ion-icon> `
        const span3 = document.createElement('span')
        span3.classList.add('text-muted', 'mb-1')
        span3.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> ${recipe.formattedDate}`
        infoDiv.setAttribute('href', '../../pages/recipe/index.html?q='+recipe.id)


        infoDiv.append(span1,  span3)
        cardBody.append(title, infoDiv)

        if(containerCards.classList.contains('recipeFavoriteDiv') ){
            containerCards.append(card)
            return;
        }
       

            const actionBtns = document.createElement('div')
            actionBtns.classList.add('actionBtns')
            const actionEdit = document.createElement('a')
            actionEdit.setAttribute('href', `../../pages/editrecipe/index.html?q=${recipe.id}`)
            actionEdit.classList.add("actionBtn", "actionEditBtnProfile")
            actionEdit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`
            const actionDelete = document.createElement('p')
            actionDelete.classList.add("actionBtn", "actionDeleteBtnProfile")
            actionDelete.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`
            actionDelete.addEventListener('click',()=> destroy(recipe.id))
    
            actionBtns.append(actionEdit, actionDelete)
            card.append(actionBtns)
    
            containerCards.append(card)
        

        if(userlogUsername != username || username === undefined){
            actionBtns.style.display = 'none'
        }


    })
}




show(idUrl)


function destroy(id){
    if(!confirm('Are you sure you want to delete?')){
        return;
    }

     


    $.ajax({
        "url" : Routes.profile, 
        "type" : "POST", 
        "data" : "destroy=" + JSON.stringify(id), 
        "success" : function (response) { 
            console.log(response)
        
            let parseResponse = JSON.parse(response);
            console.log(response)
            recipePostSection.innerHTML = ''
            show(idUrl)

        },
        "error" : function (xhr, status, error) { 
            alert("Error")
        }
    });
}

////////////////////////////////////////
//////////////////////////SUBSCRIBE



 function sub(subRequest) {

  

    $.ajax({
        "url" : Routes.subscribe, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "sub=" + JSON.stringify(subRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            let parseResponse = JSON.parse(response);
            console.log(response)
            console.log(parseResponse)

            show(idUrl)
           parseResponse.data.ifSubbed > 0 ? ctaProfilePage.textContent = "UNSUBSCRIBE"
           : ctaProfilePage.textContent = "SUBSCRIBE"
            

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}




///////SUB /////////////////
ctaProfilePage.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log(dataName, loggeduserName)
    if(loggeduserName === undefined || loggeduserName === null){
        window.location.href = '../login'
        return;
  
    }
    

    if(dataName === loggeduserName){
        return;
    }

    


    let subscribeRequest = {
        userTo : dataName,
        userFrom : loggeduserName,
    }

    sub(subscribeRequest)
    
  
})

