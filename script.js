const $ImgCharacter = document.querySelector("#ImgCharacter");
const $next = document.querySelector("#next");
var id = 1;

$next.addEventListener("click", (e) => {
    id++;
    obtenerPersonaje(id);
});

function llenarDatos(image, nombre, species, status, gender, origin, location) {
    let colorStatus;
    switch (status) {
        case "Alive":
            colorStatus = "green";
            break;
        case "Dead":
            colorStatus = "red";
            break;
        case "unknown":
            colorStatus = "yellow";
            break;
    }
    $ImgCharacter.setAttribute("src", image);
    document.getElementById("name").innerHTML = nombre;
    document.getElementById("name-placeholder").innerHTML = nombre;
    document.getElementById("species").innerHTML =
        "<strong>Specie:</strong> " + species;
    document.getElementById(
        "status"
    ).innerHTML = `<strong>Status:</strong> ${status} <span class="color-status ${colorStatus}"></span>`;
    document.getElementById("gender").innerHTML =
        "<strong>Gender:</strong> " + gender;
    document.getElementById("origin").innerHTML =
        "<strong>Origin:</strong> " + origin;
    document.getElementById("location").innerHTML =
        "<strong>Location:</strong> " + location;
}

obtenerPersonaje(id);

async function obtenerPersonaje(id) {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    let data = await response.json();

    llenarDatos(
        data.image,
        data.name,
        data.species,
        data.status,
        data.gender,
        data.origin.name,
        data.location.name
    );
}