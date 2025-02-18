function validateForm() {
    const xSelection = document.querySelector('.xSelection input:checked');
    const yValue = parseFloat(document.querySelector('.ySelection').value);
    const rSelection = document.querySelector('.rSelection input:checked');

    if (!xSelection) {
        alert("Выберите значение X!");
        return false;
    }
    const xValue = parseFloat(xSelection.value);
    if (!checkX(xValue)) {
        alert("Значение X должно быть одним из: -4, -3, -2, -1, 0, 1, 2");
        return false;
    }

    if (isNaN(yValue) || !checkY(yValue)) {
        alert("Значение Y должно быть числом в диапазоне от -3 до 3");
        return false;
    }

    if (!rSelection) {
        alert("Выберите значение R!");
        return false;
    }
    const rValue = parseFloat(rSelection.value);
    if (!checkR(rValue)) {
        alert("Значение R должно быть одним из: 1, 1.5, 2, 2.5, 3");
        return false;
    }

    return true;
}

document.querySelector(".ySelection").addEventListener("input", function (e) {
    let value = e.target.value;
    if (!/^-?\d*\.?\d{0,10}$/.test(value)) {
        e.target.value = value.slice(0, -1);
    }
});

document.querySelectorAll('.rSelection input').forEach(radio => {
    radio.addEventListener('change', (event) => {
        R = Number(event.target.value);
        drawGraph();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const rSelectionElement = document.querySelector('.rSelection');
    R = Number(rSelectionElement.querySelector('input:checked')?.value || 1);
    drawGraph();
});

canvas.addEventListener('click', function (event) {
    let rSelection = document.querySelector('.rSelection input:checked');
    if (!rSelection || !checkR(parseFloat(rSelection.value))) {
        alert("Выберите радиус!");
        return;
    }

    const rValue = parseFloat(rSelection.value);
    const rect = canvas.getBoundingClientRect();
    const xClick = event.clientX - rect.left;
    const yClick = event.clientY - rect.top;

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const scale = canvasCenterX / 5;

    const xValue = (xClick - canvasCenterX) / scale;
    const yValue = -(yClick - canvasCenterY) / scale;

    document.querySelector('.ySelection').value = yValue.toFixed(2);

    const allowedXValues = [-4, -3, -2, -1, 0, 1, 2];
    let nearestX = allowedXValues[0];
    let minDistance = Math.abs(xValue - nearestX);

    allowedXValues.forEach(value => {
        const distance = Math.abs(xValue - value);
        if (distance < minDistance) {
            minDistance = distance;
            nearestX = value;
        }
    });

    const xRadios = document.querySelectorAll('.xSelection input');
    xRadios.forEach(radio => {
        if (parseFloat(radio.value) === nearestX) {
            radio.checked = true;
        }
    });

    if (validateForm()) {
        document.querySelector('.submitButton').click();
        handleResult(nearestX, yValue, rValue);
    }
});

function processButtons() {
    const xSelection = document.querySelector('.xSelection input:checked');
    if (!xSelection) {
        alert("Выберите значение X!");
        return false;
    }

    const xValue = parseFloat(xSelection.value);
    const yValue = parseFloat(document.querySelector('.ySelection').value);
    const rValue = parseFloat(document.querySelector('.rSelection').value);

    if (validateForm()) {
        handleResult(xValue, yValue, rValue);
    }
}

function handleResult(xValue, yValue, rValue) {
    setTimeout(() => {
        const tableRows = document.querySelectorAll("#table tbody tr");
        const lastRow = tableRows[tableRows.length - 1];
        const cell = lastRow.querySelectorAll("td")[3];
        const status = cell.textContent.trim() === "Попадание";
        drawPoint(xValue, yValue, rValue, status);
    }, 300);
}

function checkY(value) {
    return (-3 <= value && value <= 3);
}

function checkR(value) {
    return [1, 1.5, 2, 2.5, 3].includes(parseFloat(value));
}

function checkX(value) {
    return [-4, -3, -2, -1, 0, 1, 2].includes(parseFloat(value));
}

function badMessage(message) {
    let RequestStatus = document.querySelector(".status");
    RequestStatus.innerHTML = '';

    if (!RequestStatus.querySelector("h2")) {
        let statusText = document.createElement("h2");
        statusText.textContent = message;
        RequestStatus.style.color = "red";
        RequestStatus.classList.add('visible');
        RequestStatus.appendChild(statusText);
    }
}

document.querySelector('.submitButton').addEventListener('click', function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});