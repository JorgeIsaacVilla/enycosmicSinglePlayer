/*Script para render THREE.JS de planetas (inicio) */
        const textureLoader = new THREE.TextureLoader();
        // Escena, cámara y renderizador
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

                /*Definir cielo*/
                const skyTexture = textureLoader.load('./sistemaSolar/src/cielo.jpg');

                /*definir suelo*/
                let floorPositionY = -12; //Altura del suelo
                const floorTexture = textureLoader.load(''); //definir suelo

        // Crear un cubo para el cielo
        const skyGeometry = new THREE.SphereGeometry(500, 60, 40);  
        const skyMaterial = new THREE.MeshBasicMaterial({
          map: skyTexture,
          side: THREE.BackSide  
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        scene.add(sky);

        /*Creación de objetos con evento clic*/
        //tener en cuenta que estos elementos se pondrán encima de los renders para optimizar la interacción

        // Crear piso (lado azul)
        const geometryFloor = new THREE.PlaneGeometry(100, 100);
        const materialFloor = new THREE.MeshBasicMaterial({ 
          map: floorTexture,
          transparent: true,
        });
        const floor = new THREE.Mesh(geometryFloor, materialFloor);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = floorPositionY;
        scene.add(floor);

        /* Función de eventos click (inicio) */
        // Crear un raycaster y un vector para el ratón
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();// Para almacenar la posición del ratón en coordenadas normalizadas

        // Función para actualizar la posición del ratón
        function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        let estadoVentanaEmergente = false; //estado de ventana emergente para habiltiar o desabilitar el canvas y evitar clics no deseados

        function onClickOrTouch(event) {
        //event.preventDefault(); // Prevenir el comportamiento por defecto

        if (estadoVentanaEmergente) {
            console.log("Clic bloqueado: ventana emergente activa.");
            return; // Evita que el canvas procese clics si la ventana está activa
          }

        if (event.type === 'touchstart') {
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }

        // Crear un rayo a partir de la cámara y las coordenadas del ratón
        raycaster.setFromCamera(mouse, camera);

        // Calcular los objetos que intersectan con el raycaster
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Intentar obtener el nombre desde userData
        const objectName = clickedObject.userData.nombre || "Desconocido";
        console.log(`Clic en el objeto: ${objectName}`);

        const objeto = newObjetos.find(obj => obj.nombre === objectName);

        if (objeto) {

            estadoVentanaEmergente = true; // Bloquea eventos en el canvas

          const positions = getObjectPositionWithSize(clickedObject);
          console.log(`Se dio clic en: ${objeto.nombre}\nPosición: ${JSON.stringify(positions)}`);
          
          // Crear un nuevo contenedor dinámicamente en el body
          const containerElement = document.createElement('div');
          containerElement.className = 'container-element';
          containerElement.innerHTML = `
            <div class="container-element-header">
              <h2>Planeta <span>${objeto.nombre}</span></h2>
              <button onclick="cerrarDetalle()">X</button>
            </div>
            <model-viewer 
              src="${objeto.glb}" 
              alt="Modelo 3D de ${objeto.nombre}" 
              ar 
              auto-rotate 
              camera-controls 
              shadow-intensity="1"
              ar 
              environment-image="neutral">
            </model-viewer>
            <h3>Curiosidades:</h3>
            <p>${objeto.curiosidades}</p>
          `;

          // Agregar el contenedor al body
          document.body.appendChild(containerElement);
          
        } else {
          console.warn("No se encontró el objeto en la lista de newObjetos.");
        }
        } else {
        console.log("No se hizo clic en ningún objeto.");
        }
        }

        // Función para cerrar el detalle
        function cerrarDetalle() {
        estadoVentanaEmergente = false; // Reactiva eventos en el canvas
        const containerElement = document.querySelector('.container-element');
        if (containerElement) {
        document.body.removeChild(containerElement); // Eliminar el contenedor del body
        }
        }

        // Agregar los eventos de clic y toque, especificando passive: false para touchstart
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('click', onClickOrTouch, false);
        window.addEventListener('touchstart', onClickOrTouch, { passive: false });

        /* Función de eventos click (fin) */

        /* Creación de objetos (inicio) */
        //se renderizan objetos son profundidad con evento clic. se proyecta usar este mismo script para superponerlo encima de los render para las interacciónes
                const mercurio = textureLoader.load('./sistemaSolar/src/mercurio.png');
                const venus = textureLoader.load('./sistemaSolar/src/venus.png');
                const tierra = textureLoader.load('./sistemaSolar/src/tierra.png');
                const marte = textureLoader.load('./sistemaSolar/src/marte.png');
                const jupiter = textureLoader.load('./sistemaSolar/src/jupiter.png');
                const saturno = textureLoader.load('./sistemaSolar/src/saturno.png');
                const neptuno = textureLoader.load('./sistemaSolar/src/neptuno.png');
                const urano = textureLoader.load('./sistemaSolar/src/urano.png');
                const pluton = textureLoader.load('./sistemaSolar/src/pluton.png');
                const sol = textureLoader.load('./sistemaSolar/src/sol.png');
                const luna = textureLoader.load('./sistemaSolar/src/luna.png');

                const estrellaRoja = textureLoader.load('./sistemaSolar/src/estrellaroja.png');
                const estrellaAmarilla = textureLoader.load('./sistemaSolar/src/estrellaamarilla.png');

                const alfrente = 0;
                const atras = Math.PI;
                const derecha = -Math.PI / 2;
                const izquierda = Math.PI / 2;
                

        // Lista original de objetos planos (inicio)
        let newObjetos = [
          // Frente
          {
            nombre: 'sol',
            imagen: sol,
            position: { x: 0, y: 0, z: -310 },
            rotation: alfrente,
            size: { width: 60, height: 60 },
            curiosidades: 'El Sol es una estrella de tipo G2V con un núcleo que genera energía mediante fusión nuclear. Su temperatura alcanza los 15 millones de grados Celsius. 🌞',
            glb: './sistemaSolar/sol.glb',
          },
          {
            nombre: 'luna',
            imagen: luna,
            position: { x: 90, y: 0, z: -300 },
            rotation: alfrente,
            size: { width: 35, height: 35 },
            curiosidades: 'La Luna tiene una órbita elíptica alrededor de la Tierra, lo que provoca que su distancia varíe entre 356,500 km y 406,700 km. 🌙',
            glb: './sistemaSolar/luna.glb',
          },
          {
            nombre: 'jupiter',
            imagen: jupiter,
            position: { x: 100, y: 0, z: -400 },
            rotation: alfrente,
            size: { width: 15, height: 15 },
            curiosidades: 'Júpiter tiene una atmósfera compuesta principalmente de hidrógeno y helio, y su Gran Mancha Roja es una tormenta que ha estado activa durante siglos. 🌌',
            glb: './sistemaSolar/jupiter.glb',
          },
          {
            nombre: 'venus',
            imagen: venus,
            position: { x: -10, y: 0, z: -350 },
            rotation: alfrente,
            size: { width: 15, height: 15 },
            curiosidades: 'Venus tiene una atmósfera densa de dióxido de carbono y nubes de ácido sulfúrico, lo que provoca un efecto invernadero extremo y temperaturas superiores a 460°C. 🔥',
            glb: './sistemaSolar/venus.glb',
          },
          {
            nombre: 'marte',
            imagen: marte,
            position: { x: -30, y: 0, z: -315 },
            rotation: alfrente,
            size: { width: 8, height: 8 },
            curiosidades: 'Marte tiene un día que dura 24.6 horas y una atmósfera muy fina compuesta en su mayoría por dióxido de carbono. El monte Olimpo, el volcán más grande, mide 22 km de altura. 🔴',
            glb: './sistemaSolar/marte.glb',
          },
          {
            nombre: 'saturno',
            imagen: saturno,
            position: { x: -70, y: 0, z: -355 },
            rotation: alfrente,
            size: { width: 25, height: 25 },
            curiosidades: 'Saturno tiene anillos compuestos por hielo, polvo y rocas, que varían en tamaño y luminosidad. Estos anillos son más anchos que el propio planeta. 🪐',
            glb: './sistemaSolar/saturno.glb',
          },
        
          // Atrás
          {
            nombre: 'mercurio',
            imagen: mercurio,
            position: { x: 0, y: 0, z: 405 },
            rotation: atras,
            size: { width: 15, height: 15 },
            curiosidades: 'Mercurio es el planeta más cercano al Sol y carece de atmósfera significativa, lo que provoca temperaturas extremas entre 430°C durante el día y -180°C por la noche. ☀️',
            glb: './sistemaSolar/mercurio.glb',
          },
          {
            nombre: 'neptuno',
            imagen: neptuno,
            position: { x: -90, y: 0, z: 410 },
            rotation: atras,
            size: { width: 15, height: 15 },
            curiosidades: 'Neptuno es el último planeta del sistema solar y tiene vientos supersónicos que pueden superar los 2,100 km/h. Además, posee un sistema de anillos tenue y oscuro. 🌊',
            glb: './sistemaSolar/neptuno.glb',
          },
          {
            nombre: 'tierra',
            imagen: tierra,
            position: { x: -90, y: 0, z: 120 },
            rotation: atras,
            size: { width: 35, height: 35 },
            curiosidades: 'La Tierra es el único planeta conocido con vida y un 70% de su superficie está cubierta de agua. Su núcleo externo líquido genera un campo magnético que nos protege de la radiación solar. Además, su atmósfera permite la existencia del ciclo del agua y las auroras boreales. 🌍',
            glb: './sistemaSolar/tierra.glb',
          },
        
          // Derecha
          {
            nombre: 'urano',
            imagen: urano,
            position: { x: 405, y: 100, z: 200 },
            rotation: derecha,
            size: { width: 25, height: 25 },
            curiosidades: 'Urano es único porque su eje de rotación está inclinado casi 98°, lo que significa que gira de lado respecto a su órbita. Su atmósfera está formada por hidrógeno, helio y metano. 😵‍💫',
            glb: './sistemaSolar/urano.glb',
          },
          {
            nombre: 'pluton',
            imagen: pluton,
            position: { x: 410, y: 0, z: 130 },
            rotation: derecha,
            size: { width: 20, height: 20 },
            curiosidades: 'Plutón, aunque considerado un planeta enano, posee un sistema de lunas, siendo Caronte la más grande. Su órbita es muy excéntrica y dura 248 años terrestres. 🪐',
            glb: './sistemaSolar/pluton.glb',
          },
        
          // Estrellas rojas
          {
            nombre: 'Betelgeuse',
            imagen: estrellaRoja,
            position: { x: 90, y: 80, z: -400 },
            rotation: alfrente,
            size: { width: 8, height: 8 },
            curiosidades: 'Betelgeuse es una supergigante roja y uno de los objetos más brillantes en la constelación de Orión. Está al final de su vida y podría explotar en una supernova en los próximos 100,000 años. 🔴',
            glb: './sistemaSolar/estrellaRoja.glb',
          },
          {
            nombre: 'Antares',
            imagen: estrellaRoja,
            position: { x: -400, y: 180, z: 90 },
            rotation: izquierda,
            size: { width: 8, height: 8 },
            curiosidades: 'Antares es una supergigante roja que forma el corazón de la constelación de Escorpio. Tiene una masa aproximadamente 12 veces mayor que la del Sol. 🦂',
            glb: './sistemaSolar/estrellaRoja.glb',
          },
          {
            nombre: 'Eta Carinae',
            imagen: estrellaRoja,
            position: { x: -400, y: 50, z: 120 },
            rotation: izquierda,
            size: { width: 8, height: 8 },
            curiosidades: 'Eta Carinae es una de las estrellas más masivas y luminosas conocidas, ubicada en la constelación de Carina. Es una estrella inestable que podría explotar en cualquier momento. 🌟',
            glb: './sistemaSolar/estrellaRoja.glb',
          },
          {
            nombre: 'Algol',
            imagen: estrellaRoja,
            position: { x: 400, y: 50, z: 120 },
            rotation: derecha,
            size: { width: 8, height: 8 },
            curiosidades: 'Algol, conocida como "la estrella del demonio", es una estrella binaria eclipsante en la constelación de Perseo. Su brillo varía dramáticamente cada 2.87 días. 👹',
            glb: './sistemaSolar/estrellaRoja.glb',
          },
          {
            nombre: 'S2',
            imagen: estrellaRoja,
            position: { x: 0, y: 180, z: -400 },
            rotation: alfrente,
            size: { width: 8, height: 8 },
            curiosidades: 'S2 es una estrella masiva que orbita el agujero negro supermasivo en el centro de la Vía Láctea, tomando unos 16 años en completar su órbita. 🌌',
            glb: './sistemaSolar/estrellaRoja.glb',
          },
        
          // faltan Estrellas azules y estrellas blancas
        ];     

        // Lista original de objetos planos (Fin)

        // Nombres de los objetos a los que se les asignarán nuevas posiciones
        const selectedNames = ['sol', 'luna', 'jupiter', 'venus', 'marte', 'saturno',  'mercurio','neptuno'  ];

        // Función para asignar posiciones aleatorias
        function assignRandomPositions(objects, selectedNames) {
        objects.forEach(obj => {
        if (selectedNames.includes(obj.nombre)) {
            obj.position.x = Math.random() * 240 - 120; // Rango: -120 a 120
            obj.position.y = Math.random() * 91 - 1;// Rango: -1 a 90
        }
        });
        }

        // Asignar posiciones aleatorias a los objetos seleccionados
        assignRandomPositions(newObjetos, selectedNames);

        // Crear objetos en la escena
        newObjetos.forEach(obj => {
        const geometryObject = new THREE.PlaneGeometry(obj.size.width, obj.size.height);
        const materialObject = new THREE.MeshBasicMaterial({
        map: obj.imagen,
        transparent: true,
        opacity: 1,
        });

        const object = new THREE.Mesh(geometryObject, materialObject);
        object.position.set(obj.position.x, obj.position.y, obj.position.z);
        object.rotation.y = obj.rotation;

        // Asignar el nombre al objeto para que el raycaster lo identifique
        object.userData.nombre = obj.nombre;

        // Añadir el objeto a la escena
        scene.add(object);
        });


        function getObjectPositionWithSize(object) {
        const width = object.geometry.parameters.width;
        const height = object.geometry.parameters.height;
        const x = object.position.x;
        const y = object.position.y;
        const z = object.position.z;

        return {
        topLeft: { x: x - width / 2, y: y + height / 2, z },
        topRight: { x: x + width / 2, y: y + height / 2, z },
        bottomLeft: { x: x - width / 2, y: y - height / 2, z },
        bottomRight: { x: x + width / 2, y: y - height / 2, z }
        };
        }
        /* Creación de objetos (fin) */

        /*Posocionamientos de camara (inicio)*/

        // Modificar la posición de la cámara
        camera.position.x = 0;
        camera.position.y = 10;
        camera.position.z = 0;

        // Crear controles de órbita
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        //controls.maxPolarAngle = Math.PI / 2; //con solo esta linea de codigo puedo mirar completamenta hacia abajo pero no hacia arriba
        controls.minPolarAngle = 0; // Permite mirar completamente hacia arriba
        controls.maxPolarAngle = Math.PI; // Permite mirar completamente hacia abajo

        // Límites del zoom
        controls.minDistance = 1;
        controls.maxDistance = 58;

        // Función de animación
        function animate() {
          requestAnimationFrame(animate);
          controls.update();

          // Obtener el deltaTime solo una vez por frame
          const delta = clock.getDelta();
          
          // Actualizar todos los mixers con un valor constante
          mixers.forEach(mixer => {
          mixer.update(delta); // Usar el delta calculado en cada frame
          });
          
          // Renderizar la escena
          renderer.render(scene, camera);

        }

        /*Posicionamiento de camara (fin)*/

        // 💡 Luz para iluminar el cubo
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        // 🎮 Controles de cámara (rotar, acercar, alejar)
        camera.position.set(0, 0, 30);

        // Cargar el modelo GLB (T-Rex) dentro de la escena
        const loader = new THREE.GLTFLoader();
        let mixer; // Variable para controlar la animación
        let trex; // Variable para almacenar el modelo T-Rex

              const clock = new THREE.Clock(); // Definir el reloj para el cálculo de delta
              const mirarAlfrente = new THREE.Euler(0, 0, 0);
              const mirarDerecha = new THREE.Euler(0, Math.PI / 4, 0);
              const mirarDerechaAtras = new THREE.Euler(0, Math.PI / 2, 0);
              const mirarIzquierdaAlfrente = new THREE.Euler(0, -Math.PI / 4, 0);

              // En posición poner new THREE.Vector3(x, y, z)

              let trexes = [
/* acá se renderizan los elementos 3d de three.js
                {
                  model: './sistemaSolar/planetario.glb',
                  position: new THREE.Vector3(0, -2, 0),
                  rotation: mirarAlfrente,
                  tamano: 5,
                  name: 'sistema solar'
                },
                {
                  model: './sistemaSolar/galaxy.glb',
                  position: new THREE.Vector3(0, -2, 0),
                  rotation: mirarAlfrente,
                  tamano: 60,
                  name: 'sistema solar'
                },
*/
              ];

        // Crear un array para almacenar los mixers
        const mixers = [];

        // Cargar y agregar los T-Rex a la escena
        trexes.forEach(trexData => {
          loader.load(trexData.model, function (gltf) {
            const trex = gltf.scene;

            // Colocar el T-Rex en la posición deseada
            trex.position.set(trexData.position.x, trexData.position.y, trexData.position.z);

            // Ajustar el tamaño del dinosaurio
            trex.scale.set(trexData.tamano, trexData.tamano, trexData.tamano); // Escala en X, Y, Z

            // Rotar el modelo según el valor de rotación
            trex.rotation.set(trexData.rotation.x, trexData.rotation.y, trexData.rotation.z);

            // Asignar un nombre al T-Rex
            trex.userData.nombre = trexData.name;

            // Agregar el T-Rex a la escena
            scene.add(trex);

            // Comprobar si el modelo tiene animaciones
            if (gltf.animations && gltf.animations.length) {
              // Verificar si el T-Rex ya tiene un AnimationMixer
              if (!trex.userData.mixer) {
                // Crear un AnimationMixer para este modelo solo una vez
                const mixer = new THREE.AnimationMixer(trex);
                trex.userData.mixer = mixer; // Almacenar el mixer en el modelo

                // Añadir las animaciones del modelo al mixer
                gltf.animations.forEach((clip) => {
                  const action = mixer.clipAction(clip);
                  action.play();

                  // Ajustar la velocidad de la animación para todos los modelos
                  action.timeScale = 0.3; // Este valor lo puedes ajustar según lo que necesites (1 es la velocidad normal)
                });
              }
            }
          }, undefined, function (error) {
            console.error(error);
          });
        });

        // Función para actualizar la posición del ratón
        function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        // Agregar un helper de ejes para visualizar los ejes X, Y, Z
        /*const axesHelper = new THREE.AxesHelper(10); // El número define la longitud de los ejes
        scene.add(axesHelper);*/

        animate();



        // Asegurar liberación completa de recursos
        function clearGLBModels() {
          trexes.forEach((trexData) => {
              const objToRemove = scene.children.find(obj => obj.userData && obj.userData.nombre === trexData.name);
              if (objToRemove) {
                  scene.remove(objToRemove);
                  
                  // Liberar geometría
                  if (objToRemove.geometry) objToRemove.geometry.dispose();

                  // Liberar material y texturas
                  if (objToRemove.material) {
                      if (Array.isArray(objToRemove.material)) {
                          objToRemove.material.forEach(mat => {
                              if (mat.map) mat.map.dispose();  // Liberar textura
                              mat.dispose();
                          });
                      } else {
                          if (objToRemove.material.map) objToRemove.material.map.dispose();
                          objToRemove.material.dispose();
                      }
                  }
              }
          });

          // Limpiar el array de trexes y mixers
          trexes.length = 0;
          mixers.length = 0;

          console.log("Modelos GLB eliminados y arrays vaciados.");
        }

        //Array de botones del header (inicio)
              const planetas = [
                /*Planetas */
                  {
                    nombre: "mercurio",
                    nombreCorrecto: "Mercurio",
                    modelo: "./sistemaSolar/mercurio.glb",
                    curiosidades: [
                      "Mercurio es el planeta más pequeño del sistema solar.",
                      "Es el planeta más cercano al Sol y tiene temperaturas extremas.",
                    ],
                    posicion:new THREE.Vector3(0, -2, 0),
                    tamano:5,
                  },
                  {
                    nombre: "venus",
                    nombreCorrecto: "Venus",
                    modelo: "./sistemaSolar/venus.glb",
                    curiosidades: [
                      "Venus tiene una atmósfera densa y está cubierto de nubes de ácido sulfúrico.",
                      "Es el planeta más caliente del sistema solar debido a su efecto invernadero extremo.",
                    ],
                    posicion:new THREE.Vector3(0, 0, 0),
                    tamano:5,
                  },
                  {
                    nombre: "tierra",
                    nombreCorrecto: "Tierra",
                    modelo: "./sistemaSolar/tierra.glb",
                    curiosidades: [
                      "La Tierra es el único planeta conocido con vida.",
                      "Su atmósfera está compuesta principalmente de nitrógeno y oxígeno.",
                    ],
                    posicion:new THREE.Vector3(0, 8, 0),
                    tamano:50,
                  },
                  {
                    nombre: "marte",
                    nombreCorrecto: "Marte",
                    modelo: "./sistemaSolar/marte.glb",
                    curiosidades: [
                      "Marte tiene la montaña más alta del sistema solar: el Monte Olimpo.",
                      "Se cree que Marte tuvo agua líquida en su superficie en el pasado.",
                    ],
                    posicion:new THREE.Vector3(0, 8, 0),
                    tamano:15,
                  },
                  {
                    nombre: "jupiter",
                    nombreCorrecto: "Júpiter",
                    modelo: "./sistemaSolar/jupiter.glb",
                    curiosidades: [
                      "Júpiter es el planeta más grande del sistema solar.",
                      "Tiene una gran tormenta llamada la Gran Mancha Roja, activa durante siglos.",
                    ],
                    posicion:new THREE.Vector3(0, 2, 0),
                    tamano:10,
                  },
                  {
                    nombre: "saturno",
                    nombreCorrecto: "Saturno",
                    modelo: "./sistemaSolar/saturno.glb",
                    curiosidades: [
                      "Saturno es famoso por sus anillos de hielo y roca.",
                      "Es el segundo planeta más grande del sistema solar.",
                    ],
                    posicion:new THREE.Vector3(0, 5, 0),
                    tamano:8,
                  },
                  {
                    nombre: "neptuno",
                    nombreCorrecto: "Neptuno",
                    modelo: "./sistemaSolar/neptuno.glb",
                    curiosidades: [
                      "Neptuno es el planeta más alejado del Sol.",
                      "Tiene los vientos más rápidos del sistema solar, de hasta 2,100 km/h.",
                    ],
                    posicion:new THREE.Vector3(0, 5, 0),
                    tamano:2,
                  },
                  
                  {
                    nombre: "urano",
                    nombreCorrecto: "Urano",
                    modelo: "./sistemaSolar/urano.glb",
                    curiosidades: [
                      "Urano gira de lado en comparación con los demás planetas.",
                      "Tiene un tono azul debido al metano en su atmósfera.",
                    ],
                    posicion:new THREE.Vector3(0, 8, 0),
                    tamano:30,
                  },
                  {
                    nombre: "pluton",
                    nombreCorrecto: "Plutón",
                    modelo: "./sistemaSolar/pluton.glb",
                    curiosidades: [
                      "Plutón fue considerado un planeta hasta 2006.",
                      "Tiene una luna, Caronte, que es casi del mismo tamaño que Plutón.",
                    ],
                    posicion:new THREE.Vector3(0, 8, 0),
                    tamano:8,
                  },


                  /*Eventos astronomicos */
                  {
                    nombre: "magnetismo",
                    nombreCorrecto: "Magnetismo",
                    modelo: "./sistemaSolar/tierraHolograma2.glb",
                    curiosidades: [
                      "🌍 El campo magnético de la Tierra se extiende hasta 10 veces el radio del planeta (alrededor de 60,000 km) y forma la magnetosfera, que actúa como un escudo contra el viento solar y la radiación cósmica",
                      "☀️ La magnetosfera terrestre puede abarcar hasta 4 millones de kilómetros en la dirección opuesta al Sol, debido a la presión del viento solar, creando una extensa cola magnética que influye en las auroras y en la protección de satélites."
                    ],
                    posicion:new THREE.Vector3(0, 5, 0),
                    tamano:55,
                  },
                  {
                    nombre: "luna",
                    nombreCorrecto: "Luna",
                    modelo: "./sistemaSolar/luna.glb",
                    curiosidades: [
                      "Algunos cráteres de la Luna tienen más de 4 mil millones de años, siendo testigos de los primeros impactos en el Sistema Solar.",
                      "La Luna evita que alrededor de 2,800 meteoros colisionen con la Tierra cada día, actuando como un escudo natural."
                    ],
                    posicion: new THREE.Vector3(0, 5, 0),
                    tamano: 15,
                  },
                  
                  {
                    nombre: "sistemasolar",
                    nombreCorrecto: "Planetario",
                    modelo: "./sistemaSolar/planetario.glb",
                    curiosidades: [
                      "La existencia de la vida en la Tierra es un evento extraordinario, ya que depende de una combinación única de condiciones cósmicas y geológicas que podrían ser extremadamente raras en el universo.",
                      "Los astrónomos estiman que solo el 0.1% de los exoplanetas descubiertos podrían tener condiciones similares a las de la Tierra, lo que hace que encontrar un mundo habitable sea un desafío enorme."
                    ],
                    posicion: new THREE.Vector3(0, 5, 0),
                    tamano: 4,
                  },
                  
                  {
                    nombre: "agujero-negro",
                    nombreCorrecto: "Agujero negro",
                    modelo: "./sistemaSolar/black_hole.glb",
                    curiosidades: [
                      "El agujero negro más cercano a la Tierra se encuentra en el sistema HR 6819, a unos 1,000 años luz de distancia.",
                      "Para que un agujero negro del tamaño de un asteroide absorba la Tierra, tendría que estar a menos de 0.1 años luz de distancia debido a su intenso campo gravitacional."
                    ],
                    posicion: new THREE.Vector3(0, 5, 0),
                    tamano: 8,
                  },

                  {
                    nombre: "saturno-moons",
                    nombreCorrecto: "Lunas de Saturno",
                    modelo: "./sistemaSolar/saturnoMoons.glb",
                    curiosidades: [
                        "Saturno tiene más de 140 lunas confirmadas, siendo Titán la más grande y la única del sistema solar con ríos y lagos de metano líquido.",
                        "Encélado, una de las lunas de Saturno, expulsa gigantescos géiseres de agua al espacio, lo que sugiere un océano subterráneo con potencial para albergar vida."
                    ],
                    posicion: new THREE.Vector3(0, 5, 0),
                    tamano: 5
                  },
                

                  {
                    nombre: "movimiento-lunar",
                    nombreCorrecto: "Movimiento lunar",
                    modelo: "./sistemaSolar/tierraHolograma.glb",
                    curiosidades: [
                        "La Luna no solo gira alrededor de la Tierra, sino que también realiza un movimiento de rotación sincronizado, siempre mostrando la misma cara a nuestro planeta.",
                        "Este movimiento sincronizado se debe a la fricción de las mareas, que ralentizan su rotación y la alinean con su órbita alrededor de la Tierra."
                    ],
                    posicion: new THREE.Vector3(0, 8, 0),
                    tamano: 5
                  },                

                  {
                    nombre: "sistemasolar",
                    nombreCorrecto: "Escala Planetaria",
                    modelo: "./sistemaSolar/escala-planetaria.glb",
                    curiosidades: [
                        "Si la Tierra tuviera el tamaño de una canica (1 cm de diámetro), el Sol mediría aproximadamente 1 metro y estaría a 100 metros de distancia. En esta escala, Plutón estaría a más de 4 kilómetros de distancia.",
                        "A la velocidad de una bala (1,200 km/h), tomaría más de 5 años llegar a la Luna y unos 17,000 años alcanzar Plutón."
                    ],
                    posicion: new THREE.Vector3(0, 5, 0),
                    tamano: 8,
                },
                {
                  nombre: "galaxy",
                  nombreCorrecto: "Galaxia de Andrómeda (M31)",
                  modelo: "./sistemaSolar/galaxy.glb",
                  curiosidades: [
                    "La Galaxia de Andrómeda es la más grande del Grupo Local y se está acercando a la Vía Láctea a una velocidad de 110 km/s. Se espera que colisionen en unos 4,500 millones de años.",
                    "A simple vista, Andrómeda aparece como una tenue mancha en el cielo nocturno, pero en realidad es una galaxia con más de un billón de estrellas, el doble que la Vía Láctea."
                  ],
                  posicion: new THREE.Vector3(0, 5, 0),
                  tamano: 60,
              }
                ];
        //Array de botones del header (fin)
          
          
          function generarBotonesPlanetas() {
            const contenedorBotones = document.querySelector(".container-header-buttons");
            contenedorBotones.innerHTML = ""; // Limpiar contenido antes de agregar los botones
          
            planetas.forEach((planeta) => {
              const boton = document.createElement("button");
              boton.innerHTML = `<img src="./sistemaSolar/src/${planeta.nombre.toLowerCase()}.png" alt="${planeta.nombre}"> ${planeta.nombreCorrecto}`;
              boton.addEventListener("click", () => mostrarInformacion(planeta));
              contenedorBotones.appendChild(boton);
            });
          }
          
        // Variable global para la luz hemisférica
        let luzHemisferica;
        
        let currentLoadId = 0; // Identificador para evitar cargas múltiples
        function mostrarInformacion(planeta) {
          const loadId = ++currentLoadId; // Nuevo identificador único para esta carga

            const containerText = document.getElementById("leftContainer");
            containerText.innerHTML = `
            <h2>Holograma</h2>
            <model-viewer id="hologramaViewer" class="max-viewer" 
                src="${planeta.modelo}"    
                auto-rotate  
                camera-target="0m 0m 0m"
                rotation-per-second="30deg"
                disable-zoom
                ar
                ar-modes="webxr scene-viewer quick-look">
            </model-viewer>
        
            <button class="botones-Interactivos" onclick="activarAR()">Ver en Realidad Aumentada</button>
        
            <h2>Datos Astronómicos</h2>
            <p>${planeta.curiosidades[0]}</p>
            <p>${planeta.curiosidades[1]}</p>
        
            <a class="botones-Interactivos" href="https://enycosmic.site/donaciones/">Donaciones</a>
            <a class="botones-Interactivos" href="https://www.facebook.com/groups/1174826680623768?locale=es_LA">Comunidad</a>
        `;

            // Limpiar los modelos GLB existentes
            clearGLBModels();

            // Agregar el objeto correspondiente al planeta en el array
            trexes.push({
                model: planeta.modelo,  
                position: planeta.posicion,
                rotation: mirarAlfrente,
                tamano: planeta.tamano,
                name: planeta.nombreCorrecto,
            });

            // Cargar el modelo GLB del T-Rex y agregarlo a la escena
            trexes.forEach(trexData => {
                loader.load(trexData.model, function (gltf) {
                if (loadId !== currentLoadId) return; // Si este no es el último clic, ignorar
                    const trex = gltf.scene;

                    trex.position.set(trexData.position.x, trexData.position.y, trexData.position.z);
                    trex.scale.set(trexData.tamano, trexData.tamano, trexData.tamano);
                    trex.rotation.set(trexData.rotation.x, trexData.rotation.y, trexData.rotation.z);
                    trex.userData.nombre = trexData.name;
                    scene.add(trex);
                    renderer.render(scene, camera);

                    if (gltf.animations && gltf.animations.length) {
                        const mixer = new THREE.AnimationMixer(trex);
                        mixers.push(mixer);

                        gltf.animations.forEach((clip) => {
                            const action = mixer.clipAction(clip);
                            action.play();
                            action.timeScale = 1.5; 
                        });
                    }
                }, undefined, function (error) {
                    console.error(error);
                });
            });

            // Asegurar que la luz solo se añada una vez
            iluminacionCondiciona()
        }

        function iluminacionCondiciona() {
          if (!luzHemisferica) {
            luzHemisferica = new THREE.HemisphereLight(0xf0f0f0, 0x777777, 2.8);
            scene.add(luzHemisferica);
        }
        }
          
          // Generar botones al cargar la página
          document.addEventListener("DOMContentLoaded", generarBotonesPlanetas);  
/*Script para render THREE.JS de planetas (fin) */        


/*Script para render astrofografias (inicio) */

const astrofotografias = [
  {
    nombre: "Tycho",
    imagen: "./sistemaSolar/astroFotografia/createrTycho.png",
    curiosidades: [
      "El cráter Tycho es uno de los más jóvenes y brillantes de la Luna, con un sistema de rayos que se extiende por miles de kilómetros.",
      "Se estima que tiene alrededor de 108 millones de años, lo que lo hace relativamente reciente en términos geológicos lunares."
    ]
  },
  {
    nombre: "Lunas Júpiter",
    imagen: "./sistemaSolar/astroFotografia/lunasJupiter.png",
    curiosidades: [
      "Júpiter tiene 79 lunas conocidas, y las cuatro más grandes, llamadas lunas galileanas, fueron descubiertas por Galileo Galilei en 1610.",
      "Ganímedes, una de sus lunas, es la más grande del sistema solar, incluso más grande que Mercurio."
    ]
  },
  {
    nombre: "Mercurio",
    imagen: "./sistemaSolar/astroFotografia/mercurio.png",
    curiosidades: [
      "Mercurio es el planeta más cercano al Sol, pero no el más caliente; ese título lo tiene Venus debido a su densa atmósfera.",
      "Un día en Mercurio (de amanecer a amanecer) dura 176 días terrestres, lo que significa que un solo día allí dura casi medio año."
    ]
  },
  {
    nombre: "Neptuno",
    imagen: "./sistemaSolar/astroFotografia/neptuno.png",
    curiosidades: [
      "Neptuno es el planeta más ventoso del sistema solar, con vientos que pueden alcanzar hasta 2,100 km/h.",
      "Fue el primer planeta descubierto mediante cálculos matemáticos antes de ser observado directamente en 1846."
    ]
  },
  {
    nombre: "OBNI",
    imagen: "./sistemaSolar/astroFotografia/obni.png",
    curiosidades: [
      "Los Objetos Brillantes No Identificados (OBNI) en el espacio pueden ser desde satélites hasta fenómenos naturales aún no explicados.",
      "Algunas observaciones de OBNI han sido atribuidas a reflejos de luz en los telescopios o efectos ópticos en la atmósfera terrestre."
    ]
  },
  {
    nombre: "Saturno",
    imagen: "./sistemaSolar/astroFotografia/saturno.png",
    curiosidades: [
      "Saturno es famoso por sus impresionantes anillos, compuestos principalmente de hielo y partículas rocosas.",
      "La luna Titán de Saturno es la única del sistema solar con una atmósfera densa y lagos de metano líquido en su superficie."
    ]
  },
  {
    nombre: "Conjunción galáctica Júpiter",
    imagen: "./sistemaSolar/astroFotografia/Jupiter-galaxia.jpg",
    curiosidades: [
        "Júpiter brilla imponente junto a una lejana galaxia, una vista que nos recuerda la inmensidad del cosmos y nuestra conexión con él.",
        "Capté a Júpiter alineado con una galaxia distante, un instante donde los mundos cercanos y los lejanos se encuentran en un mismo encuadre."
    ]
  },
  {
    nombre: "Marte",
    imagen: "./sistemaSolar/astroFotografia/Marte.jpg",
    curiosidades: [
        "En la inmensidad del cielo, Marte resplandece como un punto rojo brillante, recordándonos su papel como el planeta más explorado del sistema solar.",
        "Este destello rojo en la noche es Marte, el planeta que ha inspirado mitos, exploraciones y el sueño de que algún día podamos caminar sobre su superficie."
    ]
  }

];

const rightContainer = document.getElementById("rightContainer");

// Agregar el botón "Limpiar"
rightContainer.innerHTML = `<button id="clearScene" onclick="clearGLBModels()">Limpiar 3D</button>`;

// Generar dinámicamente las imágenes con eventos de clic
astrofotografias.forEach((astro, index) => {
  const button = document.createElement("button");
  button.innerHTML = `<img src="${astro.imagen}" alt="${astro.nombre}">${astro.nombre}`;
  button.dataset.index = index; // Guardamos el índice en dataset
  button.onclick = () => mostrarDetalle(astrofotografias[index]); // Pasamos el objeto correspondiente
  rightContainer.appendChild(button);
});

function mostrarDetalle(objeto) {
  // Si ya existe un contenedor, lo eliminamos antes de crear otro
  const existente = document.querySelector(".container-element");
  if (existente) {
    existente.remove();
  }

  // Crear un nuevo contenedor dinámicamente en el body
  const containerElement = document.createElement("div");
  containerElement.className = "container-element";
  containerElement.innerHTML = `
    <div class="container-element-header">
      <h2>Astrofotografía: <span>${objeto.nombre}</span></h2>
      <button onclick="cerrarDetalle()">X</button>
    </div>
    <div class="container-image">
      <img src="${objeto.imagen}" alt="${objeto.nombre}" id="zoomImage">
    </div>
    <div class="zoom-controls">
      <button onclick="zoomIn()">+</button>
      <button onclick="zoomOut()">-</button>
    </div>
  `;

  // Agregar curiosidades al contenedor de la izquierda
  const containerText = document.getElementById("leftContainer");
  containerText.innerHTML = `
    <h2>Holograma</h2>
    <model-viewer class="max-viewer" 
      src="./sistemaSolar/tierraHolograma.glb"    
      auto-rotate  
      camera-target="0m 0m 0m"
      rotation-per-second="30deg"
      disable-zoom>
    </model-viewer>
  
    <h2>Datos Astronómicos</h2>
    <p>${objeto.curiosidades[0]}</p>
    <p>${objeto.curiosidades[1]}</p>
    <a class="botones-Interactivos">Comunidad</a>
  `;
  // Insertar el contenedor en el body
  document.body.appendChild(containerElement);

  // Agregar funcionalidad de arrastre a la imagen
  addImageDragFunctionality();
  estadoVentanaEmergente = true; //estado de ventana emergente para habiltiar o desabilitar el canvas y evitar clics no deseado
}

// Función para hacer zoom
function zoomIn() {
  const img = document.getElementById("zoomImage");
  let scale = parseFloat(img.dataset.scale || 1);
  scale = Math.min(scale + 0.1, 20); // Límite de zoom máximo 20x
  img.dataset.scale = scale;
  img.style.transform = `scale(${scale})`;
}

// Función para alejar zoom
function zoomOut() {
  const img = document.getElementById("zoomImage");
  let scale = parseFloat(img.dataset.scale || 1);
  scale = Math.max(scale - 0.1, 1); // Límite de zoom mínimo 1x
  img.dataset.scale = scale;
  img.style.transform = `scale(${scale})`;

  // Resetear posición si el zoom vuelve a 1x
  if (scale === 1) {
    img.style.transform = `scale(1) translate(0px, 0px)`;
    img.dataset.translateX = 0;
    img.dataset.translateY = 0;
  }
}

// Función para permitir mover la imagen cuando está ampliada
function addImageDragFunctionality() {
  const img = document.getElementById("zoomImage");
  let isDragging = false;
  let startX, startY, lastX = 0, lastY = 0;

  img.addEventListener("mousedown", (e) => {
    if (parseFloat(img.dataset.scale) > 1) { // Solo mover si está ampliada
      isDragging = true;
      startX = e.clientX - lastX;
      startY = e.clientY - lastY;
      img.style.cursor = "grabbing";
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      lastX = e.clientX - startX;
      lastY = e.clientY - startY;
      img.style.transform = `scale(${img.dataset.scale}) translate(${lastX}px, ${lastY}px)`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    img.style.cursor = "grab";
  });

  img.style.cursor = "grab"; // Establecer cursor inicial
}



/*Script para render astrofografias (fin) */







  