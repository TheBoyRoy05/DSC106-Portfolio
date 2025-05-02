import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartProps {
  year: number | null;
  data: { year: number; count: number }[];
  setYear: React.Dispatch<React.SetStateAction<number | null>>;
}

const PieChart = ({ year, setYear, data }: PieChartProps) => {
  const ref = useRef<SVGSVGElement>(null!);
  const palette = d3.schemeCategory10.slice(1);

  const color = (year: number) => {
    const hash = year
      .toString()
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return palette[hash % palette.length];
  };

  const setBrightness = (d: d3.PieArcDatum<{ year: number; count: number }>) =>
    year == null ? "brightness(1)" : d.data.year === year ? "brightness(1.25)" : "brightness(0.5)";

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
  
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    if (data.length === 0) {
      g.append("circle")
        .attr("r", radius)
        .attr("fill", "#ccc");
      return;
    }
  
    const pie = d3
      .pie<{ year: number; count: number }>()
      .value((d) => d.count)
      .sort(null);
  
    const arc = d3
      .arc<d3.PieArcDatum<{ year: number; count: number }>>()
      .innerRadius(0)
      .outerRadius(radius);
  
    const paths = g
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.year))
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this).transition().duration(200).style("filter", "brightness(1.25)");
      })
      .on("mouseout", function (_, d) {
        d3.select(this).transition().duration(200).style("filter", setBrightness(d));
      })
      .on("click", (_, d) => setYear(year === d.data.year ? null : d.data.year));
  
    paths.transition().duration(200).style("filter", setBrightness);
    paths.append("title").text((d) => `${d.data.year}: ${d.data.count} project(s)`);
  }, [color, data, year]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
      <svg ref={ref} />
      <ul className={`grid gap-y-4 gap-x-10 border border-[--border-color] min-w-[350px] p-4 rounded-xl ${data.length ? "grid-cols-3" : ""}`}>
        {data.length ? (
          data.map(({ year, count }, index) => (
            <li key={index} className="flex items-center gap-2">
              <span
                className="size-3 min-w-3 rounded-full inline-block"
                style={{ backgroundColor: color(year) }}
              />
              <span className="text-black dark:text-white">{year}</span>
              <em>({count})</em>
            </li>
          ))
        ) : (
          <span className="text-black dark:text-white text-center w-full">No data</span>
        )}
      </ul>
    </div>
  );
};

export default PieChart;
