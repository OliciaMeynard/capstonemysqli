import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as logout from '../../js/logout.js'

const blockBtn = document.querySelector('.blockBtn')





blockBtn.addEventListener('click', logOut)


function logOut (){
    


        $.post('../../api/logout.php', 'LOGOUT')
        .done(function(data){
            let parseResponse = JSON.parse(data);
            if(parseResponse.status === 200){
                window.location.href = '../../pages/login'
            }
            else{
                alert('could not logout')
            }
        });


}



nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '../../pages/allrecipes', '../../pages/allrecipes/index.html?search', '../../pages/profile','../../uploads/profpic/', '../../pages/about', '../../pages/contact', '#')
