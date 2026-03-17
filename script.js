  /*
  Slogan: El nivel te lo quedas tu.
  
  -> Corrección de los local Storage para sincronización de base de datos a wordpress
  -> Creación de estados de mapa y sincronización con base de datos de wordpress. para que el usuario al salir del juego, y vuelva a entrar, aparesca en el mismo sitio en el que quedó
  -> Creación de estados de misiones y de items de mapa, y sincronización a bases de datos. todos los items se renuevan cada 24 horas, y las misiones cada 3 día
  
  //-------------------Fases de desarrollo Etapa 5.-----------
  1.	Integración de NPC para sistema de misiones 

  2.	Integración de enemigos 

    2.1.	percepción del enemigo al usuario 
    2.2.	Ataques del enemigo y afectación a sistema de vida usuario 
    2.3.	respuesta ataque y defensa de usuario a enemigo 

  3.	Integración de NPC ambiente (Caminando y hablando lanzando pistas por el mapa.

  4.	sistemas visuales y de bloques de colisión (No interactivo) para delimitación de área

    4.1.	colisión de usuario 
    4.2.	Colisión de enemigos 
    4.3.	colisión de npc deambulantes 
    4.4.	colisión de disparo

  5.	sistemas colacionables y cliqueables (Interactivo) 

  6.	Estados de mapa 

  7.	desarrollo de nuevo índex. para empezar el juego 

  8.	reorganización de carpetas y recursos 

  9.	Prueba inicial sincronización con WordPress solo con mapa 1
  */

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
  let username   = "jaisaac";
  let avatar     = localStorage.getItem("avatar");
  let profession = localStorage.getItem("profession");

  let cosmonedas = 0; //0 Inicial el saldo se gurdará en la base de datos

  // =============================
// TOP 15 (estático MVP) manejo incial de forma manual
// Solo nombre, avatarId, iq
// =============================
const TOP15_PLAYERS = [
  { name: "AstraNova", avatarId: "f1", iq: 18 },
  { name: "ProtaX", avatarId: "m6", iq: 15 },
  { name: "LunaByte", avatarId: "f7", iq: 21 },
  { name: "KairoZen", avatarId: "m3", iq: 31 },
  { name: "NebuLyn", avatarId: "f9", iq: 34 },
  { name: "OrionD", avatarId: "m1", iq: 9 },
  { name: "VegaPulse", avatarId: "f1", iq: 9 },
  { name: "MikaCore", avatarId: "f8", iq: 10 },
  { name: "AriaFlux", avatarId: "f4", iq: 12 },
  { name: "DarioQ", avatarId: "m2", iq: 4 },
  { name: "CleoStar", avatarId: "f3", iq: 6 },
  { name: "FreyaWave", avatarId: "f6", iq: 8 },
  { name: "NovaRift", avatarId: "f9", iq: 3 },
  { name: "KenzoLab", avatarId: "m3", iq: 5 },
  { name: "ZaneVoid", avatarId: "m9", iq: 5 },
];

// =============================
// NOVEDADES (MVP FRONTEND) anejo incial de forma manual
// =============================
const NOVEDADES = [
  { tag: "Proximamente", text: "Nueva zona Sector -3 con puertas cifradas y niebla." },
  { tag: "Actualizacion", text: "Optimización del joystick para reducir latencia en móviles." },
  { tag: "Premios", text: "Premio semanal: 200 cosmonedas por completar 3 misiones." },
  { tag: "Proximamente", text: "Sistema de inventario 3x3 con trajes y mejoras básicas." },
  { tag: "Actualizacion", text: "Barra de vida mejorada con efectos y alertas de peligro." },
  { tag: "Premios", text: "Logro: Explorador Alfa. Recompensa: insignia y 50 IQ." },
  { tag: "Proximamente", text: "Metafon: acceso rápido a mapa, notas y calculadora." },
  { tag: "Actualizacion", text: "Mejoras en carga de assets y transición al gameplay." },
  { tag: "Proximamente", text: "Ranking de IQ en tiempo real para usuarios activos." },
  { tag: "Premios", text: "Evento de bienvenida: 100 cosmonedas por crear profesión." },
  { tag: "Actualizacion", text: "Correcciones visuales del canvas y bordes pixel perfect." },
  { tag: "Proximamente", text: "Misiones diarias con rutas ocultas y secretos del mapa." },
];

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

// ===============================
//-----MetaMap (inicio)
// ===============================
function openMetaMap() {
  console.log("Abrir MetaMap en index.html");

  if (document.getElementById("metamap-overlay")) return;

  const MAP_SRC = "./assets/mapas/mapa1-5000x5000.svg";
  const WORLD_W = 5000;
  const WORLD_H = 5000;

  const playerX = (window.player && typeof window.player.x === "number") ? window.player.x : 3200;
  const playerY = (window.player && typeof window.player.y === "number") ? window.player.y : 1024;

  if (!document.getElementById("metamap-styles")) {
    const style = document.createElement("style");
    style.id = "metamap-styles";
    style.textContent = `
      #metamap-overlay{
        position:absolute;
        inset:0;
        z-index:3000;
        display:flex;
        align-items:center;
        justify-content:center;
        pointer-events:auto;
      }

      #metamap-panel{
        position:absolute;
        width:320px;
        height:320px;
        background:black;
        border:3px solid #00ffcc;
        box-shadow:
          0 0 0 2px #0b3d35,
          0 0 0 4px #00ffcc,
          0 10px 30px rgba(0,0,0,0.45);
        color:#00ffcc;
        font-family:"arcade","monospace";
        image-rendering:pixelated;
        overflow:hidden;
        touch-action:none;
      }

      #metamap-header{
        height:42px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 8px;
        background:#111;
        border-bottom:2px solid #00ffcc;
      }

      #metamap-title{
        font-size:12px;
        letter-spacing:1px;
        text-transform:uppercase;
      }

      #metamap-header-right{
        display:flex;
        gap:6px;
        align-items:center;
      }

      .metamap-btn{
        width:28px;
        height:28px;
        background:black;
        color:#00ffcc;
        border:2px solid #00ffcc;
        font-family:"arcade","monospace";
        font-size:14px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0;
      }

      .metamap-btn:active{
        transform:translateY(1px);
      }

      #metamap-viewport{
        position:relative;
        width:100%;
        height:calc(100% - 42px);
        overflow:hidden;
        background:black;
        touch-action:none;
        cursor:grab;
      }

      #metamap-viewport.dragging{
        cursor:grabbing;
      }

      #metamap-canvas{
        position:absolute;
        left:0;
        top:0;
        image-rendering:pixelated;
        transform-origin:top left;
        will-change:transform;
        user-select:none;
        -webkit-user-drag:none;
        pointer-events:none;
      }

      #metamap-player{
        position:absolute;
        width:18px;
        height:18px;
        pointer-events:none;
        transform-origin:center center;
      }

      #metamap-player::before{
        content:"";
        position:absolute;
        left:50%;
        top:50%;
        width:0;
        height:0;
        transform:translate(-50%, -60%);
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-bottom:14px solid #00ffcc;
        filter:drop-shadow(0 0 2px rgba(0,255,204,0.6));
      }

      #metamap-player::after{
        content:"";
        position:absolute;
        left:50%;
        top:50%;
        width:4px;
        height:4px;
        background:black;
        transform:translate(-50%, -20%);
      }

      #metamap-mission{
        position:absolute;
        width:20px;
        height:20px;
        pointer-events:none;
        display:none;
        transform-origin:center center;
        color:#ff2b2b;
        font-family:"arcade","monospace";
        font-size:18px;
        line-height:20px;
        text-align:center;
        text-shadow:
          1px 0 0 black,
          -1px 0 0 black,
          0 1px 0 black,
          0 -1px 0 black;
      }

      .metamap-starter-marker{
        position:absolute;
        width:20px;
        height:20px;
        pointer-events:none;
        display:none;
        color:yellow;
        font-family:"arcade","monospace";
        font-size:18px;
        line-height:20px;
        text-align:center;
        text-shadow:
          1px 0 0 black,
          -1px 0 0 black,
          0 1px 0 black,
          0 -1px 0 black;
      }
    `;
    document.head.appendChild(style);
  }

  const overlay = document.createElement("div");
  overlay.id = "metamap-overlay";

  const panel = document.createElement("div");
  panel.id = "metamap-panel";

  panel.innerHTML = `
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
    </div>
  `;

  overlay.appendChild(panel);
  document.getElementById("wrap").appendChild(overlay);

  const viewport = panel.querySelector("#metamap-viewport");
  const mapEl = panel.querySelector("#metamap-canvas");
  const playerEl = panel.querySelector("#metamap-player");

  const missionEl = document.createElement("div");
  missionEl.id = "metamap-mission";
  missionEl.textContent = "➤";
  viewport.appendChild(missionEl);

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

  function closeMetaMap() {
    overlay.remove();
  }

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
      const marker = document.createElement("div");
      marker.className = "metamap-starter-marker";
      const missionStarter = window.missionsData?.missions?.find(
  m => m.pasos?.[0]?.npcId === npc.id
);

if (
  missionStarter &&
  window.missionSystem?.completedMissionIds?.includes(missionStarter.id)
) {
  marker.textContent = "⚝";
} else {
  marker.textContent = "?";
}
      viewport.appendChild(marker);

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
    render();
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
    render();
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
    render();
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
  });

  if (mapEl.complete) {
    fitMapToViewport();
    syncStarterMissionMarkers();
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

  window.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closeMetaMap();
      window.removeEventListener("keydown", escHandler);
    }
  });

  window.addEventListener("resize", () => {
    if (!document.getElementById("metamap-overlay")) return;
    fitMapToViewport();
  });

  function metaMapLoop() {
    if (!document.getElementById("metamap-overlay")) return;
    render();
    requestAnimationFrame(metaMapLoop);
  }

  requestAnimationFrame(metaMapLoop);
}
// ===============================
//-----MetaMap (fin)
// ===============================

