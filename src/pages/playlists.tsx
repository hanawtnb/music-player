import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { playingTrackState } from "../atoms/playerAtom";
import { AllPlaylist } from "../components/template/AllPlaylist";
import { SidebarLayout } from "../components/template/SidebarLayout";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export const Playlists = () => {
  const { data: session } = useSession();
  const accessToken: any = session?.accessToken;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  //曲を再生
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };

  return (
    <>
      <SidebarLayout>
        <AllPlaylist
          spotifyApi={spotifyApi}
          chooseTrack={chooseTrack}
          accessToken={accessToken}
        />
      </SidebarLayout>
    </>
  );
};

export default Playlists;
