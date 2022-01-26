import { useState, VFC } from "react";
import { Search } from "./Searchbar";

export const Body: VFC = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <section className="bg-black ml-60 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4"></div>
    </section>
  );
};
