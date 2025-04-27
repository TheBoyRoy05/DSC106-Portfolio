import { projects } from "../../Utils/info";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {
  upTo?: number;
}

const Projects = ({ upTo = projects.length }: ProjectsProps) => {
  return (
    <div className="flex flex-col items-center ~px-4/12">
      <h2>
        {projects.length} <span className="text-gradient font-medium">Projects</span>
      </h2>
      <div className="flex flex-col items-center gap-10 w-full">
        {projects.slice(-1 * upTo).map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
