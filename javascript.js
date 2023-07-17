
 //HIDE UPADATE BUTTON
function hideUpdateButton () {
    const updateButton = document.querySelector("#boton-actualizar") 
    updateButton.style.display = "none" //default --> display: inline-block;
}

hideUpdateButton()

//HIDE EDIT TITLE
function hideEditTitle() {
    const editTitle = document.querySelector("#edita-pelicula-header")
    editTitle.style.display = "none"
}

hideEditTitle()

//HIDE ALERT MESSAGES
function hideAlerts() {
    const addAlert = document.querySelector(".add-alert")
    addAlert.style.display = "none"

    const editAlert = document.querySelector(".edit-alert")
    editAlert.style.display = "none"

    const deleteAlert = document.querySelector(".delete-alert")
    deleteAlert.style.display = "none"
}

hideAlerts()


//*********************** VALIDATE FORM ******************************
function validateFrom() {
    let movie = document.getElementById("movie").value
    let anio = document.getElementById("anio").value
    let rating = document.getElementById("specificSizeSelect").value
    let comment = document.getElementById("exampleFormControlTextarea1").value

      
    let messages = [];

    // if(findRepeatedMovie == true) {
    //     messages.push("*Ya esta esta pelicula en tu lista");
    // }

    if(movie === "" || anio === "" || comment === "") {
        messages.push("*Debes rellenar todos los campos.");
    
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
        //show error msg
        errorMsg.style.display = "block"
        errorMsg.innerHTML = messages.join(' ');
        return false
    }

    return true;

}


//******************** STORE DATA LOCAL STORAGE **********************

function addDataLocalStorage(event) {
    event.preventDefault();

    let movieKey; 
    if(localStorage.getItem("movieKey") === null) {
        movieKey = [];
    } else {
        movieKey = JSON.parse(localStorage.getItem("movieKey"))
    }

            //******************** IDENTIFICADOR NEW MOVIE PARA DELETE
const getMovieID = () => {
    //lastMovieId sera otro "key" de nuestro local storage, si el valor es null (no tiene nada dentro), lo igualamos a -1, asi nos aseguramos que exista key
    let lastMovieId = localStorage.getItem("lastMovieId") || "-1";
    console.log(lastMovieId)
    //parseamos lastMovieId (transformarlo a numero) y le sumamos 1, se podria usar parseInt tambien,, le agrega 1 a cada lastItem, entonces 0,1,2,3 etc
    let newMovieId = JSON.parse(lastMovieId) + 1;
    //agregamos id nuevo al local storage
    localStorage.setItem("lastMovieId", JSON.stringify(newMovieId))
    //retornamos valor de id valido que sera el valor encontrado dentro del objeto
    return newMovieId;
}
   

    if(validateFrom() == true) {
    let errorMsg = document.querySelector("#errorMsg");
    let movie = document.getElementById("movie").value
    let anio = document.getElementById("anio").value
    let rating = document.getElementById("specificSizeSelect").value
    let comment = document.getElementById("exampleFormControlTextarea1").value
    let movieID = getMovieID(); 


   //agregar values en forma de objeto a movieKey
   movieKey.push({movie, anio, rating, comment, movieID})

   //agregar objeto creado al local storage
   localStorage.setItem("movieKey", JSON.stringify(movieKey));
   showDataHtml()

   //alert pelicula agregada
   const addAlert = document.querySelector(".add-alert")
    addAlert.style.display = "block"

    setTimeout(() => document.querySelector(".add-alert").style.display = "none", 3000)


   //refresh inputs
   document.getElementById("movie").value = ""
   document.getElementById("anio").value = ""
   document.getElementById("specificSizeSelect").value = "Rating"
   document.getElementById("exampleFormControlTextarea1").value = ""

   //eliminar errorMsg
   errorMsg.style.display = "none"
}
  
}


//******************** SHOW DATA HTML ********************************** 
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
          <a href="#" onclick="remove(event)" data-movieid="${element.movieID}" class="btn btn-danger btn-sm delete">Eliminar</a>
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
            //movieKey = JSON.parse(localStorage.getItem("movieKey"))
            movieTable.style.display = "table-row" //mostrar header
        
        }
    }

//********************************** DELETE DATA ********************************** 


function remove(event) {

    event.preventDefault()
    //eliminar de html
    let accederListaHTML = event.target.parentNode.parentNode; 
    //acceder a movie ID para eliminar de local storage
    //let movieRow = document.getElementById("movieContainer") 
    let movieID = event.target.closest("tr").getAttribute("movieid");
    console.log("remove: " + movieID)
  
   //alert pelicula eliminada
   const addAlert = document.querySelector(".delete-alert")
   addAlert.style.display = "block"

   setTimeout(() => document.querySelector(".delete-alert").style.display = "none", 3000)

   //eliminar hTML --> debe estar abajo para que el movieRow sea el del elemento html seleccionado. 
   accederListaHTML.remove()
   //eliminar del local storage
    deleteMovieIdObj(movieID); 
    console.log("********FIN MOVIE ID")
 }



 //Eliminar elemento con ID especifico del local Storage y actualizarlo 
