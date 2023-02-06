import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import MyHead from "../../custom/head";
import Main from "../../custom/main";
//import Example from "../../components/application-ui/page-examples/home-screens/full_width_with_sidebar";
import PanelSideBar from "../../custom/panel/sideBar";

const Panel = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <MyHead />
      <Main>
        <div className="min-h-full">
          <PanelSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex flex-col lg:pl-64">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  {pageTitle}
                </h1>
              </div>
            </div>
            <div className="sm:m-4 lg:m-8">{children}</div>
          </div>
        </div>
      </Main>
    </>
  );
};
export default Panel;
