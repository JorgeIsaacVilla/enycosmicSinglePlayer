//tomar como base para mascota.js y ataque cuerpo a cuerpo
//tomar como base para tener varios aliados - evaluar si se puede en ese mapa hacer que los enemigos ataquen a los aliados

(function () {
  const MODULE_ID = "aliado_reptiliano_test";
  const SPRITE_SRC = "./assets/avatares/armaduras/armadura1.svg";

  const FRAME_W = 64;
  const FRAME_H = 64;
  const TOTAL_FRAMES = 4;
  const FRAME_DURATION_MS = 150;

  const FOLLOW_DISTANCE = 100;
  const TELEPORT_DISTANCE = 500;
  const MOVE_SPEED = 1.8;
  const SNAP_DISTANCE = 2;

const ATTACK_DAMAGE = 8;
const ATTACK_RANGE = 180;
const CHASE_RANGE = 420;
const ATTACK_COOLDOWN_MS = 650;

const SHOT_SPEED = 5.5;
const SHOT_SIZE = 10;
const SHOT_LIFE_MS = 1400;
const SHOT_KNOCKBACK = 32;

const AVOIDANCE_STEP = 26;
const AVOIDANCE_DIAGONAL_STEP = 18;
const AVOIDANCE_MEMORY_MS = 450;

function getInitialState() {
  return {
    img: null,
    ready: false,
    frame: 0,
    frameTimer: 0,
    facing: "down",
    posX: null,
    posY: null,
    targetX: null,
    targetY: null,
    attackCooldown: 0,
    shots: [],

    avoidanceSide: 1,
    avoidanceLockMs: 0
  };
}

  function getState() {
    return window.enyGlobalModules.state[MODULE_ID];
  }

  function rowForFacing(facing) {
    switch (facing) {
      case "down": return 0;
      case "left": return 1;
      case "right": return 2;
      case "up": return 3;
      default: return 0;
    }
  }

  function getFollowOffset(playerFacing) {
    switch (playerFacing) {
      case "left":
        return { x: 100, y: 0 };
      case "right":
        return { x: -100, y: 0 };
      case "up":
        return { x: 60, y: 70 };
      case "down":
      default:
        return { x: 60, y: -10 };
    }
  }

function getEnemyCenter(enemy) {
  const w = Number(enemy.w || 64);
  const h = Number(enemy.h || 64);

  return {
    x: enemy.x + (w / 2),
    y: enemy.y + (h / 2),
    radius: Math.max(w, h) * 0.45
  };
}
  function getAllyCenter(state) {
    return {
      x: state.posX + 32,
      y: state.posY + 32
    };
  }

function getNearestEnemy(state, enemiesList = []) {
  const enemies = Array.isArray(enemiesList) && enemiesList.length
    ? enemiesList
    : (window.enemigos || []);

  if (!Array.isArray(enemies) || state.posX === null || state.posY === null) {
    return null;
  }

  const ally = getAllyCenter(state);

  let nearest = null;
  let nearestDist = Infinity;

  for (const enemy of enemies) {
    if (!enemy) continue;
    if ((enemy.puntos_de_vida ?? 0) <= 0) continue;

    const center = getEnemyCenter(enemy);
    const dist = Math.hypot(center.x - ally.x, center.y - ally.y);

    if (dist < nearestDist) {
      nearest = enemy;
      nearestDist = dist;
    }
  }

  if (!nearest) return null;

  return {
    enemy: nearest,
    dist: nearestDist
  };
}

  function updateFacingFromVector(state, dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 0.5) {
        state.facing = dx > 0 ? "right" : "left";
      }
    } else {
      if (Math.abs(dy) > 0.5) {
        state.facing = dy > 0 ? "down" : "up";
      }
    }
  }

