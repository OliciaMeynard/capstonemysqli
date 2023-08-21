


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



