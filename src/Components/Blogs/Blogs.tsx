import { blogs } from "../../Utils/info";
import BlogCard from "./BlogCard";

interface BlogsProps {
  upTo?: number;
}

const Blogs = ({ upTo = blogs.length }: BlogsProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[4rem] text-white hero-text-shadow mt-10 mb-6">
        {"I like sharing what I learn"}
      </h2>
      <div className="flex gap-20 flex-wrap justify-center">
        {blogs.slice(0, upTo).map((project, index) => (
          <BlogCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
