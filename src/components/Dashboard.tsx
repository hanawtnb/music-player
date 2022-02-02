import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { playingTrackState, playlistSelectedState } from "../atoms/playerAtom";
import { Sidebar } from "./Sidebar";
import { Body } from "./Body";
import { Right } from "./Right";
import { Player } from "./Player";
import { Playlist } from "./Playlist";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export const Dashboard = () => {
  //playerを表示させるために必要
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [playlistSelected, setPlaylistSelected] = useRecoilState(
    playlistSelectedState
  );
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

      {playlistSelected === true ? (
        <Playlist spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      ) : (
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      )}

      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <div className="fixed bottom-0 left-0 right-0 z-50 ">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </main>
  );
};
