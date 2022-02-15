import { useEffect, useState, VFC } from "react";
import { Dropdown } from "../../molecules/Dropdown";
import { RecentlyPlayed } from "../RecentlyPlayed";

type Props = {
  spotifyApi: any;
  chooseTrack: (arg0: any) => any;
  accessToken: any;
};

export const Right: VFC<Props> = (props: Props) => {
  const { spotifyApi, chooseTrack, accessToken } = props;
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>([]);

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  //最近再生された曲
  useEffect(() => {
    if (!accessToken) return;
    const playedTrack = new Array<any>();
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 50,
      })
      .then((res: any) => {
        setRecentlyPlayed(
          res.body.items.map(({ track }: any) => {
            return {
              id: track.id,
              title: track.name,
              artist: track.artists.map((artist: any) => {
                return {
                  artistName: artist.name,
                  artistId: artist.id,
                };
              }),
              albumUrl: track.album.images[0].url,
              uri: track.uri,
            };
          })
        );
      });
  }, [accessToken, spotifyApi]);

  const result = recentlyPlayed.filter((item: any, index: any, self: any) => {
    const trackId = self.map((item: any) => item["id"]);
    // 重複を削除する
    if (trackId.indexOf(item.id) === index) {
      return item;
    }
  });

  return (
    <>
      <section className="space-y-8 pr-8 pt-4 w-80">
        <div className="flex space-x-2 items-center justify-between">
          <Dropdown />
        </div>
        {/* 最近再生された曲 */}
        <div className="bg-[#0d0d0d] border-2 border-[#262626] p-4 rounded-xl space-y-4 h-[735px]">
          <div className="flex items-center justify-between ">
            <h4 className="text-white font-semibold text-sm ">
              Recently Played
            </h4>
          </div>
          <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[680px] scrollbar-hide">
            {result.map((track: any, index: number) => (
              <RecentlyPlayed
                key={index}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </div>
      </section>
      ;
    </>
  );
};
