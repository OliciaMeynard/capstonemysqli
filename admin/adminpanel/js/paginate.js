const paginate = (ar) => {
    const itemsperPage = 8;
    const numberOfpages = Math.ceil(ar.length / itemsperPage)
    const newFollowers = Array.from({length:numberOfpages}, (_, i)=>{
        const start = i * itemsperPage;
        return ar.slice(start, start + itemsperPage)
    })
    return newFollowers
}

export default paginate
