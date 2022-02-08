import { useSession } from "next-auth/react";
import { memo, useEffect, useState, VFC } from "react";

import Poster from "../molecules/tracks/Poster";
import { Search } from "../molecules/Searchbar";
import Track from "../molecules/Track";

type Props = {
  spotifyApi: any;
  chooseTrack: (arg0: any) => any;
};

export const Body: VFC<Props> = (props) => {
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
  }, [accessToken, spotifyApi]);

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
  }, [search, accessToken, spotifyApi]);

  /**
   * 新着の曲を取得.
   */
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res: any) => {
      setNewReleases(
        res.body.albums.items.map((track: any) => {
          return {
            id: track.id,
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
            // popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken, spotifyApi]);

  return (
    <section className="my-[20px] bg-black ml-52 space-y-7 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track: any) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track: any) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>
      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* 曲 */}
        <div>
          <h2 className="text-white font-bold mb-3 mt-0">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[1090px] sm:w-[70px] md:w-[800px] xl:w-[1090px]">
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
};
