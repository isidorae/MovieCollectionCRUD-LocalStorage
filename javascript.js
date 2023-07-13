
// var selectedRow = null;

// //HIDE LIST HEADER

// function hideListHeader () {
//     const movieList = document.querySelector("tr") 
//     movieList.style.display = "none"
// }

// hideListHeader ()


// //STORE DATE LOCAL

//    //local storage

//    localStorage.setItem('movie', movie)
//    localStorage.setItem('año', anio)
//    localStorage.setItem('rating', rating)
//    localStorage.setItem('comentario', comment)
  

// //ADD DATA

//         const movieForm = document.querySelector("#movie-form")

// movieForm.addEventListener("submit", (evento) => {
//     evento.preventDefault(); //Evitar que ponga submit sin contenido

//     const movie = document.getElementById("movie").value
//     const anio = document.getElementById("anio").value
//     const rating = document.getElementById("specificSizeSelect").value
//     const comment = document.getElementById("exampleFormControlTextarea1").value
  

//     const errorMsg = document.getElementsByClassName("errorMsg");

//     const movieList = document.querySelector("tr") 

   
//     //reset form
//     let resetForm = () => {
        
//         document.getElementById("movie").value = "";
//         document.getElementById("anio").value = "";
//         document.getElementById("specificSizeSelect").value = "Rating";
//         document.getElementById("exampleFormControlTextarea1").value = "";

//     }

//     //Validadores
//     let messages = [];

//     if(movie === "" || anio === "" || comment === "") {
//         messages.push("*Debes rellenar todos los campos.");
//     }

//     if(rating === "Rating") {
//         messages.push("*Debes seleccionar un valor de Rating.")
//     }

//     if(comment.length >= 100 || movie.length >= 50){
//         messages.push("*Llegaste al limite de carácteres. (Peliculas 50, Commentario 100)")
//     }


//     if(anio.length > 4) {
//        messages.push("El año no puede ser superior a 4 digitos")
//     }

//     if(!(/[0-9]{4}$/g.test(anio))) {
//         messages.push("Debes escribir el año en numeros <i>(ej: 2023)</i>.")
//     }

    
//     if(messages.length > 0) {
//         evento.preventDefault();
//         errorMsg[0].innerHTML = messages.join(' ');


//     //añadir pelicula a lista
//     } else { 

//         if(selectedRow == null) {
//         const movieList = document.querySelector("tr") 
//         movieList.style.display = "table-row"

//         const cuerpoLista = document.getElementById("cuerpo-lista");
//         const trRow = document.createElement("tr");
//         trRow.id = "movieContainer";

//         trRow.innerHTML = `
//             <th scope="row">${movie}</th>
//             <td>${anio}</td>
//             <td>${rating}</td>
//             <td><i>"${comment}"</i></td>
//             <td>
//             <a href="#"  class="btn btn-warning btn-sm edit">Editar</a>
//             <a href="#" onclick="remove(event)" class="btn btn-danger btn-sm delete">Eliminar</a>
//             </td>
//         `
//         cuerpoLista.appendChild(trRow)
//         selectedRow = null;
//         resetForm();
//        // console.log(trRow.id)

//         errorMsg[0].style.display = "none"; //desaparecer error al ingresar pelicula. 
    
//     }

       

//     }

           
// })


// //DELETE DATA
  
// function remove(event) {
//     const movieList = document.getElementById("movieContainer")

//     event.preventDefault();
//         movieList.remove();
//    }

//    //EDIT DATA




//************************** NEW FORM


// var movieList = [
// //     {movie: "Terminator", año:"2000", rating:"<option>ME GUSTO<div>👍</div></option>", comment:"Muy buena Historia",},
// //       {movie: "The Dark Knight", anio:"2007", rating:
// // "<option>OBRA MAESTRA<div>💎</div></option>", comment:"Increible!",}
// ]

 //HIDE UPADATE BUTTON

function hideUpdateButton () {
    const updateButton = document.querySelector("#boton-actualizar") 
    updateButton.style.display = "none" //default --> display: inline-block;
}

