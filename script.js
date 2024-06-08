// script.js

// Dimensiones y configuración del gráfico
const width = 500;
const height = 500;
const outerRadius = height / 2 - 10;
const innerRadius = outerRadius * 0.75;
const tau = 2 * Math.PI;

// Crear contenedor SVG y centrarlo
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Crear escala de colores
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Definir función de arco
const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);

// Datos del gráfico
const data = [
    { label: 'A', value: 0.3 },
    { label: 'B', value: 0.7 },
    { label: 'C', value: 0.45 },
    { label: 'D', value: 0.85 }
];

// Crear fondo del arco
svg.append("path")
    .datum({ endAngle: tau })
    .style("fill", "#ddd")
    .attr("d", arc);

// Crear arcos con datos
const arcs = svg.selectAll(".arc")
    .data(data)
    .enter().append("g")
    .attr("class", "arc");

// Añadir los arcos al gráfico
arcs.append("path")
    .attr("d", d => arc({ endAngle: d.value * tau }))
    .attr("fill", d => color(d.label))
    .each(function(d) { this._current = d; })
    .on("mouseover", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius + 10)
                .startAngle(0)
                .endAngle(d.value * tau)
            );
        svg.append("text")
            .attr("class", "tooltip")
            .attr("x", 0)
            .attr("y", -outerRadius - 20)
            .attr("text-anchor", "middle")
            .style("font-family", "Roboto")
            .style("font-size", "14px")
            .style("fill", "#C2E0F2")
            .text(d.label + ": " + (d.value * 100).toFixed(1) + "%");
    })
    .on("mouseout", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .endAngle(d.value * tau)
            );
        svg.selectAll(".tooltip").remove();
    });