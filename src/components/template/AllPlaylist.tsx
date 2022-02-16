import { useSession } from "next-auth/react";
import { useEffect, useState, VFC } from "react";
import PlaylistPoster from "../molecules/tracks/PlaylistPoster";
import Link from "next/link";

type Props = {
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
};

export const AllPlaylist: VFC<Props> = (props: Props) => {
  const { chooseTrack, spotifyApi, accessToken } = props;
  // プレイリストをAPIから取得
  const [playlists, setPlaylists] = useState([]);
  const { data: session }: any = useSession();

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    /**
     * ログインユーザーのプレイリストを取得.
     */
    spotifyApi
      .getUserPlaylists(session?.user?.id, { limit: 50, offset: 0 })
      .then((res: any) => {
        setPlaylists(
          res.body.items.map((playlist: any) => {
            return {
              id: playlist.id,
              name: playlist.name,
              uri: playlist.uri,
              description: playlist.description,
              image: playlist.images[0]?.url,
            };
          })
        );
      });
  }, [accessToken, session?.user?.id, session?.user?.name, spotifyApi]);

  return (
    <section className="my-[20px] bg-black ml-52  space-y-7 md:max-w-6xl flex-grow md:mr-2.5">
      <div className="grid overflow-y-scroll scrollbar-hide h-screen py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {playlists.length === 0
          ? "No playlists are available"
          : playlists.map((playlist: any) => (
              <Link
                key={playlist.id}
                href="/playlist/[playlist.id]"
                as={`/playlist/${playlist.id}`}
                // as={`/album/${playlist.id}`}
                passHref
              >
                <a>
                  <PlaylistPoster
                    key={playlist.id}
                    playlist={playlist}
                    chooseTrack={chooseTrack}
                  />
                </a>
              </Link>
            ))}
      </div>
    </section>
  );
};
