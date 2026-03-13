Versión: 3.9.2 (Estable en proceso de desarrollo)

https://www.figma.com/design/4I6dlSCN6tx1BAvZ76SyXd/Metaverso?node-id=252-2&p=f&t=T6KSXkhtqqTFbXTt-0 ///Figma metaverso

https://www.deviantart.com/diegowt/art/Alola-Female-Swimmer-1-1071600113 // sprites gratuitos

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


 Sugerencia de desarrollo:
 --> maximo hasta 3 NPC por misiónes
 --> cantidad de misiones tipo 3 por mapa; 1 sola misión
 --> En las misiones tipo 3 Encerrar al 3er sujeto en un espacio de tal manera que el usuario pueda hablar una sola vez con el.
--> Las misiones tipo 3 es para desbloquear los algoritmos de conocimientos. si el mapa no requiere "algoritmo de conocimiento" entonces se puede utilizar para otro tipo de misión. (Minimapa / mapa complementario a mapa principal)

-->Relación de NPC por mapa: Total NPCs designado a misiones 36 por mapa de 5000x5000<--

NOTA: Se recomienda un máximo de 12 misiones por mapa:
-> 7 diarias (Formato combersacional)
-> 4 segundarias (Formato combersacional - validación de inventario)
-> 1 principal correspondiente al 3er formato de misiones  (Formato combersacional - llamamiento de funciones)



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
      "id": "m1",                                                                                         
      "tipo": "principal",                                                         
      "clasificacion": "inicio",                                                                          
      "descripcion": "Habla con tres NPC para recopilar información inicial sobre el sistema Enycosmic.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 0,       
        "misionesRequeridas": [], 
        "itemsRequeridos": []     
      },
"npcs": [
{
"id": "npc001",                   
"nombre": "Dr. Axiom",            
"rol": "inicio",                  
"imagen": "./assets/avatares/npc/Dr_Axiom.png",
"posicion": { "x": 320, "y": 540 },
"conversation_default": "combersación por defecto", 
"dialogos": {


"inicio": [
"Bienvenido, viajero.",
"Necesito que hables con otros dos aliados para comprender la situación."
],


"en_progreso": [
"Sigue buscando a los demás NPC."
],


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

 {
      "id": "m3",
      "nombre": "La ruta del código oculto",
      "tipo": "principal",
      "clasificacion": "diaria",
      "descripcion": "Recorre una breve cadena de contactos, supera una prueba y asegura un fragmento clave del sistema.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 10,
        "misionesRequeridas": [
          "m1",
          "m2"
        ],
        "itemsRequeridos": []
      },
"npcs": [
{
"id": "npc007",
"nombre": "Maese Ion",
"rol": "inicio",
"imagen": "./assets/avatares/npc/Maese_Ion.png",
"posicion": { "x": 2240, "y": 1490 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Tu siguiente misión exige precisión y memoria."
],
"en_progreso": [
"La cadena aún no ha sido completada."
],
"completado": [
"Has recorrido todo el circuito."
]
}
},
{
"id": "npc008",
"nombre": "Vera",
"rol": "contacto",
"imagen": "./assets/avatares/npc/Vera.png",
"posicion": { "x": 2390, "y": 1600 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Tengo parte del patrón que buscas."
],
"en_progreso": [
"Todavía debes cerrar la secuencia."
],
"completado": [
"Mi parte ya ha sido entregada."
]
}
},
{
"id": "npc009",
"nombre": "Solis",
"rol": "cierre",
"imagen": "./assets/avatares/npc/Solis.png",
"posicion": { "x": 2580, "y": 1720 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"La última parte depende de tu ingenio."
],
"en_progreso": [
"Debes demostrar tu nivel."
],
"completado": [
"La secuencia ha sido confirmada."
]
}
}
],
      "pasos": [
        {
          "step": 1,
          "id": "m3s1",
          "tipo": "hablar_npc",
          "npcId": "npc007",
          "titulo": "Habla con Maese Ion",
          "descripcion": "Recibe la misión principal.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc007",
            "imagen": "./assets/avatares/npc/Maese_Ion.png",
            "posicion": {
              "x": 2240,
              "y": 1490
            }
          },
          "otorgaItems": []
        },
        {
          "step": 2,
          "id": "m3s2",
          "tipo": "hablar_npc",
          "npcId": "npc008",
          "titulo": "Habla con Vera",
          "descripcion": "Obtén la primera pista del patrón oculto.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc008",
            "imagen": "./assets/avatares/npc/Vera.png",
            "posicion": {
              "x": 2390,
              "y": 1600
            }
          },
          "otorgaItems": []
        },
        {
          "step": 3,
          "id": "m3s3",
          "tipo": "completar_reto",
          "titulo": "Completa el reto de codificación",
          "descripcion": "Resuelve la secuencia lógica del panel.",
          "retoId": "reto_codificacion_01",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "objeto",
            "objetivoId": "reto_codificacion_01",
            "imagen": "./assets/items/diodoLazer.svg",
            "posicion": {
              "x": 2460,
              "y": 1660
            }
          },
          "otorgaItems": []
        },
        {
          "step": 4,
          "id": "m3s4",
          "tipo": "hablar_npc",
          "npcId": "npc009",
          "titulo": "Habla con Solis",
          "descripcion": "Entrega la información obtenida y desbloquea la fase final.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc009",
            "imagen": "./assets/avatares/npc/Solis.png",
            "posicion": {
              "x": 2580,
              "y": 1720
            }
          },
          "otorgaItems": []
        },
        {
          "step": 5,
          "id": "m3s5",
          "tipo": "hablar_npc",
          "npcId": "npc007",
          "titulo": "Regresa con Maese Ion",
          "descripcion": "Informa del avance acumulado y cierra la ruta.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc007",
            "imagen": "./assets/avatares/npc/Maese_Ion.png",
            "posicion": {
              "x": 2240,
              "y": 1490
            }
          },
          "otorgaItems": []
        }
      ],
      "recompensas": {
        "iq": 10,
        "cosmonedas": 0,
        "items": [
          {
            "id": "bateria",
            "cantidad": 1
          }
        ],
        "codigoSecreto": null
      }
    }



    //-----------------------------------------------------------
