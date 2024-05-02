import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "../Typography/Typography";
import Icons from "../Icons/Icon";
import ProfileImage from "../ProfilePic/ProfilePic";
import { logout } from "../../CommonFunctions";

const Header: React.FC = () => {
  const headerData = useSelector((state: any) => state.header);
  const user = useSelector((state: any) => state.user);

  const [isUlVisible, setIsUlVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleImageClick = () => {
    setIsUlVisible(!isUlVisible);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsUlVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:ms-[15rem] md:w-[calc(100%-15rem)]  
      min-h-[3rem] flex justify-between items-center shadow-300 bg-white px-2 fixed left-0 top-0 md:z-10 sm:w-full border-2 border-gray-200">
      <div className="flex gap-2">
        <button><Icons name="arrow-left" size={30}></Icons></button>
        <Typography className="text-seconday-200 font-semibold text-gray-300 mt-1" variant="h3">
          {headerData.title}
        </Typography>
      </div>
      <div className="flex items-center justify-end gap-3">
        <div className="relative">
          <div className="relative w-auto flex gap-1 cursor-pointer rounded-full part-one" onClick={handleImageClick}>
            <ProfileImage
              className="profile-image"
              imgKey="example-image-key"
              isInitial
              name={user.name}
            />
            <Typography variant="h6" className="font-semibold mt-2">{user.name}</Typography>
            <span className="mt-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.687 4.21818C12.4917 4.03833 12.1751 4.03833 11.9799 4.21818L7.0001 8.80482L2.02032 4.21818C1.82506 4.03833 1.50848 4.03833 1.31321 4.21818C1.11795 4.39802 1.11795 4.68961 1.31321 4.86946L6.64655 9.78174C6.74032 9.86811 6.86749 9.91663 7.0001 9.91663C7.13271 9.91663 7.25989 9.86811 7.35365 9.78174L12.687 4.86946C12.8823 4.68961 12.8823 4.39802 12.687 4.21818Z" fill="#232323" />
              </svg>
            </span>
          </div>
          {isUlVisible && (
          <ul ref={dropdownRef} className="absolute -right-0 top-9 z-[9] part-two">
            <li 
              onClick={logout}
              className="bg-white flex justify-end items-center gap-2.5 text-400 px-4 py-4 
                relative font-semibold text-gray-300 hover:bg-gray-200 cursor-pointer w-max border border-gray-400 rounded-md"
            >
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15 12H3.62" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span className="line-clamp-1">Log Out</span>
            </li>
          </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
