// Canvas and Context
const canvas = document.getElementById('drawing-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// UI Elements
const shapeSelect = document.getElementById('shape-select') as HTMLSelectElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
const strokeWidthInput = document.getElementById('stroke-width') as HTMLInputElement;
const borderRadiusInput = document.getElementById('border-radius') as HTMLInputElement;
const saveButton = document.getElementById('save-button') as HTMLButtonElement;

// Interfaces for Shape
interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
  borderRadius: number;
}

// Variables
let currentShape: Shape | null = null;
let isDrawing = false;

// Helper Function to draw the shape
function drawShape(shape: Shape) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  ctx.fillStyle = shape.color;
  ctx.lineWidth = shape.strokeWidth;

  if (shapeSelect.value === 'rectangle') {
    // Draw rectangle with border-radius
    ctx.beginPath();
    ctx.moveTo(shape.x + shape.borderRadius, shape.y);
    ctx.lineTo(shape.x + shape.width - shape.borderRadius, shape.y);
    ctx.quadraticCurveTo(
      shape.x + shape.width, shape.y,
      shape.x + shape.width, shape.y + shape.borderRadius
    );
    ctx.lineTo(shape.x + shape.width, shape.y + shape.height - shape.borderRadius);
    ctx.quadraticCurveTo(
      shape.x + shape.width, shape.y + shape.height,
      shape.x + shape.width - shape.borderRadius, shape.y + shape.height
    );
    ctx.lineTo(shape.x + shape.borderRadius, shape.y + shape.height);
    ctx.quadraticCurveTo(
      shape.x, shape.y + shape.height,
      shape.x, shape.y + shape.height - shape.borderRadius
    );
    ctx.lineTo(shape.x, shape.y + shape.borderRadius);
    ctx.quadraticCurveTo(
      shape.x, shape.y,
      shape.x + shape.borderRadius, shape.y
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (shapeSelect.value === 'circle') {
    // Draw circle
    ctx.beginPath();
    const radius = Math.min(shape.width, shape.height) / 2;
    ctx.arc(
      shape.x + shape.width / 2,
      shape.y + shape.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

// Event Listeners
canvas.addEventListener('mousedown', (e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  currentShape = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    width: 0,
    height: 0,
    color: colorPicker.value,
    strokeWidth: parseInt(strokeWidthInput.value, 10),
    borderRadius: parseInt(borderRadiusInput.value, 10),
  };
  isDrawing = true;
});

canvas.addEventListener('mousemove', (e: MouseEvent) => {
  if (!isDrawing || !currentShape) return;

  const rect = canvas.getBoundingClientRect();
  currentShape.width = e.clientX - rect.left - currentShape.x;
  currentShape.height = e.clientY - rect.top - currentShape.y;

  drawShape(currentShape);
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Slider Listener to Update Border Radius
borderRadiusInput.addEventListener('input', () => {
  if (currentShape && shapeSelect.value === 'rectangle') {
    currentShape.borderRadius = parseInt(borderRadiusInput.value, 10);
    drawShape(currentShape);
  }
});

// Update Color in Real-Time
colorPicker.addEventListener('input', () => {
  if (currentShape) {
    currentShape.color = colorPicker.value;
    drawShape(currentShape);
  }
});

// Update Stroke Width in Real-Time
strokeWidthInput.addEventListener('input', () => {
  if (currentShape) {
    currentShape.strokeWidth = parseInt(strokeWidthInput.value, 10);
    drawShape(currentShape);
  }
});

// Save Button
saveButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'canvas-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
