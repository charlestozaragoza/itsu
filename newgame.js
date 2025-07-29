// itsu - Family Space Game (Level 1: Space Shooter)
// Cross-platform: works on Windows, macOS, iOS, Android, Chrome, Edge, Safari, Firefox

// --- DOM Elements ---
let canvas, ctx, playerUpload, targetUpload, playerType, targetType, startBtn, questionInline, questionText, questionAnswer, questionClue, submitAnswer;

function queryDomElements() {
  canvas = document.getElementById('itsu-canvas');
  ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  playerUpload = document.getElementById('player-upload');
  targetUpload = document.getElementById('target-upload');
  playerType = document.getElementById('player-type');
  targetType = document.getElementById('target-type');
  startBtn = document.getElementById('start-btn');
  questionInline = document.getElementById('question-inline');
  questionText = document.getElementById('question-text');
  questionAnswer = document.getElementById('question-answer');
  questionClue = document.getElementById('question-clue');
  submitAnswer = document.getElementById('submit-answer');
}

window.addEventListener('DOMContentLoaded', () => {
  queryDomElements();
  safeDraw();
  setupGameEventListeners();
});

// --- Game State ---
let playerImage = null;
let targetImage = null;
let gameStarted = false;
let player = { x: 240, y: 540, w: 48, h: 48, speed: 6, type: 'emoji', emoji: '🦊', animal: '🦊', jet: '✈️', shape: '🟣', alive: true };
let targets = [];
let baseTargetSpeed = 1.2;
let maxTargets = 1;
let bullets = [];
let keys = {};
let gamePaused = false;

function safeDraw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e0e7ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw player avatar (placeholder)
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height-60);
  ctx.font = '48px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🦊', 0, 18);
  ctx.restore();
  // Draw target (placeholder)
  ctx.save();
  ctx.translate(canvas.width/2, 80);
  ctx.font = '48px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎯', 0, 18);
  ctx.restore();
}

function setupGameEventListeners() {
  if (playerUpload) {
    playerUpload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const img = new window.Image();
        img.onload = () => { playerImage = img; safeDraw(); };
        img.src = URL.createObjectURL(file);
      }
    });
  }
  if (targetUpload) {
    targetUpload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const img = new window.Image();
        img.onload = () => { targetImage = img; safeDraw(); };
        img.src = URL.createObjectURL(file);
      }
    });
  }
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }
}

function startGame() {
  // Hide the start button when the game starts
  const startBtnContainer = document.getElementById('start-btn-container');
  if (startBtnContainer) startBtnContainer.style.display = 'none';
  gameStarted = true;
  safeDraw();
  // alert('Game started! (Game logic coming soon)');
  // When you want to reset, call showStartButton()
}

function showStartButton() {
  const startBtnContainer = document.getElementById('start-btn-container');
  if (startBtnContainer) startBtnContainer.style.display = 'flex';
  gameStarted = false;
}
}
// --- Sound Effects ---
let audioCtx = null;
if (window.AudioContext) {
  audioCtx = new window.AudioContext();
}
function playSound(type) {
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.connect(g); g.connect(audioCtx.destination);
  if (type === 'shoot') {
    o.type = 'square'; o.frequency.value = 520;
    g.gain.value = 0.08;
    o.start(); o.stop(audioCtx.currentTime+0.09);
  } else if (type === 'hit') {
    o.type = 'triangle'; o.frequency.value = 220;
    g.gain.value = 0.12;
    o.start(); o.frequency.linearRampToValueAtTime(80, audioCtx.currentTime+0.18);
    o.stop(audioCtx.currentTime+0.2);
  } else if (type === 'correct') {
    o.type = 'sine'; o.frequency.value = 660;
    g.gain.value = 0.13;
    o.start(); o.frequency.linearRampToValueAtTime(990, audioCtx.currentTime+0.18);
    o.stop(audioCtx.currentTime+0.2);
  } else if (type === 'wrong') {
    o.type = 'sawtooth'; o.frequency.value = 180;
    g.gain.value = 0.09;
    o.start(); o.frequency.linearRampToValueAtTime(90, audioCtx.currentTime+0.18);
    o.stop(audioCtx.currentTime+0.2);
  }
}
// itsu game main logic
// Handles: avatar/target selection, uploads, canvas drawing, question modal