//================================
//-----CamaraAR (inicio)
//================================

function openCameraAR() {
  console.log("Abrir Cámara AR en index.html");

  if (document.getElementById("camera-ar-overlay")) return;

  const wrap = document.getElementById("wrap");
  const gameCanvas = document.getElementById("game");
  const previousGameCanvasVisibility = gameCanvas ? gameCanvas.style.visibility : "";

  if (!document.getElementById("camera-ar-styles")) {
    const style = document.createElement("style");
    style.id = "camera-ar-styles";
    style.textContent = `
      #camera-ar-overlay{
        position:absolute;
        width:95%;
        height:95%;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:1000;
        display:flex;
        flex-direction:column;
        border:3px solid #00ffcc;
        box-shadow:
          0 0 0 2px #0b3d35,
          0 0 0 4px #00ffcc,
          0 10px 30px rgba(0,0,0,0.45);
        overflow:hidden;
        touch-action:none;
        background:transparent;
      }

      .camera-ar-header{
        height:42px;
        min-height:42px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 8px;
        background:black;
        border-bottom:2px solid #00ffcc;
        color:#00ffcc;
        font-family:"arcade","monospace";
        z-index:5;
      }

      .camera-ar-title{
        font-size:12px;
        letter-spacing:1px;
        text-transform:uppercase;
      }

      .camera-ar-close{
        width:32px;
        height:30px;
        background:black;
        color:#00ffcc;
        border:2px solid #00ffcc;
        font-family:"arcade","monospace";
        font-size:14px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0;
      }

      .camera-ar-close:active{
        transform:translateY(1px);
      }

      .camera-ar-stage{
        position:relative;
        flex:1;
        width:100%;
        height:calc(100% - 42px);
        overflow:hidden;
        background:transparent;
      }

      .camera-ar-info{
        position:absolute;
        top:10px;
        left:10px;
        padding:6px 10px;
        background:rgba(0,0,0,0.55);
        color:#fff;
        z-index:4;
        font-size:14px;
        font-family:system-ui,sans-serif;
      }

      .camera-ar-video-source{
        display:none;
      }
    `;
    document.head.appendChild(style);
  }

  const overlay = document.createElement("div");
  overlay.id = "camera-ar-overlay";
  overlay.innerHTML = `
    <div class="camera-ar-header">
      <div class="camera-ar-title">MetaCam AR</div>
      <button class="camera-ar-close" type="button" aria-label="Cerrar">✕</button>
    </div>
    <div class="camera-ar-stage" id="camera-ar-stage">
      <div class="camera-ar-info" id="camera-ar-info">
        Apunta la cámara a tu marcador para ver el video en AR.<br>
        (Toca la pantalla una vez si el video no arranca).
      </div>
      <video
        id="camera-ar-video-source"
        class="camera-ar-video-source"
        src="./interactions/MetaCamAR/src/render.mp4"
        loop
        muted
        playsinline
        webkit-playsinline
      ></video>
    </div>
  `;

  wrap.appendChild(overlay);

  if (gameCanvas) {
    gameCanvas.style.visibility = "hidden";
  }

  const stage = overlay.querySelector("#camera-ar-stage");
  const infoEl = overlay.querySelector("#camera-ar-info");
  const closeBtn = overlay.querySelector(".camera-ar-close");
  const videoEl = overlay.querySelector("#camera-ar-video-source");

  const state = {
    scene: null,
    camera: null,
    renderer: null,
    arToolkitSource: null,
    arToolkitContext: null,
    markerRoot: null,
    videoTexture: null,
    animationId: null,
    resizeHandler: null,
    camVideoEl: null
  };

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => {
        s.dataset.loaded = "true";
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function closeCameraAR() {
    if (state.animationId) {
      cancelAnimationFrame(state.animationId);
      state.animationId = null;
    }

    if (state.resizeHandler) {
      window.removeEventListener("resize", state.resizeHandler);
    }

    try {
      if (state.videoTexture) {
        state.videoTexture.dispose();
      }
    } catch (err) {}

    try {
      if (state.renderer) {
        state.renderer.dispose();
        if (state.renderer.domElement && state.renderer.domElement.parentNode) {
          state.renderer.domElement.parentNode.removeChild(state.renderer.domElement);
        }
      }
    } catch (err) {}

    try {
      if (state.camVideoEl && state.camVideoEl.srcObject) {
        state.camVideoEl.srcObject.getTracks().forEach(track => track.stop());
      }
      if (state.camVideoEl && state.camVideoEl.parentNode) {
        state.camVideoEl.parentNode.removeChild(state.camVideoEl);
      }
    } catch (err) {}

    try {
      videoEl.pause();
      videoEl.removeAttribute("src");
      videoEl.load();
    } catch (err) {}

    if (gameCanvas) {
      gameCanvas.style.visibility = previousGameCanvasVisibility;
    }

    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  closeBtn.addEventListener("click", closeCameraAR);
  closeBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    closeCameraAR();
  }, { passive: false });

  Promise.all([
    loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"),
    loadScriptOnce("https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/three.js/build/ar-threex.js")
  ]).then(() => {
    const THREE = window.THREE;
    const THREEx = window.THREEx;

    if (!THREE || !THREEx) {
      throw new Error("Three.js o AR.js no cargaron.");
    }

    state.scene = new THREE.Scene();

    state.camera = new THREE.Camera();
    state.scene.add(state.camera);

    state.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false
    });
    state.renderer.setClearColor(0x000000, 0);
    state.renderer.setPixelRatio(window.devicePixelRatio || 1);
    state.renderer.setSize(stage.clientWidth, stage.clientHeight);
    state.renderer.domElement.style.position = "absolute";
    state.renderer.domElement.style.top = "0";
    state.renderer.domElement.style.left = "0";
    state.renderer.domElement.style.width = "100%";
    state.renderer.domElement.style.height = "100%";
    state.renderer.domElement.style.zIndex = "2";
    state.renderer.domElement.style.pointerEvents = "none";
    state.renderer.domElement.style.background = "transparent";
    stage.appendChild(state.renderer.domElement);

    state.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam"
    });

    state.resizeHandler = function () {
      if (!state.arToolkitSource) return;

      state.renderer.setSize(stage.clientWidth, stage.clientHeight);

      state.arToolkitSource.onResize();
      state.arToolkitSource.copySizeTo(state.renderer.domElement);

      if (state.arToolkitContext && state.arToolkitContext.arController !== null) {
        state.arToolkitSource.copySizeTo(state.arToolkitContext.arController.canvas);
      }
    };

    state.arToolkitSource.init(() => {
      state.resizeHandler();

      if (state.arToolkitSource.domElement) {
        state.camVideoEl = state.arToolkitSource.domElement;
        state.camVideoEl.style.position = "absolute";
        state.camVideoEl.style.top = "0";
        state.camVideoEl.style.left = "0";
        state.camVideoEl.style.width = "100%";
        state.camVideoEl.style.height = "100%";
        state.camVideoEl.style.objectFit = "cover";
        state.camVideoEl.style.zIndex = "1";
        state.camVideoEl.style.background = "transparent";
        stage.appendChild(state.camVideoEl);
      }
    });

    window.addEventListener("resize", state.resizeHandler);

    state.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "./interactions/MetaCamAR/repo/camera_para.dat",
      detectionMode: "mono"
    });

    state.arToolkitContext.init(() => {
      state.camera.projectionMatrix.copy(state.arToolkitContext.getProjectionMatrix());
    });

    state.markerRoot = new THREE.Group();
    state.scene.add(state.markerRoot);

    new THREEx.ArMarkerControls(state.arToolkitContext, state.markerRoot, {
      type: "pattern",
      patternUrl: "./interactions/MetaCamAR/src/markerQR.patt"
    });

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    state.scene.add(light);

    const tryPlayVideo = () => {
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
      }
    };

    stage.addEventListener("click", tryPlayVideo, { once: true });
    stage.addEventListener("touchstart", tryPlayVideo, { once: true, passive: true });

    state.videoTexture = new THREE.VideoTexture(videoEl);
    state.videoTexture.minFilter = THREE.LinearFilter;
    state.videoTexture.magFilter = THREE.LinearFilter;
    state.videoTexture.format = THREE.RGBFormat;

    const planeGeo = new THREE.PlaneGeometry(1.6, 0.9);
    const planeMat = new THREE.MeshBasicMaterial({
      map: state.videoTexture,
      side: THREE.DoubleSide
    });

    const videoPlane = new THREE.Mesh(planeGeo, planeMat);
    videoPlane.position.y = 0;
    videoPlane.rotation.x = -Math.PI / 2;
    state.markerRoot.add(videoPlane);

    function update() {
      if (state.arToolkitSource && state.arToolkitSource.ready !== false) {
        state.arToolkitContext.update(state.arToolkitSource.domElement);

        if (state.markerRoot.visible) {
          if (videoEl.paused) {
            videoEl.play().catch(() => {});
          }
          infoEl.style.display = "none";
        }
      }
    }

    function render() {
      state.renderer.render(state.scene, state.camera);
    }

    function animate() {
      if (!document.getElementById("camera-ar-overlay")) return;
      state.animationId = requestAnimationFrame(animate);
      update();
      render();
    }

    animate();
  }).catch((err) => {
    console.error("Error cargando Camera AR:", err);
    infoEl.innerHTML = `No se pudo iniciar la cámara AR.`;
  });
}

