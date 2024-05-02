import React, { useState, useEffect } from "react";
import Profile from "../../../src/images/Profile.png";

export type ProfileImageProps = {
  imgKey: string;
  className?: string;
  isInitial?: boolean;
  name?: string;
  base64?: boolean;
  imgBg?: string;
  imgText?: string;
  size?: "sm" | "md" | "lg";
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  imgKey,
  className,
  isInitial,
  name,
  base64,
  imgBg,
  imgText,
  size = "md",
}) => {
  //   const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    handleGetImg(imgKey, base64 === true ? true : false);
  }, [imgKey, base64]);

  const fetchBase64Image = async (): Promise<string> => {
    // Replace this with your actual implementation for fetching the image as base64 data
    // const response = await fetch(`https://example.com/api/images/Profile.png`);
    const response = await fetch("../../../src/images/Profile.png");
    if (!response.ok) {
      throw new Error(`Error fetching image: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Invalid image data"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const fetchImageUrl = async (): Promise<string> => {
    // Replace this with your actual implementation for fetching the image URL
    // const response = await fetch(`https://example.com/api/images/${imgKey}`);
    const response = await fetch(Profile);
    if (!response.ok) {
      throw new Error(`Error fetching image: ${response.status}`);
    }
    const data = await response.json();
    return data.url; // Adjust this to the actual property that contains the image URL in the response
  };

  const handleGetImg = (imgKey: string, base64: boolean) => {
    if (imgKey) {
      try {
        if (base64 === true) {
          // Fetch image as base64 data
          // Replace this with your actual implementation
          fetchBase64Image().then((res: string) => {
            setImg(`data:image/png;base64,${res}`);
            // setLoading(false);
          });
        } else {
          // Fetch image URL
          // Replace this with your actual implementation
          fetchImageUrl().then((res: string) => {
            setImg(res);
            // setLoading(false);
          });
        }
      } catch (err) {
        setError(true);
        console.log("Error fetching image:", err);
      }
    } else {
      //   setLoading(false);
    }
  };

  function getProfilePictureUrl(
    url: string | null,
    name: string,
    size: number,
  ): string {
    if (url) {
      // Test if the URL is a valid URL
      try {
        new URL(url);
        return url;
      } catch (e) {
        console.error("Invalid URL:", url);
      }
    }
    const initials = getInitials(name);
    const profilePictureUrl = generateProfilePicture(initials, size);
    return profilePictureUrl;
  }
  function getInitials(name: string): string {
    if (!name) {
      return "";
    }
    const parts = name.split(" ");
    let initials = "";
    for (let i = 0; i < parts.length; i++) {
      initials += parts[i][0];
    }
    return initials.toUpperCase();
  }
  function generateProfilePicture(initials: string, size: number): string {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx: any = canvas.getContext("2d");

    // List of available background colors
    // const colors = [
    //   "#8A00CE",
    //   "#F98C2C",
    //   "#EDBE0A",
    //   "#6846D4",
    //   "#66C695",
    //   "#23204B",
    //   "#444444",
    //   "#F15845",
    // ];

    // const randomColor = colors[Math.floor(Math.random() * colors.length)];

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = imgBg ? imgBg : "#EFEFEF"; // bgColor;
    // ctx.fillStyle = randomColor;
    ctx.fill();
    // Draw the initials
    ctx.fillStyle = imgText ? imgText : "#888888";
    ctx.font = `${size / 2}px Inter`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2);
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();
    return dataURL;
  }

  //   if (loading) {
  //     return <div className={className}>Loading...</div>;
  //   }

  if (error) {
    return <div className={className}>Error loading image.</div>;
  }

  if (isInitial) {
    const profilePictureUrl = getProfilePictureUrl(img, name ?? "N/A", 30);
    return (
      <img
        src={profilePictureUrl}
        alt="Profile"
        className={`rounded-full object-cover bg-gray-400 text-gray-700 ${
          size === "sm" ? "w-8 h-8" : ""
        } ${size === "md" ? "w-10 h-10" : ""}  ${
          size === "lg" ? "w-12 h-12" : ""
        } ${className}`}
        onError={() => setImg("")}
      />
    );
  }
  return (
    <img
      src={Profile}
      alt="Profile"
      className={`rounded-full object-cover ${size === "sm" ? "w-8 h-8" : ""} ${
        size === "md" ? "w-10 h-10" : ""
      }  ${size === "lg" ? "w-12 h-12" : ""} ${className ? className : ""}`}
    />
  );
  // Replace this with your actual implementation
  // return <img src={img} alt="Profile" className={className} />;
};

export default ProfileImage;
