const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d", { alpha: false });
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

const STAR_TINTS = ["255,255,255", "186,214,255", "255,224,190"];

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random() ** 2,
  phase: Math.random() * Math.PI * 2,
  tint: Math.random() < 0.12 ? 1 : Math.random() < 0.16 ? 2 : 0,
}));

const meteors = [];

let width = 0;
let height = 0;
let dpr = 1;
let last = 0;
let nextMeteor = 0.6;

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  width = innerWidth;
  height = innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function spawnMeteor() {
  const downward = 0.35 + Math.random() * 0.7;
  const angle = Math.random() < 0.5 ? downward : Math.PI - downward;
  const speed = 700 + Math.random() * 650;
  meteors.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.72,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    duration: 0.4 + Math.random() * 0.45,
    length: 80 + Math.random() * 140,
  });
}

function drawMeteors(dt) {
  ctx.lineCap = "round";
  for (let index = meteors.length - 1; index >= 0; index -= 1) {
    const meteor = meteors[index];
    meteor.life += dt;
    meteor.x += meteor.vx * dt;
    meteor.y += meteor.vy * dt;
    const gone = meteor.life > meteor.duration
      || meteor.x < -220
      || meteor.x > width + 220
      || meteor.y > height + 80;
    if (gone) {
      meteors.splice(index, 1);
      continue;
    }
    const fade = Math.sin((meteor.life / meteor.duration) * Math.PI);
    const speed = Math.hypot(meteor.vx, meteor.vy) || 1;
    const tailX = meteor.x - (meteor.vx / speed) * meteor.length;
    const tailY = meteor.y - (meteor.vy / speed) * meteor.length;
    const streak = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
    streak.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
    streak.addColorStop(0.3, `rgba(186,214,255,${0.4 * fade})`);
    streak.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = streak;
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
  }
}

function draw(dt, time) {
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    if (dt) star.x = (star.x + (0.006 + star.z * 0.02) * dt) % 1;
    const twinkle = reduce.matches
      ? 0.75
      : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * (0.7 + star.z) + star.phase));
    const size = 0.9 + star.z * 1.8;
    ctx.fillStyle = `rgba(${STAR_TINTS[star.tint]},${twinkle})`;
    ctx.beginPath();
    ctx.arc(star.x * width, star.y * height, size, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!dt) {
    meteors.length = 0;
    return;
  }
  if (time > nextMeteor && meteors.length < 3) {
    spawnMeteor();
    nextMeteor = time + 1.4 + Math.random() * 3.2;
  }
  drawMeteors(dt);
}

function frame(now) {
  const time = now / 1000;
  const dt = reduce.matches ? 0 : Math.min(0.05, last ? time - last : 0);
  last = time;
  draw(dt, reduce.matches ? 0 : time);
  if (!reduce.matches) requestAnimationFrame(frame);
}

addEventListener("resize", () => {
  resize();
  draw(0, last);
});

reduce.addEventListener("change", () => {
  if (!reduce.matches) requestAnimationFrame(frame);
});

resize();
requestAnimationFrame(frame);
