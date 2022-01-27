import { useSession } from "next-auth/react";
import { memo, useEffect, useState, VFC } from "react";
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

  console.log(searchResults);

  return (
    <section className="bg-black ml-60 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4"></div>
    </section>
  );
};
