import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Loader } from "../../components/Loader";

function Signin({ providers }: any) {
  // useSessionで session 情報を保持する変数を作成
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) {
    <Loader />;
  }

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Login Music-player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/spotifylogo.png"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {/* Object.valueでprovidersを配列にする。 */}
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

// サーバサイドでsession情報を取得したい場合はuseSession Hookは利用できないのでgetSessionを利用します。
// getServerSidePropsはクライアントからのアクセス時にサーバ側でデータを取得しpre-Renderingする。
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
