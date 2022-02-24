/* eslint-disable react/display-name */
import { useSession } from "next-auth/react";
import { memo, useEffect, useState, VFC } from "react";

import { Poster } from "../../molecules/posters/Poster";
import { Search } from "../../molecules/Search";
import { Track } from "../../molecules/tracks/Track";

type Props = {
  spotifyApi: any;
  chooseTrack: (arg0: any) => any;
};

export const Body: VFC<Props> = memo((props: Props) => {
  const { spotifyApi, chooseTrack } = props;
  //クライアント再度でセッションを取得する時はuseSessionで、サーバー再度の時はgetSession
  const { data: session } = useSession();
  //sessionにはアクセストークンやユーザー情報が入っている。
  // const {accessToken} = session!でもOK。
  const accessToken = session?.accessToken;
  // 検索
  const [search, setSearch] = useState("");
  // 検索結果をAPIから取得
  const [searchResults, setSearchResults] = useState([]);
  // 新着音楽をAPIから取得
  const [newReleases, setNewReleases] = useState([]);

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /**
   * 曲を検索.
   */
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res: any) => {
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
          return {
            id: track.id,
            albumType: track.album_type,
            artist: track.artists.map((artist: any) => {
              return {
                artistName: artist.name,
                artistId: artist.id,
              };
            }),
            title: track.name,
            //音楽を再生するために使う。
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  /**
   * 新着の曲を取得.
   */
  useEffect(() => {
    if (!accessToken) return;
    const tempNewRelease: any = new Array();
    spotifyApi.getNewReleases().then((res: any) => {
      const result = res.body.albums.items.filter(
        (track: any) => track.album_type === "single"
      );
      setNewReleases(
        result.map((track: any) => {
          return {
            id: track.id,
            albumType: track.album_type,
            artist: track.artists.map((artist: any) => {
              return {
                artistName: artist.name,
                artistId: artist.id,
              };
            }),
            title: track.name,
            //音楽を再生するために使う。
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className="my-[20px] bg-black ml-52 space-y-7 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-hidden scrollbar-hide grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track: any) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                  spotifyApi={spotifyApi}
                  accessToken={accessToken}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track: any) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                  spotifyApi={spotifyApi}
                  accessToken={accessToken}
                />
              ))}
      </div>
      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* 曲 */}
        <div>
          <h2 className="text-white font-bold mb-3 mt-0">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 xl:h-[355px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[500px] sm:w-[500px] md:w-[780px] xl:w-[1090px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track: any) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                      spotifyApi={spotifyApi}
                      accessToken={accessToken}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track: any) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                      spotifyApi={spotifyApi}
                      accessToken={accessToken}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
});