function moveTowards(state, targetX, targetY, dt) {
  const dx = targetX - state.posX;
  const dy = targetY - state.posY;
  const dist = Math.hypot(dx, dy);

  if (dist <= SNAP_DISTANCE) {
    state.posX = targetX;
    state.posY = targetY;
    return false;
  }

  if (state.avoidanceLockMs > 0) {
    state.avoidanceLockMs = Math.max(0, state.avoidanceLockMs - dt);
  }

  const step = MOVE_SPEED * dt * 0.08;
  const ratio = Math.min(1, step / dist);

  const prevX = state.posX;
  const prevY = state.posY;

  const nextX = state.posX + dx * ratio;
  const nextY = state.posY + dy * ratio;

  moveWithCollision(state, nextX, nextY);

  const movedDirect =
    Math.abs(state.posX - prevX) > 0.01 ||
    Math.abs(state.posY - prevY) > 0.01;

  if (movedDirect) {
    updateFacingFromVector(state, dx, dy);
    return true;
  }

  return tryAvoidObstacle(state, dx, dy, dt);
}

  function animar(state, dt, moving) {
    if (moving) {
      state.frameTimer += dt;

      if (state.frameTimer >= FRAME_DURATION_MS) {
        state.frameTimer = 0;
        state.frame = (state.frame + 1) % TOTAL_FRAMES;
      }
    } else {
      state.frame = 0;
      state.frameTimer = 0;
    }
  }

function moveWithCollision(state, nextX, nextY) {
  const bridge = window.enyGameBridge;
  const entidad = {
    x: state.posX,
    y: state.posY
  };

  if (bridge?.moveEntityWithCollision) {
    bridge.moveEntityWithCollision(entidad, nextX, nextY, 36, 36);
    state.posX = entidad.x;
    state.posY = entidad.y;
    return state.posX !== nextX || state.posY !== nextY;
  }

  state.posX = nextX;
  state.posY = nextY;
  return false;
}

function tryMoveCandidate(state, nextX, nextY) {
  const prevX = state.posX;
  const prevY = state.posY;

  moveWithCollision(state, nextX, nextY);

  const moved =
    Math.abs(state.posX - prevX) > 0.01 ||
    Math.abs(state.posY - prevY) > 0.01;

  return moved;
}

function tryAvoidObstacle(state, dx, dy, dt) {
  const dist = Math.hypot(dx, dy) || 1;
  const nx = dx / dist;
  const ny = dy / dist;

  const perpA = { x: -ny, y: nx };
  const perpB = { x: ny, y: -nx };

  const first = state.avoidanceSide >= 0 ? perpA : perpB;
  const second = state.avoidanceSide >= 0 ? perpB : perpA;

  const candidates = [
    {
      x: state.posX + first.x * AVOIDANCE_STEP,
      y: state.posY + first.y * AVOIDANCE_STEP
    },
    {
      x: state.posX + second.x * AVOIDANCE_STEP,
      y: state.posY + second.y * AVOIDANCE_STEP
    },
    {
      x: state.posX + (nx * AVOIDANCE_DIAGONAL_STEP) + (first.x * AVOIDANCE_DIAGONAL_STEP),
      y: state.posY + (ny * AVOIDANCE_DIAGONAL_STEP) + (first.y * AVOIDANCE_DIAGONAL_STEP)
    },
    {
      x: state.posX + (nx * AVOIDANCE_DIAGONAL_STEP) + (second.x * AVOIDANCE_DIAGONAL_STEP),
      y: state.posY + (ny * AVOIDANCE_DIAGONAL_STEP) + (second.y * AVOIDANCE_DIAGONAL_STEP)
    }
  ];

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const prevX = state.posX;
    const prevY = state.posY;

    const moved = tryMoveCandidate(state, c.x, c.y);

    if (moved) {
      const mx = state.posX - prevX;
      const my = state.posY - prevY;
      updateFacingFromVector(state, mx, my);
      state.avoidanceSide = (i === 0 || i === 2) ? 1 : -1;
      state.avoidanceLockMs = AVOIDANCE_MEMORY_MS;
      return true;
    }
  }

  state.avoidanceSide *= -1;
  state.avoidanceLockMs = AVOIDANCE_MEMORY_MS * 0.5;
  return false;
}

function shootAtEnemy(state, enemy) {
  if (!enemy) return false;
  if (state.attackCooldown > 0) return false;

  const allyCenter = getAllyCenter(state);
  const enemyCenter = getEnemyCenter(enemy);

  const dx = enemyCenter.x - allyCenter.x;
  const dy = enemyCenter.y - allyCenter.y;
  const len = Math.hypot(dx, dy) || 1;

  state.shots.push({
    x: allyCenter.x,
    y: allyCenter.y,
    vx: (dx / len) * SHOT_SPEED,
    vy: (dy / len) * SHOT_SPEED,
    life: SHOT_LIFE_MS,
    damage: ATTACK_DAMAGE
  });

  state.attackCooldown = ATTACK_COOLDOWN_MS;
  return true;
}

