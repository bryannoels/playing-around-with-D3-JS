import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [23, 33, 22, 30, 20, 10, 30, 39];
    const w = 400;
    const h = 400;
    const radius = Math.min(w, h) / 2;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d);

    const arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius);

    const svg = d3.select(svgRef.current)
                  .attr("width", w)
                  .attr("height", h);

    const g = svg.append("g")
                 .attr("transform", `translate(${w / 2},${h / 2})`);

    const arcs = g.selectAll("arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colorScale(i));

    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .text(d => d.data);

  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
}

export default PieChart;
