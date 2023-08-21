
let containerCards = document.getElementById('containerCards')

const display = (arr, container) => {


  const userDataHtml = arr.map((user)=>{
    return `
    <tr>
    <td scope="row"><img src="../../uploads/profpic/${user.profilePic === null ? 'default.webp' : user.profilePic }" class="userimage" alt=""></td>
    <td>${user.username}</td>

    <td><button class="btn btn-outline-dark" style="display: inline-block; margin-right: 0.4rem;">VIEW</button><button class="btn btn-dark">DELETE</button></td>
  </tr>`
}).join('')

container.innerHTML = userDataHtml


}

export default display
