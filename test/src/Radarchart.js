import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [23, 33, 22, 30, 20, 10, 30, 39];
    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8'];

    const w = 400;
    const h = 400;
    const radius = Math.min(w, h) / 2;
    const numCategories = categories.length;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(svgRef.current)
                  .attr("width", w)
                  .attr("height", h);

    const g = svg.append("g")
                 .attr("transform", `translate(${w / 2},${h / 2})`);

    const angleScale = d3.scaleLinear()
                        .domain([0, numCategories])
                        .range([0, Math.PI * 2]);

    const line = d3.lineRadial()
                   .angle((d, i) => angleScale(i))
                   .radius(d => d)
                   .curve(d3.curveLinearClosed);

    const points = data.map(d => radius * d / 40); // Adjusting the scale of the data

    g.append("path")
     .datum(points)
     .attr("class", "line")
     .attr("d", line)
     .attr("fill", colorScale(0))
     .attr("opacity", 0.5);

    g.selectAll("circle")
     .data(points)
     .enter()
     .append("circle")
     .attr("cx", (d, i) => radius * Math.cos(angleScale(i)) * (d / radius))
     .attr("cy", (d, i) => radius * Math.sin(angleScale(i)) * (d / radius))
     .attr("r", 4)
     .attr("fill", colorScale(1));

    g.selectAll(".label")
     .data(categories)
     .enter()
     .append("text")
     .attr("class", "label")
     .attr("x", (d, i) => radius * 1.15 * Math.cos(angleScale(i)))
     .attr("y", (d, i) => radius * 1.15 * Math.sin(angleScale(i)))
     .text(d => d)
     .style("text-anchor", "middle")
     .style("font-size", "12px");

  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
}

export default RadarChart;
