/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

import { playingTrackState, playState } from "../../../atoms/playerAtom";
import { LikePlayButton } from "../LikePlayButton";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  index: number;
  ownerId: string;
  myId: string;
};

export const MyPlaylistTrack: VFC<Props> = memo((props: Props) => {
  const { track, chooseTrack, index, ownerId, myId } = props;
  const { data: session } = useSession();
  const accessToken: any = session?.accessToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);
  const router = useRouter();
  const { playlist_id }: any = router.query;
  const [playlistTracks, setPlaylistTrack] = useState<any>([]);
  const [snapshot_id, setSnapshot_id] = useState() as any;

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    console.log("アクセストークン");
  }, [accessToken]);

  /**
   * 曲を再生.
   */
  const onClickPlayMusic = useCallback(() => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  }, [accessToken, setPlay]);

  /**
   * 曲をプレイリストから削除
   */
  const onClickRemoveFromPlaylist = (track: any) => {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.removeTracksFromPlaylist(playlist_id, [{ uri: track.uri }], {
      snapshot_id: snapshot_id,
    });
    console.log("さくじょ");
  };

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    /**
     *プレイリストを取得.
     */
    spotifyApi.getPlaylist([playlist_id] as any).then((res: any) => {
      setSnapshot_id(res.body.snapshot_id);
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
        setPlaylistTrack(
          res.body.items.map((track: any) => {
            return {
              id: track.track.id,
              title: track.track.name,
              albumName: track.track.album.name,
              albumId: track.track.album.id,
              releaseDate: track.track.album.release_date,
              // description: track.track.description,
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
    console.log("よばれる");
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
        <div
          onClick={onClickPlayMusic}
          className="flex items-center cursor-pointer w-full"
        >
          <h4 className="mr-5 text-white">{index + 1}</h4>
          <img
            src={track.albumUrl}
            className="rounded-xl h-12 w-12 object-cover mr-3 float-left"
          />
          <span>
            <h4 className="text-white text-sm font-semibold truncate w-[450px]">
              {track.title}
            </h4>
            {track.artist.map((artist: any) => (
              <Link
                key={artist.artistId}
                href="/artist/[artist.artistId]"
                as={`/artist/${artist.artistId}`}
                passHref
              >
                <a>
                  <span className="hover:underline underline-offset-1 text-white/70 text-[13px] font-semibold group-hover:text-white">
                    {artist.artistName}
                    &nbsp;
                  </span>
                </a>
              </Link>
            ))}
          </span>
        </div>

        <div className="md:ml-auto flex items-center space-x-2.5">
          {ownerId === myId ? (
            <span className="text-white related left-100">
              <button
                className="border rounded-full w-24 h-10 hover:cursor-pointer hover:bg-[#15883e]"
                onClick={() => onClickRemoveFromPlaylist(track) as any}
              >
                Remove
              </button>
            </span>
          ) : (
            ""
          )}
          <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
            <LikePlayButton track={track} onClickPlayMusic={onClickPlayMusic} />
          </div>
        </div>
      </div>
    </>
  );
});
