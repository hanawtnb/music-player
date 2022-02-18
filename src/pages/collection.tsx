import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { AiFillHeart } from "react-icons/ai";
import { NextPage } from "next";

import { SidebarLayout } from "../components/template/SidebarLayout";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";
import { CollectionTrack } from "../components/molecules/CollectionTrack";
import {
  collectionState,
  myCollectionTotalState,
} from "../atoms/collectionAtom";

const Collection: NextPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });
  const { data: session } = useSession();
  const accessToken: any = session?.accessToken;
  //   const [myCollection, setMyCollection] = useState<any>([]);
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
  }, []);

  return (
    <>
      <SidebarLayout>
        <section className="my-[20px] bg-black ml-64 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
          <div className="flex  bg-white/20 h-72 rounded-2xl md:max-w-6xl flex-grow md:mr-2.5">
            <div className="flex bg-white/10 w-[240px] h-[240px] relative my-auto ml-9 overflow-hidden cursor-pointer ">
              <AiFillHeart className=" text-white/80 text-7xl absolute top-20 left-20 items-center justify-center" />
            </div>
            <div className="my-auto text-[15px] text-white  ml-20 w-auto">
              <h1
                className="text-white text-6xl font-extrabold vertical-center
            "
              >
                My Collection
              </h1>
              <div className="flex items-center mt-4 ">
                {myCollectionTotal}&nbsp;songs
              </div>
            </div>
          </div>
          <div className="sm:w-[70px] md:w-[800px] xl:w-[1075px] space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
            {collection.map((track: any, index: number) => (
              <CollectionTrack
                key={index}
                index={index}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </section>
      </SidebarLayout>
    </>
  );
};

export default Collection;
