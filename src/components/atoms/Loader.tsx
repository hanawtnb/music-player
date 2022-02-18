/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import ReactLoading from "react-loading";
import Image from "next/image";
import { memo } from "react";

export const Loader = memo(() => {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span>
          <Image
            src="/spotifylogo.png"
            height={250}
            width={600}
            objectFit="contain"
            className="animate-pulse"
          />
        </span>
        <ReactLoading type="bars" color="white" />
      </div>
    </div>
  );
});
