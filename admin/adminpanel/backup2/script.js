import display from './js/display.js'
import paginate from './js/paginate.js'
import displayButtons from './js/displayButtons.js'

fetchAllUsers()
fetchAllRecipes()
dashboard()

const tbody = document.querySelector('.tbody')
const userpaginationsBtn = document.querySelector('.userpaginationsBtn')
let index = 0
let pages = []

// setInterval(fetchAllUsers, 3000)



function fetchAllUsers() {
    $.ajax({
        "url" : '../../api/adminallusers.php', 
        "type" : "POST", 
        "data" : "getUsers", 

        "success" : function (response) { //success yung response
            const parseResponse = JSON.parse(response)
            const users = parseResponse.data

            pages = paginate(users)
 
            display(pages[index], tbody) 
            console.log(pages)
            displayButtons(userpaginationsBtn, pages, index)
                        ///////BTN EVENT LISTENERS
            btnContainerEvents(userpaginationsBtn, pages, index, tbody)
            
            
            // const userDataHtml = users.map((user)=>{
            //     return `
            //     <tr>
            //     <td scope="row"><img src="../../uploads/profpic/${user.profilePic === null ? 'default.webp' : user.profilePic }" class="userimage" alt=""></td>
            //     <td>${user.firstName} ${user.lastName}</td>
            //     <td>Otto</td>
            //     <td><button class="btn btn-outline-dark" style="display: inline-block; margin-right: 0.4rem;">VIEW</button><button class="btn btn-dark">DELETE</button></td>
            //   </tr>`
            // }).join('')

            // tbody.innerHTML = userDataHtml

        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}



function fetchAllRecipes() {
    $.ajax({
        "url" : '../../api/adminallrecipes.php', 
        "type" : "POST", 
        "data" : "getRecipes", 

        "success" : function (response) { //success yung response
            const parseResponse = JSON.parse(response)
            const recipes = parseResponse.data
            

            


        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}


function dashboard() {
    $.ajax({
        "url" : '../../api/admindashboard.php', 
        "type" : "POST", 
        "data" : "getDashboard", 

        "success" : function (response) { //success yung response
            const parseResponse = JSON.parse(response)
            const dashboard = parseResponse.data

        
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}




function btnContainerEvents(btnContainer, pages, index, container){
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
    display(pages[index], container) 
    // console.log(pages)
    displayButtons(btnContainer, pages, index)
    
  })

}


