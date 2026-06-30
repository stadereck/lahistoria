const loader = document.getElementById("loader");
const spinner = document.getElementById("spinner");

const handContainer = document.getElementById("handContainer");
const hand = document.getElementById("hand");

const panel = document.getElementById("panel");
const input = document.getElementById("codeInput");
const btn = document.getElementById("enterBtn");
const error = document.getElementById("error");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let animationActive = false;

// canvas auxiliar (para leer imagen)
const imgCanvas = document.createElement("canvas");
const imgCtx = imgCanvas.getContext("2d");

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

// =========================
// LOADER
// =========================
setTimeout(() => {

    spinner.classList.add("detenido");
    spinner.classList.add("rojo");

    setTimeout(() => {

        loader.style.display = "none";
        handContainer.classList.remove("hidden");
        panel.classList.remove("hidden");

    }, 900);

}, 2800);

// =========================
// VALIDAR
// =========================
btn.onclick = check;

input.addEventListener("keydown", e => {
    if (e.key === "Enter") check();
});

function check() {

    error.innerText = "";

    if (input.value === "0103") {

        success();

    } else {

        error.innerText = "Código incorrecto";

        panel.animate([
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(0px)" }
        ], { duration: 300 });

        input.value = "";
    }
}

// =========================
// SUCCESS
// =========================
function success() {

    input.disabled = true;
    btn.disabled = true;

    error.style.color = "white";
    error.innerText = "Acceso concedido";

    hand.classList.add("manoBlanca");

    setTimeout(() => {
        explodeHand();
    }, 1200);
}

// =========================
// EXPLOSIÓN MANO
// =========================
function explodeHand() {

    const rect = hand.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    handContainer.style.opacity = 0;
    panel.style.opacity = 0;

    particles = [];

    for (let i = 0; i < 200; i++) {

        particles.push({
            x: cx,
            y: cy,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            size: Math.random() * 3 + 1,
            alpha: 1
        });

    }

    animationActive = true;
    animate();

    setTimeout(() => {
        buildLogoFromImage();
    }, 1800);
}

// =========================
// LOOP EXPLOSIÓN
// =========================
function animate() {

    if (!animationActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;

        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

    });

    particles = particles.filter(p => p.alpha > 0);

    requestAnimationFrame(animate);
}

// =========================
// 🔥 LOGO DESDE IMAGEN (PRO)
// =========================
function buildLogoFromImage() {

    animationActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();

    // ⚠️ TU IMAGEN
    img.src = "/mnt/data/Disen\u0303o sin título.png";

    img.onload = () => {

        const scale = 0.5;

        imgCanvas.width = img.width * scale;
        imgCanvas.height = img.height * scale;

        imgCtx.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);

        const data = imgCtx.getImageData(
            0, 0,
            imgCanvas.width,
            imgCanvas.height
        ).data;

        particles = [];

        const offsetX = (canvas.width - imgCanvas.width) / 2;
        const offsetY = (canvas.height - imgCanvas.height) / 2;

        // sampling de píxeles
        for (let y = 0; y < imgCanvas.height; y += 3) {
            for (let x = 0; x < imgCanvas.width; x += 3) {

                const i = (y * imgCanvas.width + x) * 4;

                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                // detecta pixel visible (logo)
                if (a > 50 && (r + g + b) < 700) {

                    particles.push({

                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,

                        tx: x + offsetX,
                        ty: y + offsetY,

                        size: 2,
                        alpha: 1

                    });

                }
            }
        }

        requestAnimationFrame(formLogoAnim);

        setTimeout(() => {

            document.body.classList.add("fadeOut");

            setTimeout(() => {

                window.location.href =
                "https://lahistoria-ten.vercel.app/Juego/";

            }, 1200);

        }, 3500);
    };
}

// =========================
// ANIMACIÓN LOGO
// =========================
function formLogoAnim() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let done = true;

    particles.forEach(p => {

        p.x += (p.tx - p.x) * 0.08;
        p.y += (p.ty - p.y) * 0.08;

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (Math.abs(p.x - p.tx) > 1 || Math.abs(p.y - p.ty) > 1) {
            done = false;
        }

    });

    if (!done) {
        requestAnimationFrame(formLogoAnim);
    }
}
