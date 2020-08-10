let movieName = document.querySelector('#search')
let movieList = document.querySelector('#movieList')
const formEl = document.querySelector('form')
let myMovieList = document.querySelector('#myMovieList')

function addMovieToList(data){
    let movieLine = document.createElement('div')
    movieLine.classList.add("text-center")
    movieLine.innerHTML = `
        <a class="dropdown-item">${data}</a>
        <button class="btn btn-warning my-2 btn-remove">Remove</button>
    `
    movieLine.querySelector('.btn-remove').addEventListener('click',() =>{
        if(window.confirm(`You really want to remove ${data} from your list?`)){
            movieLine.remove()
        }        
    })
    return movieLine
}

function setCardHTML(movie){
    let movieCard = document.createElement('div')
    movieCard.classList.add("col-6")
    movieCard.classList.add("col-md-3")
    movieCard.dataset.movieData = movie.Title
    movieCard.innerHTML = `  
            <div class="card mb-4 shadow-sm">
                <img src="${movie.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-danger">${movie.Title}</h5>
                    <p>
                        <a class="badge badge-danger">${movie.Year}</a>
                    </p>
                    <p>
                        <button class="btn btn-dark mt-2 btn-add">Add+</button> 
                    </p>       
                </div>
            </div>          
    `
    movieCard.querySelector('.btn-add').addEventListener('click', () => {
        let movieTitle = addMovieToList(movieCard.dataset.movieData)
        myMovieList.appendChild(movieTitle)
    })
    return movieCard
}

async function initMovieSearch(){
    movieList.innerHTML = ''
    let movies = await getMovieJson(movieName.value)
    movies.Search.forEach(movie => {
        mCard = setCardHTML(movie)
        movieList.appendChild(mCard)
    })
}

async function getMovieJson(props) {
    try {
        let result = await fetch(`http://www.omdbapi.com/?s=${props}&apikey=1fda205e&`)
        result = await result.json();
        return result;
    } catch (error) {
        console.error(err);
    }
}

formEl.addEventListener('submit', (e) =>{
    e.preventDefault()
    initMovieSearch()
})