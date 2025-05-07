import Page from "../Page/Page";
import SectionHeader from "../Other/Section/SectionHeader";
import { useRef } from "react";
import { useMeta } from "../../Hooks/useMeta";
import { useChart } from "../../Hooks/useChart";

const MetaPage = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const commitChartRef = useRef<HTMLDivElement>(null);
  const { stats, commits } = useMeta();
  const sortedCommits = commits.sort((a, b) => b.totalLines - a.totalLines);
  const { ref: chartRef, brushData } = useChart(sortedCommits);

  const contents = {
    Stats: statsRef,
    "Commit Chart": commitChartRef,
  };

  return (
    <Page contents={contents}>
      <h2 className="text-gradient font-medium">Meta</h2>

      <div className="flex-col w-[80vw] md:w-[60vw] mt-20">
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

        <div id="commit-chart" ref={commitChartRef} className="flex-col gap-12 mt-20">
          <SectionHeader text="Commit Chart" style="~text-2xl/4xl" />
          <svg ref={chartRef} />
          <div className="flex flex-col md:flex-row justify-around gap-10">
            {brushData.length ? (
              brushData.map(({ language, count, percent }, index) => (
                <div className="flex flex-col gap-4" key={index}>
                  <SectionHeader text={language.toUpperCase()} style="~text-xl/2xl" nolight />
                  <span className="text-black dark:text-white ~text-xl/3xl">{`${count} lines (${percent}%)`}</span>
                </div>
              ))
            ) : (
              <span className="text-black dark:text-white ~text-xl/3xl"> No Data Selected </span>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MetaPage;