hideUpdateButton()



//******************** STORE DATA LOCAL STORAGE
function addDataLocalStorage(event) {
    event.preventDefault();

    //Acceder a values
    let movie = document.getElementById("movie").value
    let anio = document.getElementById("anio").value
    let rating = document.getElementById("specificSizeSelect").value
    let comment = document.getElementById("exampleFormControlTextarea1").value
    let movieID = getMovieID(); 

    //validadores

    let errorMsg = document.querySelector(".errorMsg");
    
    let messages = [];

    if(movie === "" || anio === "" || comment === "") {
        messages.push("*Debes rellenar todos los campos.");
        console.log(messages)
    }

    if(rating === "Rating") {
        messages.push("*Debes seleccionar un valor de Rating.")
    }

    if(comment.length >= 100 || movie.length >= 50){
        messages.push("*Llegaste al limite de carácteres. (Peliculas 50, Commentario 100)")
    }

    if(anio.length > 4) {
       messages.push("El año no puede ser superior a 4 digitos.")
    }

    if(!(/[0-9]{4}$/g.test(anio))) {
        messages.push("Debes escribir el año en numeros <i>(ej: 2023)</i>.")
    }

    if(messages.length > 0) {
        event.preventDefault();
        errorMsg.innerHTML = messages.join(' ');
    }

    //conectar variable con key local storage
  let movieKey;
    if(localStorage.getItem("movieKey") === null) {
        movieKey = [];
    } else {
        movieKey = JSON.parse(localStorage.getItem("movieKey"))
        
    }
    //******************** IDENTIFICADOR NEW MOVIE PARA DELETE
    //creamos key lastMovieId
    function getMovieID() {
        let lastMovieId = localStorage.getItem("lastMovieId") || "-1";
        let newMovieId = JSON.parse(lastMovieId) + 1;
        localStorage.setItem("lastMovieId", JSON.stringify(newMovieId))
        return newMovieId;
    }
   
   //agregar values en forma de objeto a movieKey
   movieKey.push({movie, anio, rating, comment, movieID})

   //agregar objeto creado al local storage
   localStorage.setItem("movieKey", JSON.stringify(movieKey));
   showDataHtml()

   //refresh inputs
   document.getElementById("movie").value = ""
   document.getElementById("anio").value = ""
   document.getElementById("specificSizeSelect").value = "Rating"
   document.getElementById("exampleFormControlTextarea1").value = ""

}


//******************** SHOW DATA HTML
function showDataHtml() {

    //tabla header
    const movieTable = document.querySelector("tr") 
    //mismo step de addDataLocalStorage
    let movieKey; 
    if(localStorage.getItem("movieKey") === null) {
        movieKey = [];
        movieTable.style.display = "none" //esconder header 
    } else {
        movieKey = JSON.parse(localStorage.getItem("movieKey"))
        movieTable.style.display = "table-row" //mostrar header
       
    }

  //crear elemento en html  dentro de tbody del table 
    
   const cuerpoLista = document.getElementById("cuerpo-lista");

  let htmlElements = "";

  movieKey.forEach((element, index) => {
      htmlElements += `<tr id="movieContainer" movieid="${element.movieID}">
          <th scope="row">${element.movie}</th>
          <td>${element.anio}</td>
          <td>${element.rating}</td>
          <td><i>"${element.comment}"</i></td>
          <td>
          <a href="#" onclick="editData(${index})" class="btn btn-warning btn-sm edit">Editar</a>
          <a href="#" onclick="remove(event)" class="btn btn-danger btn-sm delete">Eliminar</a>
          </td>
          </tr>`

  })

  cuerpoLista.innerHTML = htmlElements;
}

document.onload = showDataHtml()

//******************** DELETE DATA

