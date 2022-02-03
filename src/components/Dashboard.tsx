import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { playingTrackState } from "../atoms/playerAtom";
import { Sidebar } from "./organisms/layout/Sidebar";
import { Right } from "./organisms/layout/Right";
import { Player } from "./organisms/layout/Player";
import { Body } from "./template/Body";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export const Dashboard = () => {
  //playerを表示させるために必要
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  // プレイヤーバーの表示ステータス
  const [showPlayer, setShowPlayer] = useState(false);

  //  プレイヤーバーを表示
  useEffect(() => {
    setShowPlayer(true);
  }, []);

  //曲を再生
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />

      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />

      <Right
        spotifyApi={spotifyApi}
        chooseTrack={chooseTrack}
        accessToken={accessToken}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 ">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </main>
  );
};
