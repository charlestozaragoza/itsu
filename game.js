// --- Sound Effects ---
const sounds = {
  shoot: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'), // laser
  shatter: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'), // glass (reuse laser for now)
  powerup: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'), // placeholder
  explosion: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_12b2b3b7b7.mp3'), // explosion
  correct: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'), // correct (reuse laser for now)
};
// Allow overlapping play
Object.values(sounds).forEach(a => { a.preload = 'auto'; a.load(); });
function playSound(name) {
  try {
    if (sounds[name]) {
      const s = sounds[name].cloneNode();
      s.volume = 0.5;
      s.play();
    }
  } catch (e) {}
}
// ittsu: Family Space Shooter - Interactive, inclusive, and fun for all ages!


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const playerUpload = document.getElementById('player-upload');
const targetUpload = document.getElementById('target-upload');
const questionModal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitAnswer = document.getElementById('submit-answer');
const clueText = document.getElementById('clue-text');


// --- Mobile Controls (Reset & Modern Implementation) ---
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let mobileControls, joystick, shootBtn, joystickKnob, moveInterval;
let joystickState = { active: false, startX: 0, x: 0 };

if (isMobile()) {
  // Responsive canvas for mobile
  function resizeCanvas() {
    let dpr = window.devicePixelRatio || 1;
    let w = Math.min(window.innerWidth, 480);
    let h = Math.min(window.innerHeight, 640);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Remove old controls if present
  let old = document.getElementById('mobile-controls');
  if (old) old.remove();

  // Controls container
  mobileControls = document.createElement('div');
  mobileControls.id = 'mobile-controls';
  mobileControls.style.position = 'fixed';
  mobileControls.style.left = '0';
  mobileControls.style.right = '0';
  mobileControls.style.bottom = '0';
  mobileControls.style.width = '100vw';
  mobileControls.style.height = '100vh';
  mobileControls.style.pointerEvents = 'none';
  mobileControls.style.zIndex = '9999';

  // Joystick (bottom left)
  joystick = document.createElement('div');
  joystick.id = 'joystick';
  joystick.style.position = 'absolute';
  joystick.style.left = '32px';
  joystick.style.bottom = '32px';
  joystick.style.width = '90px';
  joystick.style.height = '90px';
  joystick.style.background = 'rgba(60,80,180,0.12)';
  joystick.style.borderRadius = '50%';
  joystick.style.display = 'flex';
  joystick.style.alignItems = 'center';
  joystick.style.justifyContent = 'center';
  joystick.style.pointerEvents = 'auto';
  joystick.style.touchAction = 'none';
  joystick.style.userSelect = 'none';
  joystick.innerHTML = '<div id="joystick-knob" style="width:48px;height:48px;background:#2d8cff;border-radius:50%;box-shadow:0 2px 8px #0003;"></div>';
  joystickKnob = joystick.querySelector('#joystick-knob');
  mobileControls.appendChild(joystick);

  // Shoot button (bottom right)
  shootBtn = document.createElement('button');
  shootBtn.id = 'shoot-btn';
  shootBtn.innerHTML = '🔫';
  shootBtn.setAttribute('aria-label', 'Shoot');
  shootBtn.style.position = 'absolute';
  shootBtn.style.right = '32px';
  shootBtn.style.bottom = '40px';
  shootBtn.style.width = '72px';
  shootBtn.style.height = '72px';
  shootBtn.style.fontSize = '2.5rem';
  shootBtn.style.borderRadius = '50%';
  shootBtn.style.background = '#ffb300';
  shootBtn.style.color = '#fff';
  shootBtn.style.border = 'none';
  shootBtn.style.boxShadow = '0 2px 8px #0003';
  shootBtn.style.pointerEvents = 'auto';
  shootBtn.style.touchAction = 'none';
  shootBtn.style.userSelect = 'none';
  mobileControls.appendChild(shootBtn);

  document.body.appendChild(mobileControls);

  // Prevent scrolling when touching controls
  mobileControls.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

  // Joystick logic
  let center = { x: 45, y: 45 };
  let dragging = false;
  function movePlayer(dir) {
    if (!gameActive) return;
    if (dir < 0 && player.x > 0) player.x -= 8;
    if (dir > 0 && player.x < canvas.width - player.w) player.x += 8;
  }
  function onJoyStart(e) {
    dragging = true;
    let rect = joystick.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    joystickState.startX = x;
    joystickState.x = x;
    joystickKnob.style.transition = 'none';
    if (moveInterval) clearInterval(moveInterval);
    moveInterval = setInterval(() => {
      let dx = joystickState.x - center.x;
      if (Math.abs(dx) > 10) {
        let dir = dx < 0 ? -1 : 1;
        movePlayer(dir);
      }
    }, 24);
  }
  function onJoyMove(e) {
    if (!dragging) return;
    let rect = joystick.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let dx = Math.max(-35, Math.min(35, x - center.x));
    joystickState.x = center.x + dx;
    joystickKnob.style.transform = `translateX(${dx}px)`;
  }
  function onJoyEnd(e) {
    dragging = false;
    joystickState.x = center.x;
    joystickKnob.style.transition = 'transform 0.15s';
    joystickKnob.style.transform = 'translateX(0)';
    if (moveInterval) clearInterval(moveInterval);
  }
  joystick.addEventListener('pointerdown', onJoyStart);
  joystick.addEventListener('pointermove', onJoyMove);
  joystick.addEventListener('pointerup', onJoyEnd);
  joystick.addEventListener('pointerleave', onJoyEnd);
  joystick.addEventListener('touchstart', onJoyStart);
  joystick.addEventListener('touchmove', onJoyMove);
  joystick.addEventListener('touchend', onJoyEnd);
  joystick.addEventListener('touchcancel', onJoyEnd);

  // Shoot button logic
  function shootAction() {
    if (!gameActive) return;
    if (player.doubleShot > 0) {
      bullets.push({ x: player.x + 6, y: player.y });
      bullets.push({ x: player.x + 30, y: player.y });
    } else {
      bullets.push({ x: player.x + 18, y: player.y });
    }
    playSound('shoot');
  }
  let shootInterval = null;
  shootBtn.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    shootAction();
    shootBtn.style.filter = 'brightness(1.5)';
    if (shootInterval) clearInterval(shootInterval);
    shootInterval = setInterval(shootAction, 220);
  });
  shootBtn.addEventListener('pointerup', function(e) {
    e.preventDefault();
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('pointerleave', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('touchend', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('touchcancel', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
}


// Game state
let gameActive = false;
let playerImg = null;
let targetImg = null;
let player = { x: 220, y: 560, w: 40, h: 40 };
let bullets = [];
let targets = [];
let shatteringTargets = [];
let shatters = [];
let explosions = [];
let playerExplosion = null;
let targetSpeed = 1.0;

// New, non-repeating questions (no duplicates with player visuals or words)
let allQuestions = [
  { q: "What is the closest planet to the Sun?", a: "mercury", clue: "It's also the smallest planet." },
  { q: "What galaxy do we live in?", a: "milky way", clue: "It's named after a dairy product." },
  { q: "What force keeps us on the ground?", a: "gravity", clue: "It's what makes things fall." },
  { q: "What is the chemical symbol for gold?", a: "au", clue: "It's not 'G'." },
  { q: "What animal is known as the King of the Jungle?", a: "lion", clue: "It has a mane." },
  { q: "What is the largest mammal?", a: "blue whale", clue: "It's a sea creature." },
  { q: "What do bees make?", a: "honey", clue: "It's sweet and golden." },
  { q: "What is the main language spoken in Brazil?", a: "portuguese", clue: "It's not Spanish." },
  { q: "What is the capital of France?", a: "paris", clue: "It's the city of lights." },
  { q: "What shape has three sides?", a: "triangle", clue: "It's not a square." }
];
let availableQuestions = [...allQuestions];
let currentQuestion = null;
let clueGiven = false;

let emojis = ["🪐", "🚀", "🌟", "👾", "🛸", "🌈", "💫", "✨", "🌍", "🧑‍🚀"];
// Target words (no duplicates with questions or player visuals)
let words = ["Kindness", "Respect", "Unity", "Peace", "Joy", "Hope", "Love", "Curiosity", "Dream", "Learn"];
// Player visuals for random cycling
const playerVisuals = [
  // Jets
  "✈️", "🛩️", "🚀", "🛸",
  // Animals
  "🐶", "🐱", "🦊", "🐻", "🐼", "🦁", "🐸", "🐵", "🐧", "🐢", "🐦",
  // Emojis (no duplicates with jets/animals)
  "😃", "😎", "🤖",
  // Words (no duplicates with question answers)
  "Zoom!", "Go!", "Wow!", "Fly!", "Fun!", "Play!"
];
let currentPlayerVisual = playerVisuals[Math.floor(Math.random() * playerVisuals.length)];

// Randomize player visual if no upload
setInterval(() => {
  if (!playerImg && gameActive) {
    currentPlayerVisual = playerVisuals[Math.floor(Math.random() * playerVisuals.length)];
  }
}, 1000);

function drawPlayer() {
  if (playerImg) ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
  else {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = currentPlayerVisual.length > 2 ? 'bold 18px Segoe UI' : '36px serif';
    ctx.fillStyle = '#2d8cff';
    ctx.beginPath();
    ctx.arc(player.x + 20, player.y + 20, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(currentPlayerVisual, player.x + 20, player.y + 22);
    ctx.restore();
  }
}


function drawTargets() {
  // Draw normal targets
  targets.forEach(t => {
    if (t.type === 'emoji') {
      ctx.font = '32px serif';
      ctx.fillText(t.value, t.x, t.y + 32);
    } else if (t.type === 'word') {
      ctx.font = 'bold 20px Segoe UI';
      ctx.fillStyle = '#fff';
      ctx.fillText(t.value, t.x, t.y + 20);
    } else if (t.type === 'question') {
      ctx.font = 'bold 24px Segoe UI';
      ctx.fillStyle = '#ffb300';
      ctx.fillText('❓', t.x, t.y + 24);
    } else if (t.type === 'image' && targetImg) {
      ctx.drawImage(targetImg, t.x, t.y, 40, 40);
    }
  });
  // Draw shattering targets (overlap with glass effect)
  shatteringTargets.forEach(t => {
    if (t.type === 'emoji') {
      ctx.font = '32px serif';
      ctx.fillText(t.value, t.x, t.y + 32);
    } else if (t.type === 'word') {
      ctx.font = 'bold 20px Segoe UI';
      ctx.fillStyle = '#fff';
      ctx.fillText(t.value, t.x, t.y + 20);
    } else if (t.type === 'question') {
      ctx.font = 'bold 24px Segoe UI';
      ctx.fillStyle = '#ffb300';
      ctx.fillText('❓', t.x, t.y + 24);
    } else if (t.type === 'image' && targetImg) {
      ctx.drawImage(targetImg, t.x, t.y, 40, 40);
    }
  });
}

function drawShatters() {
  shatters.forEach(s => {
    for (let i = 0; i < s.pieces.length; i++) {
      let p = s.pieces[i];
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = '#bfe6ff';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.dx * 6, p.y + p.dy * 6);
      ctx.stroke();
      ctx.restore();
    }
  });
}

function drawExplosions() {
  explosions.forEach(e => {
    for (let i = 0; i < e.particles.length; i++) {
      let p = e.particles[i];
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });
}

function drawPlayerExplosion() {
  if (!playerExplosion) return;
  for (let i = 0; i < playerExplosion.particles.length; i++) {
    let p = playerExplosion.particles[i];
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawBullets() {
  ctx.fillStyle = '#fff';
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 12));
}

function resetGame() {
  player.x = 220;
  bullets = [];
  targets = [];
  shatteringTargets = [];
  shatters = [];
  explosions = [];
  playerExplosion = null;
  targetSpeed = 1.0; // slow at start
  gameActive = true;
  clueGiven = false;
  currentQuestion = null;
  score = 0;
  streak = 0;
  bestStreak = 0;
  // Reset questions for a new game
  availableQuestions = [...allQuestions];
  // Reset power-ups and player state
  powerUps = [];
  player.shield = 0;
  player.doubleShot = 0;
  // Stop all sounds (if any are playing)
  Object.values(sounds).forEach(a => { try { a.pause(); a.currentTime = 0; } catch(e){} });
  // Clear modal if open
  questionModal.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Show initial message if no images
  if (!playerImg && !targetImg) {
    ctx.font = '20px Segoe UI';
    ctx.fillStyle = '#fff';
    ctx.fillText('Upload your face and target, then press Start!', 40, canvas.height / 2);
  }
  spawnTargets();
  loop();
}

function spawnTargets() {
  targets = [];
  for (let i = 0; i < 6; i++) {
    let type = Math.random() < 0.2 ? 'question' : (Math.random() < 0.5 ? 'emoji' : 'word');
    let value = type === 'emoji' ? emojis[Math.floor(Math.random() * emojis.length)] :
                type === 'word' ? words[Math.floor(Math.random() * words.length)] : null;
    targets.push({
      x: Math.random() * (canvas.width - 40),
      y: -Math.random() * 300,
      w: 40,
      h: 40,
      type,
      value
    });
  }
  // Add a custom image target if uploaded
  if (targetImg) {
    targets.push({ x: Math.random() * (canvas.width - 40), y: -350, w: 40, h: 40, type: 'image' });
  }
}


function loop() {
  drawBackground();
  if (playerExplosion) {
    drawPlayerExplosion();
    updatePlayerExplosion();
    if (playerExplosion.done) {
      playerExplosion = null;
      ctx.font = 'bold 32px Segoe UI';
      ctx.fillStyle = '#ff4444';
      ctx.fillText('Boom! Game Over', 100, canvas.height / 2);
      ctx.font = 'bold 20px Segoe UI';
      ctx.fillStyle = '#ffe066';
      ctx.fillText('Final Score: ' + score, 140, canvas.height / 2 + 40);
      ctx.fillText('Best Streak: ' + bestStreak, 140, canvas.height / 2 + 70);
      return;
    }
    requestAnimationFrame(loop);
    return;
  }
  if (!gameActive) return;
  drawPlayer();
  drawTargets();
  drawShatters();
  drawExplosions();
  drawBullets();
  drawPowerUps();
  drawScore();
  moveBullets();
  moveTargets();
  movePowerUps();
  updateShatters();
  updateExplosions();
  checkCollisions();
  requestAnimationFrame(loop);
}

function moveBullets() {
  if (player.doubleShot > 0) player.doubleShot--;
  bullets.forEach(b => b.y -= 8);
  bullets = bullets.filter(b => b.y > -12);
}

function moveTargets() {
  targets.forEach(t => t.y += targetSpeed + Math.random() * 0.5);
  targets = targets.filter(t => t.y < canvas.height + 40);
  // Move shattering targets
  shatteringTargets.forEach(t => t.y += targetSpeed + Math.random() * 0.5);
  shatteringTargets = shatteringTargets.filter(t => t.y < canvas.height + 40);
  if (targets.length < 6) spawnTargets();
}

function movePowerUps() {
  powerUps.forEach(p => p.y += 2);
  powerUps = powerUps.filter(p => p.y < canvas.height + 40);
}

function drawBackground() {
  ctx.fillStyle = '#181f2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#fff';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
    ctx.fill();
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;
  });
  ctx.restore();
}

function drawScore() {
  ctx.save();
  ctx.font = 'bold 18px Segoe UI';
  ctx.fillStyle = '#ffe066';
  ctx.fillText('Score: ' + score, 16, 28);
  ctx.fillStyle = '#bfe6ff';
  ctx.fillText('Streak: ' + streak, 16, 52);
  ctx.fillStyle = '#ffb300';
  ctx.fillText('Best: ' + bestStreak, 16, 76);
  ctx.restore();
}

function drawPowerUps() {
  powerUps.forEach(p => {
    ctx.font = '28px serif';
    ctx.fillText(p.emoji, p.x, p.y);
  });
}

// Glass shatter effect
function createShatter(x, y) {
  let pieces = [];
  for (let i = 0; i < 18; i++) {
    let angle = (i / 18) * Math.PI * 2;
    pieces.push({
      x, y,
      dx: Math.cos(angle) * (1 + Math.random() * 2),
      dy: Math.sin(angle) * (1 + Math.random() * 2),
      alpha: 1
    });
  }
  return { pieces };
}

function updateShatters() {
  shatters.forEach((s, si) => {
    s.pieces.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.03;
    });
    // Remove shattering target when glass is gone
    if (s.pieces.every(p => p.alpha <= 0) && shatteringTargets[si]) {
      shatteringTargets.splice(si, 1);
    }
  });
  shatters = shatters.filter(s => s.pieces.some(p => p.alpha > 0));
}

// Nuclear explosion effect
function createNuclearExplosion(x, y) {
  let particles = [];
  let colors = ['#fff', '#ffe066', '#ffb300', '#ff4444', '#ff8800', '#f0f0f0', '#e0e0e0'];
  for (let i = 0; i < 80; i++) {
    let angle = Math.random() * Math.PI * 2;
    let speed = 2 + Math.random() * 6;
    let color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x, y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      radius: 8 + Math.random() * 12,
      alpha: 1,
      color
    });
  }
  return { particles, done: false };
}

