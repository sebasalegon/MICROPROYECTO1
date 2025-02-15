/*Funcion para ingresar el nombre */

function guardarNombre() {
    const usuario = document.getElementById('usuario').value;
    localStorage.setItem('nombreUsuario', usuario);
    window.location.href = 'Menu_registrado.html';
}

/*Funcion para nombre registrado */

document.addEventListener('DOMContentLoaded', (event) => {
    const usuario_field = document.getElementById("usuario");
    if(usuario_field)
    {
        usuario_field.value = "";
    }
    
    const usuario = localStorage.getItem('nombreUsuario');
    if (usuario) {
        const mensajeSaludo = `Hola ${usuario}, ¿Quieres empezar?`;
        document.getElementById('mensajeSaludo').innerText = mensajeSaludo;
    } else {
        document.getElementById('mensajeSaludo').innerText = 'Hola, ¿cómo estás?';
    }
    document.getElementById('btnPuntaje').addEventListener('click', function() {
        window.location.href = 'Puntajes.html';
    });
});

/*Para menu de puntos*/

document.addEventListener('DOMContentLoaded', (event) => {
    //Almacenando puntajes en el local storage
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];

    //Ordenando los puntajes
    const listaPuntajes = document.getElementById('listaPuntajes');
    puntajes.forEach((puntaje, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${puntaje.nombre} - ${puntaje.puntos} puntos`;
        listaPuntajes.appendChild(listItem);
    });
});

/*Para el Simon Says*/ 
function agregarPuntaje(nombre, puntos) {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    puntajes.push({ nombre, puntos });
    localStorage.setItem('puntajes', JSON.stringify(puntajes));
}