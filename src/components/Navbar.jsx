import { ImGithub } from "react-icons/im";

export default function Nav() {
  return (
    <>
      <nav className="bg-nav-color border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-end">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 justify-end">
              <li>
                <a
                  href="https://github.com/Sama-004/timedown"
                  className="block py-2 px-3 text-white bg-nav-color rounded hover:bg-gray-100 hover:text-black md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <ImGithub className="inline-block mr-2 text-xl" />
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
