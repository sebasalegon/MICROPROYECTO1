/**
 * Juego de Simon Dice
 */
let secuencia = [];
let secuenciaJugador = [];
let puntaje = 0;
let nombreUsuario = localStorage.getItem('nombreUsuario');
let jugando = false;
let ronda = 0;  // Añadimos una variable global para la ronda

/**
 * Función que se ejecuta al cargar la página
 */
function guardarNombre() {
    const usuario = document.getElementById('usuario').value;
    if(usuario.trim() === '') {
        alert('Por favor ingrese un nombre de usuario');
        return;
    }
    localStorage.setItem('nombreUsuario', usuario);
    reiniciarPuntajes();  // Reiniciamos los puntajes cuando se registra un nuevo usuario
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
    }

    mostrarPuntajes();
});

function iniciarJuego() {
    secuencia = [];
    secuenciaJugador = [];
    puntaje = 0;
    ronda = 0;  // Reiniciamos la ronda al iniciar el juego
    document.getElementById('puntaje').innerText = `Puntaje: ${puntaje}`;
    document.getElementById('ronda').innerText = `Ronda: ${ronda}`;
    document.getElementById('resultado').style.display = 'none';
    siguienteRonda();
}

function siguienteRonda() {
    secuenciaJugador = [];
    puntaje++;
    ronda++;
    document.getElementById('puntaje').innerText = `Puntaje: ${puntaje}`;
    document.getElementById('ronda').innerText = `Ronda: ${ronda}`;
    const nuevoColor = generarColorAleatorio();
    secuencia.push(nuevoColor);
    reproducirSecuencia();
}

function generarColorAleatorio() {
    const colores = ['rojo', 'verde', 'azul', 'amarillo'];
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
        agregarPuntaje(nombreUsuario, puntaje, ronda);
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

function agregarPuntaje(nombre, puntos, rondaActual) {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    const indiceExistente = puntajes.findIndex(p => p.nombre === nombre);
    if (indiceExistente !== -1) {
        puntajes[indiceExistente].puntos = puntos;
        puntajes[indiceExistente].ronda = rondaActual;
    } else {
        puntajes.push({ nombre, puntos, ronda: rondaActual });
    }
    localStorage.setItem('puntajes', JSON.stringify(puntajes));
    mostrarPuntajes();
}

function mostrarPuntajes() {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    const listaPuntajes = document.getElementById('listaPuntajes');
    if (listaPuntajes) {
        listaPuntajes.innerHTML = ''; // Limpiar lista existente
        puntajes.forEach((puntaje, index) => {
            const li = document.createElement('li');
            li.innerText = `${index + 1}. ${puntaje.nombre} - ${puntaje.puntos} puntos - Ronda ${puntaje.ronda}`;
            listaPuntajes.appendChild(li);
        });
    }
}

// Nueva función para reiniciar puntajes
function reiniciarPuntajes() {
    localStorage.removeItem('puntajes');
}

document.addEventListener('DOMContentLoaded', (event) => {
    mostrarPuntajes();
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        agregarPuntaje(nombreUsuario, puntaje, ronda);  // Aseguramos pasar la ronda correcta
    }
});
