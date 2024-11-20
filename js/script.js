
// creaamos un ARRAY [] de chistes
// guardamos el [] en el LocalStorage
// hacemos eventListener del btn
// llama a la api y trae el chiste
// imprime el chiste en un nuevo LI de la UL
// sumamos este chiste al ARRAY [] de chiste

let arrChiste = []

let chistes = localStorage.getItem("chistesGuardados")

const btn = document.getElementById("fetchJoke")
const list = document.getElementById("jokeList")

console.log(chistes);

list.innerText = chistes

btn.addEventListener("click", () => {
    fetch("https://api.chucknorris.io/jokes/random")

        .then ((response) => {

            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa")
            }


            return response.json()

        })

        .then((data) => {
        console.log(data);
        
        list.insertAdjacentHTML("beforeend",
            `
            <li>${data.value}</li>
            <button class="btnEliminar">Eliminar</button>
            `
            ) 
  
        })
        
    })