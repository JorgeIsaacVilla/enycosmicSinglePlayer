Versión: 3.9.2 (Estable en proceso de desarrollo)

https://www.figma.com/design/4I6dlSCN6tx1BAvZ76SyXd/Metaverso?node-id=252-2&p=f&t=T6KSXkhtqqTFbXTt-0 ///Figma metaverso

https://www.bing.com/images/create/crear-ilustraciones-de-mc3a1quinas-de-construccic3b3n-en/1-66d35f4943474bfa954056344239a8ed?FORM=GENCRE  ////IA de ilustraciónes.
https://www.imagine.art/dashboard/tool/ideate?projectId=146271 ////IA entrenada para hacer más sprintsheet
https://drive.google.com/drive/folders/1oeNEJ1psxWIXsM-ns1N5-s3y_MICd9kk?usp=sharing   ////Pagina de carga
https://www.figma.com/design/4I6dlSCN6tx1BAvZ76SyXd/Metaverso?node-id=0-1&t=PjwPDRpSZY2whhEt-1 //// mapa actualizado

//efectos css:
juegos artificiales: https://codepen.io/matt-cannon/pen/YPKGBGm
Crecimiento de un bebe: https://codepen.io/leimapapa/pen/YzoEaEd
abla periodica: https://codepen.io/stoumann/pen/gONqOXZ
https://codepen.io/venky2842/details/rNxjoxr Rompecabeza
https://codepen.io/GeorgePark/pen/MqVoYP paper mario
https://codepen.io/Julia-Farcash/pen/oNRBwEN  //juego enycosmic


/*Definición de mapas y perspectivas de mapas*/
- perspectiva cenital inclinada (top-down) ligeramente inclinada
- Estilo Pixel Art Arcade

ejemplo: mapa de planetario virtual perspectiva cenital inclinada (top-down) ligeramente inclinada Estilo Pixel Art Arcade con telescopios, hologramas de planetas y naves espaciales, computadoras y tecnologia para usar en juego de arcade 2d mapa cuadrado sin recortes, vista isométrica 180 grados vista elevada

/*Anatomía del items.json (Inicio)*/
    {
      "id": "escudo_de_madera",                     //--> es el ide del ITEM. cada nombre debe ser unico formato "nombre todo en minuscula separado por _"
      "nombre_item": "Escudo De Madera",            //--> Nombre del ITEM visual en el cambas.
      "tipo_item": "arma",                          //--> Tipo de item
      "imagen": "./assets/items/escudoMadera.svg",  //--> imagen del ITEM. si no hay imagen, sale un cuadro rojo
      "agotable": true,                             //--> Validado en codigo para que tenga vida util por uso            
      "cantidad_de_usos": 25,                       //--> numero de veces que se puede usar el arma antes de romperse
      "cuanto_quita_de_vida_al_enemigo": 0,         //--> en caso de arma agregar puntos de vida que se quita al enemigo, si es defensivo o es item poner 0
      "desaparece_al_agotarse": true,               //--> validado para que el item desaparesca al momento de que llege a 0 su contador de vida utl
      "creable": true,                              //--> validado en codigo para que permita ser creado.
      "materiales_requeridos_para_crear": [
        { "item_id": "madera", "cantidad": 5 }      //--> validado en codigo para determinar los ITEMS necesarios para crearlos
      ],
      "combinable": false                           //--> validado en codigo para que permita hacer combinaciones para crear más productos (true/false)
    },


    //TIPOS DE ITEM
    arma                 //--> validado en codigo para poder equipar
    arma_especial        //--> validado en codigo para poder equipar // Falta programar validación cada tiempo
    equipo               //--> validado en codigo para poder equipar
    equipo_especial      //--> validado en codigo para poder equipar // Falta programar validación cada tiempo
    item
    item_especial        //--> se debe validar para que salga cada cierto tiempo

/*Anatomía del items.json (fin)*/

//----------------------------------------------------------------------------------------------------------------------
//Clasificación de misiones
//----------------------------------------------------------------------------------------------------------------------
NOTA: Las clasificaciones aún no han sido desarrolladas ni utilizadas en el algoritmo

 - principal //--> PRogramar que solo se puedan cumplir 1 sola vez.
 - Secundria //--> programar que se puedan reiniciar cada 3 día
 - diaria //--> programar que se puedan reiniciar cada 1 día
 - especiales //--> Programar que se puedan reiniciar cada 7 días

