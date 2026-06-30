const loader = document.getElementById("loader");
const spinner = document.getElementById("spinner");

const handContainer = document.getElementById("handContainer");

const panel = document.getElementById("panel");

const enterBtn = document.getElementById("enterBtn");

const input = document.getElementById("codeInput");

const error = document.getElementById("error");

const hand = document.getElementById("hand");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});


// ===========================
// LOADER
// ===========================

setTimeout(() => {

    spinner.classList.add("detenido");
    spinner.classList.add("rojo");

    setTimeout(() => {

        loader.classList.add("hidden");

        handContainer.classList.remove("hidden");

        panel.classList.remove("hidden");

    },1000);

},3000);


// ===========================
// VALIDAR
// ===========================

enterBtn.onclick = validar;

input.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        validar();

    }

});


function validar(){

    error.innerHTML="";

    if(input.value==="0103"){

        acceso();

    }else{

        error.innerHTML="Código incorrecto";

        input.value="";

        input.focus();

        panel.animate([

            {transform:"translateX(-8px)"},
            {transform:"translateX(8px)"},
            {transform:"translateX(-8px)"},
            {transform:"translateX(0px)"}

        ],{

            duration:350

        });

    }

}


// ===========================
// ACCESO
// ===========================

function acceso(){

    panel.style.pointerEvents="none";

    hand.classList.add("manoBlanca");

    error.style.color="white";
    error.innerHTML="Acceso concedido";

    enterBtn.disabled=true;

    input.disabled=true;

    setTimeout(()=>{

        comenzarParticulas();

    },1800);

}
