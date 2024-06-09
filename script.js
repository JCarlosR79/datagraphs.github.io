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
    { label: 'A', value: 0.35 }, // Asegúrate de que los valores estén en formato decimal (0-1)
    { label: 'B', value: 0.65 },
];

// Crear fondo del arco
svg1.append("path")
    .datum({ endAngle: tau1 })
    .style("fill", "white") // Color azul para el fondo del arco
    .attr("d", arc1);

// Crear arcos con datos
const arcs1 = svg1.selectAll(".arc")
    .data(data1)
    .enter().append("g")
    .attr("class", "arc");

// Añadir los arcos al gráfico
arcs1.append("path")
    .attr("d", d => arc1({ endAngle: d.value * tau1 }))
    .attr("fill", d => color1(d.label)) // Usar la escala de colores azules
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
            .style("fill", "#C2E0F2") // Color azul claro para el texto del tooltip
            .text(d.label + ": " + (d.value * 100).toFixed(1) + "%");
        
        // Añadir una etiqueta fija con "79.4 por ciento" cuando el ratón está sobre el gráfico
        if (d.label === 'B') {
            svg1.append("text")
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
                .innerRadius(innerRadius1)
                .outerRadius(outerRadius1)
                .startAngle(0)
                .endAngle(d.value * tau1)
            );
        svg1.selectAll(".tooltip").remove();
        svg1.selectAll(".fixed-tooltip").remove();
    });

// Configuración del segundo gráfico
const data2 = [
  { state: "Aguascalientes", age: "0-5", population: 30418 },
  { state: "Aguascalientes", age: "6-18", population: 123312 },
  { state: "Aguascalientes", age: "19-65", population: 701202 },
  { state: "Aguascalientes", age: "65+", population: 85032 },
  // Agrega más datos aquí
];

// Dimensiones y configuración del segundo gráfico
const width2 = 928;
const marginTop2 = 30;
const marginRight2 = 10;
const marginBottom2 = 0;
const marginLeft2 = 30;

// Determinar las series que necesitan ser apiladas
const series2 = d3.stack()
    .keys(d3.union(data2.map(d => d.age))) // claves de series distintas, en el orden de entrada
    .value(([, D], key) => D.get(key).population) // obtener valor para cada clave de serie y apilar
  (d3.index(data2, d => d.state, d => d.age)); // agrupar por pila luego clave de serie

// Calcular la altura a partir del número de pilas
const height2 = series2[0].length * 25 + marginTop2 + marginBottom2;

// Preparar las escalas para las codificaciones posicionales y de color
const x2 = d3.scaleLinear()
    .domain([0, d3.max(series2, d => d3.max(d, d => d[1]))])
    .range([marginLeft2, width2 - marginRight2]);

const y2 = d3.scaleBand()
    .domain(d3.groupSort(data2, D => -d3.sum(D, d => d.population), d => d.state))
    .range([marginTop2, height2 - marginBottom2])
    .padding(0.08);

const color2 = d3.scaleOrdinal()
    .domain(series2.map(d => d.key))
    .range(d3.schemeSpectral[series2.length])
    .unknown("#ccc");

// Función para formatear el valor en la tooltip
const formatValue2 = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

// Crear el contenedor SVG
const svg2 = d3.select("#chart2")
    .attr("width", width2)
    .attr("height", height2)
    .attr("viewBox", [0, 0, width2, height2])
    .attr("style", "max-width: 100%; height: auto;");

// Añadir un grupo para cada serie y un rectángulo para cada elemento en la serie
svg2.append("g")
  .selectAll()
  .data(series2)
  .join("g")
    .attr("fill", d => color2(d.key))
  .selectAll("rect")
  .data(D => D.map(d => (d.key = D.key, d)))
  .join("rect")
    .attr("x", d => x2(d[0]))
    .attr("y", d => y2(d.data[0]))
    .attr("height", y2.bandwidth())
    .attr("width", d => x2(d[1]) - x2(d[0]))
  .append("title")
    .text(d => `${d.data[0]} ${d.key}\n${formatValue2(d.data[1].get(d.key).population)}`);

// Añadir el eje horizontal
svg2.append("g")
    .attr("transform", `translate(0,${marginTop2})`)
    .call(d3.axisTop(x2).ticks(width2 / 100, "s"))
    .call(g => g.selectAll(".domain").remove());

// Añadir el eje vertical
svg2.append("g")
    .attr("transform", `translate(${marginLeft2},0)`)
    .call(d3.axisLeft(y2).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());
