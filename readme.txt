https://www.figma.com/design/4I6dlSCN6tx1BAvZ76SyXd/Metaverso?node-id=252-2&p=f&t=T6KSXkhtqqTFbXTt-0 ///Figma metaverso

https://www.bing.com/images/create/crear-ilustraciones-de-mc3a1quinas-de-construccic3b3n-en/1-66d35f4943474bfa954056344239a8ed?FORM=GENCRE  ////IA de ilustraciónes.
https://www.imagine.art/dashboard/tool/ideate?projectId=146271 ////IA entrenada para hacer más sprintsheet
https://drive.google.com/drive/folders/1oeNEJ1psxWIXsM-ns1N5-s3y_MICd9kk?usp=sharing   ////Pagina de carga
https://www.figma.com/design/4I6dlSCN6tx1BAvZ76SyXd/Metaverso?node-id=0-1&t=PjwPDRpSZY2whhEt-1 //// mapa actualizado

//efectos css:
juegos artificiales: https://codepen.io/matt-cannon/pen/YPKGBGm
Crecimiento de un bebe: https://codepen.io/leimapapa/pen/YzoEaEd
abla periodica: https://codepen.io/stoumann/pen/gONqOXZ
https://codepen.io/venky2842/details/rNxjoxr Rompecabeza
https://codepen.io/GeorgePark/pen/MqVoYP paper mario
https://codepen.io/Julia-Farcash/pen/oNRBwEN  //juego enycosmic


/*Definición de mapas y perspectivas de mapas*/
- perspectiva cenital inclinada (top-down) ligeramente inclinada
- Estilo Pixel Art Arcade

ejemplo: mapa de planetario virtual perspectiva cenital inclinada (top-down) ligeramente inclinada Estilo Pixel Art Arcade con telescopios, hologramas de planetas y naves espaciales, computadoras y tecnologia para usar en juego de arcade 2d mapa cuadrado sin recortes, vista isométrica 180 grados vista elevada



//-----------------------------------------------------------
//vERSIÓN ESTABLE COMPLETAMENTE CUADRADO ESTILO RETRO (INICIO)
//-----------------------------------------------------------

let checkingStep = "gender"; // "gender" | "avatar" | "profession"
let selectedGender = null;   // "male" | "female"
let selectedAvatar = null;   // objeto del array characters
let hoveredAvatarIndex = 0;  // para preview

let hoveredProfessionIndex = 0;      // para moverse con flechas
let selectedProfession = null;       // objeto del array professions

let professionIndex = 0;      // reemplaza hoveredProfessionIndex
let professionScroll = 0;     // scroll vertical dentro del cuadro

let gameMode = "checking"; // checking | error | playing -- Evalua si existe nombre de usuario, avatar y profesión.

/*Función de validación cheking (Inicio) */

  let username   = "jaisaac";
  let avatar     = localStorage.getItem("avatar");
  let profession = localStorage.getItem("profession");

function checkUserProfile() {

  // 🔴 1. No tiene nombre de usuario
  if (!username) {
    gameMode = "error";
    return;
  }

  // 🟡 2. No tiene avatar ni profesión
  if (!avatar || !profession) {
    console.log("Seleccionar avatar");
    gameMode = "checking"; // aún no juega
    return;
  }

  // 🟢 3. Tiene todo correcto
  console.log("Que comience el juego.");
  gameMode = "playing";
}
/*Función de validación cheking (fin) */

/*Anular clic sostenido en dispositivos moviles (inicio)*/

/*Arreglo de avatares (Inicio) */
const characters = [

  // ===== 👨 HOMBRES =====
  {
    id: "m1",
    profile: "Alex",
    gender: "male",
    avatar: "./assets/avatares/men/hombre1.png",
    sprites: "./assets/avatares/hombre1.png"
  },
  {
    id: "m2",
    profile: "Dario",
    gender: "male",
    avatar: "./assets/avatares/men/hombre2.png",
    sprites: "./assets/avatares/hombre2.png"
  },
  {
    id: "m3",
    profile: "Kenzo",
    gender: "male",
    avatar: "./assets/avatares/men/hombre3.png",
    sprites: "./assets/avatares/hombre3.png"
  },
  {
    id: "m4",
    profile: "Luca",
    gender: "male",
    avatar: "./assets/avatares/men/hombre4.png",
    sprites: "./assets/avatares/hombre4.png"
  },
  {
    id: "m5",
    profile: "Noah",
    gender: "male",
    avatar: "./assets/avatares/men/hombre5.png",
    sprites: "./assets/avatares/hombre5.png"
  },
  {
    id: "m6",
    profile: "Ryu",
    gender: "male",
    avatar: "./assets/avatares/men/hombre6.png",
    sprites: "./assets/avatares/hombre6.png"
  },
  {
    id: "m7",
    profile: "Tomas",
    gender: "male",
    avatar: "./assets/avatares/men/hombre7.png",
    sprites: "./assets/avatares/hombre7.png"
  },
  {
    id: "m8",
    profile: "Victor",
    gender: "male",
    avatar: "./assets/avatares/men/hombre8.png",
    sprites: "./assets/avatares/hombre8.png"
  },
  {
    id: "m9",
    profile: "Zane",
    gender: "male",
    avatar: "./assets/avatares/men/hombre9.png",
    sprites: "./assets/avatares/hombre9.png"
  },


  // ===== 👩 MUJERES =====
  {
    id: "f1",
    profile: "Aria",
    gender: "female",
    avatar: "./assets/avatares/women/mujer1.png",
    sprites: "./assets/avatares/mujer1.png"
  },
  {
    id: "f2",
    profile: "Bella",
    gender: "female",
    avatar: "./assets/avatares/women/mujer2.png",
    sprites: "./assets/avatares/mujer2.png"
  },
  {
    id: "f3",
    profile: "Cleo",
    gender: "female",
    avatar: "./assets/avatares/women/mujer3.png",
    sprites: "./assets/avatares/mujer3.png"
  },
  {
    id: "f4",
    profile: "Diana",
    gender: "female",
    avatar: "./assets/avatares/women/mujer4.png",
    sprites: "./assets/avatares/mujer4.png"
  },
  {
    id: "f5",
    profile: "Elena",
    gender: "female",
    avatar: "./assets/avatares/women/mujer5.png",
    sprites: "./assets/avatares/mujer5.png"
  },
  {
    id: "f6",
    profile: "Freya",
    gender: "female",
    avatar: "./assets/avatares/women/mujer6.png",
    sprites: "./assets/avatares/mujer6.png"
  },
  {
    id: "f7",
    profile: "Iris",
    gender: "female",
    avatar: "./assets/avatares/women/mujer7.png",
    sprites: "./assets/avatares/mujer7.png"
  },
  {
    id: "f8",
    profile: "Mika",
    gender: "female",
    avatar: "./assets/avatares/women/mujer8.png",
    sprites: "./assets/avatares/mujer8.png"
  },
  {
    id: "f9",
    profile: "Nova",
    gender: "female",
    avatar: "./assets/avatares/women/mujer9.png",
    sprites: "./assets/avatares/mujer9.png"
  }
];
/*Arreglo de avatares (Fin) */

//función para precargar imágenes de avatares
function preloadAvatars(characters) {
  return Promise.all(
    characters.map(ch => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { ch.img = img; resolve(); };
      img.onerror = () => { 
        console.warn("No cargó avatar:", ch.avatar);
        ch.img = null; 
        resolve(); 
      };
      img.src = ch.avatar;
    }))
  );
}

/*Profesiones (Inicio) */
const professions = [
  {
    id: "warrior",
    name: "Guerrero",
    description: "Especialista en combate cuerpo a cuerpo. Alta resistencia y fuerza física."
  },
  {
    id: "engineer",
    name: "Ingeniero",
    description: "Experto en tecnología y mecanismos. Puede reparar y mejorar dispositivos."
  },
  {
    id: "scientist",
    name: "Científico",
    description: "Analiza el entorno y descubre secretos ocultos. Alta inteligencia."
  },
  {
    id: "medic",
    name: "Médico",
    description: "Capaz de curar y asistir a otros. Fundamental para la supervivencia."
  },
  {
    id: "explorer",
    name: "Explorador",
    description: "Ágil y observador. Se mueve rápido y detecta rutas ocultas."
  }
];
/*Profesiones (fin) */

/*Función para que el texto no salga del cuadro en la selección de profesiones (inicio) */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}
/*Función para que el texto no salga del cuadro en la selección de profesiones (fin) */



(() => {
  // 1) Evita menú contextual (long-press) en móviles
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }, { passive: false });

  // 2) Evita selección/arrastre típico por long-press (imágenes/texto)
  ["selectstart", "dragstart"].forEach(evt => {
    document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
  });

  // 3) Evita gestos del navegador (scroll/zoom/hold) SOLO dentro de un contenedor (recomendado)
  // Cambia "#wrap" por el id/clase de tu juego si quieres.
  const blockZone = document.querySelector("#wrap") || document.body;

  blockZone.addEventListener("touchstart", (e) => {
    // si quieres permitir scroll fuera del juego, mantén esto limitado al contenedor del juego
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchmove", (e) => {
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchend", (e) => {
    e.preventDefault();
  }, { passive: false });

  // 4) iOS Safari: previene "double tap to zoom" y algunos long-press raros con pointer
  blockZone.style.webkitTouchCallout = "none"; // iOS callout
  blockZone.style.webkitUserSelect = "none";
})();


const LOGO_SRC = "./assets/src/logo.png";
let logoImg = null;

