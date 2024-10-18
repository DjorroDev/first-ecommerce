import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Navbar />
      <main className="gap-4 p-4 md:gap-8 md:p-8 w-full max-w-[1280px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
