
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
                <li>${data.value}</li>
                <button class="btnEliminar">Eliminar</button>
                `
                )       
            
            arrChiste.push(data.value);
            keepJokes();
            btnEliminar.classList.remove('oculto');

        })
        
    })

    const keepJokes = () => {
        localStorage.setItem("chistesGuardados", JSON.stringify(arrChiste));
    }

    const getJokes = () => {
        arrChiste.forEach(chiste => {
            list.insertAdjacentHTML("beforeend",
                `
                <li>${chiste}</li>
                <button class="btnEliminar">Eliminar</button>
                `
                )  
        });
        
    }

    btnEliminar.addEventListener('click', () => {
        list.innerHTML = '';
        localStorage.clear();
        btnEliminar.classList.add('oculto');
    })

    if(arrChiste.length === 0) {
        btnEliminar.classList.add('oculto')
    } else {
        btnEliminar.classList.remove('oculto');
    }
    getJokes();

// - Manejador de click en el botón "Obtener Chiste"
// - Una función para obtener un chiste de Chuck Norris desde la API --> jokesStorage
// - Una función para renderizar la lista de chistes en el DOM
// - Una función para guardar la lista de chistes en localStorage -->keepJokes
// - Una función para cargar la lista de chistes desde localStorage -->getJokes