import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'
import displayRecipes from './displayRecipes.js'
import paginate from './paginate.js'
import displayButtons from './displayButtons.js'

// import * as checkLoggedIn from '../../js/checkLoggedIn.js'


nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '#', '../../pages/allrecipes/index.html?search', '../../pages/profile','../../uploads/profpic/', '../../pages/about', '../../pages/contact' )
footer.createFooter('../../assets/imgs/logo.png');



let containerCards = document.getElementById('containerCards')
let categoryBtnContainer= document.querySelector('.categories')
const btnContainer = document.querySelector('.btnContainer')
const swiperWrapper = document.querySelector('.swiper-wrapper')
export const divSpinner = document.querySelector('.divSpinner')

let index = 0
let pages = []


let categories = [
    {
    id : 'allRecipes',
    name: 'All'   
    },
    {
    id : 'asiancuisine',
    name: 'Asian Cuisine'   
    },
    {
    id : 'europeandish',
    name: 'European Dish'   
    },
    {
    id : 'drinks',
    name: 'Drinks'   
    },
    {
    id : 'salad',
    name: 'Salad'   
    },
    {
    id : 'vegetarian',
    name: 'Vegetarian'   
    },
]

// categories.map((category)=>{
//     let btn = category.id
//      btn = document.createElement('button')
//     btn.textContent = category.name
//     btn.classList.add('categoryBtn')
//     btn.addEventListener('click', ()=> getRecipeByCategory(category.id))
//     categoryBtnContainer.append(btn)
//   })
  
  categories.map((swipe)=>{
  let btn = swipe.id
   btn = document.createElement('button')
  btn.textContent = swipe.name
  btn.classList.add('categoryBtn', 'swiper-slide')
  btn.addEventListener('click', ()=> getRecipeByCategory(swipe.id))
  swiperWrapper.append(btn)

})





export let searchParam = ''

function viewUser(id){
    window.location.href = '../pages/recipe/index.html?q=20'+id
}

const urlparams = new URLSearchParams(window.location.search)
searchParam= urlparams.get('search')
console.log('searchParam', searchParam)
const title = document.querySelector('.section-title h1')

export function searchRecipes(){
   
    $.ajax({
        "url" : '../../api/search.php', //URL of the API
        "type" : "GET", //GET and POST 
        "data" : "search=" + JSON.stringify(searchParam),
        beforeSend: function(){
          divSpinner.style.display = 'flex'
      },
        "success" : function (response) { 
            // console.log(response)
            let parseResponse = JSON.parse(response);
            let results = parseResponse.data
            // console.log(results)
            

            if(results.length === 0){
              const markup = `<div class='zeroResults'><h3>No Recipe found</h3></div>`


              return containerCards.insertAdjacentHTML('beforeend', markup)
            }
           

            ///////PAGINATION
            // displayRecipes(results)
            pages = paginate(results)
            displayRecipes(pages[index]) 
            console.log(pages)
            displayButtons(btnContainer, pages, index)


            ///////BTN EVENT LISTENERS
            btnContainerEvents(btnContainer, pages, index)

            ///////PAGINATION END
            divSpinner.style.display = 'none'
       

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
    
    
}

function btnContainerEvents(btnContainer, pages, index){
  btnContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnContainer')) return


    if (e.target.classList.contains('next-btn')) {
      index++
      if (index > pages.length - 1) {
        index = 0
      }
    }
    if (e.target.classList.contains('prev-btn')) {
      index--
      if (index < 0) {
        index = pages.length - 1
      }

      if(index === 0){
        
      }
    }
    displayRecipes(pages[index]) 
    // console.log(pages)
    displayButtons(btnContainer, pages, index)
    
  })


}



window.addEventListener('load', searchRecipes)
console.log(pages)



// ///////////////////////////////////////////////////BACKUP
// export function getAllRecipes(){
   
//     $.ajax({
//         "url" : '../../api/fetchRecipeByCategory.php', //URL of the API
//         "type" : "POST", //GET and POST 
//         "data" : 'allRecipes', //auth will be our php variable $_POST['auth']
//         "success" : function (response) { //success yung response
//             // console.log(response)
//             let parseResponse = JSON.parse(response);
//             let results = parseResponse.data
//             console.log(results)

//              ///////PAGINATION
//             // displayRecipes(results)
//             pages = paginate(results)
//             displayRecipes(pages[index]) 
//             console.log(pages)
//             displayButtons(btnContainer, pages, index)


//             ///////BTN EVENT LISTENERS
//             btnContainerEvents(btnContainer, pages, index)

//             ///////PAGINATION END
//         },
//         "error" : function (xhr, status, error) { //error yung response
//             alert("Error")
//         }
//     });
    
    
// }



export function getRecipeByCategory(category){
   
    $.ajax({
        "url" : '../../api/fetchRecipeByCategory.php', //URL of the API
        "type" : "POST", //GET and POST 
        "data" : category+"="+JSON.stringify(category), //auth will be our php variable $_POST['auth']
        beforeSend: function(){
          divSpinner.style.display = 'flex'
        },
        "success" : function (response) { //success yung response
            // console.log(response)
            let parseResponse = JSON.parse(response);
            let results = parseResponse.data
            console.log(parseResponse)
            divSpinner.style.display = 'none'

          if(parseResponse.data.length === 0 && parseResponse.status === 200){
            containerCards.innerHTML = '';
            let html = `<li class='gridspan-4'> <h3>No recipes posted on this category</h3></li>`
            btnContainer.innerHTML = ''
            return containerCards.innerHTML = html;
           
          }

          if(parseResponse.data.length > 0 && parseResponse.status === 200){
              containerCards.innerHTML = '';

             ///////PAGINATION
            // displayRecipes(results)
            pages = paginate(results)
            displayRecipes(pages[index]) 
            console.log(pages)
            if(pages.length <= 1){
              btnContainer.innerHTML = ''
              return;
            }
            displayButtons(btnContainer, pages, index)


            ///////BTN EVENT LISTENERS
            btnContainerEvents(btnContainer, pages, index)

            ///////PAGINATION END
            
          }
       
    
           
     

       

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
    
    
}




