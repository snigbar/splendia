import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container mx-auto py-10 flex items-center justify-between bg-[#EDEDED] px-8">
      <div className="space-y-1 h-full">
        <Link to="/">
          <img src="./splendiaLogo.png" className="w-24" />
        </Link>
        <p className="text-gray-900 text-sm font-semibold">
          Your booking experience since 2009
        </p>

        <p className=" text-gray-600">©copyright - Splendia-2009</p>
      </div>

      <ul className="text-gray-900 text-sm space-y-1 px-4">
        <li className="hover:font-medium">Help</li>
        <li className="hover:font-medium">FAQ</li>
        <li className="hover:font-medium">Customer Services</li>
        <li className="hover:font-medium">How to guide</li>
        <li className="hover:font-medium">Contatct Us</li>
      </ul>
    </div>
  );
}
