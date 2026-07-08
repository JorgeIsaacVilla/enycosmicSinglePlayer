registerGlobalModule("metacam_ar", {
  getInitialState() {
    return {};
  },

  onInit() {
    window.openCameraAR = function openCameraAR() {
      if (typeof ensureMetaMapCSS === "function") {
        ensureMetaMapCSS();
      }

      console.log("Abrir Cámara AR en iframe");

      if (document.getElementById("camera-ar-overlay")) return;

      const wrap = document.getElementById("wrap");
      const gameCanvas = document.getElementById("game");
      const previousGameCanvasVisibility = gameCanvas ? gameCanvas.style.visibility : "";

      if (!wrap) {
        console.error("No existe el contenedor #wrap");
        return;
      }

      wrap.insertAdjacentHTML(
        "beforeend",
        `
          <div
            id="camera-ar-overlay"
            style="
              position: fixed;
              width: 100vw;
              height: 100vh;
              z-index: 999999;
              background: rgba(0, 0, 0, 0.55);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 14px;
              box-sizing: border-box;
            "
          >
            <div
              id="camera-ar-panel"
              style="
                position: relative;
                width: min(96vw, 1100px);
                height: min(90vh, 760px);
                background: #000;
                border: 3px solid #00ffd5;
                box-shadow:
                  0 0 0 2px #001a24,
                  6px 6px 0 #000,
                  0 0 24px rgba(0, 255, 213, 0.45);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                font-family: 'Courier New', monospace;
              "
            >
              <div
                class="camera-ar-header"
                style="
                  height: 42px;
                  min-height: 42px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 8px 0 12px;
                  box-sizing: border-box;
                  background: rgba(0, 0, 0, 0.88);
                  border-bottom: 3px solid #00ffd5;
                  color: #00ffd5;
                "
              >
                <div
                  class="camera-ar-title"
                  style="
                    font-size: 13px;
                    font-weight: 900;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-shadow:
                      2px 2px 0 #000,
                      0 0 8px rgba(0, 255, 213, 0.8);
                  "
                >
                  MetaCam AR
                </div>

                <button
                  class="camera-ar-close"
                  type="button"
                  aria-label="Cerrar"
                  style="
                    width: 30px;
                    height: 30px;
                    border: 2px solid #00ffd5;
                    border-radius: 0;
                    background: rgba(0, 0, 0, 0.9);
                    color: #00ffd5;
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
                    font-weight: 900;
                    line-height: 1;
                    cursor: pointer;
                    box-shadow:
                      3px 3px 0 #000,
                      0 0 0 1px rgba(255,255,255,0.12) inset;
                  "
                >
                  X
                </button>
              </div>

              <div
                id="camera-ar-stage"
                style="
                  position: relative;
                  flex: 1;
                  width: 100%;
                  height: 100%;
                  min-height: 0;
                  overflow: hidden;
                  background: #000;
                "
              >
                <iframe
                  id="camera-ar-iframe"
                  src="https://enycosmicplayer.vercel.app/interactions/MetaCamAR/index.html"
                  allow="camera; microphone; fullscreen; autoplay; xr-spatial-tracking"
                  allowfullscreen
                  style="
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-width: 100%;
                    min-height: 100%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    display: block;
                    background: #000;
                  "
                ></iframe>
              </div>
            </div>
          </div>
        `
      );

      if (gameCanvas) {
        gameCanvas.style.visibility = "hidden";
      }

      const overlay = document.getElementById("camera-ar-overlay");
      const closeBtn = overlay.querySelector(".camera-ar-close");
      const iframe = document.getElementById("camera-ar-iframe");

      function closeCameraAR() {
        if (iframe) {
          iframe.src = "about:blank";
        }

        if (gameCanvas) {
          gameCanvas.style.visibility = previousGameCanvasVisibility;
        }

        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }

      closeBtn.addEventListener("click", closeCameraAR);

      closeBtn.addEventListener(
        "pointerdown",
        function (e) {
          e.preventDefault();
          closeCameraAR();
        },
        { passive: false }
      );

      overlay.addEventListener(
        "pointerdown",
        function (e) {
          e.stopPropagation();
        },
        { passive: true }
      );
    };
  }
});