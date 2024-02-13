import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { logOut } from "../utils/apiClient";
import { useState } from "react";
import cn from "../lib/cn";

export default function Navbar() {
  const { isLoggedIn, showToast } = useAppContext();
  const [mobileMenu, setMobileMenu] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({
        message: err.message || "something went wrong",
        type: "error",
      });
    },
  });

  const handleLogOut = () => mutation.mutate();

  return (
    <div className="w-full flex justify-between items-center py-5 px-2 md:px-0">
      {/* logo */}
      <Link to="/">
        <img src="./splendiaLogo.png" className="w-28 lg:w-36 2xl:w-40" />
      </Link>
      {/* nav links */}
      <button
        className="block md:hidden p-2 hover:bg-gray-200"
        onClick={() => setMobileMenu(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* mobile menu */}

      <ul
        className={cn(
          "z-40 flex flex-col fixed top-0 right-0 bg-white h-full items-center justify-center translate-x-96  w-3/5 sm:w-1/2 gap-5 text-[16px] font-medium md:hidden transition-transform duration-150",
          { "translate-x-0": mobileMenu }
        )}
      >
        <button
          className="p-2 hover:bg-gray-200 self-end mr-4"
          onClick={() => setMobileMenu(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <li>
          <Link
            to="/search"
            className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
          >
            Search Hotels
          </Link>
        </li>

        <li>
          <Link
            to="/"
            className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
          >
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            {" "}
            <li>
              <Link
                to="/search"
                className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
              >
                Search Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/my-bookings"
                className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/my-hotels"
                className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
              >
                My Hotels
              </Link>
            </li>
            <li>
              <button
                className="px-3 py-2 bg-rose-500 text-white text-sm rounded-full inset-1 hover:bg-rose-600"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <Link to="/signin">
            <li>
              <button className="px-6 py-2 bg-indigo-500 text-white rounded-full inset-1 hover:bg-indigo-600">
                Sign In
              </button>
            </li>
          </Link>
        )}
      </ul>

      <ul className="md:flex items-center gap-5 text-[16px] font-medium hidden">
        <li>
          <Link
            to="/"
            className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
          >
            Search Hotels
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/my-bookings"
                className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/my-hotels"
                className="pb-2 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
              >
                My Hotels
              </Link>
            </li>
            <li>
              <button
                className="px-3 py-2 bg-rose-500 text-white text-sm rounded-full inset-1 hover:bg-rose-600"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <Link to="/signin">
            <li>
              <button className="px-6 py-2 bg-indigo-500 text-white rounded-full inset-1 hover:bg-indigo-600">
                Sign In
              </button>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
