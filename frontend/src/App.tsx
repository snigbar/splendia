import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import { useAppContext } from "./context/AppContext";
import Search from "./pages/Search";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home></Home>
            </Layout>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Layout>
              <Search></Search>
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register></Register>
            </Layout>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn></SignIn>
            </Layout>
          }
        ></Route>
        {isLoggedIn && (
          <>
            {" "}
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel></AddHotel>
                </Layout>
              }
            ></Route>
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels></MyHotels>
                </Layout>
              }
            ></Route>
            <Route
              path="/my-hotels/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel></EditHotel>
                </Layout>
              }
            ></Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
