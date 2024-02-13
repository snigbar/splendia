import { Link } from "react-router-dom";
import featureImg from "../assets/featureImg.jpg";
import featureImg2 from "../assets/featureImg2.jpg";

export default function Features() {
  return (
    <div className="py-8 md:py-12 my-8 w-11/12 lg:w-4/5 mx-auto flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full p-4 space-y-6 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider md:leading-[3.5rem]">
          Discover Top Hotels Worldwide
        </h1>
        <p className="text-sm md:text-lg">
          Explore luxury escapes worldwide: from European palaces to Maldivian
          hideaways, indulge in sophistication at your fingertips.
        </p>
        <button className="">
          <Link
            to={`/search`}
            className="bg-indigo-600 text-white h-full px-5 rounded-full py-3 font-semibold max-w-fit hover:bg-indigo-500"
          >
            Find Hotels
          </Link>
        </button>
      </div>
      <div className="w-full p-2 shadow-lg bg-white rounded-lg relative">
        <img
          src={featureImg}
          alt="hotel feature image"
          className="object-cover rounded-lg hover:scale-[1.02] transition duration-300"
        />

        <div className="hidden md:block w-3/5 p-1 shadow-lg bg-white rounded-lg absolute -bottom-16 -right-16">
          <img
            src={featureImg2}
            alt="hotel feature image"
            className="object-cover rounded-lg hover:scale-[1.02] transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}
