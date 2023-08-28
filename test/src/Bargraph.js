import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch the data from the JSON file
    axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => {
        const data = response.data.data;
        const dataset = data.map(item => item[1]);

        const w = 800;
        const h = 400;
        const padding = 60;

        const xScale = d3.scaleLinear()
                         .domain([0, dataset.length - 1])
                         .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(dataset)])
                         .range([h - padding, padding]);

        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h);

        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", (d, i) => xScale(i))
           .attr("y", (d) => yScale(d))
           .attr("width", (w - 2 * padding) / dataset.length)
           .attr("height", (d) => h - yScale(d) - padding)
           .attr("fill", "steelblue");

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
        <div>BarGraph</div>
        <svg ref={svgRef}></svg>
    </div>
  );
}

export default BarGraph;
