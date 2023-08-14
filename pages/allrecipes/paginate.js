const paginate = (followers) => {
    const itemsperPage = 8;
    const numberOfpages = Math.ceil(followers.length / itemsperPage)
    const newFollowers = Array.from({length:numberOfpages}, (_, i)=>{
        const start = i * itemsperPage;
        return followers.slice(start, start + itemsperPage)
    })
    return newFollowers
}

export default paginate