(() => {
  
  const ASSETS = {
    map: "./assets/mapas/mapa5000x5000.png", //mapa
    hero: null, //Personaje
    shadow: "https://assets.codepen.io/21542/DemoRpgCharacterShadow.png", //Sombra del personaje (para dar sensación de profundidad)
  };

  // Contenedor único y estable (NO se recrea)
const images = {
  map: null,
  hero: null,
  shadow: null,
};

// Para evitar cargar 2 veces
let gameAssetsLoaded = false;
let gameAssetsLoading = false;

// Devuelve la ruta del héroe final (localStorage o default)
function getHeroSrc() {
  const ls = localStorage.getItem("avatar");
  return (ls && ls !== "null" && ls !== "undefined" && ls.trim() !== "")
    ? ls
    : "./assets/avatares/default.png";
}

// Carga real del juego (solo cuando toca)
async function loadGameAssets() {
  if (gameAssetsLoaded || gameAssetsLoading) return;

  gameAssetsLoading = true;

  try {
    const heroSrc = getHeroSrc();

    const [mapImg, heroImg, shadowImg, loadedLogo] = await Promise.all([
      loadImage(ASSETS.map),
      loadImage(heroSrc),
      loadImage(ASSETS.shadow),
      loadImage(LOGO_SRC),
    ]);

    images.map = mapImg;
    images.hero = heroImg;
    images.shadow = shadowImg;
    logoImg = loadedLogo;

    gameAssetsLoaded = true;

  } catch (err) {
    console.error("Error cargando assets del juego:", err);
    gameMode = "error";
  } finally {
    gameAssetsLoading = false;
  }
}

  // Resolución lógica (SIEMPRE igual) camara
  const CAMERA_ZOOM = 0.4; // 1 = normal, 0.5 = más lejos, 0.25 = mucho más lejos
  const LOGICAL_W = 160;
  const LOGICAL_H = 144;
/* resolución perfecta para celulares menores de 400px de resolución
    const LOGICAL_W = 160;
    const LOGICAL_H = 300;*/
/* Resolución perfecto para tablets PC y laptos
  const LOGICAL_W = 160;
  const LOGICAL_H = 144;
*/

  //dimenciones del mapa
const WORLD_W = 5000;
const WORLD_H = 5000;

  // Personaje (2x2 tiles => 32x32)
  const HERO_W = 64;
  const HERO_H = 64;

  //tamaño visual dentro del canvas
  const HERO_DRAW_W = 64;  // tamaño visual del avatar en canva
  const HERO_DRAW_H = 64;

  const canvas = document.getElementById("game");
  const wrap = document.getElementById("wrap");
  const ctx = canvas.getContext("2d");
  

  // Scroll con rueda (desktop)
canvas.addEventListener("wheel", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;

  e.preventDefault();
  professionScroll += (e.deltaY > 0 ? 8 : -8);
}, { passive: false });

// Scroll con touch (móvil)
let touchStartY = null;
canvas.addEventListener("pointerdown", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;
  touchStartY = e.clientY;
});

canvas.addEventListener("pointermove", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;
  if (touchStartY === null) return;

  const dy = e.clientY - touchStartY;
  touchStartY = e.clientY;
  professionScroll -= dy / scale; // se siente natural
});

canvas.addEventListener("pointerup", () => { touchStartY = null; });
canvas.addEventListener("pointercancel", () => { touchStartY = null; });

  // IMPORTANTE: sin suavizado
  ctx.imageSmoothingEnabled = false;

  let scale = 1;

  /*Función para formato cuadrado estilo retro*/
  function resizePixelPerfect() {
    const rect = wrap.getBoundingClientRect();

    // Escala entera para mantener proporciones y pixel-art
    const sx = Math.floor(rect.width / LOGICAL_W);
    const sy = Math.floor(rect.height / LOGICAL_H);
    scale = Math.max(1, Math.min(sx, sy));

    // Tamaño REAL en pixeles
    canvas.width  = LOGICAL_W * scale;
    canvas.height = LOGICAL_H * scale;

    // Tamaño CSS = EXACTAMENTE el mismo (para que NO se estire)
    canvas.style.width  = (LOGICAL_W * scale) + "px";
    canvas.style.height = (LOGICAL_H * scale) + "px";

    ctx.imageSmoothingEnabled = false;
  }

  window.addEventListener("resize", resizePixelPerfect);
  resizePixelPerfect();

  const loadImage = (src) => new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

  // Input
  const held = [];
  const dirs = {
    up:    {x: 0, y:-1},
    down:  {x: 0, y: 1},
    left:  {x:-1, y: 0},
    right: {x: 1, y: 0},
  };

  const keyToDir = {
    ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right",
    w:"up", s:"down", a:"left", d:"right",
    W:"up", S:"down", A:"left", D:"right",
  };

  window.addEventListener("keydown", (e) => {
    const dir = keyToDir[e.key];
    if (!dir) return;
    if (!held.includes(dir)) held.unshift(dir);
    e.preventDefault();
  });

  window.addEventListener("keyup", (e) => {
    const dir = keyToDir[e.key];
    if (!dir) return;
    const i = held.indexOf(dir);
    if (i !== -1) held.splice(i, 1);
    e.preventDefault();
  });

  // Dpad
  let pressed = false;
  const setHeld = (dir) => { if (pressed) { held.length = 0; held.push(dir); } };
  const clearHeld = () => { held.length = 0; };

  document.querySelectorAll(".btn").forEach(btn => {
    const dir = btn.dataset.dir;
    btn.addEventListener("pointerdown", (e) => { pressed = true; setHeld(dir); e.preventDefault(); });
    btn.addEventListener("pointerup", (e) => { pressed = false; clearHeld(); e.preventDefault(); });
    btn.addEventListener("pointercancel", (e) => { pressed = false; clearHeld(); e.preventDefault(); });
    btn.addEventListener("pointerenter", (e) => { if (pressed) setHeld(dir); e.preventDefault(); });
  });
  window.addEventListener("pointerup", () => { pressed = false; clearHeld(); });

  // Estado
  const player = {
    x: 3200, y: 1024, speed: 1.5, //datos Avatar: Coordenadas - Velocidad
    facing: "down", walking: false,
    frame: 0, frameTimer: 0, frameDurationMs: 150,
  };

  const camera = { x: 0, y: 0, w: LOGICAL_W, h: LOGICAL_H };
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const rowForFacing = (facing) => {
  const ROW = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };
  return ROW[facing] ?? 0;
};

  function update(dtMs) {
    
    const dir = held[0];
    player.walking = !!dir;

    if (dir) {
      player.facing = dir;
      const d = dirs[dir];
      const delta = dtMs / 8; // velicidad del avatar. entre menor sea el numero, más rapido camina
      player.x += d.x * player.speed * delta;
      player.y += d.y * player.speed * delta;
    }

    // límites del mundo completo (5000x5000)
    const leftLimit = 0;
    const topLimit = 0;
    const rightLimit = WORLD_W - HERO_W;   // o HERO_DRAW_W si ese es el tamaño real que ocupa
    const bottomLimit = WORLD_H - HERO_H;

    player.x = clamp(player.x, leftLimit, rightLimit);
    player.y = clamp(player.y, topLimit, bottomLimit);

    camera.x = player.x + HERO_W/2 - camera.w/2;
    camera.y = player.y + HERO_H/2 - camera.h/2;

    camera.x = clamp(camera.x, 0, WORLD_W - camera.w);
    camera.y = clamp(camera.y, 0, WORLD_H - camera.h);

    if (player.walking) {
      player.frameTimer += dtMs;
      while (player.frameTimer >= player.frameDurationMs) {
        player.frameTimer -= player.frameDurationMs;
        player.frame = (player.frame + 1) % 4;
      }
    } else {
      player.frame = 0;
      player.frameTimer = 0;
    }
  }

canvas.addEventListener("pointerdown", handleCanvasClick);

async function handleCanvasClick(e) {

  if (gameMode !== "checking") return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = (e.clientX - rect.left) / scale;
  const mouseY = (e.clientY - rect.top) / scale;

  if (checkingStep === "gender") {

    if (mouseX >= 40 && mouseX <= 120 &&
        mouseY >= 52 && mouseY <= 65) {

      selectedGender = "male";
      checkingStep = "avatar";
      return;
    }

    if (mouseX >= 40 && mouseX <= 120 &&
        mouseY >= 72 && mouseY <= 85) {

      selectedGender = "female";
      checkingStep = "avatar";
      return;
    }
  }

if (checkingStep === "avatar" && selectedGender) {
  const filtered = characters.filter(c => c.gender === selectedGender);

  const startX = 10, startY = 25, size = 24, gap = 4;

  // 1) Selección de miniaturas
  for (let i = 0; i < filtered.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);

    const x = startX + col * (size + gap);
    const y = startY + row * (size + gap);

    if (mouseX >= x && mouseX <= x + size &&
        mouseY >= y && mouseY <= y + size) {

      hoveredAvatarIndex = i;
      selectedAvatar = filtered[i]; // ✅ aquí queda el avatar seleccionado
      return;
    }
  }

  // 2) Botón volver
  if (mouseX >= 10 && mouseX <= 80 &&
      mouseY >= LOGICAL_H - 20 && mouseY <= LOGICAL_H) {
    checkingStep = "gender";
    selectedGender = null;
    selectedAvatar = null;
    hoveredAvatarIndex = 0;
    return;
  }

  // 3) ✅ Botón CONTINUAR: guarda sprites en localStorage "avatar"
  // (mismas coordenadas que en draw())
  if (selectedAvatar) {
    const btnW = 70;
    const btnH = 14;
    const btnX = LOGICAL_W - btnW - 10;
    const btnY = LOGICAL_H - btnH - 6;

    const clickedContinue =
      mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH;

    if (clickedContinue) {
      // Guarda el spritesheet (URL) en "avatar"
      localStorage.setItem("avatar", selectedAvatar.sprites);

      // (opcional pero recomendado) guarda también id y género
      localStorage.setItem("avatarId", selectedAvatar.id);
      localStorage.setItem("gender", selectedAvatar.gender);

      // Recarga variables si las usas fuera (o llama tu checker)
      avatar = localStorage.getItem("avatar");

      // Avanza al siguiente paso (profesión) o entra al juego
      // checkingStep = "profession";
      // o si ya tienes profesión guardada:
      // checkUserProfile();

      checkingStep = "profession"; // ✅ siguiente paso natural
      return;
    }
  }
}