//le paso como parametro ID de movie dentro de obj que quiero eliminar 
function remove(event) {

    // event.target.parentNode.parentNode.remove();
    let accederListaHTML = event.target.parentNode.parentNode; //agarra fila a eliminar
    let movieRow = document.getElementById("movieContainer") 
    let accessID = movieRow.getAttribute("movieid"); 
    accederListaHTML.remove()
    deleteMovieIdObj(accessID); //eliminar del local storage
 }




 //********guardar movie ID en local Storage
function deleteMovieIdObj(movieID) {
    //obtengo
    let movieArrObj = JSON.parse(localStorage.getItem("movieKey")) //obtenemos array con objetos
    //busco movie ID de pelicula que quiero eliminar
    let movieIndexInArray =  movieArrObj.findIndex(element => element.movieID === movieID)
    //Elimino elemento unicamente 1 elemento
    movieArrObj.splice(movieIndexInArray, 1)

    let movieArrayJSON = JSON.stringify(movieArrObj);

    localStorage.setItem("movieKey", movieArrayJSON);

}



// let arrmovies = JSON.parse(localStorage.getItem("movieKey"))
// console.log(arrmovies[0].movieID) //asi accedemos a propiedad de objeto 


// console.log(localStorage.getItem("movieKey".movie))
//******************** EDIT DATA

    function editData(index) {

        //cambiar botones 
        const updateButton = document.querySelector("#boton-actualizar") 
        updateButton.style.display = "inline-block" 

        const submitButton = document.querySelector("#boton-form")
        submitButton.style.display = "none" 

          //obtener data del local storage
        let movieKey; 
         if(localStorage.getItem("movieKey") === null) {
        movieKey = [];
        } else {
        movieKey = JSON.parse(localStorage.getItem("movieKey"))
        }

        //mostrar valores en submit form 
       document.getElementById("movie").value = movieKey[index].movie
       document.getElementById("anio").value = movieKey[index].anio
       document.getElementById("specificSizeSelect").value = movieKey[index].rating
       document.getElementById("exampleFormControlTextarea1").value = movieKey[index].comment
    
console.log(movieKey[index].movie)
console.log(document.getElementById("movie").value)


       document.getElementById("boton-actualizar").onclick = function () {

        //validadores

        //actualizar data en table, pero falta anclarla despues 
            movieKey[index].movie = document.getElementById("movie").value
            movieKey[index].anio = document.getElementById("anio").value
            movieKey[index].rating = document.getElementById("specificSizeSelect").value
            movieKey[index].comment = document.getElementById("exampleFormControlTextarea1").value

            console.log(movieKey)
            console.log(JSON.stringify(movieKey))

        
        //anclar al local storage para que se actualize misma fila
        localStorage.setItem("movieKey", JSON.stringify(movieKey))

        console.log(movieKey) //con esto cache que el problema es el local storage

        //actualizar en html 
        showDataHtml()


        //  document.getElementById("movie").value = ""
        //  document.getElementById("anio").value = ""
        //  document.getElementById("specificSizeSelect").value = ""
        //  document.getElementById("exampleFormControlTextarea1").value = ""

         //cambiar botones 
         const updateButton = document.querySelector("#boton-actualizar") 
         updateButton.style.display = "none" 
 
         const submitButton = document.querySelector("#boton-form")
         submitButton.style.display = "inline-block" 


       }



    }




//******************** DELETE DATA FROM LOCAL STORAGE

//     function remove() {

     

//         const movieContainer = document.getElementById("movieContainer")

//          //get data from local storage, parse it 
//         let movieKey; 
//             movieKey = JSON.parse(localStorage.getItem("movieKey"))

//             console.log(JSON.parse(localStorage.getItem("movieKey")).splice(index))

//         //let spliceMovieArray = movieKey.splice(index)
//         //console.log(spliceMovieArray)

//         //console.log(movieKey[index]) //Test para ver como acceder a cada obj
//         // localStorage.removeItem("movieKey", index); //elimina del local storage
//         //  movieContainer.remove() //eliminar de html


//     }
    

// remove()
// //console.log(JSON.parse(localStorage.getItem("movieKey", "movieKey[0]")))

