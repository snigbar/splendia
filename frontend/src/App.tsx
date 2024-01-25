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

function App() {
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
              <div>search</div>
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
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