// ===== CLICK en vista PROFESION =====
if (checkingStep === "profession") {
  // Caja
  const boxX = 12;
  const boxY = 28;
  const boxW = LOGICAL_W - 24;
  const boxH = 78;

  // Flechas
  const btnSize = 16;
  const leftX = boxX + 6;
  const leftY = boxY + boxH + 6;
  const rightX = boxX + boxW - btnSize - 6;
  const rightY = leftY;

  // Continuar centrado
  const continueW = 80;
  const continueH = 16;
  const continueX = Math.floor((LOGICAL_W - continueW) / 2);
  const continueY = LOGICAL_H - continueH - 6;

  const clickedLeft =
    mouseX >= leftX && mouseX <= leftX + btnSize &&
    mouseY >= leftY && mouseY <= leftY + btnSize;

  const clickedRight =
    mouseX >= rightX && mouseX <= rightX + btnSize &&
    mouseY >= rightY && mouseY <= rightY + btnSize;

  if (clickedLeft) {
    professionIndex = (professionIndex - 1 + professions.length) % professions.length;
    professionScroll = 0; // reset scroll al cambiar
    return;
  }

  if (clickedRight) {
    professionIndex = (professionIndex + 1) % professions.length;
    professionScroll = 0; // reset scroll al cambiar
    return;
  }

  // Volver
  if (mouseX >= 10 && mouseX <= 80 &&
      mouseY >= LOGICAL_H - 20 && mouseY <= LOGICAL_H) {
    checkingStep = "avatar";
    professionScroll = 0;
    return;
  }

  // Continuar: guarda la profesión actual del slider
  const clickedContinue =
    mouseX >= continueX && mouseX <= continueX + continueW &&
    mouseY >= continueY && mouseY <= continueY + continueH;

if (clickedContinue) {
  const current = professions[professionIndex];
  localStorage.setItem("profession", current.id);

  // refresca variables si las usas
  profession = localStorage.getItem("profession");
  avatar = localStorage.getItem("avatar");

  // carga real del juego (map/hero/shadow)
  await loadGameAssets();

  // solo entra a jugar si ya están listos
  if (images.map && images.hero && images.shadow) {
    gameMode = "playing";
  }

  return;
}

  // (opcional) click dentro del cuadro: no hace nada, pero podrías usarlo
  return;
}

}