function updatePlayerExplosion() {
  if (!playerExplosion) return;
  let allGone = true;
  playerExplosion.particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    p.radius *= 0.96;
    p.alpha -= 0.018;
    if (p.alpha > 0.05 && p.radius > 1) allGone = false;
  });
  if (allGone) playerExplosion.done = true;
}

function updateExplosions() {
  explosions.forEach(e => {
    e.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.radius *= 0.95;
      p.alpha -= 0.03;
    });
  });
  explosions = explosions.filter(e => e.particles.some(p => p.alpha > 0 && p.radius > 1));
}

function showQuestion() {
  if (availableQuestions.length === 0) availableQuestions = [...allQuestions];
  // Pick a random question that hasn't been asked yet
  const idx = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[idx];
  availableQuestions.splice(idx, 1);
  questionText.textContent = currentQuestion.q;
  answerInput.value = '';
  clueText.textContent = '';
  clueGiven = false;
  questionModal.style.display = 'flex';
  answerInput.focus();
}

function handleAnswer() {
  let ans = answerInput.value.trim().toLowerCase();
  if (ans === currentQuestion.a) {
    questionModal.style.display = 'none';
    gameActive = true;
    handleHitTarget({});
    // Only reset availableQuestions if ALL have been used and the user just answered the last one
    if (availableQuestions.length === 0) {
      availableQuestions = [...allQuestions];
    }
    spawnTargets();
    loop();
  } else if (!clueGiven) {
    clueText.textContent = 'Clue: ' + currentQuestion.clue;
    clueGiven = true;
  } else {
    clueText.textContent = 'Try again! Clue: ' + currentQuestion.clue;
  }
}


