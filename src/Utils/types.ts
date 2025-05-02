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
