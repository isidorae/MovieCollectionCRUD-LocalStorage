



//Add data

const movieForm = document.querySelector("#movie-form")

movieForm.addEventListener("submit", (evento) => {
    evento.preventDefault(); //Evitar que ponga submit sin contenido

    const movie = document.getElementById("movie").value
    const anio = document.getElementById("anio").value
    const rating = document.getElementById("specificSizeSelect").value
    const comment = document.getElementById("exampleFormControlTextarea1").value
   
    const errorMsg = document.getElementsByClassName("errorMsg");


    //Validadores
    let messages = [];

    if(movie === "" || anio === "" || rating === "") {
        messages.push("*Debes rellenar todos los campos.");
    }

    if(rating === "Rating") {
        messages.push("*Debes seleccionar un valor de Rating.")
    }

    if(comment.length >= 100 || movie.length >= 50){
        messages.push("*Llegaste al limite de carácteres. (Peliculas 50, Commentario 100)")
    }


    if(anio.length > 4) {
        messages.push("Debes escribir el año en numeros y en 4 digitos <i>(ej: 2023)</i>.")
    }

    
    if(messages.length > 0) {
        evento.preventDefault();
        errorMsg[0].innerHTML = messages.join(' ');
    }


    //añadir pelicula
    else { 

        const cuerpoLista = document.getElementById("cuerpo-lista");
        const trRow = document.createElement("tr");
        trRow.id = "movieContainer";

        trRow.innerHTML = `
            <th scope="row">${movie}</th>
            <td>${anio}</td>
            <td>${rating}</td>
            <td><i>"${comment}"</i></td>
            <td>
            <a href="#"  class="btn btn-warning btn-sm edit">Editar</a>
            <a href="#" onclick="remove(event)" class="btn btn-danger btn-sm delete">Eliminar</a>
            </td>
        `
        cuerpoLista.appendChild(trRow)
       // console.log(trRow.id)

        errorMsg[0].style.display = "none"; //desaparecer error al ingresar pelicula. 

    }

           
})

//const movieList = document.querySelector("tr") --> funciona para eliminar cabecera!! 

//function remove() {
//    movieList.remove(); 
//}



//Delete Data
   //DELETE DATA //Sitll not working

   /*
   let buttonDelete = document.getElementsByClassName("delete");
   
   console.log(buttonDelete)


   buttonDelete[0].addEventListener("click", (hideList) => {
       hideList.preventDefault();

       const trRow = document.getElementById("movieContainer");
       trRow.style.display = "none";

   }) */

  
   
   function remove(event) {
    const movieList = document.getElementById("movieContainer")

    event.preventDefault();
        movieList.remove();
   }

 


