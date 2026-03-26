//pinta un cuadrado al lado del usuario
//--> dibujar interruptor, y que cambie de estado mapaOscuro con la función de linterna.js que ya lo hace

(function () {
  const MODULE_ID = "aliado_reptiliano_test";

  function getInitialState() {
    return {};
  }

  function onInit() {
    console.log("aliado.js test cargado");
  }

  function afterDraw({ ctx, canvas }) {
    if (!ctx || !canvas) return;

    const w = 30;
    const h = 30;
    const x = (canvas.width / 2) - (w / 2) + 50;
    const y = (canvas.height / 2) - (h / 2);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  window.registerGlobalModule(MODULE_ID, {
    getInitialState,
    onInit,
    afterDraw
  });
})();