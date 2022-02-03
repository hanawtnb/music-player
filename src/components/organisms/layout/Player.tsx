import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, VFC } from "react";
import { useRecoilState } from "recoil";

import { playingTrackState, playState } from "../../../atoms/playerAtom";

type Props = {
  accessToken: any;
  trackUri: string;
};

export const Player: VFC<Props> = (props) => {
  const { accessToken, trackUri } = props;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    if (trackUri) {
      setPlay(true);
    }
  }, [setPlay, trackUri]);

  if (!accessToken) return null;
  return (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "70px",
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        magnifySliderOnHover={true}
        autoPlay={true}
      />
    </div>
  );
};
