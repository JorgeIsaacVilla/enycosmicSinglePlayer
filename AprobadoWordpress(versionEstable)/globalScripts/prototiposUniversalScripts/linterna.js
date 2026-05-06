/*El script original no permite modificar la sombra ni el ratio de luz. solo permite cambiar ciertos estados */
(function () {
  const MODULE_ID = "linterna";
  const BUTTON_W = 120;
  const BUTTON_H = 34;

  function getInitialState() {
    return {
      lastButtonRect: null,
      listenerReady: false
    };
  }

  function getState() {
    return window.enyGlobalModules.state[MODULE_ID];
  }

  function getButtonRect(canvas) {
    const x = (canvas.width / 2) - (BUTTON_W / 2);
    const y = canvas.height - 92;

    return {
      x,
      y,
      w: BUTTON_W,
      h: BUTTON_H
    };
  }

function activarLinternaPrueba() {
  const actual = !!window.enyGameBridge?.getMapaOscuro?.();

  window.enyGameBridge.setMapaOscuro(!actual);

  console.log("Linterna toggle:", !actual);
}

  function onInit({ canvas }) {
    const state = getState();
    if (!state || state.listenerReady || !canvas) return;

    state.listenerReady = true;

    canvas.addEventListener("pointerdown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      const btn = state.lastButtonRect;
      if (!btn) return;

      const hit =
        x >= btn.x &&
        x <= btn.x + btn.w &&
        y >= btn.y &&
        y <= btn.y + btn.h;

      if (!hit) return;

      e.preventDefault();
      e.stopPropagation();

      activarLinternaPrueba();
    }, { passive: false });
  }

  function afterDraw({ ctx, canvas }) {
    const state = getState();
    if (!state || !ctx || !canvas) return;

    const btn = getButtonRect(canvas);
    state.lastButtonRect = btn;

    const mapaOscuro = !!window.enyGameBridge?.getMapaOscuro?.();
    const enabled = mapaOscuro === true;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.font = "10px arcade";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = enabled ? "#000000" : "#1b1b1b";
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h);

    ctx.strokeStyle = enabled ? "#00ffcc" : "#666666";
    ctx.lineWidth = 3;
    ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);

    ctx.fillStyle = enabled ? "#00ffcc" : "#999999";
    ctx.fillText("INTERRUPTOR", btn.x + (btn.w / 2), btn.y + (btn.h / 2) + 1);

    ctx.restore();
  }

  window.registerGlobalModule(MODULE_ID, {
    getInitialState,
    onInit,
    afterDraw
  });
})();