//-----------------------------------------------------------
ACTUALMENTE TENEMOS 3 FORMATOS DE MISIONES:
//-----------------------------------------------------------

/*Anatomía del misiones.json (Inicio)*/
//-----------------------------------------
fORMATO 1: CONVERSACIONAL
//-----------------------------------------
Programado solo para hacer charlas con NPCs para otorgar información a los usuarios:

    {
      "nombre": "Ecos del primer contacto",
      "id": "m1",                                                                                         //--> ID UNICO PARA MISIONES formato = m + (# de mision del mapa) en todos los mapas se debe reiniciar el conteo
      "tipo": "principal",                                                         
      "clasificacion": "inicio",                                                                          //--> clasificación de mision no utilizado en algoritmo
      "descripcion": "Habla con tres NPC para recopilar información inicial sobre el sistema Enycosmic.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 0,       //-->  No obligatorio para el algoritmo
        "misionesRequeridas": [], //-->  No obligatorio para el algoritmo
        "itemsRequeridos": []     //-->  Requerido para validación de misión en formato 2
      },
"npcs": [
{
"id": "npc001",                   //-->  Cada NPC tiene su propio ID aunque estén en diferentes misiones formato npc + numero de 3 digitos
"nombre": "Dr. Axiom",            //--> Nombre del NPC visual en canvas
"rol": "inicio",                  //--> poner inicio para dar avertura a la mision al ser seleccionada por primera vez
"imagen": "./assets/avatares/npc/Dr_Axiom.png",
"posicion": { "x": 320, "y": 540 },
"conversation_default": "combersación por defecto", //--> Línea de conversación por defecto
"dialogos": {

//--> Se pueden poner tantas líneas como se requiera
"inicio": [
"Bienvenido, viajero.",
"Necesito que hables con otros dos aliados para comprender la situación."
],

//--> Admisibl 1 sola línea
"en_progreso": [
"Sigue buscando a los demás NPC."
],

//--> Se pueden poner tantas líneas como se requiera
"completado": [
"Bien hecho. Ya tienes la información básica."


]
}
},
{
"id": "npc002",
"nombre": "Lira",
"rol": "informante",
"imagen": "./assets/avatares/npc/Lira.png",
"posicion": { "x": 780, "y": 910 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"He detectado energía inusual en esta zona.",
"Debes continuar tu investigación."
],
"en_progreso": [
"Todavía necesitas completar la ronda de contactos."
],
"completado": [
"Ya conoces lo esencial."
]
}
},
{
"id": "npc003",
"nombre": "Orbek",
"rol": "cierre_informativo",
"imagen": "./assets/avatares/npc/Orbek.png",
"posicion": { "x": 1180, "y": 1260 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Tu llegada no fue casualidad.",
"Hay algo importante aguardando en el sistema."
],
"en_progreso": [
"Completa tu conversación con todos."
],
"completado": [
"La red de contacto ha sido activada."
]
}
}
],
      "pasos": [
        {
          "step": 1,
          "id": "m1s1",
          "tipo": "hablar_npc",
          "npcId": "npc001",
          "titulo": "Habla con Dr. Axiom",
          "descripcion": "Recibe las primeras instrucciones.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc001",
            "imagen": "./assets/avatares/npc/Dr_Axiom.png",
            "posicion": {
              "x": 320,
              "y": 540
            }
          },
          "otorgaItems": [
            {
              "id": "limon",
              "cantidad": 1
            },
            {
              "id": "sal",
              "cantidad": 1
            }
          ]
        },
        {
          "step": 2,
          "id": "m1s2",
          "tipo": "hablar_npc",
          "npcId": "npc002",
          "titulo": "Habla con Lira",
          "descripcion": "Consulta el origen de la anomalía.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc002",
            "imagen": "./assets/avatares/npc/Lira.png",
            "posicion": {
              "x": 780,
              "y": 910
            }
          },
          "otorgaItems": [
            {
              "id": "baso_de_agua",
              "cantidad": 1
            }
          ]
        },
        {
          "step": 3,
          "id": "m1s3",
          "tipo": "hablar_npc",
          "npcId": "npc003",
          "titulo": "Habla con Orbek",
          "descripcion": "Completa la red de información.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc003",
            "imagen": "./assets/avatares/npc/Orbek.png",
            "posicion": {
              "x": 1180,
              "y": 1260
            }
          },
          "otorgaItems": []
        }
      ],
      "recompensas": {
        "iq": 6,
        "cosmonedas": 0,
        "items": [],
        "codigoSecreto": null
      }
    },



