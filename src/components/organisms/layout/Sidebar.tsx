import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { RiCompassFill, RiPlayListFill } from "react-icons/ri";
import Image from "next/image";

import Link from "next/Link";

export const Sidebar = () => {
  return (
    <section className="fixed top-0 left-0 z-40 flex flex-col p-4 items-center bg-black w-[200px] h-screen space-y-8">
      <Image src="/logo.png" width={56} height={56} objectFit="contain" />
      <div className="flex flex-col space-y-8 ">
        <Link href="/">
          <a className="flex justify-center space-x-5">
            <HomeIcon className="sidebarIcon text-white opacity-[0.85] " />
            <span className="text-white">Home</span>
          </a>
        </Link>
        <button className="flex justify-center space-x-5">
          <RiCompassFill className="sidebarIcon text-2xl" />
          <span className="text-white">Trend</span>
        </button>
        <button className="flex justify-center space-x-5">
          <ChartBarIcon className="sidebarIcon" />
          <span className="text-white">Chart</span>
        </button>
        <Link href="/playlists">
          <a className="flex justify-center space-x-5">
            <RiPlayListFill className="sidebarIcon text-2xl ml-5" />
            <span className="text-white">Playlists</span>
          </a>
        </Link>
      </div>
    </section>
  );
};