function draw(images) {
  // Dibujar en coordenadas lógicas: escalamos el contexto
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

  // 🔴 MODO ERROR
  if (gameMode === "error") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    ctx.fillStyle = "red";
    ctx.font = "8px monospace";
    ctx.fillText("!Error de protocolo 1004", 10, 60);
    ctx.fillText("No se encuentra nombre de usuario", 10, 75);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  // 🟡 MODO CHECKING (selección)
  if (gameMode === "checking") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    ctx.fillStyle = "white";
    ctx.font = "8px monospace";

    // ===== 1️⃣ Selección de género =====
    if (checkingStep === "gender") {
      ctx.fillText("Seleccionar avatar", 40, 20);
      ctx.fillText("♂ Hombre", 40, 60);
      ctx.fillText("♀ Mujer", 40, 80);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    // ===== 2️⃣ Selección de avatar =====
    if (checkingStep === "avatar" && selectedGender) {
      const filtered = characters.filter(c => c.gender === selectedGender);

      ctx.fillText("Elige tu personaje", 10, 10);

      const startX = 10;
      const startY = 25;
      const size = 24;
      const gap = 4;

      for (let i = 0; i < filtered.length; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);

        const x = startX + col * (size + gap);
        const y = startY + row * (size + gap);

        // borde hover/selección
        ctx.strokeStyle = (i === hoveredAvatarIndex) ? "yellow" : "white";
        ctx.strokeRect(x, y, size, size);

        // ✅ DIBUJAR AVATAR (miniatura)
        const avatarImg = filtered[i].img;
        if (avatarImg) {
          const pad = 2;
          ctx.drawImage(avatarImg, x + pad, y + pad, size - pad * 2, size - pad * 2);
        } else {
          ctx.fillStyle = "white";
          ctx.fillText("?", x + 10, y + 16);
        }
      }

      // Preview grande
      const previewX = 100;
      const previewY = 30;
      const previewSize = 48;

      ctx.strokeStyle = "white";
      ctx.strokeRect(previewX, previewY, previewSize, previewSize);

      const current = filtered[hoveredAvatarIndex];

      // ✅ DIBUJAR PREVIEW DEL AVATAR (hover)
      if (current && current.img) {
        const pad = 3;
        ctx.drawImage(current.img, previewX + pad, previewY + pad, previewSize - pad * 2, previewSize - pad * 2);
      }

      // Nombre debajo del preview
      if (current) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(username || "Jugador", previewX + previewSize / 2, previewY + previewSize + 12);
        ctx.textAlign = "start";
      }

      // Botón volver
      ctx.fillStyle = "white";
      ctx.fillText("← Volver", 10, LOGICAL_H - 10);

      // ✅ BOTÓN CONTINUAR (solo si YA hay un avatar seleccionado)
      // Recomendación: cuando el usuario haga click en una miniatura,
      // setea: selectedAvatar = filtered[i];
      if (selectedAvatar) {
        const btnW = 70;
        const btnH = 14;
        const btnX = LOGICAL_W - btnW - 10;
        const btnY = LOGICAL_H - btnH - 6;

        // fondo del botón
        ctx.fillStyle = "white";
        ctx.fillRect(btnX, btnY, btnW, btnH);

        // borde
        ctx.strokeStyle = "black";
        ctx.strokeRect(btnX + 0.5, btnY + 0.5, btnW - 1, btnH - 1);

        // texto
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Continuar", btnX + btnW / 2, btnY + 10);
        ctx.textAlign = "start";

        // (Opcional) deja estas coords globales para que handleCanvasClick las use:
        // window.__continueBtn = { x: btnX, y: btnY, w: btnW, h: btnH };
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    // ===== 3️⃣ Selección de profesión (slider) =====
if (checkingStep === "profession") {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  ctx.fillStyle = "white";
  ctx.font = "8px monospace";
  ctx.fillText("Elige tu profesion", 10, 12);

  const current = professions[professionIndex];

  // Caja principal
  const boxX = 12;
  const boxY = 28;
  const boxW = LOGICAL_W - 24;
  const boxH = 78;

  ctx.strokeStyle = "white";
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Flechas (izq / der)
  const btnSize = 16;
  const leftX = boxX + 6;
  const leftY = boxY + boxH + 6;
  const rightX = boxX + boxW - btnSize - 6;
  const rightY = leftY;

  ctx.fillStyle = "white";
  ctx.fillRect(leftX, leftY, btnSize, btnSize);
  ctx.fillRect(rightX, rightY, btnSize, btnSize);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("◀", leftX + btnSize / 2, leftY + 12);
  ctx.fillText("▶", rightX + btnSize / 2, rightY + 12);

  // indicador centro
  ctx.fillStyle = "white";
  ctx.fillText(`${professionIndex + 1}/${professions.length}`, boxX + boxW / 2, leftY + 12);
  ctx.textAlign = "start";

  // ===== CONTENIDO dentro del cuadro con CLIP + SCROLL =====
  const pad = 8;
  const contentX = boxX + pad;
  const contentY = boxY + pad;
  const contentW = boxW - pad * 2;
  const contentH = boxH - pad * 2;

  // título
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(current.name, boxX + boxW / 2, contentY + 6);
  ctx.textAlign = "start";

  // recorta al cuadro interno (para que nada se salga)
  ctx.save();
  ctx.beginPath();
  ctx.rect(contentX, contentY + 14, contentW, contentH - 14); // deja espacio para el título
  ctx.clip();

  // wrap de texto + scroll
  ctx.fillStyle = "white";
  ctx.font = "8px monospace";

  const lines = wrapText(ctx, current.description, contentW);
  const lineH = 10;

  const totalH = lines.length * lineH;
  const maxScroll = Math.max(0, totalH - (contentH - 14));

  professionScroll = clamp(professionScroll, 0, maxScroll);

  let y = (contentY + 18) - professionScroll;
  for (const line of lines) {
    ctx.fillText(line, contentX, y);
    y += lineH;
  }

  ctx.restore();

  // Botón volver (izquierda abajo)
  ctx.fillStyle = "white";
  ctx.textAlign = "start";
  ctx.fillText("← Volver", 10, LOGICAL_H - 10);

  // ✅ Botón CONTINUAR centrado abajo (sin seleccionar)
  const continueW = 80;
  const continueH = 16;
  const continueX = Math.floor((LOGICAL_W - continueW) / 2);
  const continueY = LOGICAL_H - continueH - 6;

  ctx.fillStyle = "white";
  ctx.fillRect(continueX, continueY, continueW, continueH);
  ctx.strokeStyle = "black";
  ctx.strokeRect(continueX + 0.5, continueY + 0.5, continueW - 1, continueH - 1);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Continuar", continueX + continueW / 2, continueY + 11);
  ctx.textAlign = "start";

  ctx.setTransform(1,0,0,1,0,0);
  return;
}

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

// 🟢 MODO PLAYING
if (gameMode === "playing") {

  // asegura que existan assets
  if (!images.map || !images.hero || !images.shadow) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
    ctx.fillStyle = "white";
    ctx.font = "8px monospace";
    ctx.fillText("Cargando...", 10, 20);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  // tamaño de “vista” en mundo (mientras más zoom-out, más grande la vista)
  const viewW = LOGICAL_W / CAMERA_ZOOM;
  const viewH = LOGICAL_H / CAMERA_ZOOM;

  // centro del héroe en coordenadas de mundo
  const heroCenterX = player.x + HERO_DRAW_W / 2;
  const heroCenterY = player.y + HERO_DRAW_H / 2;

  // clamp para que no muestre fuera del mapa
  const camCenterX = clamp(heroCenterX, viewW / 2, WORLD_W - viewW / 2);
  const camCenterY = clamp(heroCenterY, viewH / 2, WORLD_H - viewH / 2);

  // transformación: mundo -> pantalla, dejando al héroe centrado
  ctx.save();
  ctx.translate(LOGICAL_W / 2, LOGICAL_H / 2);
  ctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
  ctx.translate(-camCenterX, -camCenterY);

  // dibuja mundo
  ctx.drawImage(images.map, 0, 0, WORLD_W, WORLD_H);

  // sombra (ajusta si ya tienes offsets)
  ctx.drawImage(images.shadow, player.x, player.y, HERO_DRAW_W, HERO_DRAW_H);

  // sprite del héroe (orientación/frames)
  const row = rowForFacing(player.facing);
  const sx = player.frame * HERO_W;
  const sy = row * HERO_H;

  ctx.drawImage(
    images.hero,
    sx, sy, HERO_W, HERO_H,
    player.x, player.y,
    HERO_DRAW_W, HERO_DRAW_H
  );

  ctx.restore();

  // ✅ HUD coordenadas (esquina superior izquierda)
  ctx.save();

  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  ctx.fillStyle = "transparent";
  ctx.fillRect(4, 4, 110, 18);

  ctx.fillStyle = "lime";
  ctx.font = "6px arcade";
  ctx.textAlign = "start";
  ctx.fillText(`X:${Math.floor(player.x)} Y:${Math.floor(player.y)}`, 8, 16);

  ctx.restore();

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return;
}

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}



function start() {
  let last = performance.now();
  function loop(now) {
    const dt = now - last;
    last = now;
    update(dt);
    draw(images); // images está en el mismo scope
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// solo precarga miniaturas (para selección)
preloadAvatars(characters)
  .catch(err => console.error("Error precargando avatares:", err));

// arranca el loop (sin cargar map/hero/shadow aún)
start();

// decide si muestra checking o playing (pero playing mostrará “Cargando...” hasta que haya assets)
checkUserProfile();

// arranca el loop
start();

// decide modo inicial
checkUserProfile();

// si al recargar ya tiene perfil completo, carga assets de una vez
if (gameMode === "playing") {
  loadGameAssets().then(() => {
    // si quieres, puedes revalidar aquí
    // (no es obligatorio, el draw ya se actualizará en el siguiente frame)
  });
}
})();

checkUserProfile(); /*Llamado de función cheking */




/*Resetear datios de juego 

function resetPlayerProfile() {
 localStorage.removeItem("avatar");
  localStorage.removeItem("avatarId");
  localStorage.removeItem("gender");
  localStorage.removeItem("profession");

  // Si usas más claves en el futuro, agrégalas aquí

  console.log("Datos del jugador eliminados.");

  // Resetear variables en memoria (opcional pero recomendado)
  selectedGender = null;
  selectedAvatar = null;
  selectedProfession = null;
  hoveredAvatarIndex = 0;
  hoveredProfessionIndex = 0;

  checkingStep = "gender";
  gameMode = "checking";
}

resetPlayerProfile()*/

//-----------------------------------------------------------
//vERSIÓN ESTABLE COMPLETAMENTE CUADRADO ESTILO RETRO (FIN)
//-----------------------------------------------------------





//-----------------------------------------------------------
//vERSIÓN ESTABLE Responsivo en formato cuadrado para tablets y PC. y selector de genero ratio y posicionamiento de texto y clic automatico (Inicio)
//----

let checkingStep = "gender"; // "gender" | "avatar" | "profession"
let selectedGender = null;   // "male" | "female"
let selectedAvatar = null;   // objeto del array characters
let hoveredAvatarIndex = 0;  // para preview

let hoveredProfessionIndex = 0;      // para moverse con flechas
let selectedProfession = null;       // objeto del array professions

let professionIndex = 0;      // reemplaza hoveredProfessionIndex
let professionScroll = 0;     // scroll vertical dentro del cuadro

let gameMode = "checking"; // checking | error | playing -- Evalua si existe nombre de usuario, avatar y profesión.

/*Función de validación cheking (Inicio) */

  let username   = "jaisaac";
  let avatar     = localStorage.getItem("avatar");
  let profession = localStorage.getItem("profession");

let loadingProgress = 0;      // 0 → 1
let loadingTarget = 0;        // progreso real

function checkUserProfile() {

  // 🔴 1. No tiene nombre de usuario
  if (!username) {
    gameMode = "error";
    return;
  }

  // 🟡 2. No tiene avatar ni profesión
  if (!avatar || !profession) {
    console.log("Seleccionar avatar");
    gameMode = "checking"; // aún no juega
    return;
  }

  // 🟢 3. Tiene todo correcto
  console.log("Que comience el juego.");
  gameMode = "playing";
}
/*Función de validación cheking (fin) */

/*Anular clic sostenido en dispositivos moviles (inicio)*/

/*Arreglo de avatares (Inicio) */
const characters = [

  // ===== 👨 HOMBRES =====
  {
    id: "m1",
    profile: "Alex",
    gender: "male",
    avatar: "./assets/avatares/men/hombre1.png",
    sprites: "./assets/avatares/hombre1.png"
  },
  {
    id: "m2",
    profile: "Dario",
    gender: "male",
    avatar: "./assets/avatares/men/hombre2.png",
    sprites: "./assets/avatares/hombre2.png"
  },
  {
    id: "m3",
    profile: "Kenzo",
    gender: "male",
    avatar: "./assets/avatares/men/hombre3.png",
    sprites: "./assets/avatares/hombre3.png"
  },
  {
    id: "m4",
    profile: "Luca",
    gender: "male",
    avatar: "./assets/avatares/men/hombre4.png",
    sprites: "./assets/avatares/hombre4.png"
  },
  {
    id: "m5",
    profile: "Noah",
    gender: "male",
    avatar: "./assets/avatares/men/hombre5.png",
    sprites: "./assets/avatares/hombre5.png"
  },
  {
    id: "m6",
    profile: "Ryu",
    gender: "male",
    avatar: "./assets/avatares/men/hombre6.png",
    sprites: "./assets/avatares/hombre6.png"
  },
  {
    id: "m7",
    profile: "Tomas",
    gender: "male",
    avatar: "./assets/avatares/men/hombre7.png",
    sprites: "./assets/avatares/hombre7.png"
  },
  {
    id: "m8",
    profile: "Victor",
    gender: "male",
    avatar: "./assets/avatares/men/hombre8.png",
    sprites: "./assets/avatares/hombre8.png"
  },
  {
    id: "m9",
    profile: "Zane",
    gender: "male",
    avatar: "./assets/avatares/men/hombre9.png",
    sprites: "./assets/avatares/hombre9.png"
  },


  // ===== 👩 MUJERES =====
  {
    id: "f1",
    profile: "Aria",
    gender: "female",
    avatar: "./assets/avatares/women/mujer1.png",
    sprites: "./assets/avatares/mujer1.png"
  },
  {
    id: "f2",
    profile: "Bella",
    gender: "female",
    avatar: "./assets/avatares/women/mujer2.png",
    sprites: "./assets/avatares/mujer2.png"
  },
  {
    id: "f3",
    profile: "Cleo",
    gender: "female",
    avatar: "./assets/avatares/women/mujer3.png",
    sprites: "./assets/avatares/mujer3.png"
  },
  {
    id: "f4",
    profile: "Diana",
    gender: "female",
    avatar: "./assets/avatares/women/mujer4.png",
    sprites: "./assets/avatares/mujer4.png"
  },
  {
    id: "f5",
    profile: "Elena",
    gender: "female",
    avatar: "./assets/avatares/women/mujer5.png",
    sprites: "./assets/avatares/mujer5.png"
  },
  {
    id: "f6",
    profile: "Freya",
    gender: "female",
    avatar: "./assets/avatares/women/mujer6.png",
    sprites: "./assets/avatares/mujer6.png"
  },
  {
    id: "f7",
    profile: "Iris",
    gender: "female",
    avatar: "./assets/avatares/women/mujer7.png",
    sprites: "./assets/avatares/mujer7.png"
  },
  {
    id: "f8",
    profile: "Mika",
    gender: "female",
    avatar: "./assets/avatares/women/mujer8.png",
    sprites: "./assets/avatares/mujer8.png"
  },
  {
    id: "f9",
    profile: "Nova",
    gender: "female",
    avatar: "./assets/avatares/women/mujer9.png",
    sprites: "./assets/avatares/mujer9.png"
  }
];
/*Arreglo de avatares (Fin) */

//función para precargar imágenes de avatares
function preloadAvatars(characters) {
  return Promise.all(
    characters.map(ch => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { ch.img = img; resolve(); };
      img.onerror = () => { 
        console.warn("No cargó avatar:", ch.avatar);
        ch.img = null; 
        resolve(); 
      };
      img.src = ch.avatar;
    }))
  );
}