// --- DOM Elements ---
let canvas, ctx, playerUpload, targetUpload, playerType, targetType, startBtn, questionInline, questionText, questionAnswer, questionClue, submitAnswer;

function queryDomElements() {
  canvas = document.getElementById('itsu-canvas');
  ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  playerUpload = document.getElementById('player-upload');
  targetUpload = document.getElementById('target-upload');
  playerType = document.getElementById('player-type');
  targetType = document.getElementById('target-type');
  startBtn = document.getElementById('start-btn');
  questionInline = document.getElementById('question-inline');
  questionText = document.getElementById('question-text');
  questionAnswer = document.getElementById('question-answer');
  questionClue = document.getElementById('question-clue');
  submitAnswer = document.getElementById('submit-answer');
}

window.addEventListener('DOMContentLoaded', () => {
  queryDomElements();
  safeDraw();
  setupGameEventListeners();
});

function setupGameEventListeners() {
  // Place all event listener code here
  if (playerType) playerType.addEventListener('change', updatePlayerTargetTypes);
  if (targetType) targetType.addEventListener('change', updatePlayerTargetTypes);
  if (playerUpload) playerUpload.addEventListener('change', safeDraw);
  if (targetUpload) targetUpload.addEventListener('change', safeDraw);
  if (playerUpload) {
    playerUpload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const img = new Image();
        img.onload = () => { playerImage = img; };
        img.src = URL.createObjectURL(file);
      }
    });
  }
  if (targetUpload) {
    targetUpload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const img = new Image();
        img.onload = () => { targetImage = img; };
        img.src = URL.createObjectURL(file);
      }
    });
  }
// --- DOM Elements ---
let canvas, ctx, playerUpload, targetUpload, playerType, targetType, startBtn, questionInline, questionText, questionAnswer, questionClue, submitAnswer;

function queryDomElements() {
  canvas = document.getElementById('itsu-canvas');
  ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  playerUpload = document.getElementById('player-upload');
  targetUpload = document.getElementById('target-upload');
  playerType = document.getElementById('player-type');
  targetType = document.getElementById('target-type');
  startBtn = document.getElementById('start-btn');
  questionInline = document.getElementById('question-inline');
  questionText = document.getElementById('question-text');
  questionAnswer = document.getElementById('question-answer');
  questionClue = document.getElementById('question-clue');
  submitAnswer = document.getElementById('submit-answer');
}

// Always run after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  queryDomElements();
  if (!canvas || !ctx) {
    alert('Game error: Canvas or context not found. Please reload the page.');
    return;
  }
  safeDraw();
  setupGameEventListeners();
});



