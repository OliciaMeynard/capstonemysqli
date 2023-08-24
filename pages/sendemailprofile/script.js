import * as Routes from '../../js/routes.js'
import * as nav from '../../js/nav.js'
import * as footer from '../../js/createFooter.js'


const userName = document.getElementById('userName')
const password = document.getElementById('password')
let statusMsg = document.querySelector('.statusMsg')
const profileEmailPic = document.querySelector('.profileEmailPic')
const profileEmailname = document.querySelector('.profileEmailname')
const message = document.getElementById('message')
const name = document.getElementById('name')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const send_button = document.getElementById('send_button')
const emailSendto = document.getElementById('emailSendto')


console.log('login')


$('#btn-close-toast').click(function (){
    console.log('a')
    $('#myToast').hide()
})



export let idUrl = ''


const recipePostSection = document.querySelector('.recipePostSection')
const ctaProfilePage = document.querySelector('.ctaProfilePage')
const divSpinner = document.querySelector('.divSpinner')

const urlparams = new URLSearchParams(window.location.search)
idUrl = urlparams.get('uid')
console.log('idUrl', idUrl)



let dataName;
let loggeduserName;





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
            profileEmailPic.src = `${data.profilePic === null ? `../../uploads/profpic/default.webp` : "../../uploads/profpic/"+data.profilePic}`
            profileEmailname.textContent = `${data.firstName + ' ' + data.lastName}`
            emailSendto.value = data.email

            // console.log(data.email)



            dataName = data.username
            loggeduserName = data.userLoggedInData[0].username

            console.log(parseResponse)
     
            divSpinner.style.display = 'none'



        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });

}

window.addEventListener('load', show(idUrl))







send_button.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMail()
})



function sendMail (){
    let formData = {
        'name' : name.value,
        'email' : email.value,
        'subject' : subject.value,
        'message' : message.value,
        'emailSendto' : $('#emailSendto').val()
    }
        console.log(formData)
                $.ajax({
            "url" : Routes.sendmailprofile, //URL of the API
            "type" : "POST", //GET and POST 
            "data" : "email=" + JSON.stringify(formData), //auth will be our php variable $_POST['auth']
            beforeSend: function(){
                divSpinner.style.display = 'flex'
            },
            "success" : function (response) { //success yung response
                let parseResponse = JSON.parse(response);
                let data = parseResponse.data
                console.log(parseResponse)
                divSpinner.style.display = 'none'
                $('#myToast').show()
                $('#formMessage').trigger('reset')
            },
            "error" : function (xhr, status, error) { //error yung response
                alert("Error")
            }
        })
}


nav.createNav("../../assets/imgs/logo.png", '../../api/logout.php', '../../api/checkIfLoggedIn.php', '../../index.html','../../pages/upload' ,'../../pages/login', '../../pages/allrecipes', '../../pages/allrecipes/index.html?search', '../../pages/profile','../../uploads/profpic/', '../../pages/about', '../../pages/contact')
footer.createFooter('../../assets/imgs/logo.png');
