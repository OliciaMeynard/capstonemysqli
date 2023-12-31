



const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const userName = document.getElementById('userName')
const email = document.getElementById('email')
const email2 = document.getElementById('email2')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
let statusMsg = document.querySelector('.statusMsg')

// http://localhost/recipeClips(MP2)/pages/editprofile/indes.html?id=6

const urlparams = new URLSearchParams(window.location.search)
const idUrl = urlparams.get('id')
console.log('idUrl', idUrl)


getUser(idUrl)

console.log('edit profile')


export function getUser(id) {
    $.ajax({
        url : '../../../api/admingetuser.php', //URL of the API
        type : "GET", //GET and POST 
		data : "getUser=" + JSON.stringify(id), 
        success : function (response) { //success yung response
           
            let parseResponse = JSON.parse(response);
            let data = parseResponse.data

			console.log(data)

            $('#username').val(data.username)
            $('#firstName').val(data.firstName)
            $('#lastName').val(data.lastName)
            $('#email').val(data.email)
            $('#prodImg').attr("src", `${data.profilePic === null ? `../../../uploads/profpic/default.webp` : '../../../uploads/profpic/'+data.profilePic}`)
            $('#profilePicRef').val(data.profilePic)
            $('#idRef').val(data.uid)

          
           
            // $("#total_users").text(parseResponse.data[0].total_users);

        },
        "error" : function (xhr, status, error) { //error yung response
            console.log(parseResponse)
        }
    });

    

}



	//file type validation
	$("#file").change(function() {
		var file = this.files[0];
		var videoFile = file.type;
		var match= ["image/jpeg","image/png","image/jpg", "image/webp"];
		let src = URL.createObjectURL(file)
		// if(!((videoFile==match[0]) || (videoFile==match[1]) || (videoFile==match[2]) || (videoFile==match[3]))){
		
		if(!match.includes(videoFile)){
			alert('Please select a valid image file. JPEG/JPG/PNG/WEBP');
			$("#file").val('');
			return false;
		}
		prodImg.src = src
	});



    ////////////////////////////////////
    ///////////////UPDATE FUNCTION

    
	$("#signForm").on('submit', update);


	function update(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '../../../api/updateprofile.php',
			data: new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			beforeSend: function(){
				$('.signFormBtn').attr("disabled","disabled");
				$('.signForm').css("opacity",".5");
			},
			success: function(response){
				let parseResponse = JSON.parse(response);
				console.log(parseResponse)
				$('.statusMsg').html('');
				if(parseResponse.status == 200){
					// $('#uploadNewRecipeForm')[0].reset();
					$('.statusMsg').html(`<span style="font-size:18px;color:#34A853">${parseResponse.description}</span>`);
                    setTimeout(()=>
                    {window.location.href = '../index.html'}, 1300)
				}
				else{
					$('.statusMsg').html(`<span style="font-size:18px;color:red">${parseResponse.data}</span>`);
				}
				$('.signForm').css("opacity","");
				$('.signFormBtn').removeAttr("disabled");
			
			}
		});
	}
