import { useEffect, useState } from "react";
import * as d3 from "d3";
import { round } from "../Utils/functions";
import { Commit, CommitData } from "../Utils/types";

export function useMeta() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [stats, setStats] = useState({
    Commits: 0,
    Files: 0,
    "Total Lines": 0,
    "Avg File Length": 0,
    "Max File Length": 0,
  });

  async function loadData() {
    const data = await d3.csv("./loc.csv", (row) => ({
      ...row,
      file: row.file,
      type: row.type,
      commit: row.commit,
      line: Number(row.line),
      datetime: new Date(row.datetime),
    }));

    return data;
  }

  function processCommits(data: CommitData): Commit[] {
    return d3
      .groups(data, (d) => d.commit)
      .map(([commit, lines]) => ({
        id: commit,
        datetime: lines[0].datetime,
        totalLines: lines.length,
        hourFrac: round(lines[0].datetime.getHours() + lines[0].datetime.getMinutes() / 60),
        lines,
      })) as Commit[];
  }

  useEffect(() => {
    loadData().then((data) => {
      const commits = processCommits(data);
      setCommits(commits as Commit[]);
      const fileLengths = d3.rollups(
        data,
        (v) => d3.max(v, (v) => v.line),
        (d) => d.file
      );

      setStats({
        Commits: commits.length,
        Files: d3.groups(data, (d) => d.file).length,
        "Total Lines": d3.sum(fileLengths, (d) => d[1]),
        "Avg File Length": round(d3.mean(fileLengths, (d) => d[1]) ?? 0, 2),
        "Max File Length": d3.max(fileLengths, (d) => d[1]) ?? 0,
      });
    });
  }, []);

  return { stats, commits };
}
