import React, { useState } from "react";
import SideNavLogoOpen from "../../assets/react.svg";
import Icons from "../Icons/Icon";
import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";

interface NavItemProps {
  icon: string; // Allow any string value for icon
  isActive: boolean;
  label: string;
  link: string;
  isOpen:boolean;
  isSub?:boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  isActive,
  label,
  link,
  isOpen = false,
  isSub = false,
  onClick,
}) => {
  return (
    <div className={`${isActive ? "" : ""}`}>
      {isSub?(
        <a
          href={void(0)}
          onClick={onClick}
          className={`cursor-pointer flex gap-3 items-center rounded-md w-full min-w-[0.625rem] px-[0.625rem] hover:bg-gray-100 hover:bg-opacity-5 ${
            isActive ? "!bg-gray-100 !bg-opacity-20" : ""
          }`}
        >
          {icon && (
            <span className="ps-4 h-10 inline-flex items-center justify-center">
              <Icons
                name={icon as any} // Use "as any" to bypass type checking for specific icon names
                color={isActive ? "#fff" : "#D9D9D9"}
                size={20}
              />
            </span>
          )}
          {label && (
            <span
              className={`whitespace-nowrap overflow-hidden text-ellipsis ${isOpen?`inline-block`:`hidden group-hover:inline-block`} ${
                isActive ? "text-gray-100" : ""
              }`}
            >
              {label}
            </span>
          )}
        </a>
      ):(
        <Link
          to={link}
          onClick={onClick}
          className={`cursor-pointer flex gap-3 items-center rounded-md w-full min-w-[0.625rem] px-[0.625rem] hover:bg-gray-100 hover:bg-opacity-5 ${
            isActive ? "!bg-gray-100 !bg-opacity-20" : ""
          }`}
        >
          {icon && (
            <span className="ps-4 h-10 inline-flex items-center justify-center">
              <Icons
                name={icon as any} // Use "as any" to bypass type checking for specific icon names
                color={isActive ? "#fff" : "#D9D9D9"}
                size={20}
              />
            </span>
          )}
          {label && (
            <span
              className={`whitespace-nowrap overflow-hidden text-ellipsis ${isOpen?`inline-block`:`hidden group-hover:inline-block`} ${
                isActive ? "text-gray-100" : ""
              }`}
            >
              {label}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export interface MenuProps {
  navigationItems: { 
    icon: string; 
    label: string; 
    link: string; 
  }[];
  isOpen: boolean;
}
const Menu: React.FC<MenuProps> = ({
  navigationItems,
  isOpen = true,
}) => {
  const [activeItem, setActiveItem] = useState<string>("");

  const handleItemClick = (label: string) => {
    if(label === activeItem){
      setActiveItem("");
    }else{
      setActiveItem(label);
    }
  };
  return (
    <div className="md:fixed md:h-full sm:w-full sm:h-auto md:z-[999] group top-0 left-0">
      <div
        className={`relative z-50 md:h-full sm:w-full flex flex-col py-5 border-blue-100 
         bg-blue-100 text-gray-100 shadow-200 text-400 transition-all ease-in-out duration-200 
           group ${isOpen?`md:w-60 sm:max-h-auto sm:h-auto`:`md:fixed top-0 left-0 bottom-0 md:w-[4.5rem] md:hover:w-60 sm:max-h-0 sm:invisible`}`
        }
      >
        <div className="px-4 flex gap-4">
          <img
            src={SideNavLogoOpen}
            alt="logo"
            className="w-auto max-w-full h-5 object-cover object-left-top"
          />
          <Typography variant="h3" className="">Incident</Typography>
        </div>
        <div className="mt-5 overflow-auto md:h-[calc(100vh-10rem)]">
          {navigationItems.map(({ icon, label, link}) => (
            <div key={label} className="flex flex-col">
              <div className="mt-2">
                <NavItem
                  key={label}
                  isActive={activeItem === label}
                  icon={icon}
                  label={label}
                  link={link}
                  isOpen={isOpen}
                  onClick={() => handleItemClick(label)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
