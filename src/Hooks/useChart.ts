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

export function useChart(data: Point[], width = 1000, height = 600) {
  const ref = useRef<SVGSVGElement>(null);
  const [brushData, setBrushData] = useState<BrushData[]>([]);

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 30, left: 40 };

    const [minValue, maxValue] = d3.extent(data, (d) => d.totalLines);
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
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.datetime) as [Date, Date])
      .range([usableArea.left, usableArea.right])
      .nice();

    const yScale = d3.scaleLinear().domain([0, 24]).range([usableArea.bottom, usableArea.top]);

    const colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, 24]);

    const tooltip = d3
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

    svg
      .append("g")
      .attr("class", "gridlines")
      .attr("transform", `translate(${usableArea.left}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(-usableArea.width)
      );

    const dots = svg.append("g").attr("class", "dots");

    dots
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.datetime))
      .attr("cy", (d) => yScale(d.hourFrac))
      .attr("r", (d) => rScale(d.totalLines))
      .attr("fill", (d) => colorScale(d.hourFrac))
      .style("fill-opacity", 0.7)
      .on("mouseenter", (event, data) => {
        d3.select(event.currentTarget).style("fill-opacity", 1);
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            Object.entries(data)
              .filter(([_, value]) => !(value instanceof Object) || value instanceof Date)
              .map(([key, value]) =>
                value instanceof Date ? `${key}: ${value.toLocaleString()}` : `${key}: ${value}`
              )
              .join("<br>")
          )
          .style("left", `${event.clientX + 10}px`)
          .style("top", `${event.clientY + 10}px`);
      })
      .on("mouseleave", () => {
        d3.selectAll("circle").style("fill-opacity", 0.7);
        tooltip.transition().duration(200).style("opacity", 0);
      });

    const brush = d3.brush().on("start brush end", (event) => {
      const selection = event.selection;
      if (!selection) {
        setBrushData([]);
        return;
      }
      const selected = data.filter((d) => isSelected(selection, d));
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

    // Add brush and raise dots above the overlay
    svg.append("g").call(brush);
    svg.selectAll(".dots").raise(); // Ensure dots are on top of the overlay

    function isSelected(selection: [d3.BrushSelection, d3.BrushSelection], data: Point) {
      const [x0, y0] = selection[0] as [number, number];
      const [x1, y1] = selection[1] as [number, number];
      const cx = xScale(data.datetime);
      const cy = yScale(data.hourFrac);
      return cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1;
    }

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${String(d).padStart(2, "0")}:00`);

    svg.append("g").attr("transform", `translate(0, ${usableArea.bottom})`).call(xAxis);

    svg.append("g").attr("transform", `translate(${usableArea.left}, 0)`).call(yAxis);
  }, [data]);

  return { ref, brushData };
}
