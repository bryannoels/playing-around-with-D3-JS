import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ScatterPlot = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch the data from the JSON file
    axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then(response => {
        const data = response.data;
        const dataset = data.map(item => ({
          seconds: item.Seconds,
          year: new Date(item.Year, 0, 1) // Creating a Date object with January 1st of the given year
        }));

        const w = 800;
        const h = 400;
        const padding = 60;

        const xScale = d3.scaleLinear()
                         .domain([d3.min(dataset, d => d.seconds) - 5, d3.max(dataset, d => d.seconds) + 5])
                         .range([padding, w - padding]);

        const yScale = d3.scaleTime()
                         .domain(d3.extent(dataset, d => d.year))
                         .range([padding, h - padding]);

        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h);

        svg.selectAll("circle")
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", d => xScale(d.seconds))
           .attr("cy", d => yScale(d.year))
           .attr("r", 5)
           .attr("fill", "steelblue");

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%Y"));

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
      <div>Scatter plot</div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ScatterPlot;
