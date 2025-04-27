import { useEffect, useRef, useState } from "react";
import Page from "../Page/Page";
import SectionCard from "./Section/SectionCard";
import { FaGraduationCap } from "react-icons/fa";
import SectionList from "./Section/SectionList";
import { courses, projects, experience, skills } from "../../Utils/info";
import SectionHeader from "./Section/SectionHeader";
import ProjectCard from "../Projects/ProjectCard";

const ResumePage = () => {
  const coursesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const contents = {
    Courses: coursesRef,
    Projects: projectsRef,
    Experience: experienceRef,
    Skills: skillsRef,
    Stats: statsRef,
  };

  const [stats, setStats] = useState({
    Followers: 0,
    Following: 0,
    "Public Repos": 0,
    "Public Gists": 0,
  });

  const getStats = async () => {
    const stats = await fetch("https://api.github.com/users/TheBoyRoy05", {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const { followers, following, public_repos, public_gists } = await stats.json();
    setStats({
      Followers: followers,
      Following: following,
      "Public Repos": public_repos,
      "Public Gists": public_gists,
    });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Page contents={contents} color="#00639b80">
      <h2 className="~mb-12/20">
        <span className="text-gradient font-medium">Resume</span>
      </h2>

      <div className="flex-col w-[80vw] md:w-[60vw]">
        <div id="algorithms" ref={coursesRef} className="flex-col items-center gap-12">
          <SectionCard
            color="#7dd3fc"
            symbol={<FaGraduationCap />}
            title="UCSD"
            text="Course Work"
            className="w-full min-w-[325px]"
          />

          <div className="hidden lg:flex gap-10">
            <SectionList items={courses.slice(0, 4)} color={"#7dd3fc"} className="flex-1" />
            <SectionList items={courses.slice(4, 8)} color={"#7dd3fc"} className="flex-1" />
          </div>
          <SectionList items={courses} color={"#7dd3fc"} className="lg:hidden" />
        </div>

        <div className="divider ~py-8/20" />

        <div id="projects" ref={projectsRef} className="flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-10 w-full">
            {projects.slice(-3).map((project, index) => (
              <ProjectCard key={index} {...project} props={{ midClass: "w-full min-w-[325px]" }} />
            ))}
          </div>
        </div>

        <div className="divider ~py-8/20" />

        <div id="experience" ref={experienceRef} className="flex-col items-center gap-12">
          <SectionCard
            color="#7dd3fc"
            symbol={<FaGraduationCap />}
            title="Where I've Worked"
            text="Experience"
            className="w-full min-w-[325px]"
          />

          <SectionList items={experience} color={"#7dd3fc"} maxLines={5} />
        </div>

        <div className="divider ~py-8/20" />

        <div id="skills" ref={skillsRef} className="flex-col gap-12">
          <SectionHeader text="Skills" style="~text-2xl/4xl" />

          <div className="flex flex-col gap-10 w-full">
            {Object.entries(skills).map(([category, skills], index) => (
              <div className="flex flex-col lg:flex-row justify-between gap-4" key={index}>
                <SectionHeader text={category} style="~text-xl/2xl" nolight />
                <div className="flex gap-2">
                  {Object.entries(skills).map(([name, item], index) => (
                    <span
                      key={index}
                      className="text-black dark:text-white ~text-lg/3xl"
                      title={name}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider ~py-8/20" />

        <div id="profile-stats" ref={statsRef} className="flex-col gap-12">
          <SectionHeader text="Github Stats" style="~text-2xl/4xl" />

          <div className="flex flex-col md:flex-row justify-around gap-10">
            {Object.entries(stats).map(([stat, value], index) => (
              <div className="flex flex-col gap-4" key={index}>
                <SectionHeader text={stat} style="~text-xl/2xl" nolight />
                <span className="text-black dark:text-white ~text-xl/3xl">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ResumePage;
