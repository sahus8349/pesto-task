import React from "react";

export interface IconProps {
  name:
    | "arrow-left"
    | "plus"
    | "call"
    | "home"
    | "hide"
    | "show";
  size?: number;
  color?: string;
  className?: string;
}

const Icons: React.FC<IconProps> = ({
  name,
  size = 16,
  color = "black",
  className,
}) => {
  const iconStyles = {
    width: `${size}px`,
    height: `${size}px`,
    fill: color,
  };

  let icon = null;

  switch (name) {
    case "arrow-left":
      icon = (
        <svg className="w-6 h-6 text-gray-800 dark:text-white" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill={color ? color : "#232323"}/>
        </svg>
      );
      break;
    case "plus":
      icon = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66602 12H19.3327"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19.3337V4.66699"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
      break;
    case "show":
      icon = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.9999 9.17001C10.4341 9.17001 9.16992 10.4342 9.16992 12C9.16992 13.5658 10.4341 14.83 11.9999 14.83C13.5657 14.83 14.8299 13.5658 14.8299 12C14.8299 10.4342 13.5657 9.17001 11.9999 9.17001ZM7.66992 12C7.66992 9.6058 9.60571 7.67001 11.9999 7.67001C14.3941 7.67001 16.3299 9.6058 16.3299 12C16.3299 14.3942 14.3941 16.33 11.9999 16.33C9.60571 16.33 7.66992 14.3942 7.66992 12Z"
            fill={color ? color : "#232323"}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.25734 8.99687C4.64825 5.23851 8.15186 2.96991 11.9998 2.96991C15.848 2.96991 19.3517 5.23871 21.7427 8.99737C22.2876 9.85171 22.5348 10.9461 22.5348 11.9949C22.5348 13.044 22.2875 14.1385 21.7423 14.9929C19.3514 18.7513 15.8478 21.0199 11.9998 21.0199C8.1517 21.0199 4.64795 18.7511 2.25703 14.9925L2.88984 14.5899L2.25765 14.9934C1.71224 14.139 1.46484 13.0442 1.46484 11.9949C1.46484 10.9459 1.71214 9.85129 2.25734 8.99687ZM11.9998 4.46991C8.78799 4.46991 5.71174 6.36111 3.52266 9.80245L3.52204 9.80344C3.16745 10.359 2.96484 11.1542 2.96484 11.9949C2.96484 12.8357 3.16745 13.6309 3.52204 14.1864L3.52266 14.1874C5.71174 17.6287 8.78799 19.5199 11.9998 19.5199C15.2117 19.5199 18.2879 17.6287 20.477 14.1874L20.4777 14.1864C20.8322 13.6309 21.0348 12.8357 21.0348 11.9949C21.0348 11.1542 20.8322 10.359 20.4777 9.80344L20.477 9.80245C18.2879 6.36111 15.2117 4.46991 11.9998 4.46991Z"
            fill={color ? color : "#232323"}
          />
        </svg>
      );
      break;
    case "hide":
      icon = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5299 9.46998L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.41998 11.9999 8.41998C12.9899 8.41998 13.8799 8.81998 14.5299 9.46998Z"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.41992 19.53C9.55992 20.01 10.7699 20.27 11.9999 20.27C15.5299 20.27 18.8199 18.19 21.1099 14.59C22.0099 13.18 22.0099 10.81 21.1099 9.39999C20.7799 8.87999 20.4199 8.38999 20.0499 7.92999"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.47 14.53L2 22"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.9998 2L14.5298 9.47"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
      break;
    case "call":
      icon = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M18.5 9C18.5 8.4 18.03 7.48 17.33 6.73C16.69 6.04 15.84 5.5 15 5.5"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 9C22 5.13 18.87 2 15 2"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
      break;
    case "home":
      icon = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V15"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z"
            stroke={color ? color : "#232323"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
      break;
    default:
      icon = null;
  }

  return (
    <span
      style={iconStyles}
      className={`[&>svg]:!w-[100%] [&>svg]:!h-[100%] inline-block ${
        className ? className : ""
      }`}
    >
      {icon}
    </span>
  );
};

export default Icons;