/*Profesiones (Inicio) */
const professions = [
  {
    id: "warrior",
    name: "Guerrero",
    description: "Especialista en combate cuerpo a cuerpo. Alta resistencia y fuerza física."
  },
  {
    id: "engineer",
    name: "Ingeniero",
    description: "Experto en tecnología y mecanismos. Puede reparar y mejorar dispositivos."
  },
  {
    id: "scientist",
    name: "Científico",
    description: "Analiza el entorno y descubre secretos ocultos. Alta inteligencia."
  },
  {
    id: "medic",
    name: "Médico",
    description: "Capaz de curar y asistir a otros. Fundamental para la supervivencia."
  },
  {
    id: "explorer",
    name: "Explorador",
    description: "Ágil y observador. Se mueve rápido y detecta rutas ocultas."
  }
];
/*Profesiones (fin) */

/*Función para que el texto no salga del cuadro en la selección de profesiones (inicio) */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}
/*Función para que el texto no salga del cuadro en la selección de profesiones (fin) */



(() => {
  // 1) Evita menú contextual (long-press) en móviles
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }, { passive: false });

  // 2) Evita selección/arrastre típico por long-press (imágenes/texto)
  ["selectstart", "dragstart"].forEach(evt => {
    document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
  });

  // 3) Evita gestos del navegador (scroll/zoom/hold) SOLO dentro de un contenedor (recomendado)
  // Cambia "#wrap" por el id/clase de tu juego si quieres.
  const blockZone = document.querySelector("#wrap") || document.body;

  blockZone.addEventListener("touchstart", (e) => {
    // si quieres permitir scroll fuera del juego, mantén esto limitado al contenedor del juego
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchmove", (e) => {
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchend", (e) => {
    e.preventDefault();
  }, { passive: false });

  // 4) iOS Safari: previene "double tap to zoom" y algunos long-press raros con pointer
  blockZone.style.webkitTouchCallout = "none"; // iOS callout
  blockZone.style.webkitUserSelect = "none";
})();


const LOGO_SRC = "./assets/src/logo.png";
let logoImg = null;


/*-----------------------Saldo Cosmonedas (Inicio)------------------------------------*/
const COSMONEDA_SRC = "./assets/src/cosmoneda.svg";
let cosmonedaImg = null;
let cosmonedas = 0;

//Previoo de cosmonedas
function recibirCosmonedas(amount) {
  cosmonedas += amount;       // actualización visual inmediata
  enviarCosmonedasAlServidor(amount);
}


/*Función para mandar cosmonedas al servidor */
function enviarCosmonedasAlServidor(amount) {
  fetch(ajaxurl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "guardar_cosmonedas",
      amount: amount
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      cosmonedas = data.balance; // 🔥 aquí sincronizas con el valor REAL
    }
  });
}
/*-----------------------Saldo Cosmonedas (Fin)------------------------------------*/

(() => {
  
  const ASSETS = {
    map: "./assets/mapas/mapa5000x5000.png", //mapa
    hero: null, //Personaje
    shadow: "https://assets.codepen.io/21542/DemoRpgCharacterShadow.png", //Sombra del personaje (para dar sensación de profundidad)
  };

  // Contenedor único y estable (NO se recrea)
const images = {
  map: null,
  hero: null,
  shadow: null,
};

// Para evitar cargar 2 veces
let gameAssetsLoaded = false;
let gameAssetsLoading = false;

// Devuelve la ruta del héroe final (localStorage o default)
function getHeroSrc() {
  const ls = localStorage.getItem("avatar");
  return (ls && ls !== "null" && ls !== "undefined" && ls.trim() !== "")
    ? ls
    : "./assets/avatares/default.png";
}

// Carga real del juego (solo cuando toca)
async function loadGameAssets() {
  if (gameAssetsLoaded || gameAssetsLoading) return;

  gameAssetsLoading = true;
  loadingProgress = 0;
  loadingTarget = 0;

  try {
    const heroSrc = getHeroSrc();

    const assetsToLoad = [
      ASSETS.map,
      heroSrc,
      ASSETS.shadow,
      LOGO_SRC,
      COSMONEDA_SRC
    ];

    const total = assetsToLoad.length;
    let loaded = 0;

    function loadWithProgress(src) {
      return loadImage(src).then(img => {
        loaded++;
        loadingTarget = loaded / total;
        return img;
      });
    }

    const mapImg     = await loadWithProgress(ASSETS.map);
    const heroImg    = await loadWithProgress(heroSrc);
    const shadowImg  = await loadWithProgress(ASSETS.shadow);
    const loadedLogo = await loadWithProgress(LOGO_SRC);
    const loadedCoin = await loadWithProgress(COSMONEDA_SRC);

    images.map = mapImg;
    images.hero = heroImg;
    images.shadow = shadowImg;
    logoImg = loadedLogo;
    cosmonedaImg = loadedCoin;

    gameAssetsLoaded = true;

  } catch (err) {
    console.error("Error cargando assets:", err);
    gameMode = "error";
  } finally {
    gameAssetsLoading = false;
  }
}

  // Resolución lógica (SIEMPRE igual) camara
  const CAMERA_ZOOM = 1; // 1 = normal, 0.5 = más lejos, 0.25 = mucho más lejos
  const LOGICAL_W = 160;
  const LOGICAL_H = 144;
/* resolución perfecta para celulares menores de 400px de resolución
    const LOGICAL_W = 160;
    const LOGICAL_H = 300;*/
/* Resolución perfecto para tablets PC y laptos
  const LOGICAL_W = 160;
  const LOGICAL_H = 144;
*/
const camera = { x: 0, y: 0, w: LOGICAL_W, h: LOGICAL_H };

  //dimenciones del mapa
const WORLD_W = 5000;
const WORLD_H = 5000;

  // Personaje (2x2 tiles => 32x32)
  const HERO_W = 64;
  const HERO_H = 64;

  //tamaño visual dentro del canvas
  const HERO_DRAW_W = 64;  // tamaño visual del avatar en canva
  const HERO_DRAW_H = 64;

  const canvas = document.getElementById("game");
  const wrap = document.getElementById("wrap");
  const ctx = canvas.getContext("2d");
  

  // Scroll con rueda (desktop)
canvas.addEventListener("wheel", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;

  e.preventDefault();
  professionScroll += (e.deltaY > 0 ? 8 : -8);
}, { passive: false });

// Scroll con touch (móvil)
let touchStartY = null;
canvas.addEventListener("pointerdown", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;
  touchStartY = e.clientY;
});

canvas.addEventListener("pointermove", (e) => {
  if (gameMode !== "checking" || checkingStep !== "profession") return;
  if (touchStartY === null) return;

  const dy = e.clientY - touchStartY;
  touchStartY = e.clientY;
  professionScroll -= dy / scale; // se siente natural
});

canvas.addEventListener("pointerup", () => { touchStartY = null; });
canvas.addEventListener("pointercancel", () => { touchStartY = null; });

  // IMPORTANTE: sin suavizado
  ctx.imageSmoothingEnabled = false;

  let scale = 1;

  /*Función para formato cuadrado estilo retro*/
function resizeFullscreen() {

  const rect = wrap.getBoundingClientRect();

  // El canvas toma TODO el tamaño disponible
  canvas.width  = rect.width;
  canvas.height = rect.height;

  canvas.style.width  = rect.width + "px";
  canvas.style.height = rect.height + "px";

  // Ahora la resolución lógica es igual a la real
  camera.w = canvas.width;
  camera.h = canvas.height;

  ctx.imageSmoothingEnabled = false;
}

window.addEventListener("resize", resizeFullscreen);
resizeFullscreen();

  const loadImage = (src) => new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

  // Input
  const held = [];
  const dirs = {
    up:    {x: 0, y:-1},
    down:  {x: 0, y: 1},
    left:  {x:-1, y: 0},
    right: {x: 1, y: 0},
  };

  const keyToDir = {
    ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right",
    w:"up", s:"down", a:"left", d:"right",
    W:"up", S:"down", A:"left", D:"right",
  };

  window.addEventListener("keydown", (e) => {
    const dir = keyToDir[e.key];
    if (!dir) return;
    if (!held.includes(dir)) held.unshift(dir);
    e.preventDefault();
  });

  window.addEventListener("keyup", (e) => {
    const dir = keyToDir[e.key];
    if (!dir) return;
    const i = held.indexOf(dir);
    if (i !== -1) held.splice(i, 1);
    e.preventDefault();
  });

  // Dpad
  let pressed = false;
  const setHeld = (dir) => { if (pressed) { held.length = 0; held.push(dir); } };
  const clearHeld = () => { held.length = 0; };

  document.querySelectorAll(".btn").forEach(btn => {
    const dir = btn.dataset.dir;
    btn.addEventListener("pointerdown", (e) => { pressed = true; setHeld(dir); e.preventDefault(); });
    btn.addEventListener("pointerup", (e) => { pressed = false; clearHeld(); e.preventDefault(); });
    btn.addEventListener("pointercancel", (e) => { pressed = false; clearHeld(); e.preventDefault(); });
    btn.addEventListener("pointerenter", (e) => { if (pressed) setHeld(dir); e.preventDefault(); });
  });
  window.addEventListener("pointerup", () => { pressed = false; clearHeld(); });

  // Estado
  const player = {
    x: 3200, y: 1024, speed: 1.5, //datos Avatar: Coordenadas - Velocidad
    facing: "down", walking: false,
    frame: 0, frameTimer: 0, frameDurationMs: 150,
  };

  
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const rowForFacing = (facing) => {
  const ROW = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };
  return ROW[facing] ?? 0;
};

  function update(dtMs) {
    
    const dir = held[0];
    player.walking = !!dir;

    if (dir) {
      player.facing = dir;
      const d = dirs[dir];
      const delta = dtMs / 8; // velicidad del avatar. entre menor sea el numero, más rapido camina
      player.x += d.x * player.speed * delta;
      player.y += d.y * player.speed * delta;
    }

    // límites del mundo completo (5000x5000)
    const leftLimit = 0;
    const topLimit = 0;
    const rightLimit = WORLD_W - HERO_W;   // o HERO_DRAW_W si ese es el tamaño real que ocupa
    const bottomLimit = WORLD_H - HERO_H;

    player.x = clamp(player.x, leftLimit, rightLimit);
    player.y = clamp(player.y, topLimit, bottomLimit);

    camera.x = player.x + HERO_W/2 - camera.w/2;
    camera.y = player.y + HERO_H/2 - camera.h/2;

    camera.x = clamp(camera.x, 0, WORLD_W - camera.w);
    camera.y = clamp(camera.y, 0, WORLD_H - camera.h);

    if (player.walking) {
      player.frameTimer += dtMs;
      while (player.frameTimer >= player.frameDurationMs) {
        player.frameTimer -= player.frameDurationMs;
        player.frame = (player.frame + 1) % 4;
      }
    } else {
      player.frame = 0;
      player.frameTimer = 0;
    }
  }

