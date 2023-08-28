import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const LinePlot = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch the data from the JSON file
    axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => {
        const data = response.data.data;
        const dataset = data.map(item => ({
          date: new Date(item[0]),
          gdp: item[1]
        }));

        const w = 800;
        const h = 400;
        const padding = 60;

        const xScale = d3.scaleTime()
                         .domain([d3.min(dataset, d => d.date), d3.max(dataset, d => d.date)])
                         .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(dataset, d => d.gdp)])
                         .range([h - padding, padding]);

        const line = d3.line()
                       .x(d => xScale(d.date))
                       .y(d => yScale(d.gdp));

        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h);

        svg.append("path")
           .datum(dataset)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-width", 2)
           .attr("d", line);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
           .attr("transform", `translate(0, ${h - padding})`)
           .call(xAxis);

        svg.append("g")
           .attr("transform", `translate(${padding}, 0)`)
           .call(yAxis);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div>Line plot</div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default LinePlot;