// --- Game State ---
let playerImage = null;
let targetImage = null;
let gameStarted = false;
let player = { x: 240, y: 540, w: 48, h: 48, speed: 6, emoji: '🦊', animal: '🦊', jet: '✈️', shape: '🟣', alive: true };
let targets = [];
let baseTargetSpeed = 1.2;
let targetSpeedIncrement = 0.15;
let maxTargets = 1;
function createTarget() {
  const t = {
    x: 60 + Math.random() * (canvas.width - 120),
    y: 60,
    w: 48,
    h: 48,
    emoji: getRandom(EMOJIS),
    animal: getRandom(ANIMALS),
    shape: getRandom(SHAPES),
    type: getRandom(['emoji','animal','shape']),
    vx: 0,
    vy: baseTargetSpeed + Math.random()*0.5,
    question: randomQuestion(),
    clue: randomClue(),
    questionActive: false,
    questionAnswered: false,
    id: Math.random().toString(36).slice(2)
  };
  return t;
}
let particles = [];
let screenFlash = 0;
// --- Emoji/Animal/Shape/Jets ---
const EMOJIS = ['😀','😎','🤖','👽','🦄','🦊','🐸','🐵','🐱','🐶','🐻','🐼','🐧','🐤','🐙','🦕','🦖','🐢','🐠','🦋','🦚','🦜','🦩','🦔','🦥','🦦','🦨','🦡','🦃','🦅','🦆','🦢','🦉','🦇','🐲','🐉','🐴','🦓','🦌','🦒','🦏','🦛','🐪','🐫','🦙','🦘','🦥','🦦','🦨','🦡','🦃','🦅','🦆','🦢','🦉','🦇','🐲','🐉','🐴','🦓','🦌','🦒','🦏','🦛','🐪','🐫','🦙','🦘','🦥','🦦','🦨','🦡','🦃','🦅','🦆','🦢','🦉','🦇','🐲','🐉','🐴','🦓','🦌','🦒','🦏','🦛','🐪','🐫','🦙','🦘'];
const ANIMALS = ['🦊','🐻','🐼','🐧','🐤','🦄','🐸','🐵','🐱','🐶','🦁','🐯','🐨','🐷','🐮','🐭','🐹','🐰','🦝','🦓','🦒','🦔','🦦','🦥','🦦','🦨','🦡','🦃','🦅','🦆','🦢','🦉','🦇','🐲','🐉','🐴','🦓','🦌','🦒','🦏','🦛','🐪','🐫','🦙','🦘'];
const JETS = ['✈️','🛩️','🚀','🛸'];
const SHAPES = ['🟣','🔵','🟢','🟡','🟠','🔴','🟤','⚫','⚪','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🔶','🔷','🔸','🔹','🔺','🔻','🔲','🔳'];
function getRandom(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

function updatePlayerTargetTypes() {
  // Player
  if (playerType) {
    if (playerType.value === 'random') {
      const type = getRandom(['emoji','animal','jet','shape']);
      if (type === 'emoji') player.emoji = getRandom(EMOJIS);
      if (type === 'animal') player.animal = getRandom(ANIMALS);
      if (type === 'jet') player.jet = getRandom(JETS);
      if (type === 'shape') player.shape = getRandom(SHAPES);
      player.type = type;
    } else if (playerType.value === 'emoji') {
      player.emoji = getRandom(EMOJIS); player.type = 'emoji';
    } else if (playerType.value === 'animal') {
      player.animal = getRandom(ANIMALS); player.type = 'animal';
    } else if (playerType.value === 'jet') {
      player.jet = getRandom(JETS); player.type = 'jet';
    } else if (playerType.value === 'shape') {
      player.shape = getRandom(SHAPES); player.type = 'shape';
    } else if (playerType.value === 'custom') {
      player.type = 'custom';
    }
  }
  // Target
  if (targetType) {
    if (targetType.value === 'random') {
      const type = getRandom(['emoji','animal','shape']);
      if (type === 'emoji') target.emoji = getRandom(EMOJIS);
      if (type === 'animal') target.animal = getRandom(ANIMALS);
      if (type === 'shape') target.shape = getRandom(SHAPES);
      target.type = type;
    } else if (targetType.value === 'emoji') {
      target.emoji = getRandom(EMOJIS); target.type = 'emoji';
    } else if (targetType.value === 'animal') {
      target.animal = getRandom(ANIMALS); target.type = 'animal';
    } else if (targetType.value === 'shape') {
      target.shape = getRandom(SHAPES); target.type = 'shape';
    } else if (targetType.value === 'custom') {
      target.type = 'custom';
    }
  }
}

let bullets = [];
let keys = {};
let gamePaused = false;


// --- Start Game ---
  if (startBtn && !startBtn._listenerAttached) {
    function startGame(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (!canvas || !ctx) {
        alert('Game cannot start: Canvas not found.');
        return;
      }
      updatePlayerTargetTypes();
      gameStarted = true;
      gamePaused = false;
      player.x = 240;
      player.y = 540;
      bullets = [];
      targets = [];
      baseTargetSpeed = 1.2;
      maxTargets = 1;
      hideQuestionInline();
      for (let i = 0; i < maxTargets; ++i) targets.push(createTarget());
      requestAnimationFrame(gameLoop);
    }
    startBtn.addEventListener('click', startGame);
    startBtn._listenerAttached = true;
    window._startGame = startGame;
  }

// --- Keyboard Controls ---
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  // Only allow spacebar to shoot, do not start game with arrow keys or 'r'
  if (e.key === ' ' && gameStarted && !gamePaused) shoot();
});
window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

// --- Touch Controls (simple left/right/fire) ---
canvas && canvas.addEventListener('touchstart', e => {
  if (!gameStarted || gamePaused) return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  if (x < canvas.width/3) {
    keys['ArrowLeft'] = true;
    setTimeout(()=>{ keys['ArrowLeft'] = false; }, 200);
  } else if (x > 2*canvas.width/3) {
    keys['ArrowRight'] = true;
    setTimeout(()=>{ keys['ArrowRight'] = false; }, 200);
  } else {
    shoot();
  }
});

