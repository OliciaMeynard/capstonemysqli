
let containerCards = document.getElementById('containerCards')

const display = (recipes) => {


    const newResults = recipes.map((result) =>{
        const {id, title, filePath, profilePic, uploadedBy, formattedDate, description} = result


        return `
        <li class='card'>
        <a href="../../pages/recipe/index.html?q=${id}">
        <div class="blog-card">

          <figure class="card-banner img-holder" >
            <img src="../../uploads/recipeImgs/${filePath}"  class='recipeImg' loading="lazy"
              alt="Creating is a privilege but it’s also a gift" class="img-cover">

          </figure>

          <div class="card-content">

          <ul class="card-meta-list">

              <li>
                <a href="#" class="card-tag uploaderADiv">
                <div class='img-uploadedBy'>
                <img class='uploaderImg' src='../../uploads/profpic/${profilePic}'>
                </div>
                <h4> <strong>${uploadedBy}</strong></h4></a>
            </li>

              <li>
                <a href="#" class="card-tag">${formattedDate}</a>
              </li>


        </ul>



            <h3 class="h4">
              <a href="../../pages/recipe/index.html?q=${id}" class="card-title hover:underline">
              ${title}
              </a>
            </h3>

            <p class="card-text">
            ${description.slice(0, 50)}...
            </p>

          </div>

        </div>
        </a>
      </li>

        `
        
        
    }).join('')

    containerCards.innerHTML = newResults

}

export default display
