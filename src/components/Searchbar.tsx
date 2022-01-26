/* eslint-disable react/display-name */
import { SearchIcon } from "@heroicons/react/solid";
import { memo, useState, VFC } from "react";

export const Search = () => {
  return (
    <div className="max-w-[1150px] bg-white rounded-full overflow-hidden border-2 border-white p-1.5 px-5 pr-8 flex items-center mt-2">
      {/* animation-pulseでサーチバーのアイコンの動きを出せる */}
      <SearchIcon className="h-4 w-4 mr-2 animate-pulse" />
      {/* <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse mr-2" /> */}
      <input
        type="text"
        className="text-[#1a1a1a] bg-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#1a1a1a] text-xs"
        placeholder="Artists, songs, albums..."
      />
    </div>
  );
};
