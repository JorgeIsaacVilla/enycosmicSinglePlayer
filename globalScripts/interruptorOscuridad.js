registerGlobalModule("interruptor_oscuridad", {
  getInitialState() {
    return {
worldX: 4120,
worldY: 880,
      width: 30,
      height: 62,
      hitboxEl: null,
      isVisible: false,
      lastScreenX: 0,
      lastScreenY: 0,
      popupOpen: false
    };
  },

  onInit() {
    const state = window.enyGlobalModules.state.interruptor_oscuridad;
    const wrap = document.getElementById("wrap");

    if (!wrap) return;

    const hitbox = document.createElement("button");
    hitbox.type = "button";
    hitbox.id = "interruptor-oscuridad-hitbox";
    hitbox.setAttribute("aria-label", "Interruptor de oscuridad");

    hitbox.style.position = "absolute";
    hitbox.style.left = "0px";
    hitbox.style.top = "0px";
    hitbox.style.width = `${state.width}px`;
    hitbox.style.height = `${state.height}px`;
    hitbox.style.padding = "0";
    hitbox.style.margin = "0";
    hitbox.style.border = "0";
    hitbox.style.background = "transparent";
    hitbox.style.opacity = "0";
    hitbox.style.pointerEvents = "auto";
    hitbox.style.zIndex = "25";
    hitbox.style.display = "none";
    hitbox.style.touchAction = "none";

    wrap.appendChild(hitbox);
    state.hitboxEl = hitbox;

    const onToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleInterruptorOscuridad();
    };

    hitbox.addEventListener("click", onToggle);
    hitbox.addEventListener("pointerdown", onToggle, { passive: false });

    window.toggleInterruptorOscuridad = toggleInterruptorOscuridad;
  },

  afterDrawWorld({ ctx }) {
    const state = window.enyGlobalModules.state.interruptor_oscuridad;
    if (!ctx) return;

    drawInterruptorEnCanvas(ctx, state);
    syncInterruptorHitbox(ctx, state);
  }
});

function drawInterruptorEnCanvas(ctx, state) {
  const x = state.worldX;
  const y = state.worldY;
  const w = state.width;
  const h = state.height;

  const oscuro = !!window.enyGameBridge?.getMapaOscuro?.();

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "#111111";
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = "#7cf6ff";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = "#1d2736";
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

  ctx.fillStyle = oscuro ? "#00ff66" : "#ff3838";
  ctx.fillRect(x + 6, y + 6, w - 12, 8);

  const leverH = 20;
  const leverY = oscuro ? (y + 10) : (y + h - leverH - 10);

  ctx.fillStyle = "#d9e6f2";
  ctx.fillRect(x + 7, leverY, w - 14, leverH);

  ctx.fillStyle = "#8ea1b5";
  ctx.fillRect(x + 9, leverY + 2, w - 18, leverH - 4);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 11, leverY + 4, w - 22, 4);

  ctx.restore();
}

function syncInterruptorHitbox(ctx, state) {
  if (!state.hitboxEl) return;

  const p1 = new DOMPoint(state.worldX, state.worldY);
  const p2 = new DOMPoint(state.worldX + state.width, state.worldY + state.height);
  const m = ctx.getTransform();

  const a = p1.matrixTransform(m);
  const b = p2.matrixTransform(m);

  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  const width = Math.abs(b.x - a.x);
  const height = Math.abs(b.y - a.y);

  const visible =
    width > 0 &&
    height > 0 &&
    left < ctx.canvas.width &&
    top < ctx.canvas.height &&
    left + width > 0 &&
    top + height > 0;

  state.isVisible = visible;

  if (!visible) {
    state.hitboxEl.style.display = "none";
    return;
  }

  state.lastScreenX = left;
  state.lastScreenY = top;

  state.hitboxEl.style.display = "block";
  state.hitboxEl.style.left = `${left}px`;
  state.hitboxEl.style.top = `${top}px`;
  state.hitboxEl.style.width = `${width}px`;
  state.hitboxEl.style.height = `${height}px`;
}

function toggleInterruptorOscuridad() {
  const getMapaOscuro = window.enyGameBridge?.getMapaOscuro;
  const setMapaOscuro = window.enyGameBridge?.setMapaOscuro;

  if (typeof getMapaOscuro !== "function" || typeof setMapaOscuro !== "function") {
    console.warn("Interruptor: enyGameBridge no disponible");
    return;
  }

  const actual = !!getMapaOscuro();
  const siguiente = !actual;

  setMapaOscuro(siguiente);

  openInterruptorPopup({
    message: "Haz tocado el interruptor.",
    estado: siguiente ? "Mapa oscuro activado." : "Mapa oscuro desactivado."
  });
}

function openInterruptorPopup({ message = "", estado = "" } = {}) {
  ensureStyleDOMCSSInterruptor();
  closeInterruptorPopup();

  const wrap = document.getElementById("wrap");
  if (!wrap) return;

  const overlay = document.createElement("div");
  overlay.id = "interruptor-popup-overlay";
  overlay.className = "dom-overlay";

  overlay.innerHTML = `
    <div id="interruptor-popup-box" class="dom-panel dom-panel--h-320">
      <div class="reto-popup-header">
        <div class="reto-popup-title">Interruptor</div>
        <button
          id="interruptor-popup-close"
          class="reto-popup-close"
          type="button"
          aria-label="Cerrar"
        >
          X
        </button>
      </div>

      <div class="reto-popup-body">
        <p class="reto-popup-message">${message}</p>
        <p class="reto-popup-message">${estado}</p>
      </div>
    </div>
  `;

  wrap.appendChild(overlay);

  const closeBtn = overlay.querySelector("#interruptor-popup-close");

  function cerrar() {
    closeInterruptorPopup();
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

function closeInterruptorPopup() {
  const old = document.getElementById("interruptor-popup-overlay");
  if (old) old.remove();
}

function ensureStyleDOMCSSInterruptor() {
  if (typeof ensureStyleDOMCSS === "function") {
    ensureStyleDOMCSS();
    return;
  }

  if (document.getElementById("style-dom-css-link")) return;

  const link = document.createElement("link");
  link.id = "style-dom-css-link";
  link.rel = "stylesheet";
  link.href = "./styles/styleDOM.css";
  document.head.appendChild(link);
}