function shoot() {
  if (!gameStarted || gamePaused) return;
  bullets.push({ x: player.x, y: player.y-24, vy: -10 });
  playSound('shoot');
}

// --- Game Loop ---
function gameLoop() {
  if (!gameStarted) return;
  if (!canvas || !ctx) return;
  if (!gamePaused) update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  // Move player
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
  // Clamp
  player.x = Math.max(player.w/2, Math.min(canvas.width-player.w/2, player.x));
  // Move targets (falling like rain)
  if (!gamePaused) {
    for (let t of targets) {
      t.y += t.vy;
      // Remove if offscreen and not active
      if (t.y > canvas.height + 60 && !t.questionActive) {
        t.remove = true;
      }
    }
    targets = targets.filter(t => !t.remove);
    // Add new targets if needed
    while (targets.length < maxTargets) targets.push(createTarget());
  }
  // Move bullets
  for (let b of bullets) b.y += b.vy;
  // Remove offscreen bullets
  bullets = bullets.filter(b => b.y > -30);
  // Check collision with targets
  for (let t of targets) {
    if (t.questionActive || t.questionAnswered) continue;
    for (let b of bullets) {
      if (Math.abs(b.x - t.x) < 32 && Math.abs(b.y - t.y) < 32) {
        playSound('hit');
        spawnExplosion(t.x, t.y, t.type);
        t.questionActive = true;
        showQuestionInline(t);
        gamePaused = true;
        break;
      }
    }
  }
  // Move question UI above active target if visible
  if (questionInline && questionInline.style.display !== 'none' && window.activeQuestionTarget) {
    const rect = canvas.getBoundingClientRect();
    questionInline.style.left = (rect.left + window.scrollX + window.activeQuestionTarget.x - 160) + 'px';
    questionInline.style.top = (rect.top + window.scrollY + window.activeQuestionTarget.y - 90) + 'px';
  }
  // Example: Player death if bullet hits player (optional, for effect)
  /*
  for (let b of bullets) {
    if (Math.abs(b.x - player.x) < 32 && Math.abs(b.y - player.y) < 32) {
      player.alive = false;
      screenFlash = 1.0;
      setTimeout(()=>{ player.alive = true; }, 800);
    }
  }
  */
  // Update particles
  for (let p of particles) {
    p.x += p.vx; p.y += p.vy; p.life -= 1;
    p.vy += 0.1;
  }
  particles = particles.filter(p => p.life > 0);
  // Update screen flash
  if (screenFlash > 0) screenFlash -= 0.04;
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e0e7ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw particles (explosions)
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life/20);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
  }
  // Draw player
  ctx.save();
  ctx.translate(player.x, player.y);
  if (!player.alive) {
    ctx.globalAlpha = 0.3;
  }
  if (playerType && playerType.value === 'custom' && playerImage) {
    ctx.drawImage(playerImage, -24, -24, 48, 48);
  } else if (player.type === 'emoji') {
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(player.emoji, 0, 16);
  } else if (player.type === 'animal') {
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(player.animal, 0, 16);
  } else if (player.type === 'jet') {
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(player.jet, 0, 16);
  } else if (player.type === 'shape') {
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(player.shape, 0, 16);
  } else {
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText('🦊', 0, 16);
  }
  ctx.restore();
  // Draw targets
  for (let t of targets) {
    ctx.save();
    ctx.translate(t.x, t.y);
    if (targetType && targetType.value === 'custom' && targetImage) {
      ctx.drawImage(targetImage, -24, -24, 48, 48);
    } else if (t.type === 'emoji') {
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(t.emoji, 0, 16);
    } else if (t.type === 'animal') {
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(t.animal, 0, 16);
    } else if (t.type === 'shape') {
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText(t.shape, 0, 16);
    } else {
      ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText('🎯', 0, 16);
    }
    ctx.restore();
  }
  // Draw bullets
  ctx.fillStyle = '#7d3cff';
  for (let b of bullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 6, 0, 2*Math.PI);
    ctx.fill();
  }
  // Draw screen flash if player "dies"
  if (screenFlash > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(0.5, screenFlash);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  }
}
// --- Explosion Effect ---
function spawnExplosion(x, y, type) {
  let color = '#7d3cff';
  if (type === 'emoji') color = '#ffb300';
  if (type === 'animal') color = '#00b894';
  if (type === 'shape') color = '#0984e3';
  for (let i=0; i<18; ++i) {
    const angle = Math.random()*2*Math.PI;
    const speed = 2+Math.random()*2;
    particles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      size: 6+Math.random()*6,
      color,
      life: 18+Math.random()*10
    });
  }
}

