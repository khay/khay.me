const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d", { alpha: false });
const diskLayer = document.createElement("canvas");
const diskCtx = diskLayer.getContext("2d");
const portrait = document.querySelector("h1 img");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

const STAR_TINTS = ["255,255,255", "186,214,255", "255,224,190"];
const DISK = [
  [0, "#3a120c"],
  [0.14, "#9a3412"],
  [0.3, "#f08a32"],
  [0.44, "#ffe0b0"],
  [0.52, "#fffaf4"],
  [0.6, "#ffd09a"],
  [0.76, "#e07028"],
  [0.9, "#7a2c12"],
  [1, "#3a120c"],
];

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random() ** 2,
  phase: Math.random() * Math.PI * 2,
  tint: Math.random() < 0.12 ? 1 : Math.random() < 0.16 ? 2 : 0,
}));

let width = 0;
let height = 0;
let dpr = 1;
let last = 0;

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  width = innerWidth;
  height = innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  diskLayer.width = canvas.width;
  diskLayer.height = canvas.height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  diskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function hole() {
  const box = portrait.getBoundingClientRect();
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
    r: box.width / 2,
  };
}

function conic(target, spin, x, y, stops) {
  const gradient = target.createConicGradient(spin, x, y);
  for (const [stop, color] of stops) gradient.addColorStop(stop, color);
  return gradient;
}

function paintDisk(target, cx, cy, radius, squash, spin, blur) {
  target.save();
  target.translate(cx, cy);
  target.rotate(-0.04);
  target.scale(1, squash);
  target.filter = blur ? `blur(${blur}px)` : "none";
  target.fillStyle = conic(target, spin, 0, 0, DISK);
  target.beginPath();
  target.arc(0, 0, radius, 0, Math.PI * 2);
  target.fill();
  target.globalCompositeOperation = "destination-in";
  target.filter = "none";
  const fade = target.createRadialGradient(0, 0, radius * 0.04, 0, 0, radius);
  fade.addColorStop(0, "rgba(0,0,0,1)");
  fade.addColorStop(0.62, "rgba(0,0,0,0.85)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  target.fillStyle = fade;
  target.beginPath();
  target.arc(0, 0, radius, 0, Math.PI * 2);
  target.fill();
  target.restore();
}

function lens(cx, cy, radius, spin) {
  ctx.save();
  ctx.translate(cx, cy - radius * 1.35);
  ctx.rotate(-0.04);
  ctx.scale(1.6, 0.42);
  ctx.strokeStyle = conic(ctx, spin, 0, 0, DISK);
  ctx.lineWidth = Math.max(8, radius * 0.22);
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.95;
  ctx.filter = "blur(2px)";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 2.1, Math.PI * 1.12, Math.PI * 1.88);
  ctx.stroke();
  ctx.restore();
}

function drawStars(dt, time) {
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
}

function draw(dt, time) {
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  const center = hole();
  const spin = time * 0.18;
  const reach = Math.max(width, height) * 0.58;

  drawStars(dt, time);
  diskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  diskCtx.clearRect(0, 0, width, height);
  paintDisk(diskCtx, center.x, center.y, reach, 0.18, spin, 10);
  paintDisk(diskCtx, center.x, center.y, reach * 0.9, 0.14, spin, 0);
  ctx.drawImage(diskLayer, 0, 0, width, height);
  lens(center.x, center.y, center.r, spin);

  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(center.x, center.y, center.r, 0, Math.PI * 2);
  ctx.fill();
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
