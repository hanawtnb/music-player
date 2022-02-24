import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

import { playingTrackState } from "../../atoms/playerAtom";
import { AlbumTrack } from "../../components/molecules/tracks/AlbumTrack";
import { SidebarLayout } from "../../components/template/SidebarLayout";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Artist: NextPage = () => {
  const router = useRouter();
  const { album_id } = router.query;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [track, setTrack] = useState<any>([]);
  const [albumInfo, setAlbumInfo] = useState<any>([]);
  const { data: session }: any = useSession();
  //sessionにはアクセストークンやユーザー情報が入っている。
  // const {accessToken} = session!でもOK。
  const accessToken = session?.accessToken;

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //曲を再生
  const chooseTrack = useCallback(
    () =>
      (track: any): any => {
        setPlayingTrack(track);
      },
    [setPlayingTrack]
  );

  useEffect(() => {
    if (!accessToken) return;
    /**
     * アルバム情報を取得.
     */
    spotifyApi.getAlbum(album_id as any).then((res: any) => {
      setAlbumInfo({
        id: res.body.id,
        albumType: res.body.album_type,
        name: res.body.name,
        artist: res.body.artists.map((artist: any) => {
          return {
            artistId: artist.id,
            artistName: artist.name,
          };
        }),
        releaseDate: res.body.release_date,
        image: res.body.images[0].url,
        totalTracks: res.body.total_tracks,
        tracks: setTrack(
          res.body.tracks.items.map((track: any) => {
            return {
              id: track.id,
              title: track.name,
              artist: track.artists.map((artist: any) => {
                return {
                  artistId: artist.id,
                  artistName: artist.name,
                };
              }),
              uri: track.uri,
            };
          })
        ),
      });
    });
  }, [accessToken]);

  return (
    <>
      <SidebarLayout>
        <section className="my-[20px] bg-black ml-64 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
          <div className="flex  bg-white/20 h-72 rounded-2xl md:max-w-6xl flex-grow md:mr-2.5">
            <div className="flex bg-[#0D0D0D] relative top-8 left-9  w-[230px] h-[230px] overflow-hidden cursor-pointer ">
              <img
                src={albumInfo.image}
                className="h-full w-full object-cover shadow"
              />
            </div>
            <div className="my-auto text-[15px] text-white  ml-20 w-auto">
              <h1
                className="text-white text-6xl font-extrabold vertical-center
            "
              >
                {albumInfo.name}
              </h1>

              {albumInfo.artist?.map((artist: any) => (
                <h4 key={artist.artistId} className="text-white mt-3 text-xl">
                  {artist.artistName}
                </h4>
              ))}
              <div className="flex mt-4">
                {" "}
                <h4 className="text-white mr-4">
                  {albumInfo.totalTracks}&nbsp;tracks
                </h4>
                <h4 className="text-white">
                  Released on&nbsp;{albumInfo.releaseDate}
                </h4>
              </div>
            </div>
          </div>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
            {track.map((track: any, index: number) => (
              <AlbumTrack
                key={track.id}
                index={index}
                track={track}
                album={albumInfo}
                chooseTrack={chooseTrack}
                spotifyApi={spotifyApi}
                accessToken={accessToken}
              />
            ))}
          </div>
        </section>
      </SidebarLayout>
    </>
  );
};

export default Artist;