//================================
//-----CamaraAR (fin)
//===============================


window.addEventListener("message", (event) => {
  const data = event.data;

  if(!data || data.source !== "metafon") return;

  switch(data.action){
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

const  boxButtonsITems = document.querySelector('.box-buttons-items');

const missionsButton = document.getElementById('misions');
const novedadesButton = document.getElementById('novedades');
const iqButton = document.getElementById('iq');
const inventarioButton = document.getElementById('inventario');
const settingButton = document.getElementById('setting');

const joy = document.getElementById("joy");
const joyStick = document.getElementById("joyStick");

/*
missionsButton.addEventListener('click',function(){
    console.log('panel de misiones abierto')
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
    console.log("Seleccionar avatar");
    gameMode = "checking"; // aún no juega
    return;
  }

  // 🟢 3. Tiene todo correcto
  //console.log("Que comience el juego.");
  gameMode = "playing";
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

  const el = document.createElement("div");
  el.id = "container-interfas";
  el.className = "container-interfas";
  el.dataset.panel = type;

  let bodyHTML = "";

  switch (type) {
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

case "misions":
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

  el.innerHTML = `
    <div class="ui-header">
      <div class="ui-title">${title}</div>
      <button class="ui-close" type="button" aria-label="Cerrar">X</button>
    </div>

    <div class="ui-body">
      ${bodyHTML}
    </div>
  `;

  // cerrar
  const closeBtn = el.querySelector(".ui-close");

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeInterfas();
  });

  closeBtn.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeInterfas();
    },
    { passive: false }
  );

  el.addEventListener(
    "pointerdown",
    (e) => {
      e.stopPropagation();
    },
    { passive: true }
  );

  return el;
}

function openInterfas(type) {
  // Si ya está abierto, solo cambia contenido
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
  interfasEl = buildInterfas(type);
  wrapEl.appendChild(interfasEl);
}

function closeInterfas() {
  interfaceOpen = false;

  if (interfasEl && interfasEl.parentNode) {
    interfasEl.parentNode.removeChild(interfasEl);
  }
  interfasEl = null;
}

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
  const sorted = [...IQ_LEVELS].sort((a,b) => a.iq - b.iq);

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
  const sorted = [...list].sort((a,b) => b.iq - a.iq).slice(0, 15);

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

// Badge inicial (12) + animación en primera carga
(() => {
  const count = NOVEDADES.length;

  // animar una sola vez por sesión
  const key = "eny_novedades_pop_shown";
  const already = sessionStorage.getItem(key) === "1";

  setNovedadesCount(count, { animate: !already });

  if (!already && count > 0) {
    sessionStorage.setItem(key, "1");
  }
})();
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
  ambientIndex: "eny_settings_ambient_index",
};

// URLs externas (se abren nueva pestaña)
const SETTING_LINKS = {
  terms: "https://example.com/terminos",
  privacy: "https://example.com/privacidad",
  donations: "https://example.com/donaciones",
  support: "https://example.com/soporte",
};

// Música ambiente (por ahora YouTube; luego reemplazas por rutas locales)
const AMBIENT_TRACKS = [
  { name: "Ambiente 01", url: "https://www.youtube.com/watch?v=5qap5aO4i9A" },
  { name: "Ambiente 02", url: "https://www.youtube.com/watch?v=DWcJFNfaw9c" },
  { name: "Ambiente 03", url: "https://www.youtube.com/watch?v=hHW1oY26kxQ" },
];

// Tutorial (slides mock; tú luego cambias imágenes reales)
const TUTORIAL_SLIDES = [
  { img: "./assets/tutorial/slide1.png", text: "Bienvenido a Enycosmic. Usa el joystick para moverte." },
  { img: "./assets/tutorial/slide2.png", text: "Explora el mapa. Encuentra secretos y rutas ocultas." },
  { img: "./assets/tutorial/slide3.png", text: "Completa misiones para ganar cosmonedas e IQ." },
  { img: "./assets/tutorial/slide4.png", text: "Abre paneles: IQ, inventario, novedades y settings." },
];

// Estado UI tutorial (solo memoria)
let tutorialIndex = 0;

// Helpers storage
function getSettingVolume() {
  const v = Number(localStorage.getItem(LS_SETTINGS.volume));
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.8;
}
function setSettingVolume(v) {
  const n = Math.max(0, Math.min(1, Number(v) || 0));
  localStorage.setItem(LS_SETTINGS.volume, String(n));
  return n;
}

function getAmbientIndex() {
  const i = Number(localStorage.getItem(LS_SETTINGS.ambientIndex));
  const safe = Number.isFinite(i) ? i : 0;
  return Math.max(0, Math.min(AMBIENT_TRACKS.length - 1, safe));
}
function setAmbientIndex(i) {
  const idx = Math.max(0, Math.min(AMBIENT_TRACKS.length - 1, Number(i) || 0));
  localStorage.setItem(LS_SETTINGS.ambientIndex, String(idx));
  return idx;
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
        alert("Pantalla completa no disponible en este navegador.");
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
    // iOS Safari puede limitar fullscreen real (depende versión)
    console.warn("Fullscreen error:", e);
    //alert("Pantalla completa limitada en este dispositivo/navegador.");
  }
}

// Render Setting raíz
function buildSettingHTML() {
  const vol = getSettingVolume();
  const ambientIdx = getAmbientIndex();
  const ambient = AMBIENT_TRACKS[ambientIdx];

  const ambientOptions = AMBIENT_TRACKS.map((t, i) =>
    `<option value="${i}" ${i === ambientIdx ? "selected" : ""}>${t.name}</option>`
  ).join("");

  return `
    <div class="ui-settings-root">

      <div class="ui-settings-section">
        <p class="ui-settings-title">Volumen</p>
        <input class="ui-slider" type="range" min="0" max="1" step="0.01"
          value="${vol}"
          data-action="set-volume">
        <p class="ui-small">Volumen actual: ${Math.round(vol * 100)}%</p>
      </div>

      <div class="ui-settings-section">
        <p class="ui-settings-title">Música ambiente</p>
        <div class="ui-settings-row">
          <select class="ui-select" data-action="set-ambient">
            ${ambientOptions}
          </select>
          <button class="ui-btn" data-action="open-ambient">Abrir pista</button>
        </div>
        <p class="ui-small">Seleccionada: ${ambient.name}</p>
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

  const usosActuales = item.usos ?? 0;
  const desapareceAlAgotarse = item.desaparece_al_agotarse === true;
  const esAgotable = item.agotable === true;

  // Si ya se agotó y debe desaparecer, se elimina por completo
  if (esAgotable && usosActuales <= 0 && desapareceAlAgotarse) {
    window.equipSlots[slotIndex] = null;

    if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
      const bodyEl = interfasEl.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
    }
    return;
  }

  const agregado = window.agregarItemAlInventario({
    id: item.id ?? item.item_id,
    item_id: item.item_id ?? item.id,
    nombre_item: item.nombre_item,
    imagen: item.imagen,
    tipo_item: item.tipo ?? item.tipo_item ?? "",
    agotable: item.agotable === true,
    desaparece_al_agotarse: item.desaparece_al_agotarse === true,
    usos: item.usos ?? null,
    usos_maximos: item.usos_maximos ?? null,
    cantidad: 1
  });

  if (!agregado) {
    console.log("Inventario lleno, no se puede devolver el item equipado");
    return;
  }

  window.equipSlots[slotIndex] = null;

  if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
    const bodyEl = interfasEl.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
  }
}

window.devolverItemDesdeEquipado = devolverItemDesdeEquipado;

function equiparItemDelInventario(slotIndex) {
  const item = window.inventarioUser?.[slotIndex];
  if (!item) return;

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
    tipo === "consumible"

  console.log("Intentando equipar:", item);
  console.log("Tipo detectado:", tipo);

  if (!esEquipable) {
    console.log("Este item no se puede equipar");
    closeInventarioPopup();
    return;
  }

  window.equipSlots = window.equipSlots || [null, null];

  const slotLibre = window.equipSlots.findIndex(slot => slot === null);
  if (slotLibre === -1) {
    console.log("No hay espacio en los slots de equipo");
    closeInventarioPopup();
    return;
  }

  const agotable = item.agotable === true;
  const usosBase = Number(
    item.usos_restantes ??
    item.usos ??
    item.cantidad_de_usos ??
    item.cantidad_usos ??
    1
  ) || 1;

window.equipSlots[slotLibre] = {
  id: item.id ?? item.item_id,
  item_id: item.item_id ?? item.id,
  nombre_item: item.nombre_item ?? item.nombre ?? "Item",
  imagen: item.imagen ?? item.image ?? "",
  tipo: tipo,
  agotable: item.agotable === true,
  desaparece_al_agotarse: item.desaparece_al_agotarse === true,
  usos: item.usos ?? item.cantidad_de_usos ?? item.cantidad ?? 1,
  usos_maximos: item.cantidad_de_usos ?? item.cantidad_usos ?? item.usos ?? 1,
  cantidad: 1
};

  if ((item.cantidad || 1) > 1) {
    item.cantidad -= 1;
  } else {
    window.inventarioUser.splice(slotIndex, 1);
  }

  window.inventarioUser = window.inventarioUser.filter(Boolean);

  closeInventarioPopup();

  if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
    const bodyEl = interfasEl.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
  }
}

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

  const popup = document.createElement("div");
  popup.className = "ui-inv-popup";
  popup.innerHTML = `
    <div class="ui-inv-popup-title">${item.nombre_item}</div>
    <div class="ui-inv-popup-actions">
      <button class="ui-inv-popup-btn" type="button" data-inv-action="destruir">Destruir</button>
      <button class="ui-inv-popup-btn" type="button" data-inv-action="equipar">Equipar</button>
      <button class="ui-inv-popup-btn" type="button" data-inv-action="combinar">Combinar</button>
    </div>
  `;

  bodyEl.appendChild(popup);

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

// Render Tutorial (mini-swiper)
function buildTutorialHTML() {
  const total = TUTORIAL_SLIDES.length;
  tutorialIndex = Math.max(0, Math.min(total - 1, tutorialIndex));

  const slide = TUTORIAL_SLIDES[tutorialIndex];

  return `
    <div class="ui-tutorial">

      <div class="ui-settings-section">
        <p class="ui-settings-title">Tutorial del juego</p>
        <p class="ui-small">${tutorialIndex + 1}/${total}</p>
      </div>

      <div class="ui-tutorial-frame">
        <img class="ui-tutorial-img" src="${slide.img}" alt="Tutorial ${tutorialIndex + 1}">
        <p class="ui-tutorial-caption">${slide.text}</p>
      </div>

      <div class="ui-tutorial-controls">
        <button class="ui-btn" data-action="tutorial-prev">Anterior</button>
        <button class="ui-btn" data-action="tutorial-next">Siguiente</button>
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

  console.log("[SETTING ACTION CLICK]", action);

  e.preventDefault();
  e.stopPropagation();

  if (action === "open-link") {
    const key = el.dataset.link;
    const url = SETTING_LINKS[key];
    console.log("Abrir link:", key, url);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  if (action === "fullscreen") {
    console.log("Activar pantalla completa");
    toggleFullscreen();
    return;
  }

  if (action === "open-tutorial") {
    console.log("Abrir tutorial");
    const bodyEl = root.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildTutorialHTML();
    return;
  }

  if (action === "back-to-settings") {
    console.log("Volver a settings");
    const bodyEl = root.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
    return;
  }

  if (action === "tutorial-prev") {
    console.log("Tutorial anterior");
    tutorialIndex = Math.max(0, tutorialIndex - 1);
    const bodyEl = root.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildTutorialHTML();
    return;
  }

  if (action === "tutorial-next") {
    console.log("Tutorial siguiente");
    tutorialIndex = Math.min(TUTORIAL_SLIDES.length - 1, tutorialIndex + 1);
    const bodyEl = root.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildTutorialHTML();
    return;
  }

  if (action === "open-ambient") {
    const idx = getAmbientIndex();
    const url = AMBIENT_TRACKS[idx]?.url;
    console.log("Abrir música ambiente:", idx, url);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  if (action === "factory-reset") {
    console.log("Restablecer estado de fábrica");
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
      console.log("Música ambiente (change):", el.value);
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
      console.log("Volumen cambiado:", el.value);
      setSettingVolume(el.value);

      const info = root.querySelector(".ui-small");
      if (info) info.textContent = `Volumen actual: ${Math.round(getSettingVolume() * 100)}%`;
      return;
    }

    if (el.matches('[data-action="set-ambient"]')) {
      console.log("Música ambiente seleccionada:", el.value);
      setAmbientIndex(el.value);

      const bodyEl = root.querySelector(".ui-body");
      if (bodyEl) bodyEl.innerHTML = buildSettingHTML();
      return;
    }
  },
  true
);

  // ✅ CAPTURE: funciona aunque tengas preventDefault en #wrap
  document.addEventListener("pointerdown", handleActionEvent, true);

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
        const info = root.querySelector(".ui-small");
        if (info) info.textContent = `Volumen actual: ${Math.round(getSettingVolume() * 100)}%`;
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
}

// Funciones adicionales para escichar el mause arrba de los items (inicio)
/*
document.addEventListener("mouseover", (e) => {
  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (!slotEl) return;

  const item = getInventarioSlotItem(slotEl);
  if (!item) return;

  openInventarioPopup(slotEl, item);
}, true);

document.addEventListener("mouseout", (e) => {
  const fromSlot = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (!fromSlot) return;

  const nextEl = e.relatedTarget;

  if (
    nextEl &&
    (
      nextEl.closest?.(".ui-inv-popup") ||
      nextEl.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item")
    )
  ) {
    return;
  }

  closeInventarioPopup();
}, true);
*/
// Funciones adicionales para escichar el mause arrba de los items (Fin)

document.addEventListener("click", (e) => {
  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");

  if (slotEl) {
    const item = getInventarioSlotItem(slotEl);
    if (!item) return;

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
  if (e.pointerType === "mouse") return;

  const slotEl = e.target.closest?.("#container-interfas[data-panel='inventario'] .ui-inv-slot.has-item");
  if (!slotEl) return;

  const item = getInventarioSlotItem(slotEl);
  if (!item) return;

  e.preventDefault();
  e.stopPropagation();
  openInventarioPopup(slotEl, item);
}, { capture: true, passive: false });

// ✅ deja SOLO 1 llamada a esto (una sola vez en todo el archivo)
initSettingsDelegation();
//-----------------------------------------------------------------------------
//lógica Visual de Setting (fin)
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//Puntos de vida (inicio)
//-----------------------------------------------------------------------------
let pdv = 100;
const PDV_MAX = 100;
const CORAZON_SRC = "./assets/panelOptions/corazon.svg";
let corazonImg = null;



function drawLifeBar(ctx, canvas) {

  const barWidth = 18;
  const barHeight = 140;

  const marginLeft = 12;

  const barX = marginLeft;
  const barY = (canvas.height / 2) - (barHeight / 2);

  const fillHeight = (pdv / PDV_MAX) * barHeight;

  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
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
const METAFON_SRC = "./interactions/metafon.html";

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

  // 3) Bloquea gestos SOLO en el canvas / zona de juego, PERO NO en UI
  const blockZone = document.querySelector("#wrap") || document.body;

function isUIInteractiveTarget(t) {
  if (!t || !t.closest) return false;

  return !!t.closest(
    "#container-interfas," +
    "#metafon-container," +
    "#npc-dialog-overlay," +
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


const LOGO_SRC = "./assets/src/logo.png";
let logoImg = null;


/*-----------------------Saldo Cosmonedas (Inicio)------------------------------------*/
const COSMONEDA_SRC = "./assets/src/cosmoneda.svg";
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

  const modal = document.createElement("div");
  modal.id = "ui-combine-status-modal";
  modal.innerHTML = `
    <div class="ui-combine-status-backdrop"></div>
    <div class="ui-combine-status-box">
      <div class="ui-combine-status-title">${mensaje}</div>
      <button class="ui-combine-status-btn" type="button">Aceptar</button>
    </div>
  `;

  document.body.appendChild(modal);

  const btn = modal.querySelector(".ui-combine-status-btn");

  function closeModal() {
    modal.remove();
  }

  btn.addEventListener("click", closeModal);

  btn.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      closeModal();
    },
    { passive: false }
  );
}

function usarItemEquipadoDesdeHUD(slotIndex) {
  const item = window.equipSlots?.[slotIndex];
  if (!item) return;

  switch (item.id) {
    case "corazon":
      console.log("El usuario usará este item: corazon");
      break;

    case "antorcha_de_fuego":
      console.log("El usuario usará este item: antorcha de fuego");
      break;

    case "pistola_lazer":
      console.log("El usuario usará este item: pistola lazer");
      break;

    case "espada_de_madera":
      console.log("El usuario usará este item: espada de madera");
      break;

    case "escudo_de_madera":
      console.log("El usuario usará este item: escudo de madera");
      break;

    case "bumerang":
      console.log("El usuario usará este item: bumerang");
      break;

    case "pico_escabador":
      console.log("El usuario usará este item: pico escabador");
      break;

    case "patines":
      console.log("El usuario usará este item: patines");
      break;

    case "espada_de_hierro":
      console.log("El usuario usará este item: espada de hierro");
      break;

    case "escudo_de_hierro":
      console.log("El usuario usará este item: escudo de hierro");
      break;

    case "bateria":
      console.log("El usuario usará este item: bateria");
      break;

    case "rueda":
      console.log("El usuario usará este item: rueda");
      break;

    case "cable":
      console.log("El usuario usará este item: cable");
      break;

    case "cuero":
      console.log("El usuario usará este item: cuero");
      break;

    default:
      console.log("El usuario usará este item:", item.nombre_item || item.id);
      break;
  }
}

(() => {
  
  const ASSETS = {
    map: "./assets/mapas/mapa1-5000x5000.svg", //mapa
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

        joy.style.display = "none";
        boxButtonsITems.style.display = "none";
        metafonButton.style.display = "none";

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
    const loadedHeart = await loadWithProgress(CORAZON_SRC);

    corazonImg = loadedHeart;

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
    console.log("Inventario lleno");
    return;
  }

  console.log("El usuario tomó el ITEM:", itemTomado.nombre_item);

  

  items = items.filter(i => i !== itemTomado);

  if (hoveredItem === itemTomado) {
    hoveredItem = null;
  }

  const activeMissionId = window.missionSystem.activeMissionId;
if (activeMissionId) {
  validarPasoRecolectarItems(activeMissionId);
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
});

// Salir del canvas limpia hover
canvas.addEventListener("mouseleave", () => {
  hoveredItem = null;
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
  resizeFullscreen(); // solo cuando cambia
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

        joy.style.display = "block";
        boxButtonsITems.style.display = "flex";
        metafonButton.style.display = "block";

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

  window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && npcDialogOpen) {
    closeNPCDialog();
  }
});

  // Dpad
  let pressed = false;
 
  const clearHeld = () => { held.length = 0; };

  window.addEventListener("pointerup", () => { pressed = false; clearHeld(); });

  // Estado
  const player = {
    x: 3200, y: 1024, speed: 3, //datos Avatar: Coordenadas - Velocidad
    facing: "down", walking: false,
    frame: 0, frameTimer: 0, frameDurationMs: 150,
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

    w: Number(enemy.tamano?.w ?? enemy.w) || 64,
    h: Number(enemy.tamano?.h ?? enemy.h) || 64,

    puntos_de_vida: Number(enemy.puntos_de_vida) || 30,
    puntos_de_ataque: Number(enemy.puntos_de_ataque) || 5,
    ejecucion_script: enemy.ejecucion_script || null,

    facing: "down",
    frame: 0,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 4
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

  dirX: 0,
  dirY: 0,
  isMoving: false,
  pasosRestantes: 0,
  tiempoCambioDecision: 0,
  tiempoMaxDecision: 12000,
  tiempoMinDecision: 1500,

  bubbleText: "",
  bubbleTimer: 0,
  bubbleMaxTime: 2600,

  tiempoHablaCooldown: 0,
  tiempoMinHabla: 4000,
  tiempoMaxHabla: 12000,

  facing: "down",
  frame: 0,
  frameTimer: 0,
  frameDurationMs: 160,
  frameWidth: 64,
  frameHeight: 64,
  totalFrames: 4
}));

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
  const oldPopup = document.getElementById("reto-popup-overlay");
  if (oldPopup) oldPopup.remove();

  const overlay = document.createElement("div");
  overlay.id = "reto-popup-overlay";

  overlay.innerHTML = `
    <div
      style="
        position:absolute;
        inset:0;
        z-index:6000;
        display:flex;
        align-items:center;
        justify-content:center;
      "
    >
      <div
        style="
          width:320px;
          height:320px;
          background:black;
          color:#00ffcc;
          border:3px solid #00ffcc;
          box-shadow:
            0 0 0 2px #0b3d35,
            0 0 0 4px #00ffcc,
            0 10px 30px rgba(0,0,0,0.45);
          font-family:'arcade','monospace';
          image-rendering:pixelated;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          padding:14px;
          box-sizing:border-box;
          text-align:center;
        "
      >
        <div
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            border-bottom:2px solid rgba(0,255,204,.35);
            padding-bottom:8px;
          "
        >
          <div
            style="
              font-size:12px;
              text-transform:uppercase;
            "
          >
            Reto
          </div>

          <button
            id="reto-popup-close"
            type="button"
            style="
              width:36px;
              height:36px;
              background:black;
              color:#00ffcc;
              border:2px solid #00ffcc;
              font-family:'arcade','monospace';
              font-size:14px;
              cursor:pointer;
            "
          >
            X
          </button>
        </div>

        <div
          style="
            flex:1;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:18px;
          "
        >
          <div
            style="
              font-size:12px;
              line-height:1.5;
              text-transform:uppercase;
            "
          >
            Presiona el botón para pasar el reto
          </div>

          <button
            id="reto-popup-pass"
            type="button"
            style="
              min-width:160px;
              min-height:44px;
              padding:8px 14px;
              background:black;
              color:#00ffcc;
              border:2px solid #00ffcc;
              font-family:'arcade','monospace';
              font-size:12px;
              cursor:pointer;
              text-transform:uppercase;
            "
          >
            Pasar reto
          </button>
        </div>
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

  passBtn.addEventListener("click", () => {
    if (typeof onComplete === "function") {
      onComplete(retoId);
    }
    closeRetoPopup();
  });
}

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

    console.log("Reto completado:", {
      missionId: mission.id,
      retoId,
      siguientePaso: nextStep?.id || null
    });

    return true;
  }

  return false;
}

window.reto_codificacion_01 = function () {
  openRetoPopup("reto_codificacion_01", completarRetoMission);
};
//------------------------------Espacio para llamamiento de funciones de retos desde los NPCs (inicio)--------------------

function setActiveMission(missionId) {
  if (!isMissionAccepted(missionId)) return;
  if (isMissionCompleted(missionId)) return;

  window.missionSystem.activeMissionId = missionId;

  const mission = getMissionById(missionId);
  const stepIndex = window.missionSystem.activeStepIndexByMission[missionId] ?? 0;
  const currentStep = mission?.pasos?.[stepIndex] || null;
  const nextStep = mission?.pasos?.[stepIndex + 1] || null;

  console.log("MISIÓN ACTIVA", {
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
  });

  refreshMissionPanelIfOpen();
}

function getActiveMission() {
  return getMissionById(window.missionSystem.activeMissionId);
}

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
/*

function isMissionAvailable(mission) {
  if (!mission) return false;

  if ((Number(IQuser) || 0) < (Number(mission.condiciones?.nivelIQMinimo) || 0)) {
    return false;
  }

  const req = mission.condiciones?.misionesRequeridas || [];
  return req.every(id => isMissionCompleted(id));
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

function acceptMission(missionId) {
  const mission = getMissionById(missionId);
  if (!mission) return;

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

function validarPasoRecolectarItems(missionId) {
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

  console.log("Paso de recolección completado:", {
    missionId,
    stepId: step.id,
    siguientePaso: mission.pasos?.[nextIndex]?.id || null
  });

  console.log("VALIDANDO RECOLECCIÓN", {
  missionId,
  stepId: step.id,
  objetivos: objetivos.map(obj => ({
    id: obj.id,
    requiere: obj.cantidad,
    tiene: contarItemEnInventario(obj.id)
  }))
});

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
      console.log("Faltan items para entregar:", req.id);
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

function getMissionStarterNPCId(mission) {
  return mission?.pasos?.[0]?.npcId || null;
}

function tieneItemsRequeridos(listaItems = []) {
  return listaItems.every(req => {
    const tiene = contarItemEnInventario(req.id);
    const necesita = Number(req.cantidad || 0);
    return tiene >= necesita;
  });
}

function getCurrentNPCMissionRole(npcId) {
  const activeMission = getActiveMission();

  // Si el NPC pertenece al paso actual de la misión seleccionada
  if (activeMission) {
    const currentStepIndex = window.missionSystem.activeStepIndexByMission[activeMission.id];
    const currentStep = activeMission.pasos?.[currentStepIndex];

    if (
      currentStep &&
      (currentStep.tipo === "hablar_npc" || currentStep.tipo === "hablar_npc_entrega") &&
      currentStep.npcId === npcId
    ) {
      const isLast = currentStepIndex === activeMission.pasos.length - 1;

      return {
        type: isLast ? "mission_finish" : "mission_progress",
        mission: activeMission
      };
    }
  }

  // Si el NPC inicia una misión que todavía NO ha sido aceptada
  const starterMission = window.missionsData?.missions?.find((mission) => {
    if (!mission) return false;
    if (!isMissionAvailable(mission)) return false;
    if (isMissionAccepted(mission.id)) return false;

    const starterId = mission.pasos?.[0]?.npcId;
    return starterId === npcId;
  });

  if (starterMission) {
    return {
      type: "mission_start",
      mission: starterMission
    };
  }

  return {
    type: "default",
    mission: null
  };
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

    const imgOk =
      npc.img &&
      npc.img.complete &&
      npc.img.naturalWidth > 0 &&
      npc.img.naturalHeight > 0;

    if (imgOk) {
      const row = rowForFacing(npc.facing || "down");
      const sx = (npc.frame || 0) * (npc.frameWidth || 64);
      const sy = row * (npc.frameHeight || 64);

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
    drawBubbleNPCambiente(ctx, npc);
  }
}


//--Enemigo
function drawEnemigos(ctx) {
  for (const enemy of enemigos) {
    if (!enemy) continue;

    const imgOk =
      enemy.img &&
      enemy.img.complete &&
      enemy.img.naturalWidth > 0 &&
      enemy.img.naturalHeight > 0;

    if (imgOk) {
      const row = rowForFacing(enemy.facing || "down");
      const sx = (enemy.frame || 0) * (enemy.frameWidth || 64);
      const sy = row * (enemy.frameHeight || 64);

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
    const isStarterWithoutMission = !activeMission && npc.missionStarter;

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
  }
}

// =======================================================
// SISTEMA DE CONVERSACIÓN NPC CON MANIPULACIÓN DEL DOM (inicio)
// =======================================================

let npcDialogOpen = false;
let npcDialogEl = null;
let npcDialogState = {
  npc: null,
  mode: "default", // default | mission_start | mission_progress
  lines: [],
  lineIndex: 0
};

function ensureNPCDialogStyles() {
  if (document.getElementById("npc-dialog-styles")) return;

  const style = document.createElement("style");
  style.id = "npc-dialog-styles";
  style.textContent = `
    #npc-dialog-overlay{
      position:absolute;
      inset:0;
      z-index:4000;
      display:flex;
      align-items:center;
      justify-content:center;
      pointer-events:auto;
    }

    #npc-dialog-panel{
      width:320px;
      height:320px;
      background:black;
      color:#00ffcc;
      border:3px solid #00ffcc;
      box-shadow:
        0 0 0 2px #0b3d35,
        0 0 0 4px #00ffcc,
        0 10px 30px rgba(0,0,0,0.45);
      font-family:"arcade","monospace";
      image-rendering:pixelated;
      display:flex;
      flex-direction:column;
      overflow:hidden;
    }

    #npc-dialog-header{
      height:42px;
      min-height:42px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 8px;
      background:#111;
      border-bottom:2px solid #00ffcc;
    }

    #npc-dialog-title{
      font-size:12px;
      letter-spacing:1px;
      text-transform:uppercase;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      max-width:240px;
    }

    #npc-dialog-close{
      width:30px;
      height:30px;
      background:black;
      color:#00ffcc;
      border:2px solid #00ffcc;
      font-family:"arcade","monospace";
      font-size:14px;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:0;
    }

    #npc-dialog-close:active{
      transform:translateY(1px);
    }

    #npc-dialog-portrait-wrap{
      flex:1;
      min-height:0;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:10px;
      background:
        radial-gradient(circle at center, rgba(0,255,204,.12), rgba(0,0,0,0) 65%);
    }

