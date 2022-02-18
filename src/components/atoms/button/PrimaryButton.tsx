/* eslint-disable react/display-name */
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

const PrimaryButton: VFC<Props> = memo((props: Props) => {
  const { children } = props;
  return (
    <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
      {children}
    </button>
  );
});

export default memo(PrimaryButton);
