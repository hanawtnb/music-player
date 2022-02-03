import ReactLoading from "react-loading";
import Image from "next/image";

export const Loader = () => {
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
};
