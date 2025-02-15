let secuencia = [];
let secuenciaJugador = [];
let puntaje = 0;
let nombreUsuario = localStorage.getItem('nombreUsuario');
let jugando = false; 

function guardarNombre() {
    const usuario = document.getElementById('usuario').value;
    localStorage.setItem('nombreUsuario', usuario);
    window.location.href = 'Menu_registrado.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    const usuario_field = document.getElementById("usuario");
    if (usuario_field) {
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

document.addEventListener('DOMContentLoaded', (event) => {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    const listaPuntajes = document.getElementById('listaPuntajes');
    puntajes.forEach((puntaje, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${puntaje.nombre} - ${puntaje.puntos} puntos`;
        listaPuntajes.appendChild(li);
    });
});

function iniciarJuego() {
    secuencia = [];
    secuenciaJugador = [];
    puntaje = 0;
    document.getElementById('puntaje').innerText = `Puntaje: ${puntaje}`;
    document.getElementById('resultado').style.display = 'none'; 
    siguienteRonda();
}

function siguienteRonda() {
    secuenciaJugador = [];
    puntaje++;
    document.getElementById('puntaje').innerText = `Puntaje: ${puntaje}`;
    const nuevoColor = generarColorAleatorio();
    secuencia.push(nuevoColor);
    reproducirSecuencia();
}

function generarColorAleatorio() {
    const colores= ['rojo', 'verde', 'azul', 'amarillo'];
    return colores[Math.floor(Math.random() * colores.length)];
}

function reproducirSecuencia() {
    jugando = true; // Inicia el juego
    let i = 0;
    const intervalo = setInterval(() => {
        if (i >= secuencia.length) {
            clearInterval(intervalo);
            jugando = false; // Termina el juego
            return;
        }
        iluminarBoton(secuencia[i]);
        i++;
    }, 1000);
}

function iluminarBoton(color) {
    const boton = document.getElementById(color);
    boton.classList.add('iluminar');
    setTimeout(() => {
        boton.classList.remove('iluminar');
    }, 500);
}

function jugadorSelecciona(color) {
    if (jugando) return; 
    secuenciaJugador.push(color);
    iluminarBoton(color);
    verificarSecuencia();
}

function verificarSecuencia() {
    const longitudSecuencia = secuencia.length;
    const longitudJugador = secuenciaJugador.length;

    if (secuenciaJugador[longitudJugador - 1] !== secuencia[longitudJugador - 1]) {
        mostrarResultado(false);
        agregarPuntaje(nombreUsuario, puntaje);
        jugando = false; 
    } else if (longitudJugador === longitudSecuencia) {
        setTimeout(siguienteRonda, 1000);
    }
}

function mostrarResultado(gano) {
    const resultadoDiv = document.getElementById('resultado');
    const mensaje = document.getElementById('mensajeResultado');
    if (gano) {
        mensaje.innerText = "¡Ganaste!";
    } else {
        mensaje.innerText = "¡Perdiste!";
    }
    resultadoDiv.style.display = 'block';
}

function reiniciarJuego() {
    iniciarJuego();
}

function agregarPuntaje(nombre, puntos) {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    puntajes.push({ nombre, puntos });
    localStorage.setItem('puntajes', JSON.stringify(puntajes));
}