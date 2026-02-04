const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let brushcolor = "#000000";
let brushsize = 5;

// Set defaults
ctx.lineCap = "round";

// mouse setup
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mouseup", () => drawing=false);
canvas.addEventListener("mouseleave", () => drawing=false);

canvas.addEventListener("mousemove", draw); 

function draw(e) {
  if(!drawing) return;

  ctx.strokeStyle = brushcolor;
  ctx.lineWidth = brushsize;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// color picker
document.getElementById("color").addEventListener("change", e => {
  brushcolor = e.target.value;
});

// brush size
document.getElementById("size").addEventListener("input", e => {
  brushsize = e.target.value;
});

// brush size
document.getElementById("eraser").addEventListener("click", () => {
  brushcolor = "#ffffff";
});

// Clear canvas
document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
