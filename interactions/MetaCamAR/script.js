// https://jandig.app/generator/ Generador de markers AR.js y .patt

let scene;
let camera;
let renderer;
let arToolkitSource;
let arToolkitContext;

const markerRoots = [];
const mixers = [];
const objetosAR = [];
const clock = new THREE.Clock();

const tarjetasEspecialidad = [
    {
        id: "ec1",
        nombre: "Tarjeta EC1",
        patternUrl: "./src/ec1.patt",
        glbUrl: "./src/ec1.glb",

        scale: 1.2,
        x: 1,
        y: 0.05,
        z: -0.5,

        rotacionActiva: false,
        velocidadRotacion: 0.01,

        brilloActivo: true,
        colorBrillo: 0xffffff,
        intensidadBrillo: 1.15,
        cantidadDestellos: 8,
        tamañoDestello: 0.06,
        radioDestello: 0.78
    },
    {
        id: "ec2",
        nombre: "Tarjeta EC2",
        patternUrl: "./src/ec2.patt",
        glbUrl: "./src/ec2.glb",

        scale: 1.2,
        x: 1,
        y: 0.05,
        z: -0.5,

        rotacionActiva: false,
        velocidadRotacion: 0.01,

        brilloActivo: true,
        colorBrillo: 0xffffff,
        intensidadBrillo: 1.15,
        cantidadDestellos: 8,
        tamañoDestello: 0.06,
        radioDestello: 0.78
    },
    {
        id: "ec3",
        nombre: "Tarjeta EC3",
        patternUrl: "./src/ec3.patt",
        glbUrl: "./src/ec3.glb",

        scale: 1.2,
        x: 1,
        y: 0.05,
        z: -0.5,

        rotacionActiva: false,
        velocidadRotacion: 0.01,

        brilloActivo: true,
        colorBrillo: 0xffffff,
        intensidadBrillo: 1.2,
        cantidadDestellos: 10,
        tamañoDestello: 0.065,
        radioDestello: 0.85
    }
];

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.domElement.id = "ar-canvas";
    renderer.setClearColor(0x000000, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.zIndex = "2";
    renderer.domElement.style.pointerEvents = "none";

    document.body.appendChild(renderer.domElement);

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: "webcam",

        // Se usa la misma relación 4:3 que el canvas de detección.
        // Esto ayuda a evitar diferencias de proporción entre
        // la cámara usada para detectar y la proyección AR.
        sourceWidth: 640,
        sourceHeight: 480
    });

    arToolkitSource.init(function () {
        const video = arToolkitSource.domElement;

        // Ajustamos varias veces porque algunos móviles tardan
        // en informar la resolución real de la cámara.
        onResize();

        setTimeout(onResize, 300);
        setTimeout(onResize, 800);
        setTimeout(onResize, 1500);

        if (video) {
            video.addEventListener(
                "loadedmetadata",
                onResize,
                { once: true }
            );

            video.addEventListener(
                "canplay",
                onResize,
                { once: true }
            );
        }
    });

    window.addEventListener(
        "resize",
        onResize
    );

    window.addEventListener(
        "orientationchange",
        function () {
            setTimeout(onResize, 150);
            setTimeout(onResize, 500);
        }
    );

    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: "./repo/camera_para.dat",
        detectionMode: "mono",

        canvasWidth: 640,
        canvasHeight: 480,

        maxDetectionRate: 30
    });

    arToolkitContext.init(function () {
        camera.projectionMatrix.copy(
            arToolkitContext.getProjectionMatrix()
        );
    });

    crearLuces();
    crearTarjetasEspecialidad();
}

function crearLuces() {
    const hemiLight = new THREE.HemisphereLight(
        0xffffff,
        0x222244,
        1.25
    );

    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(
        0xffffff,
        1.4
    );

    dirLight.position.set(
        1,
        3,
        2
    );

    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        0.65
    );

    scene.add(ambientLight);
}

