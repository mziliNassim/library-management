import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <section className="bg-white overflow-y-hidden dark:bg-gray-900">
        <div className="flex items-center justify-center max-w-screen-xl w-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="w-full py-20">
            <div className="flex flex-col items-center max-w-lg mx-auto text-center">
              <p className="text-4xl font-medium text-[#7e22ce] dark:text-[#7e22ce]">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                We lost this page
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                We searched high and low, but couldn’t find what you’re looking
                for.Let’s find a better place for you to go.
              </p>

              <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <div>
                  <Link
                    to="/"
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-100 transition-colors duration-200 border rounded-lg dark:text-gray-200 gap-x-2 sm:w-auto  bg-[#7e22ce] opacity-90 hover:opacity-100 hover:bg-[#7e22ce] dark:hover:bg-[#7e22ce] dark:bg-[#7e22ce]"
                  >
                    <span>Take me home</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-lg flex flex-col justify-between bg-blue-50 dark:bg-gray-800">
                <div className="">
                  <span className="text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </span>

                  <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                    About Us
                  </h3>

                  <p className="mt-2 text-gray-500 dark:text-gray-400 ">
                    Discover more about who we are and what we do.
                  </p>
                </div>

                <Link
                  to="/LibriTech/about-us"
                  className="inline-flex items-center mt-4 text-sm text-[#7e22ce] gap-x-2 dark:text-[#7e22ce] hover:underline"
                >
                  <span>Learn More About Us</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="p-6 rounded-lg flex flex-col justify-between bg-blue-50 dark:bg-gray-800">
                <div className="">
                  <span className="text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </span>

                  <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                    Our blog
                  </h3>

                  <p className="mt-2 text-gray-500 dark:text-gray-400 ">
                    Read the latest posts on our blog.
                  </p>
                </div>

                <Link
                  to="/LibriTech/blog"
                  className="inline-flex items-center mt-4 text-sm text-[#7e22ce] gap-x-2 dark:text-[#7e22ce] hover:underline"
                >
                  <span>View lastest posts</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="p-6 rounded-lg flex flex-col justify-between bg-blue-50 dark:bg-gray-800">
                <div className="">
                  <span className="text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                      />
                    </svg>
                  </span>

                  <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">
                    Get in Touch
                  </h3>

                  <p className="mt-2 text-gray-500 dark:text-gray-400 ">
                    Can’t find what you’re looking for?
                  </p>
                </div>

                <Link
                  to="/LibriTech/contact"
                  className="inline-flex items-center mt-4 text-sm text-[#7e22ce] gap-x-2 dark:text-[#7e22ce] hover:underline"
                >
                  <span>Contact our team 7/24</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
