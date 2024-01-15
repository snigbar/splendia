import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-5">
      {/* logo */}
      <Link to="/">
        <img src="./splendiaLogo.png" className="w-32" />
      </Link>
      {/* nav links */}
      <ul className="flex space-x-2">
        <li>
          <button className="px-6 py-2 bg-cyan-500 text-white rounded-full inset-1 hover:bg-cyan-600">
            Sign In
          </button>
        </li>
      </ul>
    </div>
  );
}
