import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Features from "../sections/Features";
import LatestHotels from "../sections/LatestHotels";
import PopularDestination from "../sections/PopularDestination";

function Home() {
  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
      <Features></Features>
      <PopularDestination></PopularDestination>
      <LatestHotels></LatestHotels>
    </div>
  );
}

export default Home;
