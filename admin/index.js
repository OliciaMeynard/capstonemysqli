


const userName = document.getElementById('userName')
const password = document.getElementById('password')
let statusMsg = document.querySelector('.statusMsg')

console.log('login')





$('#signForm').on('submit', store)

function store(e){
    e.preventDefault();

    let data = {
        'userName' : userName.value,
        'password' : password.value,
      };


    $.ajax({
        type: 'POST',
        url: '../api/adminlogin.php',
        data: "authAdmin=" + JSON.stringify(data),
        beforeSend: function(){
            $('#add_button').attr("disabled","disabled");
            $('#uploadNewRecipeForm').css("opacity",".5");
        },
        success: function(response){
            let parseResponse = JSON.parse(response);
            console.log(parseResponse)
            $('.statusMsg').html('');
            if(parseResponse.status == 200){
                $('#signForm')[0].reset();
                $('.statusMsg').html(`<span style="font-size:18px;color:#34A853">${parseResponse.description}</span>`);
                setTimeout(()=>
                {window.location.href = './adminpanel'}, 1000)
            }else{

                parseResponse.data.map(d=>{
                    let markup = `<span style="font-size:18px;color:red">${d}</span><br>`
                    return statusMsg.insertAdjacentHTML('afterbegin', markup)
                })

            }
            $('#uploadNewRecipeForm').css("opacity","");
            $("#add_button").removeAttr("disabled");
        
        },
        // error: function(xhr, status, error){

        // }
    });
}


function checkLoggedIn () {
    $.ajax({
        url : '../api/adminCheckIfLoggedin.php', //URL of the API
        type : "POST", //GET and POST 
        success : function (response) { //success yung response
            console.log(response)
            const parseResponse = JSON.parse(response)       
            if(parseResponse.status == 200){
                window.location.href = './adminpanel'
                
            } else {
                return;
                
            }
           
            // $("#total_users").text(parseResponse.data[0].total_users);

        },
        "error" : function (xhr, status, error) { //error yung response
            console.log(parseResponse)
        }
    });

    

}



window.addEventListener('load', checkLoggedIn)
