const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const Xcanvas = canvas.width;
const Ycanvas = canvas.height;
let R = null;

function clearCanvas() {
    ctx.clearRect(0, 0, Xcanvas, Ycanvas);
}

function drawAxes() {
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(Xcanvas / 2, 0);
    ctx.lineTo(Xcanvas / 2, Ycanvas);
    ctx.moveTo(0, Ycanvas / 2);
    ctx.lineTo(Xcanvas, Ycanvas / 2);
    ctx.stroke();
}

function drawShapes() {
    const scale = (Xcanvas / 2) * (R / 5);
    ctx.fillStyle = '#8f2be8';

    // Четверть окружности
    ctx.beginPath();
    ctx.moveTo(Xcanvas / 2, Ycanvas / 2);
    ctx.arc(Xcanvas / 2, Ycanvas / 2, scale, Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // Прямоугольник
    ctx.beginPath();
    ctx.rect(Xcanvas / 2, Ycanvas / 2, scale, scale / 2);
    ctx.closePath();
    ctx.fill();

    // Треугольник
    ctx.beginPath();
        ctx.moveTo(Xcanvas / 2, Ycanvas / 2); // Центр (0, 0)
        ctx.lineTo(Xcanvas / 2 + scale / 2, Ycanvas / 2); // (R/2, 0)
        ctx.lineTo(Xcanvas / 2, Ycanvas / 2 - scale / 2); // (0, R/2)
        ctx.closePath();
        ctx.fill();
}

function drawLabels() {
    const scale = (Xcanvas / 2) * (R / 5);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';

    ctx.fillText('-R', Xcanvas / 2 - scale, Ycanvas / 2 + 20);
    ctx.fillText('-R/2', Xcanvas / 2 - scale / 2, Ycanvas / 2 + 20);
    ctx.fillText('R/2', Xcanvas / 2 + scale / 2, Ycanvas / 2 + 20);
    ctx.fillText('R', Xcanvas / 2 + scale, Ycanvas / 2 + 20);

    ctx.fillText('R', Xcanvas / 2 - 20, Ycanvas / 2 - scale);
    ctx.fillText('R/2', Xcanvas / 2 - 20, Ycanvas / 2 - scale / 2);
    ctx.fillText('-R/2', Xcanvas / 2 - 20, Ycanvas / 2 + scale / 2);
    ctx.fillText('-R', Xcanvas / 2 - 20, Ycanvas / 2 + scale);
}

function drawGraph() {
    if (R === null) return;

    clearCanvas();
    drawAxes();
    drawShapes();
    drawLabels();
}

function drawPoint(xValue, yValue, rValue, status) {
    const canvas = document.getElementById('pointsCanvas');
    const ctx = canvas.getContext('2d');

    const plotX = xValue * 40;
    const plotY = -yValue * 40;

    ctx.beginPath();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.arc(plotX, plotY, 5, 0, 2 * Math.PI);
    if (status) {
            ctx.fillStyle = '#00FF00'; // Зеленая, если точка внутри области
        } else {
            ctx.fillStyle = '#FF0000'; // Красная, если точка вне области
        }
    ctx.fill();
    ctx.resetTransform();
    ctx.closePath();
}