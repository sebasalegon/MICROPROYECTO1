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
});