// Controls
startBtn.onclick = resetGame;
document.addEventListener('keydown', e => {
  if (!gameActive) return;
  if (e.key === 'ArrowLeft' && player.x > 0) player.x -= 24;
  if (e.key === 'ArrowRight' && player.x < canvas.width - player.w) player.x += 24;
  if (e.key === ' ' || e.key === 'ArrowUp') {
    if (player.doubleShot > 0) {
      bullets.push({ x: player.x + 6, y: player.y });
      bullets.push({ x: player.x + 30, y: player.y });
    } else {
      bullets.push({ x: player.x + 18, y: player.y });
    }
    playSound('shoot');
  }
});
submitAnswer.onclick = handleAnswer;
answerInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAnswer(); });

// Virtual joystick and shoot button event listeners
if (isMobile() && joystick && shootBtn) {
  let knob = joystick.querySelector('#joystick-knob');
  let center = { x: 45, y: 45 };
  let dragging = false;
  let lastDir = 0;

  function movePlayer(dir) {
    if (!gameActive) return;
    if (dir < 0 && player.x > 0) player.x -= 8;
    if (dir > 0 && player.x < canvas.width - player.w) player.x += 8;
  }

  function onPointerDown(e) {
    dragging = true;
    joystickData.active = true;
    let rect = joystick.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    joystickData.startX = x;
    joystickData.x = x;
    knob.style.transition = 'none';
    if (moveInterval) clearInterval(moveInterval);
    moveInterval = setInterval(() => {
      let dx = joystickData.x - center.x;
      if (Math.abs(dx) > 10) {
        let dir = dx < 0 ? -1 : 1;
        movePlayer(dir);
        lastDir = dir;
      } else {
        lastDir = 0;
      }
    }, 24);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    let rect = joystick.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let dx = Math.max(-35, Math.min(35, x - center.x));
    joystickData.x = center.x + dx;
    knob.style.transform = `translateX(${dx}px)`;
  }
  function onPointerUp(e) {
    dragging = false;
    joystickData.active = false;
    joystickData.x = center.x;
    knob.style.transition = 'transform 0.15s';
    knob.style.transform = 'translateX(0)';
    if (moveInterval) clearInterval(moveInterval);
    lastDir = 0;
  }

  joystick.addEventListener('pointerdown', onPointerDown);
  joystick.addEventListener('pointermove', onPointerMove);
  joystick.addEventListener('pointerup', onPointerUp);
  joystick.addEventListener('pointerleave', onPointerUp);
  joystick.addEventListener('touchstart', onPointerDown);
  joystick.addEventListener('touchmove', onPointerMove);
  joystick.addEventListener('touchend', onPointerUp);
  joystick.addEventListener('touchcancel', onPointerUp);

  // Shoot button
  function shootAction() {
    if (!gameActive) return;
    if (player.doubleShot > 0) {
      bullets.push({ x: player.x + 6, y: player.y });
      bullets.push({ x: player.x + 30, y: player.y });
    } else {
      bullets.push({ x: player.x + 18, y: player.y });
    }
    playSound('shoot');
  }
  let shootInterval = null;
  shootBtn.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    shootAction();
    shootBtn.style.filter = 'brightness(1.5)';
    if (shootInterval) clearInterval(shootInterval);
    shootInterval = setInterval(shootAction, 220);
  });
  shootBtn.addEventListener('pointerup', function(e) {
    e.preventDefault();
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('pointerleave', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('touchend', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
  shootBtn.addEventListener('touchcancel', function(e) {
    clearInterval(shootInterval);
    shootBtn.style.filter = '';
  });
}

// Uploads
playerUpload.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => { playerImg = img; };
  img.src = URL.createObjectURL(file);
};
targetUpload.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => { targetImg = img; };
  img.src = URL.createObjectURL(file);
};

// Accessibility: focus modal input when shown
questionModal.addEventListener('transitionend', () => {
  if (questionModal.style.display === 'flex') answerInput.focus();
});

// Initial message
ctx.font = '20px Segoe UI';
ctx.fillStyle = '#fff';
ctx.fillText('Upload your face and target, then press Start!', 40, canvas.height / 2);

// Gradually increase target speed for challenge
setInterval(() => {
  if (gameActive && targetSpeed < 3.5) targetSpeed += 0.04;
}, 1200);

// Power-ups
let powerUps = [];
const powerUpTypes = [
  { type: 'shield', emoji: '🛡️', effect: () => { player.shield = 1; } },
  { type: 'double', emoji: '💥', effect: () => { player.doubleShot = 200; } },
  { type: 'slow', emoji: '🐢', effect: () => { targetSpeed = Math.max(0.5, targetSpeed * 0.5); setTimeout(() => { targetSpeed = 1.0; }, 4000); } }
];

// Score & Streaks
let score = 0;
let streak = 0;
let bestStreak = 0;

let stars = Array.from({length: 60}, () => ({x: Math.random()*480, y: Math.random()*640, r: Math.random()*1.5+0.5, s: Math.random()*0.7+0.3}));

function handleHitTarget(t) {
  score += 10;
  streak++;
  if (streak > bestStreak) bestStreak = streak;
}

function handleMiss() {
  streak = 0;
}

// Power-up spawn
setInterval(() => {
  if (gameActive && Math.random() < 0.5) {
    const p = powerUpTypes[Math.floor(Math.random()*powerUpTypes.length)];
    powerUps.push({ ...p, x: Math.random() * (canvas.width-40) + 10, y: -30 });
  }
}, 5000);

// Power-up collection
function checkCollisions() {
  // Bullet hits target
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    for (let ti = targets.length - 1; ti >= 0; ti--) {
      const t = targets[ti];
      if (b.x < t.x + t.w && b.x + 4 > t.x && b.y < t.y + t.h && b.y + 12 > t.y) {
        if (t.type === 'question') {
          // Remove the question target and pause for question
          shatters.push(createShatter(t.x + t.w / 2, t.y + t.h / 2));
          shatteringTargets.push({ ...t });
          targets.splice(ti, 1);
          bullets.splice(bi, 1);
          playSound('shatter');
          gameActive = false;
          showQuestion();
          break;
        } else {
          // Glass shatter effect, keep target visible while shattering
          shatters.push(createShatter(t.x + t.w / 2, t.y + t.h / 2));
          shatteringTargets.push({ ...t });
          targets.splice(ti, 1);
          bullets.splice(bi, 1);
          handleHitTarget(t);
          break;
        }
      }
    }
  }
  // Target hits player (nuclear explosion)
  for (let ti = targets.length - 1; ti >= 0; ti--) {
    const t = targets[ti];
    if (
      t.x < player.x + player.w &&
      t.x + t.w > player.x &&
      t.y < player.y + player.h &&
      t.y + t.h > player.y
    ) {
      // Nuclear explosion effect
      playSound('explosion');
      playerExplosion = createNuclearExplosion(player.x + player.w / 2, player.y + player.h / 2);
      gameActive = false;
    }
  }
  // Power-up collection
  for (let pi = powerUps.length - 1; pi >= 0; pi--) {
    const p = powerUps[pi];
    if (
      p.x < player.x + player.w &&
      p.x + 28 > player.x &&
      p.y < player.y + player.h &&
      p.y + 28 > player.y
    ) {
      playSound('powerup');
      p.effect();
      powerUps.splice(pi, 1);
    }
  }
}

// Accessibility: focus modal input when shown
questionModal.addEventListener('transitionend', () => {
  if (questionModal.style.display === 'flex') answerInput.focus();
});

