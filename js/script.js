
// creaamos un ARRAY [] de chistes
// guardamos el [] en el LocalStorage
// hacemos eventListener del btn
// llama a la api y trae el chiste
// imprime el chiste en un nuevo LI de la UL
// sumamos este chiste al ARRAY [] de chiste

let arrChiste = JSON.parse(localStorage.getItem("chistesGuardados")) || [];

const btn = document.getElementById("fetchJoke")
const list = document.getElementById("jokeList")
const btnEliminar = document.getElementById('botonEliminar');


btn.addEventListener("click", () => {
    fetch("https://api.chucknorris.io/jokes/random")

        .then ((response) => {

            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa")
            }


            return response.json()

        })

        .then((data) => {
        //console.log(data);
        
            
            list.insertAdjacentHTML("beforeend",
                `
                <div class='joke-div'>
                <li>${data.value}</li>
                <button class="eliminarChiste" onclick="deleteJoke()">X</button>
                </div>
                `
                )       
            
            arrChiste.push(data.value);
            keepJokes();
            hideButton();

        })
        
    })


const keepJokes = () => {
    localStorage.setItem("chistesGuardados", JSON.stringify(arrChiste));
}

const getJokes = () => {
    arrChiste.forEach(chiste => {
        list.insertAdjacentHTML("beforeend",
            `
            <div class='joke-div'>
            <li>${chiste}</li>
            <button class="eliminarChiste" onclick="deleteJoke()">X</button>
            </div>
            `
        )        
     });
        
}

const deleteJokes = () => {
    btnEliminar.addEventListener('click', () => {
        list.innerHTML = '';
        localStorage.clear();
        btnEliminar.classList.add('oculto');
    })
}

const hideButton = () => {
    if(arrChiste.length === 0) {
        btnEliminar.classList.add('oculto')
    } else {
        btnEliminar.classList.remove('oculto');
    }
}

getJokes();
hideButton();
deleteJokes();
