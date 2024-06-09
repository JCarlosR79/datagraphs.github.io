// script.js

// Dimensiones y configuración del primer gráfico
const width1 = 500;
const height1 = 500;
const outerRadius1 = height1 / 2 - 10;
const innerRadius1 = outerRadius1 * 0.75;
const tau1 = 2 * Math.PI;

// Crear contenedor SVG y centrarlo para el primer gráfico
const svg1 = d3.select("#chart1")
    .attr("width", width1)
    .attr("height", height1)
    .append("g")
    .attr("transform", `translate(${width1 / 2}, ${height1 / 2})`);

// Crear escala de colores con tonos azules
const color1 = d3.scaleOrdinal(["#1f77b4", "#aec7e8"]);

// Definir función de arco
const arc1 = d3.arc()
    .innerRadius(innerRadius1)
    .outerRadius(outerRadius1)
    .startAngle(0);

// Datos del gráfico
const data1 = [
    { label: 'A', value: 0.35 },
    { label: 'B', value: 0.65 },
];

// Crear fondo del arco
svg1.append("path")
    .datum({ endAngle: tau1 })
    .style("fill", "white")
    .attr("d", arc1);

// Crear arcos con datos
const arcs1 = svg1.selectAll(".arc")
    .data(data1)
    .enter().append("g")
    .attr("class", "arc");

// Añadir los arcos al gráfico
arcs1.append("path")
    .attr("d", d => arc1({ endAngle: d.value * tau1 }))
    .attr("fill", d => color1(d.label))
    .each(function(d) { this._current = d; })
    .on("mouseover", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", d3.arc()
                .innerRadius(innerRadius1)
                .outerRadius(outerRadius1 + 10)
                .startAngle(0)
                .endAngle(d.value * tau1)
            );
        svg1.append("text")
            .attr("class", "tooltip")
            .attr("x", 0)
            .attr("y", -outerRadius1 - 20)
            .attr("text-anchor", "middle")
            .style("font-family", "Roboto")
            .style("font-size", "14px")
            .style("fill", "#C2E0F2")
            .text(d.label + ": " + (d.value * 100).toFixed(1) + "%");
        
        if (d.label === 'B') {
            svg1.append("text")
                .attr("class", "fixed-tooltip")
                .attr("x", 0)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-family", "Roboto")
                .style("font-size", "20px")
                .style("fill", "white")
                .text("79.4 por ciento");
        }
    })
    .on("mouseout", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", d3.arc()
                .innerRadius(innerRadius1)
                .outerRadius(outerRadius1)
                .startAngle(0)
                .endAngle(d.value * tau1)
            );
        svg1.selectAll(".tooltip").remove();
        svg1.selectAll(".fixed-tooltip").remove();
    });

