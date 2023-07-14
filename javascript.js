
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
    } else {
        //eliminar msjes de error
        errorMsg.style.display = "none";
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
        //lastMovieId sera otro "key" de nuestro local storage, si el valor es null (no tiene nada dentro), lo igualamos a -1, asi nos aseguramos que exista key
        let lastMovieId = localStorage.getItem("lastMovieId") || "-1";
        //parseamos lastMovieId (transformarlo a numero) y le sumamos 1, se podria usar parseInt tambien,, le agrega 1 a cada lastItem, entonces 0,1,2,3 etc
        let newMovieId = JSON.parse(lastMovieId) + 1;
        //agregamos id nuevo al local storage
        localStorage.setItem("lastMovieId", JSON.stringify(newMovieId))
        //retornamos valor de id valido que sera el valor encontado dentro del objeto
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
       // movieTable.style.display = "none" //esconder header 
    } else {
        movieKey = JSON.parse(localStorage.getItem("movieKey"))
      //  movieTable.style.display = "table-row" //mostrar header
       
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
          <a href="#" onclick="editData(event)" class="btn btn-warning btn-sm edit">Editar</a>
          <a href="#" onclick="remove(event)" class="btn btn-danger btn-sm delete">Eliminar</a>
          </td>
          </tr>`

  })

  cuerpoLista.innerHTML = htmlElements;
  displayTableRow() 
}

document.onload = showDataHtml()

//************* HIDE AND SHOW TABLLE ROW

    function displayTableRow() {
         //tabla header
        const movieTable = document.querySelector("tr") 
   
        let movieKey; 
        if(localStorage.getItem("movieKey") === null || localStorage.getItem("movieKey") === "[]" ) {
            movieTable.style.display = "none" //esconder header 
        } else {
            movieKey = JSON.parse(localStorage.getItem("movieKey"))
            movieTable.style.display = "table-row" //mostrar header
        
        }
    }

//********************************** DELETE DATA

//le paso como parametro ID de movie dentro de obj que quiero eliminar 
function remove(event) {
    event.preventDefault()

    let accederListaHTML = event.target.parentNode.parentNode; 
    let movieRow = document.getElementById("movieContainer") 
    let accessID = movieRow.getAttribute("movieid"); 
    console.log("accessDelete ID: " + accessID)
    accederListaHTML.remove()
    deleteMovieIdObj(accessID); //eliminar del local storage
 }




 //Eliminar elemento con ID especifico del local Storage y actualizarlo 
function deleteMovieIdObj(movieID) {
    //obtengo movieKey [{..},..]
    let movieArrObj = JSON.parse(localStorage.getItem("movieKey")) //obtenemos array con objetos
    //busco movie ID de pelicula que quiero eliminar (indice de elemento a eliminar)
    let movieIndexInArray =  movieArrObj.findIndex(element => element.movieID === movieID)
    console.log("moveindexArray: " + movieIndexInArray)
    //Elimino elemento, y unicamente 1 elemento
    movieArrObj.splice(movieIndexInArray, 1)

    //ingresamos array editado al local storage, convertir a JSON y luego se guarda con setitem
    let movieArrayJSON = JSON.stringify(movieArrObj);
    localStorage.setItem("movieKey", movieArrayJSON);

}


//******************** EDIT DATA - CLICK EDIT


//editar inputs con valor
        function editData(event) { 
            event.preventDefault()

            let movieRow = document.getElementById("movieContainer") 
            let accessID = movieRow.getAttribute("movieid"); 
            console.log("access ID: " + accessID)
        
            //deleteMovieIdObj(accessID); //eliminar del local storage
            accessDataFromId(accessID)
    
       
        }

    console.log("*******EDITANDO")

// acceder a ID de local storage
        function accessDataFromId(movieID) {

            //cambiar botones 
         const updateButton = document.querySelector("#boton-actualizar") 
         updateButton.style.display = "inline-block" 

        const submitButton = document.querySelector("#boton-form")
         submitButton.style.display = "none" 

            //obtenemos array con objetos
            let movieKey = JSON.parse(localStorage.getItem("movieKey"))
            console.log(movieKey)
            //busco movie ID de pelicula que quiero EDITAR
        let movieIndexInArray =  movieKey.findIndex(element => {
           if (element.movieID === movieID) 
           //mostrar valores en submit form
           return
           document.getElementById("movie").value = element.movie
           document.getElementById("anio").value = element.anio
           document.getElementById("specificSizeSelect").value = element.rating
           document.getElementById("exampleFormControlTextarea1").value = element.comment

        })
       
    
        }
    
//******************** EDIT DATA - UPDATE

      function updateDataOnClick(event) {
        event.preventDefault()

        //Get movie ID of movie being edited
        let movieRow = document.getElementById("movieContainer") 
        let accessID = movieRow.getAttribute("movieid"); 
        console.log("accessID: " + accessID)

         //get movieKey from local storage
         let movieKey = JSON.parse(localStorage.getItem("movieKey"))
         console.log(movieKey)

        //get the updated values from form fields
        let updatedMovie = document.getElementById("movie").value 
        let updatedAnio = document.getElementById("anio").value
        let updatedRating = document.getElementById("specificSizeSelect").value 
        let updatedComment = document.getElementById("exampleFormControlTextarea1").value

        console.log("upadted movie: " + updatedMovie)
    


        //encontrar movie object que haga match con movie ID
        let movieToUpdate = movieKey.find((movie) => {

        movie.movieID === accessID
            return movie
        });

        console.log(movieToUpdate)


        //update valores de prop de objeto con nuevos valores
        movieToUpdate.movie = updatedMovie;
        movieToUpdate.anio = updatedAnio;
        movieToUpdate.rating = updatedRating;
        movieToUpdate.comment = updatedComment;

       

        //guardar movieKey array actualizado en local storage
        localStorage.setItem("movieKey", JSON.stringify(movieKey))

        //clear form fields
        document.getElementById("movie").value = "";
        document.getElementById("anio").value = "";
        document.getElementById("specificSizeSelect").value = "";
        document.getElementById("exampleFormControlTextarea1").value = "";

          //cambiar botones 
          const updateButton = document.querySelector("#boton-actualizar") 
          updateButton.style.display = "none" 
 
         const submitButton = document.querySelector("#boton-form")
          submitButton.style.display = "inline-block" 

          //mostrar data html
          showDataHtml()

        }



    // function accessDataToUpdate(movieID) {
    //     let movieKey = JSON.parse(localStorage.getItem("movieKey"))
    //     console.log(movieKey)
    //     //busco movie ID de pelicula que quiero EDITAR
    // let movieIndexInArray =  movieKey.findIndex(element => {
    //    if (element.movieID === movieID) 
    //    //mostrar valores en submit form
    //    return 
    //    element.movie = document.getElementById("movie").value 
    //    element.anio = document.getElementById("anio").value
    //    element.rating = document.getElementById("specificSizeSelect").value 
    //    element.comment = document.getElementById("exampleFormControlTextarea1").value
    // })
    // }




//     function editData(index) {

//         index.preventDefault()
//         //cambiar botones 
//         const updateButton = document.querySelector("#boton-actualizar") 
//         updateButton.style.display = "inline-block" 

//         const submitButton = document.querySelector("#boton-form")
//         submitButton.style.display = "none" 

//         let movieKey = JSON.parse(localStorage.getItem("movieKey"))

//         //mostrar valores en submit form 
//        document.getElementById("movie").value = movieKey[index].movie
//        document.getElementById("anio").value = movieKey[index].anio
//        document.getElementById("specificSizeSelect").value = movieKey[index].rating
//        document.getElementById("exampleFormControlTextarea1").value = movieKey[index].comment
    
// console.log(movieKey[index].movie)
// console.log(document.getElementById("movie").value)


//        document.getElementById("boton-actualizar").onclick = function () {

//         //validadores

//         //actualizar data en table, pero falta anclarla despues 
//             movieKey[index].movie = document.getElementById("movie").value
//             movieKey[index].anio = document.getElementById("anio").value
//             movieKey[index].rating = document.getElementById("specificSizeSelect").value
//             movieKey[index].comment = document.getElementById("exampleFormControlTextarea1").value

//             console.log(movieKey)
//             console.log(JSON.stringify(movieKey))

        
//         //anclar al local storage para que se actualize misma fila
//         localStorage.setItem("movieKey", JSON.stringify(movieKey))

//         console.log(movieKey) //con esto cache que el problema es el local storage

//         //actualizar en html 
//         showDataHtml()

//          //cambiar botones 
//          const updateButton = document.querySelector("#boton-actualizar") 
//          updateButton.style.display = "none" 
 
//          const submitButton = document.querySelector("#boton-form")
//          submitButton.style.display = "inline-block" 


//        }



//     }




