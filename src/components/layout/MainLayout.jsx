import Header from "../Header";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Toaster position="top-center" />
      <Footer />
    </div>
  );
};

export default MainLayout;
