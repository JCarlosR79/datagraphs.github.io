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

// Crear escala de colores con tonos azules
const color = d3.scaleOrdinal(["#C2E0F2", "#42778C"]);

// Definir función de arco
const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);

// Datos del gráfico
const data = [
    { label: 'A', value: 0.21 }, // Asegúrate de que los valores estén en formato decimal (0-1)
    { label: 'B', value: 0.79 },
];

// Crear fondo del arco
svg.append("path")
    .datum({ endAngle: tau })
    .style("fill", "white") // Color para el fondo del arco
    .attr("d", arc);

// Crear arcos con datos
const arcs = svg.selectAll(".arc")
    .data(data)
    .enter().append("g")
    .attr("class", "arc");

// Añadir los arcos al gráfico
arcs.append("path")
    .attr("d", d => arc({ endAngle: d.value * tau }))
    .attr("fill", d => color(d.label)) // Usar la escala de colores azules
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
            .style("fill", "#Withe") // Color para el texto del tooltip
            .text(d.label + ": " + (d.value * 100).toFixed(1) + "%");
        
        // Añadir una etiqueta fija con "79.4 por ciento" cuando el ratón está sobre el gráfico
        if (d.label === 'B') {
            svg.append("text")
                .attr("class", "fixed-tooltip")
                .attr("x", 0)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-family", "Roboto")
                .style("font-size", "20px")
                .style("fill", "white") // Color de la etiqueta fija
                .text("79.4 por ciento");
        }
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
        svg.selectAll(".fixed-tooltip").remove();
    });