function crearTarjetasEspecialidad() {
    const loader = new THREE.GLTFLoader();

    tarjetasEspecialidad.forEach((tarjeta) => {
        const markerRoot = new THREE.Group();

        markerRoot.name = tarjeta.id;
        markerRoot.visible = false;

        scene.add(markerRoot);

        markerRoots.push(markerRoot);

        new THREEx.ArMarkerControls(
            arToolkitContext,
            markerRoot,
            {
                type: "pattern",
                patternUrl: tarjeta.patternUrl,
                patternRatio: 3
            }
        );

        loader.load(
            tarjeta.glbUrl,

            function (gltf) {
                const anchor = new THREE.Group();

                anchor.name =
                    `${tarjeta.id}_anchor`;

                anchor.position.set(
                    tarjeta.x || 0,
                    tarjeta.y || 0,
                    tarjeta.z || 0
                );

                const model = gltf.scene;

                // Escala uniforme.
                // Nunca modificamos X, Y o Z por separado.
                model.scale.set(
                    tarjeta.scale,
                    tarjeta.scale,
                    tarjeta.scale
                );

                model.position.set(
                    0,
                    0,
                    0
                );

                model.rotation.x = 0;

                prepararModelo(model);

                anchor.add(model);

                const brillo =
                    crearBrilloRetroCosmico(tarjeta);

                brillo.visible =
                    tarjeta.brilloActivo === true;

                anchor.add(brillo);

                markerRoot.add(anchor);

                objetosAR.push({
                    tarjeta,
                    markerRoot,
                    anchor,
                    model,
                    brillo
                });

                if (
                    gltf.animations &&
                    gltf.animations.length > 0
                ) {
                    const mixer =
                        new THREE.AnimationMixer(model);

                    gltf.animations.forEach(
                        (clip) => {
                            const action =
                                mixer.clipAction(clip);

                            action.play();
                        }
                    );

                    mixers.push(mixer);
                }
            },

            undefined,

            function (error) {
                console.error(
                    "No se pudo cargar el modelo:",
                    tarjeta.glbUrl,
                    error
                );
            }
        );
    });
}

function prepararModelo(model) {
    model.traverse((child) => {
        if (!child.isMesh) return;

        child.castShadow = false;
        child.receiveShadow = false;

        if (child.material) {
            child.material.side =
                THREE.DoubleSide;

            child.material.needsUpdate =
                true;
        }
    });
}

