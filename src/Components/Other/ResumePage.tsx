import { useRef } from "react";
import Page from "../Page/Page";
import SectionCard from "./Section/SectionCard";
import { FaGraduationCap } from "react-icons/fa";
import SectionList from "./Section/SectionList";
import { courses, projects, experience, skills } from "../../Utils/info";
import ProjectCard from "../Projects/ProjectCard";
import SectionHeader from "./Section/SectionHeader";

const ResumePage = () => {
  const coursesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const contents = {
    Courses: coursesRef,
    Projects: projectsRef,
    Experience: experienceRef,
    Skills: skillsRef,
  };

  // const download = () => {
  //   const link = document.createElement("a");
  //   link.href = "/src/Assets/Images/Other/Resume.pdf";
  //   link.download = "Issac_Roy_Resume.pdf";
  //   link.click();
  // };

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
            {projects.map((project, index) => (
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
                    <span key={index} className="text-white ~text-lg/3xl" title={name}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ResumePage;
