import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'
import * as Routes from '../../js/routes.js'
let containerCardsRecent = document.getElementById('containerCardsRecent')
let containerCardsFollowing = document.getElementById('containerCardsFollowing')
let followingIndex = document.querySelector('.followingIndex')
let followingRecent = document.querySelector('.following-recent')





export function getRecentRecipes(){
   
    $.ajax({
        "url" : Routes.fetchRecentRecipes, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "getRecentRecipes", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            // console.log(response)
            let parseResponse = JSON.parse(response);
            let results = parseResponse.data
            console.log(parseResponse)
            displayCards(results, containerCardsRecent)
       
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
    
    
}

getRecentRecipes()


export function getFollowingUpdates(){
   
    $.ajax({
        "url" : Routes.fetchFollowing, //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "getFollowingUpdates", //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            // console.log(response)
            let parseResponse = JSON.parse(response);
            let results = parseResponse.data.dataFollowingsRecipes
            console.log('fetch following', results)
            console.log('fetch following', parseResponse)
            if(parseResponse.data.loggedInUser == null){
              return;
            }

            else{
              if(results.length === 0){
                return;
              }
              else{
                
                                followingRecent.style.display = 'block'
                                followingIndex.style.display = 'block'
                                displayCards(results, containerCardsFollowing)
              }

            }
       

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
    
    
}

getFollowingUpdates()


function displayCards(results, containerDiv){
  results.map((result) =>{
    let markup =`
    <li>
    <a href="pages/recipe/index.html?q=${result.id}">
    <div class="blog-card">

      <figure class="card-banner img-holder" style="--width: 550; --height: 450;">
        <img src="./uploads/recipeImgs/${result.filePath}" width="550" height="660" loading="lazy"
          alt="Creating is a privilege but it’s also a gift" class="img-cover">

      </figure>

      <div class="card-content">

      <ul class="card-meta-list">

      <li>
        <a href="#" class="card-tag uploaderADiv">
        <div class='img-uploadedBy'>
        <img class='uploaderImg' src='./uploads/profpic/${result.profilePic}'>
        </div>
       <h4> <strong>${result.uploadedBy}</strong></h4></a>
      </li>
      <li>
        <a href="#" class="card-tag">Views: <strong>${result.views}</strong></a>
      </li>

      <li>
        <a href="#" class="card-tag"> ${result.formattedDate}</a>
      </li>


    </ul>



        <h3 class="h4">
          <a href="pages/recipe/index.html?q=${result.id}" class="card-title hover:underline">
          ${result.title}
          </a>
        </h3>

        <p class="card-text">
        ${result.description}
        </p>

      </div>

    </div>
    </a>
  </li>

    `
    containerDiv.insertAdjacentHTML('beforeend', markup)


})
}


// getFollowingUpdates()







nav.createNav("./assets/imgs/logo.png", './api/logout.php', 'api/checkIfLoggedIn.php', '#','./pages/upload' ,'./pages/login', './pages/allrecipes', './pages/allrecipes/index.html?search', './pages/profile','./uploads/profpic/', './pages/about', './pages/contact'  )
footer.createFooter('./assets/imgs/logo.png')




