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

const Album = () => {
  const [hasLiked, setHasLiked] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState<any>([]);
  const [playlist, setPlaylist] = useState<any>([]);
  const router = useRouter();
  const { album_id } = router.query;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  //曲を再生
  const chooseTrack = (track: any): any => {
    setPlayingTrack(track);
  };

  const { data: session }: any = useSession();
  //sessionにはアクセストークンやユーザー情報が入っている。
  // const {accessToken} = session!でもOK。
  const accessToken = session?.accessToken;

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getPlaylist([album_id] as any).then((res: any) => {
      console.log("ぷれいりすと", res.body);
      setPlaylist({
        id: res.body.id,
        name: res.body.name,
        description: res.body.description,
        followers: res.body.followers.total,
        albumUrl: res.body.images[0].url,
        owner: res.body.owner.display_name,
      });
    });

    spotifyApi.getPlaylistTracks([album_id] as any).then((res: any) => {
      console.log("アルバムの中", res.body.items[0]);
      setPlaylistTracks(
        res.body.items.map((track: any) => {
          console.log("トラック２", track.track);

          return {
            id: track.track.id,
            name: track.track.name,
            albumName: track.track.album.name,
            releaseDate: track.track.album.release_date,
            // description: track.track.description,
            uri: track.track.uri,
            albumUrl: track.track.album.images[0].url,
            artist: track.track.artists?.map((artist: any) => {
              return {
                artistName: artist.name,
              };
            }),
          };
        })
      );
    });
  }, [accessToken, album_id]);

  console.log("ぷれいりすとのなかみ", playlist);
  console.log("プレイリスト", playlistTracks);

  return (
    <SidebarLayout>
      <section className="my-[20px] bg-black ml-64 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
        <div className="flex  bg-white/20 h-72 rounded-2xl md:max-w-6xl flex-grow md:mr-2.5">
          <div className="flex bg-[#0D0D0D] relative top-8 left-9  w-[230px] h-[230px] overflow-hidden cursor-pointer ">
            <img
              src={playlist.albumUrl}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="my-auto text-[15px] text-white  ml-20 w-auto">
            <h1
              className="text-white text-6xl font-extrabold vertical-center
            "
            >
              {playlist.name}
            </h1>
            <h4 className="text-white mt-3">{playlist.description}</h4>
            <div className="flex items-center ">
              <IoMdHeart />
              <span className="text-white my-3">{playlist.followers}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll md:h-96 lg:h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
          {playlistTracks.map((track: any, index: number) => (
            <PlaylistTrack
              key={track.id}
              index={index}
              track={track}
              chooseTrack={chooseTrack}
              spotifyApi={spotifyApi}
              accessToken={accessToken}
            />
          ))}
        </div>
      </section>
    </SidebarLayout>
  );
};

export default Album;