canvas.addEventListener("pointerdown", handleCanvasClick);

async function handleCanvasClick(e) {
  // Solo respondemos clicks cuando estamos en selección
  if (gameMode !== "checking") return;

  // Coordenadas del click dentro del canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = (e.clientX - rect.left) / scale;
  const mouseY = (e.clientY - rect.top) / scale;

  // ===== 1) CLICK en vista GÉNERO =====
  if (checkingStep === "gender") {
    const maleHit =
      mouseX >= selectorMaleX && mouseX <= selectorMaleX + formWitchSelectorMale &&
      mouseY >= selectorMaleY - 20 && mouseY <= selectorMaleY + formHeightSelectorMale;

    const femaleHit =
      mouseX >= selectorFemaleX && mouseX <= selectorFemaleX + formWitchSelectorFemale &&
      mouseY >= selectorFemaleY - 20 && mouseY <= selectorFemaleY + formHeightSelectorFemale;

    if (maleHit) {
      selectedGender = "male";
      checkingStep = "avatar";
      return;
    }

    if (femaleHit) {
      selectedGender = "female";
      checkingStep = "avatar";
      return;
    }

    return;
  }

  // ===== 2) CLICK en vista AVATAR =====
  if (checkingStep === "avatar" && selectedGender) {
    const filtered = characters.filter(c => c.gender === selectedGender);

    const layout = getAvatarGridLayout(filtered.length);
    const { startX, startY, cell, gap, cols } = layout;

    // 1) Selección de miniaturas
    for (let i = 0; i < filtered.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = startX + col * (cell + gap);
      const y = startY + row * (cell + gap);

      const hit =
        mouseX >= x && mouseX <= x + cell &&
        mouseY >= y && mouseY <= y + cell;

      if (hit) {
        hoveredAvatarIndex = i;
        selectedAvatar = filtered[i];
        return;
      }
    }

    // 2) Botón volver (avatar) — EXACTO como en draw()
    ctx.font = fontSiseGender + "px monospace";
    const textWidth = ctx.measureText(backText).width;

    const ratioX = backPosX - backPaddingX;
    const ratioY = backPosY - fontSiseGender - backPaddingY;
    const ratioW = textWidth + backPaddingX * 2;
    const ratioH = fontSiseGender + backPaddingY * 2;

    const clickedBack =
      mouseX >= ratioX && mouseX <= ratioX + ratioW &&
      mouseY >= ratioY && mouseY <= ratioY + ratioH;

    if (clickedBack) {
      checkingStep = "gender";
      selectedGender = null;
      selectedAvatar = null;
      hoveredAvatarIndex = 0;
      return;
    }

    // 3) Botón CONTINUAR (avatar) — mismas coordenadas que en draw()
    if (selectedAvatar) {
      const btnX = LOGICAL_W - continueBtnW - continueMarginRight;
      const btnY = LOGICAL_H - continueBtnH - continueMarginBottom;

      const clickedContinue =
        mouseX >= btnX && mouseX <= btnX + continueBtnW &&
        mouseY >= btnY && mouseY <= btnY + continueBtnH;

      if (clickedContinue) {
        localStorage.setItem("avatar", selectedAvatar.sprites);
        localStorage.setItem("avatarId", selectedAvatar.id);
        localStorage.setItem("gender", selectedAvatar.gender);

        avatar = localStorage.getItem("avatar");
        checkingStep = "profession";
        professionScroll = 0;
        return;
      }
    }

    return;
  }

  // ===== 3) CLICK en vista PROFESIÓN =====
  if (checkingStep === "profession") {
    // Flechas + caja: UNA sola fuente
    const ui = getProfessionUI();
    const { btnSize, leftX, leftY, rightX, rightY } = ui;

    const clickedLeft =
      mouseX >= leftX && mouseX <= leftX + btnSize &&
      mouseY >= leftY && mouseY <= leftY + btnSize;

    const clickedRight =
      mouseX >= rightX && mouseX <= rightX + btnSize &&
      mouseY >= rightY && mouseY <= rightY + btnSize;

    if (clickedLeft) {
      professionIndex = (professionIndex - 1 + professions.length) % professions.length;
      professionScroll = 0;
      return;
    }

    if (clickedRight) {
      professionIndex = (professionIndex + 1) % professions.length;
      professionScroll = 0;
      return;
    }

    // Botón volver (profesiones) — idealmente igual a draw()
    // Nota: en draw() usas measureText (real). Aquí hacemos lo mismo.
    ctx.font = `${PROF_BACK_FONT_SIZE}px ${PROF_BACK_FONT_FAMILY}`;
    const backTextX = PROF_BACK_X;
    const backTextY = LOGICAL_H - PROF_BACK_Y_OFFSET;

    const backTextW = ctx.measureText(PROF_BACK_TEXT).width;
    const backTextH = PROF_BACK_FONT_SIZE;

    const backHitX = backTextX - PROF_BACK_PAD_X;
    const backHitY = (backTextY - backTextH) - PROF_BACK_PAD_Y;
    const backHitW = backTextW + PROF_BACK_PAD_X * 2;
    const backHitH = backTextH + PROF_BACK_PAD_Y * 2;

    const clickedBack =
      mouseX >= backHitX && mouseX <= backHitX + backHitW &&
      mouseY >= backHitY && mouseY <= backHitY + backHitH;

    if (clickedBack) {
      checkingStep = "avatar";
      professionScroll = 0;
      return;
    }

    // Botón CONTINUAR (profesiones) — usa hitbox exacto guardado desde draw()
    const hb = window.__profContinueHit;

    const continueW = PROF_CONT_W;
    const continueH = PROF_CONT_H;

    const continueX = PROF_CONT_CENTERED
      ? Math.floor((LOGICAL_W - continueW) / 2)
      : PROF_CONT_X;

    const continueY = LOGICAL_H - continueH - PROF_CONT_BOTTOM_MARGIN;

    const hit = hb ?? { x: continueX, y: continueY, w: continueW, h: continueH };

    const clickedContinue =
      mouseX >= hit.x && mouseX <= hit.x + hit.w &&
      mouseY >= hit.y && mouseY <= hit.y + hit.h;

    if (clickedContinue) {
      const current = professions[professionIndex];
      localStorage.setItem("profession", current.id);

      profession = localStorage.getItem("profession");
      avatar = localStorage.getItem("avatar");

      await loadGameAssets();

      if (images.map && images.hero && images.shadow) {
        gameMode = "playing";
      }
      return;
    }

    return;
  }
}
/*Lógica selector de genero. mover valor para mover y visualizar el texto con el ratio del clic (Inicio) */
const fontSiseGender = 28; //tamaño de letra selector de genero
/*Constante posicionamiento selector genero hombre */
const selectorMaleX = 40; 
const selectorMaleY = 90;
const lenzCaracter = "♂ Hombre"; // ancho aproximado del texto

const formWitchSelectorMale = lenzCaracter.length * (fontSiseGender * 0.6); // ancho aproximado del texto (ajustado por el tamaño de fuente)
const formHeightSelectorMale = fontSiseGender * 1.2; // altura aproximada del texto

/*Constante posicionamiento selector genero mujer */
const selectorFemaleX = 40;
const selectorFemaleY = 140;
const lenzCaracterFemale = "♀ Mujer"; // ancho aproximado del texto

const formWitchSelectorFemale = lenzCaracterFemale.length * (fontSiseGender * 0.6); // ancho aproximado del texto (ajustado por el tamaño de fuente)
const formHeightSelectorFemale = fontSiseGender * 1.2; // altura aproximada del texto

/*Lógica selector de genero. mover valor para mover y visualizar el texto con el ratio del clic (fin) */



/*Lógica boton volver en selector de avatar para mover el boton y su ratio de click (inicio) */
// ===== UI: Botón Volver (global) =====
/* ===== BOTÓN VOLVER CONFIG ===== */

const backText = "← Volver";   // texto

const backPosX = 100;           // 🔥 mueve horizontal
const backPosY = 350;          // 🔥 mueve vertical (baseline del texto)

const backPaddingX = 10;       // espacio lateral del ratio
const backPaddingY = 8;        // espacio arriba/abajo del ratio
/*Lógica boton volver en selector de avatar para mover el boton y su ratio de click (inicio) */


/*Lógica boton Continuar en selector de avatares pra mover el boton y su ratio de clic (inicio) */
// ===== BOTÓN CONTINUAR (AVATAR) =====
const fontSizeContinue = 28;          // tamaño del texto del botón (como lo usas en fillText)
const continueText = "Continuar";

