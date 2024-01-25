import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { logOut } from "../utils/apiClient";

export default function Navbar() {
  const { isLoggedIn, showToast } = useAppContext();
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
    <div className="w-full flex justify-between items-center py-5">
      {/* logo */}
      <Link to="/">
        <img src="./splendiaLogo.png" className="w-32" />
      </Link>
      {/* nav links */}
      <ul className="flex items-center gap-5 text-[16px] font-medium">
        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/my-bookings"
                className="pb-2 hover:text-cyan-600 hover:border-b-2 hover:border-cyan-600"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/my-hotels"
                className="pb-2 hover:text-cyan-600 hover:border-b-2 hover:border-cyan-600"
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
              <button className="px-6 py-2 bg-cyan-500 text-white rounded-full inset-1 hover:bg-cyan-600">
                Sign In
              </button>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
