import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TableOfContents from "./TableOfContents";

interface PageProps {
  children: React.ReactNode;
  contents?: { [key: string]: React.RefObject<HTMLDivElement> };
  color?: string;
}

const Page = ({ children, contents, color }: PageProps) => {
  const pageStyle = {
    "--gradient-color": color,
  } as React.CSSProperties;

  return (
    <SimpleBar className={`absolute left-0 top-0 w-screen h-screen overflow-x-hidden bg-[#f5f5f5] dark:bg-[#101010]`}>
      <div className={`page-bg ${color ? "with-gradient" : ""}`} style={pageStyle}>
        <Navbar />
        {contents && <TableOfContents contents={contents} />}
        <div className="flex-col items-center py-[10vh]">{children}</div>
        <Footer />
      </div>
    </SimpleBar>
  );
};

export default Page;
