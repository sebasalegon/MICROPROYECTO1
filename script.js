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
 * Guarda el nombre del usuario y reinicia los puntajes
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
});

/**
 * Inicia el juego y establece las variables iniciales
 */
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

/**
 * Avanza a la siguiente ronda, genera un nuevo color y reproduce la secuencia
 */
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

/**
 * Genera un color aleatorio entre rojo, verde, azul y amarillo
 */
function generarColorAleatorio() {
    const colores = ['rojo', 'verde', 'azul', 'amarillo'];
    return colores[Math.floor(Math.random() * colores.length)];
}

/**
 * Reproduce la secuencia de colores almacenada en la variable 'secuencia'
 */
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

/**
 * Ilumina el botón del color correspondiente y reproduce el sonido asociado
 */
function iluminarBoton(color) {
    const boton = document.getElementById(color);
    boton.classList.add('iluminar');
    setTimeout(() => {
        boton.classList.remove('iluminar');
    }, 500);
    sonidos[color].currentTime = 0;
    sonidos[color].play();
}

/**
 * Maneja la selección del color por parte del jugador y verifica la secuencia
 */
function jugadorSelecciona(color) {
    if (jugando) return;
    secuenciaJugador.push(color);
    iluminarBoton(color);
    verificarSecuencia();
    sonidos[color].currentTime = 0;
    sonidos[color].play();
}

/**
 * Verifica si la secuencia ingresada por el jugador es correcta
 */
function verificarSecuencia() {
    const longitudSecuencia = secuencia.length;
    const longitudJugador = secuenciaJugador.length;

    if (secuenciaJugador[longitudJugador - 1] !== secuencia[longitudJugador - 1]) {
        agregarPuntaje(nombreUsuario, puntaje, ronda);
        mostrarResultado(false);
        jugando = false;
    } else if (longitudJugador === longitudSecuencia) {
        setTimeout(siguienteRonda, 1000);
    }
}

/**
 * Muestra el resultado del juego (ganaste o perdiste)
 */
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

/**
 * Reinicia el juego
 */
function reiniciarJuego() {
    iniciarJuego();
}

/**
 * Agrega el puntaje del jugador al localStorage
 */
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
}

/**
 * Muestra los puntajes almacenados en la lista de puntajes
 */
function mostrarPuntajes() {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    console.log(puntajes);
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

/**
 * Reinicia los puntajes almacenados en el localStorage
 */
function reiniciarPuntajes() {
    localStorage.removeItem('puntajes');
}

document.addEventListener('DOMContentLoaded', (event) => {
    mostrarPuntajes();
});

document.addEventListener('visibilitychange', function() {
    if(window.href.pathname == "/Juego.html") {
        if (document.visibilityState === 'hidden' || document.visibilityState === 'unloaded') {
            agregarPuntaje(nombreUsuario, puntaje, ronda);  // Aseguramos pasar la ronda correcta
        }
    }
});

const sonidos = {
    rojo: new Audio('rojo.mp3'),
    verde: new Audio('verde.mp3'),
    azul: new Audio('azul.mp3'),
    amarillo: new Audio('amarillo.mp3')
};