function deleteMovieIdObj(valor) {
    //obtengo movieKey [{..},..]
    console.log("********DELETE from LOCAL STORAGE")
    let movieArrObj = JSON.parse(localStorage.getItem("movieKey")) //obtenemos array con objetos
    //devulev index de elemento que cumple la condicion 
    let movieIndexInArray =  movieArrObj.findIndex(element => {
        console.log("Element movieID:", element.movieID);
        console.log("Valor:", valor);
        return element.movieID == valor
    })
    console.log("index de objeto: " + movieIndexInArray)
    //Elimino elemento, y unicamente 1 elemento
    movieArrObj.splice(movieIndexInArray, 1)
    console.log(movieArrObj)

    //ingresamos array editado al local storage, convertir a JSON y luego se guarda con setitem
    let movieArrayJSON = JSON.stringify(movieArrObj);
    localStorage.setItem("movieKey", movieArrayJSON);

}


//******************** EDIT DATA - CLICK EDIT ********************************** 

//Global variable
let selectedMovieID;

//editar inputs con valor
        function editData(event) { 
            event.preventDefault()

            let movieRow = document.getElementById("movieContainer") 
            let IDvalue = event.target.closest("tr").getAttribute("movieid");
            console.log("****Event target closest*****")
            console.log(event.target.closest("tr"))
            console.log("access ID: " + IDvalue)
        
            selectedMovieID = IDvalue

            //acceder objeto del local storage
            accessDataFromId(IDvalue)
    
        }

    console.log("*******EDITANDO local storage")

// acceder a ID de local storage
        function accessDataFromId(IDvalue) {

            //cambiar titulo a editar pelicula
            const titleHeader = document.querySelector("#agrega-pelicula-header")
            titleHeader.style.display = "none"
            const editTitle = document.querySelector("#edita-pelicula-header")
            editTitle.style.display = "block"

            //cambiar botones 
         const updateButton = document.querySelector("#boton-actualizar") 
         updateButton.style.display = "inline-block" 

        const submitButton = document.querySelector("#boton-form")
         submitButton.style.display = "none" 

            //obtenemos array con objetos
            let movieKey = JSON.parse(localStorage.getItem("movieKey"))
            console.log(movieKey)
            //busco movie ID de pelicula que quiero EDITAR

            console.log(IDvalue)

            //retorna INDEX donde se encuentra pelicula seleccionada. 
            let movieToEdit = movieKey.findIndex((movie) => movie.movieID ==IDvalue);
            
            console.log("****movieToEdit INDEX value abajo:")
            console.log(movieToEdit)
            
            if (movieToEdit !== undefined) {
            document.getElementById("movie").value = movieKey[movieToEdit].movie;
            document.getElementById("anio").value = movieKey[movieToEdit].anio;
            document.getElementById("specificSizeSelect").value = movieKey[movieToEdit].rating;
            document.getElementById("exampleFormControlTextarea1").value = movieKey[movieToEdit].comment;
            } else {
                console.log("Movie ID not found: " + IDvalue)
            }

      
    
        }
    


//******************** EDIT DATA - UPDATE
      function updateDataOnClick(event) {
        event.preventDefault()

         //cambiar titulo a editar pelicula
         const titleHeader = document.querySelector("#agrega-pelicula-header")
         titleHeader.style.display = "block"
         const editTitle = document.querySelector("#edita-pelicula-header")
         editTitle.style.display = "none"

        console.log("*****UPDATE DATA")
        //Get movie ID of movie being edited
        //let accessID = event.target.getAttribute("data-movieid")
        let accessID = selectedMovieID
        console.log("accessID: " + accessID)

        //get the updated values from form fields
        let updatedMovie = document.getElementById("movie").value 
        let updatedAnio = document.getElementById("anio").value
        let updatedRating = document.getElementById("specificSizeSelect").value 
        let updatedComment = document.getElementById("exampleFormControlTextarea1").value

        console.log("upadted movie: " + updatedMovie)


         //get movieKey from local storage
         let movieKey = JSON.parse(localStorage.getItem("movieKey"))
         console.log(movieKey)
    

        //encontrar movie object que haga match con movie ID
        let movieToUpdate = movieKey.find((movie) => {
               if (movie.movieID == accessID)
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


          //cambiar botones 
          const updateButton = document.querySelector("#boton-actualizar") 
          updateButton.style.display = "none" 
 
         const submitButton = document.querySelector("#boton-form")
          submitButton.style.display = "inline-block" 

          //mostrar data html
          showDataHtml()

            //alert pelicula editada
            const addAlert = document.querySelector(".edit-alert")
            addAlert.style.display = "block"

            setTimeout(() => document.querySelector(".edit-alert").style.display = "none", 3000)

          //clear form fields
        document.getElementById("movie").value = "";
        document.getElementById("anio").value = "";
        document.getElementById("specificSizeSelect").value = "Rating";
        document.getElementById("exampleFormControlTextarea1").value = "";
        displayTableRow() 
         

        }



 