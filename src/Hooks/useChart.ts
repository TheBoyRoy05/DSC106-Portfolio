import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { round } from "../Utils/functions";

type Point = {
  id: string;
  datetime: Date;
  totalLines: number;
  hourFrac: number;
  lines: { type: string }[];
};

type BrushData = {
  language: string;
  count: number;
  percent: number;
};

export function useChart(points: Point[], maxTime?: Date | null, width = 1000, height = 600) {
  const ref = useRef<SVGSVGElement>(null);
  const [numSelected, setNumSelected] = useState(0);
  const [brushData, setBrushData] = useState<BrushData[]>([]);
  const prevPointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 30, left: 40 };

    // Filter points based on maxTime if provided
    const filteredPoints = maxTime ? points.filter(d => d.datetime <= maxTime) : points;

    const [minValue, maxValue] = d3.extent(filteredPoints, (d) => d.totalLines);
    const rScale = d3
      .scaleSqrt()
      .domain([minValue ?? 0, maxValue ?? 0])
      .range([3, 30]);

    const usableArea = {
      top: margin.top,
      right: width - margin.right,
      bottom: height - margin.bottom,
      left: margin.left,
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom,
    };

    const svg = d3
      .select(ref.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("overflow", "visible");

    // Only clear everything if this is the first render
    if (prevPointsRef.current.length === 0) {
      svg.selectAll("*").remove();
    }

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredPoints, (d) => d.datetime) as [Date, Date])
      .range([usableArea.left, usableArea.right])
      .nice();

    const yScale = d3.scaleLinear().domain([0, 24]).range([usableArea.bottom, usableArea.top]);

    const colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, 24]);

    // Create tooltip if it doesn't exist
    let tooltip = d3.select<HTMLDivElement, unknown>(".tooltip");
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "#fff")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);
    }

    // Create or update gridlines
    let gridlines = svg.select<SVGGElement>(".gridlines");
    if (gridlines.empty()) {
      gridlines = svg
        .append("g")
        .attr("class", "gridlines")
        .attr("transform", `translate(${usableArea.left}, 0)`);
    }
    gridlines
      .transition()
      .duration(250)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(-usableArea.width)
      );

    // Create or update dots
    let dots = svg.select<SVGGElement>(".dots");
    if (dots.empty()) {
      dots = svg.append("g").attr("class", "dots");
    }

    const dotsUpdate = dots
      .selectAll<SVGCircleElement, Point>("circle")
      .data(filteredPoints, (d: Point) => d.id);

    // Remove old dots
    dotsUpdate
      .exit()
      .transition()
      .duration(250)
      .attr("r", 0)
      .remove();

    // Add new dots
    const dotsEnter = dotsUpdate
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.datetime))
      .attr("cy", (d) => yScale(d.hourFrac))
      .attr("r", 0)
      .attr("fill", (d) => colorScale(d.hourFrac))
      .style("fill-opacity", 0.7)
      .on("mouseenter", (event, data) => {
        d3.select(event.currentTarget).style("fill-opacity", 1);
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            Object.entries(data)
              .filter(([, value]) => !(value instanceof Object) || value instanceof Date)
              .map(([key, value]) =>
                value instanceof Date ? `${key}: ${value.toLocaleString()}` : `${key}: ${value}`
              )
              .join("<br>")
          )
          .style("left", `${event.clientX + 10}px`)
          .style("top", `${event.clientY + 10}px`);
      })
      .on("mousemove", (event) => tooltip.style("left", `${event.clientX + 10}px`).style("top", `${event.clientY + 10}px`))
      .on("mouseleave", () => {
        d3.selectAll("circle").style("fill-opacity", 0.7);
        tooltip.transition().duration(200).style("opacity", 0);
      })
      .transition()
      .duration(250)
      .attr("r", (d) => rScale(d.totalLines));

    // Update all dots
    dotsUpdate
      .merge(dotsEnter)
      .transition()
      .duration(250)
      .attr("cx", (d) => xScale(d.datetime))
      .attr("cy", (d) => yScale(d.hourFrac))
      .attr("r", (d) => rScale(d.totalLines));

    // Create or update brush
    let brushGroup = svg.select<SVGGElement>(".brush");
    if (brushGroup.empty()) {
      brushGroup = svg.append("g").attr("class", "brush");
    }

    const brush = d3.brush<unknown>().on("start brush end", (event) => {
      const selection = event.selection;
      if (!selection) {
        setBrushData([]);
        return;
      }
      const selected = filteredPoints.filter((d) => isSelected(selection, d));
      setNumSelected(selected.length);
      const lines = selected.flatMap((d) => d.lines);
      const breakdown = d3.rollup(
        lines,
        (v) => v.length,
        (d) => d.type
      );
      const formattedBreakdown = Array.from(breakdown, ([language, count]) => ({
        language,
        count,
        percent: round(count / lines.length * 100),
      }));
      setBrushData(formattedBreakdown);
    });

    brushGroup.call(brush);
    svg.selectAll(".dots").raise();

    function isSelected(selection: [d3.BrushSelection, d3.BrushSelection], data: Point) {
      const [x0, y0] = selection[0] as [number, number];
      const [x1, y1] = selection[1] as [number, number];
      const cx = xScale(data.datetime);
      const cy = yScale(data.hourFrac);
      return cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1;
    }

    // Create or update axes
    let xAxisGroup = svg.select<SVGGElement>(".x-axis");
    if (xAxisGroup.empty()) {
      xAxisGroup = svg.append("g").attr("class", "x-axis");
    }
    xAxisGroup
      .attr("transform", `translate(0, ${usableArea.bottom})`)
      .transition()
      .duration(250)
      .call(d3.axisBottom(xScale));

    let yAxisGroup = svg.select<SVGGElement>(".y-axis");
    if (yAxisGroup.empty()) {
      yAxisGroup = svg.append("g").attr("class", "y-axis");
    }
    yAxisGroup
      .attr("transform", `translate(${usableArea.left}, 0)`)
      .transition()
      .duration(250)
      .call(d3.axisLeft(yScale).tickFormat((d) => `${String(d).padStart(2, "0")}:00`));

    // Store current points for next update
    prevPointsRef.current = filteredPoints;
  }, [points, maxTime]);

  return { ref, brushData, numSelected };
}
