import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";
import router from "next/router";
import { useRecoilState } from "recoil";

import { playlistSelectedState } from "../atoms/playerAtom";

export const Sidebar = () => {
  const [playlistSelected, setPlaylistSelected] = useRecoilState(
    playlistSelectedState
  );

  return (
    <section className="fixed top-0 left-0 z-40 flex flex-col p-4 items-center bg-black w-[225px] h-screen space-y-8">
      <Image src="/logo.png" width={56} height={56} objectFit="contain" />
      <div className="flex flex-col space-y-8 ">
        <button className="flex justify-center space-x-5">
          <HomeIcon className="sidebarIcon text-white opacity-[0.85] " />
          <span className="text-white">Home</span>
        </button>
        <button className="flex justify-center space-x-5">
          <RiCompassFill className="sidebarIcon text-2xl" />
          <span className="text-white">Trend</span>
        </button>
        <button className="flex justify-center space-x-5">
          <ChartBarIcon className="sidebarIcon" />
          <span className="text-white">Chart</span>
        </button>
        <button
          type="button"
          className="flex justify-center space-x-5"
          onClick={() => {
            setPlaylistSelected(true);
          }}
        >
          <ClockIcon className="sidebarIcon" />
          <span className="text-white">Playlists</span>
        </button>
        <button className="flex justify-center space-x-5">
          <DotsHorizontalIcon className="sidebarIcon" />
          <span className="text-white">Setting</span>
        </button>
      </div>
    </section>
  );
};