function updateShots(state, dt, enemiesList = []) {
  const bridge = window.enyGameBridge;
  const enemies = Array.isArray(enemiesList) && enemiesList.length
    ? enemiesList
    : (window.enemigos || []);

  for (let i = state.shots.length - 1; i >= 0; i--) {
    const shot = state.shots[i];

    shot.life -= dt;
    if (shot.life <= 0) {
      state.shots.splice(i, 1);
      continue;
    }

    const totalDx = shot.vx;
    const totalDy = shot.vy;

    // subdividir el avance para que no atraviese bloques finos
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(totalDx), Math.abs(totalDy)) / 4));
    const stepDx = totalDx / steps;
    const stepDy = totalDy / steps;

    let removeShot = false;

    for (let s = 0; s < steps; s++) {
      const nextX = shot.x + stepDx;
      const nextY = shot.y + stepDy;

      // 1) Bloques de arcilla
      const golpeoArcilla = bridge?.damageClayBlock?.(
        nextX - SHOT_SIZE / 2,
        nextY - SHOT_SIZE / 2,
        SHOT_SIZE,
        SHOT_SIZE,
        shot.damage,
        nextX,
        nextY
      );

      if (golpeoArcilla) {
        removeShot = true;
        break;
      }

      // 2) Bloques colisionadores del ambiente
      const golpeoAmbiente = bridge?.projectileHitsEnvironment?.(
        nextX - SHOT_SIZE / 2,
        nextY - SHOT_SIZE / 2,
        SHOT_SIZE,
        SHOT_SIZE
      );

      if (golpeoAmbiente) {
        removeShot = true;
        break;
      }

      // mover el disparo solo si no chocó
      shot.x = nextX;
      shot.y = nextY;

      let hitEnemy = null;

      for (const enemy of enemies) {
        if (!enemy) continue;
        if ((enemy.puntos_de_vida ?? 0) <= 0) continue;

        const ex = enemy.x;
        const ey = enemy.y;
        const ew = enemy.w || 64;
        const eh = enemy.h || 64;

        const hit =
          shot.x >= ex &&
          shot.x <= ex + ew &&
          shot.y >= ey &&
          shot.y <= ey + eh;

        if (hit) {
          hitEnemy = enemy;
          break;
        }
      }

      if (hitEnemy) {
        hitEnemy.puntos_de_vida = Math.max(
          0,
          Number(hitEnemy.puntos_de_vida || 0) - shot.damage
        );

        if (typeof window.crearTextoDanio === "function") {
          window.crearTextoDanio(
            hitEnemy.x + ((hitEnemy.w || 64) / 2),
            hitEnemy.y - 10,
            "-" + shot.damage,
            "#00ffcc",
            "#00ffcc"
          );
        }

        // retroceso 32px
        const len = Math.hypot(shot.vx, shot.vy) || 1;
        hitEnemy.x += (shot.vx / len) * SHOT_KNOCKBACK;
        hitEnemy.y += (shot.vy / len) * SHOT_KNOCKBACK;

        if (hitEnemy.puntos_de_vida <= 0) {
          if (bridge?.killEnemyWithEffects) {
            bridge.killEnemyWithEffects(hitEnemy);
          }
        }

        removeShot = true;
        break;
      }
    }

    if (removeShot) {
      state.shots.splice(i, 1);
    }
  }
}
  
