import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

import { playingTrackState } from "../../atoms/playerAtom";
import { PlaylistTrack } from "../../components/molecules/PlaylistTrack";
import { SidebarLayout } from "../../components/template/SidebarLayout";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Artist = () => {
  const [artistInfo, setArtistInfo] = useState<any>([]);
  const [topTracks, setTopTracks] = useState<any>([]);
  const router = useRouter();
  const { artist_id } = router.query;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  //曲を再生
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };

  const { data: session }: any = useSession();
  //sessionにはアクセストークンやユーザー情報が入っている。
  // const {accessToken} = session!でもOK。
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    /**
     * アーティストの情報を取得.
     */
    spotifyApi.getArtist(artist_id as any).then((res: any) => {
      setArtistInfo({
        id: res.body.id,
        name: res.body.name,
        image: res.body.images[0].url,
        followers: res.body.followers.total,
      });
    });

    /**
     * アーティスト　のトップ曲を取得.
     */
    spotifyApi.getArtistTopTracks(artist_id as any, "GB").then((res: any) => {
      setTopTracks(
        res.body.tracks.map((track: any) => {
          return {
            id: track.id,
            title: track.name,
            albumName: track.album.name,
            artist: track.artists.map((artist: any) => {
              return {
                artistName: artist.name,
                artistId: artist.id,
              };
            }),
            albumId: track.album.id,
            albumUrl: track.album.images[0].url,
            uri: track.uri,
          };
        })
      );
    });
  }, [accessToken, artist_id]);

  return (
    <>
      <SidebarLayout>
        <section className="my-[20px] bg-black ml-64 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
          <div className="flex  bg-white/20 h-72 rounded-2xl md:max-w-6xl flex-grow md:mr-2.5">
            <div className="flex bg-[#0D0D0D] relative top-8 left-9  w-[230px] h-[230px] overflow-hidden cursor-pointer ">
              <img
                src={artistInfo.image}
                className="h-full w-full object-cover shadow"
              />
            </div>
            <div className="my-auto text-[15px] text-white  ml-20 w-auto">
              <h1
                className="text-white text-6xl font-extrabold vertical-center
            "
              >
                {artistInfo.name}
              </h1>
              <div className="flex items-center ">
                <IoMdHeart />
                <span className="text-white my-3">
                  {artistInfo.followers}&nbsp;followers
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
            {topTracks.map((track: any, index: number) => (
              <PlaylistTrack
                key={track.id}
                index={index}
                track={track}
                chooseTrack={chooseTrack}
                spotifyApi={spotifyApi}
                accessToken={accessToken}
                ownerId={track.id}
                myId={track}
              />
            ))}
          </div>
        </section>
      </SidebarLayout>
    </>
  );
};

export default Artist;
