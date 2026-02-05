const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let brushcolor = "#000000";
let brushsize = 5;
let tool = "brush";

// Set defaults
ctx.lineCap = "round";

function startStroke(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// mouse setup
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  startStroke(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => drawing=false);
canvas.addEventListener("mouseleave", () => drawing=false);
canvas.addEventListener("mousemove", draw); 

const PEN_KEY = "x";
let penKeyActive = false;

window.addEventListener("keydown", (e) => {
  if (e.key !== PEN_KEY || penKeyActive) return;
  e.preventDefault();
  penKeyActive = true;
  drawing = true;

  // If the mouse is already over the canvas, start the stroke at that point.
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Guard against clicks outside the canvas (mouse may be elsewhere)
  if (
    mouseX >= 0 && mouseX <= canvas.width &&
    mouseY >= 0 && mouseY <= canvas.height
  ) {
    startStroke(mouseX, mouseY);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key !== PEN_KEY) return;
  penKeyActive = false;
  drawing = false;
});

/* Reset drawing if the window loses focus (e.g., Alt‑Tab) */
window.addEventListener("blur", () => {
  penKeyActive = false;
  drawing = false;
});


document.querySelectorAll(".toolbar button").forEach(btn => {
  btn.addEventListener("click", () => {
    tool = btn.dataset.tool;
    document.querySelectorAll(".toolbar button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = brushsize;

  if (tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = brushcolor;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}


// color picker
document.getElementById("color").addEventListener("change", e => {
  brushcolor = e.target.value;
});

// brush size
document.getElementById("size").addEventListener("input", e => {
  brushsize = e.target.value;
});


// Clear canvas
document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const undoStack = [];
const maxUndo = 20; // limit memory usage

function pushUndo() {
  if (undoStack.length >= maxUndo) undoStack.shift();
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Call after each completed stroke
canvas.addEventListener("mouseup", () => {
  drawing = false;
  pushUndo();
});

// Undo button
document.getElementById("undo").addEventListener("click", () => {
  if (undoStack.length) {
    const img = undoStack.pop();
    ctx.putImageData(img, 0, 0);
  }
});
