import Head from "next/head";

import { Dashboard } from "../components/Dashboard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";

import { playingTrackState } from "../atoms/playerAtom";
import { Body } from "../components/template/Body";
import { SidebarLayout } from "../components/template/SidebarLayout";
import { Loader } from "../components/atoms/Loader";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Home() {
  const router = useRouter();
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
  // useSessionで session 情報と status 状態を保持する変数を作成
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // 認証されていないのでサインインページに飛ばす。
      router.push("/auth/signin");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Music-player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SidebarLayout>
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      </SidebarLayout>
    </div>
  );
}
