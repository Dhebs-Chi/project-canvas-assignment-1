// Canvas and Context
var canvas = document.getElementById('drawing-canvas');
var ctx = canvas.getContext('2d');
// UI Elements
var shapeSelect = document.getElementById('shape-select');
var colorPicker = document.getElementById('color-picker');
var strokeWidthInput = document.getElementById('stroke-width');
var borderRadiusInput = document.getElementById('border-radius');
var saveButton = document.getElementById('save-button');
// Variables
var currentShape = null;
var isDrawing = false;
// Helper Function to draw the shape
function drawShape(shape) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = shape.color;
    ctx.lineWidth = shape.strokeWidth;
    if (shapeSelect.value === 'rectangle') {
        // Draw rectangle with border-radius
        ctx.beginPath();
        ctx.moveTo(shape.x + shape.borderRadius, shape.y);
        ctx.lineTo(shape.x + shape.width - shape.borderRadius, shape.y);
        ctx.quadraticCurveTo(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.borderRadius);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height - shape.borderRadius);
        ctx.quadraticCurveTo(shape.x + shape.width, shape.y + shape.height, shape.x + shape.width - shape.borderRadius, shape.y + shape.height);
        ctx.lineTo(shape.x + shape.borderRadius, shape.y + shape.height);
        ctx.quadraticCurveTo(shape.x, shape.y + shape.height, shape.x, shape.y + shape.height - shape.borderRadius);
        ctx.lineTo(shape.x, shape.y + shape.borderRadius);
        ctx.quadraticCurveTo(shape.x, shape.y, shape.x + shape.borderRadius, shape.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else if (shapeSelect.value === 'circle') {
        // Draw circle
        ctx.beginPath();
        var radius = Math.min(shape.width, shape.height) / 2;
        ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
// Event Listeners
canvas.addEventListener('mousedown', function (e) {
    var rect = canvas.getBoundingClientRect();
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
canvas.addEventListener('mousemove', function (e) {
    if (!isDrawing || !currentShape)
        return;
    var rect = canvas.getBoundingClientRect();
    currentShape.width = e.clientX - rect.left - currentShape.x;
    currentShape.height = e.clientY - rect.top - currentShape.y;
    drawShape(currentShape);
});
canvas.addEventListener('mouseup', function () {
    isDrawing = false;
});
// Slider Listener to Update Border Radius
borderRadiusInput.addEventListener('input', function () {
    if (currentShape && shapeSelect.value === 'rectangle') {
        currentShape.borderRadius = parseInt(borderRadiusInput.value, 10);
        drawShape(currentShape);
    }
});
// Update Color in Real-Time
colorPicker.addEventListener('input', function () {
    if (currentShape) {
        currentShape.color = colorPicker.value;
        drawShape(currentShape);
    }
});
// Update Stroke Width in Real-Time
strokeWidthInput.addEventListener('input', function () {
    if (currentShape) {
        currentShape.strokeWidth = parseInt(strokeWidthInput.value, 10);
        drawShape(currentShape);
    }
});
// Save Button
saveButton.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
