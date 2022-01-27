import { useSession } from "next-auth/react";
import { memo, useEffect, useState, VFC } from "react";
import Poster from "./Poster";
import { Search } from "./Searchbar";

type Props = {
  spotifyApi: any;
};

export const Body: VFC<Props> = (props) => {
  const { spotifyApi } = props;
  //クライアント再度でセッションを取得する時はuseSessionで、サーバー再度の時はgetSession
  const { data: session } = useSession();
  //sessionにはアクセストークンやユーザー情報が入っている。
  const accessToken = session?.accessToken;
  // const {accessToken} = session!でもOK。
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //検索
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.searchTracks(search).then((res: any) => {
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
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

  //新着
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res: any) => {
      // console.log(res);

      setNewRelease(
        res.body.albums.items.map((track: any) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            //音楽を再生するために使う。
            uri: track.uri,
            albumUrl: track.images[0].url,
            // popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  console.log(newRelease);

  return (
    <section className="bg-black ml-60 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newRelease.slice(0, 4).map((track: any) => (
              <Poster
                key={track.id}
                track={track}
                // chooseTrack={chooseTrack}
              />
            ))
          : searchResults.slice(0, 4).map((track: any) => (
              <Poster
                key={track.id}
                track={track}
                // chooseTrack={chooseTrack}
              />
            ))}
      </div>
    </section>
  );
};
