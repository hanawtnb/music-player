import { useSession } from "next-auth/react";
import { ReactNode, VFC } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { playingTrackState } from "../../atoms/playerAtom";
import { Player } from "../organisms/layout/Player";
import { Right } from "../organisms/layout/Right";
import { Sidebar } from "../organisms/layout/Sidebar";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

type Props = {
  children: ReactNode;
};
export const SidebarLayout: VFC<Props> = (props) => {
  const { children } = props;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const { data: session } = useSession();
  const accessToken: any = session?.accessToken;

  //曲を再生
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };
  return (
    <>
      <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
        <Sidebar />
        {children}
        <Right
          spotifyApi={spotifyApi}
          chooseTrack={chooseTrack}
          accessToken={accessToken}
        />
        <div className="fixed bottom-0 left-0 right-0 z-50 ">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </main>
    </>
  );
};