// Datos del segundo gráfico extraídos de la imagen
const data2 = [
    {"state": "Aguascalientes", "Sin afectación": 7.4, "D0": 37.5, "D1": 16.1, "D2": 12.1, "D3": 26.9, "D4": 0.0},
    {"state": "Baja California", "Sin afectación": 100.0, "D0": 0.0, "D1": 0.0, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "Baja California Sur", "Sin afectación": 100.0, "D0": 0.0, "D1": 0.0, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "Campeche", "Sin afectación": 43.8, "D0": 46.2, "D1": 10.0, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "Coahuila de Zaragoza", "Sin afectación": 33.6, "D0": 13.4, "D1": 36.2, "D2": 14.4, "D3": 2.4, "D4": 0.0},
    {"state": "Colima", "Sin afectación": 99.9, "D0": 0.1, "D1": 0.0, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "Chiapas", "Sin afectación": 0.0, "D0": 38.8, "D1": 51.2, "D2": 10.0, "D3": 0.0, "D4": 0.0},
    {"state": "Chihuahua", "Sin afectación": 0.0, "D0": 0.0, "D1": 1.4, "D2": 28.4, "D3": 25.0, "D4": 45.2},
    {"state": "Ciudad de México", "Sin afectación": 0.0, "D0": 0.0, "D1": 0.3, "D2": 99.7, "D3": 0.0, "D4": 0.0},
    {"state": "Durango", "Sin afectación": 10.1, "D0": 17.5, "D1": 19.0, "D2": 13.7, "D3": 16.4, "D4": 23.3},
    {"state": "Guanajuato", "Sin afectación": 0.0, "D0": 0.0, "D1": 2.9, "D2": 48.2, "D3": 40.9, "D4": 8.0},
    {"state": "Guerrero", "Sin afectación": 33.1, "D0": 48.8, "D1": 15.8, "D2": 2.3, "D3": 0.0, "D4": 0.0},
    {"state": "Hidalgo", "Sin afectación": 0.0, "D0": 0.0, "D1": 3.5, "D2": 18.1, "D3": 43.7, "D4": 34.7},
    {"state": "Jalisco", "Sin afectación": 31.4, "D0": 41.2, "D1": 17.4, "D2": 8.9, "D3": 1.1, "D4": 0.0},
    {"state": "Estado de México", "Sin afectación": 0.0, "D0": 5.1, "D1": 29.3, "D2": 47.5, "D3": 18.1, "D4": 0.0},
    {"state": "Michoacán de Ocampo", "Sin afectación": 16.5, "D0": 19.8, "D1": 10.1, "D2": 25.1, "D3": 28.5, "D4": 0.0},
    {"state": "Morelos", "Sin afectación": 0.0, "D0": 15.1, "D1": 76.1, "D2": 8.8, "D3": 0.0, "D4": 0.0},
    {"state": "Nayarit", "Sin afectación": 9.5, "D0": 55.6, "D1": 20.4, "D2": 14.5, "D3": 0.0, "D4": 0.0},
    {"state": "Nuevo León", "Sin afectación": 49.7, "D0": 25.2, "D1": 18.7, "D2": 5.1, "D3": 1.3, "D4": 0.0},
    {"state": "Oaxaca", "Sin afectación": 20.9, "D0": 12.3, "D1": 17.1, "D2": 38.8, "D3": 10.9, "D4": 0.0},
    {"state": "Puebla", "Sin afectación": 2.4, "D0": 29.5, "D1": 34.4, "D2": 24.2, "D3": 9.5, "D4": 0.0},
    {"state": "Querétaro de Arteaga", "Sin afectación": 0.0, "D0": 0.0, "D1": 3.8, "D2": 47.1, "D3": 49.1, "D4": 0.0},
    {"state": "Quintana Roo", "Sin afectación": 69.8, "D0": 22.9, "D1": 7.3, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "San Luis Potosí", "Sin afectación": 20.3, "D0": 14.7, "D1": 19.1, "D2": 21.6, "D3": 23.4, "D4": 0.0},
    {"state": "Sinaloa", "Sin afectación": 0.0, "D0": 3.8, "D1": 10.4, "D2": 27.9, "D3": 29.8, "D4": 28.1},
    {"state": "Sonora", "Sin afectación": 17.0, "D0": 8.5, "D1": 8.0, "D2": 11.6, "D3": 33.7, "D4": 21.2},
    {"state": "Tabasco", "Sin afectación": 0.0, "D0": 27.6, "D1": 46.1, "D2": 26.3, "D3": 0.0, "D4": 0.0},
    {"state": "Tamaulipas", "Sin afectación": 19.2, "D0": 8.7, "D1": 11.1, "D2": 28.6, "D3": 32.4, "D4": 0.0},
    {"state": "Tlaxcala", "Sin afectación": 0.0, "D0": 69.0, "D1": 24.0, "D2": 7.0, "D3": 0.0, "D4": 0.0},
    {"state": "Veracruz", "Sin afectación": 13.6, "D0": 17.8, "D1": 29.7, "D2": 17.7, "D3": 6.5, "D4": 14.7},
    {"state": "Yucatán", "Sin afectación": 19.1, "D0": 44.2, "D1": 36.7, "D2": 0.0, "D3": 0.0, "D4": 0.0},
    {"state": "Zacatecas", "Sin afectación": 56.2, "D0": 26.3, "D1": 10.5, "D2": 4.9, "D3": 2.1, "D4": 0.0}
  ];

// Dimensiones y configuración del segundo gráfico
const width2 = 0.8 * 928;
const barHeight2 = 12.5;
const marginTop2 = 30;
const marginRight2 = 10;
const marginBottom2 = 0;
const marginLeft2 = 30;

const height2 = series2[0].length * barHeight2 + marginTop2 + marginBottom2;

const x2 = d3.scaleLinear()
    .domain([0, 100])
    .range([marginLeft2, width2 - marginRight2]);

const y2 = d3.scaleBand()
    .domain(data2.map(d => d.state))
    .range([marginTop2, height2 - marginBottom2])
    .padding(0.08);

const color2 = d3.scaleOrdinal(d3.schemeCategory10);

const svg2 = d3.select("#chart2")
    .attr("width", width2)
    .attr("height", height2)
    .attr("viewBox", [0, 0, width2, height2])
    .attr("style", "max-width: 100%; height: auto;");

svg2.selectAll("rect")
    .data(series2.flat())
    .join("rect")
    .attr("x", d => x2(d[0]))
    .attr("y", d => y2(d.data.state) + (y2.bandwidth() - barHeight2) / 2)
    .attr("width", d => x2(d[1]) - x2(d[0]))
    .attr("height", barHeight2)
    .attr("fill", d => color2(d.key))
    .append("title")
    .text(d => `${d.data.state} ${d.key}\n${formatValue2(d[1])}`);

svg2.append("g")
    .attr("transform", `translate(0,${marginTop2})`)
    .call(d3.axisTop(x2).ticks(width2 / 100, "%"))
    .call(g => g.selectAll(".domain").remove());

svg2.append("g")
    .attr("transform", `translate(${marginLeft2},0)`)
    .call(d3.axisLeft(y2).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());
