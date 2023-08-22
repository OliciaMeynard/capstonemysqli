import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'


const message = document.getElementById('message')
const name = document.getElementById('name')
const sendBtn = document.getElementById('send_button');
const divSpinner = document.querySelector('.divSpinner')



sendBtn.addEventListener('click', sendMessage)



function sendMessage (e){
    e.preventDefault();
    let formData = {
        'name' : name.value,
        'message' : message.value
    }
        console.log(formData)
                $.ajax({
            "url" : Routes.message, //URL of the API
            "type" : "POST", //GET and POST 
            "data" : "store=" + JSON.stringify(formData), //auth will be our php variable $_POST['auth']
            beforeSend: function(){
                divSpinner.style.display = 'flex'
            },
            "success" : function (response) { //success yung response
                let parseResponse = JSON.parse(response);
                let data = parseResponse.data
                console.log(data)
                divSpinner.style.display = 'none'
                $('#myToast').show()
                $('#formMessage').trigger('reset')
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        })

    // console.log(name.value, message.value)
}


$('#btn-close-toast').click(function (){
    console.log('a')
    $('#myToast').hide()
})



nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '../../pages/allrecipes', '../../pages/allrecipes/index.html?search', '../../pages/profile','../../uploads/profpic/', '#')
footer.createFooter('../../assets/imgs/logo.png');