// SISTEMA DE MISIONES ENYCOSMIC
//-----------------------------------------------------------

/*
Este archivo define las plantillas de misiones utilizadas por el motor de misiones.

Cada misión es un objeto dentro del array "missions" y contiene:
- información general
- NPC involucrados
- pasos de misión
- recompensas

El motor del juego lee este JSON y controla automáticamente:
• diálogos
• progreso de misión
• validaciones
• inventario
• retos
*/

//-----------------------------------------------------------
// ACTUALMENTE TENEMOS 3 FORMATOS DE MISIONES
//-----------------------------------------------------------



/*-----------------------------------------------------------
FORMATO 1: MISIONES CONVERSACIONALES
-----------------------------------------------------------*/

/*
Tipo de misión más simple.

Se usa para:
• introducir historia
• guiar al jugador
• dar objetos
• desbloquear contenido

El progreso se basa únicamente en hablar con NPCs.

No requiere inventario ni retos.
*/

{
  "nombre": "Ecos del primer contacto",

  "id": "m1",  
  // ID único de misión.
  // Formato recomendado: m + número.
  // Ejemplo: m1, m2, m3.
  // El conteo se reinicia en cada mapa.

  "tipo": "principal",
  // Clasificación narrativa de misión.
  // No afecta al algoritmo.

  "clasificacion": "inicio",
  // Etiqueta de clasificación interna.
  // Actualmente no usada por el motor.

  "descripcion": "Habla con tres NPC para recopilar información inicial sobre el sistema Enycosmic.",

  "estadoFinalizacion": {
    "tipo": "automatica",
    // La misión se completa automáticamente al terminar los pasos.

    "condicion": "todos_los_pasos",
    // Condición de finalización: completar todos los pasos.

    "requiereNPCFinal": false
    // Si fuese true requeriría hablar con un NPC final.
  },

  "condiciones": {

    "nivelIQMinimo": 0,
    // Nivel mínimo de IQ requerido para activar la misión.

    "misionesRequeridas": [],
    // Misiones que deben haberse completado previamente.

    "itemsRequeridos": []
    // Items que el jugador debe tener para iniciar la misión.
  },



/*-----------------------------------------------------------
NPCs PARTICIPANTES DE LA MISIÓN
-----------------------------------------------------------*/

"npcs": [

{
"id": "npc001",

// ID único del NPC.
// Formato recomendado:
// npc + número de 3 dígitos.
// Ejemplo:
// npc001
// npc002

"nombre": "Dr. Axiom",
// Nombre visible del NPC.

"rol": "inicio",
// Define la función narrativa del NPC.
// inicio → NPC que inicia la misión.

"imagen": "./assets/avatares/npc/Dr_Axiom.png",
// Ruta del avatar utilizado en el canvas.

"posicion": { "x": 320, "y": 540 },
// Coordenadas del NPC dentro del mapa.

"conversation_default": "conversación por defecto",
// Texto mostrado si el NPC no participa en ninguna misión activa.

"dialogos": {

"inicio": [
// Diálogo que aparece cuando el jugador llega por primera vez.

"Bienvenido, viajero.",
"Necesito que hables con otros dos aliados para comprender la situación."
],

"en_progreso": [
// Diálogo mostrado si la misión está activa pero este NPC no es el paso actual.

"Sigue buscando a los demás NPC."
],

"completado": [
// Diálogo mostrado si la misión ya fue finalizada.

"Bien hecho. Ya tienes la información básica."
]

}

},



/*-----------------------------------------------------------
PASOS DE LA MISIÓN
-----------------------------------------------------------*/

"pasos": [

{
"step": 1,

"id": "m1s1",
// ID único del paso.
// Formato recomendado:
// idMision + s + numeroPaso
// Ejemplo:
// m1s1
// m1s2

"tipo": "hablar_npc",
// Tipo de paso.
// hablar_npc → el jugador debe hablar con un NPC.

"npcId": "npc001",
// NPC que activa este paso.

"titulo": "Habla con Dr. Axiom",
// Texto mostrado en el cuaderno de misiones.

"descripcion": "Recibe las primeras instrucciones.",

"estadoInicial": false,
// El paso inicia como no completado.

"verificador": {
// Define el marcador visual de misión en el mapa.

"tipoObjetivo": "npc",
// npc u objeto.

"objetivoId": "npc001",
// ID del objetivo.

"imagen": "./assets/avatares/npc/Dr_Axiom.png",
// Imagen usada como indicador visual.

"posicion": {
"x": 320,
"y": 540
}

},

"otorgaItems": [
// Lista de items entregados al jugador al completar este paso.

{
"id": "limon",
"cantidad": 1
},
{
"id": "sal",
"cantidad": 1
}

]

}

],



/*-----------------------------------------------------------
RECOMPENSAS DE MISIÓN
-----------------------------------------------------------*/

"recompensas": {

"iq": 6,
// Experiencia otorgada al completar la misión.

"cosmonedas": 0,
// Moneda del juego.

"items": [],
// Items otorgados al finalizar la misión.

"codigoSecreto": null
// Reservado para futuros sistemas de puzzles o recompensas especiales.

}

},



/*-----------------------------------------------------------
FORMATO 2: MISIONES CON VALIDACIÓN DE INVENTARIO
-----------------------------------------------------------*/

/*
Este formato introduce mecánicas de:

• recolección de items
• verificación de inventario
• entrega de objetos a NPC

El motor valida automáticamente que el jugador tenga
los items requeridos antes de avanzar.
*/



/*-----------------------------------------------------------
FORMATO 3: MISIONES CON RETOS / FUNCIONES
-----------------------------------------------------------*/

/*
Este formato permite ejecutar lógica personalizada.

Se usa para:

• puzzles
• minijuegos
• retos
• interacción con objetos especiales

El paso usa:

tipo: completar_reto

y se conecta con una función JavaScript del juego.
Ejemplo:

reto_codificacion_01()

El sistema abrirá el reto y solo permitirá continuar
cuando el jugador lo complete.
*/

/*Anatomía del misiones.json (fin)*/

//--FORMATO DE 3 MISIONES
{
  "missions": [
    {
      "id": "m1",
      "nombre": "Ecos del primer contacto",
      "tipo": "principal",
      "clasificacion": "diaria",
      "descripcion": "Habla con tres NPC para recopilar información inicial sobre el sistema Enycosmic.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 0,
        "misionesRequeridas": [],
        "itemsRequeridos": []
      },
"npcs": [
{
"id": "npc001",
"nombre": "Dr. Axiom",
"rol": "inicio",
"imagen": "./assets/avatares/npc/Dr_Axiom.png",
"posicion": { "x": 320, "y": 540 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Bienvenido, viajero.",
"Necesito que hables con otros dos aliados para comprender la situación."
],
"en_progreso": [
"Sigue buscando a los demás NPC."
],
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
  "id": "m3s3",
  "tipo": "completar_reto",
  "titulo": "Completa el reto de codificación",
  "descripcion": "Resuelve la secuencia lógica del panel.",
  "retoId": "reto_codificacion_01",
  "llamar_funcion_reto": "reto_codificacion_01()",
  "estadoInicial": false,
  "verificador": {
    "tipoObjetivo": "objeto",
    "objetivoId": "reto_codificacion_01",
    "imagen": "./assets/items/diodoLazer.svg",
    "posicion": {
      "x": 2460,
      "y": 1660
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












    {
      "id": "m3",
      "nombre": "La ruta del código oculto",
      "tipo": "principal",
      "clasificacion": "diaria",
      "descripcion": "Recorre una breve cadena de contactos, supera una prueba y asegura un fragmento clave del sistema.",
      "estadoFinalizacion": {
        "tipo": "automatica",
        "condicion": "todos_los_pasos",
        "requiereNPCFinal": false
      },
      "condiciones": {
        "nivelIQMinimo": 10,
        "misionesRequeridas": [
          "m1",
          "m2"
        ],
        "itemsRequeridos": []
      },
"npcs": [
{
"id": "npc007",
"nombre": "Maese Ion",
"rol": "inicio",
"imagen": "./assets/avatares/npc/Maese_Ion.png",
"posicion": { "x": 2240, "y": 1490 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Tu siguiente misión exige precisión y memoria."
],
"en_progreso": [
"La cadena aún no ha sido completada."
],
"completado": [
"Has recorrido todo el circuito."
]
}
},
{
"id": "npc008",
"nombre": "Vera",
"rol": "contacto",
"imagen": "./assets/avatares/npc/Vera.png",
"posicion": { "x": 2390, "y": 1600 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"Tengo parte del patrón que buscas."
],
"en_progreso": [
"Todavía debes cerrar la secuencia."
],
"completado": [
"Mi parte ya ha sido entregada."
]
}
},
{
"id": "npc009",
"nombre": "Solis",
"rol": "cierre",
"imagen": "./assets/avatares/npc/Solis.png",
"posicion": { "x": 2580, "y": 1720 },
"conversation_default": "combersación por defecto",
"dialogos": {
"inicio": [
"La última parte depende de tu ingenio."
],
"en_progreso": [
"Debes demostrar tu nivel."
],
"completado": [
"La secuencia ha sido confirmada."
]
}
}
],
      "pasos": [
        {
          "step": 1,
          "id": "m3s1",
          "tipo": "hablar_npc",
          "npcId": "npc007",
          "titulo": "Habla con Maese Ion",
          "descripcion": "Recibe la misión principal.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc007",
            "imagen": "./assets/avatares/npc/Maese_Ion.png",
            "posicion": {
              "x": 2240,
              "y": 1490
            }
          },
          "otorgaItems": []
        },
        {
          "step": 2,
          "id": "m3s2",
          "tipo": "hablar_npc",
          "npcId": "npc008",
          "titulo": "Habla con Vera",
          "descripcion": "Obtén la primera pista del patrón oculto.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc008",
            "imagen": "./assets/avatares/npc/Vera.png",
            "posicion": {
              "x": 2390,
              "y": 1600
            }
          },
          "otorgaItems": []
        },
        {
          "step": 3,
          "id": "m3s3",
          "tipo": "completar_reto",
          "titulo": "Completa el reto de codificación",
          "descripcion": "Resuelve la secuencia lógica del panel.",
          "retoId": "reto_codificacion_01",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "objeto",
            "objetivoId": "reto_codificacion_01",
            "imagen": "./assets/items/diodoLazer.svg",
            "posicion": {
              "x": 2460,
              "y": 1660
            }
          },
          "otorgaItems": []
        },
        {
          "step": 4,
          "id": "m3s4",
          "tipo": "hablar_npc",
          "npcId": "npc009",
          "titulo": "Habla con Solis",
          "descripcion": "Entrega la información obtenida y desbloquea la fase final.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc009",
            "imagen": "./assets/avatares/npc/Solis.png",
            "posicion": {
              "x": 2580,
              "y": 1720
            }
          },
          "otorgaItems": []
        },
        {
          "step": 5,
          "id": "m3s5",
          "tipo": "hablar_npc",
          "npcId": "npc007",
          "titulo": "Regresa con Maese Ion",
          "descripcion": "Informa del avance acumulado y cierra la ruta.",
          "estadoInicial": false,
          "verificador": {
            "tipoObjetivo": "npc",
            "objetivoId": "npc007",
            "imagen": "./assets/avatares/npc/Maese_Ion.png",
            "posicion": {
              "x": 2240,
              "y": 1490
            }
          },
          "otorgaItems": []
        }
      ],
      "recompensas": {
        "iq": 10,
        "cosmonedas": 0,
        "items": [
          {
            "id": "bateria",
            "cantidad": 1
          }
        ],
        "codigoSecreto": null
      }
    }
    
  ]
}
