import { FaSearch } from "react-icons/fa";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ setSearch }: SearchProps) => {
  return (
    <div className="w-full flex gap-4 items-center mb-10 border border-[--border-color] rounded-2xl px-8 py-4 text-black dark:text-white text-2xl">
      <FaSearch className="cursor-pointer mr-4" />
      <input
        className="w-full border-none focus:outline-none bg-transparent"
        type="search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
