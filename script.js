const $ImgPersonaje = document.querySelector('#ImgPersonaje');
const btnSearch = document.querySelector('#btn-search');

btnSearch.addEventListener('click', function(event) {
    buscar();
    event.preventDefault();
});

function llenarDatos(image, nombre, species, status, gender, origin, location) {
    $ImgPersonaje.setAttribute('src', image);
    document.getElementById('name').innerHTML = nombre;
    document.getElementById('species').innerHTML = "<strong>Specie:</strong> " + species;
    document.getElementById('status').innerHTML = "<strong>Status:</strong> " + status;
    document.getElementById('gender').innerHTML = "<strong>Gender:</strong> " + gender;
    document.getElementById('origin').innerHTML = "<strong>Origin:</strong> " + origin;
    document.getElementById('location').innerHTML = "<strong>Location:</strong> " + location;
}

function buscar() {
    let txtsearch = document.getElementById("inlineFormCustomSelect");
    let personaje = txtsearch.value;
    let url = "https://rickandmortyapi.com/api/character/?name=" + personaje;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            datos = data.results[0];
            llenarDatos(datos.image, datos.name, datos.species, datos.status, datos.gender, datos.origin.name, datos.location.name);
        })
        .catch(() => llenarDatos("/img/404.jpg", "No encontrado", "No encontrado", "No encontrado", "No encontrado", "No encontrado", "No encontrado"))

}


function llenarCombo() {
    fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.info.pages; index++) {
                let url = 'https://rickandmortyapi.com/api/character/?page=' + (index + 1);
                fetch(url)
                    .then(response => response.json())
                    .then(datos => {
                        datos.results.forEach(e => {
                            let nombre = e.name;
                            document.getElementById('inlineFormCustomSelect').innerHTML += " <option selected>" +
                                nombre + "</option>";
                        })
                    })
            }
        })
}

fetch('https://rickandmortyapi.com/api/character/493')
    .then(response => response.json())
    .then(data => {
        llenarCombo();
        llenarDatos(data.image, data.name, data.species, data.status, data.gender, data.origin.name, data.location.name)
    })