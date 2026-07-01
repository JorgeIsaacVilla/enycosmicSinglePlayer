//Versión estable de juego
//Ver. 3.14.6

/*Global Songs and efects (inicio) */
let efectVolumen = 0.8;

let userPostX = 2513;
let userPostY = 2716;

function getSettingSfxVolume() {
  const raw = localStorage.getItem(LS_SETTINGS.sfxVolume);

  if (raw === null || raw === "" || raw === "null" || raw === "undefined") {
    return 0.8;
  }

  const v = Number(raw);
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.8;
}

function setSettingSfxVolume(v) {
  const value = Math.max(0, Math.min(1, Number(v) || 0));
  localStorage.setItem(LS_SETTINGS.sfxVolume, String(value));
  efectVolumen = value;
}

const jefederrotaSound = new Audio("../assets/song/efect/jefederrota.mp3");

function playjefederrotaSound() {
  const s = jefederrotaSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const endSound = new Audio("../assets/song/efect/end.mp3");

function playendSound() {
  const s = endSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const errorSound = new Audio("../assets/song/efect/error.mp3");

function playerrorSound() {
  const s = errorSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const enemyderrotaSound = new Audio("../assets/song/efect/enemyderrota.mp3");

function playenemyderrotaSound() {
  const s = enemyderrotaSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const goodSound = new Audio("../assets/song/efect/good.mp3");

function playgoodSound() {
  const s = goodSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const tockSound = new Audio("../assets/song/efect/tock.mp3");

function playtockSound() {
  const s = tockSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const fuegoSound = new Audio("../assets/song/efect/fuego.mp3");

function playFuegoSound() {
  const s = fuegoSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const comodoAttackSound = new Audio("../assets/song/efect/comodoAtack.mp3");

function playComodoAttackSound() {
  const s = comodoAttackSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const swordSound = new Audio("../assets/song/efect/espada.mp3");

function playSwordSound() {
  const s = swordSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const pushBlockSound = new Audio("../assets/song/efect/pushBlockArcilla.mp3");

function playPushBlockSound() {
  const s = pushBlockSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const bumerangSound = new Audio("../assets/song/efect/bumerang.mp3");

function playbumerangSound() {
  const s = bumerangSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
  return s;
}

const LazerSound = new Audio("../assets/song/efect/lazer.mp3");

function playLazerSound() {
  const s = LazerSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const corazonSound = new Audio("../assets/song/efect/corazon.mp3");

function playcorazonSound() {
  const s = corazonSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const uiSound = new Audio("../assets/song/efect/button.mp3");
uiSound.volume = efectVolumen;

function playUISound() {
  const s = uiSound.cloneNode(); // evita cortes si haces clicks rápidos
  s.volume = efectVolumen;
  s.play().catch(() => { });
}

const gameOverSound = new Audio("../assets/song/melodys/gameOver.mp3");
gameOverSound.volume = 0.7;

function playGameOverSound() {
  const s = gameOverSound.cloneNode();
  s.volume = getSettingVolume ? getSettingVolume() : 0.7;
  s.play().catch(() => { });
}

const arcillaBreakSound = new Audio("../assets/song/efect/desmorone.mp3");

function playArcillaBreakSound() {
  const s = arcillaBreakSound.cloneNode();
  s.volume = efectVolumen;
  s.play().catch(() => { });
}
/*Global Songs and efects (fin) */

// =======================================================================================
// Variables Coordenadas de misiones 
// =======================================================================================
let coordenadasMisionsX = 0;
let coordenadasMisionsY = 0;
let coordenadasMisionState = false;

// =======================================================================================
// Variables a sincronizar con base de datos Wordpress (inicio)
// =======================================================================================

// =============================
// IQ GLOBAL
// =============================
let IQuser = 3; //nivel IQ del jugador
const maxIQ = 700; //Nivel maximo de IQ del juego

// =============================
// Datos avatar User
// =============================
let username = "User Avatar";
let avatar = localStorage.getItem("avatar");
let profession = localStorage.getItem("profession");

let cosmonedas = 3000; //50 Inicial el saldo se gurdará en la base de datos

// =============================
// TOP 15 (estático MVP) manejo incial de forma manual
// Solo nombre, avatarId, iq
// =============================
let TOP15_PLAYERS = [];

async function cargarTopPlayers() {
  try {
    const res = await fetch("../top15players.json");
    TOP15_PLAYERS = await res.json();
  } catch (err) {
    console.error("Error cargando TOP15:", err);
  }
}
cargarTopPlayers();

// =============================
// NOVEDADES (MVP FRONTEND) anejo incial de forma manual
// =============================
let NOVEDADES = [];

async function cargarNovedades() {
  try {
    const res = await fetch("../novedades.json");
    NOVEDADES = await res.json();

    setNovedadesCount(NOVEDADES.length, { animate: true });
  } catch (err) {
    console.error("Error cargando novedades:", err);
  }
}
cargarNovedades()

// =======================================================================================
// Variables a sincronizar con base de datos Wordpress (Fin)
// =======================================================================================

//Combinaciones de inventario
let combinacionSlots = [null, null, null, null];
let combinacionResultado = null;
window.equipSlots = [null, null];  //Elementos equipados en avatar items/armas/equipo Sincronizar con base de datos wordpress

// ================================================
// Función llamado de metafon.html a index.html (inicio)
// ================================================

const NPC_FEAR_RADIUS = 300; //Foco de radio de NPC para detectar enemigos
let floatingTexts = []; //Almacenar texto flotante (Vida del usuario)
let shieldEffect = {
  active: false,
  type: null,          // "madera" | "hierro"
  tilt: 0,             // inclinación visual del aro
  timer: 0,            // duración visual
  particles: []
};

function crearTextoDanio(x, y, texto, color = "#ff1a1a", glow = "#ff0000") {
  floatingTexts.push({
    x: x,
    y: y,
    valor: texto,
    vida: 700,
    color: color,
    glow: glow
  });
}

function activarEfectoEscudo(tipo, orientacion = "down") {
  shieldEffect.active = true;
  shieldEffect.type = tipo;
  shieldEffect.timer = 1200;
  shieldEffect.particles = [];

  shieldEffect.tilt = orientacion === "up" ? -0.35 : 0.35;

  for (let i = 0; i < 20; i++) {
    shieldEffect.particles.push({
      angle: (Math.PI * 2 / 20) * i,
      radius: 18 + Math.random() * 12,
      life: 500 + Math.random() * 500,
      drift: 0.15 + Math.random() * 0.35,
      size: 2 + Math.random() * 2
    });
  }
}

//--Variables al momento de morir (inicio)
let gameOverActive = false;
const PLAYER_SPAWN_X = userPostX;
const PLAYER_SPAWN_Y = userPostY;

const gameOverState = {
  centinelaIzqImg: null,
  centinelaDerImg: null,
  continueBtn: { x: 0, y: 0, w: 0, h: 0 }
};
//--Variables al momento de morir (fin)

const FRASES_VALIENTES = [
  "¡No te tengo miedo, monstruo!",
  "¡No me moverás de aquí!",
  "¡Este lugar está protegido!",
  "¡No pasarás!",
  "¡No huiré!",
  "¡Defenderé esta base!",
  "¡Atrévete si puedes!",
  "¡No me intimidas!",
  "¡Este es mi puesto!",
  "¡No daré un paso atrás!",
  "¡No me asustas!",
  "¡Aquí termina tu invasión!"
];

//Mapa del juego
const globalMap = "../assets/mapas/mapa1-5000x5000.svg"
const WORLD_W_GLOBAL = 5000
const WORLD_H_GLOBAL = 5000

let escudoMaderaActivo = false;
let skateParticles = [];

function crearParticulaPatin() {
  skateParticles.push({
    x: player.x + 32 + (Math.random() * 14 - 7),
    y: player.y + 56 + (Math.random() * 6 - 3),

    vx: (Math.random() - 0.5) * 1.4,
    vy: 0.3 + Math.random() * 0.9,

    size: 2 + Math.random() * 3,
    life: 500 + Math.random() * 250,
    maxLife: 750,

    glow: 10 + Math.random() * 10,
    orbit: Math.random() * Math.PI * 2,
    spin: 0.08 + Math.random() * 0.12,
    color: Math.random() < 0.5 ? "#00eaff" : "#7a5cff"
  });
}

function updateSkateParticles(dtMs) {
  for (let i = skateParticles.length - 1; i >= 0; i--) {
    const p = skateParticles[i];

    p.life -= dtMs;
    p.orbit += p.spin;

    p.x += p.vx + Math.cos(p.orbit) * 0.15;
    p.y += p.vy + Math.sin(p.orbit) * 0.15;

    p.size *= 0.992;

    if (p.life <= 0 || p.size <= 0.2) {
      skateParticles.splice(i, 1);
    }
  }
}

function drawSkateParticles(ctx) {
  if (!skateParticles.length) return;

  ctx.save();

  for (const p of skateParticles) {
    const alpha = Math.max(0, p.life / p.maxLife);

    ctx.globalAlpha = alpha;

    // núcleo brillante
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.glow;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // aura exterior
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.glow * 1.4;
    ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// =============================
// 🌍 AMBIENTE SYSTEM (inicio)
// =============================
let ambienteObjetos = [];
let ambienteImagenesCache = {};
const AMBIENTE_IMG_CACHE_MAX = 60;
const AMBIENTE_IMG_CACHE_TTL = 30000; // 30 segundos sin uso
let ambienteAudioCache = {};
const AMBIENTE_AUDIO_CACHE_MAX = 20;
const AMBIENTE_AUDIO_CACHE_TTL = 45000; // 45 segundos sin uso
let ambienteViewX = 0;
let ambienteViewY = 0;

async function cargarAmbiente() {
  const res = await fetch("./world.JSON/ambiente.json");
  const data = await res.json();

  const lista = Array.isArray(data) ? data : (data.objetos || []);

  ambienteObjetos = lista.map(obj => ({
    ...obj,
    frameActual: 0,
    frameTimer: 0,
    frameDuration: 90,
    audio: null,
    audioPlaying: false
  }));

  //console.log("Ambiente cargado:", ambienteObjetos);
}
// =============================
// 🌍 AMBIENTE SYSTEM (final)
// =============================

let darknessCanvas = null;
let darknessCtx = null;

// =============================
// 🌍 LOGICA ITEM BLOQUES DE ARCILLA (inicio)
// =============================
window.particulasArcillaActivas = [];

const BLOQUE_ARCILLA_W = 64;
const BLOQUE_ARCILLA_H = 64;
const BLOQUE_ARCILLA_PDR = 12;
// =============================
// 🌍 LOGICA ITEM BLOQUES DE ARCILLA (FIN)
// =============================

// ===============================
//-----MetaMap (inicio)
// ===============================
function ensureMetaMapCSS() {
  if (document.getElementById("metamap-style-link")) return;

  const link = document.createElement("link");
  link.id = "metamap-style-link";
  link.rel = "stylesheet";
  link.href = "../styles/metaMapStyle.css";

  document.head.appendChild(link);
}

function openMetaMap() {

  let metaMapRafId = null;
  let metaMapNeedsRender = false;

  function requestMetaMapRender() {
    if (metaMapRafId !== null) return;

    metaMapRafId = requestAnimationFrame(() => {
      metaMapRafId = null;

      if (!document.getElementById("metamap-overlay")) return;
      if (!metaMapNeedsRender) return;

      metaMapNeedsRender = false;
      render();
    });
  }

  ensureMetaMapCSS();
  //console.log("Abrir MetaMap en index.html");

  if (document.getElementById("metamap-overlay")) return;

  const MAP_SRC = globalMap;
  const WORLD_W = WORLD_W_GLOBAL;
  const WORLD_H = WORLD_H_GLOBAL;

  const playerX = (window.player && typeof window.player.x === "number") ? window.player.x : userPostX;
  const playerY = (window.player && typeof window.player.y === "number") ? window.player.y : userPostY;

  wrapEl.insertAdjacentHTML(
    "beforeend",
    `
      <div id="metamap-overlay">
        <div id="metamap-panel">
          <div id="metamap-header">
            <div id="metamap-title">MetaMap</div>
            <div id="metamap-header-right">
              <button id="metamap-zoom-out" class="metamap-btn" type="button" aria-label="Alejar">-</button>
              <button id="metamap-zoom-in" class="metamap-btn" type="button" aria-label="Acercar">+</button>
              <button id="metamap-close" class="metamap-btn" type="button" aria-label="Cerrar">✕</button>
            </div>
          </div>

          <div id="metamap-viewport">
            <img id="metamap-canvas" src="${MAP_SRC}" alt="Mapa del mundo">
            <div id="metamap-player"></div>
            <div id="metamap-mission">➤</div>
          </div>
        </div>
      </div>
    `
  );

  const overlay = document.getElementById("metamap-overlay");
  const panel = document.getElementById("metamap-panel");
  const viewport = document.getElementById("metamap-viewport");
  const mapEl = document.getElementById("metamap-canvas");
  const playerEl = document.getElementById("metamap-player");
  const missionEl = document.getElementById("metamap-mission");

  const starterMarkers = [];

  const closeBtn = panel.querySelector("#metamap-close");
  const zoomInBtn = panel.querySelector("#metamap-zoom-in");
  const zoomOutBtn = panel.querySelector("#metamap-zoom-out");

  const state = {
    zoom: 1,
    minZoom: 1,
    maxZoom: 4,
    offsetX: 0,
    offsetY: 0,
    dragStartX: 0,
    dragStartY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    dragging: false,
    pointerId: null,
    mapBaseW: 0,
    mapBaseH: 0,
    playerX,
    playerY
  };

  function clampOffsets() {
    const scaledW = state.mapBaseW * state.zoom;
    const scaledH = state.mapBaseH * state.zoom;

    const minX = Math.min(0, viewport.clientWidth - scaledW);
    const minY = Math.min(0, viewport.clientHeight - scaledH);

    state.offsetX = Math.min(0, Math.max(minX, state.offsetX));
    state.offsetY = Math.min(0, Math.max(minY, state.offsetY));
  }

  function syncStarterMissionMarkers() {
    starterMarkers.forEach(obj => obj.el.remove());
    starterMarkers.length = 0;

    const hasActiveMission = !!window.missionSystem?.activeMissionId;
    if (hasActiveMission) return;

    const npcList = window.npcs || [];
    const starters = npcList.filter(n => n.missionStarter);

    for (const npc of starters) {
      viewport.insertAdjacentHTML(
        "beforeend",
        `<div class="metamap-starter-marker">${(() => {
          const missionStarter = window.missionsData?.missions?.find(
            m => m.pasos?.[0]?.npcId === npc.id
          );

          if (
            missionStarter &&
            window.missionSystem?.completedMissionIds?.includes(missionStarter.id)
          ) {
            return "⚝";
          }

          return "?";
        })()}</div>`
      );

      const marker = viewport.querySelector(".metamap-starter-marker:last-of-type");

      starterMarkers.push({
        el: marker,
        npc
      });
    }
  }

  function getPlayerMarkerPos() {
    const livePlayerX = (window.player && typeof window.player.x === "number") ? window.player.x : state.playerX;
    const livePlayerY = (window.player && typeof window.player.y === "number") ? window.player.y : state.playerY;

    const px = (livePlayerX / WORLD_W) * state.mapBaseW;
    const py = (livePlayerY / WORLD_H) * state.mapBaseH;

    return {
      x: state.offsetX + (px * state.zoom),
      y: state.offsetY + (py * state.zoom)
    };
  }

  function getMissionMarkerPos() {
    let targetX = null;
    let targetY = null;

    const activeMissionId = window.missionSystem?.activeMissionId || null;
    const missions = window.missionsData?.missions || [];
    const npcList = window.npcs || [];

    const activeMission = activeMissionId
      ? missions.find(m => m.id === activeMissionId)
      : null;

    if (activeMission) {
      const stepIndex = window.missionSystem.activeStepIndexByMission?.[activeMissionId] ?? 0;
      const step = activeMission.pasos?.[stepIndex];

      if (step?.verificador?.posicion) {
        targetX = Number(step.verificador.posicion.x) || 0;
        targetY = Number(step.verificador.posicion.y) || 0;
      } else if (
        step &&
        (
          step.tipo === "hablar_npc" ||
          step.tipo === "hablar_npc_entrega"
        ) &&
        step.npcId
      ) {
        const npc = npcList.find(n => n.id === step.npcId);
        if (npc) {
          targetX = npc.x;
          targetY = npc.y;
        }
      }
    }

    if (targetX === null || targetY === null) return null;

    const px = (targetX / WORLD_W) * state.mapBaseW;
    const py = (targetY / WORLD_H) * state.mapBaseH;

    return {
      x: state.offsetX + (px * state.zoom),
      y: state.offsetY + (py * state.zoom)
    };
  }

  function render() {
    mapEl.style.width = `${state.mapBaseW}px`;
    mapEl.style.height = `${state.mapBaseH}px`;
    mapEl.style.transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.zoom})`;

    const pos = getPlayerMarkerPos();
    playerEl.style.transform = `translate(${pos.x - 9}px, ${pos.y - 9}px)`;

    const missionPos = getMissionMarkerPos();

    if (missionPos) {
      missionEl.style.display = "block";
      missionEl.style.transform = `translate(${missionPos.x - 10}px, ${missionPos.y - 10}px) rotate(90deg)`;
    } else {
      missionEl.style.display = "none";
    }

    if (!window.missionSystem?.activeMissionId && starterMarkers.length === 0 && (window.npcs || []).length > 0) {
      syncStarterMissionMarkers();
    }

    const hasActiveMission = !!window.missionSystem?.activeMissionId;

    for (const markerObj of starterMarkers) {
      const npc = markerObj.npc;
      const markerEl = markerObj.el;

      if (hasActiveMission) {
        markerEl.style.display = "none";
        continue;
      }

      const px = (npc.x / WORLD_W) * state.mapBaseW;
      const py = (npc.y / WORLD_H) * state.mapBaseH;

      const x = state.offsetX + (px * state.zoom);
      const y = state.offsetY + (py * state.zoom);

      markerEl.style.display = "block";
      markerEl.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
    }
  }

  function fitMapToViewport() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const scaleX = vw / WORLD_W;
    const scaleY = vh / WORLD_H;
    const fitScale = Math.min(scaleX, scaleY);

    state.mapBaseW = Math.floor(WORLD_W * fitScale);
    state.mapBaseH = Math.floor(WORLD_H * fitScale);

    state.minZoom = 1;
    state.zoom = 1;

    state.offsetX = Math.floor((vw - state.mapBaseW) / 2);
    state.offsetY = Math.floor((vh - state.mapBaseH) / 2);

    clampOffsets();
    scheduleMetaMapRender();
  }

  function zoomAt(nextZoom) {
    const oldZoom = state.zoom;
    const newZoom = Math.max(state.minZoom, Math.min(state.maxZoom, nextZoom));
    if (newZoom === oldZoom) return;

    const cx = viewport.clientWidth / 2;
    const cy = viewport.clientHeight / 2;

    const worldX = (cx - state.offsetX) / oldZoom;
    const worldY = (cy - state.offsetY) / oldZoom;

    state.zoom = newZoom;
    state.offsetX = cx - (worldX * state.zoom);
    state.offsetY = cy - (worldY * state.zoom);

    clampOffsets();
    scheduleMetaMapRender();
  }

  function startDrag(e) {
    if (e.target.closest("#metamap-header")) return;
    state.dragging = true;
    state.pointerId = e.pointerId;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    state.startOffsetX = state.offsetX;
    state.startOffsetY = state.offsetY;
    viewport.classList.add("dragging");
    viewport.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function moveDrag(e) {
    if (!state.dragging || e.pointerId !== state.pointerId) return;

    const dx = e.clientX - state.dragStartX;
    const dy = e.clientY - state.dragStartY;

    state.offsetX = state.startOffsetX + dx;
    state.offsetY = state.startOffsetY + dy;

    clampOffsets();
    scheduleMetaMapRender();
    e.preventDefault();
  }

  function endDrag(e) {
    if (state.pointerId !== null && e.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    viewport.classList.remove("dragging");
  }

  mapEl.addEventListener("load", () => {
    fitMapToViewport();
    syncStarterMissionMarkers();
    scheduleMetaMapRender();
  });

  if (mapEl.complete) {
    fitMapToViewport();
    syncStarterMissionMarkers();
    scheduleMetaMapRender();
  }

  closeBtn.addEventListener("click", closeMetaMap);
  closeBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    closeMetaMap();
  }, { passive: false });

  zoomInBtn.addEventListener("click", () => zoomAt(state.zoom + 0.5));
  zoomOutBtn.addEventListener("click", () => zoomAt(state.zoom - 0.5));

  zoomInBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    zoomAt(state.zoom + 0.5);
  }, { passive: false });

  zoomOutBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    zoomAt(state.zoom - 0.5);
  }, { passive: false });

  viewport.addEventListener("pointerdown", startDrag, { passive: false });
  viewport.addEventListener("pointermove", moveDrag, { passive: false });
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("pointerleave", endDrag);

  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoomAt(state.zoom + (e.deltaY < 0 ? 0.25 : -0.25));
  }, { passive: false });

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      closeMetaMap();
    }
  }, { passive: false });

  function scheduleMetaMapRender() {
    metaMapNeedsRender = true;
    requestMetaMapRender();
  }

  function closeMetaMap() {
    if (metaMapRafId !== null) {
      cancelAnimationFrame(metaMapRafId);
      metaMapRafId = null;
    }

    metaMapNeedsRender = false;

    window.removeEventListener("keydown", escHandler);
    window.removeEventListener("resize", resizeHandler);

    overlay.remove();
  }

  function escHandler(e) {
    if (e.key === "Escape") {
      closeMetaMap();
    }
  }

  function resizeHandler() {
    if (!document.getElementById("metamap-overlay")) return;
    fitMapToViewport();
    scheduleMetaMapRender();
  }

  window.addEventListener("keydown", escHandler);
  window.addEventListener("resize", resizeHandler);

  scheduleMetaMapRender();
}
// ===============================
//-----MetaMap (fin)
// ===============================

window.addEventListener("message", (event) => {
  const data = event.data;

  if (!data || data.source !== "metafon") return;

  switch (data.action) {
    case "openCameraAR":
      openCameraAR();
      break;

    case "openMetaMap":
      openMetaMap();
      break;
  }
});
// ================================================
// Función llamado de metafon.html a index.html (fin)
// ================================================

const boxButtonsITems = document.querySelector('.box-buttons-items');

const missionsButton = document.getElementById('misions');
const novedadesButton = document.getElementById('novedades');
const iqButton = document.getElementById('iq');
const inventarioButton = document.getElementById('inventario');
const settingButton = document.getElementById('setting');

const joy = document.getElementById("joy");
const joyStick = document.getElementById("joyStick");

/*
missionsButton.addEventListener('click',function(){
    //console.log('panel de misiones abierto')
});
*/

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
    //console.log("Seleccionar avatar");
    gameMode = "checking"; // aún no juega
    return;
  }

  // 🟢 3. Tiene todo correcto
  ////console.log("Que comience el juego.");
  gameMode = "playing";
}

function canRunEnemyLogic() {
  return (
    gameMode === "playing" &&
    !!avatar &&
    !!profession &&
    !gameOverActive &&
    pdv > 0
  );
}
/*Función de validación cheking (fin) */

//-----------------------------------------------------------------------------
//Función de interfaz de items (inicio)
//-----------------------------------------------------------------------------

//Función para inventario de cabesera
// =============================
// UI Interfas (DOM)
// =============================
let interfaceOpen = false;
let interfasEl = null;

const wrapEl = document.getElementById("wrap");

// Títulos por sección
const UI_TITLES = {
  misions: "Misiones",
  novedades: "Novedades",
  iq: "Nivel IQ",
  inventario: "Inventario",
  setting: "Configuración",
};

// Helper: evita doble disparo (pointerdown + click)
const UI_CLICK_LOCK_MS = 350;
let uiLastOpenAt = 0;

function shouldLockOpen() {
  const now = performance.now();
  if (now - uiLastOpenAt < UI_CLICK_LOCK_MS) return true;
  uiLastOpenAt = now;
  return false;
}

// Helper: bind seguro (desktop + móvil)
function bindUIOpen(btn, type) {
  if (!btn) return;

  // Desktop (mouse)
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (shouldLockOpen()) return;
    openInterfas(type);
  });

  // Touch / Pen (mejor respuesta en móvil)
  btn.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      if (shouldLockOpen()) return;
      openInterfas(type);
    },
    { passive: false }
  );
}

function buildInterfas(type) {
  const title = UI_TITLES[type] || "Panel";
  let bodyHTML = "";

  switch (type) {
    case "novedades":
      playUISound();
      bodyHTML = buildNovedadesHTML(NOVEDADES);
      break;

    case "setting":
      playUISound();
      bodyHTML = buildSettingHTML();
      break;

    case "inventario":
      playUISound();
      bodyHTML = buildInventarioHTML();
      break;

    case "iq":
      playUISound();
      bodyHTML = buildIQPanelHTML();
      break;

    case "misions":
      playUISound();
      bodyHTML = window.buildMissionsHTML();
      break;

    default:
      bodyHTML = `
        <div class="ui-chip">Panel: ${title}</div>
        <div class="ui-content">
          <div class="ui-text">
            Aquí va tu UI real (listas, tabs, cards, etc.)
          </div>
          <div class="ui-box">
            <div class="ui-box-title">Próximamente</div>
            <div class="ui-box-text">
              Este panel estará en estilo pixel y modular.
            </div>
          </div>
        </div>
      `;
      break;
  }

  return `
    <div
      id="container-interfas"
      class="container-interfas"
      data-panel="${type}"
    >
      <div class="ui-header">
        <div class="ui-title">${title}</div>
        <button class="ui-close" type="button" aria-label="Cerrar">X</button>
      </div>

      <div class="ui-body">
        ${bodyHTML}
      </div>
    </div>
  `;
}

function openInterfas(type) {
  if (interfaceOpen && interfasEl) {
    interfasEl.dataset.panel = type;

    const title = UI_TITLES[type] || "Panel";
    const titleEl = interfasEl.querySelector(".ui-title");
    const bodyEl = interfasEl.querySelector(".ui-body");

    if (titleEl) titleEl.textContent = title;

    if (bodyEl) {
      let bodyHTML = "";

      switch (type) {
        case "misions":
          bodyHTML = window.buildMissionsHTML();
          break;

        case "novedades":
          bodyHTML = buildNovedadesHTML(NOVEDADES);
          break;

        case "setting":
          bodyHTML = buildSettingHTML();
          break;

        case "inventario":
          bodyHTML = buildInventarioHTML();
          break;

        case "iq":
          bodyHTML = buildIQPanelHTML();
          break;

        default:
          bodyHTML = `
            <div class="ui-chip">Panel: ${title}</div>
            <div class="ui-content">
              <div class="ui-text">
                Aquí va tu UI real (listas, tabs, cards, etc.)
              </div>
              <div class="ui-box">
                <div class="ui-box-title">Próximamente</div>
                <div class="ui-box-text">
                  Este panel estará en estilo pixel y modular.
                </div>
              </div>
            </div>
          `;
          break;
      }

      bodyEl.innerHTML = bodyHTML;
    }

    return;
  }

  interfaceOpen = true;

  wrapEl.insertAdjacentHTML("beforeend", buildInterfas(type));
  interfasEl = document.getElementById("container-interfas");

  if (!interfasEl) {
    interfaceOpen = false;
    return;
  }

  const closeBtn = interfasEl.querySelector(".ui-close");

  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeInterfas();
  });

  closeBtn?.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeInterfas();
    },
    { passive: false }
  );

  interfasEl.addEventListener(
    "pointerdown",
    (e) => {
      e.stopPropagation();
    },
    { passive: true }
  );
}

function closeInterfas() {
  interfaceOpen = false;

  if (interfasEl && interfasEl.parentNode) {
    interfasEl.parentNode.removeChild(interfasEl);
  }
  interfasEl = null;
}

document.addEventListener("pointerdown", (e) => {
  if (!interfaceOpen || !interfasEl) return;

  const clickDentroDelPanel = e.target.closest("#container-interfas");
  const clickEnBotonCabecera = e.target.closest(
    "#misions, #novedades, #iq, #inventario, #setting"
  );
  const clickEnPopupCombinaciones = e.target.closest(
    "#craft-info-popup-overlay, #craft-info-popup-box"
  );

  if (clickDentroDelPanel) return;
  if (clickEnBotonCabecera) return;
  if (clickEnPopupCombinaciones) return;

  closeInterfas();
}, true);

// Escape para cerrar
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && interfaceOpen) closeInterfas();
});

// Bind de botones
bindUIOpen(missionsButton, "misions");
bindUIOpen(novedadesButton, "novedades");
bindUIOpen(iqButton, "iq");
bindUIOpen(inventarioButton, "inventario");
bindUIOpen(settingButton, "setting");

//-----------------------------------------------------------------------------
//Función de interfaz de items (fin)
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//lógica / Interfaz nivel IQ(inicio)
//-----------------------------------------------------------------------------
// =============================
// NIVELES IQ HISTÓRICOS
// =============================
const IQ_LEVELS = [

  {
    name: "Johann Wolfgang von Goethe",
    history: "Escritor, poeta y científico alemán, conocido por su gran versatilidad intelectual.",
    iq: 15
  },

  {
    name: "Leonardo da Vinci",
    history: "Artista, inventor y científico renacentista, símbolo del genio universal.",
    iq: 20
  },

  {
    name: "Isaac Newton",
    history: "Físico y matemático inglés, clave en la ciencia moderna con sus leyes del movimiento.",
    iq: 40
  },

  {
    name: "Albert Einstein",
    history: "Físico teórico alemán, conocido por la teoría de la relatividad.",
    iq: 65
  },

  {
    name: "Galileo Galilei",
    history: "Astrónomo y físico italiano, importante en la revolución científica.",
    iq: 75
  },

  {
    name: "Nikola Tesla",
    history: "Ingeniero e inventor serbio-americano, conocido por su trabajo con la corriente alterna.",
    iq: 90
  },

  {
    name: "Hypatia de Alejandría",
    history: "Filósofa, matemática y astrónoma de la antigua Alejandría, famosa por su conocimiento.",
    iq: 112
  },

  {
    name: "William James Sidis",
    history: "Niño prodigio con habilidades matemáticas y lingüísticas extraordinarias.",
    iq: 135
  },

  {
    name: "Immanuel Kant",
    history: "Filósofo alemán, pionero en ética y epistemología, influyente en la filosofía moderna.",
    iq: 168
  },

  {
    name: "René Descartes",
    history: "Filósofo y matemático francés, conocido como el padre de la filosofía moderna.",
    iq: 180
  },

  {
    name: "Terence Tao",
    history: "Matemático australiano, conocido por sus contribuciones a diversas áreas de la matemática.",
    iq: 190
  },

  {
    name: "Christopher Hirata",
    history: "Astrofísico y niño prodigio, conocido por sus contribuciones a la cosmología.",
    iq: 200
  },

  {
    name: "Ludwig Wittgenstein",
    history: "Filósofo austríaco, destacado en la filosofía del lenguaje y de la mente.",
    iq: 228
  },

  {
    name: "Marilyn vos Savant",
    history: "Escritora y columnista, registrada como la persona con el IQ más alto en el Libro Guinness.",
    iq: 240
  },

  {
    name: "John Stuart Mill",
    history: "Filósofo y economista inglés, importante defensor del liberalismo y la ética utilitarista.",
    iq: 250
  },

  {
    name: "Rey Salomón",
    history: "Reconocido en las escrituras por su sabiduría extraordinaria y 'divina'.",
    iq: 700
  }

];


// Devuelve el genio correspondiente según IQ (comparativo por umbrales)
function getGeniusByIQ(iqValue) {
  const iq = Math.max(0, Math.min(maxIQ, Number(iqValue) || 0));

  // Asegura orden por iq ascendente (por si luego lo editas)
  const sorted = [...IQ_LEVELS].sort((a, b) => a.iq - b.iq);

  let best = sorted[0];
  for (const g of sorted) {
    if (iq >= g.iq) best = g;
  }
  return best;
}

// Para mostrar una descripción corta (evita textos gigantes)
function cutText(s, max = 140) {
  const t = String(s ?? "");
  return t.length > max ? (t.slice(0, max - 3) + "...") : t;
}

// Busca profesión por id (profession viene como id)
function getProfessionInfo(profId) {
  const p = professions.find(x => x.id === profId);
  if (!p) return { name: "Sin profesión", description: "Aún no se ha seleccionado profesión." };
  return { name: p.name, description: p.description };
}

// Toma avatar desde la VARIABLE avatar (spritesheet) y lo convierte a miniatura usando avatarId del user.
// Nota: avatar (variable) es spritesheet; para UI necesitamos el "avatar" (miniatura)
function getSelectedAvatarForUI() {
  const avatarId = localStorage.getItem("avatarId"); // solo para mapear miniatura
  const found = characters.find(c => c.id === avatarId);
  if (found) return found;

  // fallback
  return characters[0];
}

// Render lista top 15 (con comparativo automático)
function buildTop15HTML(list) {
  const sorted = [...list].sort((a, b) => b.iq - a.iq).slice(0, 15);

  const items = sorted.map(p => {
    const av = characters.find(c => c.id === p.avatarId) || characters[0];
    const genius = getGeniusByIQ(p.iq);

    return `
      <div class="ui-iq-top-item">
        <img class="ui-iq-top-thumb" src="${av.avatar}" alt="${p.name}">
        <div>
          <p class="ui-iq-top-name">${p.name}</p>
          <p class="ui-iq-top-meta">IQ ${p.iq} comparado con ${genius.name}</p>
          <p class="ui-iq-top-history">${cutText(genius.history, 140)}</p>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="ui-iq-top-title">Top 15 jugadores con nivel IQ más alto</div>
    <div class="ui-iq-top-list">${items}</div>
  `;
}

// Render principal del panel IQ (tarjeta presentación + comparativo + top15)
function buildIQPanelHTML() {
  // Usa TUS variables (no localStorage directo)
  const userName = username || "Jugador";
  const userAvatarSprite = avatar; // se mantiene por compatibilidad, pero UI usa miniatura
  const profId = profession;

  const profInfo = getProfessionInfo(profId);
  const avatarUI = getSelectedAvatarForUI(); // miniatura + profile

  // Comparativo IQ actual del usuario
  const genius = getGeniusByIQ(IQuser);

  return `
    <div class="ui-iq-root">

      <div class="ui-iq-main-title">Nivel IQ del jugador</div>

      <div class="ui-iq-card-row">

        <!-- Tarjeta avatar / presentación -->
        <div class="ui-iq-card ui-iq-avatar-box">
          <img class="ui-iq-avatar-img" src="${avatarUI.avatar}" alt="${avatarUI.profile}">
          <div class="ui-iq-avatar-name">${avatarUI.profile}</div>
          <div class="ui-iq-userline">${userName}</div>
        </div>

        <!-- Tarjeta comparativo IQ + profesión -->
        <div class="ui-iq-card">

          <p class="ui-iq-section-title">Tu IQ actual</p>
          <p class="ui-iq-strong">${IQuser} / 250</p>
          <!--<p class="ui-iq-strong">${IQuser} / ${maxIQ}</p>-->

          <p class="ui-iq-section-title">Tu nivel IQ se compara al del genio</p>
          <p class="ui-iq-strong">${genius.name}</p>
          <p class="ui-iq-line">${genius.history}</p>

          <div class="ui-iq-prof">
            <p class="ui-iq-section-title">Profesión</p>
            <p class="ui-iq-strong">${profInfo.name}</p>
            <p class="ui-iq-line">${profInfo.description}</p>
          </div>

        </div>

      </div>

      ${buildTop15HTML(TOP15_PLAYERS)}

    </div>
  `;
}
//-----------------------------------------------------------------------------
//lógica / Interfaz nivel IQ(fi)
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//lógica para las notificaciones (inicio)
//-----------------------------------------------------------------------------

// Máximo 64 caracteres
function truncate64(s) {
  const t = String(s ?? "");
  return t.length > 64 ? (t.slice(0, 61) + "...") : t;
}

function buildNovedadesHTML(list) {
  if (!list || list.length === 0) {
    return `
      <div class="ui-content">
        <div class="ui-text">No hay notificaciones nuevas.</div>
      </div>
    `;
  }

  const items = list.map((n, i) => `
    <li class="ui-news-item">
      <div class="ui-news-thumb" aria-hidden="true"></div>
      <div>
        <p class="ui-news-text">${truncate64(n.text)}</p>
        <span class="ui-news-tag">${n.tag}</span>
      </div>
    </li>
  `).join("");

  return `
    <div class="ui-content">
      <ul class="ui-news-list">
        ${items}
      </ul>
    </div>
  `;
}

// Badge: mostrar/ocultar + número
function setNovedadesCount(count, { animate = false } = {}) {
  const n = Math.max(0, Number(count) || 0);

  if (!novedadesButton) return;

  if (n <= 0) {
    novedadesButton.classList.remove("has-badge", "badge-pop");
    novedadesButton.removeAttribute("data-count");
    return;
  }

  novedadesButton.setAttribute("data-count", String(n));
  novedadesButton.classList.add("has-badge");

  if (animate) {
    novedadesButton.classList.add("badge-pop");
    setTimeout(() => {
      novedadesButton.classList.remove("badge-pop");
    }, 1000);
  }
}

//-----------------------------------------------------------------------------
//lógica para las notificaciones (fin)
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//lógica Visual de Setting (inicio)
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// SETTINGS (MVP FRONTEND / listo para WP)
//-----------------------------------------------------------------------------

// Keys localStorage (solo settings)
const LS_SETTINGS = {
  volume: "eny_settings_volume",
  sfxVolume: "eny_settings_sfx_volume",
  ambientIndex: "eny_settings_ambient_index",
};

const AMBIENT_TRACK = {
  name: "Ambiente mapa 1",
  src: "../assets/song/melodys/ambienteMapa1.mp3"
};

let ambientAudio = null;

function ensureAmbientAudio() {
  if (ambientAudio) return ambientAudio;

  ambientAudio = new Audio(AMBIENT_TRACK.src);
  ambientAudio.loop = true;
  ambientAudio.preload = "auto";
  ambientAudio.volume = getSettingVolume();

  return ambientAudio;
}

function applyAmbientVolume() {
  const audio = ensureAmbientAudio();
  audio.volume = getSettingVolume();
}

function syncAmbientMusicState({ restart = false } = {}) {
  const audio = ensureAmbientAudio();
  applyAmbientVolume();

  if (!getAmbientEnabled()) {
    audio.pause();
    audio.currentTime = 0;
    return;
  }

  if (restart) {
    audio.currentTime = 0;
  }

  audio.play().catch(() => { });
}

document.addEventListener("click", unlockAudioAndPlay);
document.addEventListener("touchstart", unlockAudioAndPlay);
document.addEventListener("keydown", unlockAudioAndPlay);

let audioUnlocked = false;

function unlockAudioAndPlay() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  syncAmbientMusicState();

  document.removeEventListener("click", unlockAudioAndPlay);
  document.removeEventListener("touchstart", unlockAudioAndPlay);
  document.removeEventListener("keydown", unlockAudioAndPlay);
}

function playAmbientMusic() {
  syncAmbientMusicState();
}

function pauseAmbientMusic() {
  if (!ambientAudio) return;
  ambientAudio.pause();
}

let TUTORIAL_SLIDES = [];

async function cargarTutorialDesdeJSON() {
  try {
    const res = await fetch("../tutorial.json", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    let slides = [];

    if (Array.isArray(data)) {
      slides = data;
    } else if (Array.isArray(data.slides)) {
      slides = data.slides;
    }

    TUTORIAL_SLIDES = slides
      .map(slide => ({
        img: slide.img || slide.image || null,
        video: slide.video || null,
        text: slide.text || slide.descripcion || ""
      }))
      .filter(slide => slide.img || slide.video);

    console.log("Tutorial cargado:", TUTORIAL_SLIDES);

    if (!TUTORIAL_SLIDES.length) {
      TUTORIAL_SLIDES = [
        { img: "../assets/tutorial/slide1.png", text: "Tutorial no disponible." }
      ];
    }

  } catch (error) {
    console.error("Error cargando tutorial.json:", error);

    TUTORIAL_SLIDES = [
      { img: "../assets/tutorial/slide1.png", text: "Tutorial no disponible." }
    ];
  }
}

// Estado UI tutorial (solo memoria)
let tutorialIndex = 0;

// Helpers storage
function getSettingVolume() {
  const raw = localStorage.getItem(LS_SETTINGS.volume);

  if (raw === null || raw === "" || raw === "null" || raw === "undefined") {
    return 0.8;
  }

  const v = Number(raw);
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.8;
}
function setSettingVolume(v) {
  const n = Math.max(0, Math.min(1, Number(v) || 0));
  localStorage.setItem(LS_SETTINGS.volume, String(n));
  return n;
}

function getAmbientEnabled() {
  const v = localStorage.getItem(LS_SETTINGS.ambientIndex);
  return v !== "0";
}
function setAmbientEnabled(value) {
  const enabled = value ? "1" : "0";
  localStorage.setItem(LS_SETTINGS.ambientIndex, enabled);
  return enabled === "1";
}

function factoryResetSettings() {
  Object.values(LS_SETTINGS).forEach(k => localStorage.removeItem(k));
  // aquí puedes agregar más keys de settings en el futuro
}

// Fullscreen (best effort)
async function toggleFullscreen() {
  const el = document.documentElement;

  const isFs =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  try {
    if (!isFs) {
      const req =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;

      if (req) {
        await req.call(el);
      } else {
        showPopupFeedback({
          title: "No disponible",
          message: "Pantalla completa no disponible en este navegador.",
          type: "warning",
          duration: 6000
        });
      }
    } else {
      const exit =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;

      if (exit) {
        await exit.call(document);
      }
    }
  } catch (e) {
    console.warn("Fullscreen error:", e);

    showPopupFeedback({
      title: "Pantalla completa",
      message: "Función limitada en este dispositivo o navegador.",
      type: "warning",
      duration: 6000
    });
  }
}

// Render Setting raíz
function buildSettingHTML() {
  const vol = getSettingVolume();
  const sfxVol = getSettingSfxVolume();
  const ambientEnabled = getAmbientEnabled();

  return `
    <div class="ui-settings-root">

      <div class="ui-settings-section">
        <p class="ui-settings-title">Volumen música ambiente</p>
        <input class="ui-slider" type="range" min="0" max="1" step="0.01"
          value="${vol}"
          data-action="set-volume">
        <p class="ui-small ui-setting-music-value">Volumen actual: ${Math.round(vol * 100)}%</p>
      </div>

      <div class="ui-settings-section">
        <p class="ui-settings-title">Volumen efectos de sonido</p>
        <input class="ui-slider" type="range" min="0" max="1" step="0.01"
          value="${sfxVol}"
          data-action="set-sfx-volume">
        <p class="ui-small ui-setting-sfx-value">Efectos actuales: ${Math.round(sfxVol * 100)}%</p>
      </div>

      <div class="ui-settings-section">
        <p class="ui-settings-title">Música ambiente</p>
        <div class="ui-settings-row">
          <button class="ui-btn" data-action="toggle-ambient">
            ${ambientEnabled ? "Apagar música" : "Encender música"}
          </button>
        </div>
        <p class="ui-small">Pista: ${AMBIENT_TRACK.name}</p>
      </div>

      <div class="ui-settings-section">
        <p class="ui-settings-title">Sistema</p>
        <div class="ui-settings-row">
          <button class="ui-btn" data-action="fullscreen">Pantalla completa</button>
          <button class="ui-btn" data-action="open-tutorial">Tutorial</button>
          <button class="ui-btn ui-btn-danger" data-action="factory-reset">Estado de fábrica</button>
        </div>
        <p class="ui-small">Estado de fábrica borra solo settings guardados.</p>
      </div>

      <div class="ui-settings-section">
        <p class="ui-settings-title">Enlaces</p>
        <div class="ui-settings-row">
          <button class="ui-btn" data-action="open-link" data-link="terms">Términos</button>
          <button class="ui-btn" data-action="open-link" data-link="privacy">Privacidad</button>
          <button class="ui-btn" data-action="open-link" data-link="donations">Donaciones</button>
          <button class="ui-btn" data-action="open-link" data-link="support">Soporte</button>
        </div>
      </div>

    </div>
  `;
}

//Render Inventario
function buildInventarioHTML() {
  const avatarId = localStorage.getItem("avatarId");
  const avatarSeleccionado = characters.find(c => c.id === avatarId) || characters[0];
  const avatarSrc = avatarSeleccionado?.avatar || "";
  const avatarName = username || "Jugador";

  const slotsInventario = Array.from({ length: 16 }, (_, i) => {
    const item = window.inventarioUser[i];

    if (item) {
      return `
        <div class="ui-inv-slot has-item" data-slot="${i}" data-slot-index="${i}">
          <img class="ui-inv-item-img" src="${item.imagen}" alt="${item.nombre_item}">
          <span class="ui-inv-item-count">${item.cantidad || 1}</span>
        </div>
      `;
    }

    return `<div class="ui-inv-slot" data-slot="${i}" data-slot-index="${i}"></div>`;
  }).join("");

  const slotsCombinar = combinacionSlots.map((item, i) => {
    if (item) {
      return `
        <div class="ui-inv-combine-slot has-item" data-combine-slot="${i}">
          <img class="ui-inv-item-img" src="${item.imagen}" alt="${item.nombre_item}">
          <span class="ui-inv-item-count">${item.cantidad || 1}</span>
        </div>
      `;
    }

    return `<div class="ui-inv-combine-slot" data-combine-slot="${i}"></div>`;
  }).join("");

  const resultadoHTML = combinacionResultado
    ? `
      <img class="ui-inv-item-img" src="${combinacionResultado.imagen}" alt="${combinacionResultado.nombre_item}">
      <span class="ui-inv-result-label">${combinacionResultado.nombre_item}</span>
    `
    : `<span class="ui-inv-result-label">Crear ITEM</span>`;

  const equipHTML = (window.equipSlots || [null, null]).map((item, i) => {
    if (item) {
      return `
      <div class="ui-inv-equip-slot has-item" data-equip-slot="${i}">
        <img class="ui-inv-item-img" src="${item.imagen}" alt="${item.nombre_item}">
        <span class="ui-inv-item-count">${item.agotable ? (item.usos_restantes ?? item.usos ?? 1) : 1}</span>
      </div>
    `;
    }

    return `
    <div class="ui-inv-equip-slot" data-equip-slot="${i}">
      <span class="ui-inv-equip-label">Slot ${i + 1}</span>
    </div>
  `;
  }).join("");

  return `
    <div class="ui-inv-root">

      <div class="ui-inv-top">
        <div class="ui-inv-avatar-panel">
          <div class="ui-inv-avatar-circle">
            <img class="ui-inv-avatar-img" src="${avatarSrc}" alt="${avatarName}">
          </div>
        </div>

        <div class="ui-inv-top-right">
          ${equipHTML}
        </div>
      </div>

      <div class="ui-inv-grid-wrap">
        <div class="ui-inv-grid">
          ${slotsInventario}
        </div>
      </div>

      <div class="ui-inv-combine-wrap">
        <div class="ui-inv-combine-left">
          ${slotsCombinar}
        </div>

        <div class="ui-inv-combine-result ${combinacionResultado ? "has-item" : ""}">
          ${resultadoHTML}
        </div>
      </div>

    </div>
  `;
}

function devolverItemDesdeEquipado(slotIndex) {
  const item = window.equipSlots?.[slotIndex];
  if (!item) return;

  const scrollInventario = getElementScrollState("#container-interfas .ui-body");

  const itemId = item.id ?? item.item_id;
  const esBloqueArcilla = itemId === "bloque_de_arcilla";

  const usosActuales = Number(item.usos ?? 0);
  const desapareceAlAgotarse = item.desaparece_al_agotarse === true;
  const esAgotable = item.agotable === true;

  if (esAgotable && usosActuales <= 0 && desapareceAlAgotarse) {
    window.equipSlots[slotIndex] = null;

    refreshInventarioUI();
    restoreElementScrollState("#container-interfas .ui-body", scrollInventario);
    return;
  }

  const agregado = window.agregarItemAlInventario({
    id: itemId,
    item_id: item.item_id ?? itemId,
    nombre_item: item.nombre_item,
    imagen: item.imagen,
    tipo_item: item.tipo ?? item.tipo_item ?? "",
    agotable: item.agotable === true,
    desaparece_al_agotarse: item.desaparece_al_agotarse === true,
    usos: esBloqueArcilla ? null : (item.usos ?? null),
    usos_maximos: esBloqueArcilla ? null : (item.usos_maximos ?? null),
    cantidad: esBloqueArcilla ? Math.max(1, usosActuales) : 1,
    cuanto_quita_de_vida_al_enemigo: Number(item.cuanto_quita_de_vida_al_enemigo ?? 0) || 0,
  });

  if (!agregado) {
    return;

  }

  window.equipSlots[slotIndex] = null;

  refreshInventarioUI();
  restoreElementScrollState("#container-interfas .ui-body", scrollInventario);
}

window.devolverItemDesdeEquipado = devolverItemDesdeEquipado;

function equiparItemDelInventario(slotIndex) {
  const item = window.inventarioUser?.[slotIndex];
  if (!item) return;

  playtockSound();

  const scrollInventario = getInventarioScrollState();

  const tipoRaw =
    item.tipo_item ??
    item.tipo ??
    item.categoria ??
    item.category ??
    item.clase ??
    item.kind ??
    item.uso ??
    "";

  const tipo = String(tipoRaw).trim().toLowerCase();

  const esEquipable =
    tipo === "arma" ||
    tipo === "equipo" ||
    tipo === "equipo_especial" ||
    tipo === "arma_especial" ||
    tipo === "consumible";

  //console.log("Intentando equipar:", item);
  //console.log("Tipo detectado:", tipo);

  if (!esEquipable) {
    //console.log("Este item no se puede equipar");
    closeInventarioPopup();
    return;
  }

  window.equipSlots = window.equipSlots || [null, null];

  const itemId = item.id ?? item.item_id;
  const esBloqueArcilla = itemId === "bloque_de_arcilla";
  const cantidadInventario = Number(item.cantidad || 1) || 1;

  if (esBloqueArcilla) {
    const slotExistente = window.equipSlots.findIndex(
      slot => slot && (slot.id === "bloque_de_arcilla" || slot.item_id === "bloque_de_arcilla")
    );

    if (slotExistente !== -1) {
      const slot = window.equipSlots[slotExistente];
      slot.usos = Number(slot.usos || 0) + cantidadInventario;
      slot.usos_maximos = Number(slot.usos_maximos || 0) + cantidadInventario;
      slot.cantidad = Number(slot.cantidad || 0) + cantidadInventario;

      window.inventarioUser.splice(slotIndex, 1);
      window.inventarioUser = window.inventarioUser.filter(Boolean);

      closeInventarioPopup();

      refreshInventarioUI({ restoreScroll: true, scrollState: scrollInventario });
      return;
    }
  }

  const slotLibre = window.equipSlots.findIndex(slot => slot === null);
  if (slotLibre === -1) {
    //console.log("No hay espacio en los slots de equipo");
    closeInventarioPopup();
    return;
  }

  const usosEquipado = esBloqueArcilla
    ? cantidadInventario
    : (Number(
      item.usos_restantes ??
      item.usos ??
      item.cantidad_de_usos ??
      item.cantidad_usos ??
      1
    ) || 1);

  const usosMaximosEquipado = esBloqueArcilla
    ? cantidadInventario
    : (Number(
      item.usos_maximos ??
      item.cantidad_de_usos ??
      item.cantidad_usos ??
      item.usos ??
      1
    ) || 1);

  window.equipSlots[slotLibre] = {
    id: itemId,
    item_id: item.item_id ?? itemId,
    nombre_item: item.nombre_item ?? item.nombre ?? "Item",
    imagen: item.imagen ?? item.image ?? "",
    tipo: tipo,
    agotable: item.agotable === true,
    desaparece_al_agotarse: item.desaparece_al_agotarse === true,
    usos: usosEquipado,
    usos_maximos: usosMaximosEquipado,
    cantidad: esBloqueArcilla ? cantidadInventario : 1,
    cuanto_quita_de_vida_al_enemigo: Number(item.cuanto_quita_de_vida_al_enemigo ?? 0) || 0
  };

  if (esBloqueArcilla) {
    window.inventarioUser.splice(slotIndex, 1);
  } else {
    if ((item.cantidad || 1) > 1) {
      item.cantidad -= 1;
    } else {
      window.inventarioUser.splice(slotIndex, 1);
    }
  }

  window.inventarioUser = window.inventarioUser.filter(Boolean);

  closeInventarioPopup();

  refreshInventarioUI({ restoreScroll: true, scrollState: scrollInventario });
}

function ensureCraftInfoPopupStyles() {
  ensureStyleDOMCSS();
}

function closeCraftInfoPopup() {
  const old = document.getElementById("craft-info-popup-overlay");
  if (old) old.remove();
}

function obtenerRecetasQueUsanItem(itemId) {
  const listaItems = window.itemsData || [];
  if (!Array.isArray(listaItems) || !itemId) return [];

  const idBuscado = String(itemId).trim().toLowerCase();
  //console.log("BUSCANDO RECETAS PARA:", idBuscado);
  return listaItems.filter(producto => {
    const materiales = Array.isArray(producto.materiales_requeridos_para_crear)
      ? producto.materiales_requeridos_para_crear
      : [];

    return materiales.some(mat => {
      const matId = String(
        mat.item_id ?? mat.id ?? mat.material_id ?? ""
      ).trim().toLowerCase();

      return matId === idBuscado;
    });
  });
}

function construirTextoReceta(producto) {
  const listaItems = window.itemsData || [];
  const materiales = Array.isArray(producto.materiales_requeridos_para_crear)
    ? producto.materiales_requeridos_para_crear
    : [];

  const partes = materiales.map(mat => {
    const itemData = listaItems.find(i => i.id === mat.item_id);
    const nombre = itemData?.nombre_item || mat.item_id;
    const cantidad = Number(mat.cantidad || 0);
    return `${nombre}(${cantidad})`;
  });

  return `${producto.nombre_item} = ${partes.join(" + ")}`;
}

function openCraftInfoPopup(item) {
  if (!item) return;

  ensureCraftInfoPopupStyles();
  closeCraftInfoPopup();

  const itemId = String(item.id ?? item.item_id ?? "").trim();
  const itemNombre = item.nombre_item || item.nombre || itemId || "Item";
  const itemImagen = item.imagen || "";

  //console.log("ITEM POPUP ID:", item.id, item.item_id);
  //console.log("ITEMS DATA RECETAS:", window.itemsData);

  const recetas = obtenerRecetasQueUsanItem(itemId);

  const overlay = document.createElement("div");
  overlay.id = "craft-info-popup-overlay";

  const recetasHTML = recetas.length
    ? `
      <div class="craft-info-list">
        ${recetas.map(producto => `
          <div class="craft-info-row">
            <p class="craft-info-product">${producto.nombre_item}</p>
            <p class="craft-info-recipe">${construirTextoReceta(producto)}</p>
          </div>
        `).join("")}
      </div>
    `
    : `
      <p class="craft-info-empty">
        Este item aún no participa en recetas registradas.
      </p>
    `;

  overlay.innerHTML = `
    <div id="craft-info-popup-box">
      <div id="craft-info-popup-header">
        <div id="craft-info-popup-title">${itemNombre}</div>
        <button id="craft-info-popup-close" type="button">X</button>
      </div>

      <div id="craft-info-popup-body">
        <img class="craft-info-main-image" src="${itemImagen}" alt="${itemNombre}">
        <p class="craft-info-section-title">Materiales que puedes construir</p>
        ${recetasHTML}
      </div>
    </div>
  `;

  wrapEl.appendChild(overlay);

  const closeBtn = overlay.querySelector("#craft-info-popup-close");

  function cerrar() {
    closeCraftInfoPopup();
  }

  closeBtn.addEventListener("click", cerrar);
  closeBtn.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    e.preventDefault();
    cerrar();
  }, { passive: false });

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      cerrar();
    }
  }, { passive: false });
}

function ensureTiendaItemsStyles() {
  ensureStyleDOMCSS();
}

function closeTiendaDeItems() {
  const old = document.getElementById("tienda-items-overlay");
  if (old) old.remove();
}

function getItemsVendibles() {
  const lista = window.itemsData || [];
  if (!Array.isArray(lista)) return [];

  return lista.filter(item => Number(item.precio_compra || 0) > 0);
}

/*Sistemas de clics (inicio) */
const UI_TAP_MAX_MOVE = 18;

let uiTouchGate = {
  active: false,
  startX: 0,
  startY: 0,
  moved: false,
  target: null
};

function beginUITapGate(e, targetEl) {
  uiTouchGate.active = true;
  uiTouchGate.startX = e.clientX;
  uiTouchGate.startY = e.clientY;
  uiTouchGate.moved = false;
  uiTouchGate.target = targetEl || null;
}

function updateUITapGate(e) {
  if (!uiTouchGate.active) return;

  const dx = e.clientX - uiTouchGate.startX;
  const dy = e.clientY - uiTouchGate.startY;

  if (Math.abs(dx) > UI_TAP_MAX_MOVE || Math.abs(dy) > UI_TAP_MAX_MOVE) {
    uiTouchGate.moved = true;
  }
}

function endUITapGate() {
  uiTouchGate.active = false;
  uiTouchGate.target = null;
}

function canCommitUITap(targetEl) {
  if (!uiTouchGate.active) return false;
  if (uiTouchGate.moved) return false;
  if (!targetEl) return false;
  if (!uiTouchGate.target) return false;

  return targetEl === uiTouchGate.target || uiTouchGate.target.contains(targetEl);
}
/*Sistemas de clics (fin) */

let tiendaCompraLock = false;

function canComprarDesdeTienda() {
  if (tiendaCompraLock) return false;

  playtockSound()
  tiendaCompraLock = true;

  setTimeout(() => {
    tiendaCompraLock = false;
  }, 250);

  return true;
}

function comprarItemDeTienda(itemId) {
  if (!canComprarDesdeTienda()) return;

  const lista = window.itemsData || [];
  const item = lista.find(i => i.id === itemId);
  if (!item) return;

  const precio = Number(item.precio_compra || 0);
  if (precio <= 0) return;

  if ((Number(cosmonedas) || 0) < precio) {
    playerrorSound()
    showPopupFeedback({
      title: "Compra fallida",
      message: "No tienes suficientes cosmonedas.",
      type: "warning",
      duration: 5000
    });
    return;
  }

  const scrollTienda = getElementScrollState("#tienda-items-body");
  const scrollInventario = getElementScrollState("#container-interfas .ui-body");

  const agregado = agregarItemAlInventario({
    ...item,
    cantidad: 1,
    usos: item.cantidad_de_usos ?? null,
    usos_maximos: item.cantidad_de_usos ?? null,
    agotable: item.agotable === true
  });

  if (!agregado) {
    playerrorSound()
    showPopupFeedback({
      title: "Inventario lleno",
      message: "No puedes agregar más items.",
      type: "warning",
      duration: 5000
    });
    return;
  }

  cosmonedas -= precio;

  refreshInventarioUI();
  restoreElementScrollState("#container-interfas .ui-body", scrollInventario);

  showPopupFeedback({
    title: "Compra realizada",
    message: `Haz comprado ${item.nombre_item || item.nombre || "este item"}.`,
    type: "success",
    duration: 5000
  });

  abrirTiendaDeITems();
  restoreElementScrollState("#tienda-items-body", scrollTienda);
}

document.addEventListener("pointerdown", (e) => {
  const overlay = document.getElementById("tienda-items-overlay");
  if (!overlay) return;

  const clickDentroDelPanel = e.target.closest("#tienda-items-box");
  const clickEnTriggerDeTienda = e.target.closest("[data-open-tienda], .npc-shop-trigger");

  if (clickDentroDelPanel) return;
  if (clickEnTriggerDeTienda) return;

  closeTiendaDeItems();
}, true);

function abrirTiendaDeITems() {
  playtockSound()
  ensureTiendaItemsStyles();
  closeTiendaDeItems();

  const overlay = document.createElement("div");
  overlay.id = "tienda-items-overlay";

  const vendibles = getItemsVendibles();

  const itemsHTML = vendibles.length
    ? vendibles.map(item => {
      const precio = Number(item.precio_compra || 0);
      const puedeComprar = (Number(cosmonedas) || 0) >= precio;

      return `
          <div class="tienda-item-card">
            <img class="tienda-item-img" src="${item.imagen || ""}" alt="${item.nombre_item || item.id}">
            <div class="tienda-item-info">
              <p class="tienda-item-name">${item.nombre_item || item.id}</p>
              <p class="tienda-item-price">Precio: ${precio} cosmonedas</p>
            </div>
            <button
              class="tienda-item-btn"
              type="button"
              data-item-id="${item.id}"
              ${puedeComprar ? "" : "disabled"}
            >
              Comprar
            </button>
          </div>
        `;
    }).join("")
    : `<div class="tienda-items-empty">No hay items en venta.</div>`;

  overlay.innerHTML = `
    <div id="tienda-items-box">
      <div id="tienda-items-header">
        <div id="tienda-items-title">Tienda de Items</div>
        <button id="tienda-items-close" type="button">X</button>
      </div>

      <div id="tienda-items-body">
        <div class="tienda-vendedor-box">
          <img
            class="tienda-vendedor-foto"
            src="../assets/spriteAmbiente/vendedor.png"
            alt="Vendedor"
          >

          <div class="tienda-vendedor-copy">
            <p class="tienda-vendedor-pss">Pss..!! Acércate... Tengo cosas raras para ti.</p>
            <p>Tengo piezas útiles, raras y algunas... mejor no preguntes de dónde salieron.</p>
          </div>
        </div>

        <div class="tienda-items-saldo">Saldo: ${Number(cosmonedas) || 0} cosmonedas</div>
        ${itemsHTML}
      </div>
    </div>
  `;

  wrapEl.appendChild(overlay);

  const closeBtn = overlay.querySelector("#tienda-items-close");

  closeBtn.addEventListener("click", closeTiendaDeItems);
  closeBtn.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    e.preventDefault();
    closeTiendaDeItems();
  }, { passive: false });

  overlay.addEventListener("click", (e) => {
    const btn = e.target.closest(".tienda-item-btn");
    if (btn) {
      const itemId = btn.dataset.itemId;
      comprarItemDeTienda(itemId);
      return;
    }

    if (e.target === overlay) {
      closeTiendaDeItems();
    }
  });

  overlay.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest(".tienda-item-btn");
    if (!btn) return;

    beginUITapGate(e, btn);
  }, { passive: true });

  overlay.addEventListener("pointermove", (e) => {
    updateUITapGate(e);
  }, { passive: true });

  overlay.addEventListener("pointerup", (e) => {
    const btn = e.target.closest(".tienda-item-btn");
    if (!btn) {
      endUITapGate();
      return;
    }

    if (!canCommitUITap(btn)) {
      endUITapGate();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const itemId = btn.dataset.itemId;
    comprarItemDeTienda(itemId);

    endUITapGate();
  }, { passive: false });

  overlay.addEventListener("pointercancel", () => {
    endUITapGate();
  }, { passive: true });
}

window.abrirTiendaDeITems = abrirTiendaDeITems;

function closeInventarioPopup() {
  const oldPopup = document.querySelector(".ui-inv-popup");
  if (oldPopup) oldPopup.remove();

  document
    .querySelectorAll("#container-interfas[data-panel='inventario'] .ui-inv-slot[data-popup-open='1']")
    .forEach(el => delete el.dataset.popupOpen);
}

function openInventarioPopup(slotEl, item) {
  if (!slotEl || !item) return;

  closeInventarioPopup();

  const panel = document.getElementById("container-interfas");
  if (!panel) return;

  const bodyEl = panel.querySelector(".ui-body");
  if (!bodyEl) return;

  bodyEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="ui-inv-popup">
      <div class="ui-inv-popup-title">${item.nombre_item}</div>
      <div class="ui-inv-popup-actions">
        <button class="ui-inv-popup-btn" type="button" data-inv-action="destruir">Destruir</button>
        <button class="ui-inv-popup-btn" type="button" data-inv-action="equipar">Equipar</button>
        <button class="ui-inv-popup-btn" type="button" data-inv-action="combinar">Combinar</button>
        <button class="ui-inv-popup-btn" type="button" data-inv-action="ver-combinaciones">Ver combinaciones</button>
      </div>
    </div>
  `
  );

  const popup = bodyEl.querySelector(".ui-inv-popup:last-of-type");
  if (!popup) return;

  const bodyRect = bodyEl.getBoundingClientRect();
  const slotRect = slotEl.getBoundingClientRect();

  let left = (slotRect.left - bodyRect.left) + bodyEl.scrollLeft + (slotRect.width / 2);
  let top = (slotRect.top - bodyRect.top) + bodyEl.scrollTop - 10;

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;

  const popupRect = popup.getBoundingClientRect();
  const bodyWidth = bodyEl.clientWidth;

  let popupLeft = left - (popupRect.width / 2);
  const minLeft = 8;
  const maxLeft = bodyWidth - popupRect.width - 8;

  popupLeft = Math.max(minLeft, Math.min(maxLeft, popupLeft));

  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${top}px`;

  slotEl.dataset.popupOpen = "1";
}

function getInventarioSlotItem(slotEl) {
  if (!slotEl) return null;

  const index = Number(slotEl.dataset.slotIndex);
  if (!Number.isInteger(index)) return null;

  return window.inventarioUser[index] || null;
}

let inventarioDragState = {
  active: false,
  slotIndex: null,
  item: null,
  sourceEl: null,
  ghostEl: null,
  pointerId: null,
  pointerType: "mouse",
  startX: 0,
  startY: 0,
  dragging: false,
  holdTimer: null,
  holdReady: false
};

const INVENTARIO_DRAG_THRESHOLD_MOUSE = 12;
const INVENTARIO_DRAG_THRESHOLD_TOUCH = 20;
const INVENTARIO_DRAG_HOLD_MS = 140;

function closeInventarioDragGhost() {
  if (inventarioDragState.ghostEl && inventarioDragState.ghostEl.parentNode) {
    inventarioDragState.ghostEl.parentNode.removeChild(inventarioDragState.ghostEl);
  }
  inventarioDragState.ghostEl = null;
}

function resetInventarioDragState() {
  if (inventarioDragState.sourceEl) {
    inventarioDragState.sourceEl.classList.remove("ui-inv-slot--dragging");
  }

  if (inventarioDragState.holdTimer) {
    clearTimeout(inventarioDragState.holdTimer);
  }

  closeInventarioDragGhost();

  inventarioDragState.active = false;
  inventarioDragState.slotIndex = null;
  inventarioDragState.item = null;
  inventarioDragState.sourceEl = null;
  inventarioDragState.pointerId = null;
  inventarioDragState.pointerType = "mouse";
  inventarioDragState.startX = 0;
  inventarioDragState.startY = 0;
  inventarioDragState.dragging = false;
  inventarioDragState.holdTimer = null;
  inventarioDragState.holdReady = false;
}

function createInventarioDragGhost(item, clientX, clientY) {
  closeInventarioDragGhost();

  const ghost = document.createElement("div");
  ghost.className = "ui-inv-drag-ghost";

  ghost.innerHTML = `
    <img class="ui-inv-drag-ghost-img" src="${item.imagen || ""}" alt="${item.nombre_item || "Item"}">
    <span class="ui-inv-drag-ghost-count">${item.cantidad || 1}</span>
  `;

  ghost.style.left = `${clientX}px`;
  ghost.style.top = `${clientY}px`;

  document.body.appendChild(ghost);
  inventarioDragState.ghostEl = ghost;
}

function moveInventarioDragGhost(clientX, clientY) {
  if (!inventarioDragState.ghostEl) return;

  inventarioDragState.ghostEl.style.left = `${clientX}px`;
  inventarioDragState.ghostEl.style.top = `${clientY}px`;
}

function beginInventarioDrag(slotEl, item, e) {
  if (!slotEl || !item) return;

  inventarioDragState.active = true;
  inventarioDragState.slotIndex = Number(slotEl.dataset.slotIndex);
  inventarioDragState.item = item;
  inventarioDragState.sourceEl = slotEl;
  inventarioDragState.pointerId = e.pointerId ?? null;
  inventarioDragState.pointerType = e.pointerType || "mouse";
  inventarioDragState.startX = e.clientX;
  inventarioDragState.startY = e.clientY;
  inventarioDragState.dragging = false;
  inventarioDragState.holdReady = inventarioDragState.pointerType === "mouse";

  slotEl.classList.add("ui-inv-slot--dragging");

  if (inventarioDragState.holdTimer) {
    clearTimeout(inventarioDragState.holdTimer);
  }

  if (inventarioDragState.pointerType !== "mouse") {
    inventarioDragState.holdTimer = setTimeout(() => {
      inventarioDragState.holdReady = true;
    }, INVENTARIO_DRAG_HOLD_MS);
  }
}

function updateInventarioDrag(e) {
  if (!inventarioDragState.active) return;

  if (
    inventarioDragState.pointerId !== null &&
    e.pointerId !== undefined &&
    e.pointerId !== inventarioDragState.pointerId
  ) return;

  const dx = e.clientX - inventarioDragState.startX;
  const dy = e.clientY - inventarioDragState.startY;
  const dist = Math.hypot(dx, dy);

  const threshold =
    inventarioDragState.pointerType === "mouse"
      ? INVENTARIO_DRAG_THRESHOLD_MOUSE
      : INVENTARIO_DRAG_THRESHOLD_TOUCH;

  if (!inventarioDragState.dragging) {
    if (!inventarioDragState.holdReady) return;
    if (dist < threshold) return;

    inventarioDragState.dragging = true;
    closeInventarioPopup();
    createInventarioDragGhost(inventarioDragState.item, e.clientX, e.clientY);
  }

  moveInventarioDragGhost(e.clientX, e.clientY);
}

function getInventarioDropTarget(clientX, clientY) {
  const ghost = inventarioDragState.ghostEl;

  if (ghost) ghost.style.display = "none";

  let el = null;

  try {
    el = document.elementFromPoint(clientX, clientY);
  } catch (_) {
    if (ghost) ghost.style.display = "";
    return null;
  }

  if (ghost) ghost.style.display = "";

  if (!(el instanceof Element)) {
    return null;
  }

  const equipSlot = el.closest("#container-interfas[data-panel='inventario'] .ui-inv-equip-slot");
  if (equipSlot) {
    return { type: "equip", el: equipSlot };
  }

  const combineSlot = el.closest("#container-interfas[data-panel='inventario'] .ui-inv-combine-slot");
  if (combineSlot) {
    return { type: "combine", el: combineSlot };
  }

  const invPanel = el.closest("#container-interfas");
  if (!invPanel) {
    return { type: "destroy", el: null };
  }

  return { type: "none", el: null };
}

function commitInventarioDragDrop(clientX, clientY) {
  if (!inventarioDragState.active || !inventarioDragState.dragging) {
    resetInventarioDragState();
    return false;
  }

  const slotIndex = inventarioDragState.slotIndex;

  if (!Number.isInteger(slotIndex)) {
    resetInventarioDragState();
    return false;
  }

  let drop = null;

  try {
    drop = getInventarioDropTarget(clientX, clientY);
  } catch (_) {
    resetInventarioDragState();
    return false;
  }

  if (drop?.type === "equip") {
    equiparItemDelInventario(slotIndex);
    resetInventarioDragState();
    return true;
  }

  if (drop?.type === "combine") {
    if (typeof window.agregarItemACombinacionDesdeInventario === "function") {
      window.agregarItemACombinacionDesdeInventario(slotIndex);
    }
    resetInventarioDragState();
    return true;
  }

  if (drop?.type === "destroy") {
    if (typeof window.destruirItemDelInventario === "function") {
      window.destruirItemDelInventario(slotIndex);
    }
    resetInventarioDragState();
    return true;
  }

  resetInventarioDragState();
  return false;
}

// Render Tutorial (mini-swiper)
function buildTutorialHTML() {
  const total = Array.isArray(TUTORIAL_SLIDES) ? TUTORIAL_SLIDES.length : 0;

  if (!total) {
    return `
      <div class="ui-tutorial">
        <div class="ui-settings-section">
          <p class="ui-settings-title">Tutorial del juego</p>
          <p class="ui-small">0/0</p>
        </div>

        <div class="ui-tutorial-frame">
          <div class="ui-tutorial-caption">No hay tutorial disponible todavía.</div>
        </div>

        <div class="ui-tutorial-controls">
          <button class="ui-btn" data-action="back-to-settings">Volver</button>
        </div>
      </div>
    `;
  }

  tutorialIndex = Math.max(0, Math.min(total - 1, tutorialIndex));

  const slide = TUTORIAL_SLIDES[tutorialIndex];

  if (!slide) {
    return `
      <div class="ui-tutorial">
        <div class="ui-settings-section">
          <p class="ui-settings-title">Tutorial del juego</p>
          <p class="ui-small">Error de carga</p>
        </div>

        <div class="ui-tutorial-frame">
          <div class="ui-tutorial-caption">No se pudo leer el slide actual.</div>
        </div>

        <div class="ui-tutorial-controls">
          <button class="ui-btn" data-action="back-to-settings">Volver</button>
        </div>
      </div>
    `;
  }

  const mediaHTML = slide.video
    ? `
      <video class="ui-tutorial-img" controls playsinline preload="metadata">
        <source src="${slide.video}" type="video/mp4">
      </video>
    `
    : `
      <img class="ui-tutorial-img" src="${slide.img || ""}" alt="Tutorial ${tutorialIndex + 1}">
    `;

  return `
    <div class="ui-tutorial">

      <div class="ui-settings-section">
        <p class="ui-settings-title">Tutorial del juego</p>
        <p class="ui-small">${tutorialIndex + 1}/${total}</p>
      </div>

      <div class="ui-tutorial-frame">
        ${mediaHTML}
        <p class="ui-tutorial-caption">${slide.text || ""}</p>
      </div>

      <div class="ui-tutorial-controls">
        <button class="ui-btn" data-action="tutorial-prev" ${tutorialIndex <= 0 ? "disabled" : ""}>Anterior</button>
        <button class="ui-btn" data-action="tutorial-next" ${tutorialIndex >= total - 1 ? "disabled" : ""}>Siguiente</button>
        <button class="ui-btn" data-action="back-to-settings">Volver</button>
      </div>

    </div>
  `;
}

// Delegación de eventos dentro del panel (llamar 1 sola vez)
let settingsDelegationReady = false;
function initSettingsDelegation() {
  // ✅ evita “Cannot access ... before initialization” aunque lo llames antes
  if (window.__enySettingsDelegationReady) return;
  window.__enySettingsDelegationReady = true;

  function handleActionEvent(e) {
    const root = document.getElementById("container-interfas");
    if (!root) return;

    const el = e.target?.closest?.("[data-action]");
    if (!el || !root.contains(el)) return;

    const tag = (el.tagName || "").toLowerCase();
    const action = el.dataset.action;

    // 🔥 IMPORTANTE: NO llames preventDefault en inputs/selects
    // (si no, el range no “arrastra” bien en PC y el select NO se despliega)
    if (tag === "input" || tag === "select" || tag === "textarea") {
      return;
    }

    //console.log("[SETTING ACTION CLICK]", action);

    e.preventDefault();
    e.stopPropagation();

    if (action === "fullscreen") {
      //console.log("Activar pantalla completa");
      toggleFullscreen();
      return;
    }

    if (action === "open-tutorial") {
      const bodyEl = root.querySelector(".ui-body");
      if (!bodyEl) return;

      bodyEl.innerHTML = `<div class="ui-small">Cargando tutorial...</div>`;

      cargarTutorialDesdeJSON().then(() => {
        tutorialIndex = 0;
        bodyEl.innerHTML = buildTutorialHTML();
      }).catch(() => {
        bodyEl.innerHTML = `
      <div class="ui-tutorial">
        <div class="ui-settings-section">
          <p class="ui-settings-title">Tutorial del juego</p>
        </div>
        <div class="ui-tutorial-frame">
          <div class="ui-tutorial-caption">No se pudo cargar el tutorial.</div>
        </div>
        <div class="ui-tutorial-controls">
          <button class="ui-btn" data-action="back-to-settings">Volver</button>
        </div>
      </div>
    `;
      });

      return;
    }

    if (action === "back-to-settings") {
      //console.log("Volver a settings");
      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
      return;
    }

    if (action === "tutorial-prev") {
      //console.log("Tutorial anterior");
      tutorialIndex = Math.max(0, tutorialIndex - 1);
      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildTutorialHTML();
      return;
    }

    if (action === "tutorial-next") {
      //console.log("Tutorial siguiente");
      tutorialIndex = Math.min(TUTORIAL_SLIDES.length - 1, tutorialIndex + 1);
      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildTutorialHTML();
      return;
    }

    if (action === "toggle-ambient") {
      const enabled = !getAmbientEnabled();
      setAmbientEnabled(enabled);

      if (enabled) {
        playAmbientMusic();
      } else {
        pauseAmbientMusic();
      }

      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
      return;
    }

    if (action === "factory-reset") {
      //console.log("Restablecer estado de fábrica");
      factoryResetSettings();
      tutorialIndex = 0;
      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
      return;
    }
  }

  // ✅ para que el SELECT funcione perfecto
  document.addEventListener(
    "change",
    (e) => {
      const root = document.getElementById("container-interfas");
      if (!root) return;

      const el = e.target;
      if (!el || !root.contains(el)) return;

      if (el.matches('[data-action="set-ambient"]')) {
        //console.log("Música ambiente (change):", el.value);
        setAmbientIndex(el.value);
        const bodyEl = root.querySelector(".ui-body");
        if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
      }
    },
    true
  );

  // --- INPUTS (volumen y selector de música) ---
  document.addEventListener(
    "input",
    (e) => {
      const root = document.getElementById("container-interfas");
      if (!root) return;

      const el = e.target;
      if (!el || !root.contains(el)) return;

      if (el.matches('[data-action="set-volume"]')) {
        setSettingVolume(el.value);
        applyAmbientVolume();

        const info = root.querySelector(".ui-setting-music-value");
        if (info) info.textContent = `Volumen actual: ${Math.round(getSettingVolume() * 100)}%`;
        return;
      }

      if (el.matches('[data-action="set-sfx-volume"]')) {
        setSettingSfxVolume(el.value);

        const info = root.querySelector(".ui-setting-sfx-value");
        if (info) info.textContent = `Efectos actuales: ${Math.round(getSettingSfxVolume() * 100)}%`;
        return;
      }

      if (el.matches('[data-action="set-ambient"]')) {
        setAmbientIndex(el.value);

        const bodyEl = root.querySelector(".ui-body");
        if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
        return;
      }
    },
    true
  );

  // ✅ CAPTURE: funciona aunque tengas preventDefault en #wrap
  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") {
      handleActionEvent(e);
      return;
    }

    const root = document.getElementById("container-interfas");
    if (!root) return;

    const el = e.target?.closest?.("[data-action]");
    if (!el || !root.contains(el)) return;

    const tag = (el.tagName || "").toLowerCase();

    if (tag === "input" || tag === "select" || tag === "textarea") return;

    beginUITapGate(e, el);
  }, true);

  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") return;
    updateUITapGate(e);
  }, true);

  document.addEventListener("pointerup", (e) => {
    if (e.pointerType === "mouse") return;

    const root = document.getElementById("container-interfas");
    if (!root) {
      endUITapGate();
      return;
    }

    const el = e.target?.closest?.("[data-action]");
    if (!el || !root.contains(el)) {
      endUITapGate();
      return;
    }

    const tag = (el.tagName || "").toLowerCase();

    if (tag === "input" || tag === "select" || tag === "textarea") {
      endUITapGate();
      return;
    }

    if (!canCommitUITap(el)) {
      endUITapGate();
      return;
    }

    handleActionEvent(e);
    endUITapGate();
  }, true);

  document.addEventListener("pointercancel", () => {
    endUITapGate();
  }, true);

  // ✅ fallback desktop
  document.addEventListener(
    "click",
    (e) => {
      if (e.detail === 0) return; // evita doble disparo
      handleActionEvent(e);
    },
    true
  );

  // ✅ UN SOLO listener input (tu código tenía 2 duplicados)
  document.addEventListener(
    "input",
    (e) => {
      const root = document.getElementById("container-interfas");
      if (!root) return;

      const el = e.target;
      if (!el || !root.contains(el)) return;

      if (el.matches('[data-action="set-volume"]')) {
        setSettingVolume(el.value);
        applyAmbientVolume();

        const info = root.querySelector(".ui-small");
        if (info) info.textContent = `Volumen actual: ${Math.round(getSettingVolume() * 100)}%`;
        return;
      }
    },
    true
  );
}

let npcClickCooldown = false;
const NPC_CLICK_DELAY = 500; // 0.5 segundos

function canUseNPCClick() {
  if (npcClickCooldown) return false;

  npcClickCooldown = true;

  setTimeout(() => {
    npcClickCooldown = false;
  }, NPC_CLICK_DELAY);

  return true;
}

function handleNPCDialogAction(btn) {
  if (!btn) return;
  if (!canUseNPCClick()) return;

  const action = btn.dataset.npcAction;

  if (action === "close" || action === "reject") {
    playtockSound()
    window.closeNPCDialog();
    return;
  }

  if (action === "prev") {
    playtockSound()
    window.npcDialogState.lineIndex--;
    window.renderNPCDialog();
    return;
  }

  if (action === "next") {
    playtockSound()
    window.npcDialogState.lineIndex++;
    window.renderNPCDialog();
    return;
  }

  if (action === "accept-mission") {
    playtockSound()
    acceptMission(window.npcDialogState.missionId);
    return;
  }

  if (action === "continue-mission") {
    playtockSound()
    const ok = continueActiveMissionFromNPC(window.npcDialogState.npc.id);

    if (!ok) {
      //console.log("No se pudo continuar la misión con este NPC:", window.npcDialogState.npc.id);
      window.closeNPCDialog();
    }
    return;
  }

  if (action === "finish-mission") {
    playtockSound()
    finalizeActiveMissionFromNPC(window.npcDialogState.npc.id);
    return;
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest?.("#npc-dialog-actions [data-npc-action]");
  if (!btn) return;

  handleNPCDialogAction(btn);
}, true);

document.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;

  const btn = e.target.closest?.("#npc-dialog-actions [data-npc-action]");
  if (!btn) return;

  beginUITapGate(e, btn);
}, { capture: true, passive: true });

document.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse") return;
  updateUITapGate(e);
}, { capture: true, passive: true });

document.addEventListener("pointerup", (e) => {
  if (e.pointerType === "mouse") return;

  const btn = e.target.closest?.("#npc-dialog-actions [data-npc-action]");
  if (!btn) {
    endUITapGate();
    return;
  }

  if (!canCommitUITap(btn)) {
    endUITapGate();
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  handleNPCDialogAction(btn);
  endUITapGate();
}, { capture: true, passive: false });

document.addEventListener("pointercancel", () => {
  endUITapGate();
}, { capture: true, passive: true });

document.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;

  const btn = e.target.closest?.("#npc-dialog-actions [data-npc-action]");
  if (!btn) return;

  beginUITapGate(e, btn);
}, { capture: true, passive: true });

document.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse") return;
  updateUITapGate(e);
}, { capture: true, passive: true });

document.addEventListener("pointerup", (e) => {
  if (e.pointerType === "mouse") return;

  const btn = e.target.closest?.("#npc-dialog-actions [data-npc-action]");
  if (!btn) {
    endUITapGate();
    return;
  }

  if (!canCommitUITap(btn)) {
    endUITapGate();
    return;
  }

  e.preventDefault();
  btn.click();
  endUITapGate();
}, { capture: true, passive: false });

document.addEventListener("pointercancel", () => {
  endUITapGate();
}, { capture: true, passive: true });

document.addEventListener("click", (e) => {
  const root = document.getElementById("container-interfas");
  if (!root || root.dataset.panel !== "inventario") return;

  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (slotEl) {
    const item = getInventarioSlotItem(slotEl);
    if (!item) return;

    playUISound();

    e.preventDefault();
    e.stopPropagation();
    openInventarioPopup(slotEl, item);
    return;
  }

  const actionBtn = e.target.closest?.(".ui-inv-popup-btn");
  if (actionBtn) {
    const accion = actionBtn.dataset.invAction || "";
    const activeSlotEl = document.querySelector(
      "#container-interfas[data-panel='inventario'] .ui-inv-slot[data-popup-open='1']"
    );
    const slotIndex = Number(activeSlotEl?.dataset.slotIndex);

    if (!Number.isInteger(slotIndex)) {
      closeInventarioPopup();
      return;
    }

    const item = window.inventarioUser?.[slotIndex] || null;

    e.preventDefault();
    e.stopPropagation();

    if (accion === "destruir") {
      window.destruirItemDelInventario(slotIndex);
      return;
    }

    if (accion === "combinar") {
      window.agregarItemACombinacionDesdeInventario(slotIndex);
      return;
    }

    if (accion === "equipar") {
      equiparItemDelInventario(slotIndex);
      return;
    }

    if (accion === "ver-combinaciones") {
      closeInventarioPopup();
      if (item) openCraftInfoPopup(item);
      return;
    }

    return;
  }

  const equipSlotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-equip-slot.has-item");
  if (equipSlotEl) {
    const equipIndex = Number(equipSlotEl.dataset.equipSlot);

    if (Number.isInteger(equipIndex)) {
      e.preventDefault();
      e.stopPropagation();
      window.devolverItemDesdeEquipado(equipIndex);
      return;
    }
  }

  const combineSlotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-slot.has-item");
  if (combineSlotEl) {
    const combineIndex = Number(combineSlotEl.dataset.combineSlot);

    if (Number.isInteger(combineIndex)) {
      e.preventDefault();
      e.stopPropagation();
      window.devolverItemDesdeCombinacion(combineIndex);
      return;
    }
  }

  const resultEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-result.has-item");
  if (resultEl) {
    playUISound();
    e.preventDefault();
    e.stopPropagation();
    window.intentarCrearItemFinal();
    return;
  }

  if (!e.target.closest?.(".ui-inv-popup")) {
    closeInventarioPopup();
  }
}, true);

document.addEventListener("pointerdown", (e) => {
  const root = document.getElementById("container-interfas");
  if (!root || root.dataset.panel !== "inventario") return;

  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (slotEl) {
    const item = getInventarioSlotItem(slotEl);
    if (!item) return;

    beginUITapGate(e, slotEl);
    beginInventarioDrag(slotEl, item, e);
    return;
  }

  const target =
    e.target.closest?.(".ui-inv-popup-btn") ||
    e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-equip-slot.has-item") ||
    e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-slot.has-item") ||
    e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-result.has-item");

  if (!target) return;

  beginUITapGate(e, target);
}, { capture: true, passive: true });

document.addEventListener("pointermove", (e) => {
  const root = document.getElementById("container-interfas");
  if (!root || root.dataset.panel !== "inventario") return;

  updateUITapGate(e);

  if (inventarioDragState.active && inventarioDragState.pointerType !== "mouse") {
    e.preventDefault();
  }

  updateInventarioDrag(e);
}, { capture: true, passive: false });

document.addEventListener("pointerup", (e) => {
  const root = document.getElementById("container-interfas");
  if (!root || root.dataset.panel !== "inventario") {
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  if (inventarioDragState.active && inventarioDragState.dragging) {
    e.preventDefault();
    e.stopPropagation();
    commitInventarioDragDrop(e.clientX, e.clientY);
    endUITapGate();
    return;
  }

  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (slotEl && canCommitUITap(slotEl)) {
    const item = getInventarioSlotItem(slotEl);
    if (item) {
      playUISound();

      e.preventDefault();
      e.stopPropagation();
      openInventarioPopup(slotEl, item);
    }
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  const actionBtn = e.target.closest?.(".ui-inv-popup-btn");
  if (actionBtn && canCommitUITap(actionBtn)) {
    e.preventDefault();
    e.stopPropagation();
    actionBtn.click();
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  const equipSlotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-equip-slot.has-item");
  if (equipSlotEl && canCommitUITap(equipSlotEl)) {
    e.preventDefault();
    e.stopPropagation();
    equipSlotEl.click();
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  const combineSlotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-slot.has-item");
  if (combineSlotEl && canCommitUITap(combineSlotEl)) {
    e.preventDefault();
    e.stopPropagation();
    combineSlotEl.click();
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  const resultEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-combine-result.has-item");
  if (resultEl && canCommitUITap(resultEl)) {
    e.preventDefault();
    e.stopPropagation();
    resultEl.click();
    endUITapGate();
    resetInventarioDragState();
    return;
  }

  endUITapGate();
  resetInventarioDragState();
}, { capture: true, passive: false });

document.addEventListener("pointercancel", () => {
  endUITapGate();
  resetInventarioDragState();
}, { capture: true, passive: true });

// ✅ deja SOLO 1 llamada a esto (una sola vez en todo el archivo)
initSettingsDelegation();
efectVolumen = getSettingSfxVolume();

if (getAmbientEnabled()) {
  ensureAmbientAudio();
  applyAmbientVolume();
}
//-----------------------------------------------------------------------------
//lógica Visual de Setting (fin)
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Puntos de vida (inicio)
//-----------------------------------------------------------------------------
let pdv = 100;
const PDV_MAX = 100;
const CORAZON_SRC = "../assets/panelOptions/corazon.svg";
let corazonImg = null;

function drawBumerangs(ctx) {
  if (!window.bumerangImg || !window.bumerangImg.complete) return;

  for (const b of (window.bumerangsActivos || [])) {
    ctx.save();

    ctx.translate(b.x, b.y);
    ctx.rotate(b.angulo);

    const size = 42;

    ctx.shadowColor = "#d7a15e";
    ctx.shadowBlur = 8;

    ctx.drawImage(
      window.bumerangImg,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();
  }
}

function drawLifeBar(ctx, canvas) {

  const barWidth = 18;
  const barHeight = 140;

  const marginLeft = 24;

  const barX = marginLeft;
  const barY = (canvas.height / 2) - (barHeight / 2) - 120; //eje y corazon y barra de vida

  const fillHeight = (pdv / PDV_MAX) * barHeight;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;

  // Fondo barra
  ctx.fillStyle = "#222";
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Vida
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(
    barX,
    barY + (barHeight - fillHeight),
    barWidth,
    fillHeight
  );

  // Borde
  ctx.strokeStyle = "white";
  ctx.strokeRect(barX, barY, barWidth, barHeight);

  // Corazón
  if (corazonImg) {

    const heartSize = 32;

    const heartX = barX + (barWidth / 2) - (heartSize / 2);
    const heartY = barY + barHeight + 10;

    ctx.drawImage(
      corazonImg,
      heartX,
      heartY,
      heartSize,
      heartSize
    );
  }

  ctx.restore();
}

//-----------------------------------------------------------------------------
//Puntos de vida (fin)
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//metafon (inicio)
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// METAFON PANEL (iframe HTML externo) ✅ cierra en táctil (solución robusta)
//-----------------------------------------------------------------------------

let metafonOpen = false;
let metafonEl = null;

const metafonButton = document.getElementById("metafon");
const wrapContainer = document.getElementById("wrap");

// ✅ AJUSTA ESTA RUTA
const METAFON_SRC = "../interactions/metafon.html";

// ---- Scroll lock SOLO cuando el panel está abierto ----
function preventScrollWhenMetafonOpen(e) {
  if (!metafonOpen) return;
  e.preventDefault();
}

function enableMetafonScrollLock() {
  window.addEventListener("wheel", preventScrollWhenMetafonOpen, { passive: false });
  window.addEventListener("touchmove", preventScrollWhenMetafonOpen, { passive: false });
}
function disableMetafonScrollLock() {
  window.removeEventListener("wheel", preventScrollWhenMetafonOpen, { passive: false });
  window.removeEventListener("touchmove", preventScrollWhenMetafonOpen, { passive: false });
}

// ---- Build panel ----
function buildMetafonPanel() {
  const el = document.createElement("div");
  el.id = "metafon-container";
  el.className = "metafon-container";

  el.innerHTML = `
    <div class="metafon-header">
      <div class="metafon-title">Metafon</div>
      <button class="metafon-close" type="button" aria-label="Cerrar">✕</button>
    </div>

    <iframe class="metafon-body" src="${METAFON_SRC}" title="Metafon"></iframe>
  `;

  return el;
}

document.addEventListener("pointerdown", (e) => {
  if (!metafonOpen || !metafonEl) return;

  const clickDentroDelPanel = e.target.closest("#metafon-container");
  const clickEnBoton = e.target.closest("#metafon");

  if (clickDentroDelPanel) return;
  if (clickEnBoton) return;

  closeMetafon();
}, true);

function openMetafon() {
  if (metafonOpen) return;

  metafonOpen = true;
  metafonEl = buildMetafonPanel();
  wrapContainer.appendChild(metafonEl);

  enableMetafonScrollLock();
}

function closeMetafon() {
  metafonOpen = false;
  disableMetafonScrollLock();

  if (metafonEl && metafonEl.parentNode) {
    metafonEl.parentNode.removeChild(metafonEl);
  }
  metafonEl = null;
}

// ---- Abrir con pointerdown (mejor en móvil) ----
function onOpenMetafon(e) {
  e.preventDefault();
  e.stopPropagation();
  openMetafon();
}

metafonButton?.addEventListener("pointerdown", onOpenMetafon, { passive: false });
metafonButton?.addEventListener("click", onOpenMetafon);

// ---- ✅ Cierre ultra robusto: delegación + CAPTURE (funciona aunque haya preventDefault arriba) ----
function tryCloseFromEvent(e) {
  const btn = e.target?.closest?.(".metafon-close");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();
  closeMetafon();
}

// En capture para que no lo bloquee nada
document.addEventListener("pointerdown", tryCloseFromEvent, true);
document.addEventListener("touchstart", tryCloseFromEvent, { capture: true, passive: false });
document.addEventListener("click", tryCloseFromEvent, true);

// Escape para cerrar
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && metafonOpen) closeMetafon();
});

//-----------------------------------------------------------------------------
// METAFON PANEL (fin)
//-----------------------------------------------------------------------------

/*Anular clic sostenido en dispositivos moviles (inicio)*/

/*Arreglo de avatares (Inicio) */
const characters = [

  // ===== 👨 HOMBRES =====
  {
    id: "m1",
    profile: "Alex",
    gender: "male",
    avatar: "../assets/avatares/men/hombre1.png",
    sprites: "../assets/avatares/hombre1.png"
  },
  {
    id: "m2",
    profile: "Dario",
    gender: "male",
    avatar: "../assets/avatares/men/hombre2.png",
    sprites: "../assets/avatares/hombre2.png"
  },
  {
    id: "m3",
    profile: "Kenzo",
    gender: "male",
    avatar: "../assets/avatares/men/hombre3.png",
    sprites: "../assets/avatares/hombre3.png"
  },
  {
    id: "m4",
    profile: "Luca",
    gender: "male",
    avatar: "../assets/avatares/men/hombre4.png",
    sprites: "../assets/avatares/hombre4.png"
  },
  {
    id: "m5",
    profile: "Noah",
    gender: "male",
    avatar: "../assets/avatares/men/hombre5.png",
    sprites: "../assets/avatares/hombre5.png"
  },
  {
    id: "m6",
    profile: "Ryu",
    gender: "male",
    avatar: "../assets/avatares/men/hombre6.png",
    sprites: "../assets/avatares/hombre6.png"
  },
  {
    id: "m7",
    profile: "Tomas",
    gender: "male",
    avatar: "../assets/avatares/men/hombre7.png",
    sprites: "../assets/avatares/hombre7.png"
  },
  {
    id: "m8",
    profile: "Victor",
    gender: "male",
    avatar: "../assets/avatares/men/hombre8.png",
    sprites: "../assets/avatares/hombre8.png"
  },
  {
    id: "m9",
    profile: "Zane",
    gender: "male",
    avatar: "../assets/avatares/men/hombre9.png",
    sprites: "../assets/avatares/hombre9.png"
  },


  // ===== 👩 MUJERES =====
  {
    id: "f1",
    profile: "Aria",
    gender: "female",
    avatar: "../assets/avatares/women/mujer1.png",
    sprites: "../assets/avatares/mujer1.png"
  },
  {
    id: "f2",
    profile: "Bella",
    gender: "female",
    avatar: "../assets/avatares/women/mujer2.png",
    sprites: "../assets/avatares/mujer2.png"
  },
  {
    id: "f3",
    profile: "Cleo",
    gender: "female",
    avatar: "../assets/avatares/women/mujer3.png",
    sprites: "../assets/avatares/mujer3.png"
  },
  {
    id: "f4",
    profile: "Diana",
    gender: "female",
    avatar: "../assets/avatares/women/mujer4.png",
    sprites: "../assets/avatares/mujer4.png"
  },
  {
    id: "f5",
    profile: "Elena",
    gender: "female",
    avatar: "../assets/avatares/women/mujer5.png",
    sprites: "../assets/avatares/mujer5.png"
  },
  {
    id: "f6",
    profile: "Freya",
    gender: "female",
    avatar: "../assets/avatares/women/mujer6.png",
    sprites: "../assets/avatares/mujer6.png"
  },
  {
    id: "f7",
    profile: "Iris",
    gender: "female",
    avatar: "../assets/avatares/women/mujer7.png",
    sprites: "../assets/avatares/mujer7.png"
  },
  {
    id: "f8",
    profile: "Mika",
    gender: "female",
    avatar: "../assets/avatares/women/mujer8.png",
    sprites: "../assets/avatares/mujer8.png"
  },
  {
    id: "f9",
    profile: "Nova",
    gender: "female",
    avatar: "../assets/avatares/women/mujer9.png",
    sprites: "../assets/avatares/mujer9.png"
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
    id: "arqueologo_planetario",
    name: "Arqueólogo Planetario",
    description: "Paciente e intuitivo, descifras ruinas antiguas y revelas secretos en mundos desconocidos que esperan ser comprendidos"
  },
  {
    id: "astronomo",
    name: "Astrónomo",
    description: "Tranquilo y observador, interpretas el cielo y descubres patrones del universo que guían tu camino"
  },
  {
    id: "astrofisico",
    name: "Astrofísico",
    description: "Racional y metódico, comprendes las leyes del universo y las aplicas para dominar cada desafío"
  },
  {
    id: "ingeniero_cuantico",
    name: "Ingeniero Cuántico",
    description: "Creativo y resolutivo, construyes soluciones avanzadas y transformas ideas complejas en realidades útiles"
  },
  {
    id: "explorador_planetario",
    name: "Explorador Planetario",
    description: "Valiente y curioso, te adentras en lo desconocido y avanzas con determinación en cada nuevo mundo"
  },
  {
    id: "criptografo",
    name: "Criptógrafo",
    description: "Analítico y estratégico, descifras códigos complejos y revelas mensajes ocultos en sistemas avanzados"
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

// =======================================================
// GLOBAL SCRIPTS SYSTEM (inicio)
// =======================================================

const GLOBAL_SCRIPTS = [
  "../globalScripts/metacam.js"
];

window.enyGlobalModules = {
  loaded: {},
  hooks: {
    onInit: [],
    beforeUpdate: [],
    afterUpdate: [],
    beforeDraw: [],
    afterDraw: [],
    afterDrawWorld: [],
    beforeDarkness: [],
    afterDarkness: [],
    onIsEntityLit: [],
    beforeEntityMove: [],
    afterEntityMove: [],
    beforeProjectileCollision: [],
    afterProjectileCollision: []
  },
  state: {}
};

window.registerGlobalModule = function registerGlobalModule(moduleId, moduleConfig) {
  if (!moduleId || !moduleConfig) return;

  if (window.enyGlobalModules.loaded[moduleId]) {
    console.warn("Módulo global ya registrado:", moduleId);
    return;
  }

  window.enyGlobalModules.loaded[moduleId] = moduleConfig;

  for (const hookName of Object.keys(window.enyGlobalModules.hooks)) {
    if (typeof moduleConfig[hookName] === "function") {
      window.enyGlobalModules.hooks[hookName].push(moduleConfig[hookName]);
    }
  }

  if (typeof moduleConfig.getInitialState === "function") {
    window.enyGlobalModules.state[moduleId] = moduleConfig.getInitialState();
  } else {
    window.enyGlobalModules.state[moduleId] = {};
  }

  //console.log("Módulo global registrado:", moduleId);
};

async function loadGlobalScripts() {
  for (const src of GLOBAL_SCRIPTS) {
    const already = document.querySelector(`script[data-global-script="${src}"]`);
    if (already) continue;

    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.globalScript = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
      document.head.appendChild(s);
    });
  }
}

function runGlobalHook(hookName, payload = {}) {
  const hooks = window.enyGlobalModules?.hooks?.[hookName] || [];

  for (const fn of hooks) {
    try {
      fn(payload);
    } catch (err) {
      console.error(`Error en hook global ${hookName}:`, err);
    }
  }
}

function runGlobalFilterHook(hookName, payload = {}, initialValue = null) {
  const hooks = window.enyGlobalModules?.hooks?.[hookName] || [];
  let value = initialValue;

  for (const fn of hooks) {
    try {
      const result = fn({ ...payload, currentValue: value });
      if (result !== undefined) value = result;
    } catch (err) {
      console.error(`Error en hook filtro global ${hookName}:`, err);
    }
  }

  return value;
}

function runGlobalBooleanHook(hookName, payload = {}) {
  const hooks = window.enyGlobalModules?.hooks?.[hookName] || [];

  for (const fn of hooks) {
    try {
      const result = fn(payload);
      if (result === true) return true;
    } catch (err) {
      console.error(`Error en hook booleano global ${hookName}:`, err);
    }
  }

  return false;
}

// =======================================================
// GLOBAL SCRIPTS SYSTEM (fin)
// =======================================================

(() => {
  // 1) Evita menú contextual (long-press) en móviles
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }, { passive: false });

  // 2) Evita selección/arrastre típico por long-press (imágenes/texto)
  ["selectstart", "dragstart"].forEach(evt => {
    document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
  });

  // 3) Bloquea gestos SOLO en el canvas / zona de juego, PERO NO en UI
  const blockZone = document.querySelector("#wrap") || document.body;

  function isUIInteractiveTarget(t) {
    if (!t || !t.closest) return false;

    return !!t.closest(
      "#container-interfas," +
      "#metafon-container," +
      "#npc-dialog-overlay," +
      "#tienda-items-overlay," +
      "#tienda-items-box," +
      "#tienda-items-body," +
      "#craft-info-popup-overlay," +
      "#craft-info-popup-box," +
      "#game-over-dom-overlay," +
      ".box-buttons-items," +
      "button, a, input, select, textarea, label," +
      "iframe," +
      "[data-action]"
    );
  }

  function shouldBlock(e) {
    // Si estás tocando UI, NO bloquees.
    if (isUIInteractiveTarget(e.target)) return false;

    // Si el panel está abierto o metafon está abierto, NO bloquees (para que funcione tocar dentro)
    if (typeof interfaceOpen !== "undefined" && interfaceOpen) return false;
    if (typeof metafonOpen !== "undefined" && metafonOpen) return false;

    // Bloquea solo si el gesto nace dentro del wrap (zona juego)
    return true;
  }

  blockZone.addEventListener("touchstart", (e) => {
    if (!shouldBlock(e)) return;
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchmove", (e) => {
    if (!shouldBlock(e)) return;
    e.preventDefault();
  }, { passive: false });

  blockZone.addEventListener("touchend", (e) => {
    if (!shouldBlock(e)) return;
    e.preventDefault();
  }, { passive: false });

  // 4) iOS Safari: callout + selección
  blockZone.style.webkitTouchCallout = "none";
  blockZone.style.webkitUserSelect = "none";
})();


const LOGO_SRC = "../assets/src/logo.png";

let logoImg = new Image();
logoImg.src = LOGO_SRC;

/*-----------------------Saldo Cosmonedas (Inicio)------------------------------------*/
const COSMONEDA_SRC = "../assets/src/cosmoneda.svg";
let cosmonedaImg = null;

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

function showCombinacionEstadoModal(tipo) {
  const oldModal = document.getElementById("ui-combine-status-modal");
  if (oldModal) oldModal.remove();

  const mensaje =
    tipo === "ok"
      ? "Combinación exitosa"
      : "Combinación de ITEMS fallido";

  if (tipo !== "ok") {
    playerrorSound(); // 👈 AQUÍ
  } else {
    playgoodSound();
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div id="ui-combine-status-modal">
        <div class="ui-combine-status-backdrop"></div>
        <div class="ui-combine-status-box">
          <div class="ui-combine-status-title">${mensaje}</div>
          <button class="ui-combine-status-btn" type="button">Aceptar</button>
        </div>
      </div>
    `
  );

  const modal = document.getElementById("ui-combine-status-modal");
  const btn = modal?.querySelector(".ui-combine-status-btn");

  function closeModal() {
    modal?.remove();
  }

  btn?.addEventListener("click", closeModal);

  btn?.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeModal();
    },
    { passive: false }
  );
}

window.enyGameBridge = {
  getMapaOscuro: () => mapaOscuro,
  setMapaOscuro: (value) => {
    mapaOscuro = !!value;
  },
  getPlayer: () => player,
  getCanvas: () => canvas,
  getCtx: () => ctx,

  moveEntityWithCollision: (entidad, nextX, nextY, w, h) => {
    if (typeof window._enyMoveEntityWithCollision === "function") {
      return window._enyMoveEntityWithCollision(entidad, nextX, nextY, w, h);
    }

    entidad.x = nextX;
    entidad.y = nextY;
  },

  projectileHitsEnvironment: (x, y, w = 10, h = 10) => {
    if (typeof window._enyProjectileHitsEnvironment === "function") {
      return window._enyProjectileHitsEnvironment(x, y, w, h);
    }

    return false;
  },

  damageClayBlock: (x, y, w = 10, h = 10, damage = 1, impactX = x, impactY = y) => {
    if (typeof window._enyDamageClayBlock === "function") {
      return window._enyDamageClayBlock(x, y, w, h, damage, impactX, impactY);
    }
    return false;
  },

  killEnemyWithEffects: (enemy) => {
    if (typeof window._enyKillEnemyWithEffects === "function") {
      return window._enyKillEnemyWithEffects(enemy);
    }
  },


};

//--Lógica de antorchas e iluminación de mapas oscuros (inicio)
let mapaOscuro = false; //--Define si el mapa es oscuro o no true/false

const TORCH_DURATION_MS = 30000;
const TORCH_LIGHT_RADIUS = 200;

let antorchaActiva = {
  active: false,
  slotIndex: -1,
  timer: 0
};

let torchTrailParticles = [];
//--Lógica de antorchas e iluminación de mapas oscuros (fin)

/*Funciones pop Up (inicio) */
function ensurePopUpCSS() {
  if (document.getElementById("popup-feedback-css-link")) return;

  const link = document.createElement("link");
  link.id = "popup-feedback-css-link";
  link.rel = "stylesheet";
  link.href = "../styles/popUp.css";
  document.head.appendChild(link);
}

let popupFeedbackTimer = null;

function closePopupFeedback() {
  const popup = document.getElementById("popup-feedback");
  if (!popup) return;

  popup.classList.add("popup-feedback--closing");

  setTimeout(() => {
    popup.remove();
  }, 220);
}

function showPopupFeedback({
  title = "Notificación",
  message = "",
  type = "success",
  duration = 10000
} = {}) {
  ensurePopUpCSS();

  if (popupFeedbackTimer) {
    clearTimeout(popupFeedbackTimer);
    popupFeedbackTimer = null;
  }

  const oldPopup = document.getElementById("popup-feedback");
  if (oldPopup) oldPopup.remove();

  const icon = type === "warning"
    ? "⛔"
    : `<img src="https://art.pixilart.com/thumb/sr5z082f4e339daws3.png" style="width:100%;height:100%;image-rendering:pixelated;" />`;

  const popup = document.createElement("div");
  popup.id = "popup-feedback";
  popup.className = `popup-feedback popup-feedback--${type}`;

  popup.innerHTML = `
    <div class="popup-feedback__box">
      <div class="popup-feedback__icon">${icon}</div>
      <div class="popup-feedback__content">
        <p class="popup-feedback__title">${title}</p>
        <p class="popup-feedback__message">${message}</p>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  popupFeedbackTimer = setTimeout(() => {
    closePopupFeedback();
    popupFeedbackTimer = null;
  }, duration);
}
/*Funciones Pop Up (fin) */

function getElementScrollState(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;

  return {
    top: el.scrollTop,
    left: el.scrollLeft
  };
}

function restoreElementScrollState(selector, scrollState) {
  if (!scrollState) return;

  const el = document.querySelector(selector);
  if (!el) return;

  el.scrollTop = scrollState.top || 0;
  el.scrollLeft = scrollState.left || 0;
}

function getInventarioScrollState() {
  return {
    panel: getElementScrollState("#container-interfas"),
    body: getElementScrollState("#container-interfas .ui-body"),
    gridWrap: getElementScrollState("#container-interfas .ui-inv-grid-wrap")
  };
}

function restoreInventarioScrollState(scrollState) {
  if (!scrollState) return;

  restoreElementScrollState("#container-interfas", scrollState.panel);
  restoreElementScrollState("#container-interfas .ui-body", scrollState.body);
  restoreElementScrollState("#container-interfas .ui-inv-grid-wrap", scrollState.gridWrap);

  requestAnimationFrame(() => {
    restoreElementScrollState("#container-interfas", scrollState.panel);
    restoreElementScrollState("#container-interfas .ui-body", scrollState.body);
    restoreElementScrollState("#container-interfas .ui-inv-grid-wrap", scrollState.gridWrap);
  });
}

function refreshInventarioUI({ restoreScroll = false, scrollState = null } = {}) {
  if (!interfaceOpen || !interfasEl || interfasEl.dataset.panel !== "inventario") return;

  const bodyEl = interfasEl.querySelector(".ui-body");
  if (!bodyEl) return;

  bodyEl.innerHTML = buildInventarioHTML();

  if (restoreScroll && scrollState) {
    restoreInventarioScrollState(scrollState);
  }
}

// =============================
// ILUM SISTEM MAPA (antorchas y chimeneas independientes)
// =============================
let ilumSistemaMapa = [];
let ilumSistemaMapaImgs = {};

const ILUM_FUEGO_PDR_MAX = 1;
const ILUM_CHIMENEA_LIGHT_RADIUS = 240;
const ILUM_ANTORCHA_LIGHT_RADIUS = TORCH_LIGHT_RADIUS;
const ILUM_ENEMY_OFF_RADIUS = 90;

function usarItemEquipadoDesdeHUD(slotIndex) {
  const item = window.equipSlots?.[slotIndex];
  if (!item) return;

  const scrollInventario = getInventarioScrollState();

  switch (item.id) {

    case "corazon":
      pdv = PDV_MAX;

      crearTextoDanio(
        player.x + 32,
        player.y - 10,
        "+" + pdv,
        "#00ffcc",
        "#00ffcc"
      );

      if (item.agotable === true) {
        item.usos = Math.max(0, (item.usos ?? 1) - 1);
        playcorazonSound()
      }

      //console.log("El usuario usará este item: corazon");
      break;

    case "bloque_de_arcilla": {
      playPushBlockSound()
      window.colocarBloqueArcillaDesdeHUD(slotIndex);

      closeInventarioPopup();

      refreshInventarioUI({ restoreScroll: true, scrollState: scrollInventario });

      break;
    }

    case "antorcha_de_fuego": {
      if (antorchaActiva.active && antorchaActiva.slotIndex === slotIndex) {
        const colocada = window.colocarAntorchaSobreBloqueArcilla(slotIndex);

        if (!colocada) {
          window.apagarAntorcha(false);
        }
      } else {
        playFuegoSound();
        window.activarAntorcha(slotIndex);
      }

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "pistola_lazer": {
      playLazerSound()
      const item = window.equipSlots?.[slotIndex];
      if (!item) return;

      if ((item.usos ?? 0) <= 0) {
        //console.log("No quedan cargas de pistola lazer");
        return;
      }

      window.lanzarDisparoLazer(item);

      item.usos -= 1;
      if (item.usos < 0) item.usos = 0;

      //console.log("Usos restantes de Pistola Lazer:", item.usos);

      if (item.agotable === true && item.desaparece_al_agotarse === true && item.usos <= 0) {
        window.equipSlots[slotIndex] = null;
      }

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "espada_de_madera": {
      playSwordSound();

      const item = window.equipSlots?.[slotIndex];
      if (!item) return;

      if ((item.usos ?? 0) <= 0) {
        //console.log("La espada de madera está agotada");
        return;
      }

      window.lanzarAtaqueEspadaMadera(slotIndex);

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "bumerang": {
      const item = window.equipSlots?.[slotIndex];
      if (!item) return;

      if ((item.usos ?? 0) <= 0) {
        //console.log("No quedan bumerangs");
        return;
      }

      lanzarBumerang(item);

      item.usos -= 1;
      if (item.usos < 0) item.usos = 0;

      //console.log("Usos restantes del Bumerang:", item.usos);

      if (item.agotable === true && item.desaparece_al_agotarse === true && item.usos <= 0) {
        window.equipSlots[slotIndex] = null;
      }

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "pico_escabador": {
      playSwordSound();

      const item = window.equipSlots?.[slotIndex];
      if (!item) return;

      if ((item.usos ?? 0) <= 0) {
        //console.log("El pico escabador está agotado");
        return;
      }

      window.lanzarAtaquePicoEscabador(slotIndex);

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "espada_de_hierro": {

      playSwordSound();

      const item = window.equipSlots?.[slotIndex];
      if (!item) return;

      window.lanzarAtaqueEspadaHierro(slotIndex);

      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) {
          bodyEl.innerHTML = buildInventarioHTML();
          restoreInventarioScrollState(scrollInventario);
        }
      }

      break;
    }

    case "escudo_de_madera":
      break;
    case "patines":
      break;
    case "escudo_de_hierro":
      break;
    case "bateria":
      playerrorSound()
      showPopupFeedback({
        title: item.nombre_item || "Item",
        message: "Este item no se puede usar en el campo. Consulta sus posibles combinaciones.",
        type: "warning",
        duration: 5000
      });
      break;
    case "rueda":
      playerrorSound()
      showPopupFeedback({
        title: item.nombre_item || "Item",
        message: "Este item no se puede usar en el campo. Consulta sus posibles combinaciones.",
        type: "warning",
        duration: 5000
      });
      break;
    case "cable":
      playerrorSound()
      showPopupFeedback({
        title: item.nombre_item || "Item",
        message: "Este item no se puede usar en el campo. Consulta sus posibles combinaciones.",
        type: "warning",
        duration: 5000
      });
      break;
    case "cuero":
      playerrorSound()
      showPopupFeedback({
        title: item.nombre_item || "Item",
        message: "Este item no se puede usar en el campo. Consulta sus posibles combinaciones.",
        type: "warning",
        duration: 5000
      });
      break;

    default:
      playerrorSound()
      showPopupFeedback({
        title: "Item no utilizable",
        message: "Este item no se puede usar en el campo. Consulta sus posibles combinaciones.",
        type: "warning",
        duration: 5000
      });
      break;
  }
}

//Estilos del DOM globales (inicio)
function ensureStyleDOMCSS() {
  if (document.getElementById("style-dom-css-link")) return;

  const link = document.createElement("link");
  link.id = "style-dom-css-link";
  link.rel = "stylesheet";
  link.href = "../styles/styleDOM.css";
  document.head.appendChild(link);
}
ensureStyleDOMCSS();

function removeGameOverDOMOverlay() {
  const old = document.getElementById("game-over-dom-overlay");
  if (old) old.remove();
}

function openGameOverDOMOverlay() {
  ensureStyleDOMCSS();
  removeGameOverDOMOverlay();

  const wrap = document.getElementById("wrap");
  if (!wrap) return;

  const heroSrc =
    (window.player && window.player.spriteSrc) ||
    localStorage.getItem("avatar") ||
    "../assets/avatares/default.png";
  const guardSrc = "../assets/avatares/enemy/centinela-reptiliano-armado.png";

  const overlay = document.createElement("div");
  overlay.id = "game-over-dom-overlay";

  overlay.innerHTML = `
  <div id="game-over-dom-panel">
    <div id="game-over-guard-left" class="game-over-dom-sprite-frame">
      <img class="game-over-dom-sprite-sheet" src="${guardSrc}" alt="Centinela izquierdo">
    </div>

    <div id="game-over-player" class="game-over-dom-sprite-frame">
      <img class="game-over-dom-sprite-sheet" src="${heroSrc}" alt="Jugador">
    </div>

    <div id="game-over-guard-right" class="game-over-dom-sprite-frame">
      <img class="game-over-dom-sprite-sheet" src="${guardSrc}" alt="Centinela derecho">
    </div>

    <div id="game-over-dom-title">GAME OVER</div>
    <div id="game-over-dom-line-1" class="game-over-dom-line">Te atraparon los reptilianos</div>
    <div id="game-over-dom-line-2" class="game-over-dom-line">Para continuar</div>
    <div id="game-over-dom-line-3" class="game-over-dom-line">tendras que pagar 3 cosmonedas</div>

    <button id="game-over-dom-continue" type="button">CONTINUAR</button>
  </div>
`;

  wrap.appendChild(overlay);

  const btn = overlay.querySelector("#game-over-dom-continue");

  btn.addEventListener("click", (e) => {
    playUISound();
    e.preventDefault();
    e.stopPropagation();
    continuarTrasGameOver();
  });

  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false });

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });


}
function continuarTrasGameOver() {
  if (cosmonedas < 3) {
    showPopupFeedback({
      title: "Sin cosmonedas",
      message: "Necesitas 3 cosmonedas para continuar.",
      type: "warning",
      duration: 5000
    });
    return;
  }

  cosmonedas -= 3;

  removeGameOverDOMOverlay();

  pdv = Math.floor(PDV_MAX / 2);
  gameOverActive = false;

  pdv = Math.max(1, pdv);

  for (const enemy of (window.enemigos || [])) {
    if (!enemy) continue;

    enemy.persiguiendo = false;
    enemy.isMoving = false;
    enemy.dirX = 0;
    enemy.dirY = 0;
    enemy.cooldownDano = 1200;
    enemy.disparoCooldown = 600;
    enemy.bubbleText = "";
    enemy.bubbleTimer = 0;

    if (typeof enemy.spawnX === "number") enemy.x = enemy.spawnX;
    if (typeof enemy.spawnY === "number") enemy.y = enemy.spawnY;
  }

  player.x = PLAYER_SPAWN_X;
  player.y = PLAYER_SPAWN_Y;
  player.walking = false;
  player.blinkTimer = 0;

  hoveredItem = null;
  hoveredCanvasInteractive = null;

  syncAmbientMusicState({ restart: true });

  if (joy) joy.style.display = "block";
  if (boxButtonsITems) boxButtonsITems.style.display = "flex";
  if (metafonButton) metafonButton.style.display = "block";
}
//Estilos del DOM globales (fin)
(() => {

  const ASSETS = {
    map: globalMap, //mapa
    hero: null, //Personaje
    shadow: "https://assets.codepen.io/21542/DemoRpgCharacterShadow.png", //Sombra del personaje (para dar sensación de profundidad)
    //shadow: "../assets/spriteAmbiente/sombra.png",
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
      : "../assets/avatares/default.png";
  }

  // Carga real del juego (solo cuando toca)
  async function loadGameAssets() {

    if (gameAssetsLoaded || gameAssetsLoading) return;

    joy.style.display = "none";
    boxButtonsITems.style.display = "none";
    metafonButton.style.display = "none";

    gameAssetsLoading = true;
    updateGameplayUIVisibility();
    loadingProgress = 0;
    loadingTarget = 0;

    try {
      const heroSrc = getHeroSrc();

      const assetsToLoad = [
        ASSETS.map,
        heroSrc,
        ASSETS.shadow,
        COSMONEDA_SRC,
        CORAZON_SRC
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

      const mapImg = await loadWithProgress(ASSETS.map);
      const heroImg = await loadWithProgress(heroSrc);
      const shadowImg = await loadWithProgress(ASSETS.shadow);
      const loadedCoin = await loadWithProgress(COSMONEDA_SRC);
      const loadedHeart = await loadWithProgress(CORAZON_SRC);

      corazonImg = loadedHeart;

      images.map = mapImg;
      images.hero = heroImg;
      images.shadow = shadowImg;
      cosmonedaImg = loadedCoin;

      gameAssetsLoaded = true;
      resizeFullscreen();

    } catch (err) {
      console.error("Error cargando assets:", err);
      gameMode = "error";
    } finally {
      gameAssetsLoading = false;
      updateGameplayUIVisibility();
    }
  }

  // Resolución lógica (SIEMPRE igual) camara
  const CAMERA_ZOOM = 1; // 1 = normal, 0.5 = más lejos, 0.25 = mucho más lejos
  const LOGICAL_W = 160;
  const LOGICAL_H = 144;

  const camera = { x: 0, y: 0, w: LOGICAL_W, h: LOGICAL_H };

  //dimenciones del mapa
  const WORLD_W = WORLD_W_GLOBAL;
  const WORLD_H = WORLD_H_GLOBAL;

  //--CARGAR ELEMENTOS DEL RATIO VISUAL SOLAMENTE (INICIO)
  //const VISUAL_CULL_MARGIN = -100; // calculo de ratio visual
  const VISUAL_CULL_MARGIN = 200;

  const DEBUG_VISUAL_CULL = true;

  function getCameraViewBounds() {
    return {
      left: camera.x - VISUAL_CULL_MARGIN,
      top: camera.y - VISUAL_CULL_MARGIN,
      right: camera.x + camera.w + VISUAL_CULL_MARGIN,
      bottom: camera.y + camera.h + VISUAL_CULL_MARGIN
    };
  }

  function drawCameraCullingDebug(ctx) {
    if (!DEBUG_VISUAL_CULL) return;

    const view = getCameraViewBounds();

    ctx.save();

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(
      view.left,
      view.top,
      view.right - view.left,
      view.bottom - view.top
    );

    ctx.setLineDash([]);
    ctx.fillStyle = "lime";
    ctx.font = "10px arcade";
    ctx.fillText("CULL AREA", view.left + 8, view.top + 14);

    ctx.restore();
  }

  function rectIntersectsCamera(x, y, w, h) {
    const view = getCameraViewBounds();

    return !(
      x + w < view.left ||
      x > view.right ||
      y + h < view.top ||
      y > view.bottom
    );
  }

  function entityIsVisible(entity) {
    if (!entity) return false;

    const w = Number(entity.w || entity.width || 0);
    const h = Number(entity.h || entity.height || 0);
    const x = Number(entity.x || 0);
    const y = Number(entity.y || 0);

    return rectIntersectsCamera(x, y, w, h);
  }

  function pointIsVisible(x, y, pad = 48) {
    return rectIntersectsCamera(x - pad, y - pad, pad * 2, pad * 2);
  }
  //--CARGAR ELEMENTOS DEL RATIO VISUAL SOLAMENTE (FIN)

  // Personaje (2x2 tiles => 32x32)
  const HERO_W = 64;
  const HERO_H = 64;

  //tamaño visual dentro del canvas
  const HERO_DRAW_W = 64;  // tamaño visual del avatar en canva
  const HERO_DRAW_H = 64;

  const PLAYER_HIT_W = 28;  //ratio ancho colicionable del avatar del usuario
  const PLAYER_HIT_H = 50; // ratio alto colicionable del abatar del usuario
  const PLAYER_OFFSET_X = (HERO_DRAW_W - PLAYER_HIT_W) / 2;
  const PLAYER_OFFSET_Y = HERO_DRAW_H - PLAYER_HIT_H;

  const canvas = document.getElementById("game");
  const wrap = document.getElementById("wrap");
  const ctx = canvas.getContext("2d");

  // =============================
  // 🪃 VARIABLES GLOBALES BUMERANG
  // =============================
  window.bumerangsActivos = [];
  window.particulasBumerang = [];

  window.particulasImpactoBloque = [];

  window.bumerangImg = new Image();
  window.bumerangImg.src = "../assets/items/bumerang.svg";
  window.bumerangsActivos = [];

  // =============================
  // 🪃 VARIABLES GLOBALES pico escabador
  // =============================
  window.ataquesPicoEscabadorActivos = [];
  window.particulasPicoEscabador = [];

  // =============================
  // 🪃 VARIABLES GLOBALES pistola lazer
  // =============================
  window.disparosLazerActivos = [];
  window.lazerColor = "#eaff00";

  // =============================
  // 🗡️ ESPADA DE MADERA - ANIMACIÓN
  // =============================
  window.ataquesEspadaMaderaActivos = [];
  window.particulasEspadaMadera = [];

  // =============================
  // 🗡️ ESPADA DE hierro - ANIMACIÓN
  // =============================
  window.ataquesEspadaHierroActivos = [];
  window.particulasEspadaHierro = [];

  let espadaMaderaLunge = {
    active: false,
    facing: "down",
    time: 0,
    timeMax: 0,
    offsetX: 0,
    offsetY: 0
  };

  let espadaMaderaFrameOverride = {
    active: false,
    frame: 0
  };

  function crearChispasImpactoBloque(x, y, colorBase = "#ffd36b") {
    for (let i = 0; i < 12; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 3.2;

      window.particulasImpactoBloque.push({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - (Math.random() * 0.8),
        size: 1.8 + Math.random() * 2.8,
        life: 180 + Math.random() * 120,
        maxLife: 300,
        color: Math.random() < 0.5 ? colorBase : "#fff4b0",
        glow: 8 + Math.random() * 8
      });
    }
    ////console.log("chispas bloque", x, y);
  }

  function drawParticulasImpactoBloque(ctx) {
    for (const p of (window.particulasImpactoBloque || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.glow || 12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function updateParticulasImpactoBloque(dtMs) {
    for (let i = window.particulasImpactoBloque.length - 1; i >= 0; i--) {
      const p = window.particulasImpactoBloque[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.97;
      p.vy *= 0.97;
      p.vy += 0.03;

      p.size *= 0.985;

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasImpactoBloque.splice(i, 1);
      }
    }
  }

  function activarLungeEspadaMadera(facing) {
    espadaMaderaLunge.active = true;
    espadaMaderaLunge.facing = facing;
    espadaMaderaLunge.time = 120;
    espadaMaderaLunge.timeMax = 120;
    espadaMaderaLunge.offsetX = 0;
    espadaMaderaLunge.offsetY = 0;

    // frame de paso hacia adelante del spritesheet
    espadaMaderaFrameOverride.active = true;
    espadaMaderaFrameOverride.frame = 1;
  }

  function lanzarAtaquePicoEscabador(slotIndex) {
    const alcance = 60;
    const duracion = 125;

    let pivotOffsetX = 0;
    let pivotOffsetY = 0;
    let anguloInicio = 0;
    let anguloFin = 0;

    if (player.facing === "up") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -2.45;
      anguloFin = -0.75;
    } else if (player.facing === "down") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 0.75;
      anguloFin = 2.45;
    } else if (player.facing === "left") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 2.35;
      anguloFin = 4.05;
    } else {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -0.85;
      anguloFin = 0.85;
    }

    activarLungeEspadaMadera(player.facing);

    window.ataquesPicoEscabadorActivos.push({
      x: player.x + 32 + pivotOffsetX,
      y: player.y + 32 + pivotOffsetY,
      pivotOffsetX,
      pivotOffsetY,
      alcance,
      tiempo: duracion,
      tiempoMax: duracion,
      anguloInicio,
      anguloFin,
      facing: player.facing,
      slotIndex,
      yaDesgasto: false,
      enemigosGolpeados: []
    });
  }

  window.lanzarAtaquePicoEscabador = lanzarAtaquePicoEscabador;

  function crearParticulasPicoEscabador(ataque) {
    const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
    const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

    const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
    const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

    for (let i = 0; i < 3; i++) {
      window.particulasPicoEscabador.push({
        x: puntaX + (Math.random() - 0.5) * 6,
        y: puntaY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: 1.8 + Math.random() * 2,
        life: 90 + Math.random() * 50,
        maxLife: 140,
        color: Math.random() < 0.5 ? "#7b5b3a" : "#a07a4f"
      });
    }
  }

  function updateAtaquesPicoEscabador(dtMs) {
    for (let i = window.ataquesPicoEscabadorActivos.length - 1; i >= 0; i--) {
      const ataque = window.ataquesPicoEscabadorActivos[i];

      ataque.x = player.x + 32 + ataque.pivotOffsetX + espadaMaderaLunge.offsetX;
      ataque.y = player.y + 32 + ataque.pivotOffsetY + espadaMaderaLunge.offsetY;
      ataque.tiempo -= dtMs;

      crearParticulasPicoEscabador(ataque);

      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
      const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

      for (let j = 0; j < (window.enemigos || []).length; j++) {
        const enemy = window.enemigos[j];
        if (!enemy) continue;
        if ((enemy.puntos_de_vida ?? 0) <= 0) continue;
        if (ataque.enemigosGolpeados.includes(enemy.id)) continue;

        const centroX = enemy.x + enemy.w / 2;
        const centroY = enemy.y + enemy.h / 2;

        const dx = puntaX - centroX;
        const dy = puntaY - centroY;
        const distancia = Math.hypot(dx, dy);
        const radioGolpe = Math.max(enemy.w, enemy.h) * 0.55;

        if (distancia > radioGolpe) continue;

        ataque.enemigosGolpeados.push(enemy.id);

        const item = window.equipSlots?.[ataque.slotIndex];
        const danio = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 0) || 0;

        enemy.puntos_de_vida = Math.max(0, (enemy.puntos_de_vida || 0) - danio);

        crearTextoDanio(
          enemy.x + enemy.w / 2,
          enemy.y - 10,
          "-" + danio,
          "#c98a3d",
          "#8b5a2b"
        );

        const push = 32;
        const pushX = Math.cos(angulo) * push;
        const pushY = Math.sin(angulo) * push;

        empujarEnemigoConColision(enemy, pushX, pushY);

        if (!ataque.yaDesgasto) {
          const itemSlot = window.equipSlots?.[ataque.slotIndex];
          if (itemSlot) {
            itemSlot.usos = Math.max(0, (itemSlot.usos ?? 0) - 1);

            if (itemSlot.agotable === true && itemSlot.desaparece_al_agotarse === true && itemSlot.usos <= 0) {
              window.equipSlots[ataque.slotIndex] = null;
            }

            if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
              const bodyEl = interfasEl.querySelector(".ui-body");
              if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
            }
          }

          ataque.yaDesgasto = true;
        }

        if (enemy.puntos_de_vida <= 0) {
          eliminarEnemigoPorDerrota(enemy);
        }

        break;
      }

      if (!ataque.yaDesgasto) {
        const item = window.equipSlots?.[ataque.slotIndex];
        const danioBloque = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 1) || 1;

        const golpeoBloque = danarBloqueArcillaEnRect(
          puntaX - 12,
          puntaY - 12,
          24,
          24,
          danioBloque,
          puntaX,
          puntaY
        );

        if (golpeoBloque) {
          const itemSlot = window.equipSlots?.[ataque.slotIndex];
          if (itemSlot) {
            itemSlot.usos = Math.max(0, (itemSlot.usos ?? 0) - 1);

            if (itemSlot.agotable === true && itemSlot.desaparece_al_agotarse === true && itemSlot.usos <= 0) {
              window.equipSlots[ataque.slotIndex] = null;
            }

            if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
              const bodyEl = interfasEl.querySelector(".ui-body");
              if (bodyEl) {
                bodyEl.innerHTML = buildInventarioHTML();
                restoreInventarioScrollState(scrollInventario);
              }
            }
          }

          ataque.yaDesgasto = true;
        }
      }

      if (ataque.tiempo <= 0) {
        window.ataquesPicoEscabadorActivos.splice(i, 1);
      }
    }
  }

  function updateParticulasPicoEscabador(dtMs) {
    for (let i = window.particulasPicoEscabador.length - 1; i >= 0; i--) {
      const p = window.particulasPicoEscabador[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.size *= 0.975;

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasPicoEscabador.splice(i, 1);
      }
    }
  }

  function drawParticulasPicoEscabador(ctx) {
    for (const p of (window.particulasPicoEscabador || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = "#7b5b3a";
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function drawAtaquesPicoEscabador(ctx) {
    for (const ataque of (window.ataquesPicoEscabadorActivos || [])) {
      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const fade = Math.max(0, ataque.tiempo / ataque.tiempoMax);
      const alpha = Math.max(0.22, fade);
      const slashScale = 0.88 + (Math.sin(progreso * Math.PI) * 0.22);

      ctx.save();
      ctx.translate(ataque.x, ataque.y);
      ctx.rotate(angulo);
      ctx.scale(slashScale, slashScale);
      ctx.globalAlpha = alpha;

      // rastro sutil del golpe
      ctx.strokeStyle = "brown";
      ctx.lineWidth = 4;
      ctx.shadowColor = "brown";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(ataque.alcance + 2, 0);
      ctx.stroke();

      // mango marrón
      ctx.fillStyle = "brown";
      ctx.shadowBlur = 0;
      ctx.fillRect(-10, -3, ataque.alcance - 20, 6);

      // cabeza de martillo negra
      const headX = ataque.alcance - 14;
      ctx.fillStyle = "black";
      const headW = 30;
      const headH = 22;

      ctx.fillStyle = "#111111";
      ctx.strokeStyle = "#2f2f2f";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#444444";
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.rect(headX, -headH / 2, headW, headH);
      ctx.fill();
      ctx.stroke();

      // unión mango-cabeza
      ctx.fillStyle = "#030303";
      ctx.fillRect(headX - 3, -4, 4, 8);

      ctx.restore();
    }
  }

  function lanzarAtaqueEspadaHierro(slotIndex) {
    const alcance = 64;
    const duracion = 120;

    let pivotOffsetX = 0;
    let pivotOffsetY = 0;
    let anguloInicio = 0;
    let anguloFin = 0;

    if (player.facing === "up") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -2.45;
      anguloFin = -0.75;
    } else if (player.facing === "down") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 0.75;
      anguloFin = 2.45;
    } else if (player.facing === "left") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 2.35;
      anguloFin = 4.05;
    } else {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -0.85;
      anguloFin = 0.85;
    }

    activarLungeEspadaMadera(player.facing);

    window.ataquesEspadaHierroActivos.push({
      x: player.x + 32 + pivotOffsetX,
      y: player.y + 32 + pivotOffsetY,
      pivotOffsetX,
      pivotOffsetY,
      alcance,
      tiempo: duracion,
      tiempoMax: duracion,
      anguloInicio,
      anguloFin,
      facing: player.facing,
      slotIndex,
      enemigosGolpeados: []
    });
  }

  window.lanzarAtaqueEspadaHierro = lanzarAtaqueEspadaHierro;

  function crearParticulasEspadaHierro(ataque) {
    const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
    const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

    const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
    const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

    for (let i = 0; i < 3; i++) {
      window.particulasEspadaHierro.push({
        x: puntaX + (Math.random() - 0.5) * 7,
        y: puntaY + (Math.random() - 0.5) * 7,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: 1.8 + Math.random() * 2,
        life: 100 + Math.random() * 50,
        maxLife: 150,
        color: Math.random() < 0.5 ? "#cfd4da" : "#d8ff7a"
      });
    }
  }

  function updateAtaquesEspadaHierro(dtMs) {
    for (let i = window.ataquesEspadaHierroActivos.length - 1; i >= 0; i--) {
      const ataque = window.ataquesEspadaHierroActivos[i];

      ataque.x = player.x + 32 + ataque.pivotOffsetX + espadaMaderaLunge.offsetX;
      ataque.y = player.y + 32 + ataque.pivotOffsetY + espadaMaderaLunge.offsetY;
      ataque.tiempo -= dtMs;

      crearParticulasEspadaHierro(ataque);

      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
      const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

      for (let j = 0; j < (window.enemigos || []).length; j++) {
        const enemy = window.enemigos[j];
        if (!enemy) continue;
        if ((enemy.puntos_de_vida ?? 0) <= 0) continue;
        if (ataque.enemigosGolpeados.includes(enemy.id)) continue;

        const centroX = enemy.x + enemy.w / 2;
        const centroY = enemy.y + enemy.h / 2;

        const dx = puntaX - centroX;
        const dy = puntaY - centroY;
        const distancia = Math.hypot(dx, dy);
        const radioGolpe = Math.max(enemy.w, enemy.h) * 0.55;

        if (distancia > radioGolpe) continue;

        ataque.enemigosGolpeados.push(enemy.id);

        const item = window.equipSlots?.[ataque.slotIndex];
        const danio = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 0) || 0;

        enemy.puntos_de_vida = Math.max(0, (enemy.puntos_de_vida || 0) - danio);

        crearTextoDanio(
          enemy.x + enemy.w / 2,
          enemy.y - 10,
          "-" + danio,
          "#e5ecf5",
          "#d8ff7a"
        );

        const push = 32;
        const pushX = Math.cos(angulo) * push;
        const pushY = Math.sin(angulo) * push;

        empujarEnemigoConColision(enemy, pushX, pushY);

        if (enemy.puntos_de_vida <= 0) {
          eliminarEnemigoPorDerrota(enemy);
        }

        break;
      }

      const item = window.equipSlots?.[ataque.slotIndex];
      const danioBloque = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 1) || 1;

      danarBloqueArcillaEnRect(
        puntaX - 10,
        puntaY - 10,
        20,
        20,
        danioBloque,
        puntaX,
        puntaY
      );

      if (ataque.tiempo <= 0) {
        window.ataquesEspadaHierroActivos.splice(i, 1);
      }
    }
  }

  function updateParticulasEspadaHierro(dtMs) {
    for (let i = window.particulasEspadaHierro.length - 1; i >= 0; i--) {
      const p = window.particulasEspadaHierro[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.size *= 0.975;

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasEspadaHierro.splice(i, 1);
      }
    }
  }

  function drawParticulasEspadaHierro(ctx) {
    for (const p of (window.particulasEspadaHierro || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = "#d8ff7a";
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function drawAtaquesEspadaHierro(ctx) {
    for (const ataque of (window.ataquesEspadaHierroActivos || [])) {
      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const fade = Math.max(0, ataque.tiempo / ataque.tiempoMax);
      const alpha = Math.max(0.18, fade);
      const slashScale = 0.85 + (Math.sin(progreso * Math.PI) * 0.34);

      ctx.save();
      ctx.translate(ataque.x, ataque.y);
      ctx.rotate(angulo);
      ctx.scale(slashScale, slashScale);
      ctx.globalAlpha = alpha;

      // rastro
      ctx.strokeStyle = "#d8ff7a";
      ctx.lineWidth = 6;
      ctx.shadowColor = "#d8ff7a";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(ataque.alcance + 14, 0);
      ctx.stroke();

      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth = 10;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(ataque.alcance + 6, 0);
      ctx.stroke();

      ctx.globalAlpha = alpha;

      // hoja metalizada
      ctx.fillStyle = "#cfd4da";
      ctx.strokeStyle = "#f4f7fb";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#d8ff7a";
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(ataque.alcance - 12, -4);
      ctx.lineTo(ataque.alcance + 12, 0);
      ctx.lineTo(ataque.alcance - 12, 4);
      ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // brillo interno
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(ataque.alcance - 6, 0);
      ctx.stroke();

      // mango metálico
      ctx.fillStyle = "#7f8a96";
      ctx.shadowBlur = 0;
      ctx.fillRect(-10, -3.5, 12, 7);

      ctx.restore();
    }
  }

  function lanzarAtaqueEspadaMadera(slotIndex) {
    const alcance = 58;
    const duracion = 120;

    let pivotOffsetX = 0;
    let pivotOffsetY = 0;
    let anguloInicio = 0;
    let anguloFin = 0;

    if (player.facing === "up") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -2.45;
      anguloFin = -0.75;
    } else if (player.facing === "down") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 0.75;
      anguloFin = 2.45;
    } else if (player.facing === "left") {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = 2.35;
      anguloFin = 4.05;
    } else {
      pivotOffsetX = 0;
      pivotOffsetY = 4;
      anguloInicio = -0.85;
      anguloFin = 0.85;
    }

    activarLungeEspadaMadera(player.facing);

    window.ataquesEspadaMaderaActivos.push({
      x: player.x + 32 + pivotOffsetX,
      y: player.y + 32 + pivotOffsetY,
      pivotOffsetX,
      pivotOffsetY,
      alcance,
      tiempo: duracion,
      tiempoMax: duracion,
      anguloInicio,
      anguloFin,
      facing: player.facing,
      slotIndex,
      yaDesgasto: false,
      enemigosGolpeados: []
    });
  }

  window.lanzarAtaqueEspadaMadera = lanzarAtaqueEspadaMadera;

  function consumirUsoEspadaMadera(slotIndex) {
    const item = window.equipSlots?.[slotIndex];
    if (!item) return;

    item.usos = Math.max(0, (item.usos ?? 0) - 1);

    if (item.agotable === true && item.desaparece_al_agotarse === true && item.usos <= 0) {
      window.equipSlots[slotIndex] = null;
    }

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  }

  function crearParticulasEspadaMadera(ataque) {
    const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
    const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

    const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
    const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

    for (let i = 0; i < 2; i++) {
      window.particulasEspadaMadera.push({
        x: puntaX + (Math.random() - 0.5) * 6,
        y: puntaY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 1.6 + Math.random() * 1.8,
        life: 90 + Math.random() * 40,
        maxLife: 130,
        color: Math.random() < 0.5 ? "#8b5a2b" : "#c8ff66"
      });
    }
  }

  function updateAtaquesEspadaMadera(dtMs) {

    if (espadaMaderaLunge.active) {
      espadaMaderaLunge.time -= dtMs;

      const progreso = 1 - Math.max(0, espadaMaderaLunge.time) / espadaMaderaLunge.timeMax;
      const fuerza = Math.sin(progreso * Math.PI) * 10;

      espadaMaderaLunge.offsetX = 0;
      espadaMaderaLunge.offsetY = 0;

      if (espadaMaderaLunge.facing === "up") {
        espadaMaderaLunge.offsetY = -fuerza;
      } else if (espadaMaderaLunge.facing === "down") {
        espadaMaderaLunge.offsetY = fuerza;
      } else if (espadaMaderaLunge.facing === "left") {
        espadaMaderaLunge.offsetX = -fuerza;
      } else if (espadaMaderaLunge.facing === "right") {
        espadaMaderaLunge.offsetX = fuerza;
      }

      if (espadaMaderaLunge.time <= 0) {
        espadaMaderaLunge.active = false;
        espadaMaderaLunge.offsetX = 0;
        espadaMaderaLunge.offsetY = 0;

        espadaMaderaFrameOverride.active = false;
        espadaMaderaFrameOverride.frame = 0;
      }
    }

    for (let i = window.ataquesEspadaMaderaActivos.length - 1; i >= 0; i--) {
      const ataque = window.ataquesEspadaMaderaActivos[i];

      ataque.x = player.x + 32 + ataque.pivotOffsetX + espadaMaderaLunge.offsetX;
      ataque.y = player.y + 32 + ataque.pivotOffsetY + espadaMaderaLunge.offsetY;
      ataque.tiempo -= dtMs;

      crearParticulasEspadaMadera(ataque);

      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const puntaX = ataque.x + Math.cos(angulo) * ataque.alcance;
      const puntaY = ataque.y + Math.sin(angulo) * ataque.alcance;

      for (let j = 0; j < (window.enemigos || []).length; j++) {
        const enemy = window.enemigos[j];
        if (!enemy) continue;
        if ((enemy.puntos_de_vida ?? 0) <= 0) continue;
        if (ataque.enemigosGolpeados.includes(enemy.id)) continue;

        const centroX = enemy.x + enemy.w / 2;
        const centroY = enemy.y + enemy.h / 2;

        const dx = puntaX - centroX;
        const dy = puntaY - centroY;
        const distancia = Math.hypot(dx, dy);
        const radioGolpe = Math.max(enemy.w, enemy.h) * 0.55;

        if (distancia > radioGolpe) continue;

        ataque.enemigosGolpeados.push(enemy.id);

        const item = window.equipSlots?.[ataque.slotIndex];
        const danio = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 0) || 0;

        enemy.puntos_de_vida = Math.max(0, (enemy.puntos_de_vida || 0) - danio);

        crearTextoDanio(
          enemy.x + enemy.w / 2,
          enemy.y - 10,
          "-" + danio,
          "#ffb347",
          "#ff7b00"
        );

        const push = 32;
        const pushX = Math.cos(angulo) * push;
        const pushY = Math.sin(angulo) * push;

        empujarEnemigoConColision(enemy, pushX, pushY);

        if (!ataque.yaDesgasto) {
          consumirUsoEspadaMadera(ataque.slotIndex);
          ataque.yaDesgasto = true;
        }

        if (enemy.puntos_de_vida <= 0) {
          eliminarEnemigoPorDerrota(enemy);
        }

        break;
      }
      if (!ataque.yaDesgasto) {
        const item = window.equipSlots?.[ataque.slotIndex];
        const danioBloque = Number(item?.cuanto_quita_de_vida_al_enemigo ?? 1) || 1;

        const golpeoBloque = danarBloqueArcillaEnRect(
          puntaX - 10,
          puntaY - 10,
          20,
          20,
          danioBloque,
          puntaX,
          puntaY
        );

        if (golpeoBloque) {
          consumirUsoEspadaMadera(ataque.slotIndex);
          ataque.yaDesgasto = true;
        }
      }
      if (ataque.tiempo <= 0) {
        window.ataquesEspadaMaderaActivos.splice(i, 1);
      }
    }
  }

  function updateParticulasEspadaMadera(dtMs) {
    for (let i = window.particulasEspadaMadera.length - 1; i >= 0; i--) {
      const p = window.particulasEspadaMadera[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.size *= 0.975;

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasEspadaMadera.splice(i, 1);
      }
    }
  }

  function drawParticulasEspadaMadera(ctx) {
    for (const p of (window.particulasEspadaMadera || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = "#c8ff66";
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function drawAtaquesEspadaMadera(ctx) {
    for (const ataque of (window.ataquesEspadaMaderaActivos || [])) {
      const progreso = 1 - (ataque.tiempo / ataque.tiempoMax);
      const angulo = ataque.anguloInicio + (ataque.anguloFin - ataque.anguloInicio) * progreso;

      const fade = Math.max(0, ataque.tiempo / ataque.tiempoMax);
      const alpha = Math.max(0.18, fade);
      const slashScale = 0.82 + (Math.sin(progreso * Math.PI) * 0.32);

      ctx.save();
      ctx.translate(ataque.x, ataque.y);
      ctx.rotate(angulo);
      ctx.scale(slashScale, slashScale);
      ctx.globalAlpha = alpha;

      // rastro feroz del corte
      ctx.strokeStyle = "#c8ff66";
      ctx.lineWidth = 6;
      ctx.shadowColor = "#c8ff66";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(ataque.alcance + 14, 0);
      ctx.stroke();

      // estela extra para dar sensación de velocidad
      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth = 10;
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(ataque.alcance + 6, 0);
      ctx.stroke();

      ctx.globalAlpha = alpha;

      // hoja
      ctx.fillStyle = "#8b5a2b";
      ctx.strokeStyle = "#d8ff7a";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#d8ff7a";
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(ataque.alcance - 12, -4);
      ctx.lineTo(ataque.alcance + 10, 0);
      ctx.lineTo(ataque.alcance - 12, 4);
      ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // brillo interno
      ctx.strokeStyle = "#e8ff9a";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(ataque.alcance - 6, 0);
      ctx.stroke();

      // mango
      ctx.fillStyle = "#5c3a1e";
      ctx.shadowBlur = 0;
      ctx.fillRect(-10, -3.5, 12, 7);

      ctx.restore();
    }
  }

  // Scroll con rueda (desktop)
  canvas.addEventListener("wheel", (e) => {
    if (gameMode !== "checking" || checkingStep !== "profession") return;

    e.preventDefault();
    professionScroll += (e.deltaY > 0 ? 8 : -8);
  }, { passive: false });

  canvas.addEventListener("pointerdown", (e) => {
    if (!gameOverActive) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const btn = gameOverState.continueBtn;

    const hit =
      clickX >= btn.x &&
      clickX <= btn.x + btn.w &&
      clickY >= btn.y &&
      clickY <= btn.y + btn.h;

    if (!hit) return;

    e.preventDefault();
    e.stopPropagation();

    continuarTrasGameOver();
  }, { passive: false });

  canvas.addEventListener("pointerdown", (e) => {
    if (gameMode !== "playing") return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hitboxes = window.hudEquipHitboxes || [];

    for (const hb of hitboxes) {
      if (
        clickX >= hb.x &&
        clickX <= hb.x + hb.w &&
        clickY >= hb.y &&
        clickY <= hb.y + hb.h
      ) {
        e.preventDefault();
        e.stopPropagation();
        usarItemEquipadoDesdeHUD(hb.slotIndex);
        return;
      }
    }
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

  function getItemAtCanvasPosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();

    const worldX = (clientX - rect.left) / scale + camera.x;
    const worldY = (clientY - rect.top) / scale + camera.y;

    for (const item of items) {
      if (
        worldX >= item.x &&
        worldX <= item.x + item.size &&
        worldY >= item.y &&
        worldY <= item.y + item.size
      ) {
        return item;
      }
    }

    return null;
  }

  function tomarItemSeleccionado(itemTomado) {
    if (!itemTomado) return;

    const agregado = agregarItemAlInventario(itemTomado);

    if (!agregado) {
      //console.log("Inventario lleno");
      playerrorSound()
      return;
    }

    //console.log("El usuario tomó el ITEM:", itemTomado.nombre_item);

    const ultimaInstanciaRecogida = itemTomado.instancia_id || null;

    items = items.filter(i => i !== itemTomado);

    if (hoveredItem === itemTomado) {
      hoveredItem = null;
    }

    /*
     const activeMissionId = window.missionSystem.activeMissionId;
     if (activeMissionId) {
       validarPasoRecolectarItems(activeMissionId);
     }
   */
    if (items.length === 0) {
      cargarItemsEnMapa({
        excluirInstanciaId: ultimaInstanciaRecogida,
        limpiarAntes: false
      });
    }

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  }

  // Mouse hover en desktop
  canvas.addEventListener("mousemove", (e) => {
    if (gameMode !== "playing") return;

    hoveredItem = getItemAtCanvasPosition(e.clientX, e.clientY);
    hoveredCanvasInteractive = getHoveredCanvasInteractive(e.clientX, e.clientY);

    canvas.style.cursor = 'url("../assets/cursor.png") 0 0, auto';
  });

  // Salir del canvas limpia hover
  canvas.addEventListener("mouseleave", () => {
    hoveredItem = null;
    hoveredCanvasInteractive = null;
    canvas.style.cursor = 'url("../assets/cursor.png") 0 0, auto';
  });

  // Click mouse desktop
  canvas.addEventListener("click", (e) => {
    if (gameMode !== "playing") return;

    const itemTomado = getItemAtCanvasPosition(e.clientX, e.clientY);
    if (!itemTomado) return;

    tomarItemSeleccionado(itemTomado);
  });

  // Touch / móvil
  canvas.addEventListener("pointerdown", (e) => {
    if (gameMode !== "playing") return;
    if (e.pointerType === "mouse") return;
    if (npcDialogOpen) return;

    const npc = getNPCAtCanvasPosition(e.clientX, e.clientY);
    if (npc) {
      if (isPlayerNearNPC(npc)) {
        e.preventDefault();
        e.stopPropagation();
        openNPCDialog(npc);
      }
      return;
    }

    const itemTomado = getItemAtCanvasPosition(e.clientX, e.clientY);
    if (!itemTomado) return;

    e.preventDefault();
    hoveredItem = itemTomado;
    tomarItemSeleccionado(itemTomado);
  }, { passive: false });

  canvas.addEventListener("pointerup", () => { touchStartY = null; });
  canvas.addEventListener("pointercancel", () => { touchStartY = null; });

  // IMPORTANTE: sin suavizado
  ctx.imageSmoothingEnabled = false;

  let scale = 1;

  /*Función para formato responsivo del canvas*/

  let gameState = null;
  //let lastGameState = null;

  function setGameState(next) {
    if (gameState === next) return;
    gameState = next;
    resizeFullscreen();
    updateGameplayUIVisibility();
  }

  /*Sistema de antorchas y chimeneas (inicio) */

  async function cargarIlumSistemaMapa() {
    const res = await fetch("./world.JSON/ilumSistemMapa.json");
    const data = await res.json();

    const lista = Array.isArray(data) ? data : (data.objetos || []);

    ilumSistemaMapa = lista.map((obj, index) => ({
      nombre_id: obj.nombre_id || `ilum_${index}`,
      tipo: obj.tipo || "antorcha",
      imagen: obj.imagen || "",
      h: Number(obj.h) || (obj.tipo === "chimenea" ? 120 : 60),
      w: Number(obj.w) || (obj.tipo === "chimenea" ? 120 : 60),
      x: Number(obj.x) || 0,
      y: Number(obj.y) || 0,
      color: obj.color ?? null,
      function: obj.function || null,

      encendida: false,
      pdr_fuego: 0,
      fuegoAnim: Math.random() * Math.PI * 2,
      img: null
    }));

    //console.log("IlumSystem cargado:", ilumSistemaMapa);
  }

  async function preloadIlumSistemaMapa() {
    ////console.log("Preload ilumSystem iniciado. Objetos:", ilumSistemaMapa);

    await Promise.all(
      ilumSistemaMapa.map(obj => new Promise((resolve) => {
        if (!obj.imagen) {
          console.warn("Objeto sin imagen:", obj.nombre_id);
          obj.img = null;
          resolve();
          return;
        }

        const img = new Image();

        img.onload = () => {
          //console.log("Imagen asignada a:", obj.nombre_id, "=>", obj.imagen);
          obj.img = img;
          resolve();
        };

        img.onerror = () => {
          console.warn("No cargó imagen ilumSistemMapa:", obj.nombre_id, obj.imagen);
          obj.img = null;
          resolve();
        };

        img.src = obj.imagen + "?v=" + encodeURIComponent(obj.nombre_id);
      }))
    );

    ////console.log("Preload ilumSystem finalizado:", ilumSistemaMapa);
  }

  /*
  function getRectIlumObjeto(obj) {
    return {
      x: obj.x,
      y: obj.y,
      w: obj.w,
      h: obj.h
    };
  }
  
  function getPlayerRectIlum() {
    return {
      x: player.x + PLAYER_OFFSET_X,
      y: player.y + PLAYER_OFFSET_Y,
      w: PLAYER_HIT_W,
      h: PLAYER_HIT_H
    };
  }
  */

  function encenderObjetoIlumMapa(obj) {
    if (!obj || obj.encendida) return;

    playFuegoSound();

    obj.encendida = true;
    obj.pdr_fuego = ILUM_FUEGO_PDR_MAX;

    if (obj.function && typeof window[obj.function] === "function") {
      window[obj.function](obj);
    }
  }

  function apagarObjetoIlumMapa(obj) {
    if (!obj) return;
    obj.encendida = false;
    obj.pdr_fuego = 0;
  }

  function enemigoCercaDeIlum(obj) {
    const listaEnemigos = window.enemigos || [];

    const luzX = obj.x + obj.w / 2;
    const luzY = obj.tipo === "chimenea"
      ? (obj.y + obj.h * 0.78)
      : (obj.y + obj.h * 0.18);

    for (const enemy of listaEnemigos) {
      if (!enemy) continue;
      if ((enemy.puntos_de_vida ?? 0) <= 0) continue;

      const ex = enemy.x + enemy.w / 2;
      const ey = enemy.y + enemy.h / 2;

      const dist = Math.hypot(ex - luzX, ey - luzY);
      if (dist <= ILUM_ENEMY_OFF_RADIUS) {
        return true;
      }
    }

    return false;
  }

  function updateIlumSistemaMapa(dtMs) {
    for (const obj of ilumSistemaMapa) {
      if (!obj) continue;

      obj.fuegoAnim += dtMs * 0.01;

      const playerCenterX = player.x + HERO_DRAW_W / 2;
      const playerCenterY = player.y + HERO_DRAW_H / 2;

      const objCenterX = obj.x + obj.w / 2;
      const objCenterY = obj.y + obj.h / 2;

      const distanciaJugador = Math.hypot(
        playerCenterX - objCenterX,
        playerCenterY - objCenterY
      );

      const radioActivacion = obj.tipo === "chimenea" ? 90 : 55;

      const puedeEncender =
        antorchaActiva?.active === true &&
        antorchaActiva?.slotIndex >= 0;

      if (!obj.encendida && puedeEncender && distanciaJugador <= radioActivacion) {
        encenderObjetoIlumMapa(obj);
      }

      if (obj.encendida && enemigoCercaDeIlum(obj)) {
        apagarObjetoIlumMapa(obj);
      }
    }
  }

  function drawFuegoIlumMapa(ctx, obj) {
    const t = performance.now() * 0.01 + obj.fuegoAnim;

    const fx = obj.x + obj.w / 2;
    const fy = obj.tipo === "chimenea"
      ? (obj.y + obj.h * 0.78)
      : (obj.y + obj.h * 0.16);

    const baseW = obj.tipo === "chimenea" ? 20 : 12;
    const baseH = obj.tipo === "chimenea" ? 30 : 20;

    ctx.save();
    ctx.translate(fx, fy);

    // fuego exterior
    ctx.fillStyle = "#ff6a00";
    ctx.shadowColor = "#ff7b00";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(0, -baseH - Math.sin(t) * 1.5);
    ctx.quadraticCurveTo(baseW, -baseH * 0.4, 0, 0);
    ctx.quadraticCurveTo(-baseW, -baseH * 0.45, 0, -baseH - Math.sin(t) * 1.5);
    ctx.fill();

    // fuego medio
    ctx.fillStyle = "#ffd400";
    ctx.beginPath();
    ctx.moveTo(0, -baseH * 0.8 - Math.sin(t * 1.4) * 1.2);
    ctx.quadraticCurveTo(baseW * 0.55, -baseH * 0.28, 0, -1);
    ctx.quadraticCurveTo(-baseW * 0.55, -baseH * 0.34, 0, -baseH * 0.8 - Math.sin(t * 1.4) * 1.2);
    ctx.fill();

    // núcleo
    ctx.fillStyle = "#fff7b0";
    ctx.beginPath();
    ctx.moveTo(0, -baseH * 0.62 - Math.sin(t * 1.8));
    ctx.quadraticCurveTo(baseW * 0.25, -baseH * 0.22, 0, -3);
    ctx.quadraticCurveTo(-baseW * 0.25, -baseH * 0.26, 0, -baseH * 0.62 - Math.sin(t * 1.8));
    ctx.fill();

    ctx.restore();
  }

  function drawIlumSistemaMapa(ctx) {
    for (const obj of ilumSistemaMapa) {
      if (!obj) continue;
      if (!rectIntersectsCamera(obj.x, obj.y, obj.w, obj.h)) continue;
      const imgOk =
        obj.img &&
        obj.img.complete &&
        obj.img.naturalWidth > 0 &&
        obj.img.naturalHeight > 0;

      if (imgOk) {
        drawImageCover(ctx, obj.img, obj.x, obj.y, obj.w, obj.h);
      } else {
        ctx.strokeStyle = obj.color || "#00ffcc";
        ctx.lineWidth = 2;
        ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
      }

      if (obj.encendida && obj.pdr_fuego > 0) {
        drawFuegoIlumMapa(ctx, obj);
      }
    }
  }

  function drawImageCover(ctx, img, dx, dy, dw, dh) {
    if (!img || !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) {
      return;
    }

    const sw = img.naturalWidth;
    const sh = img.naturalHeight;

    const scale = Math.max(dw / sw, dh / sh);

    const rw = sw * scale;
    const rh = sh * scale;

    const sx = (dw - rw) / 2;
    const sy = (dh - rh) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(dx, dy, dw, dh);
    ctx.clip();

    ctx.drawImage(
      img,
      dx + sx,
      dy + sy,
      rw,
      rh
    );

    ctx.restore();
  }

  function getLucesIlumSistemaMapa() {
    return ilumSistemaMapa
      .filter(obj => obj && obj.encendida && obj.pdr_fuego > 0)
      .map(obj => ({
        x: obj.x + obj.w / 2,
        y: obj.tipo === "chimenea"
          ? (obj.y + obj.h * 0.78)
          : (obj.y + obj.h * 0.16),
        radius: obj.tipo === "chimenea"
          ? ILUM_CHIMENEA_LIGHT_RADIUS
          : ILUM_ANTORCHA_LIGHT_RADIUS
      }));
  }

  /*Sistemas de antorchas y chimeneas (fin) */
  function updateGameplayUIVisibility() {
    const mostrarUI =
      gameState === "gamePlay" &&
      gameAssetsLoaded &&
      !gameAssetsLoading &&
      !gameOverActive;

    if (mostrarUI) {
      joy.style.display = "block";
      boxButtonsITems.style.display = "flex";
      metafonButton.style.display = "block";
    } else {
      joy.style.display = "none";
      boxButtonsITems.style.display = "none";
      metafonButton.style.display = "none";
    }
  }

  function resizeFullscreen() {
    const rect = wrap.getBoundingClientRect();

    switch (gameState) {

      case "gender":
        canvas.width = 340;
        canvas.height = 200;
        canvas.style.width = "340px";
        canvas.style.height = "200px";

        joy.style.display = "none";
        boxButtonsITems.style.display = "none";

        metafonButton.style.display = "none";

        break;

      case "avatar":
        canvas.width = 340;
        canvas.height = 620;
        canvas.style.width = "340px";
        canvas.style.height = "620px";
        break;

      case "profession":
        canvas.width = 340;
        canvas.height = 400;
        canvas.style.width = "340px";
        canvas.style.height = "400px";
        break;

      case "gamePlay":
      default:
        canvas.width = rect.width;
        canvas.height = rect.height;

        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        break;
    }

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

  loadImage("../assets/avatares/enemy/centinela-reptiliano-armado.png")
    .then(img => {
      gameOverState.centinelaIzqImg = img;
      gameOverState.centinelaDerImg = img;
    })
    .catch(() => {
      console.warn("No cargó imagen de centinela armado para GAME OVER");
    });

  // Input
  const held = [];
  const dirs = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const keyToDir = {
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    w: "up", s: "down", a: "left", d: "right",
    W: "up", S: "down", A: "left", D: "right",
  };

  window.addEventListener("keydown", (e) => {

    // =============================
    // 🔒 Bloqueos globales
    // =============================
    if (gameOverActive) return;

    const tag = (e.target?.tagName || "").toLowerCase();
    const isEditable =
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      e.target?.isContentEditable;

    if (isEditable) return;

    const key = String(e.key || "").toLowerCase();

    // =============================
    // ⌨️ MOVIMIENTO
    // =============================
    const dir = keyToDir[e.key];
    if (dir) {
      if (!held.includes(dir)) held.unshift(dir);
      e.preventDefault();
      return;
    }

    // =============================
    // 🪃 USO DE ITEMS (Q / E)
    // =============================
    if (gameMode === "playing" && !npcDialogOpen && !e.repeat) {

      if (key === "q") {
        usarItemEquipadoDesdeHUD(0);
        e.preventDefault();
        return;
      }

      if (key === "e") {
        usarItemEquipadoDesdeHUD(1);
        e.preventDefault();
        return;
      }
    }

    // =============================
    // ❌ CERRAR DIÁLOGO
    // =============================
    if (e.key === "Escape" && npcDialogOpen) {
      closeNPCDialog();
    }

  });

  window.addEventListener("keyup", (e) => {
    const dir = keyToDir[e.key];
    if (!dir) return;
    const i = held.indexOf(dir);
    if (i !== -1) held.splice(i, 1);
    e.preventDefault();
  });

  // Dpad
  //let pressed = false;

  const clearHeld = () => { held.length = 0; };

  window.addEventListener("pointerup", () => { pressed = false; clearHeld(); });

  // Estado
  const player = {
    x: userPostX, y: userPostY, speed: 3, //datos Avatar: Coordenadas - Velocidad
    facing: "down", walking: false,
    frame: 0, frameTimer: 0, frameDurationMs: 150, blinkTimer: 0,
  };

  window.player = player;

  let npcs = []; // arreglo donde se almacenan los NPC

  //-- NPC's Ambiente
  let npcsAmbiente = [];
  window.npcsAmbiente = npcsAmbiente;

  //--Enemigos
  async function cargarEnemigos() {
    const response = await fetch("./world.JSON/enemy.json");
    const data = await response.json();

    const lista = Array.isArray(data) ? data : (data.enemigos || []);

    return lista.map((enemy, index) => ({
      id: enemy.id || `enemy_${index}`,
      nombre: enemy.nombre || `Enemigo-${index + 1}`,
      tipo: enemy.tipo || "basico",
      imageSrc: enemy.imagen,
      img: null,

      x: Number(enemy.posicion?.x ?? enemy.x) || 0,
      y: Number(enemy.posicion?.y ?? enemy.y) || 0,
      spawnX: Number(enemy.posicion?.x ?? enemy.x) || 0,
      spawnY: Number(enemy.posicion?.y ?? enemy.y) || 0,

      w: Number(enemy.tamano?.w ?? enemy.w) || 64,
      h: Number(enemy.tamano?.h ?? enemy.h) || 64,

      puntos_de_vida: Number(enemy.puntos_de_vida) || 30,
      puntos_de_ataque: Number(enemy.puntos_de_ataque) || 5,
      ejecucion_script: enemy.ejecucion_script || null,
      atackAnimation: enemy.atackAnimation || null,

      velocidad: Number(enemy.Speed_enemy) || 1.4,

      dialogos_automaticos: Array.isArray(enemy.dialogos) ? enemy.dialogos : [],
      dialogos_Atack: Array.isArray(enemy.dialogos_Atack) ? enemy.dialogos_Atack : [],

      dirX: 0,
      dirY: 0,
      isMoving: false,
      pasosRestantes: 0,
      tiempoCambioDecision: 0,
      tiempoMinDecision: 1500,
      tiempoMaxDecision: 12000,

      persiguiendo: false,
      radioVision: Number(enemy.radioVision) || 500,
      cooldownDano: 0,

      modoCombate: "correr",
      disparoCooldown: 0,
      largoDisparo: 28,
      velocidadDisparo: 8.5,
      tiempoMinDecisionCombate: 350,
      tiempoMaxDecisionCombate: 900,

      bubbleText: "",
      bubbleTimer: 0,
      bubbleMaxTime: 4000,
      tiempoHablaCooldown: 0,
      tiempoMinHabla: 1800,
      tiempoMaxHabla: 5000,

      facing: "down",
      frame: 0,
      frameTimer: 0,
      frameDurationMs: 140,
      frameWidth: 64,
      frameHeight: 64,
      totalFrames: 4,

      rodeando: false,
      ladoRodeo: null,
      rodeoDirOriginalX: 0,
      rodeoDirOriginalY: 0,
      rodeoDirX: 0,
      rodeoDirY: 0,
      rodeoTimer: 0,
      rodeoIntentos: 0,
      ultimoObstaculoId: null,

      modoEscape: "normal",
      arcillaObjetivoId: null,
      cooldownGolpeEscape: 0,
      tiempoEncerrado: 0,
      encierroCheckTimer: 0,
      encierroCheckX: Number(enemy.posicion?.x ?? enemy.x) || 0,
      encierroCheckY: Number(enemy.posicion?.y ?? enemy.y) || 0,
      encierroOrigenX: Number(enemy.posicion?.x ?? enemy.x) || 0,
      encierroOrigenY: Number(enemy.posicion?.y ?? enemy.y) || 0,

      objetivoFuegoId: null,
      modoObjetivoTemporal: null,

      // =============================
      // 🔥 ATAQUE ESPECIAL JEFE
      // =============================
      cooldownAtaqueEspecial: enemy.tipo === "jefe" ? (2200 + Math.random() * 2400) : 0,
      ataqueEspecialPreparando: false,
      ataqueEspecialActivo: false,
      ataqueEspecialHitAplicado: false,
      ataqueEspecialDecisionMin: 1800,
      ataqueEspecialDecisionMax: 4200,
      ataqueEspecialProbabilidad: 0.38
    }));
  }

  //--lógica NPC's ambiente
  async function cargarNPCsAmbiente() {
    const response = await fetch("./world.JSON/NPCambiente.json");
    const data = await response.json();

    const lista = Array.isArray(data) ? data : (data.npcs || []);

    return lista.map((npc, index) => ({
      id: npc.id || `npc_amb_${index}`,
      nombre: npc.nombre || `NPC-${index + 1}`,
      imageSrc: npc.imagen,
      img: null,

      x: Number(npc.x) || 0,
      y: Number(npc.y) || 0,
      baseX: Number(npc.x) || 0,
      baseY: Number(npc.y) || 0,

      w: Number(npc.w) || 64,
      h: Number(npc.h) || 64,

      velocidad: Number(npc.velocidad) || 1,
      dialogos_automaticos: Array.isArray(npc.dialogos_automaticos) ? npc.dialogos_automaticos : [],
      dialogos_miedo: Array.isArray(npc.dialogos_miedo) ? npc.dialogos_miedo : [],

      dirX: 0,
      dirY: 0,
      isMoving: false,
      pasosRestantes: 0,
      tiempoCambioDecision: 0,
      tiempoMaxDecision: 12000,
      tiempoMinDecision: 1500,

      bubbleText: "",
      bubbleTimer: 0,
      bubbleMaxTime: 4000,

      tiempoHablaCooldown: 0,
      tiempoMinHabla: 4000,
      tiempoMaxHabla: 12000,

      facing: "down",
      frame: 0,
      frameTimer: 0,
      frameDurationMs: 170,
      frameWidth: 64,
      frameHeight: 64,
      totalFrames: 4,

      miedoActivo: false,

      rodeando: false,
      ladoRodeo: null,
      rodeoDirOriginalX: 0,
      rodeoDirOriginalY: 0,
      rodeoDirX: 0,
      rodeoDirY: 0,
      rodeoTimer: 0,
      rodeoIntentos: 0,
      ultimoObstaculoId: null
    }));
  }
  //--Lógica Valiente
  function algoritmoValiente(npc, dtMs) {

    const enemigoCerca = buscarEnemigoCercano(npc);

    if (!enemigoCerca) return;

    npc.valienteTimer += dtMs;

    if (npc.valienteTimer >= npc.valienteCooldown) {

      const frase =
        FRASES_VALIENTES[
        Math.floor(Math.random() * FRASES_VALIENTES.length)
        ];

      npc.bubbleText = frase;
      npc.bubbleTimer = 2500;

      npc.valienteTimer = 0;
    }
  }

  function drawBubbleNPCMision(ctx, npc) {

    if (!npc?.bubbleText || npc.bubbleTimer <= 0) return;

    const text = npc.bubbleText;
    const fontSize = 12;
    const paddingX = 8;
    const paddingY = 6;
    const lineHeight = 14;
    const maxCharsPerLine = 22;

    ctx.save();
    ctx.font = `${fontSize}px arcade`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
      const test = line ? `${line} ${word}` : word;

      if (test.length <= maxCharsPerLine) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }

    if (line) lines.push(line);

    const longest = lines.reduce((a, b) => a.length > b.length ? a : b, "");
    const bubbleW = Math.max(40, ctx.measureText(longest).width + paddingX * 2);
    const bubbleH = (lines.length * lineHeight) + paddingY * 2;

    const bubbleX = npc.x + npc.w / 2;
    const bubbleY = npc.y - 18 - bubbleH;

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.beginPath();
    ctx.moveTo(bubbleX - 6, bubbleY + bubbleH);
    ctx.lineTo(bubbleX, bubbleY + bubbleH + 8);
    ctx.lineTo(bubbleX + 6, bubbleY + bubbleH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.fillStyle = "black";

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(
        lines[i],
        bubbleX,
        bubbleY + paddingY + (lineHeight / 2) + (i * lineHeight)
      );
    }

    ctx.restore();
  }

  //-- lógica de misiones
  async function cargarNPCsDesdeMisiones() {
    const response = await fetch("./world.JSON/missions.json");
    const data = await response.json();

    window.missionsData = data;

    const mapaNPCs = new Map();

    data.missions.forEach(mision => {
      (mision.npcs || []).forEach(npc => {
        if (!mapaNPCs.has(npc.id)) {
          mapaNPCs.set(npc.id, {
            valienteTimer: 0,
            valienteCooldown: 5000,

            id: npc.id,
            nombre: npc.nombre,
            x: npc.posicion.x,
            y: npc.posicion.y,
            w: 64,
            h: 64,
            imageSrc: npc.imagen,
            img: null,
            missionStarter: npc.rol && npc.rol.toLowerCase() === "inicio",
            conversation_default: npc.conversation_default || "..."
          });
        }
      });
    });

    return Array.from(mapaNPCs.values());
  }

  // =======================================================
  // ESTADO Y LÓGICA DE MISIONES
  // =======================================================

  //Estado de misiones
  window.missionSystem = {
    acceptedMissionIds: [],
    activeMissionId: null,
    activeStepIndexByMission: {},
    completedMissionIds: [],
    revealedStepIndexes: {},
    completedSteps: {}
  };

  function getMissionById(missionId) {
    return window.missionsData?.missions?.find(m => m.id === missionId) || null;
  }

  function isMissionCompleted(missionId) {
    return window.missionSystem.completedMissionIds.includes(missionId);
  }

  function isMissionAccepted(missionId) {
    return window.missionSystem.acceptedMissionIds.includes(missionId);
  }

  //------------------------------Espacio para llamamiento de funciones de retos desde los NPCs (inicio)--------------------
  function openRetoPopup(retoId, onComplete) {
    ensureStyleDOMCSS();

    const oldPopup = document.getElementById("reto-popup-overlay");
    if (oldPopup) oldPopup.remove();

    const overlay = document.createElement("div");
    overlay.id = "reto-popup-overlay";
    overlay.className = "dom-overlay";

    overlay.innerHTML = `
    <div id="reto-popup-box" class="dom-panel dom-panel--h-320">
      <div class="reto-popup-header">
        <div class="reto-popup-title">Reto</div>
        <button
          id="reto-popup-close"
          class="reto-popup-close"
          type="button"
          aria-label="Cerrar"
        >
          X
        </button>
      </div>

      <div class="reto-popup-body">
        <p class="reto-popup-message">
          Presiona el botón para pasar el reto
        </p>

        <button
          id="reto-popup-pass"
          class="reto-popup-pass"
          type="button"
        >
          Pasar reto
        </button>
      </div>
    </div>
  `;

    wrapEl.appendChild(overlay);

    const closeBtn = overlay.querySelector("#reto-popup-close");
    const passBtn = overlay.querySelector("#reto-popup-pass");

    function closeRetoPopup() {
      overlay.remove();
    }

    closeBtn.addEventListener("click", closeRetoPopup);
    closeBtn.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeRetoPopup();
    }, { passive: false });

    passBtn.addEventListener("click", () => {
      if (typeof onComplete === "function") {
        onComplete(retoId);
      }
      closeRetoPopup();
    });

    passBtn.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();

      if (typeof onComplete === "function") {
        onComplete(retoId);
      }
      closeRetoPopup();
    }, { passive: false });

    overlay.addEventListener("pointerdown", (e) => {
      if (e.target === overlay) {
        e.preventDefault();
        closeRetoPopup();
      }
    }, { passive: false });
  }


  /*Espacio para llamar funciones al compeltar retos (inicio) */
  function completarRetoMission(retoId) {
    const mission = getActiveMission();
    if (!mission) return false;

    const stepIndex = window.missionSystem.activeStepIndexByMission[mission.id] ?? 0;
    const step = mission.pasos?.[stepIndex];
    if (!step) return false;

    if (step.tipo !== "completar_reto") return false;
    if (step.retoId !== retoId) return false;

    markMissionStepCompleted(mission.id, stepIndex);

    const nextIndex = stepIndex + 1;

    if (nextIndex < mission.pasos.length) {
      window.missionSystem.activeStepIndexByMission[mission.id] = nextIndex;
      revealMissionStep(mission.id, nextIndex);

      const nextStep = mission.pasos[nextIndex];

      if (nextStep?.verificador?.posicion) {
        coordenadasMisionsX = Number(nextStep.verificador.posicion.x) || 0;
        coordenadasMisionsY = Number(nextStep.verificador.posicion.y) || 0;
        coordenadasMisionState = true;
      } else {
        coordenadasMisionState = false;
      }

      refreshMissionPanelIfOpen();

      /*console.log("Reto completado:", {
        missionId: mission.id,
        retoId,
        siguientePaso: nextStep?.id || null
      });*/

      return true;
    }

    return false;
  }

  window.reto_codificacion_01 = function () {
    openRetoPopup("reto_codificacion_01", completarRetoMission);
  };

  // Misión 4: Romper arcillas en dojo (Inicio)
  let arcillasRompidas = 0;
  let arcillasRompidasIds = new Set();
  let retoRomperArcillasCompletado = false;

  window.romperBloquesArcilla = function () {
    arcillasRompidas = 0;
    arcillasRompidasIds = new Set();
    retoRomperArcillasCompletado = false;

    showPopupFeedback({
      title: "Reto iniciado",
      message: "Rompe los bloques de arcilla para completar el entrenamiento.",
      type: "info",
      duration: 4000
    });

    console.log("Reto romperBloquesArcilla iniciado.");
  };

  window.romperArcilla = function (obj = null) {
    if (retoRomperArcillasCompletado) return;

    const mission = getActiveMission();
    if (!mission || mission.id !== "m4") return;

    const stepIndex = window.missionSystem.activeStepIndexByMission[mission.id] ?? 0;
    const step = mission.pasos?.[stepIndex];

    if (!step || step.tipo !== "completar_reto") return;
    if (step.retoId !== "romperBloquesArcilla") return;

    const bloqueId = obj?.zona_id || `bloque_${arcillasRompidas + 1}`;

    if (arcillasRompidasIds.has(bloqueId)) return;
    arcillasRompidasIds.add(bloqueId);

    arcillasRompidas++;

    const cantidadObjetivo = Number(step.cantidadObjetivo || 6);

    console.log(`Arcillas rompidas: ${arcillasRompidas}/${cantidadObjetivo}`);

    if (arcillasRompidas >= cantidadObjetivo) {
      retoRomperArcillasCompletado = true;

      if (Array.isArray(step.otorgaItems) && step.otorgaItems.length) {
        giveMissionItems(step.otorgaItems);
      }

      completarRetoMission("romperBloquesArcilla");

      showPopupFeedback({
        title: "Entrenamiento completado",
        message: "Rompiste los bloques y recibiste un escudo de madera.",
        type: "success",
        duration: 4500
      });

      console.log("Reto romperBloquesArcilla completado.");
    }
  };
  // Misión 4: Romper arcillas en dojo (Fin)

  /*Espacio para llamar funciones al compeltar retos (fin) */

  //------------------------------Espacio para llamamiento de funciones de retos desde los NPCs (inicio)--------------------

  function setActiveMission(missionId) {
    if (!isMissionAccepted(missionId)) return;
    if (isMissionCompleted(missionId)) return;

    window.missionSystem.activeMissionId = missionId;

    const mission = getMissionById(missionId);
    const stepIndex = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
    const currentStep = mission?.pasos?.[stepIndex] || null;
    const nextStep = mission?.pasos?.[stepIndex + 1] || null;

    /*console.log("MISIÓN ACTIVA", {
      id: missionId,
      nombre: mission?.nombre,
      pasoActual: {
        index: stepIndex,
        titulo: currentStep?.titulo || null
      },
      siguientePaso: nextStep
        ? {
            index: stepIndex + 1,
            titulo: nextStep.titulo
          }
        : "No hay más pasos"
    });*/

    refreshMissionPanelIfOpen();
  }

  window.abandonarMision = function (missionId) {
    if (!missionId || !window.missionSystem) return false;

    const mission = getMissionById(missionId);
    if (!mission) return false;

    if (isMissionCompleted(missionId)) return false;

    window.missionSystem.acceptedMissionIds =
      window.missionSystem.acceptedMissionIds.filter(id => id !== missionId);

    delete window.missionSystem.activeStepIndexByMission[missionId];
    delete window.missionSystem.revealedStepIndexes[missionId];
    delete window.missionSystem.completedSteps[missionId];

    if (window.missionSystem.activeMissionId === missionId) {
      window.missionSystem.activeMissionId = null;
    }

    coordenadasMisionsX = 0;
    coordenadasMisionsY = 0;
    coordenadasMisionState = false;

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Misión abandonada",
        message: `Has abandonado la misión: ${mission.nombre}.`,
        type: "warning",
        duration: 3500
      });
    }

    refreshMissionPanelIfOpen();

    return true;
  };

  function getActiveMission() {
    return getMissionById(window.missionSystem.activeMissionId);
  }

  /*
  function getCurrentMissionStep() {
    const mission = getActiveMission();
    if (!mission) return null;
  
    const stepIndex = window.missionSystem.activeStepIndexByMission[mission.id];
    return mission.pasos?.[stepIndex] || null;
  }
  function isMissionAvailable(mission) {
    if (!mission) return false;
  
    // Solo validar condiciones básicas
    const iqRequired = mission.condiciones?.nivelIQMinimo || 0;
    if (IQuser < iqRequired) return false;
  
    const itemsRequired = mission.condiciones?.itemsRequeridos || [];
  
    if (itemsRequired.length) {
      for (const item of itemsRequired) {
        if (!inventario[item.id] || inventario[item.id] < item.cantidad) {
          return false;
        }
      }
    }
  
    // IMPORTANTE:
    // Ya NO bloqueamos por misiones requeridas
    // para permitir aceptar todas las misiones.
  
    return true;
  }
  */

  function revealMissionStep(missionId, stepIndex) {
    if (!window.missionSystem.revealedStepIndexes[missionId]) {
      window.missionSystem.revealedStepIndexes[missionId] = [];
    }

    if (!window.missionSystem.revealedStepIndexes[missionId].includes(stepIndex)) {
      window.missionSystem.revealedStepIndexes[missionId].push(stepIndex);
      window.missionSystem.revealedStepIndexes[missionId].sort((a, b) => a - b);
    }
  }

  function markMissionStepCompleted(missionId, stepIndex) {
    if (!window.missionSystem.completedSteps[missionId]) {
      window.missionSystem.completedSteps[missionId] = [];
    }

    if (!window.missionSystem.completedSteps[missionId].includes(stepIndex)) {
      window.missionSystem.completedSteps[missionId].push(stepIndex);
      window.missionSystem.completedSteps[missionId].sort((a, b) => a - b);
    }
  }

  function giveMissionItems(items = []) {
    if (!Array.isArray(items)) return;

    for (const item of items) {
      if (!item?.id || !item?.cantidad) continue;

      const dataItem = itemsData.find(x => x.id === item.id);
      if (!dataItem) continue;

      agregarItemAlInventario({
        ...dataItem,
        cantidad: item.cantidad,
        usos: dataItem.cantidad_de_usos ?? null,
        usos_maximos: dataItem.cantidad_de_usos ?? null,
        agotable: dataItem.agotable === true
      });
    }
  }

  function contarItemEnInventarioSeguro(itemId) {
    let total = 0;

    for (const item of (window.inventarioUser || [])) {
      if (!item) continue;

      const id = item.id ?? item.item_id;
      if (id !== itemId) continue;

      total += Number(item.cantidad || 1);
    }

    return total;
  }

  function validarCondicionesMision(mission) {
    if (!mission) {
      return {
        ok: false,
        message: "La misión no existe."
      };
    }

    const condiciones = mission.condiciones || {};

    const nivelMinimo = Number(condiciones.nivelIQMinimo || 0);
    const iqActual = Number(IQuser || 0);

    if (iqActual < nivelMinimo) {
      return {
        ok: false,
        message: `Necesitas nivel IQ ${nivelMinimo} para aceptar esta misión.`
      };
    }

    const misionesRequeridas = condiciones.misionesRequeridas || [];

    for (const requiredMissionId of misionesRequeridas) {
      if (!window.missionSystem?.completedMissionIds?.includes(requiredMissionId)) {
        const requiredMission = getMissionById(requiredMissionId);
        return {
          ok: false,
          message: `Debes completar primero: ${requiredMission?.nombre || requiredMissionId}.`
        };
      }
    }

    const itemsRequeridos = condiciones.itemsRequeridos || [];

    for (const itemReq of itemsRequeridos) {
      const cantidadActual = contarItemEnInventarioSeguro(itemReq.id);
      const cantidadNecesaria = Number(itemReq.cantidad || 1);

      if (cantidadActual < cantidadNecesaria) {
        return {
          ok: false,
          message: `Necesitas ${cantidadNecesaria} de ${itemReq.id} para aceptar esta misión.`
        };
      }
    }

    return {
      ok: true,
      message: "Condiciones cumplidas."
    };
  }

  function acceptMission(missionId) {
    const mission = getMissionById(missionId);
    if (!mission) return;

    const validacion = validarCondicionesMision(mission);

    if (!validacion.ok) {
      if (typeof playerrorSound === "function") playerrorSound();

      if (typeof showPopupFeedback === "function") {
        showPopupFeedback({
          title: "Misión bloqueada",
          message: validacion.message,
          type: "warning",
          duration: 5000
        });
      }

      return false;
    }

    if (!window.missionSystem.acceptedMissionIds.includes(missionId)) {
      window.missionSystem.acceptedMissionIds.push(missionId);
    }

    if (typeof window.missionSystem.activeStepIndexByMission[missionId] !== "number") {
      window.missionSystem.activeStepIndexByMission[missionId] = 0;
      revealMissionStep(missionId, 0);
    }

    const firstStep = mission.pasos?.[0];
    const firstStepAlreadyCompleted =
      (window.missionSystem.completedSteps[missionId] || []).includes(0);

    if (
      firstStep &&
      firstStep.tipo === "hablar_npc" &&
      firstStep.npcId === mission.pasos?.[0]?.npcId &&
      !firstStepAlreadyCompleted
    ) {
      if (Array.isArray(firstStep.otorgaItems) && firstStep.otorgaItems.length) {
        giveMissionItems(firstStep.otorgaItems);
      }

      markMissionStepCompleted(missionId, 0);

      if ((mission.pasos?.length || 0) > 1) {
        window.missionSystem.activeStepIndexByMission[missionId] = 1;
        revealMissionStep(missionId, 1);
      }
    }

    setActiveMission(missionId);
    closeNPCDialog();
  }

  window.acceptMission = acceptMission;

  function contarItemEnInventario(itemId) {
    let total = 0;

    for (const item of (window.inventarioUser || [])) {
      if (!item) continue;

      const id = item.id ?? item.item_id;
      if (id !== itemId) continue;

      total += Number(item.cantidad || 1);
    }

    return total;
  }

  window.validarPasoRecolectarItems = function (missionId) {
    const mission = getMissionById(missionId);
    if (!mission) return false;

    const stepIndex = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
    const step = mission.pasos?.[stepIndex];
    if (!step) return false;

    if (step.tipo !== "recolectar_items") return false;

    const objetivos = step.objetivosItems || [];

    for (const objetivo of objetivos) {
      const cantidadActual = contarItemEnInventario(objetivo.id);
      const cantidadNecesaria = Number(objetivo.cantidad || 0);

      if (cantidadActual < cantidadNecesaria) {
        return false;
      }
    }

    markMissionStepCompleted(missionId, stepIndex);

    const nextIndex = stepIndex + 1;

    if (nextIndex < mission.pasos.length) {
      window.missionSystem.activeStepIndexByMission[missionId] = nextIndex;
      revealMissionStep(missionId, nextIndex);

      const nextStep = mission.pasos[nextIndex];
      if (nextStep?.verificador?.posicion) {
        coordenadasMisionsX = Number(nextStep.verificador.posicion.x) || 0;
        coordenadasMisionsY = Number(nextStep.verificador.posicion.y) || 0;
        coordenadasMisionState = true;
      } else {
        coordenadasMisionState = false;
      }

      refreshMissionPanelIfOpen();
    }

    /*console.log("Paso de recolección completado:", {
      missionId,
      stepId: step.id,
      siguientePaso: mission.pasos?.[nextIndex]?.id || null
    });*/

    /*console.log("VALIDANDO RECOLECCIÓN", {
    missionId,
    stepId: step.id,
    objetivos: objetivos.map(obj => ({
      id: obj.id,
      requiere: obj.cantidad,
      tiene: contarItemEnInventario(obj.id)
    }))
  });*/

    return true;
  }

  function continueActiveMissionFromNPC(npcId) {
    const mission = getActiveMission();

    const missionId = mission.id;
    const stepIndexPrev = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
    const stepPrev = mission.pasos?.[stepIndexPrev];

    if (stepPrev?.tipo === "recolectar_items" && missionStepRecolectadoOK(missionId)) {
      markMissionStepCompleted(missionId, stepIndexPrev);

      const nextIndex = stepIndexPrev + 1;
      if (nextIndex < mission.pasos.length) {
        window.missionSystem.activeStepIndexByMission[missionId] = nextIndex;
        revealMissionStep(missionId, nextIndex);
        refreshMissionPanelIfOpen();
      }
    }

    if (!mission) return false;

    validarPasoRecolectarItems(mission.id);

    const stepIndex = window.missionSystem.activeStepIndexByMission[mission.id];
    const step = mission.pasos?.[stepIndex];
    if (!step) return false;

    const isNPCStep =
      step.tipo === "hablar_npc" ||
      step.tipo === "hablar_npc_entrega";

    if (!isNPCStep) return false;
    if (step.npcId !== npcId) return false;

    if (Array.isArray(step.otorgaItems) && step.otorgaItems.length) {
      giveMissionItems(step.otorgaItems);
    }

    markMissionStepCompleted(mission.id, stepIndex);

    const nextIndex = stepIndex + 1;

    if (nextIndex < mission.pasos.length) {
      window.missionSystem.activeStepIndexByMission[mission.id] = nextIndex;
      revealMissionStep(mission.id, nextIndex);
      refreshMissionPanelIfOpen();
      closeNPCDialog();
      return true;
    }

    return false;
  }

  window.continueActiveMissionFromNPC = continueActiveMissionFromNPC;

  function finalizeActiveMissionFromNPC(npcId) {
    const mission = getActiveMission();
    if (!mission) return false;

    const stepIndex = window.missionSystem.activeStepIndexByMission[mission.id];
    const step = mission.pasos?.[stepIndex];
    if (!step) return false;

    const isNPCStep =
      step.tipo === "hablar_npc" ||
      step.tipo === "hablar_npc_entrega";

    if (!isNPCStep) return false;
    if (step.npcId !== npcId) return false;

    if (step.tipo === "hablar_npc_entrega" && Array.isArray(step.entregaItems)) {
      for (const req of step.entregaItems) {
        if (contarItemEnInventario(req.id) < Number(req.cantidad || 0)) {
          //console.log("Faltan items para entregar:", req.id);
          return false;
        }
      }
    }

    if (stepIndex !== mission.pasos.length - 1) return false;

    if (Array.isArray(step.otorgaItems) && step.otorgaItems.length) {
      giveMissionItems(step.otorgaItems);
    }

    markMissionStepCompleted(mission.id, stepIndex);

    IQuser += Number(mission.recompensas?.iq || 0);
    cosmonedas += Number(mission.recompensas?.cosmonedas || 0);
    giveMissionItems(mission.recompensas?.items || []);

    if (!window.missionSystem.completedMissionIds.includes(mission.id)) {
      window.missionSystem.completedMissionIds.push(mission.id);
    }

    delete window.missionSystem.activeStepIndexByMission[mission.id];

    const nextActiveMission = window.missionSystem.acceptedMissionIds.find(
      (id) => !isMissionCompleted(id)
    ) || null;

    window.missionSystem.activeMissionId = nextActiveMission;

    refreshMissionPanelIfOpen();
    closeNPCDialog();
    showMissionRewardPopup(mission);

    return true;
  }

  window.finalizeActiveMissionFromNPC = finalizeActiveMissionFromNPC;

  /*
  function getMissionStarterNPCId(mission) {
    return mission?.pasos?.[0]?.npcId || null;
  }
  */

  function tieneItemsRequeridos(listaItems = []) {
    return listaItems.every(req => {
      const tiene = contarItemEnInventario(req.id);
      const necesita = Number(req.cantidad || 0);
      return tiene >= necesita;
    });
  }

  //===========================================
  /*Dibujar NPC (inicio) */
  //===========================================

  //--Enemigos
  function preloadEnemigos(list) {
    return Promise.all(
      list.map(enemy => new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          enemy.img = img;
          resolve();
        };

        img.onerror = () => {
          console.warn("Enemigo no cargó:", enemy.imageSrc);
          enemy.img = null;
          resolve();
        };

        img.src = enemy.imageSrc;
      }))
    );
  }

  //--NPC's ambiente
  function preloadNPCsAmbiente(list) {
    return Promise.all(
      list.map(npc => new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          npc.img = img;
          resolve();
        };

        img.onerror = () => {
          console.warn("NPC ambiente no cargó:", npc.imageSrc);
          npc.img = null;
          resolve();
        };

        img.src = npc.imageSrc;
      }))
    );
  }

  //--NPC's Misiones
  function preloadNPCs(list) {
    return Promise.all(
      list.map(npc => new Promise((resolve) => {

        const img = new Image();

        img.onload = () => {
          npc.img = img;
          resolve();
        };

        img.onerror = () => {
          console.warn("NPC no cargó:", npc.imageSrc);
          resolve();
        };

        img.src = npc.imageSrc;

      }))
    );
  }
  //--NPC's Ambiente (inicio)
  function drawBubbleNPCambiente(ctx, npc) {
    if (!npc?.bubbleText || npc.bubbleTimer <= 0) return;

    const text = npc.bubbleText;
    const fontSize = 12;
    const paddingX = 8;
    const paddingY = 6;
    const lineHeight = 14;
    const maxCharsPerLine = 22;

    ctx.save();
    ctx.font = `${fontSize}px arcade`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (test.length <= maxCharsPerLine) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);

    const longest = lines.reduce((a, b) => a.length > b.length ? a : b, "");
    const bubbleW = Math.max(40, ctx.measureText(longest).width + paddingX * 2);
    const bubbleH = (lines.length * lineHeight) + paddingY * 2;

    const bubbleX = npc.x + npc.w / 2;
    const bubbleY = npc.y - 18 - bubbleH;

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.beginPath();
    ctx.moveTo(bubbleX - 6, bubbleY + bubbleH);
    ctx.lineTo(bubbleX, bubbleY + bubbleH + 8);
    ctx.lineTo(bubbleX + 6, bubbleY + bubbleH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.fillStyle = "black";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(
        lines[i],
        bubbleX,
        bubbleY + paddingY + (lineHeight / 2) + (i * lineHeight)
      );
    }

    ctx.restore();
  }

  //--NPC's Ambiente (fin)

  //--NPC's ambiente (inicio)
  function drawNPCsAmbiente(ctx) {
    for (const npc of npcsAmbiente) {
      if (!npc) continue;
      if (!entityIsVisible(npc)) continue;

      const imgOk =
        npc.img &&
        npc.img.complete &&
        npc.img.naturalWidth > 0 &&
        npc.img.naturalHeight > 0;

      if (imgOk) {
        const row = rowForFacing(npc.facing || "down");
        const sx = (npc.frame || 0) * (npc.frameWidth || 64);
        const sy = row * (npc.frameHeight || 64);

        drawEntityShadow(ctx, images.shadow, npc.x, npc.y, npc.w, npc.h, {
          scaleW: 0.72,
          scaleH: 0.28,
          offsetY: 0.80,
          alpha: 0.30
        });

        ctx.drawImage(
          npc.img,
          sx,
          sy,
          npc.frameWidth || 64,
          npc.frameHeight || 64,
          npc.x,
          npc.y,
          npc.w,
          npc.h
        );
      } else {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 2;
        ctx.strokeRect(npc.x, npc.y, npc.w, npc.h);
      }

      ctx.fillStyle = "white";
      ctx.font = "12px arcade";
      ctx.textAlign = "center";
      ctx.fillText(
        npc.nombre,
        npc.x + npc.w / 2,
        npc.y + npc.h + 14
      );
      ctx.textAlign = "start";
    }
  }

  function drawBubblesNPCsAmbiente(ctx) {
    for (const npc of npcsAmbiente) {
      if (!npc) continue;
      if (!entityIsVisible(npc)) continue;
      drawBubbleNPCambiente(ctx, npc);
    }
  }

  //--Enemigo
  function drawEnemigos(ctx) {
    const listaEnemigos = window.enemigos || [];

    for (const enemy of listaEnemigos) {
      if (!enemy) continue;
      if (!entityIsVisible(enemy)) continue;

      const imgOk =
        enemy.img &&
        enemy.img.complete &&
        enemy.img.naturalWidth > 0 &&
        enemy.img.naturalHeight > 0;

      if (imgOk) {
        const row = rowForFacing(enemy.facing || "down");
        const sx = (enemy.frame || 0) * (enemy.frameWidth || 64);
        const sy = row * (enemy.frameHeight || 64);

        drawEntityShadow(ctx, images.shadow, enemy.x, enemy.y, enemy.w, enemy.h, {
          scaleW: enemy.tipo === "jefe" ? 0.88 : 0.74,
          scaleH: enemy.tipo === "jefe" ? 0.34 : 0.30,
          offsetY: 0.82,
          alpha: enemy.tipo === "jefe" ? 0.38 : 0.32
        });

        ctx.drawImage(
          enemy.img,
          sx,
          sy,
          enemy.frameWidth || 64,
          enemy.frameHeight || 64,
          enemy.x,
          enemy.y,
          enemy.w,
          enemy.h
        );
      } else {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(enemy.x, enemy.y, enemy.w, enemy.h);
      }

      ctx.fillStyle = "white";
      ctx.font = "12px arcade";
      ctx.textAlign = "center";
      ctx.fillText(
        enemy.nombre,
        enemy.x + enemy.w / 2,
        enemy.y + enemy.h + 14
      );
      ctx.textAlign = "start";
    }
  }

  function entidadEstaEnZonaIluminada(entidad) {
    if (!mapaOscuro) return true;
    if (!entidad) return false;

    const cx = entidad.x + entidad.w / 2;
    const cy = entidad.y + entidad.h * 0.34;

    if (
      runGlobalBooleanHook("onIsEntityLit", {
        entidad,
        x: cx,
        y: cy,
        player,
        mapaOscuro,
        ambienteObjetos,
        enemigos: window.enemigos || [],
        npcs,
        npcsAmbiente
      })
    ) {
      return true;
    }

    const playerLightX = player.x + HERO_DRAW_W / 2;
    const playerLightY = player.y + HERO_DRAW_H * 0.38;
    const playerNearLightRadius = 38;

    if (Math.hypot(cx - playerLightX, cy - playerLightY) <= playerNearLightRadius) {
      return true;
    }

    if (antorchaActiva?.active) {
      const a = getTorchAnchor();
      const dx = cx - a.x;
      const dy = cy - (a.y - 18);
      const dist = Math.hypot(dx, dy);

      if (dist <= TORCH_LIGHT_RADIUS) {
        return true;
      }
    }

    for (const obj of (ambienteObjetos || [])) {
      if (!obj || obj.subtipo !== "antorcha_suelo") continue;

      const luzX = obj.x + obj.w / 2;
      const luzY = obj.y + obj.h - 26;
      const radio = Number(obj.radioLuz || TORCH_LIGHT_RADIUS);

      const dx = cx - luzX;
      const dy = cy - luzY;
      const dist = Math.hypot(dx, dy);

      if (dist <= radio) {
        return true;
      }
    }

    for (const luz of getLucesIlumSistemaMapa()) {
      const dx = cx - luz.x;
      const dy = cy - luz.y;
      const dist = Math.hypot(dx, dy);

      if (dist <= luz.radius) {
        return true;
      }
    }

    for (const d of (window.disparosLazerActivos || [])) {
      const dist = Math.hypot(cx - d.x, cy - d.y);
      if (dist <= 40) return true;
    }

    for (const d of (window.disparosEnemigosArmadosActivos || [])) {
      const dist = Math.hypot(cx - d.x, cy - d.y);
      if (dist <= 38) return true;
    }

    for (const b of (window.bumerangsActivos || [])) {
      const dist = Math.hypot(cx - b.x, cy - b.y);
      if (dist <= 34) return true;
    }

    for (const atk of (window.ataquesEspecialesJefeActivos || [])) {
      if (!atk) continue;

      const radio =
        Number(atk.radioLuz) ||
        Number(atk.radius) ||
        Number(atk.radio) ||
        120;

      const dist = Math.hypot(cx - atk.x, cy - atk.y);
      if (dist <= radio) {
        return true;
      }
    }

    return false;
  }

  function drawOjosDemoniacos(ctx, entidad) {
    if (!mapaOscuro) return;
    if (!entidad) return;

    // si la entidad ya está en una zona iluminada, no dibujar ojos
    if (entidadEstaEnZonaIluminada(entidad)) return;

    const cx = entidad.x + entidad.w / 2;
    const eyeY = entidad.y + entidad.h * 0.34;
    const separacion = entidad.w * 0.12;
    const radio = Math.max(2.5, entidad.w * 0.045);

    const pulse = 0.72 + ((Math.sin(performance.now() * 0.012) + 1) * 0.14);

    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.fillStyle = "#ff0033";
    ctx.shadowColor = "#ff0033";
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.arc(cx - separacion, eyeY, radio, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + separacion, eyeY, radio, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawBubbleEnemigo(ctx, enemy) {
    if (!enemy?.bubbleText || enemy.bubbleTimer <= 0) return;

    const text = enemy.bubbleText;
    const fontSize = 12;
    const paddingX = 8;
    const paddingY = 6;
    const lineHeight = 14;
    const maxCharsPerLine = 22;

    ctx.save();
    ctx.font = `${fontSize}px arcade`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (test.length <= maxCharsPerLine) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }

    if (line) lines.push(line);

    const longest = lines.reduce((a, b) => a.length > b.length ? a : b, "");
    const bubbleW = Math.max(40, ctx.measureText(longest).width + paddingX * 2);
    const bubbleH = (lines.length * lineHeight) + paddingY * 2;

    const bubbleX = enemy.x + enemy.w / 2;
    const bubbleY = enemy.y - 18 - bubbleH;

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.beginPath();
    ctx.moveTo(bubbleX - 6, bubbleY + bubbleH);
    ctx.lineTo(bubbleX, bubbleY + bubbleH + 8);
    ctx.lineTo(bubbleX + 6, bubbleY + bubbleH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(bubbleX - bubbleW / 2, bubbleY, bubbleW, bubbleH);

    ctx.fillStyle = "black";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(
        lines[i],
        bubbleX,
        bubbleY + paddingY + (lineHeight / 2) + (i * lineHeight)
      );
    }

    ctx.restore();
  }

  //--Enemigos
  function drawBubblesEnemigos(ctx) {
    const listaEnemigos = window.enemigos || [];

    for (const enemy of listaEnemigos) {
      if (!enemy) continue;
      if (!entityIsVisible(enemy)) continue;
      drawBubbleEnemigo(ctx, enemy);
    }
  }

  //--NPC's ambiente (fin)
  function drawNPCs(ctx) {
    const activeMission = getActiveMission();
    const activeMissionId = window.missionSystem.activeMissionId;
    const activeStepIndex = activeMissionId != null
      ? (window.missionSystem.activeStepIndexByMission[activeMissionId] ?? 0)
      : -1;

    const activeStep = activeMission?.pasos?.[activeStepIndex] || null;
    const activeNpcId =
      activeStep &&
        (
          activeStep.tipo === "hablar_npc" ||
          activeStep.tipo === "hablar_npc_entrega"
        )
        ? activeStep.npcId
        : null;

    for (const npc of npcs) {
      if (!npc) continue;
      if (!entityIsVisible(npc)) continue;

      const imgOk =
        npc.img &&
        npc.img.complete &&
        npc.img.naturalWidth > 0 &&
        npc.img.naturalHeight > 0;

      if (imgOk) {
        ctx.drawImage(
          npc.img,
          0, 0, 64, 64,
          npc.x, npc.y,
          npc.w, npc.h
        );
      } else {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(npc.x, npc.y, npc.w, npc.h);

        ctx.fillStyle = "white";
        ctx.font = "10px arcade";
        ctx.textAlign = "center";
        ctx.fillText("NPC", npc.x + npc.w / 2, npc.y - 6);
        ctx.textAlign = "start";
      }

      const isActiveTarget = activeNpcId && npc.id === activeNpcId;

      if (isActiveTarget || npc.missionStarter) {
        let symbol = null;

        if (isActiveTarget) {
          symbol = "!";
        }

        if (!activeMission && npc.missionStarter) {
          const missionStarter = window.missionsData?.missions?.find(
            m => m.pasos?.[0]?.npcId === npc.id
          );

          if (missionStarter && isMissionCompleted(missionStarter.id)) {
            symbol = "⚝";
          } else {
            symbol = "?";
          }
        }

        if (symbol) {
          ctx.fillStyle = "yellow";
          ctx.font = "20px arcade";
          ctx.textAlign = "center";

          ctx.fillText(
            symbol,
            npc.x + npc.w / 2,
            npc.y - 10
          );

          ctx.textAlign = "start";
        }
      }

      ctx.fillStyle = "white";
      ctx.font = "12px arcade";
      ctx.textAlign = "center";

      ctx.fillText(
        npc.nombre,
        npc.x + npc.w / 2,
        npc.y + npc.h + 14
      );

      ctx.textAlign = "start";

      drawBubbleNPCMision(ctx, npc);
    }
  }

  // =======================================================
  // SISTEMA DE CONVERSACIÓN NPC CON MANIPULACIÓN DEL DOM (inicio)
  // =======================================================

  window.npcDialogOpen = false;
  window.npcDialogEl = null;
  window.npcDialogState = {
    npc: null,
    mode: "default",
    lines: [],
    lineIndex: 0,
    missionId: null
  };

  function ensureNPCDialogStyles() {
    ensureStyleDOMCSS();
  }

  function ensureMissionUIStyles() {
    ensureStyleDOMCSS();
  }

  function buildMissionsHTML() {
    ensureMissionUIStyles();

    const acceptedIds = window.missionSystem.acceptedMissionIds || [];
    const missions = acceptedIds
      .map(id => getMissionById(id))
      .filter(Boolean);

    if (!missions.length) {
      return `
      <div class="ui-missions-root">
        <div class="ui-mission-card">
          <p class="ui-mission-title">No hay misiones aceptadas</p>
          <p class="ui-mission-step">Acepta una misión hablando con un NPC iniciador.</p>
        </div>
      </div>
    `;
    }

    const activeMissionId = window.missionSystem.activeMissionId || null;

    const pendingMissions = missions.filter(m => !isMissionCompleted(m.id));
    const completedMissions = missions.filter(m => isMissionCompleted(m.id));

    const orderedMissions = [...pendingMissions, ...completedMissions];

    const missionsHTML = orderedMissions.map((mission) => {
      const accepted = isMissionAccepted(mission.id);
      const completed = isMissionCompleted(mission.id);
      const isActive = activeMissionId === mission.id;

      const revealed = window.missionSystem.revealedStepIndexes[mission.id] || [];
      const completedSteps = window.missionSystem.completedSteps[mission.id] || [];

      const pasosHTML = (accepted && !completed)
        ? revealed.map((stepIndex) => {
          const step = mission.pasos?.[stepIndex];
          if (!step) return "";

          const done = completedSteps.includes(stepIndex);
          const x = step.verificador?.posicion?.x ?? "-";
          const y = step.verificador?.posicion?.y ?? "-";

          return `
        <div class="ui-mission-step-box ${done ? "ui-mission-step-done" : ""}">
          <p class="ui-mission-step">${done ? "✔ " : ""}${step.titulo}</p>
          <p class="ui-mission-step">${step.descripcion}</p>
          <p class="ui-mission-coords">X: ${x} | Y: ${y}</p>
        </div>
      `;
        }).join("")
        : "";

      return `
      <div
        class="ui-mission-card ${completed ? "ui-mission-card-completed" : ""}"
        data-mission-id="${mission.id}"
        ${completed ? "" : `data-selectable-mission="1"`}
      >
<div class="ui-mission-title-row">
  <p class="ui-mission-title ${isActive ? "ui-mission-title-active" : ""}">
    ${mission.tipo === "principal" ? "➜ " : ""}${completed ? "✔ " : ""}${mission.nombre}
  </p>

  ${accepted && !completed ? `
    <button 
      class="ui-mission-abandon-btn" 
      type="button"
      data-abandon-mission-id="${mission.id}"
      title="Abandonar misión"
    >X</button>
  ` : ""}
</div>
        ${pasosHTML}
      </div>
    `;
    }).join("");

    return `<div class="ui-missions-root">${missionsHTML}</div>`;
  }

  window.buildMissionsHTML = buildMissionsHTML;

  function showMissionRewardPopup(mission) {
    if (!mission) return;

    ensureMissionUIStyles();

    const old = document.getElementById("mission-reward-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "mission-reward-overlay";

    const box = document.createElement("div");
    box.id = "mission-reward-box";

    const rewardItems = mission.recompensas?.items || [];

    const itemsHTML = rewardItems.length
      ? `
      <div class="mission-reward-items-title">Los siguientes items</div>
      <div class="mission-reward-items">
        ${rewardItems.map(item => {
        const dataItem = itemsData.find(x => x.id === item.id);
        const img = dataItem?.imagen || "";
        return `
            <div class="mission-reward-item">
              <img src="${img}" alt="${item.id}">
              <span>x${item.cantidad}</span>
            </div>
          `;
      }).join("")}
      </div>
    `
      : "";

    box.innerHTML = `
    <div class="mission-reward-title">
      Has completado la misión<br>${mission.nombre}
    </div>

    <div class="mission-reward-line">
      Has ganado ${Number(mission.recompensas?.iq || 0)} de IQ
    </div>

    <div class="mission-reward-line">
      ${Number(mission.recompensas?.cosmonedas || 0)} de cosmonedas
    </div>

    ${itemsHTML}

    <button class="mission-reward-btn" type="button">Aceptar recompensa</button>
  `;

    overlay.appendChild(box);
    wrapEl.appendChild(overlay);

    const btn = box.querySelector(".mission-reward-btn");

    function closeRewardPopup() {
      overlay.remove();
    }

    btn.addEventListener("click", closeRewardPopup);
    btn.addEventListener("pointerdown", (e) => {
      playendSound()
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeRewardPopup();
    }, { passive: false });
  }

  function refreshMissionPanelIfOpen() {
    if (!interfaceOpen || !interfasEl) return;
    if (interfasEl.dataset.panel !== "misions") return;

    const bodyEl = interfasEl.querySelector(".ui-body");
    if (!bodyEl) return;

    bodyEl.innerHTML = buildMissionsHTML();
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-abandon-mission-id]");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const missionId = btn.dataset.abandonMissionId;

    function openAbandonMissionPopup(missionId) {
      const mission = getMissionById(missionId);
      if (!mission) return;

      const old = document.getElementById("abandon-mission-overlay");
      if (old) old.remove();

      const overlay = document.createElement("div");
      overlay.id = "abandon-mission-overlay";

      overlay.innerHTML = `
    <div class="abandon-overlay">
      <div class="abandon-box">

        <div class="abandon-title">
          Abandonar misión
        </div>

        <div class="abandon-text">
          ¿Seguro que quieres abandonar esta misión?
          <br><br>
          ${mission.nombre}
          <br><br>
          Perderás todo el progreso de esta misión.
        </div>

        <div class="abandon-actions">
          <button id="cancelar-abandonar-mision" class="abandon-btn cancel">
            Cancelar
          </button>

          <button id="confirmar-abandonar-mision" class="abandon-btn confirm">
            Abandonar
          </button>
        </div>

      </div>
    </div>
  `;

      document.body.appendChild(overlay);

      function cerrarPopup() {
        overlay.remove();
      }

      document.getElementById("cancelar-abandonar-mision").onclick = cerrarPopup;

      document.getElementById("confirmar-abandonar-mision").onclick = function () {
        cerrarPopup();

        if (typeof window.abandonarMision === "function") {
          window.abandonarMision(missionId);
        }
      };

      overlay.addEventListener("pointerdown", function (e) {
        if (e.target.classList.contains("abandon-overlay")) {
          cerrarPopup();
        }
      });
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest?.("[data-abandon-mission-id]");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const missionId = btn.dataset.abandonMissionId;

      openAbandonMissionPopup(missionId);
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest?.("[data-abandon-mission-id]");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const missionId = btn.dataset.abandonMissionId;

      openAbandonMissionPopup(missionId);
    });
  });

  document.addEventListener("click", (e) => {
    const card = e.target.closest?.("#container-interfas[data-panel='misions'] .ui-mission-card");
    if (!card) return;

    const missionId = card.dataset.missionId;
    if (!missionId) return;
    if (!card.dataset.selectableMission) return;

    setActiveMission(missionId);
  }, true);

  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;

    const missionCard = e.target.closest?.("#container-interfas[data-panel='misions'] [data-mission-select]");
    if (!missionCard) return;

    const missionId = missionCard.dataset.missionSelect;
    if (!missionId) return;

    e.preventDefault();
    e.stopPropagation();
    setActiveMission(missionId);
  }, { capture: true, passive: false });

  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;

    const missionCard = e.target.closest?.("#container-interfas[data-panel='misions'] [data-mission-select]");
    if (!missionCard) return;

    const missionId = missionCard.dataset.missionSelect;
    if (!missionId) return;
    if (isMissionCompleted(missionId)) return;

    e.preventDefault();
    e.stopPropagation();
    setActiveMission(missionId);
  }, { capture: true, passive: false });

  document.addEventListener("click", (e) => {
    const card = e.target.closest?.("#container-interfas[data-panel='misions'] [data-mission-select]");
    if (!card) return;

    const missionId = card.dataset.missionSelect;
    if (!missionId) return;
    if (isMissionCompleted(missionId)) return;

    setActiveMission(missionId);
  }, true);

  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;

    const card = e.target.closest?.("#container-interfas[data-panel='misions'] [data-mission-select]");
    if (!card) return;

    const missionId = card.dataset.missionSelect;
    if (!missionId) return;
    if (isMissionCompleted(missionId)) return;

    e.preventDefault();
    e.stopPropagation();
    setActiveMission(missionId);
  }, { capture: true, passive: false });

  function createNPCDialogDOM() {
    const old = document.getElementById("npc-dialog-overlay");
    if (old) return old;

    ensureNPCDialogStyles();

    const overlay = document.createElement("div");
    overlay.id = "npc-dialog-overlay";

    overlay.innerHTML = `
    <div id="npc-dialog-panel">
      <div id="npc-dialog-header">
        <div id="npc-dialog-title">NPC</div>
        <button id="npc-dialog-close" type="button">X</button>
      </div>

      <div id="npc-dialog-portrait-wrap">
        <img id="npc-dialog-portrait" src="" alt="NPC">
      </div>

      <div id="npc-dialog-footer">
        <p id="npc-dialog-line">...</p>
        <div id="npc-dialog-actions"></div>
      </div>
    </div>
  `;

    wrapEl.appendChild(overlay);

    const closeBtn = overlay.querySelector("#npc-dialog-close");

    function cerrarDialogo() {
      closeNPCDialog();
    }

    closeBtn.addEventListener("click", cerrarDialogo);
    closeBtn.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      cerrarDialogo();
    }, { passive: false });

    overlay.addEventListener("pointerdown", (e) => {
      if (e.target === overlay) {
        e.preventDefault();
        cerrarDialogo();
      }
    }, { passive: false });

    return overlay;
  }

  function closeNPCDialog() {
    window.npcDialogOpen = false;
    window.npcDialogState = {
      npc: null,
      mode: "default",
      lines: [],
      lineIndex: 0,
      missionId: null
    };

    if (window.npcDialogEl && window.npcDialogEl.parentNode) {
      window.npcDialogEl.parentNode.removeChild(window.npcDialogEl);
    }

    window.npcDialogEl = null;
  }

  window.closeNPCDialog = closeNPCDialog;

  function missionStepRecolectadoOK(missionId) {
    const mission = getMissionById(missionId);
    if (!mission) return false;

    const stepIndex = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
    const step = mission.pasos?.[stepIndex];
    if (!step) return false;

    if (step.tipo !== "recolectar_items") return false;

    const objetivos = step.objetivosItems || [];

    const validado = objetivos.every(obj => {
      const tiene = contarItemEnInventario(obj.id);
      const requiere = Number(obj.cantidad || 0);
      return tiene >= requiere;
    });

    /*console.log("VALIDANDO RECOLECCIÓN", {
      missionId,
      stepId: step.id,
      objetivos: objetivos.map(obj => ({
        id: obj.id,
        requiere: obj.cantidad,
        tiene: contarItemEnInventario(obj.id)
      })),
      validado
    });*/

    return validado;
  }


  //----------Función para determinar la linea de comversación del NPC según el estado de la misión 
  function getMissionContextForNPC(npcId) {

    const npcLocal = npcs.find(n => n.id === npcId);

    // validar si el NPC pertenece a una misión ya completada
    for (const missionLoop of window.missionsData.missions) {

      if (!isMissionCompleted(missionLoop.id)) continue;

      const npcMission = Array.isArray(missionLoop.npcs)
        ? missionLoop.npcs.find(n => n.id === npcId)
        : null;

      if (!npcMission) continue;

      return {
        type: "mission_completed",
        lines: npcMission.dialogos?.completado?.length
          ? npcMission.dialogos.completado
          : npcMission.dialogos?.en_progreso?.length
            ? npcMission.dialogos.en_progreso
            : [npcMission.conversation_default || npcLocal?.conversation_default || "..."],
        missionId: missionLoop.id
      };

    }

    if (!window.missionsData || !Array.isArray(window.missionsData.missions)) {
      return {
        type: "default",
        lines: [npcLocal?.conversation_default || "..."],
        missionId: null
      };
    }

    const missionId = window.missionSystem.activeMissionId;
    const mission = missionId ? getMissionById(missionId) : null;

    if (mission) {

      const stepIndex = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
      const currentStep = mission.pasos?.[stepIndex];

      const npcMission = Array.isArray(mission.npcs)
        ? mission.npcs.find(n => n.id === npcId)
        : null;

      /*console.log("NPC CONTEXT", {
        npcId,
        missionId,
        stepIndex,
        currentStepId: currentStep?.id || null,
        currentStepTipo: currentStep?.tipo || null,
        currentStepNpcId: currentStep?.npcId || null
      });*/

      /* ---------------------------------------------
         VALIDACIÓN PASOS DE RECOLECCIÓN
      --------------------------------------------- */

      if (currentStep?.tipo === "recolectar_items") {

        const recolectadoOK = missionStepRecolectadoOK(missionId);

        if (recolectadoOK) {

          markMissionStepCompleted(missionId, stepIndex);

          const nextIndex = stepIndex + 1;

          if (nextIndex < mission.pasos.length) {

            window.missionSystem.activeStepIndexByMission[missionId] = nextIndex;

            revealMissionStep(missionId, nextIndex);

            refreshMissionPanelIfOpen();
          }

          const nextStep = mission.pasos?.[nextIndex];

          const nextNpcMission = Array.isArray(mission.npcs)
            ? mission.npcs.find(n => n.id === nextStep?.npcId)
            : null;

          if (nextStep && nextStep.npcId === npcId && nextNpcMission) {

            return {
              type: nextIndex === mission.pasos.length - 1 ? "mission_finish" : "mission_progress",
              lines:
                nextNpcMission.dialogos?.en_progreso?.length
                  ? nextNpcMission.dialogos.en_progreso
                  : nextNpcMission.dialogos?.inicio?.length
                    ? nextNpcMission.dialogos.inicio
                    : [nextNpcMission.conversation_default || "..."],
              missionId
            };

          }

        }

      }

      /* ---------------------------------------------
         VALIDACIÓN PASOS DE HABLAR CON NPC
      --------------------------------------------- */

      if (currentStep) {

        const currentNpcMission = Array.isArray(mission.npcs)
          ? mission.npcs.find(n => n.id === npcId)
          : null;

        const isCurrentNpcStep =
          (
            currentStep.tipo === "hablar_npc" ||
            currentStep.tipo === "hablar_npc_entrega"
          ) &&
          currentStep.npcId === npcId;

        if (isCurrentNpcStep && currentNpcMission) {

          const isLastStep = stepIndex === mission.pasos.length - 1;

          let dialogLines = [];

          if (currentStep.tipo === "hablar_npc_entrega") {

            const entregaCompleta = tieneItemsRequeridos(currentStep.entregaItems || []);

            dialogLines = entregaCompleta
              ? (
                currentNpcMission.dialogos?.completado?.length
                  ? currentNpcMission.dialogos.completado
                  : currentNpcMission.dialogos?.inicio?.length
                    ? currentNpcMission.dialogos.inicio
                    : [currentNpcMission.conversation_default || "..."]
              )
              : (
                currentNpcMission.dialogos?.en_progreso?.length
                  ? currentNpcMission.dialogos.en_progreso
                  : currentNpcMission.dialogos?.inicio?.length
                    ? currentNpcMission.dialogos.inicio
                    : [currentNpcMission.conversation_default || "..."]
              );

          } else {

            dialogLines = isLastStep
              ? (
                currentNpcMission.dialogos?.completado?.length
                  ? currentNpcMission.dialogos.completado
                  : currentNpcMission.dialogos?.en_progreso?.length
                    ? currentNpcMission.dialogos.en_progreso
                    : [currentNpcMission.conversation_default || "..."]
              )
              : (
                currentNpcMission.dialogos?.en_progreso?.length
                  ? currentNpcMission.dialogos.en_progreso
                  : currentNpcMission.dialogos?.inicio?.length
                    ? currentNpcMission.dialogos.inicio
                    : [currentNpcMission.conversation_default || "..."]
              );

          }

          return {
            type: isLastStep ? "mission_finish" : "mission_progress",
            lines: dialogLines,
            missionId
          };

        }

        /* ---------------------------------------------
           NPC pertenece a misión pero no es su paso
        --------------------------------------------- */

        if (npcMission) {

          return {
            type: "mission_locked_progress",
            lines:
              npcMission.dialogos?.en_progreso?.length
                ? npcMission.dialogos.en_progreso
                : [npcMission.conversation_default || "..."],
            missionId
          };

        }

      }

    }

    /* ---------------------------------------------
       NPC QUE INICIA UNA MISIÓN
    --------------------------------------------- */

    for (const missionLoop of window.missionsData.missions) {

      const npcMission = Array.isArray(missionLoop.npcs)
        ? missionLoop.npcs.find(n => n.id === npcId)
        : null;

      if (!npcMission) continue;

      const starterNpcId = missionLoop.pasos?.[0]?.npcId;

      if (
        starterNpcId === npcId &&
        !isMissionAccepted(missionLoop.id) &&
        !isMissionCompleted(missionLoop.id)
      ) {

        return {
          type: "mission_start",
          lines:
            npcMission.dialogos?.inicio?.length
              ? npcMission.dialogos.inicio
              : [npcMission.conversation_default || npcLocal?.conversation_default || "..."],
          missionId: missionLoop.id
        };

      }

    }

    /* ---------------------------------------------
       DIÁLOGO POR DEFECTO
    --------------------------------------------- */

    return {
      type: "default",
      lines: [npcLocal?.conversation_default || "..."],
      missionId: null
    };

  }

  function buildNPCDialogButtons() {
    const actionsEl = window.npcDialogEl?.querySelector("#npc-dialog-actions");
    if (!actionsEl) return;

    const total = window.npcDialogState.lines.length;
    const idx = window.npcDialogState.lineIndex;
    const atFirst = idx <= 0;
    const atLast = idx >= total - 1;

    let buttonsHTML = "";

    if (window.npcDialogState.mode === "default") {
      buttonsHTML = `
      <button class="npc-dialog-btn" type="button" data-npc-action="close">Cerrar</button>
    `;
      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    if (!atLast) {
      if (!atFirst) {
        buttonsHTML += `
        <button class="npc-dialog-btn" type="button" data-npc-action="prev">Anterior</button>
      `;
      }

      buttonsHTML += `
      <button class="npc-dialog-btn" type="button" data-npc-action="next">Siguiente</button>
    `;

      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    if (window.npcDialogState.mode === "mission_locked_progress") {
      buttonsHTML = `
      <button class="npc-dialog-btn" type="button" data-npc-action="close">Cerrar</button>
    `;
      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    if (window.npcDialogState.mode === "mission_start") {
      if (!atFirst) {
        buttonsHTML += `
        <button class="npc-dialog-btn" type="button" data-npc-action="prev">Anterior</button>
      `;
      }

      buttonsHTML += `
      <button class="npc-dialog-btn" type="button" data-npc-action="reject">No aceptar</button>
      <button class="npc-dialog-btn" type="button" data-npc-action="accept-mission">Aceptar misión</button>
    `;

      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    if (window.npcDialogState.mode === "mission_progress") {
      if (!atFirst) {
        buttonsHTML += `
        <button class="npc-dialog-btn" type="button" data-npc-action="prev">Anterior</button>
      `;
      }

      buttonsHTML += `
      <button class="npc-dialog-btn" type="button" data-npc-action="continue-mission">Continuar misión</button>
    `;

      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    if (window.npcDialogState.mode === "mission_finish") {
      if (!atFirst) {
        buttonsHTML += `
        <button class="npc-dialog-btn" type="button" data-npc-action="prev">Anterior</button>
      `;
      }

      buttonsHTML += `
      <button class="npc-dialog-btn" type="button" data-npc-action="finish-mission">Finalizar misión</button>
    `;

      actionsEl.innerHTML = buttonsHTML;
      return;
    }

    actionsEl.innerHTML = "";
  }

  /*
  function renderNPCDialog() {
    if (!window.npcDialogEl || !window.npcDialogState.npc) return;

    const titleEl = window.npcDialogEl.querySelector("#npc-dialog-title");
    const portraitEl = window.npcDialogEl.querySelector("#npc-dialog-portrait");
    const lineEl = window.npcDialogEl.querySelector("#npc-dialog-line");

    titleEl.textContent = window.npcDialogState.npc.nombre || "NPC";
    const npcImg = window.npcDialogState.npc?.img;

    if (npcImg && npcImg.complete && npcImg.naturalWidth > 0) {
      const frameW = 64;
      const frameH = 64;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 96;
      tempCanvas.height = 120;

      const tctx = tempCanvas.getContext("2d");
      tctx.imageSmoothingEnabled = false;

      tctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

      tctx.drawImage(
        npcImg,
        0, 0, frameW, frameH,
        0, 0, 96, 96
      );

      portraitEl.src = tempCanvas.toDataURL("image/png");
    } else {
      portraitEl.src = window.npcDialogState.npc.imageSrc || "";
    }

    lineEl.textContent = window.npcDialogState.lines[window.npcDialogState.lineIndex] || "...";

    buildNPCDialogButtons();
  }
*/
  function renderNPCDialog() {
    if (!window.npcDialogEl || !window.npcDialogState.npc) return;

    const frameX = 0;
    const frameY = 0;
    const frameW = 64;
    const frameH = 64;

    const scale = 1.3;

    const titleEl = window.npcDialogEl.querySelector("#npc-dialog-title");
    const portraitEl = window.npcDialogEl.querySelector("#npc-dialog-portrait");
    const lineEl = window.npcDialogEl.querySelector("#npc-dialog-line");

    titleEl.textContent = window.npcDialogState.npc.nombre || "NPC";

    const npc = window.npcDialogState.npc;

    portraitEl.src = npc.imageSrc || "";

    portraitEl.style.width = `${frameW}px`;
    portraitEl.style.height = `${frameH}px`;
    portraitEl.style.objectFit = "none";
    portraitEl.style.objectPosition = `-${frameX}px -${frameY}px`;
    portraitEl.style.imageRendering = "pixelated";
    portraitEl.style.transform = `scale(${scale})`;
    portraitEl.style.transformOrigin = "center center";

    lineEl.textContent =
      window.npcDialogState.lines[window.npcDialogState.lineIndex] || "...";

    buildNPCDialogButtons();
  }

  window.renderNPCDialog = renderNPCDialog;

  function openNPCDialog(npc) {
    if (!npc) return;

    /*
     const activeMissionId = window.missionSystem.activeMissionId;
     if (activeMissionId) {
       validarPasoRecolectarItems(activeMissionId);
     }
   */
    const context = getMissionContextForNPC(npc.id);

    window.npcDialogState = {
      npc,
      mode: context.type,
      lines: Array.isArray(context.lines) && context.lines.length ? context.lines : ["..."],
      lineIndex: 0,
      missionId: context.missionId || null
    };

    window.npcDialogEl = createNPCDialogDOM();
    window.npcDialogOpen = true;
    renderNPCDialog();
  }

  function getNPCAtCanvasPosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();

    const worldX = (clientX - rect.left) / scale + camera.x;
    const worldY = (clientY - rect.top) / scale + camera.y;

    for (let i = npcs.length - 1; i >= 0; i--) {
      const npc = npcs[i];
      if (
        worldX >= npc.x &&
        worldX <= npc.x + npc.w &&
        worldY >= npc.y &&
        worldY <= npc.y + npc.h
      ) {
        return npc;
      }
    }

    return null;
  }

  //maxDistance = es la distancia maxima para que el NPC te vea y pueda asignar misiones
  function isPlayerNearNPC(npc, maxDistance = 220) {
    if (!npc || !player) return false;

    const playerCenterX = player.x + (HERO_DRAW_W / 2);
    const playerCenterY = player.y + (HERO_DRAW_H / 2);

    const npcCenterX = npc.x + (npc.w / 2);
    const npcCenterY = npc.y + (npc.h / 2);

    const dx = playerCenterX - npcCenterX;
    const dy = playerCenterY - npcCenterY;

    return Math.hypot(dx, dy) <= maxDistance;
  }

  // =======================================================
  // SISTEMA DE CONVERSACIÓN NPC CON MANIPULACIÓN DEL DOM (fin)
  // =======================================================
  function obtenerCentroEntidad(entidad) {
    return {
      x: entidad.x + (entidad.w || 64) / 2,
      y: entidad.y + (entidad.h || 64) / 2
    };
  }

  function buscarEnemigoCercano(npc) {
    const lista = window.enemigos || [];

    let enemigoMasCercano = null;
    let distanciaMin = Infinity;

    for (const enemy of lista) {
      if (!enemy) continue;

      const dist = distanciaEntreEntidades(
        { x: npc.x, y: npc.y, w: npc.w, h: npc.h },
        { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h }
      );

      if (dist < distanciaMin) {
        distanciaMin = dist;
        enemigoMasCercano = enemy;
      }
    }

    if (distanciaMin <= NPC_FEAR_RADIUS) {
      return enemigoMasCercano;
    }

    return null;
  }

  function huirDeEnemigo(npc, enemigo) {
    const npcCentro = obtenerCentroEntidad(npc);
    const enemigoCentro = obtenerCentroEntidad(enemigo);

    const dx = npcCentro.x - enemigoCentro.x;
    const dy = npcCentro.y - enemigoCentro.y;

    const len = Math.hypot(dx, dy) || 1;

    npc.dirX = dx / len;
    npc.dirY = dy / len;

    npc.isMoving = true;
    npc.pasosRestantes = 60;
  }

  function distanciaEntreEntidades(a, b) {
    const centroA = obtenerCentroEntidad(a);
    const centroB = obtenerCentroEntidad(b);

    const dx = centroA.x - centroB.x;
    const dy = centroA.y - centroB.y;

    return Math.hypot(dx, dy);
  }

  function bloqueaVisionEnemiga(obj) {
    if (!obj) return false;

    if (!String(obj.tipo || "").includes("colisionables")) return false;
    if (esBloqueArcilla(obj)) return false;

    return true;
  }

  function lineaIntersecaRect(x1, y1, x2, y2, rect) {
    const pasos = Math.max(12, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 16));

    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos;
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;

      if (
        px >= rect.x &&
        px <= rect.x + rect.w &&
        py >= rect.y &&
        py <= rect.y + rect.h
      ) {
        return true;
      }
    }

    return false;
  }

  function enemigoTieneLineaDeVision(enemy, objetivo) {
    if (!enemy || !objetivo) return false;
    if (enemy.tipo === "jefe") return true;

    const origen = obtenerCentroEntidad(enemy);
    const destino = obtenerCentroEntidad(objetivo);

    for (const obj of (ambienteObjetos || [])) {
      if (!bloqueaVisionEnemiga(obj)) continue;

      const rect = {
        x: Number(obj.x) || 0,
        y: Number(obj.y) || 0,
        w: Number(obj.w) || 0,
        h: Number(obj.h) || 0
      };

      if (lineaIntersecaRect(origen.x, origen.y, destino.x, destino.y, rect)) {
        return false;
      }
    }

    return true;
  }

  function colisionaEnemigoConJugador(enemy) {
    return (
      player.x < enemy.x + enemy.w &&
      player.x + HERO_DRAW_W > enemy.x &&
      player.y < enemy.y + enemy.h &&
      player.y + HERO_DRAW_H > enemy.y
    );
  }

  function getAliadoComoObjetivo() {
    if (typeof window.enyGetAliadoTarget !== "function") return null;

    const aliado = window.enyGetAliadoTarget();
    if (!aliado) return null;

    if (typeof window.enyIsAliadoAlive === "function" && !window.enyIsAliadoAlive()) {
      return null;
    }

    return aliado;
  }

  /*
  function colisionaEnemigoConObjetivo(enemy, objetivo) {
    if (!enemy || !objetivo) return false;
  
    return (
      objetivo.x < enemy.x + enemy.w &&
      objetivo.x + objetivo.w > enemy.x &&
      objetivo.y < enemy.y + enemy.h &&
      objetivo.y + objetivo.h > enemy.y
    );
  }
  */

  function obtenerObjetivoPrincipalEnemigo(enemy) {
    const jugadorObjetivo = {
      x: player.x,
      y: player.y,
      w: HERO_DRAW_W,
      h: HERO_DRAW_H,
      tipo: "jugador"
    };

    const aliadoObjetivo = getAliadoComoObjetivo();

    const candidatos = [];

    const puedeVerJugador = enemigoTieneLineaDeVision(enemy, jugadorObjetivo);
    const distanciaJugador = distanciaEntreEntidades(enemy, jugadorObjetivo);

    const jugadorDetectado =
      enemy.tipo === "jefe"
        ? (distanciaJugador <= enemy.radioVision)
        : (distanciaJugador <= enemy.radioVision && puedeVerJugador);

    if (jugadorDetectado) {
      candidatos.push({
        objetivo: jugadorObjetivo,
        dist: distanciaJugador
      });
    }

    if (aliadoObjetivo) {
      const puedeVerAliado = enemigoTieneLineaDeVision(enemy, aliadoObjetivo);
      const distanciaAliado = distanciaEntreEntidades(enemy, aliadoObjetivo);

      const aliadoDetectado =
        enemy.tipo === "jefe"
          ? (distanciaAliado <= enemy.radioVision)
          : (distanciaAliado <= enemy.radioVision && puedeVerAliado);

      if (aliadoDetectado) {
        candidatos.push({
          objetivo: aliadoObjetivo,
          dist: distanciaAliado
        });
      }
    }

    if (!candidatos.length) return null;

    candidatos.sort((a, b) => a.dist - b.dist);
    return candidatos[0].objetivo;
  }

  /*
  function aplicarDanioAObjetivoEnemigo(objetivo, danio, enemy) {
    if (!objetivo || danio <= 0) return;
  
    if (objetivo.tipo === "aliado") {
      if (typeof window.enyDamageAliado === "function") {
        window.enyDamageAliado(danio, enemy);
      }
      return;
    }
  
    pdv -= danio;
    if (pdv < 0) pdv = 0;
  
    crearTextoDanio(
      player.x + 32,
      player.y - 10,
      "-" + danio
    );
  
    player.blinkTimer = 300;
  
    if (pdv <= 0 && !gameOverActive) {
      activarGameOver();
    }
  }
  
  function empujarObjetivoEnemigo(objetivo, enemy) {
    if (!objetivo || !enemy) return;
  
    const dx = objetivo.x - enemy.x;
    const dy = objetivo.y - enemy.y;
    const dist = Math.hypot(dx, dy) || 1;
  
    const push = 32;
    const pushX = (dx / dist) * push;
    const pushY = (dy / dist) * push;
  
    if (objetivo.tipo === "aliado") {
      if (typeof window.enyDamageAliado === "function") {
        // el aliado ya recibe empuje dentro de su propia función de daño
      }
      return;
    }
  
    empujarJugadorConColision(pushX, pushY);
  }
  */

  function activarGameOver() {
    gameOverActive = true;
    updateGameplayUIVisibility();
    held.length = 0;
    player.walking = false;
    hoveredItem = null;
    hoveredCanvasInteractive = null;
    canvas.style.cursor = 'url("../assets/src/puntero.svg") 0 0, auto';

    if (typeof resetJoy === "function") {
      resetJoy();
    }

    pauseAmbientMusic();

    if (ambientAudio) {
      ambientAudio.currentTime = 0;
    }

    playGameOverSound();

    openGameOverDOMOverlay();
  }

  //===========================================
  /*Dibujar NPC (fin) */
  //===========================================
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
  //--NPC's ambiente
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function elegirDireccionAleatoriaNPC() {
    const dirs = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 }
    ];

    return dirs[randomInt(0, dirs.length - 1)];
  }

  //--Enemigo funcion para hablar
  function hacerHablarEnemigo(enemy, modo = "reposo") {
    if (!enemy) return;

    const banco =
      modo === "ataque"
        ? (enemy.dialogos_Atack || [])
        : (enemy.dialogos_automaticos || []);

    if (!banco.length) return;

    const index = randomInt(0, banco.length - 1);
    enemy.bubbleText = banco[index];
    enemy.bubbleTimer = enemy.bubbleMaxTime;
    enemy.tiempoHablaCooldown = randomInt(enemy.tiempoMinHabla, enemy.tiempoMaxHabla);
  }

  function hacerHablarNPCambiente(npc, modo = "normal") {
    if (!npc) return;

    const banco =
      modo === "miedo"
        ? (npc.dialogos_miedo || [])
        : (npc.dialogos_automaticos || []);

    if (!banco.length) return;

    const index = randomInt(0, banco.length - 1);
    npc.bubbleText = banco[index];
    npc.bubbleTimer = npc.bubbleMaxTime;
    npc.tiempoHablaCooldown = randomInt(npc.tiempoMinHabla, npc.tiempoMaxHabla);
  }

  //--Enemigo función de acción
  function decidirNuevaAccionEnemigo(enemy) {
    if (!enemy) return;

    const seMovera = Math.random() < 0.75;

    if (seMovera) {
      const dir = elegirDireccionAleatoriaNPC();
      enemy.dirX = dir.x;
      enemy.dirY = dir.y;
      enemy.isMoving = true;
      enemy.pasosRestantes = randomInt(25, 120);
    } else {
      enemy.dirX = 0;
      enemy.dirY = 0;
      enemy.isMoving = false;
      enemy.pasosRestantes = 0;
    }

    enemy.tiempoCambioDecision = randomInt(enemy.tiempoMinDecision, enemy.tiempoMaxDecision);

    if (enemy.tiempoHablaCooldown <= 0 && Math.random() < 0.45) {
      hacerHablarEnemigo(enemy, "reposo");
    }
  }

  function buscarAntorchaSueloCercana(enemy, radioMax = 900) {
    let mejor = null;
    let mejorDist = Infinity;

    for (const obj of (ambienteObjetos || [])) {
      if (!obj || obj.subtipo !== "antorcha_suelo") continue;

      const ex = enemy.x + enemy.w / 2;
      const ey = enemy.y + enemy.h / 2;
      const tx = obj.x + obj.w / 2;
      const ty = obj.y + obj.h / 2;

      const dist = Math.hypot(tx - ex, ty - ey);

      if (dist < mejorDist && dist <= radioMax) {
        mejor = obj;
        mejorDist = dist;
      }
    }

    return mejor;
  }

  function enemigoEstaCercaDeAntorcha(enemy, antorcha, rango = 42) {
    if (!enemy || !antorcha) return false;

    const cajaAntorcha = {
      x: antorcha.x - rango,
      y: antorcha.y - rango,
      w: antorcha.w + rango * 2,
      h: antorcha.h + rango * 2
    };

    return (
      enemy.x < cajaAntorcha.x + cajaAntorcha.w &&
      enemy.x + enemy.w > cajaAntorcha.x &&
      enemy.y < cajaAntorcha.y + cajaAntorcha.h &&
      enemy.y + enemy.h > cajaAntorcha.y
    );
  }

  function decidirNuevaAccionNPCambiente(npc) {
    if (!npc) return;

    const seMovera = Math.random() < 0.7;

    if (seMovera) {
      const dir = elegirDireccionAleatoriaNPC();
      npc.dirX = dir.x;
      npc.dirY = dir.y;
      npc.isMoving = true;
      npc.pasosRestantes = randomInt(20, 120);
    } else {
      npc.dirX = 0;
      npc.dirY = 0;
      npc.isMoving = false;
      npc.pasosRestantes = 0;
    }

    npc.tiempoCambioDecision = randomInt(npc.tiempoMinDecision, npc.tiempoMaxDecision);

    if (npc.tiempoHablaCooldown <= 0 && Math.random() < 0.35) {
      hacerHablarNPCambiente(npc);
    }
  }
  function intentarApagarFuenteDeFuego(enemy, obj) {
    if (!enemy || !obj) return false;
    if (!obj.encendida) return false;

    const ex = enemy.x + enemy.w / 2;
    const ey = enemy.y + enemy.h / 2;

    const fx = obj.x + obj.w / 2;
    const fy = obj.tipo === "chimenea"
      ? (obj.y + obj.h * 0.78)
      : (obj.y + obj.h * 0.16);

    const dist = Math.hypot(fx - ex, fy - ey);

    if (dist <= 40) {
      apagarObjetoIlumMapa(obj);
      enemy.objetivoFuegoId = null;
      enemy.modoObjetivoTemporal = null;
      return true;
    }

    return false;
  }

  function mirarEnemigoHaciaObjetivo(enemy, dx, dy) {
    if (!enemy) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      enemy.facing = dx > 0 ? "right" : "left";
    } else {
      enemy.facing = dy > 0 ? "down" : "up";
    }
  }

  function moverEnemigoHaciaFuego(enemy, obj, dtMs) {
    if (!enemy || !obj) return false;
    if (!obj.encendida) return false;

    const targetX = obj.x + obj.w / 2 - enemy.w / 2;
    const targetY = (
      obj.tipo === "chimenea"
        ? (obj.y + obj.h * 0.78)
        : (obj.y + obj.h * 0.16)
    ) - enemy.h / 2;

    let dx = targetX - enemy.x;
    let dy = targetY - enemy.y;

    const dist = Math.hypot(dx, dy);
    if (dist <= 1) {
      intentarApagarFuenteDeFuego(enemy, obj);
      return true;
    }

    dx /= dist;
    dy /= dist;

    mirarEnemigoHaciaObjetivo(enemy, dx, dy);

    enemy.dirX = dx;
    enemy.dirY = dy;
    enemy.isMoving = true;

    const seMovio = moverEnemigoConRodeo(enemy, dtMs, dx, dy);

    if (seMovio) {
      enemy.frameTimer += dtMs;
      while (enemy.frameTimer >= enemy.frameDurationMs) {
        enemy.frameTimer -= enemy.frameDurationMs;
        enemy.frame = (enemy.frame + 1) % enemy.totalFrames;
      }
    } else {
      resetRodeoEnemigo(enemy);
      enemy.isMoving = false;
      enemy.dirX = 0;
      enemy.dirY = 0;
      mirarEnemigoHaciaObjetivo(enemy, dx, dy);
      enemy.frame = 0;
      enemy.frameTimer = 0;
    }

    intentarApagarFuenteDeFuego(enemy, obj);
    return seMovio;
  }

  //--Enemigos (inicio)
  function updateEnemigos(dtMs) {
    const listaEnemigos = window.enemigos || [];

    if (!canRunEnemyLogic()) {
      for (const enemy of listaEnemigos) {
        if (!enemy) continue;

        enemy.persiguiendo = false;
        enemy.isMoving = false;
        enemy.dirX = 0;
        enemy.dirY = 0;
        enemy.frame = 0;
        enemy.frameTimer = 0;
        enemy.bubbleText = "";
        enemy.bubbleTimer = 0;

        if (enemy.disparoCooldown > 0) {
          enemy.disparoCooldown -= dtMs;
          if (enemy.disparoCooldown < 0) enemy.disparoCooldown = 0;
        }

        if (enemy.cooldownDano > 0) {
          enemy.cooldownDano -= dtMs;
          if (enemy.cooldownDano < 0) enemy.cooldownDano = 0;
        }
      }

      return;
    }
    for (const enemy of listaEnemigos) {
      if (!enemy) continue;

      if (enemy.disparoCooldown > 0) {
        enemy.disparoCooldown -= dtMs;
        if (enemy.disparoCooldown < 0) enemy.disparoCooldown = 0;
      }

      if (enemy.cooldownDano > 0) {
        enemy.cooldownDano -= dtMs;
        if (enemy.cooldownDano < 0) enemy.cooldownDano = 0;
      }

      if (enemy.bubbleTimer > 0) {
        enemy.bubbleTimer -= dtMs;
        if (enemy.bubbleTimer < 0) {
          enemy.bubbleTimer = 0;
          enemy.bubbleText = "";
        }
      }

      if (enemy.tiempoHablaCooldown > 0) {
        enemy.tiempoHablaCooldown -= dtMs;
        if (enemy.tiempoHablaCooldown < 0) enemy.tiempoHablaCooldown = 0;
      }

      const distanciaJugador = distanciaEntreEntidades(
        { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h },
        { x: player.x, y: player.y, w: HERO_DRAW_W, h: HERO_DRAW_H }
      );

      const jugadorComoObjetivo = {
        x: player.x,
        y: player.y,
        w: HERO_DRAW_W,
        h: HERO_DRAW_H,
        tipo: "jugador"
      };

      const fuegoObjetivo = buscarFuenteDeFuegoCercana(enemy, 320);

      if (fuegoObjetivo) {
        enemy.objetivoFuegoId = fuegoObjetivo.nombre_id || fuegoObjetivo.id || null;
        enemy.modoObjetivoTemporal = "fuego";
        moverEnemigoHaciaFuego(enemy, fuegoObjetivo, dtMs);
        continue;
      }

      const puedeVerJugador = enemigoTieneLineaDeVision(enemy, jugadorComoObjetivo);
      const antorchaObjetivo = buscarAntorchaSueloCercana(enemy, enemy.radioVision + 250);
      const objetivoPrincipal = !antorchaObjetivo ? obtenerObjetivoPrincipalEnemigo(enemy) : null;
      const usuarioDentroVision = !antorchaObjetivo && !!objetivoPrincipal;

      if (!antorchaObjetivo) {
        enemy.persiguiendo = !!objetivoPrincipal;
      }



      const jugadorDetectado =
        enemy.tipo === "jefe"
          ? (distanciaJugador <= enemy.radioVision)
          : (distanciaJugador <= enemy.radioVision && puedeVerJugador);

      if (!antorchaObjetivo) {
        enemy.persiguiendo = jugadorDetectado;
      }


      if (enemy.tipo === "jefe") {
        if (enemy.cooldownAtaqueEspecial > 0) {
          enemy.cooldownAtaqueEspecial -= dtMs;
          if (enemy.cooldownAtaqueEspecial < 0) enemy.cooldownAtaqueEspecial = 0;
        }

        if (
          usuarioDentroVision &&
          !enemy.ataqueEspecialActivo &&
          enemy.cooldownAtaqueEspecial <= 0
        ) {
          if (Math.random() < (enemy.ataqueEspecialProbabilidad || 0.38)) {
            lanzarAtaqueEspecialJefe(enemy);
          } else {
            enemy.cooldownAtaqueEspecial = randomInt(
              enemy.ataqueEspecialDecisionMin || 1800,
              enemy.ataqueEspecialDecisionMax || 4200
            );
          }
        }
      }

      if (!antorchaObjetivo && colisionaEnemigoConJugador(enemy) && enemy.cooldownDano <= 0) {
        if (!canRunEnemyLogic()) continue;
        let danio = enemy.puntos_de_ataque;

        const escudosHierro = (window.equipSlots || []).filter(i => i && i.id === "escudo_de_hierro");
        const escudoMadera = window.equipSlots?.find(i => i && i.id === "escudo_de_madera");

        // 1) Escudo de hierro reduce 2 puntos de daño
        if (escudosHierro.length > 0) {
          danio = Math.max(0, danio - (2 * escudosHierro.length));
        }

        // 2) Escudo de madera absorbe el daño restante con sus usos
        if (escudoMadera && (escudoMadera.usos ?? 0) > 0 && danio > 0) {

          const absorcion = Math.min(escudoMadera.usos, danio);
          escudoMadera.usos -= absorcion;
          danio -= absorcion;

          crearTextoDanio(
            player.x + 32,
            player.y - 10,
            "-" + absorcion,
            "#ffaa00",
            "#ffaa00"
          );

          //console.log("El escudo de madera absorbió daño. Usos restantes:", escudoMadera.usos);
        }

        // 3) Si aún queda daño, lo recibe la vida
        if (danio > 0) {
          pdv -= danio;

          if (pdv < 0) pdv = 0;

          crearTextoDanio(
            player.x + 32,
            player.y - 10,
            "-" + danio
          );

          if (pdv <= 0 && !gameOverActive) {
            activarGameOver();
          }
        }

        // retroceso del jugador
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.hypot(dx, dy) || 1;

        const push = 32;
        const pushX = (dx / dist) * push;
        const pushY = (dy / dist) * push;

        empujarJugadorConColision(pushX, pushY);

        player.blinkTimer = 300;

        enemy.cooldownDano = 800;
      }

      if (antorchaObjetivo || usuarioDentroVision) {
        enemy.persiguiendo = true;

        if (antorchaObjetivo) {
          enemy.objetivoAntorcha = antorchaObjetivo.zona_id;
        } else {
          enemy.objetivoAntorcha = null;
        }

        actualizarEstadoEncierroEnemigo(enemy, dtMs);

        if (!antorchaObjetivo && procesarEscapeArcillaEnemigo(enemy, dtMs)) {
          continue;
        }

        const enemyCenter = obtenerCentroEntidad(enemy);

        const jugadorComoObjetivo = {
          x: player.x,
          y: player.y,
          w: HERO_DRAW_W,
          h: HERO_DRAW_H
        };

        const puedeVerJugador = enemigoTieneLineaDeVision(enemy, jugadorComoObjetivo);
        const distanciaJugador = distanciaEntreEntidades(
          enemy,
          jugadorComoObjetivo
        );

        const jugadorDetectado =
          enemy.tipo === "jefe"
            ? (distanciaJugador <= enemy.radioVision)
            : (distanciaJugador <= enemy.radioVision && puedeVerJugador);

        if (!antorchaObjetivo) {
          enemy.persiguiendo = jugadorDetectado;
        }

        const objetivoCenter = antorchaObjetivo
          ? {
            x: antorchaObjetivo.x + antorchaObjetivo.w / 2,
            y: antorchaObjetivo.y + antorchaObjetivo.h / 2
          }
          : {
            x: player.x + HERO_DRAW_W / 2,
            y: player.y + HERO_DRAW_H / 2
          };

        const dx = objetivoCenter.x - enemyCenter.x;
        const dy = objetivoCenter.y - enemyCenter.y;
        const len = Math.hypot(dx, dy) || 1;

        if (
          antorchaObjetivo &&
          enemy.tipo !== "jefe" &&
          enemigoEstaCercaDeAntorcha(enemy, antorchaObjetivo, 24)
        ) {
          enemy.dirX = 0;
          enemy.dirY = 0;
          enemy.isMoving = false;
          enemy.frame = 0;
          enemy.frameTimer = 0;

          enemy.cooldownGolpeAntorcha = Number(enemy.cooldownGolpeAntorcha || 0) - dtMs;

          const bloquePadre = (ambienteObjetos || []).find(obj =>
            obj &&
            obj.zona_id === antorchaObjetivo.bloque_padre_id &&
            esBloqueArcilla(obj)
          );

          if (bloquePadre && enemy.cooldownGolpeAntorcha <= 0) {
            aplicarDanioABloqueArcilla(
              bloquePadre,
              Number(enemy.puntos_de_ataque ?? 1) || 1,
              bloquePadre.x + bloquePadre.w / 2,
              bloquePadre.y + bloquePadre.h / 2
            );

            enemy.cooldownGolpeAntorcha = 650;
          }

          continue;
        }

        enemy.dirX = dx / len;
        enemy.dirY = dy / len;

        if (antorchaObjetivo && enemy.tipo !== "jefe") {
          const bloquePadre = (ambienteObjetos || []).find(obj =>
            obj &&
            obj.zona_id === antorchaObjetivo.bloque_padre_id &&
            esBloqueArcilla(obj)
          );

          if (bloquePadre) {
            const tocandoBloque =
              enemy.x < bloquePadre.x + bloquePadre.w &&
              enemy.x + enemy.w > bloquePadre.x &&
              enemy.y < bloquePadre.y + bloquePadre.h &&
              enemy.y + enemy.h > bloquePadre.y;

            if (tocandoBloque) {
              enemy.dirX = 0;
              enemy.dirY = 0;
              enemy.isMoving = false;
              enemy.frame = 0;
              enemy.frameTimer = 0;

              enemy.cooldownGolpeAntorcha = Number(enemy.cooldownGolpeAntorcha || 0) - dtMs;

              if (enemy.cooldownGolpeAntorcha <= 0) {
                aplicarDanioABloqueArcilla(
                  bloquePadre,
                  Number(enemy.puntos_de_ataque ?? 1) || 1,
                  bloquePadre.x + bloquePadre.w / 2,
                  bloquePadre.y + bloquePadre.h / 2
                );

                enemy.cooldownGolpeAntorcha = 650;
              }

              continue;
            }
          }
        }

        mirarEnemigoHaciaObjetivo(enemy, enemy.dirX, enemy.dirY);

        if (enemy.tipo === "armado") {
          enemy.tiempoCambioDecision -= dtMs;

          if (enemy.tiempoCambioDecision <= 0) {
            decidirAccionEnemigoArmado(enemy);
          }

          if (antorchaObjetivo) {
            enemy.modoCombate = "correr";
            enemy.disparoCooldown = Math.max(enemy.disparoCooldown || 0, 250);
          }

          if (enemy.modoCombate === "correr") {
            enemy.isMoving = true;

            const seMovio = moverEnemigoConRodeo(enemy, dtMs, enemy.dirX, enemy.dirY);

            if (seMovio) {
              enemy.frameTimer += dtMs;
              while (enemy.frameTimer >= enemy.frameDurationMs) {
                enemy.frameTimer -= enemy.frameDurationMs;
                enemy.frame = (enemy.frame + 1) % enemy.totalFrames;
              }
            } else {
              const lookX = enemy.dirX;
              const lookY = enemy.dirY;

              //resetRodeoEnemigo(enemy);
              enemy.isMoving = false;
              enemy.dirX = 0;
              enemy.dirY = 0;
              mirarEnemigoHaciaObjetivo(enemy, lookX, lookY);
              enemy.frame = 0;
              enemy.frameTimer = 0;
            }
          } else {
            //resetRodeoEnemigo(enemy);
            enemy.isMoving = false;
            enemy.frame = 0;
            enemy.frameTimer = 0;
          }
        } else {
          enemy.isMoving = true;

          const seMovio = moverEnemigoConRodeo(enemy, dtMs, enemy.dirX, enemy.dirY);

          if (seMovio) {
            enemy.frameTimer += dtMs;
            while (enemy.frameTimer >= enemy.frameDurationMs) {
              enemy.frameTimer -= enemy.frameDurationMs;
              enemy.frame = (enemy.frame + 1) % enemy.totalFrames;
            }
          } else {
            const lookX = enemy.dirX;
            const lookY = enemy.dirY;

            //resetRodeoEnemigo(enemy);
            enemy.isMoving = false;
            enemy.dirX = 0;
            enemy.dirY = 0;
            mirarEnemigoHaciaObjetivo(enemy, lookX, lookY);
            enemy.frame = 0;
            enemy.frameTimer = 0;
          }

          if (enemy.tiempoHablaCooldown <= 0 && Math.random() < 0.12) {
            hacerHablarEnemigo(enemy, "ataque");
          }
        }

      } else {
        enemy.persiguiendo = false;
        enemy.tiempoCambioDecision -= dtMs;

        if (enemy.tiempoCambioDecision <= 0 || (enemy.isMoving && enemy.pasosRestantes <= 0)) {
          decidirNuevaAccionEnemigo(enemy);
        }

        if (enemy.isMoving && enemy.pasosRestantes > 0) {
          const seMovio = moverEnemigoConRodeo(enemy, dtMs, enemy.dirX, enemy.dirY);

          if (seMovio) {
            enemy.frameTimer += dtMs;
            while (enemy.frameTimer >= enemy.frameDurationMs) {
              enemy.frameTimer -= enemy.frameDurationMs;
              enemy.frame = (enemy.frame + 1) % enemy.totalFrames;
            }

            enemy.pasosRestantes -= 1;
          } else {
            enemy.frame = 0;
            enemy.frameTimer = 0;
          }
        } else {
          const lookX = enemy.dirX;
          const lookY = enemy.dirY;

          //resetRodeoEnemigo(enemy);
          enemy.isMoving = false;
          enemy.dirX = 0;
          enemy.dirY = 0;
          mirarEnemigoHaciaObjetivo(enemy, lookX, lookY);
          enemy.frame = 0;
          enemy.frameTimer = 0;
        }
      }
    }
  }
  //--Enemigos (fin)

  //--NPC'sambiente (Inicio)
  function updateNPCsAmbiente(dtMs) {
    for (const npc of npcsAmbiente) {
      if (!npc) continue;

      const enemigoCerca = buscarEnemigoCercano(npc);

      if (enemigoCerca) {
        huirDeEnemigo(npc, enemigoCerca);

        if (npc.tiempoHablaCooldown <= 0) {
          hacerHablarNPCambiente(npc, "miedo");
        }
      }

      if (npc.bubbleTimer > 0) {
        npc.bubbleTimer -= dtMs;
        if (npc.bubbleTimer < 0) {
          npc.bubbleTimer = 0;
          npc.bubbleText = "";
        }
      }

      if (npc.tiempoHablaCooldown > 0) {
        npc.tiempoHablaCooldown -= dtMs;
        if (npc.tiempoHablaCooldown < 0) npc.tiempoHablaCooldown = 0;
      }

      npc.tiempoCambioDecision -= dtMs;

      if (npc.tiempoCambioDecision <= 0 || (npc.isMoving && npc.pasosRestantes <= 0)) {
        npc.rodeando = false;
        npc.ladoRodeo = null;
        npc.rodeoDirOriginalX = 0;
        npc.rodeoDirOriginalY = 0;
        npc.rodeoDirX = 0;
        npc.rodeoDirY = 0;
        npc.rodeoTimer = 0;
        npc.rodeoIntentos = 0;
        npc.ultimoObstaculoId = null;

        decidirNuevaAccionNPCambiente(npc);
      }

      if (npc.isMoving && npc.pasosRestantes > 0) {
        const seMovio = moverNPCambienteConRodeo(npc, dtMs, WORLD_W, WORLD_H);

        if (seMovio) {
          npc.frameTimer += dtMs;
          while (npc.frameTimer >= npc.frameDurationMs) {
            npc.frameTimer -= npc.frameDurationMs;
            npc.frame = (npc.frame + 1) % npc.totalFrames;
          }

          npc.pasosRestantes -= 1;
        } else {
          npc.frame = 0;
          npc.frameTimer = 0;
        }

        const pegoBorde =
          npc.x <= 0 ||
          npc.x >= WORLD_W - npc.w ||
          npc.y <= 0 ||
          npc.y >= WORLD_H - npc.h;

        if (pegoBorde) {
          npc.pasosRestantes = 0;
          npc.isMoving = false;
          npc.rodeando = false;
          npc.rodeoTimer = 0;
        }
      } else {
        npc.frame = 0;
        npc.frameTimer = 0;
      }
    }
  }
  //--NPC'sambiente (Fin)

  //--Ataques especiales jefe
  window.ataquesEspecialesJefeActivos = [];
  window.particulasVolcanJefeActivas = [];
  window.explosionesJefeActivas = [];

  function crearParticulasVolcanJefe(atk) {
    const enemy = atk.enemyRef;
    if (!enemy) return;

    const cx = enemy.x + enemy.w / 2;
    const cy = enemy.y + enemy.h / 2;

    const emitir = atk.tiempo < atk.duracionPreparacion ? 8 : 14;

    for (let i = 0; i < emitir; i++) {
      const ang = Math.random() * Math.PI * 2;
      const radioBase = 20 + Math.random() * 46;

      const px = cx + Math.cos(ang) * radioBase;
      const py = cy + Math.sin(ang) * radioBase * 0.45;

      const haciaArriba = Math.random() < 0.7;

      window.particulasVolcanJefeActivas.push({
        x: px,
        y: py,

        vx: (Math.random() - 0.5) * 2.6,
        vy: haciaArriba
          ? (-2.8 - Math.random() * 4.6)
          : (0.8 + Math.random() * 2.8),

        size: 3 + Math.random() * 7,
        life: 420 + Math.random() * 380,
        maxLife: 800,

        color: Math.random() < 0.33
          ? "#ff2b00"
          : Math.random() < 0.66
            ? "#ff9a00"
            : "#ffd36b",

        glow: 12 + Math.random() * 18,
        gravity: haciaArriba ? 0.05 + Math.random() * 0.08 : -0.01,
        drift: (Math.random() - 0.5) * 0.08,
        humo: Math.random() < 0.25
      });
    }
  }

  function crearExplosionDramaticaJefe(enemy) {
    if (!enemy) return;

    const cx = enemy.x + enemy.w / 2;
    const cy = enemy.y + enemy.h / 2;

    window.explosionesJefeActivas.push({
      x: cx,
      y: cy,
      radio: 20,
      radioMax: 210,
      life: 620,
      maxLife: 620
    });

    for (let i = 0; i < 90; i++) {
      const ang = (Math.PI * 2 / 90) * i + (Math.random() - 0.5) * 0.18;
      const speed = 2.5 + Math.random() * 7.5;

      window.particulasVolcanJefeActivas.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed * 0.72 - (Math.random() * 1.5),
        size: 5 + Math.random() * 10,
        life: 500 + Math.random() * 420,
        maxLife: 920,
        color: Math.random() < 0.4
          ? "#ff2b00"
          : Math.random() < 0.7
            ? "#ff9a00"
            : "#fff0a8",
        glow: 18 + Math.random() * 24,
        gravity: 0.04 + Math.random() * 0.08,
        drift: (Math.random() - 0.5) * 0.1,
        humo: Math.random() < 0.18
      });
    }

    for (let i = 0; i < 36; i++) {
      const ang = (Math.PI * 2 / 36) * i;
      const speed = 1.8 + Math.random() * 2.8;

      window.particulasVolcanJefeActivas.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed * 0.45,
        size: 16 + Math.random() * 18,
        life: 280 + Math.random() * 180,
        maxLife: 460,
        color: "#3a3a3a",
        glow: 8,
        gravity: -0.005,
        drift: (Math.random() - 0.5) * 0.04,
        humo: true
      });
    }
  }

  function updateParticulasVolcanJefe(dtMs) {
    for (let i = window.particulasVolcanJefeActivas.length - 1; i >= 0; i--) {
      const p = window.particulasVolcanJefeActivas[i];

      p.life -= dtMs;
      p.vx += p.drift;
      p.vy += p.gravity;

      p.x += p.vx;
      p.y += p.vy;

      if (p.humo) {
        p.size *= 1.01;
      } else {
        p.size *= 0.986;
      }

      if (p.life <= 0 || p.size <= 0.25) {
        window.particulasVolcanJefeActivas.splice(i, 1);
      }
    }

    for (let i = window.explosionesJefeActivas.length - 1; i >= 0; i--) {
      const ex = window.explosionesJefeActivas[i];
      ex.life -= dtMs;

      const p = 1 - Math.max(0, ex.life) / ex.maxLife;
      ex.radio = ex.radioMax * (0.2 + p * 0.8);

      if (ex.life <= 0) {
        window.explosionesJefeActivas.splice(i, 1);
      }
    }
  }

  function drawParticulasVolcanJefe(ctx, layer = "front") {
    for (const p of (window.particulasVolcanJefeActivas || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      const esBack = p.vy < 0;
      if (layer === "back" && !esBack) continue;
      if (layer === "front" && esBack) continue;

      ctx.save();
      ctx.globalAlpha = alpha * (p.humo ? 0.38 : 0.95);

      if (p.humo) {
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#555555";
        ctx.shadowBlur = p.glow * 0.5;
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (!p.humo) {
        ctx.fillStyle = "#fff7cf";
        ctx.shadowColor = "#fff7cf";
        ctx.shadowBlur = p.glow * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function drawExplosionesJefe(ctx, layer = "front") {
    for (const ex of (window.explosionesJefeActivas || [])) {
      const alpha = Math.max(0, ex.life / ex.maxLife);
      const start = layer === "back" ? Math.PI : 0;
      const end = layer === "back" ? Math.PI * 2 : Math.PI;

      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.strokeStyle = "#ff3b00";
      ctx.lineWidth = 28;
      ctx.shadowColor = "#ff3b00";
      ctx.shadowBlur = 34;
      ctx.ellipse(ex.x, ex.y, ex.radio, ex.radio * 0.58, 0, start, end);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "#ffb300";
      ctx.lineWidth = 14;
      ctx.shadowColor = "#ffb300";
      ctx.shadowBlur = 22;
      ctx.ellipse(ex.x, ex.y, ex.radio * 0.86, ex.radio * 0.48, 0, start, end);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "#fff4c7";
      ctx.lineWidth = 5;
      ctx.shadowColor = "#fff4c7";
      ctx.shadowBlur = 12;
      ctx.ellipse(ex.x, ex.y, ex.radio * 0.74, ex.radio * 0.4, 0, start, end);
      ctx.stroke();

      ctx.restore();
    }
  }

  function lanzarAtaqueEspecialJefe(enemy) {
    if (!enemy || enemy.tipo !== "jefe") return;
    if (enemy.ataqueEspecialActivo) return;

    const cx = enemy.x + enemy.w / 2;
    const cy = enemy.y + enemy.h / 2;

    const ataque = {
      bloquesGolpeados: [],
      enemyId: enemy.id,
      enemyRef: enemy,
      x: cx,
      y: cy,

      radioMax: 200,
      radioActual: 18,

      tiempo: 0,
      duracionPreparacion: 700,
      duracionExpansion: 850,
      duracionSostenida: 650,
      duracionDesvanecer: 450,

      golpeAplicado: false,
      explosionLanzada: false,
      activo: true
    };

    enemy.ataqueEspecialPreparando = true;
    enemy.ataqueEspecialActivo = true;
    enemy.ataqueEspecialHitAplicado = false;

    if (enemy.tiempoHablaCooldown <= 0) {
      hacerHablarEnemigo(enemy, "ataque");
    }

    window.ataquesEspecialesJefeActivos.push(ataque);
    playComodoAttackSound();
  }

  function updateAtaquesEspecialesJefe(dtMs) {
    for (let i = window.ataquesEspecialesJefeActivos.length - 1; i >= 0; i--) {
      const atk = window.ataquesEspecialesJefeActivos[i];
      const enemy = atk.enemyRef;

      if (!enemy || (enemy.puntos_de_vida ?? 0) <= 0) {
        window.ataquesEspecialesJefeActivos.splice(i, 1);
        continue;
      }

      atk.x = enemy.x + enemy.w / 2;
      atk.y = enemy.y + enemy.h / 2;
      atk.tiempo += dtMs;

      crearParticulasVolcanJefe(atk);

      const t = atk.tiempo;
      const prepEnd = atk.duracionPreparacion;
      const expandEnd = prepEnd + atk.duracionExpansion;
      const sustainEnd = expandEnd + atk.duracionSostenida;
      const fadeEnd = sustainEnd + atk.duracionDesvanecer;

      if (t <= prepEnd) {
        const p = t / prepEnd;
        atk.radioActual = 18 + Math.sin(p * Math.PI) * 24;
      } else if (t <= expandEnd) {
        const p = (t - prepEnd) / atk.duracionExpansion;
        atk.radioActual = 42 + (atk.radioMax - 42) * p;

        if (!atk.explosionLanzada && p >= 0.08) {
          crearExplosionDramaticaJefe(enemy);
          atk.explosionLanzada = true;
        }
      } else if (t <= sustainEnd) {
        atk.radioActual = atk.radioMax;
      } else if (t <= fadeEnd) {
        const p = (t - sustainEnd) / atk.duracionDesvanecer;
        atk.radioActual = atk.radioMax + (16 * p);
      } else {
        enemy.ataqueEspecialPreparando = false;
        enemy.ataqueEspecialActivo = false;
        enemy.ataqueEspecialHitAplicado = false;
        enemy.cooldownAtaqueEspecial = randomInt(
          enemy.ataqueEspecialDecisionMin || 1800,
          enemy.ataqueEspecialDecisionMax || 4200
        );
        window.ataquesEspecialesJefeActivos.splice(i, 1);
        continue;
      }

      const playerCenterX = player.x + HERO_DRAW_W / 2;
      const playerCenterY = player.y + HERO_DRAW_H / 2;

      const dx = playerCenterX - atk.x;
      const dy = playerCenterY - atk.y;
      const dist = Math.hypot(dx, dy);

      const grosorAro = 48;
      const radioInterno = Math.max(0, atk.radioActual - grosorAro * 0.55);
      const radioExterno = atk.radioActual + grosorAro * 0.55;

      for (const obj of (ambienteObjetos || [])) {
        if (!esBloqueArcilla(obj)) continue;
        if (atk.bloquesGolpeados.includes(obj.zona_id)) continue;

        const cx = obj.x + obj.w / 2;
        const cy = obj.y + obj.h / 2;
        const distBloque = Math.hypot(cx - atk.x, cy - atk.y);

        if (distBloque >= radioInterno && distBloque <= radioExterno) {
          aplicarDanioABloqueArcilla(
            obj,
            Number(enemy.puntos_de_ataque ?? 1) || 1,
            cx,
            cy
          );

          atk.bloquesGolpeados.push(obj.zona_id);
        }
      }

      const puedeGolpear =
        t >= prepEnd + 160 &&
        t <= sustainEnd + 120;

      if (!atk.golpeAplicado && puedeGolpear && dist >= radioInterno && dist <= radioExterno) {
        let danio = Number(enemy.puntos_de_ataque ?? 0) || 0;

        const escudosHierro = (window.equipSlots || []).filter(
          it => it && it.id === "escudo_de_hierro"
        );
        const escudoMadera = window.equipSlots?.find(
          it => it && it.id === "escudo_de_madera"
        );

        if (escudosHierro.length > 0) {
          danio = Math.max(0, danio - (2 * escudosHierro.length));
        }

        if (escudoMadera && (escudoMadera.usos ?? 0) > 0 && danio > 0) {
          const absorcion = Math.min(escudoMadera.usos, danio);
          escudoMadera.usos -= absorcion;
          danio -= absorcion;

          crearTextoDanio(
            player.x + 32,
            player.y - 10,
            "-" + absorcion,
            "#ffaa00",
            "#ffaa00"
          );
        }

        if (danio > 0) {
          pdv -= danio;
          if (pdv < 0) pdv = 0;

          crearTextoDanio(
            player.x + 32,
            player.y - 10,
            "-" + danio,
            "#ff5a1f",
            "#ff2b00"
          );

          player.blinkTimer = 300;

          if (pdv <= 0 && !gameOverActive) {
            activarGameOver();
          }
        }

        const len = Math.hypot(dx, dy) || 1;
        const push = 46;

        player.x += (dx / len) * push;
        player.y += (dy / len) * push;

        player.x = clamp(player.x, 0, WORLD_W - HERO_W);
        player.y = clamp(player.y, 0, WORLD_H - HERO_H);

        atk.golpeAplicado = true;
        enemy.ataqueEspecialHitAplicado = true;
      }
    }
  }

  function drawFireRingHalf(ctx, atk, mitad = "front") {
    const t = atk.tiempo;
    const prepEnd = atk.duracionPreparacion;
    const expandEnd = prepEnd + atk.duracionExpansion;
    const sustainEnd = expandEnd + atk.duracionSostenida;
    const fadeEnd = sustainEnd + atk.duracionDesvanecer;

    let alpha = 1;

    if (t <= prepEnd) {
      alpha = 0.45 + Math.sin((t / prepEnd) * Math.PI) * 0.25;
    } else if (t <= sustainEnd) {
      alpha = 1;
    } else {
      const p = (t - sustainEnd) / atk.duracionDesvanecer;
      alpha = Math.max(0, 1 - p);
    }

    const baseR = atk.radioActual;
    const flameCount = Math.max(42, Math.floor(baseR * 0.34));
    const now = performance.now() * 0.012;

    ctx.save();
    ctx.globalAlpha = alpha;

    for (let i = 0; i < flameCount; i++) {
      const a = (Math.PI * 2 / flameCount) * i + now * 0.018;

      const dibujar =
        mitad === "back"
          ? Math.sin(a) < 0
          : Math.sin(a) >= 0;

      if (!dibujar) continue;

      const frenzy = 0.7 + Math.abs(Math.sin(now * 0.8 + i * 1.37)) * 1.1;
      const jitterR = (Math.sin(now * 1.6 + i * 2.1) * 7) + (Math.cos(now * 1.1 + i) * 5);
      const outerR = baseR + jitterR;
      const innerR = Math.max(20, outerR - (28 + frenzy * 10));

      const x1 = atk.x + Math.cos(a) * innerR;
      const y1 = atk.y + Math.sin(a) * innerR * 0.52;

      const x2 = atk.x + Math.cos(a) * outerR;
      const y2 = atk.y + Math.sin(a) * outerR * 0.52;

      const flameLen = 18 + frenzy * 20;
      const tipX = atk.x + Math.cos(a) * (outerR + flameLen);
      const tipY = atk.y + Math.sin(a) * (outerR + flameLen) * 0.52;

      ctx.save();
      ctx.lineCap = "round";

      ctx.strokeStyle = "#ff2b00";
      ctx.lineWidth = 8 + frenzy * 2.4;
      ctx.shadowColor = "#ff4d00";
      ctx.shadowBlur = 24 + frenzy * 5;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(x2, y2, tipX, tipY);
      ctx.stroke();

      ctx.strokeStyle = "#ff9a00";
      ctx.lineWidth = 4 + frenzy * 1.4;
      ctx.shadowColor = "#ffb300";
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(x2, y2, tipX, tipY);
      ctx.stroke();

      ctx.strokeStyle = "#fff2a6";
      ctx.lineWidth = 1.8 + frenzy * 0.6;
      ctx.shadowColor = "#fff7cc";
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(
        x1 + (Math.random() - 0.5) * 2,
        y1 + (Math.random() - 0.5) * 2
      );
      ctx.quadraticCurveTo(x2, y2, tipX, tipY);
      ctx.stroke();

      ctx.restore();
    }

    const ellipseStart = mitad === "back" ? Math.PI : 0;
    const ellipseEnd = mitad === "back" ? Math.PI * 2 : Math.PI;

    ctx.beginPath();
    ctx.strokeStyle = mitad === "back" ? "rgba(255,90,0,0.55)" : "rgba(255,180,0,0.9)";
    ctx.lineWidth = mitad === "back" ? 16 : 18;
    ctx.shadowColor = mitad === "back" ? "#ff4d00" : "#ffae00";
    ctx.shadowBlur = mitad === "back" ? 18 : 24;
    ctx.ellipse(atk.x, atk.y, baseR, baseR * 0.52, 0, ellipseStart, ellipseEnd);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,245,210,0.7)";
    ctx.lineWidth = mitad === "back" ? 3 : 4;
    ctx.shadowColor = "#fff6cf";
    ctx.shadowBlur = 10;
    ctx.ellipse(atk.x, atk.y, Math.max(10, baseR - 10), Math.max(8, (baseR - 10) * 0.52), 0, ellipseStart, ellipseEnd);
    ctx.stroke();

    ctx.restore();
  }

  function drawAtaquesEspecialesJefeBack(ctx) {
    for (const atk of (window.ataquesEspecialesJefeActivos || [])) {
      drawFireRingHalf(ctx, atk, "back");
    }
  }

  function drawAtaquesEspecialesJefeFront(ctx) {
    for (const atk of (window.ataquesEspecialesJefeActivos || [])) {
      drawFireRingHalf(ctx, atk, "front");
    }
  }

  //--Lanzar disparos enemigo
  window.disparosEnemigosArmadosActivos = [];

  function lanzarDisparoEnemigoArmado(enemy) {
    if (!enemy) return;

    const objetivo = obtenerObjetivoPrincipalEnemigo(enemy);
    if (!objetivo) return;

    playLazerSound();

    const enemyCenterX = enemy.x + enemy.w / 2;
    const enemyCenterY = enemy.y + enemy.h / 2;

    const objetivoCenterX = objetivo.x + objetivo.w / 2;
    const objetivoCenterY = objetivo.y + objetivo.h / 2;

    const dx = objetivoCenterX - enemyCenterX;
    const dy = objetivoCenterY - enemyCenterY;
    const len = Math.hypot(dx, dy) || 1;

    const vx = (dx / len) * (enemy.velocidadDisparo || 8.5);
    const vy = (dy / len) * (enemy.velocidadDisparo || 8.5);

    window.disparosEnemigosArmadosActivos.push({
      x: enemyCenterX,
      y: enemyCenterY,
      vx,
      vy,
      largo: enemy.largoDisparo || 28,
      vida: 700,
      danio: Number(enemy.puntos_de_ataque ?? 0) || 0,
      objetivoTipo: objetivo.tipo || "jugador"
    });
  }

  function decidirAccionEnemigoArmado(enemy) {
    if (!enemy) return;

    const disparar = Math.random() < 0.45;

    if (disparar && enemy.disparoCooldown <= 0) {
      enemy.modoCombate = "disparar";
      lanzarDisparoEnemigoArmado(enemy);
      enemy.disparoCooldown = 900;

      if (Math.random() < 0.8) {
        hacerHablarEnemigo(enemy, "ataque");
      }
    } else {
      enemy.modoCombate = "correr";
    }

    enemy.tiempoCambioDecision = randomInt(
      enemy.tiempoMinDecisionCombate || 350,
      enemy.tiempoMaxDecisionCombate || 900
    );
  }

  function updateDisparosEnemigosArmados(dtMs) {
    for (let i = window.disparosEnemigosArmadosActivos.length - 1; i >= 0; i--) {
      const d = window.disparosEnemigosArmadosActivos[i];

      d.x += d.vx;
      d.y += d.vy;
      d.vida -= dtMs;

      if (danarBloqueArcillaEnRect(
        d.x - 5,
        d.y - 5,
        10,
        10,
        Number(d.danio ?? 1) || 1,
        d.x,
        d.y
      )) {
        window.disparosEnemigosArmadosActivos.splice(i, 1);
        continue;
      }

      if (proyectilColisionaAmbiente(d.x - 5, d.y - 5, 10, 10)) {
        crearChispasImpactoBloque(d.x, d.y, "#ff5a5a");
        window.disparosEnemigosArmadosActivos.splice(i, 1);
        continue;
      }

      const hitboxW = 10;
      const hitboxH = 10;
      const hitX = d.x - hitboxW / 2;
      const hitY = d.y - hitboxH / 2;

      const aliadoObjetivo = getAliadoComoObjetivo();

      const colisionaJugador =
        hitX < player.x + HERO_DRAW_W &&
        hitX + hitboxW > player.x &&
        hitY < player.y + HERO_DRAW_H &&
        hitY + hitboxH > player.y;

      const colisionaAliado = aliadoObjetivo
        ? (
          hitX < aliadoObjetivo.x + aliadoObjetivo.w &&
          hitX + hitboxW > aliadoObjetivo.x &&
          hitY < aliadoObjetivo.y + aliadoObjetivo.h &&
          hitY + hitboxH > aliadoObjetivo.y
        )
        : false;

      if (colisionaJugador || colisionaAliado) {
        const danio = Number(d.danio ?? 0) || 0;

        if (colisionaAliado && !colisionaJugador) {
          if (typeof window.enyDamageAliado === "function") {
            window.enyDamageAliado(danio);
          }
        } else {
          pdv -= danio;
          if (pdv < 0) pdv = 0;

          crearTextoDanio(
            player.x + 32,
            player.y - 10,
            "-" + danio,
            "#ff3b3b",
            "#ff0000"
          );

          player.blinkTimer = 300;

          if (pdv <= 0 && !gameOverActive) {
            activarGameOver();
          }
        }

        window.disparosEnemigosArmadosActivos.splice(i, 1);
        continue;
      }

      if (
        d.vida <= 0 ||
        d.x < -100 ||
        d.y < -100 ||
        d.x > WORLD_W + 100 ||
        d.y > WORLD_H + 100
      ) {
        window.disparosEnemigosArmadosActivos.splice(i, 1);
      }
    }
  }

  function drawDisparosEnemigosArmados(ctx) {
    for (const d of (window.disparosEnemigosArmadosActivos || [])) {
      const len = Math.hypot(d.vx, d.vy) || 1;
      const ux = d.vx / len;
      const uy = d.vy / len;

      const x1 = d.x - ux * (d.largo / 2);
      const y1 = d.y - uy * (d.largo / 2);
      const x2 = d.x + ux * (d.largo / 2);
      const y2 = d.y + uy * (d.largo / 2);

      ctx.save();

      ctx.strokeStyle = "#ff1a1a";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 16;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.strokeStyle = "#ffd6d6";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.restore();
    }
  }

  //--Lamzar disparos lazer
  function lanzarDisparoLazer(itemData) {
    const velocidad = 14;
    const largo = 34;

    let vx = 0;
    let vy = 0;

    if (player.facing === "up") vy = -velocidad;
    if (player.facing === "down") vy = velocidad;
    if (player.facing === "left") vx = -velocidad;
    if (player.facing === "right") vx = velocidad;

    window.disparosLazerActivos.push({
      x: player.x + 32,
      y: player.y + 32,
      vx,
      vy,
      largo,
      vida: 260,
      danio: Number(itemData?.cuanto_quita_de_vida_al_enemigo ?? 0) || 0,
      facing: player.facing
    });
  }

  window.lanzarDisparoLazer = lanzarDisparoLazer;

  function updateDisparosLazer(dtMs) {
    for (let i = window.disparosLazerActivos.length - 1; i >= 0; i--) {
      const d = window.disparosLazerActivos[i];

      d.x += d.vx;
      d.y += d.vy;
      d.vida -= dtMs;

      const lazerHitW = d.facing === "left" || d.facing === "right" ? d.largo : 10;
      const lazerHitH = d.facing === "up" || d.facing === "down" ? d.largo : 10;

      if (danarBloqueArcillaEnRect(
        d.x - lazerHitW / 2,
        d.y - lazerHitH / 2,
        lazerHitW,
        lazerHitH,
        Number(d.danio ?? 1) || 1,
        d.x,
        d.y
      )) {
        window.disparosLazerActivos.splice(i, 1);
        continue;
      }

      if (proyectilColisionaAmbiente(d.x - lazerHitW / 2, d.y - lazerHitH / 2, lazerHitW, lazerHitH)) {
        crearChispasImpactoBloque(d.x, d.y, "#eaff00");
        window.disparosLazerActivos.splice(i, 1);
        continue;
      }

      let impacto = false;

      for (let j = 0; j < (window.enemigos || []).length; j++) {
        const enemy = window.enemigos[j];
        if (!enemy) continue;

        const hitboxW = d.facing === "left" || d.facing === "right" ? d.largo : 10;
        const hitboxH = d.facing === "up" || d.facing === "down" ? d.largo : 10;

        const hitX = d.x - hitboxW / 2;
        const hitY = d.y - hitboxH / 2;

        const colisiona =
          hitX < enemy.x + enemy.w &&
          hitX + hitboxW > enemy.x &&
          hitY < enemy.y + enemy.h &&
          hitY + hitboxH > enemy.y;

        if (!colisiona) continue;

        const danio = Number(d.danio ?? 0) || 0;
        enemy.puntos_de_vida = Math.max(0, (enemy.puntos_de_vida || 0) - danio);

        crearTextoDanio(
          enemy.x + enemy.w / 2,
          enemy.y - 10,
          "-" + danio,
          "#eaff00",
          "#eaff00"
        );

        const len = Math.hypot(d.vx, d.vy) || 1;
        const push = 32;
        const pushX = (d.vx / len) * push;
        const pushY = (d.vy / len) * push;

        empujarEnemigoConColision(enemy, pushX, pushY);

        if (enemy.puntos_de_vida <= 0) {
          eliminarEnemigoPorDerrota(enemy);
        }

        impacto = true;
        break;
      }

      if (
        impacto ||
        d.vida <= 0 ||
        d.x < -100 ||
        d.y < -100 ||
        d.x > WORLD_W + 100 ||
        d.y > WORLD_H + 100
      ) {
        window.disparosLazerActivos.splice(i, 1);
      }
    }
  }

  function drawDisparosLazer(ctx) {
    for (const d of (window.disparosLazerActivos || [])) {
      ctx.save();

      ctx.strokeStyle = window.lazerColor;
      ctx.lineWidth = 4;
      ctx.shadowColor = window.lazerColor;
      ctx.shadowBlur = 14;
      ctx.lineCap = "round";

      ctx.beginPath();

      if (d.facing === "right") {
        ctx.moveTo(d.x - d.largo / 2, d.y);
        ctx.lineTo(d.x + d.largo / 2, d.y);
      } else if (d.facing === "left") {
        ctx.moveTo(d.x + d.largo / 2, d.y);
        ctx.lineTo(d.x - d.largo / 2, d.y);
      } else if (d.facing === "up") {
        ctx.moveTo(d.x, d.y + d.largo / 2);
        ctx.lineTo(d.x, d.y - d.largo / 2);
      } else {
        ctx.moveTo(d.x, d.y - d.largo / 2);
        ctx.lineTo(d.x, d.y + d.largo / 2);
      }

      ctx.stroke();

      ctx.strokeStyle = "#fffed6";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      if (d.facing === "right") {
        ctx.moveTo(d.x - d.largo / 2, d.y);
        ctx.lineTo(d.x + d.largo / 2, d.y);
      } else if (d.facing === "left") {
        ctx.moveTo(d.x + d.largo / 2, d.y);
        ctx.lineTo(d.x - d.largo / 2, d.y);
      } else if (d.facing === "up") {
        ctx.moveTo(d.x, d.y + d.largo / 2);
        ctx.lineTo(d.x, d.y - d.largo / 2);
      } else {
        ctx.moveTo(d.x, d.y - d.largo / 2);
        ctx.lineTo(d.x, d.y + d.largo / 2);
      }

      ctx.stroke();

      ctx.restore();
    }
  }

  //--Funciones bumerang
  function lanzarBumerang(itemData) {
    const velocidad = 6;
    const size = 14;

    let vx = 0;
    let vy = 0;

    if (player.facing === "up") vy = -velocidad;
    if (player.facing === "down") vy = velocidad;
    if (player.facing === "left") vx = -velocidad;
    if (player.facing === "right") vx = velocidad;

    const nuevoBumerang = {
      x: player.x + 32,
      y: player.y + 32,
      vx,
      vy,
      angulo: 0,
      size,
      vida: 1200,
      danio: Number(itemData?.cuanto_quita_de_vida_al_enemigo ?? 0) || 0,
      audio: playbumerangSound()
    };

    window.bumerangsActivos.push(nuevoBumerang);

    for (let i = 0; i < 8; i++) {
      window.particulasBumerang.push({
        x: nuevoBumerang.x - vx * 0.6,
        y: nuevoBumerang.y - vy * 0.6,
        vx: (-vx * 0.05) + (Math.random() - 0.5) * 1.2,
        vy: (-vy * 0.05) + (Math.random() - 0.5) * 1.2,
        size: 2.5 + Math.random() * 2.5,
        life: 160 + Math.random() * 80,
        maxLife: 240,
        color: Math.random() < 0.5 ? "#8b5a2b" : "#c08a52",
        esRayo: false
      });
    }

    for (let i = 0; i < 3; i++) {
      window.particulasBumerang.push({
        x: nuevoBumerang.x - vx,
        y: nuevoBumerang.y - vy,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 8 + Math.random() * 4,
        life: 80 + Math.random() * 40,
        maxLife: 120,
        color: "#ffd38a",
        esRayo: true
      });
    }
  }

  window.lanzarBumerang = lanzarBumerang;

  function crearParticulasBumerang(b) {
    for (let i = 0; i < 3; i++) {
      window.particulasBumerang.push({
        x: b.x,
        y: b.y,
        vx: (-b.vx * 0.08) + (Math.random() - 0.5) * 0.9,
        vy: (-b.vy * 0.08) + (Math.random() - 0.5) * 0.9,
        size: 2 + Math.random() * 2,
        life: 100 + Math.random() * 60,
        maxLife: 160,
        color: Math.random() < 0.5 ? "#8b5a2b" : "#c08a52",
        esRayo: false
      });
    }

    if (Math.random() < 0.45) {
      window.particulasBumerang.push({
        x: b.x - b.vx * 0.35,
        y: b.y - b.vy * 0.35,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 6 + Math.random() * 3,
        life: 50 + Math.random() * 30,
        maxLife: 90,
        color: "#ffe2a8",
        esRayo: true
      });
    }
  }

  function updateBumerangs(dtMs) {
    for (let i = window.bumerangsActivos.length - 1; i >= 0; i--) {
      const b = window.bumerangsActivos[i];

      b.x += b.vx;
      b.y += b.vy;
      b.angulo += 0.55;
      b.vida -= dtMs;

      if (danarBloqueArcillaEnRect(
        b.x - b.size,
        b.y - b.size,
        b.size * 2,
        b.size * 2,
        Number(b.danio ?? 1) || 1,
        b.x,
        b.y
      )) {
        if (b.audio) {
          b.audio.pause();
          b.audio.currentTime = 0;
          b.audio = null;
        }

        window.bumerangsActivos.splice(i, 1);
        continue;
      }

      if (proyectilColisionaAmbiente(b.x - b.size, b.y - b.size, b.size * 2, b.size * 2)) {
        crearChispasImpactoBloque(b.x, b.y, "#ffb347");

        if (b.audio) {
          b.audio.pause();
          b.audio.currentTime = 0;
          b.audio = null;
        }

        window.bumerangsActivos.splice(i, 1);
        continue;
      }

      crearParticulasBumerang(b);

      let impacto = false;

      for (let j = 0; j < (window.enemigos || []).length; j++) {
        const enemy = window.enemigos[j];
        if (!enemy) continue;
        if ((enemy.puntos_de_vida ?? 0) <= 0) continue;

        const colisiona =
          b.x - b.size < enemy.x + enemy.w &&
          b.x + b.size > enemy.x &&
          b.y - b.size < enemy.y + enemy.h &&
          b.y + b.size > enemy.y;

        if (!colisiona) continue;

        const danio = Number(b.danio ?? 0) || 0;
        enemy.puntos_de_vida = Math.max(0, (enemy.puntos_de_vida || 0) - danio);

        crearTextoDanio(
          enemy.x + enemy.w / 2,
          enemy.y - 10,
          "-" + danio,
          "#ffb347",
          "#ff7b00"
        );

        if (enemy.puntos_de_vida <= 0) {
          eliminarEnemigoPorDerrota(enemy);
          impacto = true;
          break;
        }

        const len = Math.hypot(b.vx, b.vy) || 1;
        const push = 32;
        const pushX = (b.vx / len) * push;
        const pushY = (b.vy / len) * push;

        empujarEnemigoConColision(enemy, pushX, pushY);

        enemy.cooldownDano = 250;

        impacto = true;
        break;
      }

      if (
        impacto ||
        b.x < -100 ||
        b.y < -100 ||
        b.x > WORLD_W + 100 ||
        b.y > WORLD_H + 100 ||
        b.vida <= 0
      ) {
        if (b.audio) {
          b.audio.pause();
          b.audio.currentTime = 0;
          b.audio = null;
        }

        window.bumerangsActivos.splice(i, 1);
      }
    }
  }

  function eliminarEnemigoPorDerrota(enemy) {
    if (!enemy) return;

    crearExplosionBumerang(
      enemy.x + enemy.w / 2,
      enemy.y + enemy.h / 2
    );

    if (enemy.ejecucion_script && enemy.ejecucion_script.al_morir) {
      const script = enemy.ejecucion_script.al_morir;
      soltarItemPorMuerte(enemy);
      if (typeof window[script] === "function") {
        window[script](enemy);
      }
    }

    const index = window.enemigos.indexOf(enemy);
    if (index !== -1) {
      window.enemigos.splice(index, 1);
    }
  }

  window._enyKillEnemyWithEffects = eliminarEnemigoPorDerrota;

  function crearExplosionBumerang(x, y) {

    for (let i = 0; i < 20; i++) {
      window.particulasBumerang.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 3 + Math.random() * 3,
        life: 500,
        maxLife: 500,
        //color: Math.random() < 0.5 ? "#c08a52" : "#ffd38a", //Color de exploción del enemigo
        color: Math.random() < 0.5 ? "#00ffcc" : "#39ff14",
        esRayo: false
      });
    }

    for (let i = 0; i < 6; i++) {
      window.particulasBumerang.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 8 + Math.random() * 6,
        life: 250,
        maxLife: 250,
        color: "#ffe2a8",
        esRayo: true
      });
    }

  }

  function updateParticulasBumerang(dtMs) {
    for (let i = window.particulasBumerang.length - 1; i >= 0; i--) {
      const p = window.particulasBumerang[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.985;
      p.vy *= 0.985;

      if (p.esRayo) {
        p.size *= 0.93;
      } else {
        p.size *= 0.975;
      }

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasBumerang.splice(i, 1);
      }
    }
  }

  function drawParticulasBumerang(ctx) {
    for (const p of (window.particulasBumerang || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;

      if (p.esRayo) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(1.2, p.size * 0.28);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.moveTo(p.x - p.size, p.y - p.size * 0.22);
        ctx.lineTo(p.x + p.size, p.y + p.size * 0.22);
        ctx.stroke();
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#ffd38a";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff3d6";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.42, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function update(dtMs) {

    if (gameOverActive) {
      held.length = 0;
      player.walking = false;
      return;
    }
    //pdv = Math.max(0, pdv - dtMs * 0.001); // prueba: baja 1 PDV por segundo
    const dir = held[0];
    player.walking = !!dir;

    if (dir) {
      player.facing = dir;
      const d = dirs[dir];
      let delta = dtMs / 8;

      const patinesEquipados = window.equipSlots?.find(i => i && i.id === "patines");

      if (patinesEquipados) {
        delta *= 2;

        if (player.walking && Math.random() < 0.55) {
          crearParticulaPatin();
        }
      }

      const nextX = player.x + d.x * player.speed * delta;
      const nextY = player.y + d.y * player.speed * delta;

      const hitX = colisionAmbiente(
        nextX + PLAYER_OFFSET_X,
        player.y + PLAYER_OFFSET_Y,
        PLAYER_HIT_W,
        PLAYER_HIT_H
      );

      if (!hitX) {
        player.x = nextX;
      }

      const hitY = colisionAmbiente(
        player.x + PLAYER_OFFSET_X,
        nextY + PLAYER_OFFSET_Y,
        PLAYER_HIT_W,
        PLAYER_HIT_H
      );

      if (!hitY) {
        player.y = nextY;
      }
    }

    // límites del mundo completo (5000x5000)
    const leftLimit = 0;
    const topLimit = 0;
    const rightLimit = WORLD_W - HERO_W;   // o HERO_DRAW_W si ese es el tamaño real que ocupa
    const bottomLimit = WORLD_H - HERO_H;

    player.x = clamp(player.x, leftLimit, rightLimit);
    player.y = clamp(player.y, topLimit, bottomLimit);

    camera.x = player.x + HERO_W / 2 - camera.w / 2;
    camera.y = player.y + HERO_H / 2 - camera.h / 2;

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
    const equipSlotsLimpiados = limpiarEquipSlotsAgotados();

    if (equipSlotsLimpiados) {
      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
      }
    }

    updateNPCsAmbiente(dtMs);
    updateEnemigos(dtMs);
    updateAtaquesEspecialesJefe(dtMs);
    updateParticulasVolcanJefe(dtMs);
    updateSkateParticles(dtMs);

    updateIlumSistemaMapa(dtMs);
    limpiarCacheImagenesAmbiente();
    limpiarCacheAudioAmbiente();

    //--lógica de fuego y de antorcha, he iluminación de mapas oscuros (inicio)
    if (antorchaActiva.active) {
      antorchaActiva.timer -= dtMs;

      if (player.walking && Math.random() < 0.4) {
        crearParticulaAntorchaRastro();
      }

      if (antorchaActiva.timer <= 0) {
        window.apagarAntorcha(true);
      }
    }

    updateTorchTrailParticles(dtMs);
    //--lógica de fuego y de antorcha, he iluminación de mapas oscuros (fin)

    if (shieldEffect.timer > 0) {
      shieldEffect.timer -= dtMs;
      if (shieldEffect.timer < 0) shieldEffect.timer = 0;
    }

    if (shieldEffect.particles.length > 0) {
      for (let i = shieldEffect.particles.length - 1; i >= 0; i--) {
        const p = shieldEffect.particles[i];
        p.life -= dtMs;
        p.radius += p.drift;

        if (p.life <= 0) {
          shieldEffect.particles.splice(i, 1);
        }
      }
    }

    if (shieldEffect.timer <= 0 && shieldEffect.particles.length === 0) {
      shieldEffect.active = false;
      shieldEffect.type = null;
    }

    for (const npc of npcs) {

      algoritmoValiente(npc, dtMs);

      if (npc.bubbleTimer > 0) {
        npc.bubbleTimer -= dtMs;
      }

    }

    if (player.blinkTimer > 0) {
      player.blinkTimer -= dtMs;
      if (player.blinkTimer < 0) player.blinkTimer = 0;
    }

    updateBumerangs(dtMs);
    updateParticulasBumerang(dtMs);
    updateParticulasImpactoBloque(dtMs);
    updateDisparosLazer(dtMs);

    updateAtaquesEspadaMadera(dtMs);
    updateParticulasEspadaMadera(dtMs);

    updateAtaquesEspadaHierro(dtMs);
    updateParticulasEspadaHierro(dtMs);

    updateAtaquesPicoEscabador(dtMs);
    updateParticulasPicoEscabador(dtMs);

    updateDisparosEnemigosArmados(dtMs);

    updateParticulasArcilla(dtMs);

    limpiarAntorchasDeBloquesRotos();
  }

  /*----------------------------lógica jostic control para movile(Inicio)-------------------------------------- */
  // =============================
  // Joystick móvil (usa el mismo held[] que update)
  // =============================
  let joyActive = false;
  let joyPointerId = null;
  let joyCenterX = 0;
  let joyCenterY = 0;

  const JOY_RADIUS = 36;      // qué tanto se mueve la palanca
  const JOY_DEADZONE = 10;    // zona muerta para no temblar

  function setHeldDir(dir) {
    held.length = 0;
    if (dir) held.push(dir);
  }

  function resetJoy() {
    joyActive = false;
    joyPointerId = null;
    joyStick.style.transform = "translate(0px, 0px)";
    setHeldDir(null);
  }

  function joyDirFromVector(dx, dy) {
    // deadzone
    if (Math.hypot(dx, dy) < JOY_DEADZONE) return null;

    // elegimos la dirección dominante
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left";
    } else {
      return dy > 0 ? "down" : "up";
    }
  }

  joy.addEventListener("pointerdown", (e) => {
    // opcional: solo cuando ya está jugando
    if (gameMode !== "playing") return;

    joyActive = true;
    joyPointerId = e.pointerId;
    joy.setPointerCapture(e.pointerId);

    const rect = joy.getBoundingClientRect();
    joyCenterX = rect.left + rect.width / 2;
    joyCenterY = rect.top + rect.height / 2;

    e.preventDefault();
  });

  joy.addEventListener("pointermove", (e) => {
    if (!joyActive || e.pointerId !== joyPointerId) return;

    const dx0 = e.clientX - joyCenterX;
    const dy0 = e.clientY - joyCenterY;

    // clamp al radio
    const dist = Math.hypot(dx0, dy0);
    const scaleClamp = dist > JOY_RADIUS ? (JOY_RADIUS / dist) : 1;

    const dx = dx0 * scaleClamp;
    const dy = dy0 * scaleClamp;

    joyStick.style.transform = `translate(${dx}px, ${dy}px)`;

    const dir = joyDirFromVector(dx0, dy0);
    setHeldDir(dir);

    e.preventDefault();
  });

  joy.addEventListener("pointerup", (e) => {
    if (e.pointerId !== joyPointerId) return;
    resetJoy();
    e.preventDefault();
  });

  joy.addEventListener("pointercancel", (e) => {
    if (e.pointerId !== joyPointerId) return;
    resetJoy();
    e.preventDefault();
  });

  // seguridad: si suelta fuera del joystick
  window.addEventListener("pointerup", () => {
    if (joyActive) resetJoy();
  });
  /*----------------------------lógica jostic control para movile(fin)-------------------------------------- */


  // =======================================================
  /*Lógica de eventos del canvas */
  // =======================================================

  canvas.addEventListener("pointerdown", (e) => {
    if (gameMode !== "playing") return;
    if (npcDialogOpen) return;

    const npc = getNPCAtCanvasPosition(e.clientX, e.clientY);
    if (!npc) return;
    if (!isPlayerNearNPC(npc)) return;

    e.preventDefault();
    e.stopPropagation();
    openNPCDialog(npc);
  }, { capture: true, passive: false });

  canvas.addEventListener("click", (e) => {
    if (gameMode !== "playing") return;
    if (npcDialogOpen) return;

    const npc = getNPCAtCanvasPosition(e.clientX, e.clientY);
    if (!npc) return;
    if (!isPlayerNearNPC(npc)) return;

    e.preventDefault();
    e.stopPropagation();
    openNPCDialog(npc);
  }, true);

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
        playUISound();
        selectedGender = "male";
        checkingStep = "avatar";
        return;
      }

      if (femaleHit) {
        playUISound();
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
          playUISound();
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
        playUISound();
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
          playUISound();
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
        playUISound();
        professionIndex = (professionIndex - 1 + professions.length) % professions.length;
        professionScroll = 0;
        return;
      }

      if (clickedRight) {
        playUISound();
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
        playUISound();
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
        playUISound();
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
    const leftX = boxX + PROF_BOX.btnPad;
    const leftY = boxY + boxH + PROF_BOX.btnPad;
    const rightX = boxX + boxW - btnSize - PROF_BOX.btnPad;
    const rightY = leftY;

    return {
      boxX, boxY, boxW, boxH,
      btnSize, leftX, leftY, rightX, rightY
    };
  }

  /*Variables de Botones laterales para selector de profesión (fin) */

  // =======================================================================================
  // Lógica de items/consumibles/armas (inicio)
  // =======================================================================================
  let itemsData = [];

  window.itemsData = itemsData;
  let items = [];// Prueba de items

  //Items escondidos en mapa
  let itemsEnMapaConfig = [
    {
      "instancia_id": "itm_mapa_01",
      "item_id": "corazon",
      "x": 1059,
      "y": 3932
    },
    {
      "instancia_id": "itm_mapa_02",
      "item_id": "pistola_lazer",
      "x": 16,
      "y": 4053
    },
    {
      "instancia_id": "itm_mapa_03",
      "item_id": "sal",
      "x": 1082,
      "y": 1109
    },
    {
      "instancia_id": "itm_mapa_04",
      "item_id": "limon",
      "x": 1116,
      "y": 1109
    },
    {
      "instancia_id": "itm_mapa_05",
      "item_id": "baso",
      "x": 1149,
      "y": 1109
    },
    {
      "instancia_id": "itm_mapa_06",
      "item_id": "plastico",
      "x": 3724,
      "y": 2280
    },
    {
      "instancia_id": "itm_mapa_07",
      "item_id": "plastico",
      "x": 3518,
      "y": 2223
    },
    {
      "instancia_id": "itm_mapa_09",
      "item_id": "plastico",
      "x": 3329,
      "y": 2234
    },
    {
      "instancia_id": "itm_mapa_10",
      "item_id": "plastico",
      "x": 2962,
      "y": 1905
    },
    {
      "instancia_id": "itm_mapa_12",
      "item_id": "plastico",
      "x": 4552,
      "y": 1431
    },
    {
      "instancia_id": "itm_mapa_13",
      "item_id": "plastico",
      "x": 4410,
      "y": 2398
    },
    {
      "instancia_id": "itm_mapa_14",
      "item_id": "plastico",
      "x": 4847,
      "y": 2687
    },
    {
      "instancia_id": "itm_mapa_15",
      "item_id": "plastico",
      "x": 1852,
      "y": 1926
    },
    {
      "instancia_id": "itm_mapa_16",
      "item_id": "plastico",
      "x": 1514,
      "y": 2097
    },
    {
      "instancia_id": "itm_mapa_18",
      "item_id": "plastico",
      "x": 3662,
      "y": 605
    },
    {
      "instancia_id": "itm_mapa_19",
      "item_id": "plastico",
      "x": 4488,
      "y": 436
    },
    {
      "instancia_id": "itm_mapa_20",
      "item_id": "plastico",
      "x": 1624,
      "y": 478
    },
    {
      "instancia_id": "itm_mapa_21",
      "item_id": "plastico",
      "x": 2208,
      "y": 559
    },
    {
      "instancia_id": "itm_mapa_22",
      "item_id": "plastico",
      "x": 1102,
      "y": 338
    },
    {
      "instancia_id": "itm_mapa_23",
      "item_id": "plastico",
      "x": 2828,
      "y": 1365
    },
    {
      "instancia_id": "itm_mapa_24",
      "item_id": "plastico",
      "x": 2889,
      "y": 981
    },
    {
      "instancia_id": "itm_mapa_27",
      "item_id": "plastico",
      "x": 3655,
      "y": 3820
    },
    {
      "instancia_id": "itm_mapa_28",
      "item_id": "plastico",
      "x": 77,
      "y": 685
    }
  ];

  function cargarItemsEnMapa(opciones = {}) {
    const { excluirInstanciaId = null, limpiarAntes = false } = opciones;

    if (!window.itemsData || !Array.isArray(window.itemsData)) return;
    if (!Array.isArray(items)) return;

    if (limpiarAntes) {
      items.length = 0;
    }

    for (let i = 0; i < itemsEnMapaConfig.length; i++) {
      const config = itemsEnMapaConfig[i];
      const instanciaId = config.instancia_id || `map_item_${i}`;

      if (excluirInstanciaId && instanciaId === excluirInstanciaId) continue;

      const yaExiste = items.some(it => it && it.instancia_id === instanciaId);
      if (yaExiste) continue;

      const baseItem = window.itemsData.find(i => i.id === config.item_id);
      if (!baseItem) {
        console.warn("Item no encontrado en JSON:", config.item_id);
        continue;
      }

      const img = new Image();
      img.onload = () => { };
      img.onerror = () => {
        console.warn("No cargó la imagen del item:", baseItem.imagen);
      };
      img.src = baseItem.imagen;

      items.push({
        ...baseItem,
        instancia_id: instanciaId,
        x: config.x,
        y: config.y,
        img: img,
        size: 32
      });
    }
  }

  window.inventarioUser = []; //Sincronizar con base de datos wordpress


  let hoveredItem = null;

  let hoveredCanvasInteractive = null;

  function getCanvasPointerInfo(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();

    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;

    const worldX = (screenX / scale) + camera.x;
    const worldY = (screenY / scale) + camera.y;

    return { screenX, screenY, worldX, worldY };
  }

  function getHoveredCanvasInteractive(clientX, clientY) {
    const { screenX, screenY, worldX, worldY } = getCanvasPointerInfo(clientX, clientY);

    const hudHitboxes = window.hudEquipHitboxes || [];
    for (const hb of hudHitboxes) {
      if (
        screenX >= hb.x &&
        screenX <= hb.x + hb.w &&
        screenY >= hb.y &&
        screenY <= hb.y + hb.h
      ) {
        return {
          tipo: "hud-equip",
          x: hb.x,
          y: hb.y,
          w: hb.w,
          h: hb.h
        };
      }
    }

    for (const obj of (ambienteObjetos || [])) {
      if (!obj) continue;
      if (!String(obj.tipo || "").includes("cliqueable")) continue;

      if (
        worldX >= obj.x &&
        worldX <= obj.x + obj.w &&
        worldY >= obj.y &&
        worldY <= obj.y + obj.h
      ) {
        return {
          tipo: "world-cliqueable",
          x: obj.x,
          y: obj.y,
          w: obj.w,
          h: obj.h
        };
      }
    }

    return null;
  }

  function drawHoverCanvasInteractive(ctx, timeNow = performance.now()) {
    if (!hoveredCanvasInteractive) return;

    const pulse = 0.55 + ((Math.sin(timeNow * 0.008) + 1) * 0.225);

    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 14;

    if (hoveredCanvasInteractive.tipo === "hud-equip") {
      ctx.restore();

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = pulse;
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#00ffcc";
      ctx.shadowBlur = 14;

      ctx.strokeRect(
        hoveredCanvasInteractive.x - 2,
        hoveredCanvasInteractive.y - 2,
        hoveredCanvasInteractive.w + 4,
        hoveredCanvasInteractive.h + 4
      );

      ctx.restore();
      return;
    }

    ctx.strokeRect(
      hoveredCanvasInteractive.x - 2,
      hoveredCanvasInteractive.y - 2,
      hoveredCanvasInteractive.w + 4,
      hoveredCanvasInteractive.h + 4
    );

    ctx.restore();
  }

  /*// 🔧 Items de prueba para el inventario*/
  window.inventarioUser.push({
    id: "antorcha_de_fuego",
    nombre_item: "Antorcha de fuego",
    tipo_item: "consumible",
    imagen: "../assets/items/antorcha.svg",
    agotable: true,
    desaparece_al_agotarse: true,
    cantidad: 13,
    usos: 1,
    usos_maximos: 1
  });

  window.inventarioUser.push({
    id: "bloque_de_arcilla",
    nombre_item: "Bloque de arcilla",
    tipo_item: "consumible",
    imagen: "../assets/items/bloqueArcilla.svg",
    agotable: true,
    desaparece_al_agotarse: true,
    cantidad: 25,
    usos: 1,
    usos_maximos: 1
  });

  window.inventarioUser.push({
    id: "pistola_lazer",
    nombre_item: "Pistola lazer",
    tipo_item: "arma",
    imagen: "../assets/items/pistolaLazer.svg",
    agotable: true,
    desaparece_al_agotarse: true,
    cantidad: 1,
    usos: 58,
    usos_maximos: 58,
    cuanto_quita_de_vida_al_enemigo: 15
  });


  async function cargarItemsJSON() {

    const res = await fetch("../items.json");
    const data = await res.json();

    itemsData = data.items;

    window.itemsData = itemsData;
    cargarItemsEnMapa();
  }

  //AL MATAR JEFES SE LLAMA LA FUNCIÓN NUEVA DE pruebaDeItems() PARA DESPLEGAR ITEMS MENOS ESPADA, Y ESCUDO DE HIERRO.

  function dropItemsJefe(enemy) {
    //console.log("💀 Jefe derrotado → generando items");
    playjefederrotaSound()
    pruebaDeItems();
  }

  window.dropItemsJefe = dropItemsJefe;

  window.pruebaDeItems = pruebaDeItems;
  //llamar al matar jefe o abrir cofres
  function pruebaDeItems() {

    if (!window.itemsData || itemsData.length === 0) return;

    const radius = 300;

    // ❌ EXCLUIR ITEMS NO DESEADOS
    const itemsFiltrados = itemsData.filter(item =>
      item.id !== "espada_de_hierro" &&
      item.id !== "escudo_de_hierro" &&
      item.id !== "patines"
    );

    for (let i = 0; i < 10; i++) {

      const randomItem = itemsFiltrados[Math.floor(Math.random() * itemsFiltrados.length)];

      if (!randomItem) continue;

      const img = new Image();
      img.onload = () => { };
      img.onerror = () => {
        console.warn("No cargó la imagen del item:", randomItem.imagen);
      };
      img.src = randomItem.imagen;

      const offsetX = (Math.random() - 0.5) * radius;
      const offsetY = (Math.random() - 0.5) * radius;

      items.push({
        ...randomItem,
        x: player.x + offsetX,
        y: player.y + offsetY,
        img: img,
        size: 32
      });

    }

  }

  function soltarItemPorMuerte(enemy) {
    playenemyderrotaSound();
    if (!itemsData || itemsData.length === 0) return;

    const random = Math.random();

    let itemElegido = null;

    if (random <= 0.60) {
      itemElegido = itemsData.find(i => i.id === "cuero");
    } else if (random <= 0.90) {
      itemElegido = itemsData.find(i => i.id === "diodo_laser");
    } else if (random <= 0.95) {
      itemElegido = itemsData.find(i => i.id === "pistola_laser");
    }

    if (!itemElegido) return;

    const img = new Image();
    img.onload = () => { };
    img.onerror = () => {
      console.warn("No cargó la imagen del item:", itemElegido.imagen);
    };
    img.src = itemElegido.imagen;

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;

    items.push({
      ...itemElegido,
      x: enemy.x + offsetX,
      y: enemy.y + offsetY,
      img: img,
      size: 32
    });
  }

  //función para dibujar items

  function drawItems(ctx) {
    for (const item of items) {
      if (!item) continue;
      if (!rectIntersectsCamera(item.x, item.y, item.size, item.size)) continue;

      const imgOk =
        item.img &&
        item.img.complete &&
        item.img.naturalWidth > 0 &&
        item.img.naturalHeight > 0;

      if (imgOk) {
        drawEntityShadow(ctx, images.shadow, item.x, item.y, item.size, item.size, {
          scaleW: 0.56,
          scaleH: 0.18,
          offsetY: 0.88,
          alpha: 0.22
        });

        ctx.drawImage(item.img, item.x, item.y, item.size, item.size);
      } else {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(item.x, item.y, item.size, item.size);
      }

      if (item === hoveredItem) {
        const label = item.nombre_item || item.id || "item";

        ctx.fillStyle = "transparent";
        ctx.fillRect(item.x - 4, item.y - 20, 120, 16);

        ctx.fillStyle = "white";
        ctx.font = "12px arcade";
        ctx.textAlign = "left";
        ctx.fillText(label, item.x, item.y - 8);
      }
    }
  }

  function agregarItemAlInventario(nuevoItem) {
    playtockSound();
    const MAX_SLOTS = 16;
    const MAX_STACK = 25;

    if (!nuevoItem) return false;

    const nuevoId = nuevoItem.id ?? nuevoItem.item_id;
    const esBloqueArcilla = nuevoId === "bloque_de_arcilla";

    const nuevoEsAgotable = nuevoItem.agotable === true;
    const nuevoUsos = nuevoItem.usos ?? nuevoItem.cantidad_de_usos ?? null;
    const nuevoUsosMaximos = nuevoItem.usos_maximos ?? nuevoItem.cantidad_de_usos ?? null;
    const nuevaCantidad = Number(nuevoItem.cantidad || 1) || 1;

    for (const slot of window.inventarioUser) {
      if (!slot) continue;

      const slotId = slot.id ?? slot.item_id;
      const slotEsAgotable = slot.agotable === true;
      const slotUsos = slot.usos ?? slot.cantidad_de_usos ?? null;
      const slotUsosMaximos = slot.usos_maximos ?? slot.cantidad_de_usos ?? null;

      const mismoItem = slotId === nuevoId;

      let mismoEstadoDeUso = (
        !nuevoEsAgotable ||
        (
          slotEsAgotable === nuevoEsAgotable &&
          slotUsos === nuevoUsos &&
          slotUsosMaximos === nuevoUsosMaximos
        )
      );

      // bloque de arcilla siempre debe apilar por ID
      if (esBloqueArcilla) {
        mismoEstadoDeUso = true;
      }

      if (mismoItem && mismoEstadoDeUso) {
        if (!slot.cantidad) slot.cantidad = 1;

        if (slot.cantidad < MAX_STACK) {
          const espacio = MAX_STACK - slot.cantidad;
          const aSumar = Math.min(espacio, nuevaCantidad);

          slot.cantidad += aSumar;

          // si el item guarda usos por cantidad, los reseteamos para que no parta stacks
          if (esBloqueArcilla) {
            slot.usos = null;
            slot.usos_maximos = null;
          }

          const restante = nuevaCantidad - aSumar;

          if (restante <= 0) {
            const activeMissionId = window.missionSystem?.activeMissionId;

            if (activeMissionId && typeof validarPasoRecolectarItems === "function") {
              validarPasoRecolectarItems(activeMissionId);
            }

            return true;
          }

          nuevoItem = {
            ...nuevoItem,
            cantidad: restante
          };
        }
      }
    }

    if (window.inventarioUser.length >= MAX_SLOTS) {
      return false;
    }

    window.inventarioUser.push({
      ...nuevoItem,
      id: nuevoId,
      item_id: nuevoItem.item_id ?? nuevoId,
      cantidad: Number(nuevoItem.cantidad || 1) || 1,
      agotable: nuevoEsAgotable,
      desaparece_al_agotarse: nuevoItem.desaparece_al_agotarse === true,
      usos: esBloqueArcilla ? null : nuevoUsos,
      usos_maximos: esBloqueArcilla ? null : nuevoUsosMaximos,
      cuanto_quita_de_vida_al_enemigo: Number(nuevoItem.cuanto_quita_de_vida_al_enemigo ?? 0) || 0,
    });

    const activeMissionId = window.missionSystem?.activeMissionId;
    if (activeMissionId) {
      validarPasoRecolectarItems(activeMissionId);
    }

    return true;
  }

  window.agregarItemAlInventario = agregarItemAlInventario;

  function normalizarInventario() {
    window.inventarioUser = window.inventarioUser.filter(Boolean);
  }

  function destruirItemDelInventario(slotIndex) {
    const item = window.inventarioUser[slotIndex];
    if (!item) return;

    playUISound();

    window.inventarioUser.splice(slotIndex, 1);
    normalizarInventario();
    closeInventarioPopup();

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  }


  function agregarItemACombinacionDesdeInventario(slotIndex) {
    const item = window.inventarioUser[slotIndex];
    if (!item) return;

    playtockSound();

    const scrollInventario = getInventarioScrollState();

    const slotMismoItem = combinacionSlots.findIndex(
      s =>
        s &&
        s.id === item.id &&
        (s.usos ?? s.usos_restantes ?? null) === (item.usos ?? item.usos_restantes ?? null) &&
        (s.usos_maximos ?? null) === (item.usos_maximos ?? null)
    );

    if (slotMismoItem !== -1) {
      combinacionSlots[slotMismoItem].cantidad =
        (combinacionSlots[slotMismoItem].cantidad || 1) + 1;
    } else {
      const slotLibre = combinacionSlots.findIndex(s => s === null);
      if (slotLibre === -1) {
        return;
      }

      combinacionSlots[slotLibre] = {
        ...item,
        cantidad: 1
      };
    }

    if ((item.cantidad || 1) > 1) {
      item.cantidad -= 1;
    } else {
      window.inventarioUser.splice(slotIndex, 1);
    }

    normalizarInventario();
    evaluarCombinacion();
    closeInventarioPopup();

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
      restoreInventarioScrollState(scrollInventario);
    }
  }

  function devolverItemDesdeCombinacion(slotIndex) {
    const item = combinacionSlots[slotIndex];
    if (!item) return;

    playtockSound();

    const itemADevolver = {
      ...item
    };

    delete itemADevolver._hudImg;

    const agregado = agregarItemAlInventario(itemADevolver);

    if (!agregado) {
      return;
    }

    combinacionSlots[slotIndex] = null;
    evaluarCombinacion();
    closeInventarioPopup();

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  }

  window.devolverItemDesdeCombinacion = devolverItemDesdeCombinacion;

  window.destruirItemDelInventario = destruirItemDelInventario;
  window.agregarItemACombinacionDesdeInventario = agregarItemACombinacionDesdeInventario;

  function contarMaterialesEnCombinacion() {
    const conteo = {};

    for (const slot of combinacionSlots) {
      if (!slot) continue;
      conteo[slot.id] = (conteo[slot.id] || 0) + (slot.cantidad || 1);
    }

    return conteo;
  }

  function limpiarSlotsDeCombinacionUsados(resultado) {
    if (!resultado || !Array.isArray(resultado.materiales_requeridos_para_crear)) return;

    for (const mat of resultado.materiales_requeridos_para_crear) {
      let faltan = mat.cantidad || 0;

      for (let i = 0; i < combinacionSlots.length; i++) {
        const slot = combinacionSlots[i];
        if (!slot) continue;
        if (slot.id !== mat.item_id) continue;
        if (faltan <= 0) break;

        combinacionSlots[i] = null;
        faltan--;
      }
    }
  }

  function intentarCrearItemFinal() {
    if (!combinacionResultado) return;

    const scrollInventario = getInventarioScrollState();

    const probabilidad =
      IQuser >= 700
        ? 1
        : (0.4 + (Math.min(IQuser, 250) / 10) / 100);

    const exito = Math.random() < probabilidad;
    const resultadoActual = combinacionResultado;

    if (exito) {
      limpiarSlotsDeCombinacionUsados(resultadoActual);

      const agregado = agregarItemAlInventario({
        ...resultadoActual,
        cantidad: 1,
        usos: resultadoActual.cantidad_de_usos ?? null,
        usos_maximos: resultadoActual.cantidad_de_usos ?? null,
        agotable: resultadoActual.agotable === true
      });

      if (!agregado) {
        showCombinacionEstadoModal("fail");
        evaluarCombinacion();

        if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
          const bodyEl = interfasEl.querySelector(".ui-body");
          if (bodyEl) {
            bodyEl.innerHTML = buildInventarioHTML();
            restoreInventarioScrollState(scrollInventario);
          }
        }
        return;
      }

      combinacionResultado = null;
      evaluarCombinacion();
      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
      }

      showCombinacionEstadoModal("ok");
    } else {
      limpiarSlotsDeCombinacionUsados(resultadoActual);
      combinacionResultado = null;
      evaluarCombinacion();
      closeInventarioPopup();

      if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
        const bodyEl = interfasEl.querySelector(".ui-body");
        if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
      }

      showCombinacionEstadoModal("fail");
    }
  }

  window.intentarCrearItemFinal = intentarCrearItemFinal;

  function evaluarCombinacion() {
    combinacionResultado = null;

    const conteo = contarMaterialesEnCombinacion();
    const recetasValidas = [];

    for (const item of itemsData) {
      if (!item.creable) continue;
      if (!Array.isArray(item.materiales_requeridos_para_crear)) continue;
      if (item.materiales_requeridos_para_crear.length === 0) continue;

      let cumple = true;

      for (const mat of item.materiales_requeridos_para_crear) {
        const cantidadActual = conteo[mat.item_id] || 0;
        if (cantidadActual < mat.cantidad) {
          cumple = false;
          break;
        }
      }

      if (cumple) {
        const totalMateriales = item.materiales_requeridos_para_crear.reduce(
          (acc, mat) => acc + (mat.cantidad || 0),
          0
        );

        const tiposMateriales = item.materiales_requeridos_para_crear.length;

        recetasValidas.push({
          item,
          totalMateriales,
          tiposMateriales
        });
      }
    }

    if (recetasValidas.length === 0) {
      combinacionResultado = null;
      return;
    }

    recetasValidas.sort((a, b) => {
      if (b.totalMateriales !== a.totalMateriales) {
        return b.totalMateriales - a.totalMateriales;
      }

      if (b.tiposMateriales !== a.tiposMateriales) {
        return b.tiposMateriales - a.tiposMateriales;
      }

      return 0;
    });

    combinacionResultado = recetasValidas[0].item;
  }

  cargarItemsJSON();

  // =======================================================================================
  // Lógica de items/consumibles/armas (fin)
  // =======================================================================================
  function limpiarEquipSlotsAgotados() {
    if (!Array.isArray(window.equipSlots)) return false;

    let huboCambios = false;

    for (let i = 0; i < window.equipSlots.length; i++) {
      const item = window.equipSlots[i];
      if (!item) continue;

      const esAgotable = item.agotable === true;
      const desapareceAlAgotarse = item.desaparece_al_agotarse === true;
      const usosActuales = Number(item.usos ?? item.usos_restantes ?? 0);

      if (esAgotable && desapareceAlAgotarse && usosActuales <= 0) {
        window.equipSlots[i] = null;
        huboCambios = true;
      }
    }

    return huboCambios;
  }

  function drawShieldEffect(ctx, layer = "front") {
    const escudosEquipados = (window.equipSlots || []).filter(
      item =>
        item &&
        (
          item.id === "escudo_de_madera" ||
          item.id === "escudo_de_hierro"
        )
    );

    if (!escudosEquipados.length) return;

    const cx = player.x + 32;
    const cy = player.y + 32;
    const time = performance.now() * 0.0015;

    escudosEquipados.forEach((escudo, index) => {
      const esMadera = escudo.id === "escudo_de_madera";

      const ringColor = esMadera ? "#ffe600" : "#cfd4da";
      const glowColor = esMadera ? "#fff16b" : "#f4f7fb";

      let tilt = 0;
      let radiusBase = 28;

      if (escudosEquipados.length === 1) {
        tilt = 0.32;
        radiusBase = 30;
      } else {
        tilt = index === 0 ? -0.32 : 0.32;
        radiusBase = index === 0 ? 28 : 34;
      }

      const pulse = 1 + Math.sin((performance.now() * 0.008) + index) * 0.03;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.scale(1.35 * pulse, 0.45 * pulse);

      if (layer === "back") {
        ctx.beginPath();
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 18;
        ctx.ellipse(0, 0, radiusBase, radiusBase, 0, Math.PI, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 24;
        ctx.ellipse(0, 0, radiusBase + 5, radiusBase + 5, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
      }

      if (layer === "front") {
        ctx.beginPath();
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 18;
        ctx.ellipse(0, 0, radiusBase, radiusBase, 0, 0, Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 24;
        ctx.ellipse(0, 0, radiusBase + 5, radiusBase + 5, 0, 0, Math.PI);
        ctx.stroke();
      }

      ctx.restore();

      if (layer === "front") {
        const particleCount = 5;

        for (let i = 0; i < particleCount; i++) {
          const a = time * 2.2 + (i * (Math.PI * 2 / particleCount)) + index * 0.7;

          // punto base SOBRE el aro, no sobre la cabeza
          const ringX = cx + Math.cos(a) * (radiusBase * 1.28);
          const ringY = cy + Math.sin(a) * (radiusBase * 0.42);

          // deriva suave hacia arriba
          const driftX = Math.sin(time * 3 + i + index) * 2.5;
          const driftY = ((time * 40 + i * 9 + index * 13) % 16);

          const px = ringX + driftX;
          const py = ringY - driftY;

          const size = 0.9 + ((Math.sin(time * 4 + i) + 1) * 0.45);

          ctx.save();
          ctx.globalAlpha = 0.14 + ((Math.sin(time * 2 + i) + 1) * 0.07);
          ctx.fillStyle = ringColor;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    });
  }

  //--Lógica de antorcha he iluminación de mapas oscuros (inicio)
  window.consumirItemEquipado = function (slotIndex, cantidad = 1) {
    const item = window.equipSlots?.[slotIndex];
    if (!item) return;

    item.usos = Math.max(0, (Number(item.usos ?? 1) || 1) - cantidad);

    if (item.agotable === true && item.desaparece_al_agotarse === true && item.usos <= 0) {
      window.equipSlots[slotIndex] = null;
    }

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  };

  window.apagarAntorcha = function (consumir = true) {
    const slotIndex = antorchaActiva.slotIndex;

    if (consumir && Number.isInteger(slotIndex) && slotIndex >= 0) {
      window.consumirItemEquipado(slotIndex, 1);
    }

    antorchaActiva.active = false;
    antorchaActiva.slotIndex = -1;
    antorchaActiva.timer = 0;
  };

  window.activarAntorcha = function (slotIndex) {


    const item = window.equipSlots?.[slotIndex];
    if (!item) return;
    if (item.id !== "antorcha_de_fuego") return;
    if ((item.usos ?? 0) <= 0) return;

    antorchaActiva.active = true;
    antorchaActiva.slotIndex = slotIndex;
    antorchaActiva.timer = TORCH_DURATION_MS;

    //console.log("Antorcha activada", slotIndex);
  };

  function getTorchAnchor() {
    const facing = player.facing || "down";

    if (facing === "up") {
      return { x: player.x + 32, y: player.y + 22, angle: -0.18 };
    }
    if (facing === "down") {
      return { x: player.x + 35, y: player.y + 30, angle: 0.12 };
    }
    if (facing === "left") {
      return { x: player.x + 22, y: player.y + 28, angle: -0.35 };
    }
    return { x: player.x + 43, y: player.y + 28, angle: 0.35 };
  }

  function crearParticulaAntorchaRastro() {
    const a = getTorchAnchor();

    torchTrailParticles.push({
      x: a.x + (Math.random() * 6 - 3),
      y: a.y - 8 + (Math.random() * 6 - 3),
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.35 - Math.random() * 0.55,
      size: 2 + Math.random() * 3,
      life: 180 + Math.random() * 180,
      maxLife: 360,
      color: Math.random() < 0.5 ? "#ffd400" : "#ff7a00"
    });
  }

  function updateTorchTrailParticles(dtMs) {
    for (let i = torchTrailParticles.length - 1; i >= 0; i--) {
      const p = torchTrailParticles[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.size *= 0.987;

      if (p.life <= 0 || p.size <= 0.2) {
        torchTrailParticles.splice(i, 1);
      }
    }
  }

  function drawTorchTrailParticles(ctx) {
    for (const p of torchTrailParticles) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha * 0.55;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawTorchHeld(ctx, layer = "front") {
    if (!antorchaActiva.active) return;

    const facing = player.facing || "down";
    const drawBack = facing === "up";
    if (layer === "back" && !drawBack) return;
    if (layer === "front" && drawBack) return;

    const a = getTorchAnchor();
    const t = performance.now() * 0.01;

    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.angle);

    // palo
    ctx.fillStyle = "#7b3f00";
    ctx.fillRect(-3, -18, 6, 26);

    // brillo base
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,180,60,0.28)";
    ctx.shadowColor = "#ffb347";
    ctx.shadowBlur = 22;
    ctx.arc(0, -18, 11, 0, Math.PI * 2);
    ctx.fill();

    // fuego exterior
    ctx.fillStyle = "#ff7a00";
    ctx.beginPath();
    ctx.moveTo(0, -42 - Math.sin(t) * 1.5);
    ctx.quadraticCurveTo(12, -28, 2, -16);
    ctx.quadraticCurveTo(-10, -26, 0, -42 - Math.sin(t) * 1.5);
    ctx.fill();

    // fuego medio
    ctx.fillStyle = "#ffd400";
    ctx.beginPath();
    ctx.moveTo(0, -36 - Math.sin(t * 1.4) * 1.2);
    ctx.quadraticCurveTo(8, -26, 2, -18);
    ctx.quadraticCurveTo(-7, -24, 0, -36 - Math.sin(t * 1.4) * 1.2);
    ctx.fill();

    // núcleo
    ctx.fillStyle = "#fff7b0";
    ctx.beginPath();
    ctx.moveTo(0, -29 - Math.sin(t * 1.8));
    ctx.quadraticCurveTo(4, -23, 1, -17);
    ctx.quadraticCurveTo(-4, -22, 0, -29 - Math.sin(t * 1.8));
    ctx.fill();

    ctx.restore();
  }

  function obtenerBloqueArcillaEnContactoConJugador() {
    const margen = 18;

    const playerBox = {
      x: player.x + PLAYER_OFFSET_X,
      y: player.y + PLAYER_OFFSET_Y,
      w: PLAYER_HIT_W,
      h: PLAYER_HIT_H
    };

    let bloqueMasCercano = null;
    let mejorDist = Infinity;

    for (const obj of (ambienteObjetos || [])) {
      if (!esBloqueArcilla(obj)) continue;

      const bloqueExpandido = {
        x: obj.x - margen,
        y: obj.y - margen,
        w: obj.w + margen * 2,
        h: obj.h + margen * 2
      };

      const toca =
        playerBox.x < bloqueExpandido.x + bloqueExpandido.w &&
        playerBox.x + playerBox.w > bloqueExpandido.x &&
        playerBox.y < bloqueExpandido.y + bloqueExpandido.h &&
        playerBox.y + playerBox.h > bloqueExpandido.y;

      if (!toca) continue;

      const playerCx = playerBox.x + playerBox.w / 2;
      const playerCy = playerBox.y + playerBox.h / 2;
      const blockCx = obj.x + obj.w / 2;
      const blockCy = obj.y + obj.h / 2;

      const dist = Math.hypot(blockCx - playerCx, blockCy - playerCy);

      if (dist < mejorDist) {
        mejorDist = dist;
        bloqueMasCercano = obj;
      }
    }

    return bloqueMasCercano;
  }

  function existeAntorchaSobreBloque(bloque) {
    return (ambienteObjetos || []).some(obj =>
      obj &&
      obj.subtipo === "antorcha_suelo" &&
      obj.bloque_padre_id === bloque.zona_id
    );
  }

  window.colocarAntorchaSobreBloqueArcilla = function (slotIndex) {
    playtockSound()
    const item = window.equipSlots?.[slotIndex];
    if (!item) return false;
    if (item.id !== "antorcha_de_fuego") return false;
    if ((item.usos ?? 0) <= 0) return false;

    const bloque = obtenerBloqueArcillaEnContactoConJugador();
    if (!bloque) return false;
    if (existeAntorchaSobreBloque(bloque)) return false;

    const antorchaW = 20;
    const antorchaH = 42;

    ambienteObjetos.push({
      zona_id: `antorcha_suelo_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      tipo: "visual",
      subtipo: "antorcha_suelo",
      bloque_padre_id: bloque.zona_id,
      x: bloque.x + (bloque.w / 2) - (antorchaW / 2),
      y: bloque.y - antorchaH + 8,
      w: antorchaW,
      h: antorchaH,
      luz_radio: 200,
      llamaFija: true,
      frameTimer: 0,
      color: null,
      imagen: null,
      sprites_1x10: null,
      velocidad_movimiento: null,
      sonido_ambiente: null,
      funcion: null
    });

    window.consumirItemEquipado(slotIndex, 1);
    antorchaActiva.active = false;
    antorchaActiva.slotIndex = -1;
    antorchaActiva.timer = 0;

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }

    return true;
  };

  function drawAntorchaSuelo(ctx, obj) {
    const t = performance.now() * 0.01;
    const baseX = obj.x + obj.w / 2;
    const baseY = obj.y + obj.h;

    drawEntityShadow(ctx, images.shadow, obj.x, obj.y, obj.w, obj.h, {
      scaleW: 0.58,
      scaleH: 0.18,
      offsetY: 0.92,
      alpha: 0.22
    });

    ctx.save();
    ctx.translate(baseX, baseY);

    ctx.fillStyle = "#7b3f00";
    ctx.fillRect(-2, -26, 4, 24);

    ctx.fillStyle = "#4b2a12";
    ctx.fillRect(-6, -3, 12, 3);

    ctx.beginPath();
    ctx.fillStyle = "rgba(255,180,60,0.28)";
    ctx.shadowColor = "#ffb347";
    ctx.shadowBlur = 20;
    ctx.arc(0, -26, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff7a00";
    ctx.beginPath();
    ctx.moveTo(0, -48 - Math.sin(t) * 1.5);
    ctx.quadraticCurveTo(10, -36, 2, -24);
    ctx.quadraticCurveTo(-10, -34, 0, -48 - Math.sin(t) * 1.5);
    ctx.fill();

    ctx.fillStyle = "#ffd400";
    ctx.beginPath();
    ctx.moveTo(0, -42 - Math.sin(t * 1.4) * 1.2);
    ctx.quadraticCurveTo(7, -33, 2, -25);
    ctx.quadraticCurveTo(-7, -31, 0, -42 - Math.sin(t * 1.4) * 1.2);
    ctx.fill();

    ctx.fillStyle = "#fff7b0";
    ctx.beginPath();
    ctx.moveTo(0, -35 - Math.sin(t * 1.8));
    ctx.quadraticCurveTo(4, -29, 1, -24);
    ctx.quadraticCurveTo(-4, -28, 0, -35 - Math.sin(t * 1.8));
    ctx.fill();

    ctx.restore();
  }

  function limpiarAntorchasDeBloquesRotos() {
    ambienteObjetos = (ambienteObjetos || []).filter(obj => {
      if (!obj || obj.subtipo !== "antorcha_suelo") return true;

      const bloqueExiste = ambienteObjetos.some(b =>
        b &&
        b.zona_id === obj.bloque_padre_id &&
        esBloqueArcilla(b)
      );

      return bloqueExiste;
    });
  }

  function drawDarknessOverlay(camCenterX, camCenterY, viewW, viewH) {

    if (!mapaOscuro) return;

    if (!darknessCanvas) {
      darknessCanvas = document.createElement("canvas");
      darknessCtx = darknessCanvas.getContext("2d");
    }

    if (darknessCanvas.width !== canvas.width || darknessCanvas.height !== canvas.height) {
      darknessCanvas.width = canvas.width;
      darknessCanvas.height = canvas.height;
    }

    const dctx = darknessCtx;

    dctx.setTransform(1, 0, 0, 1, 0, 0);
    dctx.clearRect(0, 0, darknessCanvas.width, darknessCanvas.height);

    dctx.save();

    // MISMA cámara y MISMO zoom del mundo
    dctx.translate(canvas.width / 2, canvas.height / 2);
    dctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
    dctx.translate(-camCenterX, -camCenterY);

    const viewX = camCenterX - viewW / 2;
    const viewY = camCenterY - viewH / 2;

    // capa oscura solo en el área visible del mundo
    dctx.fillStyle = "rgba(0,0,0,0.96)";
    dctx.fillRect(viewX, viewY, viewW, viewH);

    dctx.globalCompositeOperation = "destination-out";

    function abrirLuz(worldX, worldY, radius) {
      const grad = dctx.createRadialGradient(
        worldX, worldY, 0,
        worldX, worldY, radius
      );

      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.7, "rgba(255,255,255,0.4)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      dctx.fillStyle = grad;
      dctx.beginPath();
      dctx.arc(worldX, worldY, radius, 0, Math.PI * 2);
      dctx.fill();
    }

    const luzX = player.x + HERO_DRAW_W / 2;
    const luzY = player.y + HERO_DRAW_H / 2;

    // luz base mínima del jugador
    abrirLuz(luzX, luzY, 36);

    // luz grande de antorcha
    if (antorchaActiva.active) {
      abrirLuz(luzX, luzY, TORCH_LIGHT_RADIUS);
    }

    const lucesIlumMapa = getLucesIlumSistemaMapa();

    for (const luz of lucesIlumMapa) {
      abrirLuz(luz.x, luz.y, luz.radius);
    }

    // disparos del jugador
    for (const d of (window.disparosLazerActivos || [])) {
      abrirLuz(d.x, d.y, 40);
    }

    // disparos enemigos
    for (const d of (window.disparosEnemigosArmadosActivos || [])) {
      abrirLuz(d.x, d.y, 38);
    }

    // bumerangs
    for (const b of (window.bumerangsActivos || [])) {
      abrirLuz(b.x, b.y, 34);
    }

    // antorchas de suelo
    for (const obj of (ambienteObjetos || [])) {
      if (!obj || obj.subtipo !== "antorcha_suelo") continue;

      abrirLuz(
        obj.x + obj.w / 2,
        obj.y + obj.h * 0.25,
        Number(obj.luz_radio || 200) || 200
      );
    }

    // ataque especial de jefes
    for (const atk of (window.ataquesEspecialesJefeActivos || [])) {
      abrirLuz(atk.x, atk.y, Math.max(160, atk.radioActual + 20));
    }

    dctx.restore();

    dctx.globalCompositeOperation = "source-over";

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(darknessCanvas, 0, 0);
    ctx.restore();
  }
  //--Lógica de antorcha he iluminación de mapas oscuros (fin)

  // =======================================================================================
  // Lógica ambiente.jsons (inicio)
  // =======================================================================================

  function objetoPuedeTaparJugador(obj) {
    if (!obj) return false;

    if (esBloqueArcilla(obj)) return false;
    if (obj.subtipo === "antorcha_suelo") return false;

    return true;
  }

  function objetoTapaAlJugador(obj) {
    if (!objetoPuedeTaparJugador(obj)) return false;

    const playerFeetX = heroDrawX + (HERO_DRAW_W / 2);
    const playerFeetY = heroDrawY + HERO_DRAW_H;

    const overlapX =
      playerFeetX >= obj.x &&
      playerFeetX <= obj.x + obj.w;

    const jugadorDetras =
      playerFeetY < (obj.y + obj.h);

    return overlapX && jugadorDetras;
  }

  function getImagenAmbienteCache(src) {
    if (!src) return null;

    let entry = ambienteImagenesCache[src];

    if (!entry) {
      const img = new Image();
      img.onload = () => //console.log("Imagen ambiente cargada:", src);
        img.onerror = () => console.warn("No cargó imagen ambiente:", src);
      img.src = src;

      entry = {
        img,
        lastUsed: performance.now()
      };

      ambienteImagenesCache[src] = entry;
    } else {
      entry.lastUsed = performance.now();
    }

    return entry.img;
  }

  function limpiarCacheImagenesAmbiente() {
    const now = performance.now();
    const keys = Object.keys(ambienteImagenesCache);

    for (const key of keys) {
      const entry = ambienteImagenesCache[key];
      if (!entry) continue;

      const idleTime = now - entry.lastUsed;

      if (idleTime > AMBIENTE_IMG_CACHE_TTL) {
        delete ambienteImagenesCache[key];
      }
    }

    const remainingKeys = Object.keys(ambienteImagenesCache);

    if (remainingKeys.length > AMBIENTE_IMG_CACHE_MAX) {
      remainingKeys
        .sort((a, b) => ambienteImagenesCache[a].lastUsed - ambienteImagenesCache[b].lastUsed)
        .slice(0, remainingKeys.length - AMBIENTE_IMG_CACHE_MAX)
        .forEach(key => {
          delete ambienteImagenesCache[key];
        });
    }
  }

  function getAudioAmbienteCache(src) {
    if (!src) return null;

    let entry = ambienteAudioCache[src];

    if (!entry) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = efectVolumen;

      entry = {
        audio,
        lastUsed: performance.now(),
        activeCount: 0
      };

      ambienteAudioCache[src] = entry;
    } else {
      entry.lastUsed = performance.now();
      entry.audio.volume = efectVolumen;
    }

    return entry.audio;
  }

  function marcarUsoAudioAmbiente(src, activo) {
    const entry = ambienteAudioCache[src];
    if (!entry) return;

    entry.lastUsed = performance.now();

    if (activo) {
      entry.activeCount = Math.max(1, entry.activeCount || 0);
    } else {
      entry.activeCount = 0;
    }
  }

  function limpiarCacheAudioAmbiente() {
    const now = performance.now();
    const keys = Object.keys(ambienteAudioCache);

    for (const key of keys) {
      const entry = ambienteAudioCache[key];
      if (!entry) continue;

      const idleTime = now - entry.lastUsed;
      const isPlaying = !!entry.activeCount;

      if (!isPlaying && idleTime > AMBIENTE_AUDIO_CACHE_TTL) {
        try {
          entry.audio.pause();
          entry.audio.src = "";
          entry.audio.load();
        } catch (err) { }

        delete ambienteAudioCache[key];
      }
    }

    const remainingKeys = Object.keys(ambienteAudioCache);

    if (remainingKeys.length > AMBIENTE_AUDIO_CACHE_MAX) {
      remainingKeys
        .sort((a, b) => ambienteAudioCache[a].lastUsed - ambienteAudioCache[b].lastUsed)
        .slice(0, remainingKeys.length - AMBIENTE_AUDIO_CACHE_MAX)
        .forEach(key => {
          const entry = ambienteAudioCache[key];
          if (!entry || entry.activeCount > 0) return;

          try {
            entry.audio.pause();
            entry.audio.src = "";
            entry.audio.load();
          } catch (err) { }

          delete ambienteAudioCache[key];
        });
    }
  }

  function drawBaseObjetoAmbiente(ctx, obj) {
    if (!obj) return;

    drawEntityShadow(ctx, images.shadow, obj.x, obj.y, obj.w, obj.h, {
      scaleW: 0.78,
      scaleH: 0.24,
      offsetY: 0.88,
      alpha: 0.24
    });

    if (obj.color) {
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    if (obj.imagen) {
      const img = getImagenAmbienteCache(obj.imagen);

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, obj.x, obj.y, obj.w, obj.h);
      }
    }

    if (obj.sprites_1x10) {
      const img = getImagenAmbienteCache(obj.sprites_1x10);

      if (img && img.complete && img.naturalWidth > 0) {
        const FRAME_W = 120;
        const FRAME_H = 120;
        const TOTAL_FRAMES = 10;

        obj.frameTimer += 16;

        const speed = Number(obj.velocidad_movimiento) || 1;

        if (obj.frameTimer >= (obj.frameDuration / speed)) {
          obj.frameActual = (obj.frameActual + 1) % TOTAL_FRAMES;
          obj.frameTimer = 0;
        }

        const sx = obj.frameActual * FRAME_W;

        ctx.drawImage(
          img,
          sx, 0, FRAME_W, FRAME_H,
          obj.x, obj.y, obj.w, obj.h
        );
      }
    }

    if (obj.sonido_ambiente) {
      const dx = (player.x + 32) - (obj.x + obj.w / 2);
      const dy = (player.y + 32) - (obj.y + obj.h / 2);
      const dist = Math.hypot(dx, dy);

      const audio = getAudioAmbienteCache(obj.sonido_ambiente);

      if (audio) {
        if (dist < 500) {
          const volumenDistancia = Math.max(0, 1 - (dist / 500));
          audio.volume = volumenDistancia * efectVolumen;

          if (!obj.audioPlaying) {
            audio.play().catch(() => { });
            obj.audioPlaying = true;
          }

          marcarUsoAudioAmbiente(obj.sonido_ambiente, true);
        } else {
          if (obj.audioPlaying) {
            audio.pause();
            obj.audioPlaying = false;
          }

          marcarUsoAudioAmbiente(obj.sonido_ambiente, false);
        }
      }
    }
  }

  function drawAmbienteCapa(ctx, capa) {
    if (!ambienteObjetos || !ambienteObjetos.length) return;

    for (const obj of ambienteObjetos) {
      if (!obj) continue;
      if (!entityIsVisible(obj)) continue;

      if (esBloqueArcilla(obj)) continue;
      if (obj.subtipo === "antorcha_suelo") continue;

      const tapaJugador = objetoTapaAlJugador(obj);

      if (capa === "back" && tapaJugador) continue;
      if (capa === "front" && !tapaJugador) continue;

      drawBaseObjetoAmbiente(ctx, obj);
    }
  }

  function bloqueArcillaVaDetrasDeObjeto(obj, bloqueRef) {
    if (!obj || !bloqueRef) return false;
    if (esBloqueArcilla(obj)) return false;
    if (obj.subtipo === "antorcha_suelo") return false;

    const overlapX =
      bloqueRef.x < obj.x + obj.w &&
      bloqueRef.x + bloqueRef.w > obj.x;

    if (!overlapX) return false;

    const bloqueBaseY = bloqueRef.y + bloqueRef.h;
    const objBaseY = obj.y + obj.h;

    return bloqueBaseY < objBaseY;
  }

  function drawArcillaCapa(ctx, capa) {
    if (!ambienteObjetos || !ambienteObjetos.length) return;

    const objetosArcilla = ambienteObjetos.filter(obj =>
      obj &&
      (esBloqueArcilla(obj) || obj.subtipo === "antorcha_suelo")
    );

    for (const obj of objetosArcilla) {
      let bloqueRef = null;

      if (esBloqueArcilla(obj)) {
        bloqueRef = obj;
      } else if (obj.subtipo === "antorcha_suelo") {
        bloqueRef = ambienteObjetos.find(o =>
          o &&
          o.zona_id === obj.bloque_padre_id &&
          esBloqueArcilla(o)
        ) || null;
      }

      if (!bloqueRef) continue;
      if (!entityIsVisible(bloqueRef)) continue;

      const vaDetras = ambienteObjetos.some(amb =>
        amb &&
        amb !== obj &&
        bloqueArcillaVaDetrasDeObjeto(amb, bloqueRef)
      );

      if (capa === "back" && !vaDetras) continue;
      if (capa === "front" && vaDetras) continue;

      if (obj.subtipo === "antorcha_suelo") {
        drawAntorchaSuelo(ctx, obj);
      } else {
        drawBaseObjetoAmbiente(ctx, obj);
      }
    }
  }

  //-- lógica arcilla (inicio)
  function esBloqueArcilla(obj) {
    return !!obj && obj.subtipo === "bloque_arcilla";
  }

  function rectsOverlap(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function crearParticulasArcilla(x, y) {
    for (let i = 0; i < 20; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3.5;

      window.particulasArcillaActivas.push({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - (Math.random() * 1.2),
        size: 3 + Math.random() * 4,
        life: 280 + Math.random() * 220,
        maxLife: 500,
        color: Math.random() < 0.5 ? "#8b5a2b" : "#a97449"
      });
    }
  }

  function updateParticulasArcilla(dtMs) {
    for (let i = window.particulasArcillaActivas.length - 1; i >= 0; i--) {
      const p = window.particulasArcillaActivas[i];

      p.life -= dtMs;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.vy += 0.03;
      p.size *= 0.985;

      if (p.life <= 0 || p.size <= 0.2) {
        window.particulasArcillaActivas.splice(i, 1);
      }
    }
  }

  function drawParticulasArcilla(ctx) {
    for (const p of (window.particulasArcillaActivas || [])) {
      const alpha = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function areaLibreParaBloqueArcilla(x, y, w, h) {
    const choque = colisionAmbiente(x, y, w, h);
    if (choque) {
      //console.log("Bloque arcilla choca con ambiente:", choque.zona_id || choque);
      return false;
    }

    const bloque = { x, y, w, h };

    const playerBox = {
      x: player.x + PLAYER_OFFSET_X,
      y: player.y + PLAYER_OFFSET_Y,
      w: PLAYER_HIT_W,
      h: PLAYER_HIT_H
    };

    if (rectsOverlap(bloque, playerBox)) {
      //console.log("Bloque arcilla choca con player");
      return false;
    }

    for (const npc of (window.npcsAmbiente || [])) {
      if (rectsOverlap(bloque, { x: npc.x, y: npc.y, w: npc.w, h: npc.h })) {
        //console.log("Bloque arcilla choca con NPC:", npc.id || npc.nombre);
        return false;
      }
    }

    for (const enemy of (window.enemigos || [])) {
      if (rectsOverlap(bloque, { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h })) {
        //console.log("Bloque arcilla choca con enemigo:", enemy.id || enemy.nombre);
        return false;
      }
    }

    return true;
  }

  function obtenerPosicionBloqueArcillaFrenteAlJugador() {
    const separacion = 6;

    let x = player.x;
    let y = player.y;

    if (player.facing === "up") {
      x += (HERO_DRAW_W - BLOQUE_ARCILLA_W) / 2;
      y -= BLOQUE_ARCILLA_H + separacion;

    } else if (player.facing === "down") {
      x += (HERO_DRAW_W - BLOQUE_ARCILLA_W) / 2;
      y += HERO_DRAW_H + separacion;

    } else if (player.facing === "left") {
      x -= BLOQUE_ARCILLA_W + separacion;
      y += HERO_DRAW_H - BLOQUE_ARCILLA_H;

    } else {
      x += HERO_DRAW_W + separacion;
      y += HERO_DRAW_H - BLOQUE_ARCILLA_H;
    }

    x = Math.floor(clamp(x, 0, WORLD_W - BLOQUE_ARCILLA_W));
    y = Math.floor(clamp(y, 0, WORLD_H - BLOQUE_ARCILLA_H));

    return { x, y };
  }

  window.colocarBloqueArcillaDesdeHUD = function (slotIndex) {

    const item = window.equipSlots?.[slotIndex];
    if (!item) return;
    if (item.id !== "bloque_de_arcilla") return;
    if ((item.usos ?? 0) <= 0) return;

    const pos = obtenerPosicionBloqueArcillaFrenteAlJugador();

    if (!areaLibreParaBloqueArcilla(pos.x, pos.y, BLOQUE_ARCILLA_W, BLOQUE_ARCILLA_H)) {
      //console.log("No hay espacio libre para colocar el bloque de arcilla");
      return;
    }

    ambienteObjetos.push({
      zona_id: `bloque_arcilla_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      color: null,
      tipo: "colisionables",
      subtipo: "bloque_arcilla",
      funcion: null,
      x: pos.x,
      y: pos.y,
      w: BLOQUE_ARCILLA_W,
      h: BLOQUE_ARCILLA_H,
      imagen: "../assets/items/bloqueArcilla.svg",
      sprites_1x10: null,
      velocidad_movimiento: null,
      sonido_ambiente: null,
      pdr: 12,
      pdr_max: 12
    });

    item.usos -= 1;
    if (item.usos < 0) item.usos = 0;

    if (item.agotable === true && item.desaparece_al_agotarse === true && item.usos <= 0) {
      window.equipSlots[slotIndex] = null;
    }

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
  };

  function aplicarDanioABloqueArcilla(obj, danio, impactoX, impactoY) {
    if (!esBloqueArcilla(obj)) return false;

    // Si el bloque pertenece a una misión específica,
    // solo se puede romper cuando esa misión esté activa.
    if (obj.missionId) {
      const activeMissionId = window.missionSystem?.activeMissionId;

      if (activeMissionId !== obj.missionId) {
        return false;
      }
    }

    obj.pdr = Math.max(0, (Number(obj.pdr || BLOQUE_ARCILLA_PDR)) - (Number(danio) || 0));

    crearParticulasArcilla(impactoX, impactoY);

    if (obj.pdr <= 0) {
      playArcillaBreakSound();
      crearParticulasArcilla(obj.x + obj.w / 2, obj.y + obj.h / 2);

      if (obj.funcion && typeof window[obj.funcion] === "function") {
        window[obj.funcion](obj);
      }

      ambienteObjetos = ambienteObjetos.filter(el =>
        el !== obj && el.bloque_padre_id !== obj.zona_id
      );
    }

    return true;
  }

  function danarBloqueArcillaEnRect(x, y, w, h, danio, impactoX, impactoY) {
    const obj = colisionAmbiente(x, y, w, h);
    if (!obj) return false;
    if (!esBloqueArcilla(obj)) return false;

    return aplicarDanioABloqueArcilla(
      obj,
      danio,
      impactoX ?? (x + w / 2),
      impactoY ?? (y + h / 2)
    );
  }

  window._enyDamageClayBlock = danarBloqueArcillaEnRect;

  function buscarFuenteDeFuegoCercana(enemy, radioBusqueda = 320) {
    if (!enemy) return null;

    let mejor = null;
    let mejorDist = Infinity;

    for (const obj of ilumSistemaMapa || []) {
      if (!obj) continue;
      if (!obj.encendida) continue;
      if ((obj.pdr_fuego ?? 0) <= 0) continue;

      const fx = obj.x + obj.w / 2;
      const fy = obj.tipo === "chimenea"
        ? (obj.y + obj.h * 0.78)
        : (obj.y + obj.h * 0.16);

      const ex = enemy.x + enemy.w / 2;
      const ey = enemy.y + enemy.h / 2;

      const dist = Math.hypot(fx - ex, fy - ey);
      if (dist > radioBusqueda) continue;

      if (dist < mejorDist) {
        mejorDist = dist;
        mejor = obj;
      }
    }

    return mejor;
  }

  function buscarFuenteDeFuegoCercana(enemy, radioBusqueda = 320) {
    if (!enemy) return null;

    let mejor = null;
    let mejorDist = Infinity;

    for (const obj of ilumSistemaMapa || []) {
      if (!obj) continue;
      if (!obj.encendida) continue;
      if ((obj.pdr_fuego ?? 0) <= 0) continue;

      const fx = obj.x + obj.w / 2;
      const fy = obj.tipo === "chimenea"
        ? (obj.y + obj.h * 0.78)
        : (obj.y + obj.h * 0.16);

      const ex = enemy.x + enemy.w / 2;
      const ey = enemy.y + enemy.h / 2;

      const dist = Math.hypot(fx - ex, fy - ey);
      if (dist > radioBusqueda) continue;

      if (dist < mejorDist) {
        mejorDist = dist;
        mejor = obj;
      }
    }

    return mejor;
  }
  /*
  function procesarImpactoEnemigoContraBloque(enemy, nextX, nextY) {
    const obj = colisionAmbiente(nextX, nextY, enemy.w, enemy.h);
    if (!obj || !esBloqueArcilla(obj)) return false;
  
    enemy.cooldownGolpeBloque = enemy.cooldownGolpeBloque || 0;
  
    if (enemy.cooldownGolpeBloque <= 0) {
      aplicarDanioABloqueArcilla(
        obj,
        Number(enemy.puntos_de_ataque ?? 1) || 1,
        obj.x + obj.w / 2,
        obj.y + obj.h / 2
      );
  
      enemy.cooldownGolpeBloque = 700;
    }
  
    return true;
  }
  //-- lógica arcilla (fin)
  
  
  function colisionAmbiente(x, y, w, h) {
  
    for (const obj of ambienteObjetos) {
  
      if (!obj.tipo.includes("colisionables")) continue;
  
      if (
        x < obj.x + obj.w &&
        x + w > obj.x &&
        y < obj.y + obj.h &&
        y + h > obj.y
      ) {
        return true;
      }
    }
  
    return false;
  }
  
  */

  // =============================
  // funciones ambientes.json elementos cliqueables (inicio)
  // =============================
  //portal dimencional
  window.portalDimencional = function () {
    const old = document.getElementById("portal-info-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "portal-info-overlay";
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.zIndex = "7000";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    overlay.innerHTML = `
    <div style="
      width:320px;
      min-height:180px;
      background:black;
      color:#00ffcc;
      border:3px solid #00ffcc;
      box-shadow:0 0 0 2px #0b3d35, 0 0 0 4px #00ffcc, 0 10px 30px rgba(0,0,0,.45);
      font-family:'arcade','monospace';
      padding:16px;
      box-sizing:border-box;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      gap:18px;
      text-align:center;
    ">
      <div style="font-size:12px; text-transform:uppercase;">Portal dimensional</div>
      <div style="font-size:12px; line-height:1.6;">Este es el portal de la escuela espacial</div>
      <button id="portal-info-close" type="button" style="
        min-width:120px;
        height:34px;
        margin:0 auto;
        background:black;
        color:#00ffcc;
        border:2px solid #00ffcc;
        font-family:'arcade','monospace';
        font-size:10px;
        text-transform:uppercase;
      ">Cerrar</button>
    </div>
  `;

    wrapEl.appendChild(overlay);

    const closeBtn = overlay.querySelector("#portal-info-close");

    function cerrar() {
      overlay.remove();
    }

    closeBtn.addEventListener("click", cerrar);
    overlay.addEventListener("pointerdown", (e) => {
      if (e.target === overlay) cerrar();
    });
  };
  // =============================
  // funciones ambientes.json elementos cliqueables (fin)
  // =============================

  function obtenerObjetosColisionablesAmbiente() {
    return (ambienteObjetos || []).filter(
      obj => obj && String(obj.tipo || "").includes("colisionables")
    );
  }

  function colisionAmbiente(x, y, w, h) {
    const bloques = obtenerObjetosColisionablesAmbiente();

    for (const obj of bloques) {
      if (
        x < obj.x + obj.w &&
        x + w > obj.x &&
        y < obj.y + obj.h &&
        y + h > obj.y
      ) {
        return obj;
      }
    }

    return null;
  }

  function obtenerBloqueoNPCambiente(x, y, w, h) {
    const hitbox = { x, y, w, h };

    for (const obj of (ambienteObjetos || [])) {
      if (!obj) continue;
      if (!String(obj.tipo || "").includes("colisionables")) continue;

      const bloque = {
        x: Number(obj.x) || 0,
        y: Number(obj.y) || 0,
        w: Number(obj.w) || 0,
        h: Number(obj.h) || 0
      };

      if (rectsOverlap(hitbox, bloque)) {
        return obj;
      }
    }

    return null;
  }

  function elegirLadoRodeoNPC(dirX, dirY) {
    const izquierda = { x: -dirY, y: dirX };
    const derecha = { x: dirY, y: -dirX };

    return Math.random() < 0.5 ? izquierda : derecha;
  }

  function iniciarRodeoNPCambiente(npc, obstaculo) {
    const lado = elegirLadoRodeoNPC(npc.dirX, npc.dirY);

    npc.rodeando = true;
    npc.rodeoDirOriginalX = npc.dirX;
    npc.rodeoDirOriginalY = npc.dirY;
    npc.rodeoDirX = lado.x;
    npc.rodeoDirY = lado.y;
    npc.ladoRodeo = (lado.x === -npc.dirY && lado.y === npc.dirX) ? "izquierda" : "derecha";
    npc.rodeoTimer = 0;
    npc.rodeoIntentos = (npc.rodeoIntentos || 0) + 1;
    npc.ultimoObstaculoId = obstaculo?.zona_id || obstaculo?.id || "obstaculo";
  }

  function alternarLadoRodeoNPCambiente(npc) {
    const nuevoX = -npc.rodeoDirX;
    const nuevoY = -npc.rodeoDirY;

    npc.rodeoDirX = nuevoX;
    npc.rodeoDirY = nuevoY;
    npc.ladoRodeo = npc.ladoRodeo === "izquierda" ? "derecha" : "izquierda";
    npc.rodeoTimer = 0;
  }

  function actualizarFacingNPCambiente(npc, dirX, dirY) {
    if (Math.abs(dirX) > Math.abs(dirY)) {
      npc.facing = dirX > 0 ? "right" : "left";
    } else if (dirY !== 0) {
      npc.facing = dirY > 0 ? "down" : "up";
    }
  }

  function moverNPCambienteConRodeo(npc, dtMs, worldW, worldH) {
    const delta = dtMs / 16.6667;
    const limiteIzq = 0;
    const limiteArr = 0;
    const limiteDer = worldW - npc.w;
    const limiteAbj = worldH - npc.h;

    const velocidadPaso = npc.velocidad * delta;

    const dirFrontalX = npc.rodeando ? npc.rodeoDirOriginalX : npc.dirX;
    const dirFrontalY = npc.rodeando ? npc.rodeoDirOriginalY : npc.dirY;

    const dirMovimientoX = npc.rodeando ? npc.rodeoDirX : npc.dirX;
    const dirMovimientoY = npc.rodeando ? npc.rodeoDirY : npc.dirY;

    const probeX = clamp(npc.x + (dirMovimientoX * velocidadPaso), limiteIzq, limiteDer);
    const probeY = clamp(npc.y + (dirMovimientoY * velocidadPaso), limiteArr, limiteAbj);
    const obstaculoMovimiento = obtenerBloqueoNPCambiente(probeX, probeY, npc.w, npc.h);

    if (!npc.rodeando) {
      if (obstaculoMovimiento) {
        iniciarRodeoNPCambiente(npc, obstaculoMovimiento);
        return false;
      }

      npc.x = probeX;
      npc.y = probeY;
      actualizarFacingNPCambiente(npc, dirMovimientoX, dirMovimientoY);
      return true;
    }

    npc.rodeoTimer += dtMs;

    const frenteX = clamp(npc.x + (dirFrontalX * velocidadPaso), limiteIzq, limiteDer);
    const frenteY = clamp(npc.y + (dirFrontalY * velocidadPaso), limiteArr, limiteAbj);
    const obstaculoFrente = obtenerBloqueoNPCambiente(frenteX, frenteY, npc.w, npc.h);

    if (!obstaculoFrente) {
      npc.rodeando = false;
      npc.dirX = npc.rodeoDirOriginalX;
      npc.dirY = npc.rodeoDirOriginalY;
      npc.rodeoDirX = 0;
      npc.rodeoDirY = 0;
      npc.rodeoTimer = 0;
      npc.ultimoObstaculoId = null;

      npc.x = frenteX;
      npc.y = frenteY;
      actualizarFacingNPCambiente(npc, npc.dirX, npc.dirY);
      return true;
    }

    if (obstaculoMovimiento) {
      alternarLadoRodeoNPCambiente(npc);
      return false;
    }

    npc.x = probeX;
    npc.y = probeY;
    actualizarFacingNPCambiente(npc, dirMovimientoX, dirMovimientoY);

    if (npc.rodeoTimer >= 1400) {
      alternarLadoRodeoNPCambiente(npc);
    }

    return true;
  }

  function elegirLadoRodeoEnemigo(dirX, dirY) {
    const izquierda = { x: -dirY, y: dirX };
    const derecha = { x: dirY, y: -dirX };
    return Math.random() < 0.5 ? izquierda : derecha;
  }

  function iniciarRodeoEnemigo(enemy, obstaculo) {
    const lado = elegirLadoRodeoEnemigo(enemy.dirX, enemy.dirY);

    enemy.rodeando = true;
    enemy.rodeoDirOriginalX = enemy.dirX;
    enemy.rodeoDirOriginalY = enemy.dirY;
    enemy.rodeoDirX = lado.x;
    enemy.rodeoDirY = lado.y;
    enemy.ladoRodeo = (lado.x === -enemy.dirY && lado.y === enemy.dirX) ? "izquierda" : "derecha";
    enemy.rodeoTimer = 0;
    enemy.rodeoIntentos = (enemy.rodeoIntentos || 0) + 1;
    enemy.ultimoObstaculoId = obstaculo?.zona_id || obstaculo?.id || "obstaculo";
  }

  function alternarLadoRodeoEnemigo(enemy) {
    enemy.rodeoDirX = -enemy.rodeoDirX;
    enemy.rodeoDirY = -enemy.rodeoDirY;
    enemy.ladoRodeo = enemy.ladoRodeo === "izquierda" ? "derecha" : "izquierda";
    enemy.rodeoTimer = 0;
  }

  function actualizarFacingEnemigo(enemy, dirX, dirY) {
    if (Math.abs(dirX) > Math.abs(dirY)) {
      enemy.facing = dirX > 0 ? "right" : "left";
    } else if (dirY !== 0) {
      enemy.facing = dirY > 0 ? "down" : "up";
    }
  }

  function moverEnemigoConRodeo(enemy, dtMs, objetivoDirX = null, objetivoDirY = null) {
    const delta = dtMs / 16.6667;
    const velocidadPaso = enemy.velocidad * delta;

    const dirBaseX = objetivoDirX ?? enemy.dirX;
    const dirBaseY = objetivoDirY ?? enemy.dirY;

    if (!enemy.rodeando && (dirBaseX !== enemy.dirX || dirBaseY !== enemy.dirY)) {
      enemy.dirX = dirBaseX;
      enemy.dirY = dirBaseY;
    }

    const dirFrontalX = enemy.rodeando ? enemy.rodeoDirOriginalX : dirBaseX;
    const dirFrontalY = enemy.rodeando ? enemy.rodeoDirOriginalY : dirBaseY;

    const dirMovimientoX = enemy.rodeando ? enemy.rodeoDirX : dirBaseX;
    const dirMovimientoY = enemy.rodeando ? enemy.rodeoDirY : dirBaseY;

    const nextX = clamp(enemy.x + (dirMovimientoX * velocidadPaso), 0, WORLD_W - enemy.w);
    const nextY = clamp(enemy.y + (dirMovimientoY * velocidadPaso), 0, WORLD_H - enemy.h);
    const obstaculoMovimiento = colisionAmbiente(nextX, nextY, enemy.w, enemy.h);

    if (!enemy.rodeando) {
      if (obstaculoMovimiento) {
        iniciarRodeoEnemigo(enemy, obstaculoMovimiento);
        return false;
      }

      enemy.x = nextX;
      enemy.y = nextY;
      actualizarFacingEnemigo(enemy, dirMovimientoX, dirMovimientoY);
      return true;
    }

    enemy.rodeoTimer += dtMs;

    const frenteX = clamp(enemy.x + (dirFrontalX * velocidadPaso), 0, WORLD_W - enemy.w);
    const frenteY = clamp(enemy.y + (dirFrontalY * velocidadPaso), 0, WORLD_H - enemy.h);
    const obstaculoFrente = colisionAmbiente(frenteX, frenteY, enemy.w, enemy.h);

    if (!obstaculoFrente) {
      enemy.rodeando = false;
      enemy.dirX = dirFrontalX;
      enemy.dirY = dirFrontalY;
      enemy.rodeoDirX = 0;
      enemy.rodeoDirY = 0;
      enemy.rodeoTimer = 0;
      enemy.ultimoObstaculoId = null;

      enemy.x = frenteX;
      enemy.y = frenteY;
      actualizarFacingEnemigo(enemy, enemy.dirX, enemy.dirY);
      return true;
    }

    if (obstaculoMovimiento) {
      alternarLadoRodeoEnemigo(enemy);
      return false;
    }

    enemy.x = nextX;
    enemy.y = nextY;
    actualizarFacingEnemigo(enemy, dirMovimientoX, dirMovimientoY);

    if (enemy.rodeoTimer >= 1200) {
      alternarLadoRodeoEnemigo(enemy);
    }

    return true;
  }

  function resetRodeoEnemigo(enemy) {
    enemy.rodeando = false;
    enemy.ladoRodeo = null;
    enemy.rodeoDirOriginalX = 0;
    enemy.rodeoDirOriginalY = 0;
    enemy.rodeoDirX = 0;
    enemy.rodeoDirY = 0;
    enemy.rodeoTimer = 0;
    enemy.rodeoIntentos = 0;
    enemy.ultimoObstaculoId = null;
    enemy.encierroCheckX = enemy.x;
    enemy.encierroCheckY = enemy.y;

    enemy.encierroOrigenX = enemy.x;
    enemy.encierroOrigenY = enemy.y;
  }

  function obtenerBloquesArcillaActivos() {
    return (ambienteObjetos || []).filter(obj => obj && esBloqueArcilla(obj));
  }

  function buscarBloqueArcillaMasCercano(enemy) {
    const bloques = obtenerBloquesArcillaActivos();
    if (!bloques.length) return null;

    const enemyCx = enemy.x + enemy.w / 2;
    const enemyCy = enemy.y + enemy.h / 2;

    let mejor = null;
    let mejorDist = Infinity;

    for (const bloque of bloques) {
      const bx = bloque.x + bloque.w / 2;
      const by = bloque.y + bloque.h / 2;
      const dist = Math.hypot(bx - enemyCx, by - enemyCy);

      if (dist < mejorDist) {
        mejorDist = dist;
        mejor = bloque;
      }
    }

    return mejor;
  }

  function resetEscapeArcillaEnemigo(enemy) {
    enemy.modoEscape = "normal";
    enemy.arcillaObjetivoId = null;
    enemy.cooldownGolpeEscape = 0;
    enemy.tiempoEscapeArcilla = 0;
  }

  function enemigoEstaCercaDeBloqueArcilla(enemy, bloque, margen = 18) {
    if (!enemy || !bloque) return false;

    return (
      enemy.x < bloque.x + bloque.w + margen &&
      enemy.x + enemy.w > bloque.x - margen &&
      enemy.y < bloque.y + bloque.h + margen &&
      enemy.y + enemy.h > bloque.y - margen
    );
  }

  function actualizarEstadoEncierroEnemigo(enemy, dtMs) {
    if (!enemy) return;

    const RADIO_ESCAPE_ENCIERRO = 160;

    const estaEnConflicto =
      enemy.rodeando === true ||
      enemy.modoEscape === "buscar_arcilla" ||
      enemy.modoEscape === "romper_arcilla";

    if (!estaEnConflicto) {
      enemy.tiempoEncerrado = 0;
      enemy.encierroCheckTimer = 0;
      enemy.encierroOrigenX = enemy.x;
      enemy.encierroOrigenY = enemy.y;
      return;
    }

    if (
      typeof enemy.encierroOrigenX !== "number" ||
      typeof enemy.encierroOrigenY !== "number"
    ) {
      enemy.encierroOrigenX = enemy.x;
      enemy.encierroOrigenY = enemy.y;
    }

    const dxEscape = enemy.x - enemy.encierroOrigenX;
    const dyEscape = enemy.y - enemy.encierroOrigenY;
    const distanciaEscape = Math.hypot(dxEscape, dyEscape);

    if (distanciaEscape >= RADIO_ESCAPE_ENCIERRO) {
      enemy.tiempoEncerrado = 0;
      enemy.encierroCheckTimer = 0;
      enemy.encierroOrigenX = enemy.x;
      enemy.encierroOrigenY = enemy.y;
      return;
    }

    enemy.tiempoEncerrado = Number(enemy.tiempoEncerrado || 0) + dtMs;
    enemy.encierroCheckTimer = Number(enemy.encierroCheckTimer || 0) + dtMs;
  }

  function intentarActivarEscapeArcillaEnemigo(enemy) {
    if (!enemy) return false;
    if (enemy.tipo === "jefe") return false;
    const TIEMPO_ENCIERRO_MAX = 1000; //Tiempo de espera para que el enemigo ataque la arcilla para salir del encierro 15000 son 15segundos


    if ((enemy.tiempoEncerrado || 0) < TIEMPO_ENCIERRO_MAX) return false;

    // 🔒 NUEVA CONDICIÓN CLAVE
    if (!enemy.rodeando) return false;
    if (enemy.modoEscape === "buscar_arcilla" || enemy.modoEscape === "romper_arcilla") return true;

    const bloque = buscarBloqueArcillaMasCercano(enemy);
    //console.log("BLOQUE ARCILLA:", bloque);
    if (!bloque) return false;

    enemy.modoEscape = "buscar_arcilla";
    enemy.tiempoEscapeArcilla = 0;
    enemy.arcillaObjetivoId = bloque.zona_id;
    enemy.cooldownGolpeEscape = 0;
    enemy.tiempoEncerrado = 0;
    resetRodeoEnemigo(enemy);
    //console.log("ENCERRADO:", enemy.tiempoEncerrado);

    return true;
  }

  function procesarEscapeArcillaEnemigo(enemy, dtMs) {
    // ⏱️ Contador de tiempo en modo escape
    enemy.tiempoEscapeArcilla = (enemy.tiempoEscapeArcilla || 0) + dtMs;

    // ⛔ Si pasan 0.5 segundos, salir del modo escape
    if (enemy.tiempoEscapeArcilla >= 300) {
      enemy.modoEscape = "normal";
      enemy.arcillaObjetivoId = null;
      enemy.cooldownGolpeEscape = 0;
      enemy.tiempoEscapeArcilla = 0;
      return false;
    }

    if (!enemy) return false;

    const activo = intentarActivarEscapeArcillaEnemigo(enemy);
    if (!activo && enemy.modoEscape === "normal") return false;

    const bloque = (ambienteObjetos || []).find(obj =>
      obj &&
      obj.zona_id === enemy.arcillaObjetivoId &&
      esBloqueArcilla(obj)
    );

    if (!bloque) {
      resetEscapeArcillaEnemigo(enemy);
      return false;
    }

    const enemyCenterX = enemy.x + enemy.w / 2;
    const enemyCenterY = enemy.y + enemy.h / 2;
    const bloqueCenterX = bloque.x + bloque.w / 2;
    const bloqueCenterY = bloque.y + bloque.h / 2;

    const dx = bloqueCenterX - enemyCenterX;
    const dy = bloqueCenterY - enemyCenterY;
    const len = Math.hypot(dx, dy) || 1;

    enemy.dirX = dx / len;
    enemy.dirY = dy / len;

    if (enemigoEstaCercaDeBloqueArcilla(enemy, bloque, 14)) {
      enemy.modoEscape = "romper_arcilla";
      enemy.dirX = 0;
      enemy.dirY = 0;
      enemy.isMoving = false;
      enemy.frame = 0;
      enemy.frameTimer = 0;

      enemy.cooldownGolpeEscape = Number(enemy.cooldownGolpeEscape || 0) - dtMs;

      if (enemy.cooldownGolpeEscape <= 0) {
        aplicarDanioABloqueArcilla(
          bloque,
          Number(enemy.puntos_de_ataque ?? 1) || 1,
          bloqueCenterX,
          bloqueCenterY
        );

        enemy.cooldownGolpeEscape = 650;

        if (enemy.tiempoHablaCooldown <= 0 && Math.random() < 0.45) {
          hacerHablarEnemigo(enemy, "ataque");
        }
      }

      return true;
    }

    enemy.modoEscape = "buscar_arcilla";
    enemy.isMoving = true;

    const seMovio = moverEnemigoConRodeo(enemy, dtMs, enemy.dirX, enemy.dirY);

    if (seMovio) {
      enemy.frameTimer += dtMs;
      while (enemy.frameTimer >= enemy.frameDurationMs) {
        enemy.frameTimer -= enemy.frameDurationMs;
        enemy.frame = (enemy.frame + 1) % enemy.totalFrames;
      }
    } else {
      enemy.frame = 0;
      enemy.frameTimer = 0;
    }

    return true;
  }

  function empujarJugadorConColision(pushX, pushY) {
    let xFinal = player.x;
    let yFinal = player.y;

    const nextX = player.x + pushX;
    const nextY = player.y + pushY;

    const hitX = colisionAmbiente(
      nextX + PLAYER_OFFSET_X,
      player.y + PLAYER_OFFSET_Y,
      PLAYER_HIT_W,
      PLAYER_HIT_H
    );

    if (!hitX) {
      xFinal = nextX;
    }

    const hitY = colisionAmbiente(
      xFinal + PLAYER_OFFSET_X,
      nextY + PLAYER_OFFSET_Y,
      PLAYER_HIT_W,
      PLAYER_HIT_H
    );

    if (!hitY) {
      yFinal = nextY;
    }

    const leftLimit = 0;
    const topLimit = 0;
    const rightLimit = WORLD_W - HERO_W;
    const bottomLimit = WORLD_H - HERO_H;

    player.x = clamp(xFinal, leftLimit, rightLimit);
    player.y = clamp(yFinal, topLimit, bottomLimit);
  }

  function empujarEnemigoConColision(enemy, pushX, pushY) {
    if (!enemy) return;

    const hitW = Number(enemy.w || 64);
    const hitH = Number(enemy.h || 64);

    const nextX = enemy.x + pushX;
    const nextY = enemy.y + pushY;

    moverEntidadConColision(
      enemy,
      clamp(nextX, 0, WORLD_W - hitW),
      clamp(nextY, 0, WORLD_H - hitH),
      hitW,
      hitH
    );
  }

  function moverEntidadConColision(entidad, nextX, nextY, w, h) {
    const before = runGlobalFilterHook(
      "beforeEntityMove",
      {
        entidad,
        nextX,
        nextY,
        w,
        h,
        player,
        mapaOscuro
      },
      { nextX, nextY, w, h }
    ) || { nextX, nextY, w, h };

    let xFinal = entidad.x;
    let yFinal = entidad.y;

    const hitX = colisionAmbiente(before.nextX, entidad.y, before.w, before.h);
    if (!hitX) {
      xFinal = before.nextX;
    }

    const hitY = colisionAmbiente(xFinal, before.nextY, before.w, before.h);
    if (!hitY) {
      yFinal = before.nextY;
    }

    entidad.x = xFinal;
    entidad.y = yFinal;

    runGlobalHook("afterEntityMove", {
      entidad,
      nextX: before.nextX,
      nextY: before.nextY,
      finalX: entidad.x,
      finalY: entidad.y,
      w: before.w,
      h: before.h,
      hitX,
      hitY,
      player,
      mapaOscuro
    });
  }

  window._enyMoveEntityWithCollision = moverEntidadConColision;

  function proyectilColisionaAmbiente(x, y, w = 10, h = 10) {
    const before = runGlobalFilterHook(
      "beforeProjectileCollision",
      { x, y, w, h, player, mapaOscuro },
      { x, y, w, h }
    ) || { x, y, w, h };

    const result = !!colisionAmbiente(before.x, before.y, before.w, before.h);

    runGlobalHook("afterProjectileCollision", {
      x: before.x,
      y: before.y,
      w: before.w,
      h: before.h,
      result,
      player,
      mapaOscuro
    });

    return result;
  }

  window._enyMoveEntityWithCollision = moverEntidadConColision;
  // =======================================================================================
  // Lógica ambiente.jsons (fin)
  // =======================================================================================
  function drawEntityShadow(ctx, shadowImg, x, y, w, h, opts = {}) {
    // DEBUG: si no hay imagen, dibuja sombra fake
    if (!shadowImg || !shadowImg.complete) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.ellipse(
        x + w / 2,
        y + h * 0.9,
        w * 0.35,
        h * 0.15,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
      return;
    }

    const scaleW = opts.scaleW ?? 0.72;
    const scaleH = opts.scaleH ?? 0.30;
    const offsetY = opts.offsetY ?? 0.70;
    const alpha = opts.alpha ?? 0.34;

    const shadowW = Math.max(18, w * scaleW);
    const shadowH = Math.max(10, h * scaleH);

    const shadowX = x + (w - shadowW) / 2;
    const shadowY = y + (h * offsetY) - (shadowH / 2);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(shadowImg, shadowX, shadowY, shadowW, shadowH);
    ctx.restore();
  }

  function drawJugadorCompleto(ctx, images, heroDrawX, heroDrawY, sx, sy) {
    drawEntityShadow(ctx, images.shadow, heroDrawX, heroDrawY, HERO_DRAW_W, HERO_DRAW_H, {
      scaleW: 0.72,
      scaleH: 0.30,
      offsetY: 0.78,
      alpha: 0.34
    });

    ctx.save();
    ctx.fillStyle = "transparent";
    ctx.fillRect(
      heroDrawX + PLAYER_OFFSET_X,
      heroDrawY + PLAYER_OFFSET_Y,
      PLAYER_HIT_W,
      PLAYER_HIT_H
    );
    ctx.restore();

    drawShieldEffect(ctx, "back");
    drawTorchHeld(ctx, "back");
    drawTorchTrailParticles(ctx);

    if (player.blinkTimer <= 0 || Math.floor(player.blinkTimer / 60) % 2 === 0) {
      ctx.drawImage(
        images.hero,
        sx, sy, HERO_W, HERO_H,
        heroDrawX, heroDrawY,
        HERO_DRAW_W, HERO_DRAW_H
      );
    }

    drawTorchHeld(ctx, "front");
    drawShieldEffect(ctx, "front");

    drawParticulasBumerang(ctx);
    drawBumerangs(ctx);

    drawParticulasPicoEscabador(ctx);
    drawAtaquesPicoEscabador(ctx);

    drawParticulasEspadaMadera(ctx);
    drawAtaquesEspadaMadera(ctx);
    drawParticulasEspadaHierro(ctx);
    drawAtaquesEspadaHierro(ctx);

  }
  // =======================================================================================
  // Lógica de pintura en canvas (inicio)
  // =======================================================================================

  function draw(images) {

    ctx.shadowColor = "black";
    ctx.shadowBlur = 3;

    // reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    runGlobalHook("beforeDraw", {
      ctx,
      canvas,
      images,
      player,
      mapaOscuro,
      npcs,
      npcsAmbiente,
      enemigos: window.enemigos || [],
      ambienteObjetos
    });

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
        setGameState("gender");
        ctx.fillText("Seleccionar genero", 30, 40);
        ctx.fillText(lenzCaracter, selectorMaleX, selectorMaleY);
        ctx.fillText(lenzCaracterFemale, selectorFemaleX, selectorFemaleY);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        return;
      }

      // ===== 2️⃣ Selección de avatar =====
      if (checkingStep === "avatar" && selectedGender) {
        setGameState("avatar");
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
          ctx.fillText(username || "Jugador", previewX + previewSize / 2, previewY + previewSize + 28);
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
        setGameState("profession");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

        ctx.fillStyle = "white";
        ctx.font = "28px monospace";
        ctx.fillText("Elige tu profesion", 10, 30);

        const current = professions[professionIndex];

        const ui = getProfessionUI();
        const { boxX, boxY, boxW, boxH, btnSize, leftX, leftY, rightX, rightY } = ui;

        ctx.strokeStyle = "white";
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = "white";
        ctx.fillRect(leftX, leftY, btnSize, btnSize);
        ctx.fillRect(rightX, rightY, btnSize, btnSize);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("◀", leftX + btnSize / 2, leftY + 22);
        ctx.fillText("▶", rightX + btnSize / 2, rightY + 22);

        ctx.fillStyle = "white";
        ctx.fillText(`${professionIndex + 1}/${professions.length}`, boxX + boxW / 2, leftY + 12);
        ctx.textAlign = "start";

        const pad = 8;
        const contentX = boxX + pad;
        const contentY = boxY + pad;
        const contentW = boxW - pad * 2;
        const contentH = boxH - pad * 2;

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(current.name, boxX + boxW / 2, contentY - 20);
        ctx.textAlign = "start";

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

        ctx.save();

        const continueW = PROF_CONT_W;
        const continueH = PROF_CONT_H;

        const continueX = PROF_CONT_CENTERED
          ? Math.floor((LOGICAL_W - continueW) / 2)
          : PROF_CONT_X;

        const continueY = LOGICAL_H - continueH - PROF_CONT_BOTTOM_MARGIN;

        if (PROF_CONT_SHOW_HITBOX) {
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

        window.__profContinueHit = { x: continueX, y: continueY, w: continueW, h: continueH };

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        return;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    // 🟢 MODO PLAYING
    if (gameMode === "playing") {

      if (gameOverActive) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        return;
      }

      setGameState("gamePlay");

      if (!gameAssetsLoaded) {

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        loadingProgress += (loadingTarget - loadingProgress) * 0.08;

        if (logoImg) {
          const logoMaxWidth = 180;
          const logoRatio = logoImg.height / logoImg.width;

          const logoW = logoMaxWidth;
          const logoH = logoW * logoRatio;

          const logoX = (canvas.width - logoW) / 2;
          const barY = canvas.height / 2 + 40;
          const logoY = barY - logoH - 40;

          ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
        }

        const barWidth = 300;
        const barHeight = 18;

        const barX = (canvas.width - barWidth) / 2;
        const barY = canvas.height / 2 + 40;

        ctx.fillStyle = "#222";
        ctx.fillRect(barX, barY, barWidth, barHeight);

        ctx.shadowColor = "#00ffcc";
        ctx.fillStyle = "#00ffcc";
        ctx.fillRect(barX, barY, barWidth * loadingProgress, barHeight);

        ctx.strokeStyle = "white";
        ctx.strokeRect(barX, barY, barWidth, barHeight);

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

      ambienteViewX = camCenterX - viewW / 2;
      ambienteViewY = camCenterY - viewH / 2;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
      ctx.translate(-camCenterX, -camCenterY);

      ctx.drawImage(images.map, 0, 0, WORLD_W, WORLD_H);

      drawSkateParticles(ctx);

      //pruebaDeItems();
      drawItems(ctx);

      drawParticulasArcilla(ctx);

      drawExplosionesJefe(ctx, "back");
      drawParticulasVolcanJefe(ctx, "back");
      drawAtaquesEspecialesJefeBack(ctx);

      drawNPCs(ctx);
      drawNPCsAmbiente(ctx);
      drawEnemigos(ctx);

      drawDisparosEnemigosArmados(ctx);

      drawExplosionesJefe(ctx, "front");
      drawParticulasVolcanJefe(ctx, "front");
      drawAtaquesEspecialesJefeFront(ctx);

      drawDisparosLazer(ctx);



      drawHoverCanvasInteractive(ctx);

      for (let i = skateParticles.length - 1; i >= 0; i--) {
        const p = skateParticles[i];

        p.life -= 16;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = p.life / 500;

        ctx.save();
        ctx.globalAlpha = alpha;

        ctx.fillStyle = "#00ffcc";
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (p.life <= 0) {
          skateParticles.splice(i, 1);
        }
      }

      const heroDrawX = player.x + (espadaMaderaLunge.offsetX || 0);
      const heroDrawY = player.y + (espadaMaderaLunge.offsetY || 0);

      window.heroDrawX = heroDrawX;
      window.heroDrawY = heroDrawY;

      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const t = floatingTexts[i];

        ctx.save();
        ctx.fillStyle = t.color || "#ff1a1a";
        ctx.shadowColor = t.glow || "#ff0000";
        ctx.shadowBlur = 16;
        ctx.font = "20px arcade";
        ctx.textAlign = "center";
        ctx.fillText(t.valor, t.x, t.y);
        ctx.restore();

        t.y -= 0.4;
        t.vida -= 16;

        if (t.vida <= 0) {
          floatingTexts.splice(i, 1);
        }
      }

      const row = rowForFacing(player.facing);
      const frameToDraw = espadaMaderaFrameOverride.active
        ? espadaMaderaFrameOverride.frame
        : player.frame;

      const sx = frameToDraw * HERO_W;
      const sy = row * HERO_H;

      drawArcillaCapa(ctx, "back");
      drawAmbienteCapa(ctx, "back");

      drawJugadorCompleto(ctx, images, heroDrawX, heroDrawY, sx, sy);


      //Elementos dibujados de manera dinamica por scripts Externos (inicio)
      runGlobalHook("afterDrawWorld", {
        ctx,
        canvas,
        images,
        player,
        mapaOscuro,
        npcs,
        npcsAmbiente,
        enemigos: window.enemigos || [],
        ambienteObjetos
      });
      drawCameraCullingDebug(ctx);
      runGlobalHook("afterDraw", {
        ctx,
        canvas,
        images,
        player,
        mapaOscuro,
        npcs,
        npcsAmbiente,
        enemigos: window.enemigos || [],
        ambienteObjetos
      });
      //Elementos dibujados de manera dinamica por scripts Externos (inicio)

      drawAmbienteCapa(ctx, "front");
      drawArcillaCapa(ctx, "front");
      drawIlumSistemaMapa(ctx);

      drawBubblesNPCsAmbiente(ctx);
      drawBubblesEnemigos(ctx);


      drawParticulasImpactoBloque(ctx);

      runGlobalHook("beforeDarkness", {
        ctx,
        canvas,
        images,
        player,
        mapaOscuro,
        npcs,
        npcsAmbiente,
        enemigos: window.enemigos || [],
        ambienteObjetos
      });
      // oscuridad del mapa
      drawDarknessOverlay(camCenterX, camCenterY, viewW, viewH);
      runGlobalHook("afterDarkness", {
        ctx,
        canvas,
        images,
        player,
        mapaOscuro,
        npcs,
        npcsAmbiente,
        enemigos: window.enemigos || [],
        ambienteObjetos
      });

      //Ojos demoniacos encima de la oscuridad
      for (const npc of npcs || []) {
        if (!entityIsVisible(npc)) continue;
        if (!entidadEstaEnZonaIluminada(npc)) {
          drawOjosDemoniacos(ctx, npc);
        }
      }

      for (const npc of npcsAmbiente || []) {
        if (!entityIsVisible(npc)) continue;
        if (!entidadEstaEnZonaIluminada(npc)) {
          drawOjosDemoniacos(ctx, npc);
        }
      }

      for (const enemy of (window.enemigos || [])) {
        if (!entityIsVisible(enemy)) continue;
        if (!entidadEstaEnZonaIluminada(enemy)) {
          drawOjosDemoniacos(ctx, enemy);
        }
      }

      drawCameraCullingDebug(ctx);

      ctx.restore();

      ctx.save();
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      ctx.fillStyle = "transparent";
      ctx.fillRect(4, 4, 110, 18);

      ctx.fillStyle = "lime";
      ctx.font = "18px arcade";
      ctx.textAlign = "start";
      ctx.fillText(`X:${Math.floor(player.x)} Y:${Math.floor(player.y)}`, 24, 34);

      ctx.restore();

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (cosmonedaImg) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const size = 32;
        const margin = 12;
        const spacing = 8;

        ctx.font = "18px arcade";
        ctx.textBaseline = "middle";

        const valueText = String(cosmonedas);
        const textWidth = ctx.measureText(valueText).width;

        const totalWidth = size + spacing + textWidth;
        const startX = canvas.width - totalWidth - margin;
        const centerY = margin + size / 2;

        ctx.drawImage(cosmonedaImg, startX, margin, size, size);

        ctx.fillStyle = "yellow";
        ctx.textAlign = "left";
        ctx.fillText(valueText, startX + size + spacing, centerY);

        ctx.restore();
      }

      drawLifeBar(ctx, canvas, pdv, PDV_MAX);

      if (window.equipSlots && window.equipSlots.length) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;

        //const barWidth = 18;
        const barHeight = 140;
        const marginLeft = 12;

        const barX = marginLeft;
        const barY = (canvas.height / 2) - (barHeight / 2) + 200; //eje y sección de ataques

        const slotSize = 42;
        const slotGap = 10;

        const startX = barX;
        const totalHudHeight = (slotSize * window.equipSlots.length) + (slotGap * (window.equipSlots.length - 1));
        const startY = barY - totalHudHeight - 14;

        window.hudEquipHitboxes = [];

        window.equipSlots.forEach((item, i) => {
          const x = startX;
          const y = startY + i * (slotSize + slotGap);

          window.hudEquipHitboxes.push({
            slotIndex: i,
            x,
            y,
            w: slotSize,
            h: slotSize
          });

          ctx.fillStyle = "#111";
          ctx.fillRect(x, y, slotSize, slotSize);

          ctx.strokeStyle = "#00ffcc";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, slotSize, slotSize);

          const hudKeyLabel = i === 0 ? "Q" : (i === 1 ? "E" : "");

          if (hudKeyLabel) {
            ctx.fillStyle = "black";
            ctx.fillRect(x + 2, y + 2, 14, 12);

            ctx.fillStyle = "#00ffcc";
            ctx.font = "18px arcade";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(hudKeyLabel, x + 19, y + 20);
          }

          if (!item) return;

          if (!item._hudImg) {
            item._hudImg = new Image();
            item._hudImg.src = item.imagen;
          }

          if (item._hudImg.complete && item._hudImg.naturalWidth > 0) {
            ctx.drawImage(item._hudImg, x + 3, y + 3, slotSize - 6, slotSize - 6);
          }

          const usosActuales = item.usos ?? item.usos_restantes ?? item.cantidad ?? 1;
          const usosMaximos = item.usos_maximos ?? usosActuales;
          const esAgotable = item.agotable === true;

          if (esAgotable && usosMaximos > 0) {
            const barraX = x + 2;
            const barraY = y - 7;
            const barraW = slotSize - 4;
            const barraH = 5;
            const progreso = Math.max(0, Math.min(1, usosActuales / usosMaximos));

            ctx.fillStyle = "#222";
            ctx.fillRect(barraX, barraY, barraW, barraH);

            ctx.fillStyle = "#00ffcc";
            ctx.fillRect(barraX, barraY, barraW * progreso, barraH);

            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.strokeRect(barraX, barraY, barraW, barraH);

            ctx.fillStyle = "black";
            ctx.fillRect(x + slotSize - 18, y + slotSize - 14, 16, 12);

            ctx.fillStyle = "white";
            ctx.font = "10px arcade";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(String(usosActuales), x + slotSize - 10, y + slotSize - 8);
          }
        });


        ctx.restore();
      } else {
        window.hudEquipHitboxes = [];
      }


      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }


  // =======================================================================================
  // Lógica de pintura en canvas (fin)
  // =======================================================================================

  async function start() {
    await loadGlobalScripts();

    runGlobalHook("onInit", {
      player,
      ctx,
      canvas,
      images
    });

    let last = performance.now();
    const MAX_DT = 33; // evita saltos grandes de física/lógica
    const MIN_DT = 0;
    //let rafId = null;

    function loop(now) {
      let dt = now - last;
      last = now;

      if (!Number.isFinite(dt)) dt = 16.67;
      if (dt < MIN_DT) dt = MIN_DT;
      if (dt > MAX_DT) dt = MAX_DT;

      const enemigosActivos = window.enemigos || [];

      runGlobalHook("beforeUpdate", {
        dt,
        player,
        ctx,
        canvas,
        images,
        npcs,
        npcsAmbiente,
        enemigos: enemigosActivos,
        ambienteObjetos
      });

      update(dt);

      runGlobalHook("afterUpdate", {
        dt,
        player,
        ctx,
        canvas,
        images,
        npcs,
        npcsAmbiente,
        enemigos: enemigosActivos,
        ambienteObjetos
      });

      draw(images);

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
  }

  // solo precarga miniaturas (para selección)
  preloadAvatars(characters)
    .catch(err => console.error("Error precargando avatares:", err));

  //--NPC's ambiente (inicio)
  async function initNPCsAmbiente() {
    npcsAmbiente = await cargarNPCsAmbiente();
    window.npcsAmbiente = npcsAmbiente;

    await preloadNPCsAmbiente(npcsAmbiente);

    for (const npc of npcsAmbiente) {
      decidirNuevaAccionNPCambiente(npc);
      npc.tiempoHablaCooldown = randomInt(2000, 9000);
    }
  }

  //--Enemigos
  async function initEnemigos() {
    enemigos = await cargarEnemigos();
    window.enemigos = enemigos;

    await preloadEnemigos(enemigos);
  }

  //--NPC's ambiente (fin)
  async function initNPCs() {
    npcs = await cargarNPCsDesdeMisiones();
    window.npcs = npcs;

    await preloadNPCs(npcs);
  }

  (async () => {
    await initNPCs();
    await initNPCsAmbiente();
    await initEnemigos();
    await cargarAmbiente();

    await cargarIlumSistemaMapa();
    await preloadIlumSistemaMapa();

    //console.log("Carga inicial completa de ilumSystem:", ilumSistemaMapa);
  })();

  (async () => {
    await cargarIlumSistemaMapa();
    await preloadIlumSistemaMapa();
    //console.log("IlumSystem imágenes listas:", ilumSistemaMapa);
  })();

  //--Dibujar elementos ambiente.json (inicio)
  canvas.addEventListener("pointerdown", function (e) {
    if (gameMode !== "playing") return;
    if (npcDialogOpen) return;

    const rect = canvas.getBoundingClientRect();

    const mx = ((e.clientX - rect.left) / CAMERA_ZOOM) + ambienteViewX;
    const my = ((e.clientY - rect.top) / CAMERA_ZOOM) + ambienteViewY;

    for (const obj of ambienteObjetos) {
      if (!obj) continue;
      if (!String(obj.tipo || "").includes("cliqueable")) continue;

      if (
        mx >= obj.x &&
        mx <= obj.x + obj.w &&
        my >= obj.y &&
        my <= obj.y + obj.h
      ) {
        if (obj.funcion && typeof window[obj.funcion] === "function") {
          e.preventDefault();
          e.stopPropagation();
          window[obj.funcion]();
          return;
        }
      }
    }
  }, { capture: true, passive: false });
  //--Dibujar elementos ambiente.json (fin)

  // decide si muestra checking o playing (pero playing mostrará “Cargando...” hasta que haya assets)
  checkUserProfile();

  // arranca el loop
  //ensureMissionUIStyles();
  start().catch(err => {
    console.error("Error iniciando juego con globalScripts:", err);
  });

  // si al recargar ya tiene perfil completo, carga assets de una vez
  if (gameMode === "playing") {
    loadGameAssets().then(() => {

      // si quieres, puedes revalidar aquí
      // (no es obligatorio, el draw ya se actualizará en el siguiente frame)
    });
  }
})();

/*ESPACIO DE NUEVAS FUNCIONES PARA MAPAS INDIVIDUALES (INICIO) */
//En este espacio se pondrán las funciones inerentes a las misiones he interacciones en cada mapa por individual. ya que cada mapa tendrá su sistema de misiones. internas.


/* =========================================================
   ALGORITMOS DE CONOCIMIENTO - POPUP REUTILIZABLE ENYCOSMIC
   ========================================================= */

const ALGORITMO_CONOCIMIENTO_CONFIG = {
  voynich: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "MANUSCRITO VOYNICH",
    primary: "#39a8ff",
    secondary: "#0a2d5f",
    accent: "#8fd3ff",
    danger: "#ff4d6d",
    glyphs: "ᚠ⍜⎍⟟⌇∆⟊⟒⌰⟒⊬⋔⟒⌇⟟⊑⍜⊬⎎⟟⩔",
    hint: "Pedestal activo. Algoritmo detectado. Lectura parcial bloqueada por una incriptación desconocida.",
    placeholder: "Clave de descifrado"
  },

  tesla: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "TESLA",
    primary: "#6c41ff",
    secondary: "#1b103f",
    accent: "#b6a2ff",
    danger: "#ff5a7a",
    glyphs: "Ψ Ω Σ Φ ∆ λ ⟟ ⌇ ⍜ ⊬ ⨁ Ψ",
    hint: "Pedestal activo. Algoritmo detectado. Patrón energético alterado por un bloqueo de origen no identificado.",
    placeholder: "Clave de descifrado"
  },

  hacker: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "HACKER",
    primary: "#44ff88",
    secondary: "#09321c",
    accent: "#b7ffd0",
    danger: "#ff5a7a",
    glyphs: "₿ ⌘ ⍜ ⊬ ⨁ ⎎ ⟟ ∆ ⌰ ⌇ 101101",
    hint: "Pedestal activo. Algoritmo detectado. Lenguaje interno cubierto por cifrado ajeno.",
    placeholder: "Clave de descifrado"
  },

  mecanica: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "MECÁNICO",
    primary: "#ffbe2e",
    secondary: "#4a2800",
    accent: "#ffe2a3",
    danger: "#ff5a7a",
    glyphs: "⚙ ω r₁ r₂ ∆ τ ⌬ 011010",
    hint: "Pedestal activo. Algoritmo detectado. Estructura de conocimiento bloqueada por intervención desconocida.",
    placeholder: "Clave de descifrado"
  },

  matlog: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "MATLOG",
    primary: "#5f8dff",
    secondary: "#2a0f4f",
    accent: "#d1c4ff",
    danger: "#ff5a7a",
    glyphs: "∴ ∵ ∑ ⊢ ⊨ ⇌ ∆ ⍜ ⎎ ⌇",
    hint: "Pedestal activo. Algoritmo detectado. Secuencia matemática incriptada por una fuente desconocida.",
    placeholder: "Clave de descifrado"
  },

  logico: {
    title: "ALGORITMO INCRIPTADO",
    subtitle: "LÓGICO",
    primary: "#37e8ff",
    secondary: "#082d36",
    accent: "#b8f7ff",
    danger: "#ff5a7a",
    glyphs: "⊢ ⇒ ⇔ ∀ ∃ ⌇ ⍜ ⊬ ⟟ ∆",
    hint: "Pedestal activo. Algoritmo detectado. Lectura lógica detenida por una alteración no autorizada.",
    placeholder: "Clave de descifrado"
  }
};

function ensureAlgoritmoConocimientoStyles() {
  if (document.getElementById("algoritmo-conocimiento-styles")) return;

  const style = document.createElement("style");
  style.id = "algoritmo-conocimiento-styles";
  style.textContent = `
    @keyframes enyAlgoPulse {
      0% { opacity: 0.25; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.03); }
      100% { opacity: 0.25; transform: scale(1); }
    }

    @keyframes enyAlgoScan {
      0% { transform: translateY(-120%); opacity: 0; }
      15% { opacity: 0.8; }
      100% { transform: translateY(320%); opacity: 0; }
    }

    @keyframes enyAlgoFlicker {
      0%, 100% { opacity: 1; }
      10% { opacity: 0.9; }
      20% { opacity: 1; }
      30% { opacity: 0.75; }
      40% { opacity: 1; }
      50% { opacity: 0.85; }
      60% { opacity: 1; }
      70% { opacity: 0.8; }
      80% { opacity: 1; }
      90% { opacity: 0.95; }
    }

    @keyframes enyAlgoAlarm {
      0% { transform: translateX(0); }
      20% { transform: translateX(-4px); }
      40% { transform: translateX(4px); }
      60% { transform: translateX(-3px); }
      80% { transform: translateX(3px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
}

function playAlgoritmoErrorSound() {
  if (typeof playerrorSound === "function") {
    playerrorSound();
    return;
  }

  try {
    const audio = new Audio("https://enycosmicplayer.vercel.app/assets/song/efect/error.mp3");
    audio.volume = 0.9;
    audio.play().catch(() => { });
  } catch (e) { }
}

function closeAlgoritmoConocimientoPopup() {
  const popup = document.getElementById("algoritmo-conocimiento-overlay");
  if (popup) popup.remove();
}

function createAlienMatrixLine(chars) {
  const line = document.createElement("div");
  line.textContent = chars;
  line.style.whiteSpace = "nowrap";
  line.style.fontSize = "11px";
  line.style.lineHeight = "11px";
  line.style.opacity = (0.12 + Math.random() * 0.18).toFixed(2);
  line.style.letterSpacing = "1px";
  line.style.userSelect = "none";
  return line;
}

function fillAlienMatrix(container, chars, color) {
  container.innerHTML = "";
  container.style.color = color;

  for (let i = 0; i < 55; i++) {
    let row = "";
    for (let j = 0; j < 70; j++) {
      row += chars[Math.floor(Math.random() * chars.length)] + " ";
    }
    container.appendChild(createAlienMatrixLine(row));
  }
}

function mostrarAlarmaAlgoritmo(panel, mensaje, colorPeligro) {
  panel.textContent = mensaje;
  panel.style.display = "block";
  panel.style.color = colorPeligro;
  panel.style.borderColor = colorPeligro;
  panel.style.boxShadow = `0 0 10px ${colorPeligro}`;
  panel.style.animation = "enyAlgoAlarm 0.32s linear 2";

  setTimeout(() => {
    panel.style.animation = "";
  }, 700);
}

function abrirAlgoritmoConocimientoPopup(configKey = "voynich") {
  ensureAlgoritmoConocimientoStyles();
  closeAlgoritmoConocimientoPopup();

  const cfg = ALGORITMO_CONOCIMIENTO_CONFIG[configKey] || ALGORITMO_CONOCIMIENTO_CONFIG.voynich;

  const overlay = document.createElement("div");
  overlay.id = "algoritmo-conocimiento-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(0,0,0,0.72)";
  overlay.style.backdropFilter = "blur(4px)";
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeAlgoritmoConocimientoPopup();
  });

  const panel = document.createElement("div");
  panel.style.position = "relative";
  panel.style.width = "min(92vw, 640px)";
  panel.style.minHeight = "460px";
  panel.style.background = `linear-gradient(180deg, ${cfg.secondary} 0%, #02070d 100%)`;
  panel.style.border = `2px solid ${cfg.primary}`;
  panel.style.boxShadow = `0 0 28px ${cfg.primary}, inset 0 0 18px rgba(255,255,255,0.05)`;
  panel.style.overflow = "hidden";
  panel.style.fontFamily = '"Press Start 2P", monospace';
  panel.style.color = cfg.accent;

  const matrixBg = document.createElement("div");
  matrixBg.style.position = "absolute";
  matrixBg.style.inset = "0";
  matrixBg.style.overflow = "hidden";
  matrixBg.style.opacity = "0.85";
  matrixBg.style.pointerEvents = "none";
  fillAlienMatrix(matrixBg, cfg.glyphs, cfg.primary);

  const scanLine = document.createElement("div");
  scanLine.style.position = "absolute";
  scanLine.style.left = "0";
  scanLine.style.right = "0";
  scanLine.style.top = "0";
  scanLine.style.height = "80px";
  scanLine.style.background = `linear-gradient(180deg, transparent 0%, ${cfg.primary}22 40%, ${cfg.primary}55 50%, ${cfg.primary}22 60%, transparent 100%)`;
  scanLine.style.pointerEvents = "none";
  scanLine.style.animation = "enyAlgoScan 3s linear infinite";

  const noise = document.createElement("div");
  noise.style.position = "absolute";
  noise.style.inset = "0";
  noise.style.pointerEvents = "none";
  noise.style.background = "repeating-linear-gradient(180deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 4px)";
  noise.style.mixBlendMode = "screen";
  noise.style.opacity = "0.35";

  const header = document.createElement("div");
  header.style.position = "relative";
  header.style.zIndex = "2";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";
  header.style.padding = "14px 16px";
  header.style.borderBottom = `2px solid ${cfg.primary}`;
  header.style.background = "rgba(0,0,0,0.45)";

  const titleWrap = document.createElement("div");
  titleWrap.style.display = "flex";
  titleWrap.style.flexDirection = "column";
  titleWrap.style.gap = "6px";

  const title = document.createElement("div");
  title.textContent = cfg.title;
  title.style.fontSize = "15px";
  title.style.color = cfg.primary;
  title.style.textShadow = `0 0 10px ${cfg.primary}`;
  title.style.animation = "enyAlgoFlicker 2.2s infinite";

  const subtitle = document.createElement("div");
  subtitle.textContent = cfg.subtitle;
  subtitle.style.fontSize = "10px";
  subtitle.style.color = cfg.accent;
  subtitle.style.opacity = "0.95";

  titleWrap.appendChild(title);
  titleWrap.appendChild(subtitle);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.style.width = "42px";
  closeBtn.style.height = "42px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.border = `2px solid ${cfg.primary}`;
  closeBtn.style.background = "#050505";
  closeBtn.style.color = cfg.primary;
  closeBtn.style.fontFamily = '"Press Start 2P", monospace';
  closeBtn.style.fontSize = "16px";
  closeBtn.style.boxShadow = `0 0 10px ${cfg.primary}`;
  closeBtn.onclick = closeAlgoritmoConocimientoPopup;

  header.appendChild(titleWrap);
  header.appendChild(closeBtn);

  const content = document.createElement("div");
  content.style.position = "relative";
  content.style.zIndex = "2";
  content.style.padding = "22px 18px 20px";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.alignItems = "center";
  content.style.gap = "16px";

  const core = document.createElement("div");
  core.style.width = "130px";
  core.style.height = "130px";
  core.style.borderRadius = "50%";
  core.style.background = `radial-gradient(circle, ${cfg.accent} 0%, ${cfg.primary} 30%, ${cfg.secondary} 62%, transparent 72%)`;
  core.style.boxShadow = `0 0 20px ${cfg.primary}, 0 0 45px ${cfg.primary}, inset 0 0 18px rgba(255,255,255,0.4)`;
  core.style.animation = "enyAlgoPulse 1.8s ease-in-out infinite";

  const hint = document.createElement("div");
  hint.textContent = cfg.hint;
  hint.style.fontSize = "11px";
  hint.style.lineHeight = "1.8";
  hint.style.textAlign = "center";
  hint.style.maxWidth = "500px";
  hint.style.color = cfg.accent;
  hint.style.textShadow = `0 0 8px ${cfg.primary}`;

  const inputWrap = document.createElement("div");
  inputWrap.style.width = "100%";
  inputWrap.style.maxWidth = "470px";
  inputWrap.style.display = "flex";
  inputWrap.style.flexDirection = "column";
  inputWrap.style.gap = "8px";

  const inputLabel = document.createElement("div");
  inputLabel.textContent = "CLAVE DE ACCESO";
  inputLabel.style.fontSize = "10px";
  inputLabel.style.color = cfg.primary;
  inputLabel.style.textShadow = `0 0 8px ${cfg.primary}`;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = cfg.placeholder;
  input.autocomplete = "off";
  input.spellcheck = false;
  input.style.width = "100%";
  input.style.boxSizing = "border-box";
  input.style.padding = "14px 12px";
  input.style.background = "rgba(0,0,0,0.78)";
  input.style.border = `2px solid ${cfg.primary}`;
  input.style.color = cfg.accent;
  input.style.fontFamily = '"Press Start 2P", monospace';
  input.style.fontSize = "10px";
  input.style.outline = "none";
  input.style.boxShadow = `inset 0 0 12px ${cfg.primary}33, 0 0 10px ${cfg.primary}55`;

  const alarmBox = document.createElement("div");
  alarmBox.style.display = "none";
  alarmBox.style.width = "100%";
  alarmBox.style.boxSizing = "border-box";
  alarmBox.style.padding = "12px";
  alarmBox.style.fontSize = "10px";
  alarmBox.style.lineHeight = "1.8";
  alarmBox.style.textAlign = "center";
  alarmBox.style.background = "rgba(20,0,0,0.65)";
  alarmBox.style.border = `2px solid ${cfg.danger}`;
  alarmBox.style.textShadow = `0 0 6px ${cfg.danger}`;

  inputWrap.appendChild(inputLabel);
  inputWrap.appendChild(input);
  inputWrap.appendChild(alarmBox);

  const buttonRow = document.createElement("div");
  buttonRow.style.display = "flex";
  buttonRow.style.flexWrap = "wrap";
  buttonRow.style.justifyContent = "center";
  buttonRow.style.gap = "12px";
  buttonRow.style.marginTop = "6px";

  const aceptarBtn = document.createElement("button");
  aceptarBtn.type = "button";
  aceptarBtn.textContent = "ACEPTAR";
  aceptarBtn.style.minWidth = "150px";
  aceptarBtn.style.padding = "14px 16px";
  aceptarBtn.style.cursor = "pointer";
  aceptarBtn.style.border = `2px solid ${cfg.primary}`;
  aceptarBtn.style.background = "rgba(0,0,0,0.82)";
  aceptarBtn.style.color = cfg.primary;
  aceptarBtn.style.fontFamily = '"Press Start 2P", monospace';
  aceptarBtn.style.fontSize = "11px";
  aceptarBtn.style.boxShadow = `0 0 12px ${cfg.primary}`;

  const cerrarBtn = document.createElement("button");
  cerrarBtn.type = "button";
  cerrarBtn.textContent = "CERRAR";
  cerrarBtn.style.minWidth = "150px";
  cerrarBtn.style.padding = "14px 16px";
  cerrarBtn.style.cursor = "pointer";
  cerrarBtn.style.border = `2px solid ${cfg.accent}`;
  cerrarBtn.style.background = "rgba(0,0,0,0.82)";
  cerrarBtn.style.color = cfg.accent;
  cerrarBtn.style.fontFamily = '"Press Start 2P", monospace';
  cerrarBtn.style.fontSize = "11px";
  cerrarBtn.style.boxShadow = `0 0 12px ${cfg.primary}`;
  cerrarBtn.onclick = closeAlgoritmoConocimientoPopup;

  function intentarAcceso() {
    playAlgoritmoErrorSound();
    mostrarAlarmaAlgoritmo(
      alarmBox,
      "ACCESO NO AUTORIZADO",
      cfg.danger
    );
    input.focus();
    input.select();
  }

  aceptarBtn.onclick = intentarAcceso;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      intentarAcceso();
    }
  });

  buttonRow.appendChild(aceptarBtn);
  buttonRow.appendChild(cerrarBtn);

  content.appendChild(core);
  content.appendChild(hint);
  content.appendChild(inputWrap);
  content.appendChild(buttonRow);

  panel.appendChild(matrixBg);
  panel.appendChild(scanLine);
  panel.appendChild(noise);
  panel.appendChild(header);
  panel.appendChild(content);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  setTimeout(() => input.focus(), 60);
}

/* =========================================================
   FUNCIONES GLOBALES PARA USAR EN LOS BLOQUES DEL MAPA
   ========================================================= */

window.openAlgoritmoConocimientoPopup = function () {
  abrirAlgoritmoConocimientoPopup("voynich");
};

window.openAlgoritmoTeslaPopup = function () {
  abrirAlgoritmoConocimientoPopup("tesla");
};

window.openAlgoritmoHackerPopup = function () {
  abrirAlgoritmoConocimientoPopup("hacker");
};

window.openAlgoritmoMecanicaPopup = function () {
  abrirAlgoritmoConocimientoPopup("mecanica");
};

window.openAlgoritmoMatlogPopup = function () {
  abrirAlgoritmoConocimientoPopup("matlog");
};

window.openAlgoritmoLogicoPopup = function () {
  abrirAlgoritmoConocimientoPopup("logico");
};


// ======================================================
// SISTEMA REUTILIZABLE DE COMPUTADORES RETRO / DOCUMENTOS
// Estilo inspirado en sistemas operativos retro
// No modifica el motor base
// ======================================================

// ======================================================
// POPUP REUTILIZABLE: ACCESO NO AUTORIZADO
// Sistema externo / DOM / estilo Enycosmic
// ======================================================

function ensureAccesoNoAutorizadoStyles() {
  if (document.getElementById("acceso-no-autorizado-style")) return;

  const style = document.createElement("style");
  style.id = "acceso-no-autorizado-style";

  style.textContent = `
    #acceso-no-autorizado-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background:
        radial-gradient(circle at center, rgba(0, 255, 204, 0.10), transparent 42%),
        rgba(0, 0, 0, 0.72);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      font-family: arcade, monospace;
      pointer-events: auto;
    }

    #acceso-no-autorizado-panel {
      position: relative;
      width: min(92vw, 500px);
      background:
        linear-gradient(180deg, rgba(0, 255, 204, 0.08), rgba(0, 0, 0, 0.96)),
        #000;
      color: #ffffff;
      border: 3px solid #00ffcc;
      box-shadow:
        0 0 0 2px rgba(0, 70, 70, 0.9),
        0 0 18px rgba(0, 255, 204, 0.45),
        0 0 42px rgba(0, 255, 204, 0.22),
        inset 0 0 22px rgba(0, 255, 204, 0.08);
      overflow: hidden;
      box-sizing: border-box;
      animation: accesoNoAutorizadoEntrada 180ms ease-out;
    }

    #acceso-no-autorizado-panel::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0, 255, 204, 0.055) 0px,
          rgba(0, 255, 204, 0.055) 2px,
          transparent 2px,
          transparent 6px
        );
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: 0.55;
    }

    #acceso-no-autorizado-panel::after {
      content: "CLASSIFIED // ENYCOSMIC SYSTEM // ROUTE LOCKED";
      position: absolute;
      left: -20px;
      right: -20px;
      top: 54%;
      transform: rotate(-8deg);
      color: rgba(255, 40, 80, 0.13);
      font-size: 18px;
      letter-spacing: 3px;
      text-align: center;
      pointer-events: none;
      text-shadow: 0 0 12px rgba(255, 40, 80, 0.34);
    }

    #acceso-no-autorizado-header {
      position: relative;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 8px;
      box-sizing: border-box;
      background:
        linear-gradient(90deg, rgba(0,255,204,.22), rgba(0,0,0,.94), rgba(255,0,80,.18)),
        #050505;
      border-bottom: 2px solid rgba(0, 255, 204, 0.8);
      z-index: 2;
    }

    #acceso-no-autorizado-title {
      color: #ff3d6e;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-shadow:
        0 0 8px rgba(255, 61, 110, 0.95),
        0 0 16px rgba(255, 61, 110, 0.45);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #acceso-no-autorizado-close {
      width: 30px;
      height: 30px;
      padding: 0;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0,255,204,.18);
    }

    #acceso-no-autorizado-close:hover {
      background: #00ffcc;
      color: #000;
      box-shadow: 0 0 16px rgba(0,255,204,.8);
    }

    #acceso-no-autorizado-body {
      position: relative;
      z-index: 2;
      padding: 18px 16px 16px;
      box-sizing: border-box;
    }

    .acceso-no-autorizado-alerta {
      width: 74px;
      height: 74px;
      margin: 0 auto 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 61, 110, 0.9);
      color: #ff3d6e;
      font-size: 34px;
      background:
        radial-gradient(circle at center, rgba(255, 61, 110, 0.18), transparent 62%),
        rgba(0,0,0,.88);
      box-shadow:
        0 0 16px rgba(255, 61, 110, 0.48),
        inset 0 0 18px rgba(255, 61, 110, 0.12);
      text-shadow: 0 0 10px rgba(255, 61, 110, 0.95);
    }

    .acceso-no-autorizado-linea {
      margin: 0 auto 12px;
      max-width: 420px;
      color: #ffffff;
      font-size: 12px;
      line-height: 1.55;
      text-align: center;
      text-shadow: 0 0 8px rgba(0, 255, 204, 0.25);
    }

    .acceso-no-autorizado-linea.principal {
      color: #00ffcc;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow:
        0 0 8px rgba(0,255,204,.8),
        0 0 18px rgba(0,255,204,.35);
    }

    .acceso-no-autorizado-linea.clasificado {
      color: #ff3d6e;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-shadow:
        0 0 8px rgba(255, 61, 110, 0.86),
        0 0 18px rgba(255, 61, 110, 0.32);
    }

    .acceso-no-autorizado-encriptado {
      margin: 14px auto 0;
      padding: 8px;
      max-width: 420px;
      border: 1px solid rgba(0,255,204,.38);
      color: rgba(0,255,204,.72);
      background: rgba(0,255,204,.05);
      font-size: 9px;
      line-height: 1.5;
      text-align: center;
      letter-spacing: 1px;
      box-shadow: inset 0 0 14px rgba(0,255,204,.08);
    }

    #acceso-no-autorizado-actions {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
      padding: 0 16px 16px;
      box-sizing: border-box;
    }

    #acceso-no-autorizado-ok {
      min-height: 34px;
      padding: 7px 14px;
      background: #000;
      color: #00ffcc;
      border: 2px solid rgba(0,255,204,.86);
      font-family: arcade, monospace;
      font-size: 10px;
      cursor: pointer;
      text-transform: uppercase;
      box-shadow:
        0 0 10px rgba(0,255,204,.18),
        inset 0 0 8px rgba(0,255,204,.05);
    }

    #acceso-no-autorizado-ok:hover {
      background: #00ffcc;
      color: #000;
      box-shadow:
        0 0 12px #00ffcc,
        0 0 26px rgba(0,255,204,.62);
    }

    @keyframes accesoNoAutorizadoEntrada {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(8px);
      }

      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @media (max-width: 440px) {
      #acceso-no-autorizado-panel {
        width: 94vw;
      }

      .acceso-no-autorizado-linea {
        font-size: 11px;
      }

      .acceso-no-autorizado-linea.principal {
        font-size: 12px;
      }
    }
  `;

  document.head.appendChild(style);
}

function closeAccesoNoAutorizadoPopup() {
  const overlay = document.getElementById("acceso-no-autorizado-overlay");
  if (overlay) overlay.remove();
}

function openAccesoNoAutorizadoPopup() {
  ensureAccesoNoAutorizadoStyles();
  closeAccesoNoAutorizadoPopup();

  const overlay = document.createElement("div");
  overlay.id = "acceso-no-autorizado-overlay";

  overlay.innerHTML = `
    <div id="acceso-no-autorizado-panel">
      <div id="acceso-no-autorizado-header">
        <div id="acceso-no-autorizado-title">Acceso no autorizado</div>
        <button id="acceso-no-autorizado-close" type="button">X</button>
      </div>

      <div id="acceso-no-autorizado-body">
        <div class="acceso-no-autorizado-alerta">!</div>

        <p class="acceso-no-autorizado-linea principal">
          Acceso no autorizado
        </p>

        <p class="acceso-no-autorizado-linea">
          El sistema ha detectado una ruta activa, pero tus credenciales actuales no poseen autorización de ingreso.
        </p>

        <p class="acceso-no-autorizado-linea clasificado">
          Esta ruta permanece clasificada.
        </p>

        <div class="acceso-no-autorizado-encriptado">
          ENY://ROUTE_STATUS/LOCKED<br>
          ACCESS_KEY: ████-███-CLASSIFIED<br>
          SCHOOL_AUTHORITY: REQUIRED
        </div>
      </div>

      <div id="acceso-no-autorizado-actions">
<button id="acceso-no-autorizado-ok" type="button">
  Cerrar
</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector("#acceso-no-autorizado-close");
  const okBtn = overlay.querySelector("#acceso-no-autorizado-ok");

  function cerrarAccesoNoAutorizado(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();

      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }
    }

    if (typeof playtockSound === "function") {
      playtockSound();
    }

    closeAccesoNoAutorizadoPopup();
  }

  [closeBtn, okBtn].forEach(btn => {
    if (!btn) return;

    btn.addEventListener("click", cerrarAccesoNoAutorizado, true);

    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }
    }, { capture: true, passive: false });

    btn.addEventListener("pointerup", cerrarAccesoNoAutorizado, { capture: true, passive: false });
  });

  overlay.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof e.stopImmediatePropagation === "function") {
      e.stopImmediatePropagation();
    }

    if (e.target === overlay) {
      cerrarAccesoNoAutorizado(e);
    }
  }, { capture: true, passive: false });

  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof e.stopImmediatePropagation === "function") {
      e.stopImmediatePropagation();
    }
  }, true);
}

window.openAccesoNoAutorizadoPopup = openAccesoNoAutorizadoPopup;

const RETRO_PC_DOCS_CONFIG = {
  investigacionLunar: {
    osTitle: "Terminal de investigación",
    wordWindowTitle: "WordPad.exe",
    documentTitle: "Informe sobre el alunizaje",
    statusText: "Documento cargado correctamente",
    content: [
      "Informe sobre el alunizaje",
      "",
      "En el año 1969, el ser humano pisó por primera vez la superficie lunar. Fue uno de los hitos científicos y tecnológicos más importantes de la humanidad.",
      "",
      "Sin embargo, aquel acontecimiento no cerró las preguntas; por el contrario, abrió otras mucho más profundas. La curiosidad científica comenzó a superar los límites tecnológicos de la época.",
      "",
      "En 1971, durante una serie de observaciones astronómicas de alta precisión, uno de los telescopios más avanzados de la Tierra detectó una anomalía imposible en la cara oculta de la Luna.",
      "",
      "El objeto tenía una silueta alargada, similar a una estructura fusiforme o a un grano de arroz metálico. Sus dimensiones eran descomunales: aproximadamente el equivalente a 18 estadios de longitud.",
      "",
      "Para 1972, culminaron los estudios preliminares y se desarrollaron protocolos especiales para un alunizaje en la cara oculta de la Luna, con el objetivo de explorar aquella estructura no identificada.",
      "",
      "En 1973, una misión tripulada compuesta por 4 especialistas —entre ingenieros, médicos y expertos en conducta humana— descendió en una zona próxima a la anomalía.",
      "",
      "Al ingresar en la estructura, encontraron algo que desafiaba toda explicación conocida: tres restos biológicos de morfología humanoide.",
      "",
      "Uno de los cuerpos correspondía a una entidad femenina. Los otros dos parecían pertenecer a individuos masculinos.",
      "",
      "Medían más de 1.9 metros de altura, presentaban una prominencia ósea en la región frontal del cráneo y tenían 6 dedos en cada extremidad superior.",
      "",
      "El interior de la nave mostraba daños estructurales severos, marcas de impacto, zonas carbonizadas y señales compatibles con un conflicto de origen desconocido.",
      "",
      "Los registros preliminares sugieren que la nave pudo haber participado en algún tipo de enfrentamiento interestelar antes de quedar varada en la cara oculta de la Luna.",
      "",
      "¿Qué ocurrió allí?, ¿cuándo sucedió?, ¿quiénes eran esas entidades? y, sobre todo, ¿por qué terminaron ocultas en la Luna?"
    ]
  },

  ecuacionesGraficasBasicas: {
    osTitle: "Terminal educativa",
    wordWindowTitle: "WordPad.exe",
    documentTitle: "Ecuaciones gráficas",
    statusText: "Documento cargado correctamente",

    sections: [
      {
        type: "title",
        text: "Ecuaciones gráficas"
      },
      {
        type: "paragraph",
        text: "Una ecuación gráfica es una regla que convierte números en puntos dentro de un plano."
      },
      {
        type: "paragraph",
        text: "El plano tiene dos direcciones principales: x representa el movimiento horizontal, e y representa el movimiento vertical."
      },
      {
        type: "paragraph",
        text: "Cuando una ecuación nos da varios valores de x e y, podemos poner esos puntos en el plano. Al unirlos o mirarlos juntos, aparece una forma: una línea, una curva o un patrón."
      },

      {
        type: "subtitle",
        text: "Ejemplo básico: y = x"
      },
      {
        type: "paragraph",
        text: "En esta ecuación, y siempre vale lo mismo que x. Si x vale 1, y vale 1. Si x vale 2, y vale 2."
      },
      {
        type: "table",
        headers: ["x", "y"],
        rows: [
          ["0", "0"],
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica de y = x",
        xMin: 0,
        xMax: 4,
        yMin: 0,
        yMax: 4,
        points: [
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4]
        ]
      },
      {
        type: "paragraph",
        text: "El resultado es una línea diagonal que sube de forma ordenada."
      },

      {
        type: "subtitle",
        text: "Raíz cuadrada"
      },
      {
        type: "paragraph",
        text: "La raíz cuadrada busca el número que, multiplicado por sí mismo, da otro número."
      },
      {
        type: "paragraph",
        text: "Por ejemplo, la raíz cuadrada de 9 es 3, porque 3 × 3 = 9."
      },
      {
        type: "table",
        headers: ["x", "√x"],
        rows: [
          ["0", "0"],
          ["1", "1"],
          ["4", "2"],
          ["9", "3"],
          ["16", "4"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica de y = √x",
        xMin: 0,
        xMax: 16,
        yMin: 0,
        yMax: 4,
        points: [
          [0, 0],
          [1, 1],
          [4, 2],
          [9, 3],
          [16, 4]
        ]
      },
      {
        type: "paragraph",
        text: "Esta gráfica sube, pero cada vez más despacio."
      },

      {
        type: "subtitle",
        text: "Logaritmo base 10"
      },
      {
        type: "paragraph",
        text: "El logaritmo base 10 pregunta cuántas veces debemos usar el número 10 para llegar a otro número."
      },
      {
        type: "paragraph",
        text: "Por ejemplo, log10(100) = 2, porque 10 × 10 = 100."
      },
      {
        type: "table",
        headers: ["x", "log10(x)"],
        rows: [
          ["1", "0"],
          ["10", "1"],
          ["100", "2"],
          ["1000", "3"],
          ["10000", "4"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica de y = log10(x)",
        xMin: 1,
        xMax: 10000,
        yMin: 0,
        yMax: 4,
        points: [
          [1, 0],
          [10, 1],
          [100, 2],
          [1000, 3],
          [10000, 4]
        ]
      },
      {
        type: "paragraph",
        text: "La gráfica del logaritmo crece, pero lo hace lentamente. Sirve para entender números muy grandes de una forma más simple."
      },

      {
        type: "subtitle",
        text: "Seno"
      },
      {
        type: "paragraph",
        text: "El seno ayuda a medir movimientos que suben y bajan, como una ola."
      },
      {
        type: "paragraph",
        text: "En una gráfica, el seno forma una curva suave que sube, baja y vuelve a repetirse."
      },
      {
        type: "table",
        headers: ["ángulo", "seno"],
        rows: [
          ["0°", "0"],
          ["90°", "1"],
          ["180°", "0"],
          ["270°", "-1"],
          ["360°", "0"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica simple del seno",
        xMin: 0,
        xMax: 360,
        yMin: -1,
        yMax: 1,
        points: [
          [0, 0],
          [90, 1],
          [180, 0],
          [270, -1],
          [360, 0]
        ]
      },

      {
        type: "subtitle",
        text: "Coseno"
      },
      {
        type: "paragraph",
        text: "El coseno también forma una curva de ola, pero empieza desde arriba."
      },
      {
        type: "paragraph",
        text: "Seno y coseno se parecen mucho. Ambos sirven para estudiar giros, ondas, círculos, luz, sonido y movimiento."
      },
      {
        type: "table",
        headers: ["ángulo", "coseno"],
        rows: [
          ["0°", "1"],
          ["90°", "0"],
          ["180°", "-1"],
          ["270°", "0"],
          ["360°", "1"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica simple del coseno",
        xMin: 0,
        xMax: 360,
        yMin: -1,
        yMax: 1,
        points: [
          [0, 1],
          [90, 0],
          [180, -1],
          [270, 0],
          [360, 1]
        ]
      },

      {
        type: "subtitle",
        text: "Tangente"
      },
      {
        type: "paragraph",
        text: "La tangente ayuda a comparar inclinaciones. Sirve para saber qué tan empinada puede ser una dirección."
      },
      {
        type: "paragraph",
        text: "Cuando la tangente crece mucho, la línea se vuelve casi vertical."
      },
      {
        type: "table",
        headers: ["ángulo", "tangente"],
        rows: [
          ["0°", "0"],
          ["30°", "0.58"],
          ["45°", "1"],
          ["60°", "1.73"]
        ]
      },
      {
        type: "chart",
        title: "Gráfica simple de la tangente",
        xMin: 0,
        xMax: 60,
        yMin: 0,
        yMax: 2,
        points: [
          [0, 0],
          [30, 0.58],
          [45, 1],
          [60, 1.73]
        ]
      },

      {
        type: "subtitle",
        text: "Idea final"
      },
      {
        type: "paragraph",
        text: "Una ecuación es una regla matemática. Una gráfica es la forma visual de esa regla."
      },
      {
        type: "paragraph",
        text: "Al mirar la gráfica, podemos entender cómo cambia una cantidad cuando otra cambia."
      },
      {
        type: "paragraph",
        text: "Por eso las ecuaciones gráficas son útiles para estudiar caminos, alturas, ondas, energía, sonidos, movimiento y muchos fenómenos del universo."
      }
    ]
  },

  quimicaDestilador: {
    osTitle: "Terminal de laboratorio",
    wordWindowTitle: "WordPad.exe",
    documentTitle: "Materia, minerales y destilación",
    statusText: "Documento cargado correctamente",

    sections: [
      {
        type: "title",
        text: "Materia, minerales y destilación"
      },
      {
        type: "paragraph",
        text: "La materia es todo aquello que tiene masa y ocupa espacio. El agua, el aire, una roca, un grano de sal, una gota de lluvia y el hierro son formas de materia."
      },
      {
        type: "paragraph",
        text: "La materia puede cambiar de forma, mezclarse, separarse y transformarse. Comprender esas propiedades permite estudiar el agua, los minerales, los alimentos, el cuerpo humano, la energía y muchos procesos de la naturaleza."
      },
      {
        type: "chem_states"
      },

      {
        type: "subtitle",
        text: "Estados de la materia"
      },
      {
        type: "paragraph",
        text: "En un sólido, las partículas están muy juntas. Por eso una piedra, un cristal de sal o un trozo de hierro mantienen su forma."
      },
      {
        type: "paragraph",
        text: "En un líquido, las partículas siguen cerca, pero pueden moverse unas sobre otras. Por eso el agua puede fluir, llenar un recipiente y cambiar de forma sin dejar de ser agua."
      },
      {
        type: "paragraph",
        text: "En un gas, las partículas están mucho más separadas. Por eso el vapor de agua puede subir, expandirse y ocupar más espacio."
      },

      {
        type: "subtitle",
        text: "Agua mineralizada"
      },
      {
        type: "paragraph",
        text: "El agua mineralizada contiene pequeñas cantidades de minerales disueltos. Aunque parezca transparente, puede llevar sodio, cloruro, calcio, magnesio, potasio, bicarbonatos y trazas de hierro."
      },
      {
        type: "paragraph",
        text: "Cuando un mineral se disuelve en agua, muchas veces se separa en partículas cargadas llamadas iones. Esos iones son tan pequeños que no se ven a simple vista, pero cambian las propiedades del agua."
      },
      {
        type: "paragraph",
        text: "Por eso dos vasos de agua pueden verse iguales, pero comportarse distinto: uno puede tener más minerales, otro menos; uno puede conducir mejor la electricidad, otro casi nada."
      },

      {
        type: "subtitle",
        text: "Por qué el agua mineralizada conduce electricidad"
      },
      {
        type: "paragraph",
        text: "El agua extremadamente pura conduce muy poco la electricidad porque casi no tiene partículas cargadas moviéndose dentro de ella."
      },
      {
        type: "paragraph",
        text: "Cuando el agua tiene minerales disueltos, aparecen iones. Los iones pueden moverse por el líquido y transportar carga eléctrica. Por eso el agua mineralizada es más conductiva que el agua muy pura."
      },
      {
        type: "table",
        headers: ["Tipo de agua", "Cantidad de iones", "Conductividad"],
        rows: [
          ["Agua muy pura", "Muy pocos", "Muy baja"],
          ["Agua potable común", "Algunos", "Media"],
          ["Agua mineralizada", "Más iones", "Mayor"],
          ["Agua salada", "Muchos iones", "Alta"]
        ]
      },
      {
        type: "paragraph",
        text: "Esta propiedad se usa en laboratorios, sensores, cultivos hidropónicos, análisis de calidad del agua y estudios ambientales."
      },

      {
        type: "subtitle",
        text: "El destilador"
      },
      {
        type: "distiller_diagram"
      },
      {
        type: "paragraph",
        text: "Un destilador usa calor para separar sustancias aprovechando sus diferentes puntos de cambio. El agua puede evaporarse, subir como vapor y luego condensarse otra vez como líquido."
      },
      {
        type: "paragraph",
        text: "Los minerales disueltos no evaporan de la misma manera que el agua. Cuando el agua se evapora, muchas sales quedan atrás y se concentran en el recipiente."
      },
      {
        type: "paragraph",
        text: "Si el calentamiento continúa, queda menos agua líquida y la concentración de minerales aumenta. Luego esos minerales pueden estudiarse, filtrarse, cristalizarse o separarse con otros métodos."
      },

      {
        type: "subtitle",
        text: "Pasos básicos de una separación por destilación"
      },
      {
        type: "table",
        headers: ["Paso", "Qué ocurre", "Resultado"],
        rows: [
          ["1. Calentar", "El agua recibe energía térmica", "Las partículas se mueven más rápido"],
          ["2. Evaporar", "Parte del agua pasa a vapor", "El vapor se separa de muchos minerales"],
          ["3. Condensar", "El vapor se enfría", "Vuelve a formar agua líquida"],
          ["4. Concentrar", "Los minerales quedan en menor cantidad de agua", "La mezcla se vuelve más rica en sales"],
          ["5. Separar", "Se filtra, evapora o cristaliza", "Se obtienen residuos minerales"]
        ]
      },

      {
        type: "subtitle",
        text: "Sal disuelta en el agua"
      },
      {
        type: "paragraph",
        text: "La sal común se llama cloruro de sodio. Cuando entra en el agua, puede separarse en dos tipos de iones: sodio y cloruro."
      },
      {
        type: "paragraph",
        text: "Esos iones quedan repartidos por el agua. No flotan como granos visibles; están distribuidos a escala microscópica."
      },
      {
        type: "paragraph",
        text: "Si el agua se evapora poco a poco, los iones se concentran. Cuando queda muy poca agua, la sal puede volver a formar cristales."
      },

      {
        type: "subtitle",
        text: "Hierro en el agua"
      },
      {
        type: "paragraph",
        text: "El hierro puede aparecer en el agua en cantidades muy pequeñas. A veces está disuelto como ion; otras veces puede estar asociado a partículas, óxidos o sedimentos."
      },
      {
        type: "paragraph",
        text: "Cuando el hierro se oxida, puede formar materiales rojizos o marrones. Por eso algunas aguas dejan manchas de color óxido en piedras, tuberías o recipientes."
      },
      {
        type: "paragraph",
        text: "Separar hierro del agua suele ser más difícil que concentrar sal, porque normalmente aparece en cantidades mucho menores."
      },

      {
        type: "subtitle",
        text: "Ejemplo aproximado por cada gota"
      },
      {
        type: "paragraph",
        text: "Supongamos una gota de agua de 0.05 mL. Si esa agua contiene 250 mg/L de sales disueltas y 0.3 mg/L de hierro, cada gota tendría una cantidad pequeñísima de minerales, pero un número enorme de partículas."
      },
      {
        type: "table",
        headers: ["Contenido en una gota", "Cantidad aproximada", "Interpretación"],
        rows: [
          ["Volumen de la gota", "0.05 mL", "Una gota pequeña"],
          ["Sales disueltas", "0.0125 mg", "Cantidad visible solo al acumular muchas gotas"],
          ["Hierro disuelto", "0.000015 mg", "Una traza microscópica"],
          ["Unidades de sal", "≈ 1.3 × 10^17", "Un número inmenso de partículas"],
          ["Iones de hierro", "≈ 1.6 × 10^14", "También muchísimos, aunque la masa sea mínima"]
        ]
      },
      {
        type: "paragraph",
        text: "Esto muestra una idea importante: algo puede pesar casi nada y aun así contener muchísimas partículas."
      },

      {
        type: "subtitle",
        text: "Cuánta agua se necesita para reunir 1 gramo"
      },
      {
        type: "paragraph",
        text: "La cantidad de agua necesaria depende de la concentración mineral. Si hay muchos minerales por litro, se necesita menos agua. Si hay pocos minerales por litro, se necesita mucha más."
      },
      {
        type: "table",
        headers: ["Sustancia", "Concentración usada como ejemplo", "Agua necesaria para 1 g"],
        rows: [
          ["Sales disueltas", "250 mg/L", "≈ 4 litros"],
          ["Hierro disuelto", "0.3 mg/L", "≈ 3333 litros"]
        ]
      },
      {
        type: "paragraph",
        text: "El cálculo es simple: 1 gramo equivale a 1000 miligramos. Si un litro tiene 250 mg de sales, entonces 1000 ÷ 250 = 4 litros."
      },
      {
        type: "paragraph",
        text: "Para el hierro del ejemplo: 1000 ÷ 0.3 = 3333. Por eso se necesitarían miles de litros para acumular 1 gramo de hierro si la concentración fuera tan baja."
      },

      {
        type: "subtitle",
        text: "Curiosidad: hierro en la arena de la playa"
      },
      {
        type: "paragraph",
        text: "En algunas playas existe arena oscura rica en minerales de hierro, como magnetita. La magnetita puede responder a un imán porque tiene propiedades magnéticas."
      },
      {
        type: "paragraph",
        text: "Una forma sencilla de observarlo es acercar un imán cubierto con una bolsa plástica a arena seca. Algunas partículas oscuras pueden pegarse a la zona del imán. Al retirar la bolsa, esas partículas se desprenden fácilmente."
      },
      {
        type: "paragraph",
        text: "Este experimento muestra que no todo lo que parece arena es igual. Dentro de una muestra puede haber cuarzo, fragmentos de conchas, minerales volcánicos y partículas con hierro."
      },
      {
        type: "paragraph",
        text: "Nunca debe hacerse en zonas protegidas, reservas naturales o lugares donde esté prohibido retirar arena. La observación científica debe respetar el entorno."
      },

      {
        type: "subtitle",
        text: "Curiosidad: obtener sal por evaporación"
      },
      {
        type: "paragraph",
        text: "Cuando el agua salada se deja evaporar, el agua pasa al aire como vapor y las sales quedan atrás. Por eso en las salinas se usa el sol y el viento para concentrar agua salada hasta formar cristales."
      },
      {
        type: "paragraph",
        text: "El proceso puede tardar mucho tiempo, porque depende del calor, la cantidad de agua, el viento, la humedad y la concentración inicial de sal."
      },

      {
        type: "subtitle",
        text: "Agua mineralizada y cuerpo humano"
      },
      {
        type: "paragraph",
        text: "El cuerpo humano usa agua para transportar sustancias, regular temperatura, lubricar tejidos y permitir reacciones químicas internas."
      },
      {
        type: "paragraph",
        text: "Los minerales disueltos en el agua pueden aportar electrolitos. Los electrolitos participan en señales nerviosas, contracción muscular, equilibrio de líquidos y funcionamiento celular."
      },
      {
        type: "paragraph",
        text: "El hierro cumple funciones importantes en el organismo, especialmente en el transporte de oxígeno en la sangre. Sin embargo, el hierro necesario para el cuerpo normalmente se obtiene sobre todo de los alimentos."
      },
      {
        type: "paragraph",
        text: "El agua mineralizada puede apoyar la hidratación cuando es potable y segura, pero no debe confundirse con medicina. La calidad del agua siempre importa: debe estar libre de contaminantes peligrosos."
      },
      {
        type: "table",
        headers: ["Componente", "Papel en el cuerpo", "Idea clave"],
        rows: [
          ["Agua", "Hidratación y transporte", "Permite que muchas funciones ocurran"],
          ["Sodio", "Equilibrio de líquidos", "Debe mantenerse en cantidades adecuadas"],
          ["Potasio", "Músculos y señales nerviosas", "Trabaja junto con otros electrolitos"],
          ["Magnesio", "Función muscular y celular", "Participa en muchas reacciones"],
          ["Hierro", "Transporte de oxígeno", "Es esencial, pero en exceso también puede ser dañino"]
        ]
      },

      {
        type: "subtitle",
        text: "Energía y minerales"
      },
      {
        type: "paragraph",
        text: "El agua mineralizada no entrega energía como lo hacen los carbohidratos, las grasas o las proteínas. No funciona como combustible calórico."
      },
      {
        type: "paragraph",
        text: "Su relación con la energía del cuerpo es indirecta: si una persona está deshidratada o baja en electrolitos, puede sentirse cansada. Al recuperar agua y minerales necesarios, el cuerpo puede funcionar mejor."
      },
      {
        type: "paragraph",
        text: "Por eso los minerales no son magia: son piezas pequeñas que ayudan a que los sistemas del cuerpo trabajen con orden."
      },

      {
        type: "subtitle",
        text: "Resumen de laboratorio"
      },
      {
        type: "paragraph",
        text: "La materia puede encontrarse como sólido, líquido o gas. El agua puede disolver minerales invisibles a simple vista. Al calentarla, evaporarla y condensarla, es posible separar sustancias según sus propiedades."
      },
      {
        type: "paragraph",
        text: "La sal suele concentrarse con facilidad cuando el agua se evapora. El hierro puede encontrarse en trazas disueltas, en sedimentos o en minerales magnéticos como la magnetita."
      },
      {
        type: "paragraph",
        text: "Comprender estos procesos permite leer mejor la naturaleza: el agua, la arena, los minerales, la electricidad, el cuerpo humano y las transformaciones de la materia están conectados por reglas químicas observables."
      }
    ]
  }
};

let retroPCDialogState = {
  key: null
};

function ensureRetroPCStyles() {
  if (document.getElementById("retro-pc-style")) return;

  const style = document.createElement("style");
  style.id = "retro-pc-style";

  style.textContent = `
    #retro-pc-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.58);
      font-family: arcade, monospace;
    }

    #retro-pc-window {
      width: min(94vw, 760px);
      height: min(88vh, 560px);
      display: grid;
      grid-template-rows: 30px 1fr 28px;
      background: #c0c0c0;
      border: 3px solid #e8e8e8;
      border-right-color: #3a3a3a;
      border-bottom-color: #3a3a3a;
      box-shadow: 0 0 30px rgba(0, 255, 204, 0.22), 0 18px 40px rgba(0,0,0,.55);
      overflow: hidden;
      box-sizing: border-box;
      image-rendering: pixelated;
    }

    #retro-pc-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 6px;
      box-sizing: border-box;
      background: linear-gradient(90deg, #041a63, #0f6ec2);
      color: #fff;
      font-size: 10px;
    }

    #retro-pc-titlebar-text {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    #retro-pc-titlebar-dot {
      width: 12px;
      height: 12px;
      background: #fff;
      border: 2px solid #000;
      box-sizing: border-box;
    }

    #retro-pc-close {
      width: 22px;
      height: 20px;
      min-width: 22px;
      padding: 0;
      border: 2px solid #f0f0f0;
      border-right-color: #3a3a3a;
      border-bottom-color: #3a3a3a;
      background: #c0c0c0;
      color: #000;
      font-family: arcade, monospace;
      font-size: 10px;
      cursor: pointer;
    }

    #retro-pc-body {
      position: relative;
      display: grid;
      grid-template-columns: 120px 1fr;
      background: #008080;
      overflow: hidden;
      box-sizing: border-box;
    }

    #retro-pc-sidebar {
      background: linear-gradient(180deg, #0d6363, #064343);
      border-right: 2px solid rgba(0,0,0,.35);
      padding: 10px 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .retro-pc-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: #fff;
      font-size: 8px;
      text-align: center;
    }

    .retro-pc-icon-box {
      width: 42px;
      height: 34px;
      display: grid;
      place-items: center;
      background: #c0c0c0;
      border: 2px solid #f0f0f0;
      border-right-color: #3a3a3a;
      border-bottom-color: #3a3a3a;
      color: #000;
      font-size: 16px;
    }

    #retro-pc-desktop {
      position: relative;
      padding: 18px;
      box-sizing: border-box;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.08)),
        #008080;
    }

    #retro-word-window {
      width: min(100%, 540px);
      height: 100%;
      max-height: 100%;
      display: grid;
      grid-template-rows: 26px 24px 1fr 24px;
      background: #c0c0c0;
      border: 3px solid #f0f0f0;
      border-right-color: #3a3a3a;
      border-bottom-color: #3a3a3a;
      box-sizing: border-box;
      margin: 0 auto;
      overflow: hidden;
    }

    #retro-word-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 6px;
      box-sizing: border-box;
      background: linear-gradient(90deg, #061d72, #1e84d1);
      color: #fff;
      font-size: 9px;
    }

    #retro-word-menubar {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 8px;
      color: #000;
      background: #d4d0c8;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #7d7d7d;
    }

    #retro-word-page-wrap {
      background: #808080;
      overflow: auto;
      padding: 14px;
      box-sizing: border-box;
    }

    #retro-word-page {
      width: min(100%, 430px);
      min-height: 100%;
      margin: 0 auto;
      background: #fff;
      color: #111;
      border: 1px solid #444;
      box-shadow: 0 0 0 1px rgba(255,255,255,.35);
      padding: 18px 18px 24px 18px;
      box-sizing: border-box;
      font-family: "Courier New", monospace;
      font-size: 13px;
      line-height: 1.5;
      white-space: pre-line;
    }

    #retro-word-doc-title {
      font-weight: bold;
      text-align: center;
      margin-bottom: 14px;
      font-size: 14px;
    }

    #retro-word-statusbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 8px;
      box-sizing: border-box;
      background: #d4d0c8;
      border-top: 1px solid #7d7d7d;
      font-size: 8px;
      color: #000;
    }

    #retro-pc-taskbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 6px;
      box-sizing: border-box;
      background: #c0c0c0;
      border-top: 2px solid #fff;
    }

    #retro-pc-start {
      min-width: 64px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #c0c0c0;
      border: 2px solid #f0f0f0;
      border-right-color: #3a3a3a;
      border-bottom-color: #3a3a3a;
      color: #000;
      font-size: 8px;
    }

    #retro-pc-task-button {
      height: 20px;
      min-width: 140px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      box-sizing: border-box;
      background: #d4d0c8;
      border: 2px solid #808080;
      border-right-color: #fff;
      border-bottom-color: #fff;
      color: #000;
      font-size: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .retro-doc-title {
      font-weight: bold;
      text-align: center;
      margin-bottom: 14px;
      font-size: 16px;
    }

    .retro-doc-subtitle {
      text-align: center;
      font-size: 13px;
      margin: 16px 0 10px 0;
      font-weight: bold;
      text-decoration: underline;
    }

    .retro-doc-paragraph {
      margin: 0 0 12px 0;
      white-space: pre-line;
    }

    .retro-doc-image {
      display: block;
      width: 100%;
      max-width: 420px;
      margin: 10px auto 14px auto;
      border: 1px solid #444;
      background: #f5f5f5;
    }

    .retro-doc-table-wrap {
      overflow-x: auto;
      margin: 10px 0 14px 0;
    }

    .retro-doc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      background: #fff;
    }

    .retro-doc-table th,
    .retro-doc-table td {
      border: 1px solid #444;
      padding: 6px 8px;
      text-align: center;
    }

    .retro-doc-table th {
      background: #e9e9e9;
    }

    .retro-doc-chart-wrap {
      margin: 12px 0 16px 0;
      border: 1px solid #444;
      padding: 10px;
      background: #f8f8f8;
    }

    .retro-doc-chart-title {
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .retro-doc-chart-canvas {
      display: block;
      width: 100%;
      max-width: 460px;
      height: auto;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #777;
    }
    .retro-chem-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 12px 0 16px 0;
    }

    .retro-chem-card {
      border: 1px solid #444;
      background: #f7f7f7;
      padding: 10px 8px;
      box-sizing: border-box;
      text-align: center;
    }

    .retro-chem-card-title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 12px;
    }

    .retro-chem-box {
      width: 92px;
      height: 92px;
      margin: 0 auto 8px auto;
      border: 1px solid #666;
      background: #ffffff;
      position: relative;
      overflow: hidden;
    }

    .retro-chem-particle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #0b58d0;
    }

    .retro-chem-card-text {
      font-size: 11px;
      line-height: 1.45;
    }

    .retro-distiller-wrap {
      margin: 12px 0 16px 0;
      border: 1px solid #444;
      background: #f8f8f8;
      padding: 12px;
      box-sizing: border-box;
    }

    .retro-distiller-title {
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .retro-distiller-diagram {
      display: grid;
      grid-template-columns: 1.2fr 0.6fr 1fr;
      gap: 10px;
      align-items: center;
    }

    .retro-distiller-tank {
      position: relative;
      height: 180px;
      border: 2px solid #555;
      background: linear-gradient(180deg, #fefefe, #efefef);
      overflow: hidden;
    }

    .retro-distiller-water {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 52%;
      background: linear-gradient(180deg, #7ec8ff, #2f84d0);
      border-top: 2px solid #ffffff;
    }

    .retro-distiller-bubbles {
      position: absolute;
      inset: auto 0 35% 0;
      height: 55px;
    }

    .retro-distiller-bubble {
      position: absolute;
      bottom: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.9);
    }

    .retro-distiller-label {
      position: absolute;
      left: 8px;
      right: 8px;
      font-size: 10px;
      text-align: center;
      background: rgba(255,255,255,0.78);
      padding: 2px 4px;
      box-sizing: border-box;
    }

    .retro-distiller-label.top {
      top: 8px;
    }

    .retro-distiller-label.mid {
      top: 64px;
    }

    .retro-distiller-fire {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 38px;
      height: 38px;
      background: radial-gradient(circle at 50% 60%, #ffd84d 0%, #ff8c00 42%, #d61b00 72%, transparent 73%);
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(255,120,0,.6);
    }

    .retro-distiller-pipe-area {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
    }

    .retro-distiller-pipe {
      position: relative;
      width: 100%;
      max-width: 90px;
      height: 140px;
      border: 3px solid #666;
      border-left: none;
      border-bottom: none;
      border-radius: 0 40px 0 0;
      box-sizing: border-box;
    }

    .retro-distiller-vapor {
      position: absolute;
      top: 8px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      background:
        radial-gradient(circle at 20% 25%, rgba(190,190,190,.55) 0, rgba(190,190,190,.55) 10px, transparent 11px),
        radial-gradient(circle at 72% 45%, rgba(190,190,190,.42) 0, rgba(190,190,190,.42) 11px, transparent 12px),
        radial-gradient(circle at 45% 70%, rgba(190,190,190,.38) 0, rgba(190,190,190,.38) 10px, transparent 11px);
    }

    .retro-distiller-output {
      display: grid;
      gap: 10px;
    }

    .retro-distiller-box {
      border: 1px solid #555;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      min-height: 52px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
    }

    .retro-distiller-box-title {
      font-weight: bold;
      font-size: 11px;
    }

    .retro-distiller-box-text {
      font-size: 10px;
      line-height: 1.4;
    }

    .retro-distiller-note {
      margin-top: 10px;
      font-size: 10px;
      line-height: 1.45;
      text-align: center;
    }

    @media (max-width: 680px) {
      .retro-chem-grid {
        grid-template-columns: 1fr;
      }

      .retro-distiller-diagram {
        grid-template-columns: 1fr;
      }

      .retro-distiller-pipe-area {
        min-height: 70px;
      }

      .retro-distiller-pipe {
        height: 60px;
        max-width: 120px;
      }
    }
    @media (max-width: 680px) {
      #retro-pc-window {
        width: 96vw;
        height: 88vh;
      }

      #retro-pc-body {
        grid-template-columns: 88px 1fr;
      }

      #retro-word-page {
        font-size: 12px;
      }
    }

    @media (max-width: 520px) {
      #retro-pc-sidebar {
        display: none;
      }

      #retro-pc-body {
        grid-template-columns: 1fr;
      }

      #retro-word-page {
        width: 100%;
        padding: 14px;
      }
    }
  `;

  document.head.appendChild(style);
}

function closeRetroPCPopup() {
  const overlay = document.getElementById("retro-pc-overlay");
  if (overlay) overlay.remove();
  retroPCDialogState.key = null;
}

function buildRetroChemStates() {
  const wrap = document.createElement("div");
  wrap.className = "retro-chem-grid";

  const cards = [
    {
      title: "Sólido",
      text: "Las partículas están muy juntas y casi no cambian de lugar.",
      particles: [
        [16, 16], [36, 16], [56, 16],
        [16, 36], [36, 36], [56, 36],
        [16, 56], [36, 56], [56, 56]
      ]
    },
    {
      title: "Líquido",
      text: "Las partículas siguen juntas, pero pueden moverse y fluir.",
      particles: [
        [18, 54], [38, 48], [58, 58],
        [24, 28], [50, 26], [68, 42],
        [14, 72], [44, 70], [70, 74]
      ]
    },
    {
      title: "Gas",
      text: "Las partículas están más separadas y se mueven libremente.",
      particles: [
        [10, 10], [58, 12], [24, 36],
        [68, 44], [14, 62], [46, 70],
        [72, 84]
      ]
    }
  ];

  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "retro-chem-card";

    const title = document.createElement("div");
    title.className = "retro-chem-card-title";
    title.textContent = card.title;

    const box = document.createElement("div");
    box.className = "retro-chem-box";

    card.particles.forEach(([left, top]) => {
      const p = document.createElement("div");
      p.className = "retro-chem-particle";
      p.style.left = `${left}px`;
      p.style.top = `${top}px`;
      box.appendChild(p);
    });

    const text = document.createElement("div");
    text.className = "retro-chem-card-text";
    text.textContent = card.text;

    cardEl.appendChild(title);
    cardEl.appendChild(box);
    cardEl.appendChild(text);
    wrap.appendChild(cardEl);
  });

  return wrap;
}

function buildRetroDistillerDiagram() {
  const wrap = document.createElement("div");
  wrap.className = "retro-distiller-wrap";

  wrap.innerHTML = `
    <div class="retro-distiller-title">Esquema del proceso de destilación</div>

    <div class="retro-distiller-diagram">
      <div class="retro-distiller-tank">
        <div class="retro-distiller-label top">1. Agua mineralizada</div>
        <div class="retro-distiller-label mid">2. Calor y evaporación</div>
        <div class="retro-distiller-water"></div>
        <div class="retro-distiller-bubbles">
          <div class="retro-distiller-bubble" style="left:18px;"></div>
          <div class="retro-distiller-bubble" style="left:34px; bottom:10px;"></div>
          <div class="retro-distiller-bubble" style="left:50px; bottom:18px;"></div>
          <div class="retro-distiller-bubble" style="left:68px; bottom:6px;"></div>
          <div class="retro-distiller-bubble" style="left:84px; bottom:14px;"></div>
        </div>
        <div class="retro-distiller-fire"></div>
      </div>

      <div class="retro-distiller-pipe-area">
        <div class="retro-distiller-pipe">
          <div class="retro-distiller-vapor"></div>
        </div>
      </div>

      <div class="retro-distiller-output">
        <div class="retro-distiller-box">
          <div class="retro-distiller-box-title">3. Vapor separado</div>
          <div class="retro-distiller-box-text">El agua pasa a gas y se aleja de muchos minerales disueltos.</div>
        </div>
        <div class="retro-distiller-box">
          <div class="retro-distiller-box-title">4. Condensación</div>
          <div class="retro-distiller-box-text">El vapor se enfría y vuelve a convertirse en agua líquida.</div>
        </div>
        <div class="retro-distiller-box">
          <div class="retro-distiller-box-title">5. Concentrado mineral</div>
          <div class="retro-distiller-box-text">La sal, el hierro y otros minerales quedan más concentrados en el recipiente inicial.</div>
        </div>
      </div>
    </div>

    <div class="retro-distiller-note">
      El destilador aprovecha una propiedad fundamental de la materia:
      distintas sustancias cambian de estado o se separan en condiciones diferentes.
    </div>
  `;

  return wrap;
}

function createRetroDocElement(section) {
  if (!section || !section.type) {
    return document.createTextNode("");
  }

  if (section.type === "title") {
    const el = document.createElement("div");
    el.className = "retro-doc-title";
    el.textContent = section.text || "";
    return el;
  }

  if (section.type === "subtitle") {
    const el = document.createElement("div");
    el.className = "retro-doc-subtitle";
    el.textContent = section.text || "";
    return el;
  }

  if (section.type === "paragraph") {
    const el = document.createElement("p");
    el.className = "retro-doc-paragraph";
    el.textContent = section.text || "";
    return el;
  }

  if (section.type === "image") {
    const img = document.createElement("img");
    img.className = "retro-doc-image";
    img.src = section.src || "";
    img.alt = section.alt || "Imagen";
    return img;
  }

  if (section.type === "table") {
    const wrap = document.createElement("div");
    wrap.className = "retro-doc-table-wrap";

    const table = document.createElement("table");
    table.className = "retro-doc-table";

    if (Array.isArray(section.headers) && section.headers.length) {
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");

      section.headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        tr.appendChild(th);
      });

      thead.appendChild(tr);
      table.appendChild(thead);
    }

    if (Array.isArray(section.rows) && section.rows.length) {
      const tbody = document.createElement("tbody");

      section.rows.forEach(row => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
    }

    wrap.appendChild(table);
    return wrap;
  }

  if (section.type === "chart") {
    const wrap = document.createElement("div");
    wrap.className = "retro-doc-chart-wrap";

    const title = document.createElement("div");
    title.className = "retro-doc-chart-title";
    title.textContent = section.title || "Gráfica";

    const canvas = document.createElement("canvas");
    canvas.className = "retro-doc-chart-canvas";
    canvas.width = 460;
    canvas.height = 300;

    wrap.appendChild(title);
    wrap.appendChild(canvas);

    setTimeout(() => {
      drawRetroChart(canvas, section);
    }, 0);

    return wrap;
  }

  if (section.type === "chem_states") {
    return buildRetroChemStates();
  }

  if (section.type === "distiller_diagram") {
    return buildRetroDistillerDiagram();
  }

  return document.createTextNode("");
}

function renderRetroPCDocumentContent(config) {
  const page = document.getElementById("retro-word-page");
  if (!page || !config) return;

  page.innerHTML = "";

  if (Array.isArray(config.sections)) {
    config.sections.forEach(section => {
      page.appendChild(createRetroDocElement(section));
    });

    return;
  }

  const title = document.createElement("div");
  title.className = "retro-doc-title";
  title.textContent = config.documentTitle || "Documento";
  page.appendChild(title);

  if (Array.isArray(config.content)) {
    config.content.forEach(line => {
      const p = document.createElement("p");
      p.className = "retro-doc-paragraph";
      p.textContent = line;
      page.appendChild(p);
    });
  }
}

function drawRetroChart(canvas, chart) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  const padLeft = 42;
  const padRight = 16;
  const padTop = 16;
  const padBottom = 34;

  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  const xMin = Number(chart.xMin ?? 0);
  const xMax = Number(chart.xMax ?? 4);
  const yMin = Number(chart.yMin ?? 0);
  const yMax = Number(chart.yMax ?? 4);

  const points = Array.isArray(chart.points) ? chart.points : [];

  function mapX(x) {
    return padLeft + ((x - xMin) / (xMax - xMin || 1)) * plotW;
  }

  function mapY(y) {
    return padTop + plotH - ((y - yMin) / (yMax - yMin || 1)) * plotH;
  }

  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;

  for (let x = xMin; x <= xMax; x++) {
    const px = mapX(x);
    ctx.beginPath();
    ctx.moveTo(px, padTop);
    ctx.lineTo(px, padTop + plotH);
    ctx.stroke();
  }

  for (let y = yMin; y <= yMax; y++) {
    const py = mapY(y);
    ctx.beginPath();
    ctx.moveTo(padLeft, py);
    ctx.lineTo(padLeft + plotW, py);
    ctx.stroke();
  }

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(padLeft, padTop);
  ctx.lineTo(padLeft, padTop + plotH);
  ctx.lineTo(padLeft + plotW, padTop + plotH);
  ctx.stroke();

  ctx.fillStyle = "#000000";
  ctx.font = "12px Courier New";
  ctx.textAlign = "center";

  for (let x = xMin; x <= xMax; x++) {
    ctx.fillText(String(x), mapX(x), padTop + plotH + 18);
  }

  ctx.textAlign = "right";

  for (let y = yMin; y <= yMax; y++) {
    ctx.fillText(String(y), padLeft - 8, mapY(y) + 4);
  }

  if (!points.length) return;

  ctx.strokeStyle = "#0b58d0";
  ctx.fillStyle = "#d02020";
  ctx.lineWidth = 2;

  ctx.beginPath();

  points.forEach((point, index) => {
    const px = mapX(point[0]);
    const py = mapY(point[1]);

    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });

  ctx.stroke();

  points.forEach(point => {
    const px = mapX(point[0]);
    const py = mapY(point[1]);

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function openRetroPCDocument(configKey) {
  const config = RETRO_PC_DOCS_CONFIG[configKey];
  if (!config) return;

  ensureRetroPCStyles();
  closeRetroPCPopup();

  retroPCDialogState.key = configKey;

  const overlay = document.createElement("div");
  overlay.id = "retro-pc-overlay";

  overlay.innerHTML = `
    <div id="retro-pc-window">
      <div id="retro-pc-titlebar">
        <div id="retro-pc-titlebar-text">
          <div id="retro-pc-titlebar-dot"></div>
          <span>${config.osTitle}</span>
        </div>
        <button id="retro-pc-close" type="button">X</button>
      </div>

      <div id="retro-pc-body">
        <div id="retro-pc-sidebar">
          <div class="retro-pc-icon">
            <div class="retro-pc-icon-box">🖥</div>
            <span>Mi PC</span>
          </div>

          <div class="retro-pc-icon">
            <div class="retro-pc-icon-box">📄</div>
            <span>Informe</span>
          </div>

          <div class="retro-pc-icon">
            <div class="retro-pc-icon-box">📁</div>
            <span>Archivos</span>
          </div>
        </div>

        <div id="retro-pc-desktop">
          <div id="retro-word-window">
            <div id="retro-word-titlebar">
              <span>${config.wordWindowTitle}</span>
              <span>▢</span>
            </div>

            <div id="retro-word-menubar">
              <span>Archivo</span>
              <span>Edición</span>
              <span>Ver</span>
              <span>Insertar</span>
              <span>Formato</span>
              <span>Ayuda</span>
            </div>

            <div id="retro-word-page-wrap">
<div id="retro-word-page"></div>
            </div>

            <div id="retro-word-statusbar">
              <span>${config.statusText}</span>
              <span>Listo</span>
            </div>
          </div>
        </div>
      </div>

      <div id="retro-pc-taskbar">
        <div id="retro-pc-start">Inicio</div>
        <div id="retro-pc-task-button">${config.documentTitle}</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  renderRetroPCDocumentContent(config);

  document.getElementById("retro-pc-close")?.addEventListener("click", closeRetroPCPopup);

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      closeRetroPCPopup();
    }
  }, { passive: false });
}

window.openComputadorInvestigacionLunar = function () {
  openRetroPCDocument("investigacionLunar");
};

window.openComputadorEcuacionesGraficas = function () {
  openRetroPCDocument("ecuacionesGraficasBasicas");
};

window.openComputadorQuimicaDestilador = function () {
  openRetroPCDocument("quimicaDestilador");
};
// ======================================================
// SISTEMA EXTERNO REUTILIZABLE DE DIÁLOGOS DE OBJETOS
// No modifica el sistema original del juego
// Popup centrado + efecto de terror + ducking de ambiente
// ======================================================

const OBJETO_DIALOG_EXTERNO_CONFIG = {
  momiaMonalisa: {
    title: "Registro alienígena",
    image: "https://enycosmicplayer.vercel.app/assets/images/momiaMonalisa.png",
    alt: "Momia Monalisa alienígena",
    soundEffect: "https://enycosmicplayer.vercel.app/assets/song/efect/terrorEfect1.mp3",
    lines: [
      "Pero qué cara...!!!",
      "Parece la momia de una especie alienígena.",
      "Parece muy antigua.",
      "¿Puede tener 10.000 años o más?"
    ]
  }
};

let objetoDialogExternoState = {
  key: null,
  lineIndex: 0
};

let objetoDialogExternoSound = null;
let objetoDialogAmbientAudioRef = null;
let objetoDialogAmbientPrevVolume = 1;
let objetoDialogAmbientFadeInterval = null;

function ensureObjetoDialogExternoStyles() {
  if (document.getElementById("objeto-dialog-externo-style")) return;

  const style = document.createElement("style");
  style.id = "objeto-dialog-externo-style";

  style.textContent = `
    #objeto-dialog-externo-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(0, 0, 0, 0.58);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #objeto-dialog-externo-panel {
      width: min(94vw, 520px);
      background: #000;
      color: #00ffcc;
      border: 3px solid #00ffcc;
      box-shadow:
        0 0 0 2px #032b2b,
        0 0 24px rgba(0,255,204,.34),
        0 18px 40px rgba(0,0,0,.72);
      display: grid;
      grid-template-rows: 42px 220px auto;
      overflow: hidden;
      box-sizing: border-box;
      image-rendering: pixelated;
    }

    #objeto-dialog-externo-header {
      height: 42px;
      min-height: 42px;
      background:
        linear-gradient(90deg, rgba(0,255,204,.14), rgba(0,0,0,.95), rgba(0,255,204,.14)),
        #050505;
      border-bottom: 2px solid rgba(0,255,204,.78);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 8px;
      box-sizing: border-box;
    }

    #objeto-dialog-externo-title {
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #00ffcc;
      text-shadow: 0 0 8px rgba(0,255,204,.82);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #objeto-dialog-externo-close {
      width: 30px;
      height: 30px;
      padding: 0;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      cursor: pointer;
    }

    #objeto-dialog-externo-close:hover {
      background: #00ffcc;
      color: #000;
      box-shadow: 0 0 12px rgba(0,255,204,.8);
    }

    #objeto-dialog-externo-image-wrap {
      position: relative;
      background:
        radial-gradient(circle at center, rgba(0,255,204,.10), transparent 58%),
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.035) 0px,
          rgba(0,255,204,.035) 2px,
          transparent 2px,
          transparent 6px
        ),
        #000;
      border-bottom: 2px solid rgba(0,255,204,.62);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 8px;
    }

    #objeto-dialog-externo-image-wrap::after {
      content: "";
      position: absolute;
      inset: 10px;
      border: 1px solid rgba(0,255,204,.38);
      box-shadow:
        inset 0 0 18px rgba(0,255,204,.12),
        0 0 12px rgba(0,255,204,.14);
      pointer-events: none;
    }

    #objeto-dialog-externo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      display: block;
      image-rendering: auto;
      background: #000;
    }

    #objeto-dialog-externo-footer {
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.04) 0px,
          rgba(0,255,204,.04) 2px,
          transparent 2px,
          transparent 6px
        ),
        #000;
      padding: 10px;
      box-sizing: border-box;
    }

    #objeto-dialog-externo-line {
      min-height: 46px;
      margin: 0 0 10px 0;
      color: #ffffff;
      font-size: 12px;
      line-height: 1.45;
      text-align: center;
      text-shadow: 0 0 8px rgba(0,255,204,.38);
    }

    #objeto-dialog-externo-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .objeto-dialog-externo-btn {
      min-height: 34px;
      padding: 6px 12px;
      background: #000;
      color: #00ffcc;
      border: 2px solid rgba(0,255,204,.8);
      font-family: arcade, monospace;
      font-size: 10px;
      cursor: pointer;
      text-transform: uppercase;
      box-shadow:
        0 0 10px rgba(0,255,204,.18),
        inset 0 0 8px rgba(0,255,204,.05);
    }

    .objeto-dialog-externo-btn:hover {
      background: #00ffcc;
      color: #000;
      box-shadow:
        0 0 12px #00ffcc,
        0 0 26px rgba(0,255,204,.62);
    }

    @media (max-width: 440px) {
      #objeto-dialog-externo-panel {
        width: 94vw;
        grid-template-rows: 42px 190px auto;
      }

      #objeto-dialog-externo-line {
        font-size: 11px;
      }

      .objeto-dialog-externo-btn {
        font-size: 9px;
      }
    }
  `;

  document.head.appendChild(style);
}

function getObjetoDialogAmbientAudio() {
  if (typeof ensureAmbientAudio === "function") {
    const audio = ensureAmbientAudio();
    if (audio) return audio;
  }

  if (typeof ambientAudio !== "undefined" && ambientAudio) {
    return ambientAudio;
  }

  return null;
}

function clearObjetoDialogAmbientFade() {
  if (objetoDialogAmbientFadeInterval) {
    clearInterval(objetoDialogAmbientFadeInterval);
    objetoDialogAmbientFadeInterval = null;
  }
}

function duckObjetoDialogAmbientTo30() {
  const ambient = getObjetoDialogAmbientAudio();
  if (!ambient) return;

  objetoDialogAmbientAudioRef = ambient;
  objetoDialogAmbientPrevVolume = typeof ambient.volume === "number" ? ambient.volume : 1;

  clearObjetoDialogAmbientFade();

  const targetVolume = Math.max(0, Math.min(1, objetoDialogAmbientPrevVolume * 0.30));
  ambient.volume = targetVolume;
}

function restoreObjetoDialogAmbientSlow() {
  const ambient = objetoDialogAmbientAudioRef;
  if (!ambient) return;

  clearObjetoDialogAmbientFade();

  const target = Math.max(0, Math.min(1, objetoDialogAmbientPrevVolume || 1));

  objetoDialogAmbientFadeInterval = setInterval(() => {
    if (!ambient) {
      clearObjetoDialogAmbientFade();
      return;
    }

    const step = 0.02;

    if (ambient.volume >= target - step) {
      ambient.volume = target;
      clearObjetoDialogAmbientFade();
      return;
    }

    ambient.volume = Math.min(target, ambient.volume + step);
  }, 80);
}

function stopObjetoDialogSound() {
  if (objetoDialogExternoSound) {
    objetoDialogExternoSound.pause();
    objetoDialogExternoSound.currentTime = 0;
    objetoDialogExternoSound.onended = null;
  }
}

function playObjetoDialogSound(config) {
  stopObjetoDialogSound();

  if (!config || !config.soundEffect) return;

  objetoDialogExternoSound = new Audio(config.soundEffect);
  objetoDialogExternoSound.volume = 1;

  duckObjetoDialogAmbientTo30();

  objetoDialogExternoSound.onended = function () {
    restoreObjetoDialogAmbientSlow();
  };

  objetoDialogExternoSound.play().catch(() => {
    restoreObjetoDialogAmbientSlow();
  });
}

function closeObjetoDialogExterno() {
  stopObjetoDialogSound();
  restoreObjetoDialogAmbientSlow();

  const overlay = document.getElementById("objeto-dialog-externo-overlay");
  if (overlay) overlay.remove();

  objetoDialogExternoState.key = null;
  objetoDialogExternoState.lineIndex = 0;
}

function renderObjetoDialogExterno() {
  const config = OBJETO_DIALOG_EXTERNO_CONFIG[objetoDialogExternoState.key];
  if (!config) return;

  const titleEl = document.getElementById("objeto-dialog-externo-title");
  const imageEl = document.getElementById("objeto-dialog-externo-image");
  const lineEl = document.getElementById("objeto-dialog-externo-line");
  const actionsEl = document.getElementById("objeto-dialog-externo-actions");

  if (!titleEl || !imageEl || !lineEl || !actionsEl) return;

  const lines = Array.isArray(config.lines) ? config.lines : [];
  const total = lines.length;
  const idx = Math.max(0, Math.min(objetoDialogExternoState.lineIndex, total - 1));

  objetoDialogExternoState.lineIndex = idx;

  titleEl.textContent = config.title || "Registro";
  imageEl.src = config.image || "";
  imageEl.alt = config.alt || config.title || "Registro";
  lineEl.textContent = lines[idx] || "...";

  const atFirst = idx <= 0;
  const atLast = idx >= total - 1;

  let html = "";

  if (!atFirst) {
    html += `
      <button class="objeto-dialog-externo-btn" type="button" data-objeto-dialog-action="prev">
        Anterior
      </button>
    `;
  }

  if (!atLast) {
    html += `
      <button class="objeto-dialog-externo-btn" type="button" data-objeto-dialog-action="next">
        Siguiente
      </button>
    `;
  } else {
    html += `
      <button class="objeto-dialog-externo-btn" type="button" data-objeto-dialog-action="close">
        Cerrar
      </button>
    `;
  }

  actionsEl.innerHTML = html;
}

let objetoDialogExternoActionLocked = false;
let objetoDialogExternoPointer = {
  active: false,
  startX: 0,
  startY: 0,
  moved: false,
  target: null
};

function canUseObjetoDialogExternoAction() {
  if (objetoDialogExternoActionLocked) return false;

  objetoDialogExternoActionLocked = true;

  setTimeout(() => {
    objetoDialogExternoActionLocked = false;
  }, 450);

  return true;
}

function beginObjetoDialogExternoTap(e, target) {
  objetoDialogExternoPointer.active = true;
  objetoDialogExternoPointer.startX = e.clientX;
  objetoDialogExternoPointer.startY = e.clientY;
  objetoDialogExternoPointer.moved = false;
  objetoDialogExternoPointer.target = target || null;
}

function moveObjetoDialogExternoTap(e) {
  if (!objetoDialogExternoPointer.active) return;

  const dx = e.clientX - objetoDialogExternoPointer.startX;
  const dy = e.clientY - objetoDialogExternoPointer.startY;

  if (Math.abs(dx) > 18 || Math.abs(dy) > 18) {
    objetoDialogExternoPointer.moved = true;
  }
}

function canCommitObjetoDialogExternoTap(target) {
  if (!objetoDialogExternoPointer.active) return false;
  if (objetoDialogExternoPointer.moved) return false;
  if (!target || !objetoDialogExternoPointer.target) return false;

  return (
    target === objetoDialogExternoPointer.target ||
    objetoDialogExternoPointer.target.contains(target)
  );
}

function endObjetoDialogExternoTap() {
  objetoDialogExternoPointer.active = false;
  objetoDialogExternoPointer.target = null;
}

function handleObjetoDialogExternoAction(action) {
  if (!canUseObjetoDialogExternoAction()) return;

  if (typeof playtockSound === "function") {
    playtockSound();
  }

  if (action === "close") {
    closeObjetoDialogExterno();
    return;
  }

  if (action === "prev") {
    objetoDialogExternoState.lineIndex--;
    renderObjetoDialogExterno();
    return;
  }

  if (action === "next") {
    objetoDialogExternoState.lineIndex++;
    renderObjetoDialogExterno();
    return;
  }
}

function bindObjetoDialogExternoEvents() {
  const overlay = document.getElementById("objeto-dialog-externo-overlay");
  const closeBtn = document.getElementById("objeto-dialog-externo-close");

  if (!overlay) return;

  function getObjetoDialogActionTarget(e) {
    return (
      e.target.closest("[data-objeto-dialog-action]") ||
      e.target.closest("#objeto-dialog-externo-close")
    );
  }

  function getObjetoDialogAction(target) {
    if (!target) return null;

    if (target.id === "objeto-dialog-externo-close") {
      return "close";
    }

    return target.dataset.objetoDialogAction || null;
  }

  overlay.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const target = getObjetoDialogActionTarget(e);

    if (target) {
      beginObjetoDialogExternoTap(e, target);
    } else {
      beginObjetoDialogExternoTap(e, overlay);
    }
  }, { capture: true, passive: false });

  overlay.addEventListener("pointermove", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    moveObjetoDialogExternoTap(e);
  }, { capture: true, passive: false });

  overlay.addEventListener("pointerup", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const target = getObjetoDialogActionTarget(e);

    if (target && canCommitObjetoDialogExternoTap(target)) {
      const action = getObjetoDialogAction(target);
      handleObjetoDialogExternoAction(action);
      endObjetoDialogExternoTap();
      return;
    }

    if (e.target === overlay && canCommitObjetoDialogExternoTap(overlay)) {
      handleObjetoDialogExternoAction("close");
      endObjetoDialogExternoTap();
      return;
    }

    endObjetoDialogExternoTap();
  }, { capture: true, passive: false });

  overlay.addEventListener("pointercancel", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    endObjetoDialogExternoTap();
  }, { capture: true, passive: false });

  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, { capture: true, passive: false });
}

function openObjetoDialogExterno(configKey) {
  const config = OBJETO_DIALOG_EXTERNO_CONFIG[configKey];
  if (!config) return;

  ensureObjetoDialogExternoStyles();
  closeObjetoDialogExterno();

  objetoDialogExternoState.key = configKey;
  objetoDialogExternoState.lineIndex = 0;

  const overlay = document.createElement("div");
  overlay.id = "objeto-dialog-externo-overlay";

  overlay.innerHTML = `
    <div id="objeto-dialog-externo-panel">
      <div id="objeto-dialog-externo-header">
        <div id="objeto-dialog-externo-title">Registro</div>
        <button id="objeto-dialog-externo-close" type="button">X</button>
      </div>

      <div id="objeto-dialog-externo-image-wrap">
        <img id="objeto-dialog-externo-image" src="" alt="Registro">
      </div>

      <div id="objeto-dialog-externo-footer">
        <p id="objeto-dialog-externo-line">...</p>
        <div id="objeto-dialog-externo-actions"></div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  bindObjetoDialogExternoEvents();
  renderObjetoDialogExterno();
  playObjetoDialogSound(config);
}

window.openMomiaMonalisaDialog = function () {
  openObjetoDialogExterno("momiaMonalisa");
};

//Cuestionario de preguntas de planetario (inicio)
// ======================================================
// CUESTIONARIO PLANETARIO - MAPA 1 DOMO ESPACIAL
// Computadores del planetario
// Cada 5 respuestas correctas: +1 IQ +2 cosmonedas
// Total al completar 50: +10 IQ +20 cosmonedas
// ======================================================

// ======================================================
// SISTEMA REUTILIZABLE DE TELESCOPIOS - DOMO ESPACIAL
// Vista liviana con zoom por rueda, drag y gesto táctil
// ======================================================

const TELESCOPIO_ASTRO_CONFIG = {
  tycho: {
    title: "Telescopio orbital / Cráter Tycho",
    image: "https://enycosmicplayer.vercel.app/entornosExternos/sistemaSolar/astroFotografia/createrTycho.png",
    alt: "Astrofotografía del cráter Tycho",
    maxScale: 5,
    description: `
      <span>Cráter Tycho:</span>
      una formación lunar brillante con rayos visibles que se extienden
      por gran parte de la superficie. Usa zoom para observar detalles
      de la astrofotografía.
    `
  },

  jupiter: {
    title: "Telescopio profundo / Júpiter",
    image: "https://enycosmicplayer.vercel.app/entornosExternos/sistemaSolar/astroFotografia/Jupiter-galaxia.jpg",
    alt: "Astrofotografía de Júpiter y cielo profundo",
    maxScale: 6,
    description: `
      <span>Júpiter y cielo profundo:</span>
      esta fotografía muestra a Júpiter y sus lunas principales.
      Si observas con más atención, también descubrirás estrellas,
      nebulosas y galaxias escondidas en el fondo. Es una imagen
      tomada por mí hace años, y siempre he querido invitar a otros
      a mirar más allá de lo evidente y buscar más a fondo.
    `
  }
};

let telescopioAstroState = {
  scale: 1,
  minScale: 1,
  maxScale: 5,
  translateX: 0,
  translateY: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  pinchStartDistance: 0,
  pinchStartScale: 1
};

function ensureTelescopioAstroStyles() {
  if (document.getElementById("telescopio-astro-style")) return;

  const style = document.createElement("style");
  style.id = "telescopio-astro-style";

  style.textContent = `
    #telescopio-astro-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background:
        radial-gradient(circle at center, rgba(0,255,204,.08), rgba(0,0,0,.72) 58%),
        rgba(0,0,0,.62);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #telescopio-astro-box {
      width: min(94vw, 560px);
      height: min(86vh, 640px);
      background: #000;
      color: #00ffcc;
      border: 3px solid #00ffcc;
      box-shadow:
        0 0 0 2px #032b2b,
        0 0 22px rgba(0,255,204,.32),
        0 16px 38px rgba(0,0,0,.7);
      display: grid;
      grid-template-rows: 42px 1fr auto;
      overflow: hidden;
      box-sizing: border-box;
      image-rendering: pixelated;
    }

    #telescopio-astro-header {
      height: 42px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 8px;
      background:
        linear-gradient(90deg, rgba(0,255,204,.12), rgba(0,0,0,.95), rgba(0,255,204,.12)),
        #050505;
      border-bottom: 2px solid rgba(0,255,204,.75);
      box-sizing: border-box;
    }

    #telescopio-astro-title {
      font-size: 11px;
      color: #00ffcc;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 0 8px rgba(0,255,204,.8);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #telescopio-astro-close {
      width: 30px;
      height: 30px;
      padding: 0;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      cursor: pointer;
    }

    #telescopio-astro-close:hover {
      background: #00ffcc;
      color: #000;
      box-shadow: 0 0 12px rgba(0,255,204,.8);
    }

    #telescopio-astro-view {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at center, transparent 0 45%, rgba(0,0,0,.25) 46%, rgba(0,0,0,.92) 73%),
        radial-gradient(circle at center, rgba(0,255,204,.12), rgba(0,0,0,.95) 66%),
        #000;
      touch-action: none;
      cursor: grab;
      user-select: none;
    }

    #telescopio-astro-view.dragging {
      cursor: grabbing;
    }

    #telescopio-astro-img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transform: translate(-50%, -50%) scale(1);
      transform-origin: center center;
      will-change: transform;
      pointer-events: none;
      image-rendering: auto;
    }

    .telescopio-astro-ring {
      position: absolute;
      inset: 8%;
      border: 2px solid rgba(0,255,204,.55);
      border-radius: 50%;
      box-shadow:
        inset 0 0 28px rgba(0,255,204,.14),
        0 0 18px rgba(0,255,204,.2);
      pointer-events: none;
    }

    .telescopio-astro-cross-x,
    .telescopio-astro-cross-y {
      position: absolute;
      background: rgba(0,255,204,.5);
      box-shadow: 0 0 8px rgba(0,255,204,.65);
      pointer-events: none;
    }

    .telescopio-astro-cross-x {
      left: 12%;
      right: 12%;
      top: 50%;
      height: 1px;
    }

    .telescopio-astro-cross-y {
      top: 12%;
      bottom: 12%;
      left: 50%;
      width: 1px;
    }

    .telescopio-astro-scan {
      position: absolute;
      left: 0;
      right: 0;
      top: -18px;
      height: 18px;
      background: linear-gradient(
        180deg,
        transparent,
        rgba(0,255,204,.16),
        transparent
      );
      animation: telescopioAstroScan 2.7s linear infinite;
      pointer-events: none;
    }

    #telescopio-astro-info {
      padding: 10px;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.045) 0px,
          rgba(0,255,204,.045) 2px,
          transparent 2px,
          transparent 6px
        ),
        #020808;
      border-top: 2px solid rgba(0,255,204,.68);
      color: #ffffff;
      font-size: 10px;
      line-height: 1.45;
      text-align: center;
      box-sizing: border-box;
    }

    #telescopio-astro-info span {
      color: #ffe066;
      text-shadow: 0 0 8px rgba(255,224,102,.7);
    }

    .telescopio-astro-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }

    .telescopio-astro-btn {
      min-width: 34px;
      min-height: 30px;
      background: #000;
      color: #00ffcc;
      border: 2px solid rgba(0,255,204,.8);
      font-family: arcade, monospace;
      cursor: pointer;
    }

    .telescopio-astro-btn:hover {
      background: #00ffcc;
      color: #000;
    }

    @keyframes telescopioAstroScan {
      from { top: -18px; }
      to { top: 100%; }
    }

    @media (max-width: 440px) {
      #telescopio-astro-box {
        width: 94vw;
        height: 84vh;
      }

      #telescopio-astro-info {
        font-size: 9px;
      }
    }
  `;

  document.head.appendChild(style);
}

function cerrarTelescopioAstroPopup() {
  const overlay = document.getElementById("telescopio-astro-overlay");
  if (overlay) overlay.remove();
}

function resetTelescopioAstroState(maxScale = 5) {
  telescopioAstroState.scale = 1;
  telescopioAstroState.minScale = 1;
  telescopioAstroState.maxScale = maxScale;
  telescopioAstroState.translateX = 0;
  telescopioAstroState.translateY = 0;
  telescopioAstroState.dragging = false;
  telescopioAstroState.startX = 0;
  telescopioAstroState.startY = 0;
  telescopioAstroState.lastX = 0;
  telescopioAstroState.lastY = 0;
  telescopioAstroState.pinchStartDistance = 0;
  telescopioAstroState.pinchStartScale = 1;
}

function aplicarTransformTelescopioAstro() {
  const img = document.getElementById("telescopio-astro-img");
  if (!img) return;

  const s = telescopioAstroState;

  img.style.transform = `
    translate(-50%, -50%)
    translate(${s.translateX}px, ${s.translateY}px)
    scale(${s.scale})
  `;
}

function clampTelescopioAstro() {
  const s = telescopioAstroState;

  s.scale = Math.max(s.minScale, Math.min(s.maxScale, s.scale));

  if (s.scale <= 1) {
    s.translateX = 0;
    s.translateY = 0;
    return;
  }

  const limit = 180 * s.scale;

  s.translateX = Math.max(-limit, Math.min(limit, s.translateX));
  s.translateY = Math.max(-limit, Math.min(limit, s.translateY));
}

function zoomTelescopioAstro(delta) {
  const s = telescopioAstroState;

  s.scale = Math.max(
    s.minScale,
    Math.min(s.maxScale, s.scale + delta)
  );

  clampTelescopioAstro();
  aplicarTransformTelescopioAstro();
}

function getTouchDistanceTelescopioAstro(touches) {
  if (!touches || touches.length < 2) return 0;

  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;

  return Math.hypot(dx, dy);
}

function bindTelescopioAstroEvents() {
  const overlay = document.getElementById("telescopio-astro-overlay");
  const view = document.getElementById("telescopio-astro-view");
  const closeBtn = document.getElementById("telescopio-astro-close");
  const zoomInBtn = document.getElementById("telescopio-astro-zoom-in");
  const zoomOutBtn = document.getElementById("telescopio-astro-zoom-out");
  const resetBtn = document.getElementById("telescopio-astro-reset");

  if (!overlay || !view) return;

  closeBtn.onclick = cerrarTelescopioAstroPopup;

  zoomInBtn.onclick = () => zoomTelescopioAstro(0.25);
  zoomOutBtn.onclick = () => zoomTelescopioAstro(-0.25);

  resetBtn.onclick = () => {
    resetTelescopioAstroState(telescopioAstroState.maxScale);
    aplicarTransformTelescopioAstro();
  };

  overlay.addEventListener("pointerdown", function (e) {
    if (e.target === overlay) {
      e.preventDefault();
      cerrarTelescopioAstroPopup();
    }
  }, { passive: false });

  view.addEventListener("wheel", function (e) {
    e.preventDefault();

    const delta = e.deltaY < 0 ? 0.18 : -0.18;
    zoomTelescopioAstro(delta);
  }, { passive: false });

  view.addEventListener("pointerdown", function (e) {
    e.preventDefault();

    const s = telescopioAstroState;

    s.dragging = true;
    s.startX = e.clientX;
    s.startY = e.clientY;
    s.lastX = s.translateX;
    s.lastY = s.translateY;

    view.classList.add("dragging");

    try {
      view.setPointerCapture(e.pointerId);
    } catch (_) { }
  }, { passive: false });

  view.addEventListener("pointermove", function (e) {
    const s = telescopioAstroState;

    if (!s.dragging || s.scale <= 1) return;

    e.preventDefault();

    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    s.translateX = s.lastX + dx;
    s.translateY = s.lastY + dy;

    clampTelescopioAstro();
    aplicarTransformTelescopioAstro();
  }, { passive: false });

  view.addEventListener("pointerup", function () {
    telescopioAstroState.dragging = false;
    view.classList.remove("dragging");
  });

  view.addEventListener("pointercancel", function () {
    telescopioAstroState.dragging = false;
    view.classList.remove("dragging");
  });

  view.addEventListener("touchstart", function (e) {
    if (e.touches.length === 2) {
      telescopioAstroState.pinchStartDistance = getTouchDistanceTelescopioAstro(e.touches);
      telescopioAstroState.pinchStartScale = telescopioAstroState.scale;
    }
  }, { passive: false });

  view.addEventListener("touchmove", function (e) {
    if (e.touches.length !== 2) return;

    e.preventDefault();

    const s = telescopioAstroState;
    const distance = getTouchDistanceTelescopioAstro(e.touches);

    if (!s.pinchStartDistance) return;

    s.scale = s.pinchStartScale * (distance / s.pinchStartDistance);

    clampTelescopioAstro();
    aplicarTransformTelescopioAstro();
  }, { passive: false });
}

function openTelescopioAstroPopup(configKey) {
  const config = TELESCOPIO_ASTRO_CONFIG[configKey];
  if (!config) return;

  ensureTelescopioAstroStyles();

  const existente = document.getElementById("telescopio-astro-overlay");
  if (existente) existente.remove();

  resetTelescopioAstroState(config.maxScale || 5);

  const overlay = document.createElement("div");
  overlay.id = "telescopio-astro-overlay";

  overlay.innerHTML = `
    <div id="telescopio-astro-box">
      <div id="telescopio-astro-header">
        <div id="telescopio-astro-title">${config.title}</div>
        <button id="telescopio-astro-close" type="button">X</button>
      </div>

      <div id="telescopio-astro-view">
        <img
          id="telescopio-astro-img"
          src="${config.image}"
          alt="${config.alt}"
          draggable="false"
        >

        <div class="telescopio-astro-ring"></div>
        <div class="telescopio-astro-cross-x"></div>
        <div class="telescopio-astro-cross-y"></div>
        <div class="telescopio-astro-scan"></div>
      </div>

      <div id="telescopio-astro-info">
        ${config.description}

        <div class="telescopio-astro-controls">
          <button id="telescopio-astro-zoom-out" class="telescopio-astro-btn" type="button">-</button>
          <button id="telescopio-astro-reset" class="telescopio-astro-btn" type="button">1X</button>
          <button id="telescopio-astro-zoom-in" class="telescopio-astro-btn" type="button">+</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  bindTelescopioAstroEvents();
  aplicarTransformTelescopioAstro();
}

window.openTelescopioTychoPopup = function () {
  openTelescopioAstroPopup("tycho");
};

window.openTelescopioJupiterPopup = function () {
  openTelescopioAstroPopup("jupiter");
};

//const PLANETARIO_QUIZ_STORAGE_KEY = "enycosmic_mapa1_planetario_quiz_v1";
const PLANETARIO_QUIZ_QUESTIONS = [
  {
    id: "pq001",
    pregunta: "¿Qué tipo de astro es el Sol?",
    opciones: ["Un planeta", "Una estrella", "Un satélite", "Un cometa"],
    correcta: 1
  },
  {
    id: "pq002",
    pregunta: "¿Qué proceso produce energía en el núcleo solar?",
    opciones: ["Fusión nuclear", "Evaporación", "Oxidación", "Sedimentación"],
    correcta: 0
  },
  {
    id: "pq003",
    pregunta: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Venus", "Mercurio", "Marte", "Tierra"],
    correcta: 1
  },
  {
    id: "pq004",
    pregunta: "¿Qué planeta tiene temperaturas muy extremas?",
    opciones: ["Mercurio", "Neptuno", "Júpiter", "Saturno"],
    correcta: 0
  },
  {
    id: "pq005",
    pregunta: "¿Qué planeta tiene un fuerte efecto invernadero?",
    opciones: ["Venus", "Urano", "Marte", "Plutón"],
    correcta: 0
  },
  {
    id: "pq006",
    pregunta: "¿Qué gas abunda en la atmósfera de Venus?",
    opciones: ["Oxígeno", "Dióxido de carbono", "Helio", "Neón"],
    correcta: 1
  },
  {
    id: "pq007",
    pregunta: "¿Qué planeta es conocido por tener vida?",
    opciones: ["Marte", "Tierra", "Venus", "Júpiter"],
    correcta: 1
  },
  {
    id: "pq008",
    pregunta: "¿Qué cubre gran parte de la Tierra?",
    opciones: ["Lava", "Arena", "Agua", "Metano líquido"],
    correcta: 2
  },
  {
    id: "pq009",
    pregunta: "¿Qué protege a la Tierra del viento solar?",
    opciones: ["Magnetosfera", "Corteza", "Nubes", "Océanos"],
    correcta: 0
  },
  {
    id: "pq010",
    pregunta: "¿Qué causa muchas auroras en la Tierra?",
    opciones: ["Polvo lunar", "Interacción solar", "Lluvia ácida", "Eclipses"],
    correcta: 1
  },
  {
    id: "pq011",
    pregunta: "¿Qué planeta es llamado el planeta rojo?",
    opciones: ["Venus", "Marte", "Saturno", "Mercurio"],
    correcta: 1
  },
  {
    id: "pq012",
    pregunta: "¿Qué gas domina la atmósfera de Marte?",
    opciones: ["Dióxido de carbono", "Oxígeno", "Hidrógeno", "Ozono"],
    correcta: 0
  },
  {
    id: "pq013",
    pregunta: "¿Cuál es el planeta más grande del sistema solar?",
    opciones: ["Saturno", "Júpiter", "Neptuno", "Tierra"],
    correcta: 1
  },
  {
    id: "pq014",
    pregunta: "¿Qué es la Gran Mancha Roja de Júpiter?",
    opciones: ["Un océano", "Una tormenta", "Una luna", "Una montaña"],
    correcta: 1
  },
  {
    id: "pq015",
    pregunta: "¿Qué gases abundan en Júpiter?",
    opciones: ["Hidrógeno y helio", "Oxígeno y ozono", "Nitrógeno y argón", "Metano y agua"],
    correcta: 0
  },
  {
    id: "pq016",
    pregunta: "¿Qué planeta destaca por sus anillos?",
    opciones: ["Saturno", "Marte", "Mercurio", "Venus"],
    correcta: 0
  },
  {
    id: "pq017",
    pregunta: "¿De qué están hechos muchos anillos de Saturno?",
    opciones: ["Hielo y rocas", "Fuego y gas", "Plantas", "Agua líquida"],
    correcta: 0
  },
  {
    id: "pq018",
    pregunta: "¿Qué luna de Saturno tiene lagos de metano?",
    opciones: ["Titán", "Europa", "Caronte", "Fobos"],
    correcta: 0
  },
  {
    id: "pq019",
    pregunta: "¿Qué luna de Saturno expulsa géiseres?",
    opciones: ["Encélado", "Titán", "Luna", "Caronte"],
    correcta: 0
  },
  {
    id: "pq020",
    pregunta: "¿Qué planeta gira casi de lado?",
    opciones: ["Urano", "Venus", "Marte", "Tierra"],
    correcta: 0
  },
  {
    id: "pq021",
    pregunta: "¿Qué gas da tono azul a Urano?",
    opciones: ["Metano", "Oxígeno", "Helio puro", "Dióxido de carbono"],
    correcta: 0
  },
  {
    id: "pq022",
    pregunta: "¿Cuál es el planeta más lejano del Sol?",
    opciones: ["Neptuno", "Saturno", "Júpiter", "Marte"],
    correcta: 0
  },
  {
    id: "pq023",
    pregunta: "¿Qué planeta tiene vientos muy veloces?",
    opciones: ["Neptuno", "Mercurio", "Venus", "Tierra"],
    correcta: 0
  },
  {
    id: "pq024",
    pregunta: "¿Qué objeto fue reclasificado como planeta enano?",
    opciones: ["Plutón", "Saturno", "Urano", "Venus"],
    correcta: 0
  },
  {
    id: "pq025",
    pregunta: "¿Cómo se llama la luna grande de Plutón?",
    opciones: ["Caronte", "Titán", "Io", "Europa"],
    correcta: 0
  },
  {
    id: "pq026",
    pregunta: "¿Qué astro orbita la Tierra?",
    opciones: ["La Luna", "El Sol", "Júpiter", "Andrómeda"],
    correcta: 0
  },
  {
    id: "pq027",
    pregunta: "¿Por qué vemos siempre la misma cara lunar?",
    opciones: ["Rotación sincronizada", "No rota", "Es plana", "No tiene órbita"],
    correcta: 0
  },
  {
    id: "pq028",
    pregunta: "¿Qué estudia una astrofotografía?",
    opciones: ["Imágenes del cielo", "Solo volcanes", "Solo plantas", "Solo sonidos"],
    correcta: 0
  },
  {
    id: "pq029",
    pregunta: "¿Qué es Tycho?",
    opciones: ["Un cráter lunar", "Una galaxia", "Un cometa", "Una luna de Marte"],
    correcta: 0
  },
  {
    id: "pq030",
    pregunta: "¿Qué planeta fue observado por Galileo con lunas?",
    opciones: ["Júpiter", "Mercurio", "Venus", "Urano"],
    correcta: 0
  },
  {
    id: "pq031",
    pregunta: "¿Qué son las lunas galileanas?",
    opciones: ["Lunas de Júpiter", "Rocas de Saturno", "Anillos solares", "Cráteres"],
    correcta: 0
  },
  {
    id: "pq032",
    pregunta: "¿Qué galaxia se acerca a la Vía Láctea?",
    opciones: ["Andrómeda", "Orión", "Carina", "Escorpio"],
    correcta: 0
  },
  {
    id: "pq033",
    pregunta: "¿Qué es Betelgeuse?",
    opciones: ["Supergigante roja", "Planeta enano", "Luna", "Nebulosa fría"],
    correcta: 0
  },
  {
    id: "pq034",
    pregunta: "¿En qué constelación está Betelgeuse?",
    opciones: ["Orión", "Escorpio", "Perseo", "Carina"],
    correcta: 0
  },
  {
    id: "pq035",
    pregunta: "¿Qué es Antares?",
    opciones: ["Supergigante roja", "Asteroide", "Planeta", "Satélite"],
    correcta: 0
  },
  {
    id: "pq036",
    pregunta: "¿Qué estrella se conoce como estrella del demonio?",
    opciones: ["Algol", "Sol", "S2", "Antares"],
    correcta: 0
  },
  {
    id: "pq037",
    pregunta: "¿Qué es S2?",
    opciones: ["Estrella cerca del centro galáctico", "Planeta", "Cometa", "Nebulosa"],
    correcta: 0
  },
  {
    id: "pq038",
    pregunta: "¿Qué objeto puede tener gravedad extrema?",
    opciones: ["Agujero negro", "Cometa pequeño", "Nube baja", "Satélite artificial"],
    correcta: 0
  },
  {
    id: "pq039",
    pregunta: "¿Qué puede atrapar incluso la luz?",
    opciones: ["Agujero negro", "Luna", "Atmósfera", "Océano"],
    correcta: 0
  },
  {
    id: "pq040",
    pregunta: "¿Qué representa una escala planetaria?",
    opciones: ["Tamaños y distancias", "Solo colores", "Solo sonidos", "Solo climas"],
    correcta: 0
  },
  {
    id: "pq041",
    pregunta: "¿Qué planeta tiene el Monte Olimpo?",
    opciones: ["Marte", "Venus", "Saturno", "Neptuno"],
    correcta: 0
  },
  {
    id: "pq042",
    pregunta: "¿Qué planeta tiene nubes de ácido sulfúrico?",
    opciones: ["Venus", "Tierra", "Marte", "Urano"],
    correcta: 0
  },
  {
    id: "pq043",
    pregunta: "¿Qué elemento forma parte del Sol en gran cantidad?",
    opciones: ["Hidrógeno", "Hierro sólido", "Oro", "Plomo"],
    correcta: 0
  },
  {
    id: "pq044",
    pregunta: "¿Qué mantiene a los planetas orbitando al Sol?",
    opciones: ["Gravedad", "Magnetismo humano", "Sonido", "Electricidad estática"],
    correcta: 0
  },
  {
    id: "pq045",
    pregunta: "¿Qué planeta tiene un año de 248 años terrestres?",
    opciones: ["Plutón", "Mercurio", "Venus", "Marte"],
    correcta: 0
  },
  {
    id: "pq046",
    pregunta: "¿Qué tipo de cuerpo es una luna?",
    opciones: ["Satélite natural", "Estrella", "Galaxia", "Cometa"],
    correcta: 0
  },
  {
    id: "pq047",
    pregunta: "¿Qué planeta tiene anillos tenues y oscuros?",
    opciones: ["Neptuno", "Mercurio", "Venus", "Marte"],
    correcta: 0
  },
  {
    id: "pq048",
    pregunta: "¿Qué protege satélites y vida del viento solar?",
    opciones: ["Campo magnético", "Cráteres", "Nubes de polvo", "Lagos"],
    correcta: 0
  },
  {
    id: "pq049",
    pregunta: "¿Qué permite observar modelos 3D en el planetario?",
    opciones: ["Hologramas", "Agua", "Arcilla", "Sal"],
    correcta: 0
  },
  {
    id: "pq050",
    pregunta: "¿Qué puedes explorar en el planetario virtual?",
    opciones: ["Planetas y astrofotografías", "Solo tiendas", "Solo enemigos", "Solo inventario"],
    correcta: 0
  }
];

function crearEstadoInicialCuestionarioPlanetario() {
  return {
    pendientes: PLANETARIO_QUIZ_QUESTIONS.map(q => q.id),
    correctas: 0,
    gruposPagados: 0,
    ultimaPreguntaId: null,
    completado: false
  };
}

//Guarda los avances de la pregunta en local Storage para que no se pierdan al recargar la página. Esto permite que el jugador pueda continuar desde donde dejó el cuestionario sin perder su progreso. (inicio)
/*
function cargarEstadoCuestionarioPlanetario() {
  try {
    const saved = localStorage.getItem(PLANETARIO_QUIZ_STORAGE_KEY);

    if (!saved) {
      return crearEstadoInicialCuestionarioPlanetario();
    }

    const estado = JSON.parse(saved);

    if (!estado || !Array.isArray(estado.pendientes)) {
      return crearEstadoInicialCuestionarioPlanetario();
    }

    return {
      pendientes: estado.pendientes,
      correctas: Number(estado.correctas || 0),
      gruposPagados: Number(estado.gruposPagados || 0),
      ultimaPreguntaId: estado.ultimaPreguntaId || null,
      completado: Boolean(estado.completado)
    };
  } catch (error) {
    console.warn("No se pudo cargar el estado del cuestionario:", error);
    return crearEstadoInicialCuestionarioPlanetario();
  }
}

function guardarEstadoCuestionarioPlanetario(estado) {
  localStorage.setItem(PLANETARIO_QUIZ_STORAGE_KEY, JSON.stringify(estado));
}
*/
//Guarda los avances de la pregunta en local Storage para que no se pierdan al recargar la página. Esto permite que el jugador pueda continuar desde donde dejó el cuestionario sin perder su progreso. (fin)

function cargarEstadoCuestionarioPlanetario() {
  return crearEstadoInicialCuestionarioPlanetario();
}

function guardarEstadoCuestionarioPlanetario(estado) {
  // No se guarda en localStorage.
  // El cuestionario se reinicia cada vez que se reinicia el juego.
}

let planetarioQuizState = cargarEstadoCuestionarioPlanetario();
//localStorage.removeItem("enycosmic_mapa1_planetario_quiz_v1");

function ensureCuestionarioPlanetarioStyles() {
  if (document.getElementById("cuestionario-planetario-style")) return;

  const style = document.createElement("style");
  style.id = "cuestionario-planetario-style";

  style.textContent = `
    #cuestionario-planetario-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background:
        radial-gradient(circle at center, rgba(24,245,225,.14), rgba(0,0,0,.78) 58%),
        rgba(0,0,0,.72);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #cuestionario-planetario-box {
      width: min(94vw, 470px);
      max-width: 470px;
      background: #000;
      color: #00ffcc;
      box-shadow:
        0 0 0 2px #0b3d35,
        0 0 0 4px #00ffcc,
        0 0 28px rgba(24,245,225,.38),
        0 18px 40px rgba(0,0,0,.75);
      image-rendering: pixelated;
      overflow: hidden;
      box-sizing: border-box;
    }

    #cuestionario-planetario-header {
      height: 42px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      background: #111;
      border-bottom: 2px solid #00ffcc;
      box-sizing: border-box;
    }

    #cuestionario-planetario-title {
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #00ffcc;
      text-shadow: 0 0 8px rgba(0,255,204,.75);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #cuestionario-planetario-close {
      width: 30px;
      height: 30px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-sizing: border-box;
      cursor: pointer;
    }

    #cuestionario-planetario-body {
      padding: 12px;
      display: grid;
      gap: 12px;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.055) 0px,
          rgba(0,255,204,.055) 2px,
          transparent 2px,
          transparent 6px
        ),
        radial-gradient(circle at center, rgba(0,255,204,.1), transparent 62%),
        linear-gradient(180deg, #020b0f, #000);
      box-sizing: border-box;
    }

    .quiz-monitor {
      position: relative;
      min-height: 150px;
      border: 2px solid rgba(0,255,204,.48);
      background:
        radial-gradient(circle at center, rgba(24,245,225,.13), transparent 45%),
        radial-gradient(circle at 30% 20%, rgba(255,255,255,.16), transparent 2px),
        radial-gradient(circle at 70% 34%, rgba(255,255,255,.12), transparent 2px),
        radial-gradient(circle at 18% 72%, rgba(255,255,255,.16), transparent 2px),
        radial-gradient(circle at 84% 78%, rgba(255,255,255,.14), transparent 2px),
        #010708;
      overflow: hidden;
      box-shadow:
        inset 0 0 24px rgba(0,255,204,.12),
        0 0 18px rgba(0,255,204,.18);
      padding: 12px;
      box-sizing: border-box;
      display: grid;
      place-items: center;
    }

    .quiz-monitor-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(#00ffcc 2px, transparent 2px),
        linear-gradient(90deg, #00ffcc 2px, transparent 2px);
      background-size: 42px 42px;
      opacity: .045;
      animation: quizGridMove 5s linear infinite;
      pointer-events: none;
    }

    .quiz-monitor-scan {
      position: absolute;
      left: 0;
      right: 0;
      height: 18px;
      top: -18px;
      background: linear-gradient(180deg, transparent, rgba(0,255,204,.18), transparent);
      animation: quizScan 2.4s linear infinite;
      pointer-events: none;
    }

    .quiz-monitor-title {
      position: relative;
      z-index: 2;
      color: #fff799;
      text-align: center;
      font-size: 11px;
      line-height: 1.5;
      text-shadow: 0 0 8px rgba(255,224,102,.7);
    }

    .quiz-progress-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .quiz-stat {
      border: 2px solid rgba(0,255,204,.42);
      background: rgba(0,255,204,.06);
      padding: 8px;
      text-align: center;
      display: grid;
      gap: 5px;
    }

    .quiz-stat-label {
      color: #fff799;
      font-size: 9px;
      text-transform: uppercase;
    }

    .quiz-stat-value {
      color: #fff;
      font-size: 11px;
      line-height: 1.35;
    }

.quiz-question {
  border: 2px solid rgba(110,247,255,.42);
  background: rgba(110,247,255,.06);
  color: #ffffff;
  padding: 12px;
  font-size: 13px;
  line-height: 1.55;
  text-align: center;
  box-sizing: border-box;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
}

    .quiz-options {
      display: grid;
      gap: 8px;
    }

    .quiz-option-btn {
      width: 100%;
min-height: 42px;
padding: 10px;
      background: #000;
      color: #00ffcc;
      border: 2px solid rgba(0,255,204,.72);
      font-family: arcade, monospace;
      font-size: 10px;
      line-height: 1.35;
      text-align: center;
      cursor: pointer;
      box-shadow:
        0 0 10px rgba(0,255,204,.18),
        inset 0 0 8px rgba(0,255,204,.05);
    }

    .quiz-option-btn:hover {
      background: #00ffcc;
      color: #000;
      box-shadow:
        0 0 12px #00ffcc,
        0 0 28px rgba(0,255,204,.7);
    }

    .quiz-option-btn:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .quiz-feedback {
      border: 2px solid rgba(0,255,204,.35);
      background: rgba(0,0,0,.35);
      color: #00ffcc;
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px;
      font-size: 10px;
      line-height: 1.35;
      box-sizing: border-box;
    }

    .quiz-feedback.good {
      color: #00ffcc;
      border-color: rgba(0,255,204,.75);
      box-shadow: 0 0 12px rgba(0,255,204,.22);
    }

    .quiz-feedback.bad {
      color: #ffe066;
      border-color: rgba(255,224,102,.75);
      box-shadow: 0 0 12px rgba(255,224,102,.18);
    }

    .quiz-complete {
      border: 2px solid rgba(0,255,204,.85);
      background:
        radial-gradient(circle at left, rgba(0,255,204,.18), rgba(0,0,0,.35)),
        rgba(0,255,204,.08);
      color: #ffffff;
      padding: 12px;
      font-size: 11px;
      line-height: 1.55;
      text-align: center;
      box-shadow:
        0 0 12px rgba(0,255,204,.28),
        inset 0 0 10px rgba(0,255,204,.08);
    }

    @keyframes quizGridMove {
      from { background-position: 0 0; }
      to { background-position: 42px 42px; }
    }

    @keyframes quizScan {
      from { top: -18px; }
      to { top: 100%; }
    }

    @media (max-width: 440px) {
      #cuestionario-planetario-box {
        width: 94vw;
      }

      .quiz-progress-grid {
        grid-template-columns: 1fr;
      }

      .quiz-option-btn {
        font-size: 9px;
      }
    }
  `;

  document.head.appendChild(style);
}

function getPreguntaActualPlanetario() {
  if (planetarioQuizState.pendientes.length <= 0) return null;

  const id = planetarioQuizState.pendientes[0];
  return PLANETARIO_QUIZ_QUESTIONS.find(q => q.id === id) || null;
}

function cerrarCuestionarioPlanetario() {
  const overlay = document.getElementById("cuestionario-planetario-overlay");
  if (overlay) overlay.remove();
}

function ensurePremioRetoPlanetarioStyles() {
  if (document.getElementById("premio-reto-planetario-style")) return;

  const style = document.createElement("style");
  style.id = "premio-reto-planetario-style";

  style.textContent = `
    #premio-reto-planetario-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000001;
      background:
        radial-gradient(circle at center, rgba(255,224,102,.18), rgba(0,0,0,.74) 58%),
        rgba(0,0,0,.72);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #premio-reto-planetario-box {
      width: min(92vw, 390px);
      background: #000;
      color: #00ffcc;
      box-shadow:
        0 0 0 2px #3f3300,
        0 0 0 4px #ffe066,
        0 0 28px rgba(255,224,102,.42),
        0 18px 40px rgba(0,0,0,.78);
      image-rendering: pixelated;
      overflow: hidden;
      box-sizing: border-box;
      animation: premioRetoIn .26s ease forwards;
    }

    #premio-reto-planetario-header {
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background:
        linear-gradient(90deg, rgba(255,224,102,.18), rgba(0,255,204,.12), rgba(255,224,102,.18)),
        #111;
      border-bottom: 2px solid #ffe066;
      box-sizing: border-box;
    }

    #premio-reto-planetario-title {
      color: #ffe066;
      font-size: 12px;
      line-height: 1.35;
      text-align: center;
      text-transform: uppercase;
      text-shadow:
        0 0 8px rgba(255,224,102,.85),
        0 0 16px rgba(0,255,204,.42);
    }

    #premio-reto-planetario-body {
      padding: 14px;
      display: grid;
      gap: 12px;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(255,224,102,.055) 0px,
          rgba(255,224,102,.055) 2px,
          transparent 2px,
          transparent 6px
        ),
        radial-gradient(circle at center, rgba(255,224,102,.12), transparent 62%),
        linear-gradient(180deg, #100d00, #000);
      box-sizing: border-box;
    }

    .premio-reto-medalla {
      width: 84px;
      height: 84px;
      margin: 0 auto;
      border: 4px solid #ffe066;
      background:
        radial-gradient(circle, #fff799 0%, #ffe066 38%, #ff9f1c 72%, #7a3b00 100%);
      display: grid;
      place-items: center;
      color: #000;
      font-size: 34px;
      box-shadow:
        0 0 14px rgba(255,224,102,.85),
        0 0 28px rgba(255,159,28,.55);
      animation: premioRetoPulse .85s ease-in-out infinite;
    }

    .premio-reto-texto {
      border: 2px solid rgba(255,224,102,.72);
      background:
        radial-gradient(circle at left, rgba(255,224,102,.16), rgba(0,0,0,.36)),
        rgba(255,224,102,.06);
      color: #ffffff;
      padding: 10px;
      font-size: 11px;
      line-height: 1.55;
      text-align: center;
      box-shadow:
        inset 0 0 10px rgba(255,224,102,.08),
        0 0 12px rgba(255,224,102,.18);
    }

    .premio-reto-recompensa {
      color: #00ffcc;
      text-shadow: 0 0 8px rgba(0,255,204,.72);
    }

    .premio-reto-final {
      color: #ffe066;
      text-shadow: 0 0 8px rgba(255,224,102,.72);
    }

    #premio-reto-planetario-continuar {
      min-height: 40px;
      background: #000;
      color: #ffe066;
      border: 2px solid #ffe066;
      font-family: arcade, monospace;
      font-size: 10px;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow:
        0 0 12px rgba(255,224,102,.35),
        inset 0 0 10px rgba(255,224,102,.08);
    }

    #premio-reto-planetario-continuar:hover {
      background: #ffe066;
      color: #000;
      box-shadow:
        0 0 12px #ffe066,
        0 0 28px rgba(255,224,102,.75);
    }

    @keyframes premioRetoIn {
      from {
        opacity: 0;
        transform: scale(.92) translateY(8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes premioRetoPulse {
      0%, 100% {
        transform: scale(1);
        filter: brightness(1);
      }
      50% {
        transform: scale(1.08);
        filter: brightness(1.22);
      }
    }
  `;

  document.head.appendChild(style);
}

function cerrarPremioRetoPlanetario() {
  const overlay = document.getElementById("premio-reto-planetario-overlay");
  if (overlay) overlay.remove();
}

function mostrarPremioRetoPlanetario(iqGanado, cosmonedasGanadas, esFinal = false) {
  ensurePremioRetoPlanetarioStyles();

  const existente = document.getElementById("premio-reto-planetario-overlay");
  if (existente) existente.remove();

  const overlay = document.createElement("div");
  overlay.id = "premio-reto-planetario-overlay";

  overlay.innerHTML = `
    <div id="premio-reto-planetario-box">
      <div id="premio-reto-planetario-header">
        <div id="premio-reto-planetario-title">
          ${esFinal ? "Reto completado" : "Misión educativa superada"}
        </div>
      </div>

      <div id="premio-reto-planetario-body">
        <div class="premio-reto-medalla">✓</div>

        <div class="premio-reto-texto">
          Felicidades, has ganado
          <span class="premio-reto-recompensa">${iqGanado} IQ</span>
          y
          <span class="premio-reto-recompensa">${cosmonedasGanadas} cosmonedas</span>.
          <br><br>
          ${esFinal
      ? `<span class="premio-reto-final">Llegaste al final del reto del planetario.</span>`
      : `<span class="premio-reto-final">Llega al final del reto y tendrás un premio especial.</span>`}
        </div>

        <button id="premio-reto-planetario-continuar" type="button">
          Continuar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("premio-reto-planetario-continuar").onclick = cerrarPremioRetoPlanetario;

  overlay.addEventListener("pointerdown", function (e) {
    if (e.target === overlay) {
      e.preventDefault();
      cerrarPremioRetoPlanetario();
    }
  }, { passive: false });
}

function recompensarCuestionarioPlanetario() {
  const gruposCorrectos = Math.floor(planetarioQuizState.correctas / 5);

  if (gruposCorrectos <= planetarioQuizState.gruposPagados) {
    return false;
  }

  const gruposNuevos = gruposCorrectos - planetarioQuizState.gruposPagados;
  const iqGanado = gruposNuevos;
  const cosmonedasGanadas = gruposNuevos * 2;
  const esFinal = planetarioQuizState.correctas >= PLANETARIO_QUIZ_QUESTIONS.length;

  if (typeof IQuser !== "undefined") {
    IQuser += iqGanado;
  }

  if (typeof cosmonedas !== "undefined") {
    cosmonedas += cosmonedasGanadas;
  }

  planetarioQuizState.gruposPagados = gruposCorrectos;
  guardarEstadoCuestionarioPlanetario(planetarioQuizState);

  /*--//Sincronizar wordpress(Inicio)--*/
  // Aquí debes guardar en WordPress los cambios del jugador.
  // Datos recomendados:
  // IQuser
  // cosmonedas
  // planetarioQuizState
  // window.missionSystem, si quieres enlazar este quiz con misiones.
  // Ejemplo futuro:
  // if (typeof guardarProgresoJugadorEnWordPress === "function") {
  //   guardarProgresoJugadorEnWordPress();
  // }
  /*--//Sincronizar wordpress(fin)--*/

  if (typeof showPopupFeedback === "function") {
    showPopupFeedback({
      title: esFinal ? "Reto completado" : "Recompensa educativa",
      message: `+${iqGanado} IQ y +${cosmonedasGanadas} cosmonedas.`,
      type: "success",
      duration: 4200
    });
  }

  mostrarPremioRetoPlanetario(iqGanado, cosmonedasGanadas, esFinal);

  return true;
}

function renderCuestionarioPlanetario(feedback = "", feedbackType = "") {
  ensureCuestionarioPlanetarioStyles();

  const overlay = document.getElementById("cuestionario-planetario-overlay");
  if (!overlay) return;

  const pregunta = getPreguntaActualPlanetario();
  const restantes = planetarioQuizState.pendientes.length;
  const respondidas = PLANETARIO_QUIZ_QUESTIONS.length - restantes;
  const progreso = `${planetarioQuizState.correctas}/50`;
  const recompensaActual = `${planetarioQuizState.gruposPagados}/10`;

  let contenidoPregunta = "";

  if (planetarioQuizState.completado || !pregunta) {
    contenidoPregunta = `
      <div class="quiz-complete">
        ✓ Has completado el cuestionario del planetario.
        <br>
        Ganancia total: 10 IQ y 20 cosmonedas.
        <br>
        Tu conocimiento astronómico quedó registrado.
      </div>
    `;
  } else {
    contenidoPregunta = `
      <div class="quiz-question">
        ${pregunta.pregunta}
      </div>

      <div class="quiz-options">
        ${pregunta.opciones.map((opcion, index) => `
          <button class="quiz-option-btn" type="button" data-option-index="${index}">
            ${opcion}
          </button>
        `).join("")}
      </div>
    `;
  }

  overlay.innerHTML = `
    <div id="cuestionario-planetario-box">
      <div id="cuestionario-planetario-header">
        <div id="cuestionario-planetario-title">Terminal del planetario</div>
        <button id="cuestionario-planetario-close" type="button">×</button>
      </div>

      <div id="cuestionario-planetario-body">
        <div class="quiz-monitor">
          <div class="quiz-monitor-grid"></div>
          <div class="quiz-monitor-scan"></div>
          <div class="quiz-monitor-title">
            Evaluación astronómica de la Escuela Espacial.
            <br>
            Responde para ganar IQ y cosmonedas.
          </div>
        </div>

        <div class="quiz-progress-grid">
          <div class="quiz-stat">
            <span class="quiz-stat-label">Correctas</span>
            <span class="quiz-stat-value">${progreso}</span>
          </div>

          <div class="quiz-stat">
            <span class="quiz-stat-label">Pendientes</span>
            <span class="quiz-stat-value">${restantes}</span>
          </div>

          <div class="quiz-stat">
            <span class="quiz-stat-label">Pagos</span>
            <span class="quiz-stat-value">${recompensaActual}</span>
          </div>
        </div>

        ${contenidoPregunta}

        <div class="quiz-feedback ${feedbackType}">
          ${feedback || "Cada 5 respuestas correctas ganas 1 IQ y 2 cosmonedas."}
        </div>
      </div>
    </div>
  `;

  document.getElementById("cuestionario-planetario-close").onclick = cerrarCuestionarioPlanetario;

  overlay.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.onclick = function () {
      const optionIndex = Number(this.dataset.optionIndex);
      responderPreguntaPlanetario(optionIndex);
    };
  });

  overlay.addEventListener("pointerdown", function (e) {
    if (e.target === overlay) {
      e.preventDefault();
      cerrarCuestionarioPlanetario();
    }
  }, { passive: false });
}

function responderPreguntaPlanetario(optionIndex) {
  const pregunta = getPreguntaActualPlanetario();
  if (!pregunta || planetarioQuizState.completado) return;

  const esCorrecta = optionIndex === pregunta.correcta;

  planetarioQuizState.pendientes.shift();
  planetarioQuizState.ultimaPreguntaId = pregunta.id;

  if (esCorrecta) {
    planetarioQuizState.correctas += 1;

    if (typeof playgoodSound === "function") {
      playgoodSound();
    }

    if (planetarioQuizState.correctas >= PLANETARIO_QUIZ_QUESTIONS.length) {
      planetarioQuizState.completado = true;
    }

    guardarEstadoCuestionarioPlanetario(planetarioQuizState);
    recompensarCuestionarioPlanetario();

    if (planetarioQuizState.completado) {
      renderCuestionarioPlanetario("✓ Cuestionario completado. Ganaste 10 IQ y 20 cosmonedas en total.", "good");
      return;
    }

    renderCuestionarioPlanetario("✓ Correcto. La terminal registró tu avance.", "good");
    return;
  }

  planetarioQuizState.pendientes.push(pregunta.id);

  if (typeof playerrorSound === "function") {
    playerrorSound();
  }

  guardarEstadoCuestionarioPlanetario(planetarioQuizState);

  renderCuestionarioPlanetario(
    "Respuesta incorrecta. Esta pregunta volverá más tarde.",
    "bad"
  );
}

window.openCuestionarioPlanetario = function () {
  ensureCuestionarioPlanetarioStyles();

  //planetarioQuizState = cargarEstadoCuestionarioPlanetario();
  if (!planetarioQuizState || planetarioQuizState.completado) {
    planetarioQuizState = crearEstadoInicialCuestionarioPlanetario();
  }

  const existente = document.getElementById("cuestionario-planetario-overlay");
  if (existente) existente.remove();

  const overlay = document.createElement("div");
  overlay.id = "cuestionario-planetario-overlay";
  document.body.appendChild(overlay);

  renderCuestionarioPlanetario();
};
//Cuestionario de preguntas de planetario (fin)

// ======================================================
// POPUP PLANETARIO VIRTUAL - MAPA 1 DOMO ESPACIAL
// Bloque: bloque_ambiente_11297
// Abre acceso al planetario de la Escuela Espacial
// ======================================================

function ensurePlanetarioVirtualStyles() {
  if (document.getElementById("planetario-virtual-style")) return;

  const style = document.createElement("style");
  style.id = "planetario-virtual-style";

  style.textContent = `
    #planetario-virtual-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background:
        radial-gradient(circle at center, rgba(24,245,225,.14), rgba(0,0,0,.78) 58%),
        rgba(0,0,0,.72);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #planetario-virtual-box {
      width: min(94vw, 430px);
      max-width: 430px;
      background: #000;
      color: #00ffcc;
      box-shadow:
        0 0 0 2px #0b3d35,
        0 0 0 4px #00ffcc,
        0 0 28px rgba(24,245,225,.38),
        0 18px 40px rgba(0,0,0,.75);
      image-rendering: pixelated;
      overflow: hidden;
      box-sizing: border-box;
    }

    #planetario-virtual-header {
      height: 42px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      background: #111;
      border-bottom: 2px solid #00ffcc;
      box-sizing: border-box;
    }

    #planetario-virtual-title {
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #00ffcc;
      text-shadow: 0 0 8px rgba(0,255,204,.75);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #planetario-virtual-close {
      width: 30px;
      height: 30px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-sizing: border-box;
      cursor: pointer;
    }

    #planetario-virtual-body {
      padding: 12px;
      display: grid;
      gap: 12px;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.055) 0px,
          rgba(0,255,204,.055) 2px,
          transparent 2px,
          transparent 6px
        ),
        radial-gradient(circle at center, rgba(0,255,204,.1), transparent 62%),
        linear-gradient(180deg, #020b0f, #000);
      box-sizing: border-box;
    }

    .planetario-stage {
      position: relative;
      width: 100%;
      height: 260px;
      border: 2px solid rgba(0,255,204,.48);
      background:
        radial-gradient(circle at center, rgba(24,245,225,.13), transparent 45%),
        radial-gradient(circle at 30% 20%, rgba(255,255,255,.16), transparent 2px),
        radial-gradient(circle at 70% 34%, rgba(255,255,255,.12), transparent 2px),
        radial-gradient(circle at 18% 72%, rgba(255,255,255,.16), transparent 2px),
        radial-gradient(circle at 84% 78%, rgba(255,255,255,.14), transparent 2px),
        #010708;
      overflow: hidden;
      box-shadow:
        inset 0 0 24px rgba(0,255,204,.12),
        0 0 18px rgba(0,255,204,.18);
    }

    .planetario-stars {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(#00ffcc 2px, transparent 2px),
        linear-gradient(90deg, #00ffcc 2px, transparent 2px);
      background-size: 72px 72px;
      opacity: .045;
      animation: planetarioGridMove 6s linear infinite;
      pointer-events: none;
    }

    .planetario-scan {
      position: absolute;
      left: 0;
      right: 0;
      height: 18px;
      top: -18px;
      background: linear-gradient(
        180deg,
        transparent,
        rgba(0,255,204,.18),
        transparent
      );
      animation: planetarioScan 2.8s linear infinite;
      pointer-events: none;
    }

    .planetario-sun {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 46px;
      height: 46px;
      transform: translate(-50%, -50%);
      background:
        radial-gradient(circle, #fff799 0%, #ffe066 32%, #ff8c00 62%, #ff3c3c 100%);
      border: 3px solid #ffe066;
      box-shadow:
        0 0 12px rgba(255,224,102,.95),
        0 0 26px rgba(255,140,0,.75),
        0 0 44px rgba(255,60,60,.45);
      animation: planetarioSunPulse .9s ease-in-out infinite;
      z-index: 4;
    }

    .planetario-orbit {
      position: absolute;
      left: 50%;
      top: 50%;
      border: 2px dashed rgba(0,255,204,.28);
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      pointer-events: none;
    }

    .planetario-orbit.o1 {
      width: 92px;
      height: 92px;
      animation: planetarioRotate 5s linear infinite;
    }

    .planetario-orbit.o2 {
      width: 148px;
      height: 148px;
      animation: planetarioRotate 8s linear infinite reverse;
    }

    .planetario-orbit.o3 {
      width: 206px;
      height: 206px;
      animation: planetarioRotate 12s linear infinite;
    }

    .planetario-planet {
      position: absolute;
      box-shadow:
        0 0 8px rgba(255,255,255,.25),
        0 0 14px rgba(0,255,204,.2);
    }

    .planetario-planet.p1 {
      width: 16px;
      height: 16px;
      left: 50%;
      top: -8px;
      transform: translateX(-50%);
      background:
        linear-gradient(135deg, #6ef7ff 0%, #0a8cff 55%, #001b55 100%);
      border: 2px solid #6ef7ff;
    }

    .planetario-planet.p2 {
      width: 22px;
      height: 22px;
      left: 50%;
      top: -11px;
      transform: translateX(-50%);
      background:
        linear-gradient(135deg, #fff799 0%, #ff9f1c 52%, #7a2c00 100%);
      border: 2px solid #ffe066;
    }

    .planetario-planet.p3 {
      width: 28px;
      height: 28px;
      left: 50%;
      top: -14px;
      transform: translateX(-50%);
      background:
        linear-gradient(135deg, #b7ff9b 0%, #00aaff 42%, #0036a3 100%);
      border: 2px solid #6ef7ff;
    }

    .planetario-ring {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 42px;
      height: 10px;
      transform: translate(-50%, -50%) rotate(-18deg);
      border: 2px solid rgba(255,224,102,.82);
      box-shadow: 0 0 10px rgba(255,224,102,.38);
      z-index: -1;
    }

    .planetario-core-text {
      position: absolute;
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%);
      width: 88%;
      color: #ffffff;
      text-align: center;
      font-size: 10px;
      line-height: 1.45;
      text-shadow: 0 0 8px rgba(0,255,204,.8);
      z-index: 7;
    }

    .planetario-enter-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 42px);
      z-index: 8;
    }

    #planetario-virtual-enter {
      min-width: 230px;
      min-height: 38px;
      padding: 0 10px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 10px;
      text-transform: uppercase;
      box-shadow:
        0 0 12px rgba(0,255,204,.38),
        inset 0 0 10px rgba(0,255,204,.08);
      cursor: pointer;
      animation: planetarioBtnPulse 1.2s ease-in-out infinite;
    }

    #planetario-virtual-enter:hover,
    #planetario-virtual-close:hover {
      background: #00ffcc;
      color: #000;
      box-shadow:
        0 0 12px #00ffcc,
        0 0 28px rgba(0,255,204,.7);
    }

    .planetario-info {
      border: 2px solid rgba(0,255,204,.42);
      background: rgba(0,255,204,.06);
      padding: 8px;
      color: #00ffcc;
      font-size: 10px;
      line-height: 1.45;
      text-align: center;
    }

    .planetario-info span {
      color: #fff799;
    }

    @keyframes planetarioRotate {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @keyframes planetarioSunPulse {
      0%, 100% {
        filter: brightness(1);
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        filter: brightness(1.25);
        transform: translate(-50%, -50%) scale(1.08);
      }
    }

    @keyframes planetarioGridMove {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 72px 72px;
      }
    }

    @keyframes planetarioScan {
      from {
        top: -18px;
      }
      to {
        top: 100%;
      }
    }

    @keyframes planetarioBtnPulse {
      0%, 100% {
        transform: translateY(0);
        filter: brightness(1);
      }
      50% {
        transform: translateY(-2px);
        filter: brightness(1.2);
      }
    }

    @media (max-width: 440px) {
      #planetario-virtual-box {
        width: 94vw;
      }

      .planetario-stage {
        height: 240px;
      }

      #planetario-virtual-enter {
        min-width: 200px;
        font-size: 9px;
      }

      .planetario-core-text {
        font-size: 9px;
      }
    }
  `;

  document.head.appendChild(style);
}

function cerrarPlanetarioVirtualPopup() {
  const overlay = document.getElementById("planetario-virtual-overlay");
  if (overlay) overlay.remove();

  detenerMusicaPopupPlanetario();
  reanudarMusicaAmbienteDespuesPlanetario();
}

// ======================================================
// AUDIO POPUP PLANETARIO - DOMO ESPACIAL
// Pausa música ambiente y reproduce música del planetario
// ======================================================

const PLANETARIO_POPUP_AUDIO_SRC = "https://enycosmicplayer.vercel.app/entornosExternos/sistemaSolar/song/planetarioSong.mp3";

let planetarioPopupAudio = null;
let planetarioAmbientWasPlaying = false;

function pausarMusicaAmbienteParaPlanetario() {
  planetarioAmbientWasPlaying = false;

  if (typeof ensureAmbientAudio === "function") {
    const audio = ensureAmbientAudio();

    if (audio && !audio.paused) {
      planetarioAmbientWasPlaying = true;
    }
  }

  if (typeof pauseAmbientMusic === "function") {
    pauseAmbientMusic();
  } else if (typeof ambientAudio !== "undefined" && ambientAudio) {
    ambientAudio.pause();
  }
}

function reproducirMusicaPopupPlanetario() {
  if (!planetarioPopupAudio) {
    planetarioPopupAudio = new Audio(PLANETARIO_POPUP_AUDIO_SRC);
    planetarioPopupAudio.loop = true;
    planetarioPopupAudio.volume = 0.75;
  }

  planetarioPopupAudio.currentTime = 0;

  planetarioPopupAudio.play().catch(error => {
    console.warn("El navegador bloqueó el audio del planetario hasta una interacción del usuario:", error);
  });
}

function detenerMusicaPopupPlanetario() {
  if (planetarioPopupAudio) {
    planetarioPopupAudio.pause();
    planetarioPopupAudio.currentTime = 0;
  }
}

function reanudarMusicaAmbienteDespuesPlanetario() {
  const ambienteActivo =
    typeof getAmbientEnabled === "function"
      ? getAmbientEnabled()
      : true;

  if (!ambienteActivo) return;
  if (!planetarioAmbientWasPlaying) return;

  if (typeof playAmbientMusic === "function") {
    playAmbientMusic();
  } else if (typeof ambientAudio !== "undefined" && ambientAudio) {
    ambientAudio.play().catch(() => { });
  }

  planetarioAmbientWasPlaying = false;
}

window.openPlanetarioVirtualPopup = function () {
  ensurePlanetarioVirtualStyles();

  const existente = document.getElementById("planetario-virtual-overlay");
  if (existente) existente.remove();
  pausarMusicaAmbienteParaPlanetario();
  reproducirMusicaPopupPlanetario();

  const overlay = document.createElement("div");
  overlay.id = "planetario-virtual-overlay";

  overlay.innerHTML = `
    <div id="planetario-virtual-box">
      <div id="planetario-virtual-header">
        <div id="planetario-virtual-title">Planetario virtual</div>
        <button id="planetario-virtual-close" type="button">×</button>
      </div>

      <div id="planetario-virtual-body">
        <div class="planetario-stage">
          <div class="planetario-stars"></div>
          <div class="planetario-scan"></div>

          <div class="planetario-orbit o1">
            <div class="planetario-planet p1"></div>
          </div>

          <div class="planetario-orbit o2">
            <div class="planetario-planet p2"></div>
          </div>

          <div class="planetario-orbit o3">
            <div class="planetario-planet p3">
              <div class="planetario-ring"></div>
            </div>
          </div>

          <div class="planetario-sun"></div>

          <div class="planetario-enter-wrap">
            <button id="planetario-virtual-enter" type="button">
              Ingresar al planetario
            </button>
          </div>

          <div class="planetario-core-text">
            Accede al planetario de la Escuela Espacial de Enycosmic.
          </div>
        </div>

        <div class="planetario-info">
          Explora planetas, astrofotografías y modelos 3D desde el Domo espacial.
          <br>
          <span>Entrada holográfica lista.</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("planetario-virtual-close").onclick = cerrarPlanetarioVirtualPopup;

  document.getElementById("planetario-virtual-enter").onclick = function () {
    window.location.href = "../entornosExternos/sistemaSolar/planetario.html";
  };

  overlay.addEventListener("pointerdown", function (e) {
    if (e.target === overlay) {
      e.preventDefault();
      cerrarPlanetarioVirtualPopup();
    }
  }, { passive: false });
};

// ======================================================
// DESTILADOR MINERAL - MAPA 1 DOMO ESPACIAL
// Bloque: bloque_ambiente_14017
// Consume: 5 agua
// Otorga: 1 sal + 1 hierro
// ======================================================

const DESTILADOR_MINERAL_CONFIG = {
  aguaIds: ["agua"],
  costoAgua: 5,
  recompensas: [
    { id: "sal", cantidad: 1 },
    { id: "hierro", cantidad: 1 }
  ]
};

const destiladorMineralState = {
  aguaCargada: 0,
  procesando: false,
  etapa: "idle",
  resultadoMensaje: ""
};

function ensureDestiladorMineralStyles() {
  if (document.getElementById("destilador-mineral-style")) return;

  const style = document.createElement("style");
  style.id = "destilador-mineral-style";

  style.textContent = `
    #destilador-mineral-overlay {
      position: fixed;
      inset: 0;
      z-index: 90000;
      background:
        radial-gradient(circle at center, rgba(24,245,225,.16), rgba(0,0,0,.48) 58%),
        rgba(0,0,0,.42);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      pointer-events: auto;
      font-family: arcade, monospace;
    }

    #destilador-mineral-box {
      width: min(94vw, 430px);
      max-width: 430px;
      background: rgba(0,0,0,.92);
      color: #00ffcc;
      box-shadow:
        0 0 0 2px #0b3d35,
        0 0 0 4px #00ffcc,
        0 0 28px rgba(24,245,225,.35),
        0 18px 40px rgba(0,0,0,.75);
      image-rendering: pixelated;
      overflow: hidden;
      box-sizing: border-box;
    }

    #destilador-mineral-header {
      height: 42px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      background: #111;
      border-bottom: 2px solid #00ffcc;
      box-sizing: border-box;
    }

    #destilador-mineral-title {
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #00ffcc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #destilador-mineral-close {
      width: 30px;
      height: 30px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-sizing: border-box;
    }

    #destilador-mineral-close:active,
    #destilador-mineral-run:active,
    #destilador-mineral-load-water:active {
      transform: translateY(1px);
    }

    #destilador-mineral-body {
      padding: 10px;
      display: grid;
      gap: 10px;
      background:
        repeating-linear-gradient(
          to bottom,
          rgba(0,255,204,.055) 0px,
          rgba(0,255,204,.055) 2px,
          transparent 2px,
          transparent 6px
        ),
        linear-gradient(180deg, #020b0f, #000);
      box-sizing: border-box;
    }

    .destilador-screen {
      border: 2px solid rgba(0,255,204,.45);
      background:
        radial-gradient(circle at 24% 50%, rgba(0,255,204,.16), transparent 36%),
        rgba(0,255,204,.05);
      padding: 10px;
      display: grid;
      grid-template-columns: 112px 1fr;
      gap: 10px;
      align-items: center;
      box-sizing: border-box;
    }

    .destilador-machine {
      position: relative;
      width: 102px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .destilador-orb {
      position: absolute;
      top: 8px;
      left: 10px;
      width: 82px;
      height: 82px;
      border: 3px solid #6ef7ff;
      background: #02070c;
      box-shadow:
        inset 0 0 18px rgba(110,247,255,.35),
        0 0 16px rgba(110,247,255,.32);
      overflow: hidden;
      z-index: 2;
    }

    .destilador-orb.empty .destilador-liquid {
      height: 0;
      opacity: .35;
    }

    .destilador-liquid {
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 8px;
      height: 42px;
      background:
        linear-gradient(180deg, rgba(110,247,255,.95), rgba(0,80,255,.78));
      box-shadow: 0 0 14px rgba(110,247,255,.7);
      animation: destiladorLiquid 1.8s ease-in-out infinite;
      transition: height 260ms ease, opacity 260ms ease;
    }

    .destilador-bubble {
      position: absolute;
      width: 7px;
      height: 7px;
      border: 2px solid #fff;
      background: rgba(110,247,255,.35);
      box-shadow: 0 0 8px rgba(110,247,255,.8);
      animation: destiladorBubble 1.5s linear infinite;
      opacity: 0;
    }

    .destilador-bubble.b1 {
      left: 22px;
      bottom: 22px;
      animation-delay: 0s;
    }

    .destilador-bubble.b2 {
      left: 42px;
      bottom: 18px;
      animation-delay: .45s;
    }

    .destilador-bubble.b3 {
      left: 57px;
      bottom: 28px;
      animation-delay: .8s;
    }

    .destilador-pipe {
      position: absolute;
      top: 28px;
      right: 0;
      width: 26px;
      height: 10px;
      border-top: 3px solid #6ef7ff;
      border-right: 3px solid #6ef7ff;
      box-shadow: 0 0 10px rgba(110,247,255,.4);
      z-index: 1;
    }

    .destilador-fire {
      position: absolute;
      left: 18px;
      bottom: 2px;
      width: 64px;
      height: 52px;
      opacity: 0;
      z-index: 1;
      filter: drop-shadow(0 0 12px rgba(255,120,0,.95));
    }

    .fire-core {
      position: absolute;
      left: 18px;
      bottom: 0;
      width: 28px;
      height: 18px;
      background: radial-gradient(circle, #fff799 0%, #ffe066 45%, #ff8c00 75%, rgba(255,60,60,.85) 100%);
      border-radius: 50% 50% 40% 40%;
      box-shadow:
        0 0 12px rgba(255,224,102,.95),
        0 0 24px rgba(255,140,0,.75),
        0 0 36px rgba(255,60,60,.45);
      animation: fireCorePulse .18s infinite alternate;
    }

    .fire-flame {
      position: absolute;
      bottom: 8px;
      background: linear-gradient(180deg, #fff799 0%, #ffe066 30%, #ff8c00 68%, #ff3c3c 100%);
      border-radius: 50% 50% 45% 45%;
      transform-origin: bottom center;
      box-shadow:
        0 0 10px rgba(255,224,102,.85),
        0 0 18px rgba(255,140,0,.7),
        0 0 24px rgba(255,60,60,.45);
    }

    .fire-flame.flame-1 {
      left: 6px;
      width: 18px;
      height: 26px;
      animation: fireFlameLeft .2s infinite alternate;
    }

    .fire-flame.flame-2 {
      left: 22px;
      width: 22px;
      height: 36px;
      animation: fireFlameCenter .16s infinite alternate;
    }

    .fire-flame.flame-3 {
      left: 40px;
      width: 18px;
      height: 26px;
      animation: fireFlameRight .22s infinite alternate;
    }

    .destilador-steam {
      position: absolute;
      left: 14px;
      top: 0;
      width: 76px;
      height: 60px;
      opacity: 0;
      z-index: 4;
      pointer-events: none;
    }

    .destilador-steam span {
      position: absolute;
      bottom: 0;
      width: 10px;
      height: 10px;
      border: 2px solid rgba(255,255,255,.8);
      background: rgba(110,247,255,.18);
      box-shadow: 0 0 10px rgba(255,255,255,.55);
      animation: destiladorSteam 1.2s linear infinite;
    }

    .destilador-steam span:nth-child(1) {
      left: 14px;
      animation-delay: 0s;
    }

    .destilador-steam span:nth-child(2) {
      left: 34px;
      animation-delay: .25s;
    }

    .destilador-steam span:nth-child(3) {
      left: 52px;
      animation-delay: .5s;
    }

    .destilador-output {
      position: absolute;
      right: -14px;
      bottom: 8px;
      width: 94px;
      min-height: 44px;
      border: 2px solid rgba(255,224,102,.78);
      background: rgba(255,224,102,.08);
      box-shadow:
        0 0 12px rgba(255,224,102,.35),
        inset 0 0 10px rgba(255,224,102,.12);
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 4px 6px;
      box-sizing: border-box;
      z-index: 5;
    }

    .destilador-output-item {
      display: grid;
      justify-items: center;
      align-items: center;
      gap: 2px;
    }

    .destilador-output-icon {
      font-size: 15px;
      line-height: 1;
    }

    .destilador-output-qty {
      font-size: 10px;
      line-height: 1;
      color: #fff;
      text-shadow:
        0 0 6px rgba(255,224,102,.85),
        1px 1px 0 #000;
      animation: outputQtyPulse .45s infinite alternate;
    }

    .destilador-machine.is-loading .destilador-orb {
      animation: destiladorPulse .55s ease 2;
    }

    .destilador-machine.is-heating .destilador-fire,
    .destilador-machine.is-evaporating .destilador-fire {
      opacity: 1;
    }

    .destilador-machine.is-heating .destilador-orb {
      box-shadow:
        inset 0 0 18px rgba(110,247,255,.45),
        0 0 20px rgba(255,60,60,.55);
    }

    .destilador-machine.is-evaporating .destilador-steam,
    .destilador-machine.is-evaporating .destilador-bubble {
      opacity: 1;
    }

    .destilador-machine.is-complete .destilador-output {
      opacity: 1;
      animation: destiladorOutput .7s ease infinite alternate;
    }

    .destilador-machine.is-complete .destilador-liquid {
      height: 12px;
      opacity: .65;
    }

    .destilador-data {
      display: grid;
      gap: 5px;
    }

    .destilador-label {
      margin: 0;
      color: #fff799;
      font-size: 10px;
      text-transform: uppercase;
    }

    .destilador-title {
      margin: 0;
      color: #ffffff;
      font-size: 12px;
      line-height: 1.35;
      text-transform: uppercase;
    }

    .destilador-copy {
      margin: 0;
      color: #00ffcc;
      font-size: 10px;
      line-height: 1.45;
    }

    .destilador-inventory-row {
      border: 2px solid rgba(0,255,204,.42);
      background: rgba(0,255,204,.06);
      padding: 8px;
      display: grid;
      gap: 8px;
    }

    .destilador-inventory-title {
      margin: 0;
      color: #fff799;
      font-size: 10px;
      text-transform: uppercase;
      text-align: center;
    }

    .destilador-water-slot {
      min-height: 52px;
      border: 2px solid rgba(110,247,255,.65);
      background:
        radial-gradient(circle at center, rgba(110,247,255,.2), rgba(0,0,0,.1)),
        rgba(0,0,0,.3);
      color: #ffffff;
      display: grid;
      grid-template-columns: 44px 1fr auto;
      gap: 8px;
      align-items: center;
      padding: 6px;
      box-sizing: border-box;
      font-family: arcade, monospace;
    }

    .destilador-water-icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border: 2px solid rgba(110,247,255,.45);
      background: rgba(110,247,255,.09);
      font-size: 20px;
      box-shadow: 0 0 10px rgba(110,247,255,.22);
    }

    .destilador-water-info {
      display: grid;
      gap: 3px;
    }

    .destilador-water-name {
      font-size: 10px;
      color: #fff;
      text-transform: uppercase;
    }

    .destilador-water-count {
      font-size: 10px;
      color: #00ffcc;
    }

    #destilador-mineral-load-water {
      min-height: 34px;
      padding: 0 8px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 9px;
      text-transform: uppercase;
      box-sizing: border-box;
    }

    #destilador-mineral-load-water:disabled {
      opacity: .45;
      cursor: not-allowed;
    }

    .destilador-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .destilador-card {
      border: 2px solid rgba(0,255,204,.42);
      background: rgba(0,255,204,.06);
      padding: 8px;
      display: grid;
      gap: 5px;
      text-align: center;
    }

    .destilador-card-title {
      color: #fff799;
      font-size: 10px;
      text-transform: uppercase;
    }

    .destilador-card-main {
      color: #ffffff;
      font-size: 11px;
      line-height: 1.35;
    }

    .destilador-reaction {
      border: 2px solid rgba(110,247,255,.42);
      background: rgba(110,247,255,.06);
      color: #ffffff;
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 10px;
      text-align: center;
      flex-wrap: wrap;
      padding: 4px;
      box-sizing: border-box;
    }

    .destilador-arrow {
      color: #fff799;
      text-shadow: 0 0 8px rgba(255,224,102,.7);
    }

    .destilador-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }

    .destilador-step {
      border: 1px solid rgba(0,255,204,.35);
      background: rgba(0,0,0,.35);
      color: rgba(255,255,255,.55);
      font-size: 8px;
      line-height: 1.25;
      text-align: center;
      padding: 6px 3px;
      box-sizing: border-box;
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .destilador-step.active {
      color: #fff799;
      border-color: rgba(255,224,102,.8);
      background: rgba(255,224,102,.08);
      box-shadow: 0 0 10px rgba(255,224,102,.18);
    }

    .destilador-step.done {
      color: #00ffcc;
      border-color: rgba(0,255,204,.7);
    }

    .destilador-status {
      margin: 0;
      font-size: 10px;
      line-height: 1.45;
      text-align: center;
      padding: 8px;
      border: 2px solid rgba(0,255,204,.3);
      background: rgba(0,0,0,.35);
    }

    .destilador-status.ok {
      color: #00ffcc;
    }

    .destilador-status.fail {
      color: #ffe066;
      border-color: rgba(255,224,102,.45);
    }

    .destilador-result-message {
      border: 2px solid rgba(0,255,204,.85);
      background:
        radial-gradient(circle at left, rgba(0,255,204,.18), rgba(0,0,0,.35)),
        rgba(0,255,204,.08);
      color: #ffffff;
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
      font-size: 10px;
      line-height: 1.35;
      padding: 8px;
      box-sizing: border-box;
      box-shadow:
        0 0 12px rgba(0,255,204,.28),
        inset 0 0 10px rgba(0,255,204,.08);
      animation: destiladorResultIn .28s ease forwards;
    }

    .destilador-result-check {
      width: 20px;
      height: 20px;
      border: 2px solid #00ffcc;
      color: #00ffcc;
      display: grid;
      place-items: center;
      font-size: 12px;
      box-shadow: 0 0 10px rgba(0,255,204,.35);
      flex: 0 0 auto;
    }

    .destilador-actions {
      display: flex;
      justify-content: center;
    }

    #destilador-mineral-run {
      min-width: 210px;
      min-height: 38px;
      padding: 0 8px;
      background: #000;
      color: #00ffcc;
      border: 2px solid #00ffcc;
      font-family: arcade, monospace;
      font-size: 10px;
      text-transform: uppercase;
      box-sizing: border-box;
    }

    #destilador-mineral-run:disabled {
      opacity: .45;
      cursor: not-allowed;
    }

    @keyframes destiladorLiquid {
      0%, 100% { transform: translateY(0); filter: brightness(1); }
      50% { transform: translateY(-4px); filter: brightness(1.25); }
    }

    @keyframes destiladorBubble {
      0% { transform: translateY(0) scale(.75); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translateY(-44px) scale(1.15); opacity: 0; }
    }

    @keyframes destiladorSteam {
      0% { transform: translateY(0) scale(.65); opacity: 0; }
      25% { opacity: 1; }
      100% { transform: translateY(-48px) scale(1.35); opacity: 0; }
    }

    @keyframes destiladorPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }

    @keyframes destiladorOutput {
      from { transform: translateY(0); filter: brightness(1); }
      to { transform: translateY(-3px); filter: brightness(1.25); }
    }

    @keyframes fireCorePulse {
      from { transform: scale(1); filter: brightness(1); }
      to { transform: scale(1.12); filter: brightness(1.18); }
    }

    @keyframes fireFlameLeft {
      from { transform: scaleY(1) skewX(-8deg); height: 24px; }
      to { transform: scaleY(1.18) skewX(-14deg); height: 30px; }
    }

    @keyframes fireFlameCenter {
      from { transform: scaleY(1); height: 32px; }
      to { transform: scaleY(1.22); height: 40px; }
    }

    @keyframes fireFlameRight {
      from { transform: scaleY(1) skewX(8deg); height: 24px; }
      to { transform: scaleY(1.18) skewX(14deg); height: 30px; }
    }

    @keyframes outputQtyPulse {
      from { transform: translateY(0) scale(1); opacity: .88; }
      to { transform: translateY(-2px) scale(1.08); opacity: 1; }
    }

    @keyframes destiladorResultIn {
      from { opacity: 0; transform: translateY(-6px) scale(.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 420px) {
      .destilador-screen {
        grid-template-columns: 1fr;
        justify-items: center;
      }

      .destilador-machine {
        margin-top: 4px;
      }

      .destilador-steps {
        grid-template-columns: 1fr 1fr;
      }

      .destilador-water-slot {
        grid-template-columns: 40px 1fr;
      }

      #destilador-mineral-load-water {
        grid-column: 1 / -1;
      }
    }
  `;

  document.head.appendChild(style);
}

function contarItemDestilador(itemIds = []) {
  let total = 0;

  for (const item of (window.inventarioUser || [])) {
    if (!item) continue;

    const id = item.id ?? item.item_id;
    if (!itemIds.includes(id)) continue;

    total += Number(item.cantidad || 1);
  }

  return total;
}

function buscarItemBaseDestilador(itemId) {
  const base = (window.itemsData || []).find(item => item.id === itemId);

  if (base) {
    return {
      ...base,
      cantidad: 1,
      usos: base.usos ?? null,
      usos_maximos: base.usos_maximos ?? null
    };
  }

  const fallback = {
    sal: {
      id: "sal",
      nombre_item: "Sal mineral",
      tipo_item: "material",
      imagen: "./assets/items/sal.svg",
      agotable: false,
      desaparece_al_agotarse: true,
      combinable: true,
      precio_compra: 1
    },
    hierro: {
      id: "hierro",
      nombre_item: "Hierro",
      tipo_item: "material",
      imagen: "./assets/items/hierro.svg",
      agotable: false,
      desaparece_al_agotarse: true,
      combinable: true,
      precio_compra: 1
    }
  };

  return fallback[itemId] || null;
}

function quitarItemsDestilador(itemIds = [], cantidadNecesaria = 0) {
  let pendiente = Number(cantidadNecesaria || 0);

  for (let i = window.inventarioUser.length - 1; i >= 0; i--) {
    if (pendiente <= 0) break;

    const item = window.inventarioUser[i];
    if (!item) continue;

    const id = item.id ?? item.item_id;
    if (!itemIds.includes(id)) continue;

    const cantidadActual = Number(item.cantidad || 1);
    const quitar = Math.min(cantidadActual, pendiente);

    item.cantidad = cantidadActual - quitar;
    pendiente -= quitar;

    if (item.cantidad <= 0) {
      window.inventarioUser.splice(i, 1);
    }
  }

  return pendiente <= 0;
}

function validarMisionesDespuesDestilador() {
  const activeMissionId = window.missionSystem?.activeMissionId;

  if (activeMissionId && typeof validarPasoRecolectarItems === "function") {
    validarPasoRecolectarItems(activeMissionId);
  }

  if (typeof refreshMissionPanelIfOpen === "function") {
    refreshMissionPanelIfOpen();
  }
}

function cerrarDestiladorMineral() {
  const overlay = document.getElementById("destilador-mineral-overlay");
  if (overlay) overlay.remove();

  destiladorMineralState.aguaCargada = 0;
  destiladorMineralState.procesando = false;
  destiladorMineralState.etapa = "idle";
  destiladorMineralState.resultadoMensaje = "";
}

function getDestiladorEtapaClass(etapa) {
  if (etapa === "carga") return "is-loading";
  if (etapa === "calor") return "is-heating";
  if (etapa === "evaporacion") return "is-evaporating";
  if (etapa === "extraccion") return "is-complete";
  return "";
}

function getDestiladorStepClass(step) {
  const orden = ["carga", "calor", "evaporacion", "extraccion"];
  const actualIndex = orden.indexOf(destiladorMineralState.etapa);
  const stepIndex = orden.indexOf(step);

  if (actualIndex === -1) return "";
  if (actualIndex === stepIndex) return "active";
  if (actualIndex > stepIndex) return "done";

  return "";
}

function renderDestiladorMineral() {
  ensureDestiladorMineralStyles();

  const overlay = document.getElementById("destilador-mineral-overlay");
  if (!overlay) return;

  const totalAguaInventario = contarItemDestilador(DESTILADOR_MINERAL_CONFIG.aguaIds);
  const aguaCargada = destiladorMineralState.aguaCargada;
  const puedeCargar = !destiladorMineralState.procesando && totalAguaInventario > 0 && aguaCargada < DESTILADOR_MINERAL_CONFIG.costoAgua;
  const puedeDestilar = !destiladorMineralState.procesando && aguaCargada >= DESTILADOR_MINERAL_CONFIG.costoAgua;
  const etapaClass = getDestiladorEtapaClass(destiladorMineralState.etapa);
  const orbEmptyClass = aguaCargada <= 0 ? "empty" : "";

  overlay.innerHTML = `
    <div id="destilador-mineral-box">
      <div id="destilador-mineral-header">
        <div id="destilador-mineral-title">Destilador mineral</div>
        <button id="destilador-mineral-close" type="button">×</button>
      </div>

      <div id="destilador-mineral-body">
        <div class="destilador-screen">
          <div class="destilador-machine ${etapaClass}">
            <div class="destilador-pipe"></div>

            <div class="destilador-steam">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div class="destilador-orb ${orbEmptyClass}">
              <div class="destilador-liquid" style="height:${Math.min(42, aguaCargada * 8.4)}px"></div>
              <div class="destilador-bubble b1"></div>
              <div class="destilador-bubble b2"></div>
              <div class="destilador-bubble b3"></div>
            </div>

            <div class="destilador-fire">
              <span class="fire-core"></span>
              <span class="fire-flame flame-1"></span>
              <span class="fire-flame flame-2"></span>
              <span class="fire-flame flame-3"></span>
            </div>

            <div class="destilador-output">
              <div class="destilador-output-item">
                <span class="destilador-output-icon">🧂</span>
                <span class="destilador-output-qty">+1</span>
              </div>

              <div class="destilador-output-item">
                <span class="destilador-output-icon">⛓</span>
                <span class="destilador-output-qty">+1</span>
              </div>
            </div>
          </div>

          <div class="destilador-data">
            <p class="destilador-label">Química aplicada</p>
            <p class="destilador-title">Separación por evaporación</p>
            <p class="destilador-copy">
              El agua del Domo es mineralizada. Al calentarla, el H₂O pasa a vapor
              y los sólidos disueltos permanecen como residuo: sales minerales y trazas de hierro.
            </p>
          </div>
        </div>

        <div class="destilador-inventory-row">
          <p class="destilador-inventory-title">Inventario detectado</p>

          <button id="destilador-mineral-load-water" class="destilador-water-slot" type="button" ${puedeCargar ? "" : "disabled"}>
            <span class="destilador-water-icon">💧</span>

            <span class="destilador-water-info">
              <span class="destilador-water-name">id: agua</span>
              <span class="destilador-water-count">Inventario: ${totalAguaInventario} | Cargada: ${aguaCargada}/5</span>
            </span>

            <span>Cargar</span>
          </button>
        </div>

        <div class="destilador-grid">
          <div class="destilador-card">
            <span class="destilador-card-title">Entrada</span>
            <span class="destilador-card-main">5 agua mineralizada</span>
          </div>

          <div class="destilador-card">
            <span class="destilador-card-title">Salida</span>
            <span class="destilador-card-main">1 sal + 1 hierro</span>
          </div>
        </div>

        <div class="destilador-reaction">
          <span>H₂O + NaCl(aq) + Fe²⁺/Fe³⁺</span>
          <span class="destilador-arrow">➜</span>
          <span>H₂O(g) + NaCl(s) + Fe</span>
        </div>

        <div class="destilador-steps">
          <div class="destilador-step ${getDestiladorStepClass("carga")}">1. Carga de agua</div>
          <div class="destilador-step ${getDestiladorStepClass("calor")}">2. Calor térmico</div>
          <div class="destilador-step ${getDestiladorStepClass("evaporacion")}">3. Evaporación</div>
          <div class="destilador-step ${getDestiladorStepClass("extraccion")}">4. Extracción</div>
        </div>

        <p class="destilador-status ${puedeDestilar ? "ok" : "fail"}">
          ${destiladorMineralState.procesando
      ? "Ciclo activo: separando compuestos por diferencia de punto de ebullición y residuo sólido."
      : puedeDestilar
        ? "Carga completa. Puedes iniciar el ciclo de destilación mineral."
        : "Carga 5 unidades de agua para iniciar la extracción de sal y hierro."}
        </p>

        ${destiladorMineralState.resultadoMensaje ? `
          <div class="destilador-result-message">
            <span class="destilador-result-check">✓</span>
            <span>${destiladorMineralState.resultadoMensaje}</span>
          </div>
        ` : ""}

        <div class="destilador-actions">
          <button id="destilador-mineral-run" type="button" ${puedeDestilar ? "" : "disabled"}>
            Iniciar destilación
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("destilador-mineral-close").onclick = cerrarDestiladorMineral;

  document.getElementById("destilador-mineral-load-water").onclick = function () {
    cargarAguaEnDestiladorMineral();
  };

  document.getElementById("destilador-mineral-run").onclick = function () {
    procesarDestiladorMineral();
  };

  overlay.addEventListener("pointerdown", function (e) {
    if (e.target === overlay && !destiladorMineralState.procesando) {
      e.preventDefault();
      cerrarDestiladorMineral();
    }
  }, { passive: false });
}

function cargarAguaEnDestiladorMineral() {
  if (destiladorMineralState.procesando) return false;

  destiladorMineralState.resultadoMensaje = "";

  const totalAgua = contarItemDestilador(DESTILADOR_MINERAL_CONFIG.aguaIds);

  if (totalAgua <= 0) {
    if (typeof playerrorSound === "function") playerrorSound();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Sin agua",
        message: "No tienes unidades con id: agua en el inventario.",
        type: "warning",
        duration: 3500
      });
    }

    return false;
  }

  if (destiladorMineralState.aguaCargada >= DESTILADOR_MINERAL_CONFIG.costoAgua) {
    return false;
  }

  const consumoCorrecto = quitarItemsDestilador(DESTILADOR_MINERAL_CONFIG.aguaIds, 1);

  if (!consumoCorrecto) {
    if (typeof playerrorSound === "function") playerrorSound();
    return false;
  }

  destiladorMineralState.aguaCargada += 1;
  destiladorMineralState.etapa = "carga";

  if (typeof playtockSound === "function") playtockSound();

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  renderDestiladorMineral();

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;

    if (destiladorMineralState.etapa === "carga" && !destiladorMineralState.procesando) {
      destiladorMineralState.etapa = "idle";
      renderDestiladorMineral();
    }
  }, 650);

  return true;
}

function otorgarRecompensasDestiladorMineral() {
  for (const recompensa of DESTILADOR_MINERAL_CONFIG.recompensas) {
    const baseItem = buscarItemBaseDestilador(recompensa.id);

    if (!baseItem) {
      console.warn("No existe el item en items.json:", recompensa.id);
      continue;
    }

    const agregado = agregarItemAlInventario({
      ...baseItem,
      cantidad: recompensa.cantidad,
      usos: baseItem.usos ?? null,
      usos_maximos: baseItem.usos_maximos ?? null
    });

    if (!agregado && typeof playerrorSound === "function") {
      playerrorSound();
    }
  }

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  validarMisionesDespuesDestilador();

  /*--//Sincronizar wordpress(Inicio)--*/
  // Aquí debes guardar en WordPress el inventario actualizado.
  // Recomendado: sincronizar window.inventarioUser completo dentro del progreso del jugador.
  // Ejemplo futuro:
  // if (typeof guardarProgresoJugadorEnWordPress === "function") {
  //   guardarProgresoJugadorEnWordPress();
  // }
  /*--//Sincronizar wordpress(fin)--*/
}

function procesarDestiladorMineral() {
  if (destiladorMineralState.procesando) return false;

  destiladorMineralState.resultadoMensaje = "";

  if (destiladorMineralState.aguaCargada < DESTILADOR_MINERAL_CONFIG.costoAgua) {
    if (typeof playerrorSound === "function") playerrorSound();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Carga incompleta",
        message: `Necesitas cargar 5 unidades de agua. Cargadas: ${destiladorMineralState.aguaCargada}.`,
        type: "warning",
        duration: 4000
      });
    }

    renderDestiladorMineral();
    return false;
  }

  destiladorMineralState.procesando = true;
  destiladorMineralState.etapa = "calor";

  renderDestiladorMineral();

  if (typeof playFuegoSound === "function") {
    playFuegoSound();
  }

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;

    destiladorMineralState.etapa = "evaporacion";

    if (typeof playtockSound === "function") {
      playtockSound();
    }

    renderDestiladorMineral();
  }, 1300);

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;

    destiladorMineralState.etapa = "extraccion";

    if (typeof playgoodSound === "function") {
      playgoodSound();
    }

    renderDestiladorMineral();
  }, 2900);

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;

    otorgarRecompensasDestiladorMineral();

    destiladorMineralState.aguaCargada = 0;
    destiladorMineralState.procesando = false;
    destiladorMineralState.etapa = "extraccion";
    destiladorMineralState.resultadoMensaje = "Has obtenido 1 sal y 1 hierro. Los materiales ya están en tu inventario.";

    renderDestiladorMineral();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Extracción completada",
        message: "✓ Has obtenido 1 sal y 1 hierro.",
        type: "success",
        duration: 5200
      });
    }

    setTimeout(() => {
      if (!document.getElementById("destilador-mineral-overlay")) return;

      destiladorMineralState.etapa = "idle";
      renderDestiladorMineral();
    }, 1400);
  }, 3900);

  return true;
}

window.openDestiladorMineral = function () {
  ensureDestiladorMineralStyles();

  const existente = document.getElementById("destilador-mineral-overlay");
  if (existente) existente.remove();

  destiladorMineralState.aguaCargada = 0;
  destiladorMineralState.procesando = false;
  destiladorMineralState.etapa = "idle";
  destiladorMineralState.resultadoMensaje = "";

  const overlay = document.createElement("div");
  overlay.id = "destilador-mineral-overlay";
  document.body.appendChild(overlay);

  renderDestiladorMineral();
};

function cargarAguaEnDestiladorMineral() {
  if (destiladorMineralState.procesando) return false;

  const totalAgua = contarItemDestilador(DESTILADOR_MINERAL_CONFIG.aguaIds);

  if (totalAgua <= 0) {
    if (typeof playerrorSound === "function") playerrorSound();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Sin agua",
        message: "No tienes unidades con id: agua en el inventario.",
        type: "warning",
        duration: 3500
      });
    }

    return false;
  }

  if (destiladorMineralState.aguaCargada >= DESTILADOR_MINERAL_CONFIG.costoAgua) {
    return false;
  }

  const consumoCorrecto = quitarItemsDestilador(DESTILADOR_MINERAL_CONFIG.aguaIds, 1);

  if (!consumoCorrecto) {
    if (typeof playerrorSound === "function") playerrorSound();
    return false;
  }

  destiladorMineralState.aguaCargada += 1;
  destiladorMineralState.etapa = "carga";

  if (typeof playtockSound === "function") playtockSound();

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  renderDestiladorMineral();

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;
    if (destiladorMineralState.etapa === "carga" && !destiladorMineralState.procesando) {
      destiladorMineralState.etapa = "idle";
      renderDestiladorMineral();
    }
  }, 650);

  return true;
}

function otorgarRecompensasDestiladorMineral() {
  for (const recompensa of DESTILADOR_MINERAL_CONFIG.recompensas) {
    const baseItem = buscarItemBaseDestilador(recompensa.id);

    if (!baseItem) {
      console.warn("No existe el item en items.json:", recompensa.id);
      continue;
    }

    const agregado = agregarItemAlInventario({
      ...baseItem,
      cantidad: recompensa.cantidad,
      usos: baseItem.usos ?? null,
      usos_maximos: baseItem.usos_maximos ?? null
    });

    if (!agregado && typeof playerrorSound === "function") {
      playerrorSound();
    }
  }

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  validarMisionesDespuesDestilador();

  /*--//Sincronizar wordpress(Inicio)--*/
  // Aquí debes guardar en WordPress el inventario actualizado.
  // Recomendado: sincronizar window.inventarioUser completo dentro del progreso del jugador.
  // Ejemplo futuro:
  // if (typeof guardarProgresoJugadorEnWordPress === "function") {
  //   guardarProgresoJugadorEnWordPress();
  // }
  /*--//Sincronizar wordpress(fin)--*/
}

function procesarDestiladorMineral() {
  if (destiladorMineralState.procesando) return false;

  if (destiladorMineralState.aguaCargada < DESTILADOR_MINERAL_CONFIG.costoAgua) {
    if (typeof playerrorSound === "function") playerrorSound();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Carga incompleta",
        message: `Necesitas cargar 5 unidades de agua. Cargadas: ${destiladorMineralState.aguaCargada}.`,
        type: "warning",
        duration: 4000
      });
    }

    return false;
  }

  destiladorMineralState.procesando = true;

  const secuencia = [
    { etapa: "calor", delay: 0, sound: "fuego" },
    { etapa: "evaporacion", delay: 1300, sound: "tock" },
    { etapa: "extraccion", delay: 2900, sound: "good" }
  ];

  for (const paso of secuencia) {
    setTimeout(() => {
      if (!document.getElementById("destilador-mineral-overlay")) return;

      destiladorMineralState.etapa = paso.etapa;

      if (paso.sound === "fuego" && typeof playFuegoSound === "function") {
        playFuegoSound();
      }

      if (paso.sound === "tock" && typeof playtockSound === "function") {
        playtockSound();
      }

      if (paso.sound === "good" && typeof playgoodSound === "function") {
        playgoodSound();
      }

      renderDestiladorMineral();
    }, paso.delay);
  }

  setTimeout(() => {
    if (!document.getElementById("destilador-mineral-overlay")) return;

    otorgarRecompensasDestiladorMineral();

    destiladorMineralState.aguaCargada = 0;
    destiladorMineralState.procesando = false;
    destiladorMineralState.etapa = "extraccion";

    renderDestiladorMineral();

    if (typeof showPopupFeedback === "function") {
      showPopupFeedback({
        title: "Destilación completa",
        message: "Obtuviste 1 sal mineral y 1 hierro.",
        type: "success",
        duration: 5000
      });
    }

    setTimeout(() => {
      if (!document.getElementById("destilador-mineral-overlay")) return;
      destiladorMineralState.etapa = "idle";
      renderDestiladorMineral();
    }, 900);
  }, 3900);

  return true;
}

window.openDestiladorMineral = function () {
  ensureDestiladorMineralStyles();

  const existente = document.getElementById("destilador-mineral-overlay");
  if (existente) existente.remove();

  destiladorMineralState.aguaCargada = 0;
  destiladorMineralState.procesando = false;
  destiladorMineralState.etapa = "idle";

  const overlay = document.createElement("div");
  overlay.id = "destilador-mineral-overlay";
  document.body.appendChild(overlay);

  renderDestiladorMineral();
};


function tomarItemDeArcilla() {

  const itemArcilla = {
    id: "arcilla",
    nombre_item: "Arcilla",
    tipo_item: "material",
    imagen: "../assets/items/arcilla.svg",
    agotable: false,
    cantidad_de_usos: null,
    cuanto_quita_de_vida_al_enemigo: 0,
    desaparece_al_agotarse: true,
    creable: false,
    materiales_requeridos_para_crear: [],
    combinable: true,
    precio_compra: 1
  };

  const agregado = agregarItemAlInventario({
    ...itemArcilla,
    cantidad: 1,
    usos: null,
    usos_maximos: null
  });

  if (!agregado) {
    playerrorSound();
    return;
  }

  showPopupFeedback({
    title: "Recolección",
    message: "Has tomado arcilla.",
    type: "success",
    duration: 5000
  });

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }
  const activeMissionId = window.missionSystem.activeMissionId;
  if (activeMissionId) {
    validarPasoRecolectarItems(activeMissionId);
  }
}

function tomarItemDeBasura() {
  if (!Array.isArray(itemsData) || itemsData.length === 0) return;

  const LIMITE_BASURA = {
    corazon: 8,
    bateria: 15,
    rueda: 16
  };

  const basuraStats = JSON.parse(localStorage.getItem("basura_stats") || "{}");

  const itemsProhibidos = [
    "escudo_de_hierro",
    "espada_de_hierro",
    "patines",
    "pico_escabador",
    "bumerang",
    "antorcha",
    "espada_de_madera",
    "escudo_de_madera",
    "pistola_lazer",
    "bloque_de_arcilla",
    "balinera",
    "diodo_lazer",
    "cobre",
    "hierro",
    "cable"
  ];

  const itemsValidos = itemsData.filter(item => {
    if (!item || !item.id) return false;

    if (itemsProhibidos.includes(item.id)) return false;

    if (item.id === "corazon" || item.id === "bateria" || item.id === "rueda") {
      return (basuraStats[item.id] || 0) < LIMITE_BASURA[item.id];
    }

    return true;
  });

  if (itemsValidos.length === 0) {
    playerrorSound();
    showPopupFeedback({
      title: "Basura vacía",
      message: "Ya no hay objetos útiles para encontrar aquí.",
      type: "warning",
      duration: 5000
    });
    return;
  }

  const itemRandom = itemsValidos[Math.floor(Math.random() * itemsValidos.length)];

  const agregado = agregarItemAlInventario({
    ...itemRandom,
    cantidad: 1,
    usos: itemRandom.cantidad_de_usos ?? null,
    usos_maximos: itemRandom.cantidad_de_usos ?? null,
    cuanto_quita_de_vida_al_enemigo: itemRandom.cuanto_quita_de_vida_al_enemigo ?? 0,
    desaparece_al_agotarse: itemRandom.desaparece_al_agotarse === true
  });

  if (!agregado) {
    playerrorSound();
    return;
  }

  if (itemRandom.id === "corazon" || itemRandom.id === "bateria" || itemRandom.id === "rueda") {
    basuraStats[itemRandom.id] = (basuraStats[itemRandom.id] || 0) + 1;
    localStorage.setItem("basura_stats", JSON.stringify(basuraStats));
  }

  playtockSound();

  showPopupFeedback({
    title: "Basura revisada",
    message: `Encontraste: ${itemRandom.nombre_item}`,
    type: "success",
    duration: 5000
  });

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  const activeMissionId = window.missionSystem.activeMissionId;
  if (activeMissionId) {
    validarPasoRecolectarItems(activeMissionId);
  }
}

function tomarAguaDeFuente() {
  const agregado = agregarItemAlInventario({
    id: "agua",
    nombre_item: "Agua",
    tipo_item: "consumible",
    imagen: "../assets/items/agua.svg",
    agotable: false,
    cantidad: 1,
    usos: null,
    usos_maximos: null,
    cuanto_quita_de_vida_al_enemigo: 0,
    desaparece_al_agotarse: true
  });

  if (!agregado) {
    playerrorSound();
    return;
  }

  showPopupFeedback({
    title: "Recolección",
    message: "Has tomado agua.",
    type: "success",
    duration: 5000
  });

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  const activeMissionId = window.missionSystem.activeMissionId;
  if (activeMissionId) {
    validarPasoRecolectarItems(activeMissionId);
  }
}
function tomarTimonDeArbol() {

  // 🎲 50% limón / 50% madera
  const esLimon = Math.random() < 0.5;

  const itemSeleccionado = esLimon
    ? {
      id: "limon",
      nombre_item: "Limón",
      tipo_item: "consumible",
      imagen: "../assets/items/limon.svg",
      agotable: false,
      cantidad_de_usos: null,
      cuanto_quita_de_vida_al_enemigo: 0,
      desaparece_al_agotarse: true,
      creable: false,
      materiales_requeridos_para_crear: [],
      combinable: true,
      precio_compra: 1
    }
    : {
      id: "madera",
      nombre_item: "Madera",
      tipo_item: "material",
      imagen: "../assets/items/madera.svg",
      agotable: false,
      cantidad_de_usos: null,
      cuanto_quita_de_vida_al_enemigo: 0,
      desaparece_al_agotarse: true,
      creable: false,
      materiales_requeridos_para_crear: [],
      combinable: true,
      precio_compra: 1
    };

  const agregado = agregarItemAlInventario({
    ...itemSeleccionado,
    cantidad: 1,
    usos: null,
    usos_maximos: null
  });

  if (!agregado) {
    playerrorSound();
    return;
  }

  showPopupFeedback({
    title: "Recolección",
    message: `Encontraste: ${itemSeleccionado.nombre_item}`,
    type: "success",
    duration: 5000
  });

  if (typeof refreshInventarioUI === "function") {
    refreshInventarioUI();
  }

  const activeMissionId = window.missionSystem.activeMissionId;
  if (activeMissionId) {
    validarPasoRecolectarItems(activeMissionId);
  }
}

/*ESPACIO DE NUEVAS FUNCIONES PARA MAPAS INDIVIDUALES (FIN) */

//--------------------------------------------------------------
/*--------Resetear datios de juego para pruebas (Inicio)*/
//--------------------------------------------------------------
function resetPlayerProfile() {
  localStorage.removeItem("avatar");
  localStorage.removeItem("avatarId");
  localStorage.removeItem("gender");
  localStorage.removeItem("profession");

  // Si usas más claves en el futuro, agrégalas aquí

  //console.log("Datos del jugador eliminados.");

  // Resetear variables en memoria (opcional pero recomendado)
  selectedGender = null;
  selectedAvatar = null;
  selectedProfession = null;
  hoveredAvatarIndex = 0;
  hoveredProfessionIndex = 0;

  checkingStep = "gender";
  gameMode = "checking";
}

//resetPlayerProfile() 