registerGlobalModule("metacam_ar", {
  getInitialState() {
    return {};
  },

  onInit() {
    window.openCameraAR = function openCameraAR() {
      if (typeof ensureMetaMapCSS === "function") {
        ensureMetaMapCSS();
      }

      console.log("Abrir Cámara AR en index.html");

      if (document.getElementById("camera-ar-overlay")) return;

      const wrap = document.getElementById("wrap");
      const gameCanvas = document.getElementById("game");
      const previousGameCanvasVisibility = gameCanvas ? gameCanvas.style.visibility : "";

      wrap.insertAdjacentHTML(
        "beforeend",
        `
          <div id="camera-ar-overlay">
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
          </div>
        `
      );

      if (gameCanvas) {
        gameCanvas.style.visibility = "hidden";
      }

      const overlay = document.getElementById("camera-ar-overlay");
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
    };
  }
});