function atacarEnemigo(state, enemy) {
  if (!enemy) return false;
  if (state.attackCooldown > 0) return false;

  enemy.puntos_de_vida = Math.max(
    0,
    Number(enemy.puntos_de_vida || 0) - ATTACK_DAMAGE
  );

  if (typeof window.crearTextoDanio === "function") {
    window.crearTextoDanio(
      enemy.x + ((enemy.w || 64) / 2),
      enemy.y - 10,
      "-" + ATTACK_DAMAGE,
      "#00ffcc",
      "#00ffcc"
    );
  }

  if (enemy.puntos_de_vida <= 0) {
    if (typeof window.eliminarEnemigoPorDerrota === "function") {
      window.eliminarEnemigoPorDerrota(enemy);
    } else if (Array.isArray(window.enemigos)) {
      const idx = window.enemigos.indexOf(enemy);
      if (idx !== -1) window.enemigos.splice(idx, 1);
    }
  }

  state.attackCooldown = ATTACK_COOLDOWN_MS;
  return true;
}

  function onInit() {
    const state = getState();
    if (!state) return;

    const img = new Image();

    img.onload = () => {
      state.img = img;
      state.ready = true;
      console.log("Sprite aliado cargado");
    };

    img.onerror = () => {
      state.img = null;
      state.ready = false;
      console.warn("No cargó sprite del aliado:", SPRITE_SRC);
    };

    img.src = SPRITE_SRC;
  }

function beforeUpdate({ dt, player, enemigos }) {
  const state = getState();
  if (!state || !player) return;

  const drawW = 64;
  const drawH = 64;

  if (state.attackCooldown > 0) {
    state.attackCooldown = Math.max(0, state.attackCooldown - dt);
  }

  const playerCenterX = player.x + 32;
  const playerCenterY = player.y + 32;
  const offset = getFollowOffset(player.facing || "down");

  const followX = playerCenterX + offset.x - (drawW / 2);
  const followY = playerCenterY + offset.y - (drawH / 2);

  if (state.posX === null || state.posY === null) {
    state.posX = followX;
    state.posY = followY;
  }

  state.targetX = followX;
  state.targetY = followY;

  let moving = false;

  const nearest = getNearestEnemy(state, enemigos);

  if (nearest && nearest.dist <= CHASE_RANGE) {
    const enemy = nearest.enemy;
    const enemyCenter = getEnemyCenter(enemy);
    const allyCenter = getAllyCenter(state);

    const dxEnemy = enemyCenter.x - allyCenter.x;
    const dyEnemy = enemyCenter.y - allyCenter.y;
    const distEnemy = Math.hypot(dxEnemy, dyEnemy);

    updateFacingFromVector(state, dxEnemy, dyEnemy);

    const realAttackRange = ATTACK_RANGE + enemyCenter.radius;

if (distEnemy <= realAttackRange) {
  shootAtEnemy(state, enemy);
  moving = false;
} else {
  const safeDist = Math.max(1, distEnemy);
  const standOff = Math.max(90, enemyCenter.radius + 30);

  const targetAttackX =
    enemyCenter.x - (dxEnemy / safeDist) * standOff - (drawW / 2);

  const targetAttackY =
    enemyCenter.y - (dyEnemy / safeDist) * standOff - (drawH / 2);

  moving = moveTowards(state, targetAttackX, targetAttackY, dt);
}
  } else {
    const distToPlayer = Math.hypot(
      playerCenterX - (state.posX + drawW / 2),
      playerCenterY - (state.posY + drawH / 2)
    );

    if (distToPlayer > TELEPORT_DISTANCE) {
      state.posX = followX;
      state.posY = followY;
    } else {
      moving = moveTowards(state, followX, followY, dt);
    }
  }

  updateShots(state, dt, enemigos);
  animar(state, dt, moving || state.attackCooldown > ATTACK_COOLDOWN_MS - 120);
}

  function afterDrawWorld({ ctx }) {
    const state = getState();
    if (!ctx || !state || state.posX === null || state.posY === null) return;

    const drawW = 64;
    const drawH = 64;

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    if (state.ready && state.img) {
      const sx = state.frame * FRAME_W;
      const sy = rowForFacing(state.facing) * FRAME_H;

      ctx.drawImage(
        state.img,
        sx, sy, FRAME_W, FRAME_H,
        state.posX, state.posY, drawW, drawH
      );
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(state.posX, state.posY, 30, 30);
    }
for (const shot of state.shots) {
  ctx.save();
  ctx.fillStyle = "#00ffcc";
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, SHOT_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
    ctx.restore();
  }

  window.registerGlobalModule(MODULE_ID, {
    getInitialState,
    onInit,
    beforeUpdate,
    afterDrawWorld
  });
})();