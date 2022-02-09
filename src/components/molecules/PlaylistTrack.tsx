import Link from "next/link";
import { VFC } from "react";
import { useRecoilState } from "recoil";

import { playingTrackState, playState } from "../../atoms/playerAtom";
import { LikePlayButton } from "./LikePlayButton";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
  index: number;
};

export const PlaylistTrack: VFC<Props> = (props: Props) => {
  const { track, chooseTrack, spotifyApi, accessToken, index } = props;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);

  /**
   * 曲を再生.
   */
  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };

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
          <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
            <LikePlayButton
              track={track}
              onClickPlayMusic={onClickPlayMusic}
              spotifyApi={spotifyApi}
              accessToken={accessToken}
            />
          </div>
        </div>
      </div>
    </>
  );
};
