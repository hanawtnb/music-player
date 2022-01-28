import { Dropdown } from "./atoms/molecules/Dropdown";

export const Right = () => {
  return (
    <>
      <section className="p-4 space-y-8 pr-8">
        <div className="flex space-x-2 items-center justify-between">
          <Dropdown />
        </div>
      </section>
      ;
    </>
  );
};