//-----------------------------------------
fORMATO 2: CONVERSACIONAL - VALIDACIÓN DE INVENTARIO
//-----------------------------------------
Esta plantilla está habilitada con la funció de validación de inventario para verificar reto:
{
      "id": "m2",
      "nombre": "Intercambio de energía",
      "tipo": "secundaria",
      "clasificacion": "diaria",
      "descripcion": "Completa un reto, recolecta materiales y entrégalos para reactivar un circuito auxiliar.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 5,
        "misionesRequeridas": [
          "m1"
        ],
        "itemsRequeridos": []
      },
"npcs": [
{
"id": "npc004",
"nombre": "Kael",
"rol": "inicio",
"imagen": "./assets/avatares/npc/Kael.png",
"posicion": { "x": 1450, "y": 920 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Necesito estabilizar un circuito antiguo.",
"Primero demuestra tu capacidad con un reto."
],
"en_progreso": [
"Aún no has reunido todo lo necesario."
],
"completado": [
"Buen trabajo. El intercambio fue exitoso."
]
}
},
{
"id": "npc005",
"nombre": "Sena",
"rol": "intercambio",
"imagen": "./assets/avatares/npc/Sena.png",
"posicion": { "x": 1700, "y": 1180 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Si traes los materiales, podré ayudarte."
],
"en_progreso": [
"Todavía no tienes los recursos completos."
],
"completado": [
"Aquí tienes el objeto especial prometido."
]
}
},
{
"id": "npc006",
"nombre": "Tarek",
"rol": "cierre",
"imagen": "./assets/avatares/npc/Tarek.png",
"posicion": { "x": 1980, "y": 1360 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Supervisa cada fase del circuito antes de volver."
],
"en_progreso": [
"El protocolo aún no concluye."
],
"completado": [
"La energía secundaria volvió a fluir."
]
}
}
],
"pasos": [
{
"step": 1,
"id": "m2s1",
"tipo": "hablar_npc",
"npcId": "npc004",
"titulo": "Habla con Kael",
"descripcion": "Kael necesita materiales para estabilizar un circuito.",
"estadoInicial": false
},
{
"step": 2,
"id": "m2s2",
"tipo": "recolectar_items",
"titulo": "Recolecta los materiales",
"descripcion": "Reúne 1 cables y 1 batería.",
"objetivosItems": [
{ "id": "cable", "cantidad": 1 },
{ "id": "bateria", "cantidad": 1 }
],
"estadoInicial": false
},
{
"step": 3,
"id": "m2s3",
"tipo": "hablar_npc_entrega",
"npcId": "npc005",
"titulo": "Entrega los materiales a Sena",
"descripcion": "Sena ensamblará el circuito.",
"entregaItems": [
{ "id": "cable", "cantidad": 1 },
{ "id": "bateria", "cantidad": 1 }
],
"estadoInicial": false
},
{
"step": 4,
"id": "m2s4",
"tipo": "hablar_npc",
"npcId": "npc004",
"titulo": "Regresa con Kael",
"descripcion": "Informa que el circuito ya fue estabilizado.",
"estadoInicial": false
}
],
      "recompensas": {
        "iq": 12,
        "cosmonedas": 15,
        "items": [
          {
            "id": "corazon",
            "cantidad": 1
          },
          {
            "id": "cable",
            "cantidad": 2
          }
        ],
        "codigoSecreto": null
      }
    },



//-----------------------------------------
fORMATO 3: CONVERSACIONAL - LLAMAMIENTO DE FUNCIONES
//-----------------------------------------







/*Anatomía del misiones.json (fin)*/