// --- Question/Clue Pool (placeholder) ---
function randomQuestion() {
  const questions = [
    'What is the capital of France?',
    'What is 5 + 7?',
    'Name a mammal that can fly.',
    'What color do you get by mixing red and blue?'
  ];
  return questions[Math.floor(Math.random()*questions.length)];
}
function randomClue() {
  const clues = [
    'It is a famous city of lights.',
    'It is more than 10, less than 13.',
    'Think of a bat.',
    'It is a secondary color.'
  ];
  return clues[Math.floor(Math.random()*clues.length)];
}

// --- Canvas Drawing (placeholder) ---
function drawInitialScene() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e0e7ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw player avatar (placeholder)
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height-60);
  if (playerType && playerType.value === 'custom' && playerImage) {
    ctx.drawImage(playerImage, -32, -32, 64, 64);
  } else {
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🦊', 0, 18);
  }
  ctx.restore();
  // Draw target (placeholder)
  ctx.save();
  ctx.translate(canvas.width/2, 80);
  if (targetType && targetType.value === 'custom' && targetImage) {
    ctx.drawImage(targetImage, -32, -32, 64, 64);
  } else {
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎯', 0, 18);
  }
  ctx.restore();
}


// --- Question Modal Logic ---
// --- Inline Question Logic ---
let currentQuestion = '';
let currentAnswer = '';
window.activeQuestionTarget = null;
function showQuestionInline(targetObj) {
  if (!questionInline) return;
  questionInline.style.display = 'block';
  questionText.textContent = targetObj.question;
  questionClue.textContent = targetObj.clue || '';
  questionAnswer.value = '';
  currentQuestion = targetObj.question;
  // Set answer for validation
  if (currentQuestion === 'What is the capital of France?') currentAnswer = 'paris';
  else if (currentQuestion === 'What is 5 + 7?') currentAnswer = '12';
  else if (currentQuestion === 'Name a mammal that can fly.') currentAnswer = 'bat';
  else if (currentQuestion === 'What color do you get by mixing red and blue?') currentAnswer = 'purple';
  else currentAnswer = '';
  window.activeQuestionTarget = targetObj;
  setTimeout(()=>updateQuestionPosition(), 10);
}
function hideQuestionInline() {
  if (!questionInline) return;
  questionInline.style.display = 'none';
  window.activeQuestionTarget = null;
}
function updateQuestionPosition() {
  if (!questionInline || !canvas || !window.activeQuestionTarget) return;
  const rect = canvas.getBoundingClientRect();
  questionInline.style.left = (rect.left + window.scrollX + window.activeQuestionTarget.x - 160) + 'px';
  questionInline.style.top = (rect.top + window.scrollY + window.activeQuestionTarget.y - 90) + 'px';
}
if (submitAnswer) {
  submitAnswer.addEventListener('click', () => {
    const ans = questionAnswer.value.trim().toLowerCase();
    if (ans === currentAnswer && window.activeQuestionTarget) {
      playSound('correct');
      hideQuestionInline();
      window.activeQuestionTarget.questionAnswered = true;
      // Remove the answered target
      targets = targets.filter(t => !t.questionActive || t.questionAnswered);
      // Increase speed and number of targets gradually
      baseTargetSpeed += targetSpeedIncrement;
      if (maxTargets < 5 && Math.random() < 0.4) maxTargets++;
      gamePaused = false;
      // Remove all bullets
      bullets = [];
    } else {
      playSound('wrong');
      questionClue.textContent = 'Try again! ' + (questionClue.textContent || '');
    }
  });
}

// --- On load, draw initial scene and re-draw after uploads ---
function safeDraw() {
  gameStarted = false;
  if (typeof draw === 'function') draw();
}
// New game code starts here

