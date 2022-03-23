let timerid;
let movies = document.getElementById("movies");

async function searchMovie(){

    try{
        let input = document.getElementById("query").value;
        // console.log(input);

        let res = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=54ca76f7`);
        let data = await res.json()

        let array_of_movies = data.Search;

        return array_of_movies;

        // appendmovies(array_of_movies)
    }
    catch(error){
        console.log("error: ",error);
    }

}

function appendmovies(data){

    movies.innerHTML=null;


    data.forEach(function(elem){

        let p = document.createElement("p");
        p.innerText = elem.Title
        p.addEventListener("click",function(){
            showMovie(elem);
            // console.log(elem)
        })

        movies.append(p)
    });
}

async function main(){

    try{
        let data = await searchMovie()

        if(data===undefined){
            return false;
        }

        appendmovies(data);

    }
    catch(e){
        console.log("error: ",e);
    }
}

function debounce(func, delay){

    if(timerid){
        clearTimeout(timerid);
    }

    timerid = setTimeout(function(){
        func();
    }, delay);


}

function showMovie(data){
    let showCont = document.getElementById("showMovie");
    showCont.innerHTML = null;

    let img = document.createElement("img");
    img.src = data.Poster;

    let title = document.createElement("h3");
    title.innerText = data.Title; 

    let year = document.createElement("p");
    year.innerText = "Year of release: "+data.Year;

    let rate = Math.floor(Math.random() * (100 - 10) + 10) / 10;
    let rating = document.createElement("p");
    rating.innerText = `IMDb Rating: ${rate}⭐`

    showCont.append(img, title, year, rating)
    

}