function crearTexturaRetro(tipo = "star") {
    const canvas =
        document.createElement("canvas");

    canvas.width = 96;
    canvas.height = 96;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        96,
        96
    );

    if (tipo === "star") {
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(
            48,
            48,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 0.75;

        ctx.fillRect(
            45,
            18,
            6,
            60
        );

        ctx.fillRect(
            18,
            45,
            60,
            6
        );

        ctx.globalAlpha = 0.45;

        ctx.fillRect(
            38,
            38,
            20,
            20
        );
    }

    if (tipo === "comet") {
        ctx.fillStyle = "#ffffff";

        ctx.globalAlpha = 0.4;

        ctx.beginPath();

        ctx.moveTo(
            8,
            50
        );

        ctx.lineTo(
            48,
            34
        );

        ctx.lineTo(
            42,
            62
        );

        ctx.closePath();

        ctx.fill();

        ctx.globalAlpha = 0.9;

        ctx.beginPath();

        ctx.arc(
            62,
            48,
            14,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.beginPath();

        ctx.arc(
            66,
            44,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    if (tipo === "planet") {
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 5;

        ctx.globalAlpha = 0.85;

        ctx.beginPath();

        ctx.ellipse(
            48,
            50,
            30,
            13,
            -0.35,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.globalAlpha = 0.9;

        ctx.beginPath();

        ctx.arc(
            48,
            48,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 0.9;

        ctx.beginPath();

        ctx.arc(
            74,
            38,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    texture.magFilter =
        THREE.LinearFilter;

    texture.minFilter =
        THREE.LinearFilter;

    return texture;
}

function crearBrilloRetroCosmico(tarjeta) {
    const grupo =
        new THREE.Group();

    grupo.name =
        `${tarjeta.id}_retro_cosmic_fx`;

    const color =
        tarjeta.colorBrillo || 0xffffff;

    const radioBase =
        tarjeta.radioDestello || 0.85;

    const tamBase =
        tarjeta.tamañoDestello || 0.06;

    const cantidad =
        tarjeta.cantidadDestellos || 8;

    const texturaStar =
        crearTexturaRetro("star");

    const texturaComet =
        crearTexturaRetro("comet");

    const texturaPlanet =
        crearTexturaRetro("planet");

    const totalStars =
        Math.max(
            5,
            Math.round(cantidad * 0.75)
        );

    const totalComets = 2;

    const totalPlanets = 1;

    for (
        let i = 0;
        i < totalStars;
        i++
    ) {
        const material =
            new THREE.SpriteMaterial({
                map: texturaStar,
                color,
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
                depthTest: false,
                blending:
                    THREE.AdditiveBlending
            });

        const sprite =
            new THREE.Sprite(material);

        const angulo =
            (i / totalStars) *
            Math.PI *
            2;

        const radio =
            radioBase +
            (i % 3) *
            0.12;

        const altura =
            0.16 +
            (i % 4) *
            0.18;

        sprite.position.set(
            Math.cos(angulo) * radio,
            altura,
            Math.sin(angulo) * radio
        );

        const escala =
            tamBase *
            (
                0.55 +
                (i % 3) *
                0.2
            );

        sprite.scale.set(
            escala,
            escala,
            escala
        );

        sprite.userData = {
            tipo: "star",
            baseAngle: angulo,
            radius: radio,
            baseY: altura,

            amplitude:
                0.025 +
                (i % 2) *
                0.02,

            speed:
                0.18 +
                (i % 4) *
                0.05,

            twinkle:
                2.1 +
                (i % 3) *
                0.45,

            phase:
                i *
                0.8,

            baseScale:
                escala
        };

        grupo.add(sprite);
    }

    for (
        let i = 0;
        i < totalComets;
        i++
    ) {
        const material =
            new THREE.SpriteMaterial({
                map: texturaComet,
                color,
                transparent: true,
                opacity: 0.85,
                depthWrite: false,
                depthTest: false,
                blending:
                    THREE.AdditiveBlending
            });

        const sprite =
            new THREE.Sprite(material);

        const angulo =
            i === 0
                ? 0.75
                : 3.85;

        const radio =
            radioBase *
            (
                1.08 +
                i *
                0.14
            );

        const altura =
            0.42 +
            i *
            0.28;

        sprite.position.set(
            Math.cos(angulo) *
            radio,
            altura,
            Math.sin(angulo) *
            radio
        );

        const escala =
            tamBase *
            1.45;

        sprite.scale.set(
            escala,
            escala,
            escala
        );

        sprite.userData = {
            tipo: "comet",
            baseAngle: angulo,
            radius: radio,
            baseY: altura,

            speed:
                0.45 +
                i *
                0.12,

            phase:
                i *
                1.2,

            baseScale:
                escala
        };

        grupo.add(sprite);
    }

    for (
        let i = 0;
        i < totalPlanets;
        i++
    ) {
        const material =
            new THREE.SpriteMaterial({
                map: texturaPlanet,
                color,
                transparent: true,
                opacity: 0.65,
                depthWrite: false,
                depthTest: false,
                blending:
                    THREE.AdditiveBlending
            });

        const sprite =
            new THREE.Sprite(material);

        const angulo =
            2.35;

        const radio =
            radioBase *
            0.72;

        const altura =
            0.32;

        sprite.position.set(
            Math.cos(angulo) *
            radio,
            altura,
            Math.sin(angulo) *
            radio
        );

        const escala =
            tamBase *
            1.25;

        sprite.scale.set(
            escala,
            escala,
            escala
        );

        sprite.userData = {
            tipo: "planet",
            baseAngle: angulo,
            radius: radio,
            baseY: altura,
            speed: 0.2,
            phase: 1.4,
            baseScale: escala
        };

        grupo.add(sprite);
    }

    return grupo;
}

function animarBrilloPixelArt(
    brillo,
    tiempo,
    tarjeta
) {
    const intensidad =
        tarjeta.intensidadBrillo ||
        1.15;

    brillo.children.forEach(
        (item) => {
            const d =
                item.userData;

            if (
                d.tipo ===
                "star"
            ) {
                const orbit =
                    d.baseAngle +
                    tiempo *
                    d.speed;

                const pulso =
                    Math.sin(
                        tiempo *
                        d.twinkle +
                        d.phase
                    );

                item.position.x =
                    Math.cos(orbit) *
                    d.radius;

                item.position.z =
                    Math.sin(orbit) *
                    d.radius;

                item.position.y =
                    d.baseY +
                    Math.sin(
                        tiempo *
                        1.1 +
                        d.phase
                    ) *
                    d.amplitude;

                const glow =
                    0.45 +
                    Math.max(
                        0,
                        pulso
                    ) *
                    0.55;

                const scale =
                    d.baseScale *
                    (
                        0.9 +
                        Math.max(
                            0,
                            pulso
                        ) *
                        intensidad
                    );

                item.material.opacity =
                    glow;

                item.scale.set(
                    scale,
                    scale,
                    scale
                );
            }

            if (
                d.tipo ===
                "comet"
            ) {
                const orbit =
                    d.baseAngle +
                    tiempo *
                    d.speed;

                const trailPulse =
                    Math.sin(
                        tiempo *
                        1.8 +
                        d.phase
                    );

                item.position.x =
                    Math.cos(orbit) *
                    d.radius;

                item.position.z =
                    Math.sin(orbit) *
                    d.radius;

                item.position.y =
                    d.baseY +
                    Math.sin(
                        tiempo *
                        1.2 +
                        d.phase
                    ) *
                    0.04;

                const scale =
                    d.baseScale *
                    (
                        0.95 +
                        Math.max(
                            0,
                            trailPulse
                        ) *
                        0.25
                    );

                item.scale.set(
                    scale,
                    scale,
                    scale
                );

                item.material.opacity =
                    0.55 +
                    Math.max(
                        0,
                        trailPulse
                    ) *
                    0.35;

                item.material.rotation =
                    -orbit;
            }

            if (
                d.tipo ===
                "planet"
            ) {
                const orbit =
                    d.baseAngle -
                    tiempo *
                    d.speed;

                const pulse =
                    Math.sin(
                        tiempo *
                        1.1 +
                        d.phase
                    );

                item.position.x =
                    Math.cos(orbit) *
                    d.radius;

                item.position.z =
                    Math.sin(orbit) *
                    d.radius;

                item.position.y =
                    d.baseY +
                    Math.cos(
                        tiempo *
                        0.8 +
                        d.phase
                    ) *
                    0.03;

                const scale =
                    d.baseScale *
                    (
                        1 +
                        Math.max(
                            0,
                            pulse
                        ) *
                        0.15
                    );

                item.scale.set(
                    scale,
                    scale,
                    scale
                );

                item.material.opacity =
                    0.42 +
                    Math.max(
                        0,
                        pulse
                    ) *
                    0.22;

                item.material.rotation =
                    orbit *
                    0.15;
            }
        }
    );
}

/*
==================================================
CORRECCIÓN PRINCIPAL PARA MÓVILES
==================================================

En la versión anterior:

- el video se forzaba a 100vw x 100vh
- el canvas WebGL también se forzaba a 100vw x 100vh
- pero la cámara podía tener otra proporción

Eso podía provocar que el render 3D se viera
más alto o más ancho dependiendo del móvil.

Ahora calculamos manualmente un comportamiento
tipo "cover".

La cámara y el canvas WebGL reciben EXACTAMENTE:

- el mismo ancho
- el mismo alto
- la misma posición
- el mismo recorte

Por eso el GLB conserva su proporción.
*/

function onResize() {
    if (
        !arToolkitSource ||
        !renderer
    ) {
        return;
    }

    const viewportWidth =
        window.innerWidth;

    const viewportHeight =
        window.innerHeight;

    const pixelRatio =
        Math.min(
            window.devicePixelRatio ||
            1,
            1.5
        );

    const video =
        arToolkitSource.domElement ||
        document.querySelector(
            "video"
        );

    /*
    Intentamos obtener la resolución REAL
    de la cámara.

    Algunos móviles todavía no la tienen
    disponible al iniciar, por eso usamos
    temporalmente 640x480.
    */

    const sourceWidth =
        video &&
            video.videoWidth
            ? video.videoWidth
            : 640;

    const sourceHeight =
        video &&
            video.videoHeight
            ? video.videoHeight
            : 480;

    const sourceAspect =
        sourceWidth /
        sourceHeight;

    const viewportAspect =
        viewportWidth /
        viewportHeight;

    /*
    Calculamos COVER manualmente.

    No deformamos nada.

    Simplemente hacemos el video y el canvas
    un poco más grandes que la pantalla
    cuando sea necesario.

    El sobrante queda recortado.
    */

    let displayWidth;
    let displayHeight;

    if (
        viewportAspect >
        sourceAspect
    ) {
        displayWidth =
            viewportWidth;

        displayHeight =
            viewportWidth /
            sourceAspect;
    } else {
        displayHeight =
            viewportHeight;

        displayWidth =
            viewportHeight *
            sourceAspect;
    }

    /*
    Centramos ambos elementos.
    */

    const left =
        (
            viewportWidth -
            displayWidth
        ) /
        2;

    const top =
        (
            viewportHeight -
            displayHeight
        ) /
        2;

    /*
    THREE.JS
    */

    renderer.setPixelRatio(
        pixelRatio
    );

    renderer.setSize(
        Math.round(
            displayWidth
        ),
        Math.round(
            displayHeight
        ),
        false
    );

    const canvas =
        renderer.domElement;

    canvas.style.position =
        "fixed";

    canvas.style.left =
        `${left}px`;

    canvas.style.top =
        `${top}px`;

    canvas.style.width =
        `${displayWidth}px`;

    canvas.style.height =
        `${displayHeight}px`;

    canvas.style.zIndex =
        "2";

    canvas.style.pointerEvents =
        "none";

    /*
    VIDEO DE LA CÁMARA

    Recibe exactamente el mismo rectángulo
    que el canvas WebGL.
    */

    if (video) {
        video.style.position =
            "fixed";

        video.style.left =
            `${left}px`;

        video.style.top =
            `${top}px`;

        video.style.width =
            `${displayWidth}px`;

        video.style.height =
            `${displayHeight}px`;

        /*
        Usamos fill porque ya calculamos
        nosotros mismos las proporciones.

        El video NO se deforma porque
        displayWidth y displayHeight
        mantienen sourceAspect.
        */

        video.style.objectFit =
            "fill";

        video.style.zIndex =
            "1";

        video.style.margin =
            "0";

        video.style.padding =
            "0";

        video.style.transform =
            "none";
    }

    /*
    El canvas interno de AR.js se utiliza
    únicamente para detectar el marcador.

    No necesitamos mostrarlo ni adaptarlo
    visualmente a la pantalla.
    */

    if (
        arToolkitContext &&
        arToolkitContext.arController
    ) {
        arToolkitContext
            .arController
            .canvas
            .style
            .display =
            "none";
    }
}

function update() {
    if (
        !arToolkitSource ||
        arToolkitSource.ready ===
        false
    ) {
        return;
    }

    if (!arToolkitContext) {
        return;
    }

    arToolkitContext.update(
        arToolkitSource.domElement
    );
}

function render() {
    renderer.render(
        scene,
        camera
    );
}

function actualizarTextoPixelArt(
    markerActivo
) {
    const info =
        document.getElementById(
            "info"
        );

    if (markerActivo) {
        info.innerHTML = `
          MARKER DETECTADO<br>
          ${markerActivo.toUpperCase()}<br>
          SISTEMA ACTIVO
        `;
    } else {
        info.innerHTML = `
          APUNTA LA METACÁMARA<br>
          HACIA UNA TARJETA<br>
          DE ESPECIALIDAD
        `;
    }
}

function animate() {
    requestAnimationFrame(
        animate
    );

    const delta =
        clock.getDelta();

    const tiempo =
        clock.elapsedTime;

    update();

    mixers.forEach(
        (mixer) => {
            mixer.update(
                delta
            );
        }
    );

    let markerActivo =
        null;

    objetosAR.forEach(
        (objeto) => {
            const {
                tarjeta,
                markerRoot,
                anchor,
                brillo
            } =
                objeto;

            if (
                !markerRoot.visible
            ) {
                return;
            }

            markerActivo =
                tarjeta.nombre;

            if (
                tarjeta
                    .rotacionActiva ===
                true
            ) {
                anchor.rotation.y +=
                    tarjeta
                        .velocidadRotacion ||
                    0.01;
            }

            if (
                tarjeta
                    .brilloActivo ===
                true
            ) {
                brillo.visible =
                    true;

                animarBrilloPixelArt(
                    brillo,
                    tiempo,
                    tarjeta
                );
            } else {
                brillo.visible =
                    false;
            }
        }
    );

    actualizarTextoPixelArt(
        markerActivo
    );

    render();
}