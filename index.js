let ronda=0;
let secuencia=[];
let secuenciaUsuario=[];
const $botonInicio = document.getElementById('botonInicio').onclick = comenzarAJugar;
actualizarAlerta('Tocá "Empezar" para jugar!');
bloquearAccionUsuario();

function comenzarAJugar(){
    reiniciarTodo();
    comenzar();
}


function comenzar() {
    actualizarNroRonda(ronda);
    bloquearAccionUsuario();
    actualizarAlerta('Mi turno...preste atención!');
    
    const $nuevoCuadrado = obtenerCuadradoAleatorio();
    secuencia.push($nuevoCuadrado);
    const RETRASO_TURNO_JUGADOR = (secuencia.length + 1) * 1000;
    
    secuencia.forEach(function($cuadrado, i){
        const RETRASO = (i+1) * 1000;
        setTimeout(function() {
            iluminar($cuadrado);
        }, RETRASO);
    })
    
    setTimeout(function(){
        actualizarAlerta('Su turno');
        desbloquearAccionUsuario();
    },RETRASO_TURNO_JUGADOR);
    
    secuenciaUsuario=[];
    ronda++;
    actualizarNroRonda(ronda);
}

function manejarSecuenciaUsuario(e) {
    const $cuadrado = e.target;
    iluminar($cuadrado);
    secuenciaUsuario.push($cuadrado);
    
    const $cuadradoMaquina = secuencia[secuenciaUsuario.length - 1];
    
    if($cuadrado.id !== $cuadradoMaquina.id){
        fallaste();
        return;
    }
    
    if(secuencia.length === secuenciaUsuario.length){
        bloquearAccionUsuario();
        setTimeout(comenzar, 1000);
    }
}

function actualizarAlerta(estado, error = false){
    const $alerta = document.getElementById('alerta');
    $alerta.textContent = estado;
    if (error) {
        $alerta.classList.remove('alert-success');
        $alerta.classList.add('alert-danger');
    } else {
        $alerta.classList.remove('alert-danger');
        $alerta.classList.add('alert-success');
    }
}

function actualizarNroRonda(nro){
    const $nroRonda = document.getElementById('nroRonda')
    $nroRonda.textContent = nro;
}

function bloquearAccionUsuario(){
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado) {
        $cuadrado.onclick=''
    });
}

function desbloquearAccionUsuario(){
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado) {
        $cuadrado.onclick= manejarSecuenciaUsuario;
    });
}

function iluminar($cuadrado){
    $cuadrado.style.opacity = 1;
    setTimeout(function() {
        $cuadrado.style.opacity = 0.5;
    }, 500);
}

function obtenerCuadradoAleatorio() {
    const $cuadrados =  document.querySelectorAll('.cuadrado');
    const indice = Math.floor(Math.random() * $cuadrados.length);
    return $cuadrados[indice];
}

function fallaste(){
    bloquearAccionUsuario();
    actualizarAlerta('Perdiste! Tocá "Empezar" para jugar nuevamente.', true);
    reiniciarTodo();
}

function reiniciarTodo(){
    ronda=0;
    secuencia=[];
    secuenciaUsuario=[];
}