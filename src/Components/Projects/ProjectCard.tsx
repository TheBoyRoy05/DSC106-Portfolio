/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowRight } from "react-icons/fa6";
import Frame from "../Other/Frame";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
  name: string;
  year: number;
  description: string;
  image?: string;
  link?: string;
  props?: any;
}

const ProjectCard = ({ name, year, description, image, link, props }: ProjectProps) => {
  const navigate = useNavigate();

  return (
    <Frame midClass="w-[clamp(350px,72.5vw,1500px)]" {...props}>
      <div className="glare w-1/3" />
      <div
        className={`w-full ~pt-2/6 ~px-2/6 pb-0 border border-[--border-color] rounded-2xl frame-bg group hover:cursor-pointer`}
        onClick={link ? () => navigate(link) : undefined}
      >
        <div className="frame-content flex-col overflow-hidden">
          <div className="flex items-center justify-between ~text-lg/3xl font-bold text-white">
            <h3 className="~mb-2/4 text-shadow">{name}</h3>
            <FaArrowRight />
          </div>
          <p className="text-white ~text-xs/base font-bold mb-[3vw]">
            <span className="text-white">{year}</span>
            {` — ${description}`}
          </p>

          <div className="skeleton w-full aspect-video rounded-xl group-hover:-translate-y-4 ~-mb-2/8 transition-all duration-300">
            <img
              src={image}
              className="border border-slate-500 rounded-xl size-full"
              onError={(e) => (e.currentTarget.style.display = "none")}
              onLoad={(e) => (e.currentTarget.style.display = "block")}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default ProjectCard;
