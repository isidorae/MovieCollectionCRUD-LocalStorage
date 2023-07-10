
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



//******************** STORE DATA LOCAL STORAGE
function addDataLocalStorage(event) {
    event.preventDefault();

    //Acceder a values
    const movie = document.getElementById("movie").value
    const anio = document.getElementById("anio").value
    const rating = document.getElementById("specificSizeSelect").value
    const comment = document.getElementById("exampleFormControlTextarea1").value

    //validadores

    const errorMsg = document.querySelector(".errorMsg");
    
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
  let movieList;
    if(localStorage.getItem("movieKey") === null) {
        movieList = [];
    } else {
        movieList = JSON.parse(localStorage.getItem("movieKey"))
        
    }

   //agregar values en forma de objeto a movieKey
   movieList.push({movie, anio, rating, comment})

   //agregar objeto creado al local storage
   localStorage.setItem("movieKey", JSON.stringify(movieList));
   showDataHtml()

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
      htmlElements += `<tr>
          <th scope="row">${element.movie}</th>
          <td>${element.anio}</td>
          <td>${element.rating}</td>
          <td><i>"${element.comment}"</i></td>
          <td>
          <a href="#" onclick="edit(${index})" class="btn btn-warning btn-sm edit">Editar</a>
          <a href="#" onclick="remove(${index})" class="btn btn-danger btn-sm delete">Eliminar</a>
          </td>
          </tr>`

  })

  cuerpoLista.innerHTML = htmlElements;
}

document.onload = showDataHtml()



