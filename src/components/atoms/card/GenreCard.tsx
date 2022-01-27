import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};
const GenreCard: VFC<Props> = (props) => {
  const { children } = props;
  return (
    <div
      className="bg-[#101010] text-[#CECECE] border border-[#484848] rounded-xl py-2.5 px-3.5 text-[11px] font-bold cursor-default
}"
    >
      {children}
    </div>
  );
};

export default memo(GenreCard);
