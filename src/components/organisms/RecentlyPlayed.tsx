/* eslint-disable react/display-name */
import Link from "next/link";
import { memo, VFC } from "react";
import { useRecoilState } from "recoil";

import { playingTrackState, playState } from "../../atoms/playerAtom";

type Props = {
  chooseTrack: (arg0: any) => any;
  track: any;
};

export const RecentlyPlayed: VFC<Props> = memo((props: Props) => {
  const { chooseTrack, track } = props;

  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

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
    <div className="flex items-center space-x-3" onClick={onClickPlayMusic}>
      <img
        src={track.albumUrl}
        alt=""
        className="rounded-full w-[52px] h-[52px]"
      />
      <div>
        <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
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
              <span className="text-sm text-[#686868] font-semibold cursor-pointer hover:underline">
                {artist.artistName}
                &nbsp;
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default RecentlyPlayed;