#npc-dialog-portrait {
    width: 96px;
    height: 120px;
    image-rendering: pixelated;
    object-fit: contain;
    display: block;
    zoom: 2.4;
    padding-top: 8px;
}

    #npc-dialog-footer{
      height:80px;
      min-height:80px;
      border-top:2px solid rgba(0,255,204,.35);
      padding:8px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      gap:8px;
      background:black;
    }

    #npc-dialog-line{
      margin:0;
      font-size:11px;
      line-height:1.35;
      min-height:28px;
      color:#00ffcc;
      overflow:hidden;
    }

    #npc-dialog-actions{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:3px;
      flex-wrap:wrap;
    }

    .npc-dialog-btn{
      min-width:74px;
      height:28px;
      padding:0 8px;
      background:black;
      color:#00ffcc;
      border:2px solid #00ffcc;
      font-family:"arcade","monospace";
      font-size:10px;
      cursor:pointer;
      text-transform:uppercase;
    }

    .npc-dialog-btn:active{
      transform:translateY(1px);
    }
  `;
  document.head.appendChild(style);
}

function ensureMissionUIStyles() {
  if (document.getElementById("mission-reward-styles")) return;

  const style = document.createElement("style");
  style.id = "mission-reward-styles";
style.textContent = `
  .ui-missions-root{
    display:grid;
    gap:10px;
    color:#00ffcc;
    font-family:"arcade","monospace";
  }

  .ui-mission-card{
    border:1px solid #00ffcc;
    background:rgba(0,255,204,.06);
    box-shadow:0 0 0 2px rgba(0,0,0,.35);
    padding:10px;
    display:grid;
    gap:8px;
    cursor:pointer;
  }

  .ui-mission-title{
    margin:0;
    font-size:12px;
    text-transform:uppercase;
  }

  .ui-mission-title-active{
    color:yellow;
  }

  .ui-mission-step{
    margin:0;
    font-size:18px;
    line-height:1.35;
  }

  .ui-mission-step-box{
    border:1px solid rgba(0,255,204,.35);
    padding:8px;
    display:grid;
    gap:6px;
    background:rgba(0,0,0,.25);
  }

  .ui-mission-step-done{
    opacity:.9;
  }

  .ui-mission-coords{
    margin:0;
    font-size:10px;
    color:#fff;
    opacity:.9;
  }

  .ui-mission-done{
    color:#fff799;
  }

  .ui-mission-card-completed{
    opacity:.9;
  }

  #mission-reward-overlay{
    position:absolute;
    inset:0;
    z-index:4500;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  #mission-reward-box{
    width:320px;
    min-height:320px;
    background:black;
    color:#00ffcc;
    border:3px solid #00ffcc;
    box-shadow:
      0 0 0 2px #0b3d35,
      0 0 0 4px #00ffcc,
      0 10px 30px rgba(0,0,0,0.45);
    font-family:"arcade","monospace";
    image-rendering:pixelated;
    padding:14px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    gap:12px;
    justify-content:space-between;
    text-align:center;
  }

  .mission-reward-title{
    font-size:13px;
    line-height:1.5;
    text-transform:uppercase;
  }

  .mission-reward-line{
    font-size:11px;
    line-height:1.5;
  }

  .mission-reward-items-title{
    font-size:11px;
    text-transform:uppercase;
  }

  .mission-reward-items{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    flex-wrap:wrap;
  }

  .mission-reward-item{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:4px;
    width:56px;
  }

  .mission-reward-item img{
    width:32px;
    height:32px;
    object-fit:contain;
    image-rendering:pixelated;
    display:block;
  }

  .mission-reward-item span{
    font-size:9px;
    line-height:1.2;
  }

  .mission-reward-btn{
    min-width:140px;
    height:32px;
    margin:0 auto;
    background:black;
    color:#00ffcc;
    border:2px solid #00ffcc;
    font-family:"arcade","monospace";
    font-size:10px;
    cursor:pointer;
    text-transform:uppercase;
  }
