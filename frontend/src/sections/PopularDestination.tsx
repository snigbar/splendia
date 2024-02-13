import london from "../assets/london.jpg";
import coxsBazar from "../assets/coxsBazar.jpg";
import rome from "../assets/rome.jpg";
import greece from "../assets/greece.jpg";
import bangkok from "../assets/bangkok.jpg";
import bali from "../assets/bali.jpg";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

export default function PopularDestination() {
  const navigate = useNavigate();
  const { saveDestination } = useSearchContext();
  const handleDestination = (arg: string) => {
    saveDestination(arg);
    navigate("/search");
  };
  return (
    <div className="my-8 w-11/12 lg:w-4/5 space-y-6 mx-auto">
      <h1 className="md:text-4xl font-semibold text-2xl">
        Popular Destination
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-2 lg:gap-4 max-h-[700px] md:max-h-[450px]">
        <div className="rounded-xl relative row-span-3">
          <img src={london} className="h-full w-full rounded-xl object-cover" />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("london")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              London
            </p>
          </button>
        </div>
        <div className="rounded-xl relative">
          <img
            src={coxsBazar}
            className="h-full w-full rounded-xl object-cover"
          />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("cox's bazar")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              Cox's Bazar
            </p>
          </button>
        </div>
        <div className="rounded-xl relative row-span-3">
          <img src={rome} className="h-full w-full rounded-xl object-cover" />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("rome")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              Rome
            </p>
          </button>
        </div>
        <div className="rounded-xl relative row-span-2">
          <img
            src={bangkok}
            className="h-full w-full rounded-xl object-cover"
          />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("bangkok")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              Bangkok
            </p>
          </button>
        </div>
        <div className="rounded-xl relative row-span-2">
          <img src={greece} className="h-full w-full rounded-xl object-cover" />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("greece")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              Greece
            </p>
          </button>
        </div>
        <div className="rounded-xl relative">
          <img src={bali} className="h-full w-full rounded-xl object-cover" />
          <button
            className="absolute inset-0 bg-black/20 z-30 hover:bg-black/50 rounded-xl cursor-pointer"
            onClick={() => handleDestination("bali")}
          >
            <p className="absolute top-3 left-2 text-lg text-white p-2 font-semibold">
              Bali
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
