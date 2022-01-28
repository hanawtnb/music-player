import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

export const Dropdown = () => {
  const { data: session }: any = useSession();

  return (
    <Menu as="div" className="w-24 h-12 relative flex items-center">
      <div className="w-full absolute right-1 group">
        <Menu.Button className="flex h-11 items-center w-full px-4 py-3 text-sm font-medium text-white bg-[#1A1A1A] rounded-full hover:bg-[#3E3E3E]">
          {session?.user?.image === undefined ? (
            <CgProfile className="rounded-full w-11 h-11 absolute left-0 object-cover font-thin" />
          ) : (
            <img
              src={session.user.image}
              alt=""
              className="rounded-full w-11 h-11 absolute left-0 object-cover"
            />
          )}

          <ChevronDownIcon
            className="h-6 text-[#686868] absolute right-4"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 w-56 mt-24 origin-top-right bg-[#1A1A1A] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-white/10"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white cursor-default`}
                  onClick={() => signOut({ redirect: false })}
                >
                  <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
