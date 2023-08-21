const displayButtons = (container, pages, activeIndex) => {
    // let btns = pages.map((_, pageIndex) => {
    //     return `<button class='page-btn ${activeIndex === pageIndex ? 'active-btn' : ''}' data-index='${pageIndex}'>${pageIndex + 1}</button>`
    // })


    // btns.push(`<button class='next-btn'>next</button>`)
    // btns.unshift(`<button class='prev-btn'>prev</button>`)

    // container.innerHTML = btns.join('')

    
    container.innerHTML = `<button class='prev-btn btn btn-dark'>prev</button> <h4>Page ${activeIndex + 1} / ${pages.length}</h4> <button class='next-btn btn btn-dark'>next</button>`
}





export default displayButtons
