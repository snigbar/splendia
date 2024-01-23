import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TChildren } from "../interfaces/interfaces";

export default function Layout({ children }: TChildren) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="container mx-auto flex-1 py-4">{children}</div>
      <Footer></Footer>
    </div>
  );
}
