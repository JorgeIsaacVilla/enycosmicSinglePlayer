
registerGlobalModule("timer_oscuridad_15s", {

afterDraw({ ctx, canvas }) {
  const state = window.enyGlobalModules.state.timer_oscuridad_15s;
  if (!state || state.finished) return;

  if (!state._startTime) return;

  const elapsed = Date.now() - state._startTime;
  const remaining = Math.max(0, state.durationMs - elapsed);
  const segundos = Math.ceil(remaining / 1000);

  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);

  // fondo para asegurar visibilidad
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(canvas.width / 2 - 40, 8, 80, 28);

  ctx.fillStyle = "#7cf6ff";
  ctx.font = "14px arcade";
  ctx.textAlign = "center";

  ctx.fillText(`⏱ ${segundos}s`, canvas.width / 2, 26);

  ctx.restore();
},

  getInitialState() {
    return {
      durationMs: 15000,
      remainingMs: 15000,
      running: true,
      finished: false,
      popupOpen: false
    };
  },

  onInit() {
    const state = window.enyGlobalModules.state.timer_oscuridad_15s;
    state.remainingMs = state.durationMs;
    state.running = true;
    state.finished = false;
    state.popupOpen = false;

    window.startTimerOscuridad15s = function () {
      state.remainingMs = state.durationMs;
      state.running = true;
      state.finished = false;
      closeTimerOscuridadPopup();
    };

    window.stopTimerOscuridad15s = function () {
      state.running = false;
    };
  },

afterUpdate() {
  const state = window.enyGlobalModules.state.timer_oscuridad_15s;
  if (!state || !state.running || state.finished) return;

  const now = Date.now();

  if (!state._startTime) {
    state._startTime = now;
  }

  const elapsed = now - state._startTime;

  if (elapsed < state.durationMs) return;

  state.running = false;
  state.finished = true;

  const bridge = window.enyGameBridge;
  if (bridge?.getMapaOscuro && bridge?.setMapaOscuro) {
    const actual = !!bridge.getMapaOscuro();
    bridge.setMapaOscuro(!actual);
  }

  openTimerOscuridadPopup();
}
});

function ensureTimerOscuridadStyleDOM() {
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

function closeTimerOscuridadPopup() {
  const old = document.getElementById("timer-oscuridad-popup-overlay");
  if (old) old.remove();
}

function openTimerOscuridadPopup() {
  ensureTimerOscuridadStyleDOM();
  closeTimerOscuridadPopup();

  const wrap = document.getElementById("wrap");
  if (!wrap) return;

  const overlay = document.createElement("div");
  overlay.id = "timer-oscuridad-popup-overlay";
  overlay.className = "dom-overlay";

  overlay.innerHTML = `
    <div id="timer-oscuridad-popup-box" class="dom-panel dom-panel--h-320">
      <div class="reto-popup-header">
        <div class="reto-popup-title">Temporizador</div>
        <button
          id="timer-oscuridad-popup-close"
          class="reto-popup-close"
          type="button"
          aria-label="Cerrar"
        >
          X
        </button>
      </div>

      <div class="reto-popup-body">
        <p class="reto-popup-message">Se acabó el tiempo.</p>
      </div>
    </div>
  `;

  wrap.appendChild(overlay);

  const closeBtn = overlay.querySelector("#timer-oscuridad-popup-close");

  function cerrar() {
    closeTimerOscuridadPopup();
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