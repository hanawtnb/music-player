import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

import { playingTrackState } from "../atoms/playerAtom";

import { Sidebar } from "./Sidebar";
import { Body } from "./Body";
import { Right } from "./Right";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
    </main>
  );
};
