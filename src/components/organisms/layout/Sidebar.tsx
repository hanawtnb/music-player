/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
import { HomeIcon } from "@heroicons/react/solid";
import { AiFillHeart } from "react-icons/ai";
import { RiPlayListFill } from "react-icons/ri";
import Image from "next/image";

import { memo } from "react";
import Link from "next/link";

export const Sidebar = memo(() => {
  return (
    <section className="mt-4 fixed top-0 left-0 z-40 flex flex-col p-4 items-center bg-black w-[200px] h-screen space-y-8">
      <Image src="/logo.png" width={56} height={56} objectFit="contain" />
      <div className="flex flex-col space-y-8 ">
        <Link href="/">
          <a className="flex justify-center space-x-5">
            <HomeIcon className="sidebarIcon text-white opacity-[0.7] ml-2 " />
            <span className="text-white">Home</span>
          </a>
        </Link>
        <Link href="/playlists">
          <a className="flex justify-center space-x-5">
            <RiPlayListFill className="sidebarIcon text-2xl ml-5 " />
            <span className="text-white">Playlists</span>
          </a>
        </Link>
        <Link href="/collection">
          <a className="flex justify-center space-x-5">
            <AiFillHeart className="sidebarIcon text-2xl ml-8" />
            <span className="text-white">Collection</span>
          </a>
        </Link>
      </div>
    </section>
  );
});