`;
  document.head.appendChild(style);
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
        <p class="ui-mission-title ${isActive ? "ui-mission-title-active" : ""}">
          ${mission.tipo === "principal" ? "➜ " : ""}${completed ? "✔ " : ""}${mission.nombre}
        </p>
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
  if (document.getElementById("npc-dialog-overlay")) return document.getElementById("npc-dialog-overlay");

  ensureNPCDialogStyles();

  const overlay = document.createElement("div");
  overlay.id = "npc-dialog-overlay";

  const panel = document.createElement("div");
  panel.id = "npc-dialog-panel";

  const header = document.createElement("div");
  header.id = "npc-dialog-header";

  const title = document.createElement("div");
  title.id = "npc-dialog-title";

  const closeBtn = document.createElement("button");
  closeBtn.id = "npc-dialog-close";
  closeBtn.type = "button";
  closeBtn.textContent = "X";

  const portraitWrap = document.createElement("div");
  portraitWrap.id = "npc-dialog-portrait-wrap";

  const portrait = document.createElement("img");
  portrait.id = "npc-dialog-portrait";
  portrait.alt = "NPC";

  const footer = document.createElement("div");
  footer.id = "npc-dialog-footer";

  const line = document.createElement("p");
  line.id = "npc-dialog-line";

  const actions = document.createElement("div");
  actions.id = "npc-dialog-actions";

  header.appendChild(title);
  header.appendChild(closeBtn);

  portraitWrap.appendChild(portrait);

  footer.appendChild(line);
  footer.appendChild(actions);

  panel.appendChild(header);
  panel.appendChild(portraitWrap);
  panel.appendChild(footer);

  overlay.appendChild(panel);
  wrapEl.appendChild(overlay);

  closeBtn.addEventListener("click", closeNPCDialog);
  closeBtn.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    e.preventDefault();
    closeNPCDialog();
  }, { passive: false });

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      closeNPCDialog();
    }
  }, { passive: false });

  return overlay;
}

function closeNPCDialog() {
  npcDialogOpen = false;
  npcDialogState = {
    npc: null,
    mode: "default",
    lines: [],
    lineIndex: 0
  };

  if (npcDialogEl && npcDialogEl.parentNode) {
    npcDialogEl.parentNode.removeChild(npcDialogEl);
  }

  npcDialogEl = null;
}

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

  console.log("VALIDANDO RECOLECCIÓN", {
    missionId,
    stepId: step.id,
    objetivos: objetivos.map(obj => ({
      id: obj.id,
      requiere: obj.cantidad,
      tiene: contarItemEnInventario(obj.id)
    })),
    validado
  });

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

    console.log("NPC CONTEXT", {
      npcId,
      missionId,
      stepIndex,
      currentStepId: currentStep?.id || null,
      currentStepTipo: currentStep?.tipo || null,
      currentStepNpcId: currentStep?.npcId || null
    });

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
  const actionsEl = npcDialogEl.querySelector("#npc-dialog-actions");
  actionsEl.innerHTML = "";

  const total = npcDialogState.lines.length;
  const idx = npcDialogState.lineIndex;
  const atFirst = idx <= 0;
  const atLast = idx >= total - 1;

  function makeBtn(text, onClick) {
    const btn = document.createElement("button");
    btn.className = "npc-dialog-btn";
    btn.type = "button";
    btn.textContent = text;

    btn.addEventListener("click", onClick);
    btn.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      e.preventDefault();
      onClick();
    }, { passive: false });

    return btn;
  }

  if (npcDialogState.mode === "default") {
    actionsEl.appendChild(makeBtn("Cerrar", closeNPCDialog));
    return;
  }

  if (!atLast) {
    if (!atFirst) {
      actionsEl.appendChild(makeBtn("Anterior", () => {
        npcDialogState.lineIndex--;
        renderNPCDialog();
      }));
    }

    actionsEl.appendChild(makeBtn("Siguiente", () => {
      npcDialogState.lineIndex++;
      renderNPCDialog();
    }));
    return;
  }
  if (npcDialogState.mode === "mission_locked_progress") {
  actionsEl.appendChild(makeBtn("Cerrar", closeNPCDialog));
  return;
}

  if (npcDialogState.mode === "mission_start") {
    if (!atFirst) {
      actionsEl.appendChild(makeBtn("Anterior", () => {
        npcDialogState.lineIndex--;
        renderNPCDialog();
      }));
    }

    actionsEl.appendChild(makeBtn("No aceptar", closeNPCDialog));

    actionsEl.appendChild(makeBtn("Aceptar misión", () => {
      acceptMission(npcDialogState.missionId);
    }));
    return;
  }

if (npcDialogState.mode === "mission_progress") {
  if (!atFirst) {
    actionsEl.appendChild(makeBtn("Anterior", () => {
      npcDialogState.lineIndex--;
      renderNPCDialog();
    }));
  }

  actionsEl.appendChild(makeBtn("Continuar misión", () => {
    const ok = continueActiveMissionFromNPC(npcDialogState.npc.id);

    if (!ok) {
      console.log("No se pudo continuar la misión con este NPC:", npcDialogState.npc.id);
      closeNPCDialog();
    }
  }));
  return;
}

  if (npcDialogState.mode === "mission_finish") {
    if (!atFirst) {
      actionsEl.appendChild(makeBtn("Anterior", () => {
        npcDialogState.lineIndex--;
        renderNPCDialog();
      }));
    }

    actionsEl.appendChild(makeBtn("Finalizar misión", () => {
      finalizeActiveMissionFromNPC(npcDialogState.npc.id);
    }));
  }
}

function renderNPCDialog() {
  if (!npcDialogEl || !npcDialogState.npc) return;

  const titleEl = npcDialogEl.querySelector("#npc-dialog-title");
  const portraitEl = npcDialogEl.querySelector("#npc-dialog-portrait");
  const lineEl = npcDialogEl.querySelector("#npc-dialog-line");

  titleEl.textContent = npcDialogState.npc.nombre || "NPC";
  const npcImg = npcDialogState.npc?.img;

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
  portraitEl.src = npcDialogState.npc.imageSrc || "";
}

  lineEl.textContent = npcDialogState.lines[npcDialogState.lineIndex] || "...";

  buildNPCDialogButtons();
}

function openNPCDialog(npc) {
  if (!npc) return;

  const activeMissionId = window.missionSystem.activeMissionId;
  if (activeMissionId) {
    validarPasoRecolectarItems(activeMissionId);
  }

  const context = getMissionContextForNPC(npc.id);

  npcDialogState = {
    npc,
    mode: context.type,
    lines: Array.isArray(context.lines) && context.lines.length ? context.lines : ["..."],
    lineIndex: 0,
    missionId: context.missionId || null
  };

  npcDialogEl = createNPCDialogDOM();
  npcDialogOpen = true;
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

function hacerHablarNPCambiente(npc) {
  if (!npc || !npc.dialogos_automaticos?.length) return;

  const index = randomInt(0, npc.dialogos_automaticos.length - 1);
  npc.bubbleText = npc.dialogos_automaticos[index];
  npc.bubbleTimer = npc.bubbleMaxTime;
  npc.tiempoHablaCooldown = randomInt(npc.tiempoMinHabla, npc.tiempoMaxHabla);
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

//--NPC'sambiente (Inicio)
function updateNPCsAmbiente(dtMs) {
  for (const npc of npcsAmbiente) {
    if (!npc) continue;

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
      decidirNuevaAccionNPCambiente(npc);
    }

    if (npc.isMoving && npc.pasosRestantes > 0) {
      const delta = dtMs / 16.6667;
      const nextX = npc.x + (npc.dirX * npc.velocidad * delta);
      const nextY = npc.y + (npc.dirY * npc.velocidad * delta);

      const limiteIzq = 0;
      const limiteArr = 0;
      const limiteDer = WORLD_W - npc.w;
      const limiteAbj = WORLD_H - npc.h;

      npc.x = clamp(nextX, limiteIzq, limiteDer);
      npc.y = clamp(nextY, limiteArr, limiteAbj);

      if (npc.dirX > 0) npc.facing = "right";
      else if (npc.dirX < 0) npc.facing = "left";
      else if (npc.dirY > 0) npc.facing = "down";
      else if (npc.dirY < 0) npc.facing = "up";

      npc.frameTimer += dtMs;
      while (npc.frameTimer >= npc.frameDurationMs) {
        npc.frameTimer -= npc.frameDurationMs;
        npc.frame = (npc.frame + 1) % npc.totalFrames;
      }

      npc.pasosRestantes -= 1;

      const pegoBorde =
        npc.x <= limiteIzq ||
        npc.x >= limiteDer ||
        npc.y <= limiteArr ||
        npc.y >= limiteAbj;

      if (pegoBorde) {
        npc.pasosRestantes = 0;
        npc.isMoving = false;
      }
    } else {
      npc.frame = 0;
      npc.frameTimer = 0;
    }
  }
}


//--NPC'sambiente (Fin)
  function update(dtMs) {

    //pdv = Math.max(0, pdv - dtMs * 0.001); // prueba: baja 1 PDV por segundo
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
const equipSlotsLimpiados = limpiarEquipSlotsAgotados();

if (equipSlotsLimpiados) {
  closeInventarioPopup();

  if (interfaceOpen && interfasEl && interfasEl.dataset.panel === "inventario") {
    const bodyEl = interfasEl.querySelector(".ui-body");
    if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
  }
}

updateNPCsAmbiente(dtMs);

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

// =======================================================================================
// Lógica de items/consumibles/armas (inicio)
// =======================================================================================
let itemsData = [];
let items = [];// Prueba de items

window.inventarioUser = []; //Sincronizar con base de datos wordpress


let hoveredItem = null;



/*// 🔧 Items de prueba para el inventario
window.inventarioUser.push(
  {
    id: "bateria",
    nombre_item: "bateria",
    imagen: "./assets/items/bateria.svg",
    cantidad: 10
  },
  {
    id: "palo_de_madera",
    nombre_item: "palo de madera",
    imagen: "./assets/items/paloMadera.svg",
    cantidad: 10
  },
  {
    id: "cable",
    nombre_item: "cable",
    imagen: "./assets/items/cable.svg",
    cantidad: 20
  },
);*/

async function cargarItemsJSON(){

  const res = await fetch("./items.json");
  const data = await res.json();

  itemsData = data.items;

}

function pruebaDeItems(){

  if(items.length > 0 || itemsData.length === 0) return;

  const radius = 300;

  for(let i=0;i<10;i++){

    const randomItem = itemsData[Math.floor(Math.random()*itemsData.length)];

const img = new Image();
img.onload = () => {};
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



//función para dibujar items

function drawItems(ctx){

  for(const item of items){

    const imgOk =
      item.img &&
      item.img.complete &&
      item.img.naturalWidth > 0 &&
      item.img.naturalHeight > 0;

    if(imgOk){
      ctx.drawImage(item.img, item.x, item.y, item.size, item.size);
    } else {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(item.x, item.y, item.size, item.size);
    }

    if(item === hoveredItem){

      const label = item.nombre_item || item.id || "item";

      ctx.fillStyle = "transparent"; //Color de barra de letras de items tirados en el suelo
      ctx.fillRect(item.x - 4, item.y - 20, 120, 16);

      ctx.fillStyle = "white";
      ctx.font = "12px arcade";
      ctx.textAlign = "left";
      ctx.fillText(label, item.x, item.y - 8);

    }

  }

}
function agregarItemAlInventario(nuevoItem) {
  const MAX_SLOTS = 16;
  const MAX_STACK = 25;

  if (!nuevoItem) return false;

  const nuevoId = nuevoItem.id ?? nuevoItem.item_id;
  const nuevoEsAgotable = nuevoItem.agotable === true;
  const nuevoUsos = nuevoItem.usos ?? nuevoItem.cantidad_de_usos ?? null;
  const nuevoUsosMaximos = nuevoItem.usos_maximos ?? nuevoItem.cantidad_de_usos ?? null;

  for (const slot of window.inventarioUser) {
    if (!slot) continue;

    const slotId = slot.id ?? slot.item_id;
    const slotEsAgotable = slot.agotable === true;
    const slotUsos = slot.usos ?? slot.cantidad_de_usos ?? null;
    const slotUsosMaximos = slot.usos_maximos ?? slot.cantidad_de_usos ?? null;

    const mismoItem = slotId === nuevoId;

    // Si es agotable, solo acumula si además tienen exactamente el mismo estado de uso
    const mismoEstadoDeUso = (
      !nuevoEsAgotable ||
      (
        slotEsAgotable === nuevoEsAgotable &&
        slotUsos === nuevoUsos &&
        slotUsosMaximos === nuevoUsosMaximos
      )
    );

    if (mismoItem && mismoEstadoDeUso) {
      if (!slot.cantidad) slot.cantidad = 1;

      if (slot.cantidad < MAX_STACK) {
        slot.cantidad += nuevoItem.cantidad || 1;
        return true;
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
  cantidad: nuevoItem.cantidad || 1,
  agotable: nuevoEsAgotable,
  desaparece_al_agotarse: nuevoItem.desaparece_al_agotarse === true,
  usos: nuevoUsos,
  usos_maximos: nuevoUsosMaximos
});

  return true;
}

window.agregarItemAlInventario = agregarItemAlInventario;

function normalizarInventario() {
  window.inventarioUser = window.inventarioUser.filter(Boolean);
}

function destruirItemDelInventario(slotIndex) {
  const item = window.inventarioUser[slotIndex];
  if (!item) return;

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
      console.log("No hay espacio en la zona de combinación");
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
    if (bodyEl) {
      bodyEl.innerHTML = buildInventarioHTML();

      const combineSection = bodyEl.querySelector(".ui-inv-combine-wrap");
      if (combineSection) {
        combineSection.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  }
}

function devolverItemDesdeCombinacion(slotIndex) {
  const item = combinacionSlots[slotIndex];
  if (!item) return;

  const itemADevolver = {
    ...item
  };

  delete itemADevolver._hudImg;

  const agregado = agregarItemAlInventario(itemADevolver);

  if (!agregado) {
    console.log("Inventario lleno, no se puede devolver el item");
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

function mostrarPopupCreacion(mensaje) {
  const panel = document.getElementById("container-interfas");
  if (!panel) return;

  const bodyEl = panel.querySelector(".ui-body");
  if (!bodyEl) return;

  const oldMsg = bodyEl.querySelector(".ui-inv-craft-popup");
  if (oldMsg) oldMsg.remove();

  const popup = document.createElement("div");
  popup.className = "ui-inv-craft-popup";
  popup.textContent = mensaje;

  bodyEl.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 1800);
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
        if (bodyEl) bodyEl.innerHTML = buildInventarioHTML();
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
// =======================================================================================
// Lógica de pintura en canvas (inicio)
// =======================================================================================

function draw(images) {
  // =============================
// ✨ Brillo global del juego
// =============================
//ctx.shadowColor = "#00ffcc";
ctx.shadowColor = "black";
ctx.shadowBlur = 3;

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
    setGameState("gamePlay");
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

// Dibujar items
pruebaDeItems();
drawItems(ctx);

// Dibujar NPCs
drawNPCs(ctx);
drawNPCsAmbiente(ctx);

//--Enemigos
drawEnemigos(ctx);

// Dibujar avatar
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

// Dibujar globos de chat de NPC ambiente después del jugador
drawBubblesNPCsAmbiente(ctx);


    ctx.restore();

    /*Sistema de muestreo de coordenadas en el mapá(inicio) */
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    ctx.fillStyle = "transparent";
    ctx.fillRect(4, 4, 110, 18);

    ctx.fillStyle = "lime";
    ctx.font = "18px arcade";
    ctx.textAlign = "start";
    ctx.fillText(`X:${Math.floor(player.x)} Y:${Math.floor(player.y)}`, 24, 34); // posición de coordenadas en canvas

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

  ctx.font = "18px arcade";
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
/* lógica cosmoneda (Fin+)*/

drawLifeBar(ctx, canvas, pdv, PDV_MAX);//Lógica de vida

// =============================
// ⚔️ HUD Equipamiento (inicio)
// =============================
if (window.equipSlots && window.equipSlots.length) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const barWidth = 18;
  const barHeight = 140;
  const marginLeft = 12;

  const barX = marginLeft;
  const barY = (canvas.height / 2) - (barHeight / 2);

  const slotSize = 42; // más grande para dedo
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

    // fondo del slot
    ctx.fillStyle = "#111";
    ctx.fillRect(x, y, slotSize, slotSize);

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, slotSize, slotSize);

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

  // fondo barra
  ctx.fillStyle = "#222";
  ctx.fillRect(barraX, barraY, barraW, barraH);

  // progreso
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(barraX, barraY, barraW * progreso, barraH);

  // borde
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.strokeRect(barraX, barraY, barraW, barraH);

  // contador solo para items agotables
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
// =============================
// ⚔️ HUD Equipamiento (fin)
// =============================

    return;
    /*Sistema de muestreo de coordenadas en el mapá(fin) */
    
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);

}

// =======================================================================================
// Lógica de pintura en canvas (fin)
// =======================================================================================

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

initNPCs();
initNPCsAmbiente();
initEnemigos(); //--Enemigos


// decide si muestra checking o playing (pero playing mostrará “Cargando...” hasta que haya assets)
checkUserProfile();

// arranca el loop
//ensureMissionUIStyles();
start();

// si al recargar ya tiene perfil completo, carga assets de una vez
if (gameMode === "playing") {
  loadGameAssets().then(() => {
    
    // si quieres, puedes revalidar aquí
    // (no es obligatorio, el draw ya se actualizará en el siguiente frame)
  });
}
})();

//--------------------------------------------------------------
/*--------Resetear datios de juego para pruebas (Inicio)
//--------------------------------------------------------------
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

resetPlayerProfile() */

//------Prueba de items-----
//Prueba de escudo:
/*   */
function pruebaQuitarUsoEscudo() {
  if (!window.equipSlots) return;

  const escudo = window.equipSlots.find(item =>
    item && item.id === "escudo_de_madera"
  );

  if (!escudo) {
    console.log("No hay escudo equipado");
    return;
  }

  escudo.usos -= 3;

  if (escudo.usos < 0) {
    escudo.usos = 0;
  }

  console.log("Usos restantes del escudo:", escudo.usos);
}

function pruebaUsarCorazon() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "corazon");

  if (!item) {
    console.log("No hay Corazon equipado");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes del Corazon:", item.usos);
}

function pruebaUsarAntorcha() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "antorcha_de_fuego");

  if (!item) {
    console.log("No hay Antorcha equipada");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes de la Antorcha:", item.usos);
}

function pruebaUsarPistolaLazer() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "pistola_lazer");

  if (!item) {
    console.log("No hay Pistola Lazer equipada");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes de la Pistola:", item.usos);
}

function pruebaUsarEspadaMadera() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "espada_de_madera");

  if (!item) {
    console.log("No hay Espada de madera equipada");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes de la Espada de madera:", item.usos);
}

function pruebaUsarBumerang() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "bumerang");

  if (!item) {
    console.log("No hay Bumerang equipado");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes del Bumerang:", item.usos);
}

function pruebaUsarPico() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "pico_escabador");

  if (!item) {
    console.log("No hay Pico equipado");
    return;
  }

  item.usos -= 1;
  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes del Pico:", item.usos);
}

function pruebaUsarEscudoHierro() {
  if (!window.equipSlots) return;

  const item = window.equipSlots.find(i => i && i.id === "escudo_de_hierro");

  if (!item) {
    console.log("No hay Escudo de hierro equipado");
    return;
  }

  item.usos -= 3;

  if (item.usos < 0) item.usos = 0;

  console.log("Usos restantes del Escudo de hierro:", item.usos);
}
