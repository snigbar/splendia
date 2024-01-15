import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TChildren } from "../interfaces/interfaces";

export default function Layout({ children }: TChildren) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar></Navbar>
      <Header></Header>
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer></Footer>
    </div>
  );
}
