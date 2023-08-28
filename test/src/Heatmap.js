import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HeatMap = () => {
  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = 450 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    // Remove any existing SVG elements with the same ID
    d3.select("#my_dataviz svg").remove();

    // Append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns
    const myGroups = ["1753", "1754", "1755", "1756", "1757", "1758", "1759", "1760", "1761", "1762"];
    const myVars = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Build X scales and axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.01);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Build Y scales and axis
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(myVars)
      .padding(0.01);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Build color scale
    const myColor = d3.scaleLinear()
      .range(["white", "#69b3a2"])
      .domain([-10, 10]);

    // Read the data
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
      .then(data => {
        const baseTemperature = data.baseTemperature;
        const monthlyVariance = data.monthlyVariance;
        svg.selectAll()
          .data(monthlyVariance, function (d) { return d.year + ':' + d.month; })
          .enter()
          .append("rect")
          .attr("x", function (d) { return x(d.year.toString()); })
          .attr("y", function (d) { return y(d3.timeFormat("%b")(new Date(2000, d.month - 1))); }) // Use %b for abbreviated month name
          .attr("width", x.bandwidth())
          .attr("height", y.bandwidth())
          .style("fill", function (d) { return myColor(d.variance+baseTemperature); })
          .style("stroke-width", 0.5)
          .style("stroke", "black");
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

  }, []);

  return (
    <div id="my_dataviz"></div>
  );
}

export default HeatMap;
