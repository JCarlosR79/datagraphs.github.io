// Datos del gráfico
const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 70 },
    { label: 'C', value: 45 },
    { label: 'D', value: 85 }
];

// Obtener el SVG
const svg = document.querySelector('svg');
const total = data.reduce((acc, val) => acc + val.value, 0);
let cumulativeValue = 0;

// Crear las secciones del gráfico
data.forEach((d, i) => {
    const sliceAngle = (d.value / total) * 360;
    const [startX, startY] = getCoordinatesForAngle(cumulativeValue);
    cumulativeValue += sliceAngle;
    const [endX, endY] = getCoordinatesForAngle(cumulativeValue);
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    const pathData = [
        `M 16 16`,
        `L ${startX} ${startY}`,
        `A 16 16 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
    ].join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', getRandomColor());
    path.classList.add('slice');
    svg.appendChild(path);
});

// Obtener las coordenadas para un ángulo dado
function getCoordinatesForAngle(angle) {
    const x = 16 + 16 * Math.cos((angle - 90) * Math.PI / 180);
    const y = 16 + 16 * Math.sin((angle - 90) * Math.PI / 180);
    return [x, y];
}

// Generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}