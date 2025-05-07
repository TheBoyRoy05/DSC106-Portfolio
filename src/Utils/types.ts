export type Project = {
  name: string;
  year: number;
  description: string;
  image: string;
  link?: string;
  tech?: { [key: string]: React.ReactNode };
  priorities?: unknown[];
  algorithms?: unknown[];
}

export type CommitData = d3.DSVParsedArray<{
  commit: string;
  file: string;
  type: string;
  line: number;
  datetime: Date;
}>;

export type Commit = {
  id: string;
  datetime: Date;
  totalLines: number;
  hourFrac: number;
  lines: CommitData;
};
