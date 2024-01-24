import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="w-full flex justify-between items-center py-5">
      {/* logo */}
      <Link to="/">
        <img src="./splendiaLogo.png" className="w-32" />
      </Link>
      {/* nav links */}
      <ul className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
            <li>
              <Link to="/my-hotels">My Bookings</Link>
            </li>
            <li>
              <button className="px-3 py-2 bg-rose-500 text-white text-sm rounded-full inset-1 hover:bg-rose-600">
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <button className="px-6 py-2 bg-cyan-500 text-white rounded-full inset-1 hover:bg-cyan-600">
              Sign In
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
