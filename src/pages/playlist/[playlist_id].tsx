import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import { IoMdHeart } from "react-icons/io";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

import { playingTrackState } from "../../atoms/playerAtom";
import { MyPlaylistTrack } from "../../components/molecules/tracks/MyPlaylistTrack";
import { PlaylistTrack } from "../../components/molecules/tracks/PlaylistTrack";
import { Search } from "../../components/molecules/Searchbar";
import { SidebarLayout } from "../../components/template/SidebarLayout";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Album: NextPage = () => {
  const [playlistTracks, setPlaylistTracks] = useState<any>([]);
  const [playlist, setPlaylist] = useState<any>([]);
  const router = useRouter();
  const { playlist_id } = router.query;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  // 検索
  const [search, setSearch] = useState("");
  // 検索結果をAPIから取得
  const [searchResults, setSearchResults] = useState([]);
  const [myInfo, setMyInfo] = useState<any>([]);
  const { data: session }: any = useSession();
  const accessToken = session?.accessToken;

  /**
   * 曲を再生.
   * @param track - 再生する曲
   */
  const chooseTrack = useCallback(
    (track: any): any => {
      setPlayingTrack(track);
    },
    [setPlayingTrack]
  );

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then((res: any) => {
      setMyInfo({
        id: res.body.id,
      });
    });
  }, [accessToken, myInfo.id]);

  useEffect(() => {
    if (!accessToken) return;

    /**
     *プレイリストを取得.
     */
    spotifyApi.getPlaylist([playlist_id] as any).then((res: any) => {
      setPlaylist({
        id: res.body.id,
        name: res.body.name,
        description: res.body.description,
        followers: res.body.followers.total,
        albumUrl: res.body.images.length === 0 ? "" : res.body.images[0].url,
        owner: res.body.owner.display_name,
        ownerId: res.body.owner.id,
      });
    });

    /**
     * プレイリストの曲を取得.
     */
    spotifyApi
      .getPlaylistTracks([playlist_id] as any, {
        limit: 40,
        fields: "items",
      })
      .then((res: any) => {
        setPlaylistTracks(
          res.body.items.map((track: any) => {
            return {
              id: track.track.id,
              title: track.track.name,
              albumName: track.track.album.name,
              albumId: track.track.album.id,
              releaseDate: track.track.album.release_date,
              uri: track.track.uri,
              albumUrl: track.track.album.images[0].url,
              artist: track.track.artists?.map((artist: any) => {
                return {
                  artistName: artist.name,
                  artistId: artist.id,
                };
              }),
            };
          })
        );
      });
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
            artist: track.artists.map((artist: any) => {
              return {
                artistName: artist.name,
                artistId: artist.id,
              };
            }),
            title: track.name,
            albumId: track.album.id,
            albumName: track.album.name,
            //音楽を再生するために使う。
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken, search]);

  return (
    <SidebarLayout>
      <section className="my-[20px] bg-black ml-64 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
        <div className="flex  bg-white/20 h-72 rounded-2xl md:max-w-6xl flex-grow md:mr-2.5">
          <div className="flex bg-[#0D0D0D] relative top-8 left-9  w-[230px] h-[230px] overflow-hidden cursor-pointer ">
            {playlist.albumUrl === "" ? (
              <div className="bg-white/10 w-[240px] h-[240px]">
                <HiOutlineMusicNote className=" text-white/80 text-7xl absolute top-20 left-20 items-center justify-center" />
              </div>
            ) : (
              <img
                src={playlist.albumUrl}
                className="h-full w-full object-cover shadow"
              />
            )}
          </div>
          <div className="my-auto text-[15px] text-white  ml-20 w-auto">
            <h1
              className="text-white text-6xl font-extrabold vertical-center
            "
            >
              {playlist.name}
            </h1>
            <h4 className="text-white mt-3 text-xl">{playlist.description}</h4>
            <div className="flex items-center ">
              <span>Created by&nbsp;{playlist.owner}・</span>
              <IoMdHeart />
              <span className="text-white my-3">
                &nbsp;{playlist.followers}&nbsp;followers
              </span>
            </div>
          </div>
        </div>
        {playlist.ownerId !== myInfo.id ? (
          <div className="sm:w-[70px] md:w-[800px] xl:w-[1075px] space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
            {playlistTracks.map((track: any, index: number) => (
              <PlaylistTrack
                key={index}
                index={index}
                track={track}
                chooseTrack={chooseTrack}
                ownerId={playlist.ownerId}
                myId={myInfo.id}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="sm:w-[70px] md:w-[800px] xl:w-[1075px] space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
              {playlistTracks.map((track: any, index: number) => (
                <MyPlaylistTrack
                  key={index}
                  index={index}
                  track={track}
                  chooseTrack={chooseTrack}
                  ownerId={playlist.ownerId}
                  myId={myInfo.id}
                />
              ))}
            </div>
            <p className="text-white">
              Find your favorite songs and artists and create your own playlist!
            </p>
            <Search search={search} setSearch={setSearch} />
            {search ? (
              <div className="sm:w-[70px] md:w-[800px] xl:w-[1075px] space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
                {searchResults.map((track: any, index: number) => (
                  <PlaylistTrack
                    key={index}
                    index={index}
                    track={track}
                    chooseTrack={chooseTrack}
                    ownerId={playlist.ownerId}
                    myId={myInfo.id}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </section>
    </SidebarLayout>
  );
};

export default Album;
