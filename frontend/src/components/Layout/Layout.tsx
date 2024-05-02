import React from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AdminLayoutProps) => {

  const navigationItems = [
    {
      icon: "home",
      label: "Incidents",
      link: "/",
    },
    {
      icon: "plus",
      label: "Add Incident",
      link: "/incident",
    }
  ];

  return (
    <div className="app bg-white">
      <Menu navigationItems={navigationItems} isOpen={true} />
      <div className={`md:ms-[15rem] md:w-[calc(100%-15rem)] h-auto sm:w-full`}>
        <Header/>
        <div className="page-body mt-14 min-h-[calc(100vh-5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