const continuePaddingX = 10;          // padding interno horizontal del botón
const continuePaddingY = 4;           // padding interno vertical del botón

const continueMarginRight = -110;       // separación al borde derecho
const continueMarginBottom = -400;       // separación al borde inferior

// Medidas aproximadas del texto (si quieres exacto, luego lo medimos con ctx.measureText)
const continueTextW = continueText.length * (fontSizeContinue * 0.6);
const continueTextH = fontSizeContinue * 1.2;

// Medidas del botón (calculadas)
const continueBtnW = Math.ceil(continueTextW + continuePaddingX * 2);
const continueBtnH = Math.ceil(continueTextH + continuePaddingY * 2);
/*Lógica boton Continuar en selector de avatares pra mover el boton y su ratio de clic (fin) */



//---Boton volver
// ===== UI BOTÓN VOLVER (profesiones) =====
const PROF_BACK_TEXT = "← Volver";
const PROF_BACK_FONT_SIZE = 28;          // tamaño del texto en px
const PROF_BACK_FONT_FAMILY = "monospace";
const PROF_BACK_X = 10;                 // posición X del texto
const PROF_BACK_Y_OFFSET = -200;          // distancia desde abajo (en px)
const PROF_BACK_PAD_X = 10;             // padding horizontal del hitbox
const PROF_BACK_PAD_Y = 8;              // padding vertical del hitbox
const PROF_BACK_SHOW_HITBOX = true;     // ponlo false cuando ya no lo quieras ver

//--Boton continuar
// ===== UI BOTÓN CONTINUAR (profesiones) =====
const PROF_CONT_TEXT = "Continuar";
const PROF_CONT_FONT_SIZE = 28;          // tamaño del texto dentro del botón
const PROF_CONT_FONT_FAMILY = "monospace";
const PROF_CONT_W = 160;                 // ancho del botón
const PROF_CONT_H = 32;                 // alto del botón
const PROF_CONT_BOTTOM_MARGIN = -210;      // separación desde abajo
const PROF_CONT_CENTERED = false;        // centrado automático
const PROF_CONT_X = 160;                  // si PROF_CONT_CENTERED=false, usa este X
const PROF_CONT_SHOW_HITBOX = true;     // debug ratio rojo

/*Función para calcular la grilla para matriz de avatares responsivo (Inicio) */
function getAvatarGridLayout(count) {
  const startX = 10;
  const startY = 25;
  const gap = 4;

  // Reserva espacio a la derecha para preview (48) + margen
  const previewW = 48;
  const rightPad = 12;
  const reservedRight = previewW + rightPad + 10;

  // Ancho disponible para la grilla
  const gridW = (LOGICAL_W - startX - reservedRight);

  // Máximo tamaño por celda
  const maxCell = 55;

  // Cuántas columnas caben si cada celda fuera de 50
  let cols = Math.floor((gridW + gap) / (maxCell + gap));
  cols = Math.max(1, cols);

  // Tamaño real de la celda para ocupar el ancho (sin pasarse de 50)
  let cell = Math.floor((gridW - (cols - 1) * gap) / cols);
  cell = Math.min(maxCell, cell);

  // Filas necesarias (wrap tipo flex)
  const rows = Math.ceil(count / cols);

  return { startX, startY, gap, cell, cols, rows, gridW };
}
/*Función para calcular la grilla para matriz de avatares responsivo (Fin) */


/*Variables de Botones laterales para selector de profesión (Inicio) */
// ===== UI PROFESION: CAJA + FLECHAS (FUENTE ÚNICA) =====
// ===== CONFIGURACIÓN CAJA PROFESIÓN + FLECHAS =====
// Todo lo que muevas aquí afecta dibujo Y clic automáticamente
const PROF_BOX = {

  x: 12,        // Posición horizontal (desde la izquierda del canvas)
  y: 80,        // Posición vertical (desde la parte superior del canvas)

  w: 300,       // Ancho total del cuadro donde aparece la profesión
  h: 200,       // Alto total del cuadro

  btnSize: 24,  // Tamaño (ancho y alto) de los botones laterales ◀ ▶

  btnPad: 16,   // Separación entre:
                 // - flechas y borde del cuadro
                 // - flechas y parte inferior del cuadro
                 // Mientras mayor sea, más se alejan del borde

};

function getProfessionUI() {
  const boxX = PROF_BOX.x;
  const boxY = PROF_BOX.y;
  const boxW = PROF_BOX.w;
  const boxH = PROF_BOX.h;

  const btnSize = PROF_BOX.btnSize;
  const leftX  = boxX + PROF_BOX.btnPad;
  const leftY  = boxY + boxH + PROF_BOX.btnPad;
  const rightX = boxX + boxW - btnSize - PROF_BOX.btnPad;
  const rightY = leftY;

  return {
    boxX, boxY, boxW, boxH,
    btnSize, leftX, leftY, rightX, rightY
  };
}

/*Variables de Botones laterales para selector de profesión (fin) */


