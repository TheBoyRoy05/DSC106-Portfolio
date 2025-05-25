import Page from "../Page/Page";
import SectionHeader from "../Other/Section/SectionHeader";
import { useRef, useState, useEffect } from "react";
import { useMeta } from "../../Hooks/useMeta";
import { useChart } from "../../Hooks/useChart";
import scrollama from "scrollama";
import * as d3 from "d3";

type FileInfo = {
  name: string;
  lines: { type: string; line: number }[];
};

const MetaPage = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [commitProgress] = useState(100);
  const [commitMaxTime, setCommitMaxTime] = useState<Date | null>(null);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [activeCommit, setActiveCommit] = useState<number>(-1);
  const [activeFileCommit, setActiveFileCommit] = useState<number>(-1);

  const commitScroller = scrollama();
  const fileScroller = scrollama();
  const { stats, commits } = useMeta();
  const sortedCommits = commits.sort((a, b) => b.totalLines - a.totalLines);
  const storyCommits = commits.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
  const { ref: chartRef, brushData, numSelected } = useChart(sortedCommits, commitMaxTime);

  const languages: { [key: string]: string } = {
    ts: "TypeScript",
    tsx: "React TS",
    css: "CSS",
    js: "JavaScript",
    html: "HTML",
  };

  const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

  useEffect(() => {
    if (commits.length === 0) return;

    const timeScale = d3
      .scaleTime()
      .domain([
        d3.min(commits, (d) => d.datetime) as Date,
        d3.max(commits, (d) => d.datetime) as Date,
      ])
      .range([0, 100]);

    setCommitMaxTime(timeScale.invert(commitProgress));
  }, [commits, commitProgress]);

  useEffect(() => {
    if (!commitMaxTime) return;

    const filteredCommits = commits.filter((d) => d.datetime <= commitMaxTime);
    const lines = filteredCommits.flatMap((d) => d.lines);
    const fileGroups = d3
      .groups(lines, (d) => d.file)
      .map(([name, lines]) => ({
        name,
        lines,
      }))
      .sort((a, b) => b.lines.length - a.lines.length);

    setFiles(fileGroups);
  }, [commits, commitMaxTime]);

  useEffect(() => {
    commitScroller
      .setup({
        step: "#scatter-story .step",
        offset: 0.5,
        debug: false,
      })
      .onStepEnter(({ index }) => {
        setActiveCommit(index);
        if (index >= 0 && index < storyCommits.length) {
          setCommitMaxTime(storyCommits[index].datetime);
        }
      })
      .onStepExit(({ index }) => {
        if (index === activeCommit) {
          setActiveCommit(-1);
          if (index === storyCommits.length - 1) {
            const timeScale = d3
              .scaleTime()
              .domain([
                d3.min(commits, (d) => d.datetime) as Date,
                d3.max(commits, (d) => d.datetime) as Date,
              ])
              .range([0, 100]);
            setCommitMaxTime(timeScale.invert(commitProgress));
          }
        }
      });

    fileScroller
      .setup({
        step: "#files-story .step",
        offset: 0.5,
        debug: false,
      })
      .onStepEnter(({ index }) => {
        setActiveFileCommit(index);
        if (index >= 0 && index < storyCommits.length) {
          setCommitMaxTime(storyCommits[index].datetime);
        }
      })
      .onStepExit(({ index }) => {
        if (index === activeFileCommit) {
          setActiveFileCommit(-1);
          if (index === storyCommits.length - 1) {
            const timeScale = d3
              .scaleTime()
              .domain([
                d3.min(commits, (d) => d.datetime) as Date,
                d3.max(commits, (d) => d.datetime) as Date,
              ])
              .range([0, 100]);
            setCommitMaxTime(timeScale.invert(commitProgress));
          }
        }
      });

    return () => {
      commitScroller.destroy();
      fileScroller.destroy();
    };
  }, [activeCommit, activeFileCommit, commitScroller, fileScroller, storyCommits, commits, commitProgress]);

  return (
    <Page>
      <h2 className="text-gradient font-medium">Meta</h2>

      <div className="flex-col w-[80vw] md:w-[70vw] mt-20">
        <div id="profile-stats" ref={statsRef} className="flex-col gap-12">
          <SectionHeader text="Commit Stats" style="~text-2xl/4xl" />

          <div className="flex flex-col md:flex-row justify-around gap-10">
            {Object.entries(stats).map(([stat, value], index) => (
              <div className="flex flex-col gap-4" key={index}>
                <SectionHeader text={stat} style="~text-xl/2xl" nolight />
                <span className="text-black dark:text-white ~text-xl/3xl">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider my-10" />

        <div id="scrolly-1" className="relative flex gap-10">
          <div id="scatter-story" className="relative flex-1">
            <div className="text-black dark:text-white">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">Commit Activity Over Time</h3>
                <p>
                  This visualization shows when commits were made throughout the day. Each dot
                  represents a commit, with its size indicating the number of lines changed. The
                  color represents the time of day, creating a gradient from cool to warm colors.
                </p>
                <p>
                  Use the brush tool to select a range of commits and see the breakdown of changes
                  by file type.
                </p>
              </div>
              <div className="border-b border-black dark:border-white my-8 w-full" />
              <div className="space-y-8">
                {storyCommits.map((commit, index) => (
                  <div key={commit.id} className="step">
                    <p>
                      On {commit.datetime.toLocaleDateString()} at{" "}
                      {commit.datetime.toLocaleTimeString()}, I made{" "}
                      <a
                        className="text-blue-500 underline"
                        href={`https://github.com/TheBoyRoy05/DSC106-Portfolio/${commit.id}`}
                      >
                        {index === 0 ? "my first commit" : "another glorious commit"}
                      </a>
                      . I edited {commit.totalLines} lines across{" "}
                      {new Set(commit.lines.map((l) => l.file)).size} files. Then I looked over all
                      I had made, and I saw that it was very good.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            id="scatter-plot"
            className="sticky top-0 left-0 bottom-auto h-fit flex-[2] pt-[10vh]"
          >
            <svg ref={chartRef} />
            <SectionHeader
              text={`${numSelected} ${numSelected === 1 ? "Commit" : "Commits"} Selected`}
              style="~text-base/lg"
            />
            <div className="flex flex-col md:flex-row justify-around gap-10 mt-4">
              {brushData.length ? (
                brushData.map(({ language, count, percent }, index) => (
                  <div className="flex flex-col" key={index}>
                    <SectionHeader text={languages[language]} style="~text-base" nolight />
                    <span className="text-black dark:text-white ~text-base">{`${count} lines (${percent}%)`}</span>
                  </div>
                ))
              ) : (
                <span className="text-black dark:text-white ~text-base/lg"> No Data Selected </span>
              )}
            </div>
          </div>
        </div>

        <div id="scrolly-2" className="relative flex gap-10 mt-20">
          <div
            id="files-plot"
            className="sticky top-0 left-0 bottom-auto h-fit flex-[2] pt-[5vh]"
          >
            <dl id="files" className="flex flex-col gap-4">
              {files.map((file) => (
                <div key={file.name} className="grid grid-cols-subgrid col-span-2">
                  <dt className="col-span-1">
                    <code className="text-black dark:text-white">{file.name}</code>
                    <small className="block text-black/60 dark:text-white/60 text-xs mt-1">
                      {file.lines.length} lines
                    </small>
                  </dt>
                  <dd className="col-span-1 flex flex-wrap items-start content-start gap-[0.15em] pt-[0.6em] ml-0">
                    {file.lines.map((line, index) => (
                      <div
                        key={index}
                        className="w-[0.5em] aspect-square rounded-full"
                        style={{ backgroundColor: colorScale(line.type) }}
                      />
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="files-story" className="relative flex-1">
            <div className="text-black dark:text-white">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">File Changes Over Time</h3>
                <p>
                  This visualization shows how files evolved throughout the project. Each dot represents
                  a line of code, colored by its file type. The files are sorted by total number of
                  lines, with the most active files at the top.
                </p>
              </div>
              <div className="border-b border-black dark:border-white my-8 w-full" />
              <div className="space-y-8">
                {storyCommits.map((commit, index) => (
                  <div key={commit.id} className="step">
                    <p>
                      On {commit.datetime.toLocaleDateString()} at{" "}
                      {commit.datetime.toLocaleTimeString()}, I made{" "}
                      <a
                        className="text-blue-500 underline"
                        href={`https://github.com/TheBoyRoy05/DSC106-Portfolio/${commit.id}`}
                      >
                        {index === 0 ? "my first commit" : "another glorious commit"}
                      </a>
                      . I edited {commit.totalLines} lines across{" "}
                      {new Set(commit.lines.map((l) => l.file)).size} files. Then I looked over all
                      I had made, and I saw that it was very good.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MetaPage;
