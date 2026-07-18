//tomar como base para mascota.js y ataque cuerpo a cuerpo
//tomar como base para tener varios aliados - evaluar si se puede en ese mapa hacer que los enemigos ataquen a los aliados


//versión 1.0.9 - aliado recibe daños, muere y muestra popup, pero no lo ven los enemigos ni ataca. esta versión ya reproduce el sprite del aliado de manera correcta, aunque se reinicie el juego

(function () {
  const MODULE_ID = "spiritual_mark_01";
  const SPRITE_SRC = "https://enycosmicplayer.vercel.app/assets/avatares/armaduras/spirit-armon-1.svg";

  const FRAME_W = 64;
  const FRAME_H = 64;
  const TOTAL_FRAMES = 4;
  const FRAME_DURATION_MS = 150;

  const FOLLOW_DISTANCE = 100;
  const TELEPORT_DISTANCE = 500;
  const MOVE_SPEED = 1.8;
  const SNAP_DISTANCE = 2;

  const ATTACK_DAMAGE = 12;
  const ATTACK_RANGE = 76;
  const CHASE_RANGE = 420;
  const ATTACK_COOLDOWN_MS = 780;

  const SLASH_LIFE_MS = 150;
  const SLASH_REACH = 62;
  const SLASH_KNOCKBACK = 30;
  const SPIRITUAL_SWORD_COLOR = "#eaf7ff";
  const SPIRITUAL_SWORD_GLOW = "#bfefff";

  const AVOIDANCE_STEP = 26;
  const AVOIDANCE_DIAGONAL_STEP = 18;
  const AVOIDANCE_MEMORY_MS = 450;

  const ALLY_MAX_HP = 120;
  const ALLY_HIT_W = 36;
  const ALLY_HIT_H = 36;
  const ALLY_BAR_W = 42;
  const ALLY_BAR_H = 6;

  const SwordSound = new Audio("https://enycosmicplayer.vercel.app/assets/song/efect/espada.mp3");

  function playSpiritualSwordSound() {
    const s = SwordSound.cloneNode();
    s.volume = typeof efectVolumen !== "undefined" ? efectVolumen : 0.8;
    s.play().catch(() => { });
  }

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
      slashes: [],
      attackAnimTimer: 0,
      attackAnimMax: 220,
      attackLungeX: 0,
      attackLungeY: 0,

      avoidanceSide: 1,
      avoidanceLockMs: 0,

      hp: ALLY_MAX_HP,
      maxHp: ALLY_MAX_HP,
      alive: true,
      blinkTimer: 0
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

  function getAllyRect(state) {
    return {
      x: state.posX + ((64 - ALLY_HIT_W) / 2),
      y: state.posY + (64 - ALLY_HIT_H),
      w: ALLY_HIT_W,
      h: ALLY_HIT_H
    };
  }

  function syncEnemyTargetProxy(state) {
    if (!state || !state.alive || state.posX === null || state.posY === null) {
      window.enyAllyTarget = null;
      return;
    }

    const rect = getAllyRect(state);

    window.enyAllyTarget = {
      type: "ally",
      moduleId: MODULE_ID,
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      centerX: rect.x + rect.w / 2,
      centerY: rect.y + rect.h / 2
    };
  }

  function ensureAliadoPopUpCSS() {
    if (document.getElementById("popup-feedback-css-link")) return;

    const link = document.createElement("link");
    link.id = "popup-feedback-css-link";
    link.rel = "stylesheet";
    link.href = "https://enycosmicplayer.vercel.app/styles/popUp.css";
    document.head.appendChild(link);
  }

  let aliadoPopupFeedbackTimer = null;

  function closeAliadoPopupFeedback() {
    const popup = document.getElementById("popup-feedback");
    if (!popup) return;

    popup.classList.add("popup-feedback--closing");

    setTimeout(() => {
      popup.remove();
    }, 220);
  }

  function showAliadoPopupFeedback({
    title = "Notificación",
    message = "",
    type = "warning",
    duration = 5000
  } = {}) {
    ensureAliadoPopUpCSS();

    if (aliadoPopupFeedbackTimer) {
      clearTimeout(aliadoPopupFeedbackTimer);
      aliadoPopupFeedbackTimer = null;
    }

    const oldPopup = document.getElementById("popup-feedback");
    if (oldPopup) oldPopup.remove();

    const icon = type === "warning"
      ? "⛔"
      : `<img src="https://art.pixilart.com/thumb/sr5z082f4e339daws3.png" style="width:100%;height:100%;image-rendering:pixelated;" />`;

    const popup = document.createElement("div");
    popup.id = "popup-feedback";
    popup.className = `popup-feedback popup-feedback--${type}`;

    popup.innerHTML = `
    <div class="popup-feedback__box">
      <div class="popup-feedback__icon">${icon}</div>
      <div class="popup-feedback__content">
        <p class="popup-feedback__title">${title}</p>
        <p class="popup-feedback__message">${message}</p>
      </div>
    </div>
  `;

    document.body.appendChild(popup);

    aliadoPopupFeedbackTimer = setTimeout(() => {
      closeAliadoPopupFeedback();
      aliadoPopupFeedbackTimer = null;
    }, duration);
  }

  function killAlly(state) {
    if (!state || !state.alive) return;

    state.alive = false;
    state.hp = 0;
    state.slashes.length = 0;
    window.enyAllyTarget = null;

    if (typeof window.crearTextoDanio === "function") {
      window.crearTextoDanio(
        state.posX + 32,
        state.posY - 14,
        "ALIADO MUERTO",
        "#ff5a5a",
        "#ff0000"
      );
    }

    console.log("El aliado ha muerto");

    showAliadoPopupFeedback({
      title: "Poder espiritual agotado",
      message: "El antiguo pacto no responde. Vuelve al lugar donde la protección fue nombrada.",
      type: "warning",
      duration: 5000
    });
  }

  function damageAlly(state, amount, enemy = null) {
    if (!state || !state.alive) return false;

    const danio = Math.max(0, Number(amount) || 0);
    if (danio <= 0) return false;

    state.hp = Math.max(0, state.hp - danio);
    state.blinkTimer = 220;

    if (typeof window.crearTextoDanio === "function") {
      window.crearTextoDanio(
        state.posX + 32,
        state.posY - 10,
        "-" + danio,
        "#ff5a5a",
        "#ff0000"
      );
    }

    if (enemy) {
      const dx = state.posX - enemy.x;
      const dy = state.posY - enemy.y;
      const dist = Math.hypot(dx, dy) || 1;
      const push = 24;

      moveWithCollision(
        state,
        state.posX + ((dx / dist) * push),
        state.posY + ((dy / dist) * push)
      );
    }

    if (state.hp <= 0) {
      killAlly(state);
    }

    syncEnemyTargetProxy(state);
    return true;
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
    if (state.attackAnimTimer > 0) {
      state.attackAnimTimer = Math.max(0, state.attackAnimTimer - dt);

      const progreso = 1 - (state.attackAnimTimer / state.attackAnimMax);

      if (progreso < 0.25) {
        state.frame = 1;
      } else if (progreso < 0.65) {
        state.frame = 2;
      } else {
        state.frame = 3;
      }

      const fuerza = Math.sin(progreso * Math.PI) * 8;

      state.attackLungeX = 0;
      state.attackLungeY = 0;

      if (state.facing === "up") {
        state.attackLungeY = -fuerza;
      } else if (state.facing === "down") {
        state.attackLungeY = fuerza;
      } else if (state.facing === "left") {
        state.attackLungeX = -fuerza;
      } else if (state.facing === "right") {
        state.attackLungeX = fuerza;
      }

      if (state.attackAnimTimer <= 0) {
        state.attackLungeX = 0;
        state.attackLungeY = 0;
        state.frame = 0;
        state.frameTimer = 0;
      }

      return;
    }

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

  function getSlashDirection(facing) {
    switch (facing) {
      case "up": return { x: 0, y: -1, angle: -Math.PI / 2 };
      case "down": return { x: 0, y: 1, angle: Math.PI / 2 };
      case "left": return { x: -1, y: 0, angle: Math.PI };
      case "right": return { x: 1, y: 0, angle: 0 };
      default: return { x: 0, y: 1, angle: Math.PI / 2 };
    }
  }

  function slashHitsEnemy(originX, originY, dir, enemy) {
    if (!enemy) return false;
    if ((enemy.puntos_de_vida ?? 0) <= 0) return false;

    const center = getEnemyCenter(enemy);

    const dx = center.x - originX;
    const dy = center.y - originY;

    const forward = dx * dir.x + dy * dir.y;
    if (forward < 0 || forward > SLASH_REACH + center.radius) return false;

    const lateral = Math.abs(dx * -dir.y + dy * dir.x);
    return lateral <= 34 + center.radius * 0.35;
  }

  function slashAtEnemy(state, enemy) {
    if (!enemy) return false;
    if (state.attackCooldown > 0) return false;

    const allyCenter = getAllyCenter(state);
    const enemyCenter = getEnemyCenter(enemy);

    const dx = enemyCenter.x - allyCenter.x;
    const dy = enemyCenter.y - allyCenter.y;

    updateFacingFromVector(state, dx, dy);

    const dir = getSlashDirection(state.facing);

    const originX = allyCenter.x + dir.x * 18;
    const originY = allyCenter.y + dir.y * 18;

    state.slashes.push({
      x: originX,
      y: originY,
      dirX: dir.x,
      dirY: dir.y,
      angle: dir.angle,
      life: SLASH_LIFE_MS,
      maxLife: SLASH_LIFE_MS,
      damage: ATTACK_DAMAGE
    });

    state.attackCooldown = ATTACK_COOLDOWN_MS;
    state.attackAnimTimer = state.attackAnimMax;
    state.attackLungeX = 0;
    state.attackLungeY = 0;

    playSpiritualSwordSound();

    const enemies = window.enemigos || [];

    for (const target of enemies) {
      if (!slashHitsEnemy(originX, originY, dir, target)) continue;

      target.puntos_de_vida = Math.max(
        0,
        Number(target.puntos_de_vida || 0) - ATTACK_DAMAGE
      );

      if (typeof window.crearTextoDanio === "function") {
        window.crearTextoDanio(
          target.x + ((target.w || 64) / 2),
          target.y - 10,
          "-" + ATTACK_DAMAGE,
          SPIRITUAL_SWORD_COLOR,
          SPIRITUAL_SWORD_GLOW
        );
      }

      const pushX = dir.x * SLASH_KNOCKBACK;
      const pushY = dir.y * SLASH_KNOCKBACK;

      const bridge = window.enyGameBridge;

      if (bridge?.moveEntityWithCollision) {
        bridge.moveEntityWithCollision(
          target,
          target.x + pushX,
          target.y + pushY,
          target.w || 64,
          target.h || 64
        );
      } else {
        target.x += pushX;
        target.y += pushY;
      }

      if (target.puntos_de_vida <= 0 && bridge?.killEnemyWithEffects) {
        bridge.killEnemyWithEffects(target);
      }
    }

    return true;
  }

  function updateSlashes(state, dt) {
    for (let i = state.slashes.length - 1; i >= 0; i--) {
      const slash = state.slashes[i];

      slash.life -= dt;

      if (slash.life <= 0) {
        state.slashes.splice(i, 1);
      }
    }
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
    syncEnemyTargetProxy(state);
  }

  function beforeUpdate({ dt, player, enemigos }) {
    const state = getState();
    if (!state || !player) return;

    const drawW = 64;
    const drawH = 64;

    if (state.blinkTimer > 0) {
      state.blinkTimer = Math.max(0, state.blinkTimer - dt);
    }

    if (!state.alive) {
      state.slashes.length = 0;
      return;
    }

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
        slashAtEnemy(state, enemy);
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

    updateSlashes(state, dt);
    animar(state, dt, moving);
  }

  function drawLifeBar(ctx, state) {
    const ratio = Math.max(0, Math.min(1, state.hp / state.maxHp));
    const x = state.posX + ((64 - ALLY_BAR_W) / 2);
    const y = state.posY - 10;

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(x, y, ALLY_BAR_W, ALLY_BAR_H);

    ctx.fillStyle = ratio > 0.45 ? "#00ff66" : (ratio > 0.2 ? "#ffd54a" : "#ff4d4d");
    ctx.fillRect(x + 1, y + 1, Math.max(0, (ALLY_BAR_W - 2) * ratio), ALLY_BAR_H - 2);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, ALLY_BAR_W, ALLY_BAR_H);
    ctx.restore();
  }

  function afterDrawWorld({ ctx }) {
    const state = getState();
    if (!ctx || !state || state.posX === null || state.posY === null || !state.alive) return;

    const drawW = 64;
    const drawH = 64;

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    const shadowImg = window.images?.shadow || null;

    if (typeof window.drawEntityShadow === "function") {
      window.drawEntityShadow(ctx, shadowImg, state.posX, state.posY, drawW, drawH, {
        scaleW: 0.68,
        scaleH: 0.26,
        offsetY: 0.82,
        alpha: 0.30
      });
    } else {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.ellipse(
        state.posX + drawW / 2,
        state.posY + drawH * 0.84,
        drawW * 0.26,
        drawH * 0.10,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    }

    drawLifeBar(ctx, state);

    if (!state.alive) {
      ctx.restore();
      return;
    }

    drawLifeBar(ctx, state);
    if (!state.img || !(state.img instanceof HTMLImageElement)) {
      state.img = new Image();

      state.img.onload = () => {
        state.ready = true;
        console.log("Sprite aliado recargado desde afterDrawWorld");
      };

      state.img.onerror = () => {
        state.ready = false;
        console.warn("No se pudo recargar sprite aliado:", SPRITE_SRC);
      };

      state.img.src = SPRITE_SRC;
    }

    if (state.img && state.img.complete && state.img.naturalWidth > 0) {
      const sx = state.frame * FRAME_W;
      const sy = rowForFacing(state.facing) * FRAME_H;

      if (state.blinkTimer > 0 && Math.floor(state.blinkTimer / 40) % 2 === 0) {
        ctx.globalAlpha = 0.45;
      }

      if (state.blinkTimer > 0 && Math.floor(state.blinkTimer / 40) % 2 === 0) {
        ctx.globalAlpha = 0.45;
      }

      ctx.drawImage(
        state.img,
        sx, sy, FRAME_W, FRAME_H,
        state.posX + (state.attackLungeX || 0),
        state.posY + (state.attackLungeY || 0),
        drawW,
        drawH
      );
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(state.posX, state.posY, 30, 30);
    }

    for (const slash of state.slashes) {
      const progreso = 1 - (slash.life / slash.maxLife);
      const alpha = Math.max(0, slash.life / slash.maxLife);
      const alcance = SLASH_REACH * (0.72 + progreso * 0.28);
      const apertura = 0.85;

      ctx.save();
      ctx.translate(slash.x, slash.y);
      ctx.rotate(slash.angle);
      ctx.globalAlpha = alpha;

      ctx.strokeStyle = SPIRITUAL_SWORD_COLOR;
      ctx.lineWidth = 6;
      ctx.shadowColor = SPIRITUAL_SWORD_GLOW;
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        alcance,
        -apertura,
        apertura
      );
      ctx.stroke();

      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        alcance * 0.92,
        -apertura * 0.82,
        apertura * 0.82
      );
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.fillStyle = SPIRITUAL_SWORD_COLOR;
      ctx.shadowColor = SPIRITUAL_SWORD_GLOW;
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.moveTo(10, -5);
      ctx.lineTo(alcance + 8, 0);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  window.enyGetAliadoTarget = function () {
    const state = getState();
    if (!state || !state.alive || state.posX === null || state.posY === null) return null;

    const rect = getAllyRect(state);

    return {
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      centerX: rect.x + rect.w / 2,
      centerY: rect.y + rect.h / 2,
      moduleId: MODULE_ID,
      tipo: "aliado"
    };
  };

  window.enyDamageAliado = function (amount, enemy = null) {
    const state = getState();
    return damageAlly(state, amount, enemy);
  };

  window.enyIsAliadoAlive = function () {
    const state = getState();
    return !!state?.alive;
  };

  window.registerGlobalModule(MODULE_ID, {
    getInitialState,
    onInit,
    beforeUpdate,
    afterDrawWorld
  });
})();