function draw(images) {
  // reset
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🔴 MODO ERROR
  if (gameMode === "error") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    ctx.fillStyle = "red";
    ctx.font = "28px monospace";
    ctx.fillText("!Error de protocolo 1004", 10, 60);
    ctx.fillText("No se encuentra nombre de usuario", 10, 90);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  // 🟡 MODO CHECKING
  if (gameMode === "checking") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    ctx.fillStyle = "white";
    ctx.font = fontSiseGender + "px monospace";

    // ===== 1️⃣ Selección de género =====
    if (checkingStep === "gender") {
      ctx.fillText("Seleccionar genero", 30, 40);
      ctx.fillText(lenzCaracter, selectorMaleX, selectorMaleY);
      ctx.fillText(lenzCaracterFemale, selectorFemaleX, selectorFemaleY);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    // ===== 2️⃣ Selección de avatar =====
    if (checkingStep === "avatar" && selectedGender) {
      const filtered = characters.filter(c => c.gender === selectedGender);

      ctx.fillText("Elige tu avatar", 85, 40);

      const layout = getAvatarGridLayout(filtered.length);
      const { startX, startY, cell, gap, cols } = layout;

      for (let i = 0; i < filtered.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = startX + col * (cell + gap);
        const y = startY + row * (cell + gap);

        ctx.strokeStyle = (i === hoveredAvatarIndex) ? "yellow" : "white";
        ctx.strokeRect(x, y, cell, cell);

        const avatarImg = filtered[i].img;
        if (avatarImg) {
          const pad = Math.max(2, Math.floor(cell * 0.08));
          ctx.drawImage(avatarImg, x + pad, y + pad, cell - pad * 2, cell - pad * 2);
        } else {
          ctx.fillStyle = "white";
          ctx.fillText("?", x + Math.floor(cell / 2) - 3, y + Math.floor(cell / 2) + 3);
        }
      }

      // Preview grande
      const previewX = 100;
      const previewY = 80;
      const previewSize = 200;

      ctx.strokeStyle = "white";
      ctx.strokeRect(previewX, previewY, previewSize, previewSize);

      const current = filtered[hoveredAvatarIndex];

      if (current && current.img) {
        const pad = 3;
        ctx.drawImage(
          current.img,
          previewX + pad,
          previewY + pad,
          previewSize - pad * 2,
          previewSize - pad * 2
        );
      }

      // Nombre debajo del preview
      if (current) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(username || "Jugador", previewX + previewSize / 2, previewY + previewSize + 12);
        ctx.textAlign = "start";
      }

      // Botón volver (avatar)
      ctx.font = fontSiseGender + "px monospace";
      ctx.fillStyle = "white";
      ctx.fillText(backText, backPosX, backPosY);

      // hitbox (debug) volver avatar
      const textWidth = ctx.measureText(backText).width;
      const ratioX = backPosX - backPaddingX;
      const ratioY = backPosY - fontSiseGender - backPaddingY;
      const ratioW = textWidth + backPaddingX * 2;
      const ratioH = fontSiseGender + backPaddingY * 2;

      ctx.save();
      ctx.fillStyle = "transparent";
      ctx.fillRect(ratioX, ratioY, ratioW, ratioH);
      ctx.restore();

      // Botón continuar (avatar)
      if (selectedAvatar) {
        const btnX = LOGICAL_W - continueBtnW - continueMarginRight;
        const btnY = LOGICAL_H - continueBtnH - continueMarginBottom;

        // debug hitbox
        ctx.save();
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fillRect(btnX, btnY, continueBtnW, continueBtnH);
        ctx.restore();

        // botón
        ctx.fillStyle = "white";
        ctx.fillRect(btnX, btnY, continueBtnW, continueBtnH);

        ctx.strokeStyle = "black";
        ctx.strokeRect(btnX + 0.5, btnY + 0.5, continueBtnW - 1, continueBtnH - 1);

        // texto
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = `${fontSizeContinue}px monospace`;
        ctx.fillText(continueText, btnX + continueBtnW / 2, btnY + Math.floor(continueBtnH * 0.72));
        ctx.textAlign = "start";
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    // ===== 3️⃣ Selección de profesión (slider) =====
    if (checkingStep === "profession") {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

      ctx.fillStyle = "white";
      ctx.font = "28px monospace";
      ctx.fillText("Elige tu profesion", 10, 30);

      const current = professions[professionIndex];

      // ✅ Caja + flechas desde UNA sola fuente (getProfessionUI)
      const ui = getProfessionUI();
      const { boxX, boxY, boxW, boxH, btnSize, leftX, leftY, rightX, rightY } = ui;

      // Caja principal
      ctx.strokeStyle = "white";
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      // Flechas
      ctx.fillStyle = "white";
      ctx.fillRect(leftX, leftY, btnSize, btnSize);
      ctx.fillRect(rightX, rightY, btnSize, btnSize);

      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("◀", leftX + btnSize / 2, leftY + 22);
      ctx.fillText("▶", rightX + btnSize / 2, rightY + 22);

      // Indicador centro
      ctx.fillStyle = "white";
      ctx.fillText(`${professionIndex + 1}/${professions.length}`, boxX + boxW / 2, leftY + 12);
      ctx.textAlign = "start";

      // Contenido dentro del cuadro (clip + scroll)
      const pad = 8;
      const contentX = boxX + pad;
      const contentY = boxY + pad;
      const contentW = boxW - pad * 2;
      const contentH = boxH - pad * 2;

      // título
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(current.name, boxX + boxW / 2, contentY - 20);
      ctx.textAlign = "start";

      // clip
      ctx.save();
      ctx.beginPath();
      ctx.rect(contentX, contentY, contentW, contentH - 14);
      ctx.clip();

      ctx.fillStyle = "white";
      ctx.font = "24px monospace";

      const lines = wrapText(ctx, current.description, contentW);
      const lineH = 32;

      const totalH = lines.length * lineH;
      const maxScroll = Math.max(0, totalH - (contentH - 14));
      professionScroll = clamp(professionScroll, 0, maxScroll);

      let y = (contentY + 18) - professionScroll;
      for (const line of lines) {
        ctx.fillText(line, contentX, y);
        y += lineH;
      }

      ctx.restore();

      // ===== Botón volver (profesiones) =====
      ctx.save();

      ctx.font = `${PROF_BACK_FONT_SIZE}px ${PROF_BACK_FONT_FAMILY}`;
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      const backTextX = PROF_BACK_X;
      const backTextY = LOGICAL_H - PROF_BACK_Y_OFFSET;

      const backTextW = ctx.measureText(PROF_BACK_TEXT).width;
      const backTextH = PROF_BACK_FONT_SIZE;

      const backHitX = backTextX - PROF_BACK_PAD_X;
      const backHitY = (backTextY - backTextH) - PROF_BACK_PAD_Y;
      const backHitW = backTextW + PROF_BACK_PAD_X * 2;
      const backHitH = backTextH + PROF_BACK_PAD_Y * 2;

      if (PROF_BACK_SHOW_HITBOX) {
        ctx.fillStyle = "transparent";
        ctx.fillRect(backHitX, backHitY, backHitW, backHitH);
      }

      ctx.fillStyle = "white";
      ctx.fillText(PROF_BACK_TEXT, backTextX, backTextY);

      ctx.restore();

      // ===== Botón CONTINUAR (profesiones) =====
      ctx.save();

      const continueW = PROF_CONT_W;
      const continueH = PROF_CONT_H;

      const continueX = PROF_CONT_CENTERED
        ? Math.floor((LOGICAL_W - continueW) / 2)
        : PROF_CONT_X;

      const continueY = LOGICAL_H - continueH - PROF_CONT_BOTTOM_MARGIN;

      if (PROF_CONT_SHOW_HITBOX) {
        //ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fillRect(continueX, continueY, continueW, continueH);
      }

      ctx.fillStyle = "white";
      ctx.fillRect(continueX, continueY, continueW, continueH);

      ctx.strokeStyle = "black";
      ctx.strokeRect(continueX + 0.5, continueY + 0.5, continueW - 1, continueH - 1);

      ctx.fillStyle = "black";
      ctx.font = `${PROF_CONT_FONT_SIZE}px ${PROF_CONT_FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(PROF_CONT_TEXT, continueX + continueW / 2, continueY + continueH / 2);

      ctx.restore();

      // guarda hitbox exacto para el click
      window.__profContinueHit = { x: continueX, y: continueY, w: continueW, h: continueH };

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  // 🟢 MODO PLAYING
  if (gameMode === "playing") {
if (!gameAssetsLoaded) {

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Animación suave de barra
  loadingProgress += (loadingTarget - loadingProgress) * 0.08;


// 🔵 LOGO CENTRADO ARRIBA DE LA BARRA
if (logoImg) {

  const logoMaxWidth = 220;  // puedes ajustar tamaño aquí
  const logoRatio = logoImg.height / logoImg.width;

  const logoW = logoMaxWidth;
  const logoH = logoW * logoRatio;

  const logoX = (canvas.width - logoW) / 2;

  // La barra está en:
  const barWidth = 300;
  const barHeight = 18;
  const barY = canvas.height / 2 + 40;

  // Colocamos el logo arriba de la barra
  const logoY = barY - logoH - 40;

  ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
}
  // 🔵 BARRA DE CARGA
  const barWidth = 300;
  const barHeight = 18;

  const barX = (canvas.width - barWidth) / 2;
  const barY = canvas.height / 2 + 40;

  // Fondo barra
  ctx.fillStyle = "#222";
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Progreso
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 1;
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(barX, barY, barWidth * loadingProgress, barHeight);

  // Borde
  ctx.strokeStyle = "white";
  ctx.strokeRect(barX, barY, barWidth, barHeight);

  // Texto %
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.textAlign = "center";
  ctx.fillText(
    Math.floor(loadingProgress * 100) + "%",
    canvas.width / 2,
    barY + barHeight + 25
  );

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return;
}

    const viewW = canvas.width / CAMERA_ZOOM;
    const viewH = canvas.height / CAMERA_ZOOM;

    const heroCenterX = player.x + HERO_DRAW_W / 2;
    const heroCenterY = player.y + HERO_DRAW_H / 2;

    const camCenterX = clamp(heroCenterX, viewW / 2, WORLD_W - viewW / 2);
    const camCenterY = clamp(heroCenterY, viewH / 2, WORLD_H - viewH / 2);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
    ctx.translate(-camCenterX, -camCenterY);

    ctx.drawImage(images.map, 0, 0, WORLD_W, WORLD_H);
    ctx.drawImage(images.shadow, player.x, player.y, HERO_DRAW_W, HERO_DRAW_H);

    const row = rowForFacing(player.facing);
    const sx = player.frame * HERO_W;
    const sy = row * HERO_H;

    ctx.drawImage(
      images.hero,
      sx, sy, HERO_W, HERO_H,
      player.x, player.y,
      HERO_DRAW_W, HERO_DRAW_H
    );

    ctx.restore();

    /*Sistema de muestreo de coordenadas en el mapá(inicio) */
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    ctx.fillStyle = "transparent";
    ctx.fillRect(4, 4, 110, 18);

    ctx.fillStyle = "lime";
    ctx.font = "20px monospace";
    ctx.textAlign = "start";
    ctx.fillText(`X:${Math.floor(player.x)} Y:${Math.floor(player.y)}`, 24, 24);

    ctx.restore();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

  /* lógica cosmoneda (Inicio+)*/
// =============================
// 💰 HUD Cosmonedas (icono + valor)
// =============================
if (cosmonedaImg) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const size = 32;
  const margin = 12;
  const spacing = 8;

  ctx.font = "18px monospace";
  ctx.textBaseline = "middle";

  const valueText = String(cosmonedas);
  const textWidth = ctx.measureText(valueText).width;

  // Ancho total del bloque (icono + espacio + texto)
  const totalWidth = size + spacing + textWidth;

  // Posición inicial del bloque completo
  const startX = canvas.width - totalWidth - margin;
  const centerY = margin + size / 2;

  // Dibujar icono primero
  ctx.drawImage(cosmonedaImg, startX, margin, size, size);

  // Dibujar número después del icono
  ctx.fillStyle = "yellow";
  ctx.textAlign = "left";
  ctx.fillText(valueText, startX + size + spacing, centerY);

  ctx.restore();
}
/* lógica cosmoneda (Inicio+)*/


    return;
    /*Sistema de muestreo de coordenadas en el mapá(fin) */
    
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);



}



function start() {
  let last = performance.now();
  function loop(now) {
    const dt = now - last;
    last = now;
    update(dt);
    draw(images); // images está en el mismo scope
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// solo precarga miniaturas (para selección)
preloadAvatars(characters)
  .catch(err => console.error("Error precargando avatares:", err));

// arranca el loop (sin cargar map/hero/shadow aún)
start();

// decide si muestra checking o playing (pero playing mostrará “Cargando...” hasta que haya assets)
checkUserProfile();

// arranca el loop
start();

// decide modo inicial
checkUserProfile();

// si al recargar ya tiene perfil completo, carga assets de una vez
if (gameMode === "playing") {
  loadGameAssets().then(() => {
    // si quieres, puedes revalidar aquí
    // (no es obligatorio, el draw ya se actualizará en el siguiente frame)
  });
}
})();

checkUserProfile(); /*Llamado de función cheking */




/*Resetear datios de juego 

function resetPlayerProfile() {
 localStorage.removeItem("avatar");
  localStorage.removeItem("avatarId");
  localStorage.removeItem("gender");
  localStorage.removeItem("profession");

  // Si usas más claves en el futuro, agrégalas aquí

  console.log("Datos del jugador eliminados.");

  // Resetear variables en memoria (opcional pero recomendado)
  selectedGender = null;
  selectedAvatar = null;
  selectedProfession = null;
  hoveredAvatarIndex = 0;
  hoveredProfessionIndex = 0;

  checkingStep = "gender";
  gameMode = "checking";
}

resetPlayerProfile()*/

//-----------------------------------------------------------
//vERSIÓN ESTABLE Responsivo en formato cuadrado para tablets y PC. y selector de genero ratio y posicionamiento de texto y clic automatico (fin)
//----



















  Pequeño detalle conceptual importante

Cuando WordPress inyecte el username, idealmente deberías hacerlo así:

<script>
  window.WP_USER = {
    username: "<?php echo esc_js($username); ?>"
  };
</script>

Y luego en tu JS:

const username = window.WP_USER?.username;