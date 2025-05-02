import { useState } from "react";
import { projects } from "../../Utils/info";
import PieChart from "./PieChart";
import ProjectCard from "./ProjectCard";
import Search from "./Search";

const Projects = ({ upTo = projects.length }: { upTo?: number }) => {
  const [year, setYear] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const searchedProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects =
    year === null ? searchedProjects : searchedProjects.filter((project) => project.year === year);

  const projectCountsByYear = searchedProjects.reduce((acc, proj) => {
    acc[proj.year] = (acc[proj.year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const pieData = Object.entries(projectCountsByYear).map(([year, count]) => ({
    year: +year,
    count,
  }));

  return (
    <div className="flex flex-col items-center ~px-4/12">
      <h2>
        {projects.length} <span className="text-gradient font-medium">Projects</span>
      </h2>
      <PieChart year={year} setYear={setYear} data={pieData} />
      <Search setSearch={setSearch} />
      <div className="flex flex-col items-center gap-10 w-full">
        {filteredProjects.slice(-1 * upTo).map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
