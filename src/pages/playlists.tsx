import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import {
  collectionState,
  myCollectionTotalState,
} from "../atoms/collectionAtom";
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
  const [collection, setCollection] = useRecoilState(collectionState);
  const [myCollectionTotal, setMyCollectionTotal] = useRecoilState(
    myCollectionTotalState
  );

  //曲を再生
  const chooseTrack = useCallback(
    (track: any): any => {
      setPlayingTrack(track);
    },
    [setPlayingTrack]
  );

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    /**
     * お気に入りを取得.
     */
    spotifyApi.getMySavedTracks({ limit: 50 }).then((res: any) => {
      setMyCollectionTotal(res.body.total);
      setCollection(
        res.body.items.map((track: any) => {
          return {
            id: track.track.id,
            title: track.track.name,
            artist: track.track.artists.map((artist: any) => {
              return {
                artistName: artist.name,
                artistId: artist.id,
              };
            }),
            albumUrl: track.track.album.images[0].url,
            albumId: track.track.album.id,
            uri: track.track.uri,
          };
        })
      );
    });
  }, [accessToken, setCollection, setMyCollectionTotal, spotifyApi]);

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
