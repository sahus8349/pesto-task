import React, { FC } from "react";

export type TypographyProps = {
  variant: "h1" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "p" | "p";
  className?: string;
  size?: string;
  title?: string;
  children: React.ReactNode;
};

const Typography: FC<TypographyProps> = ({
  variant,
  className,
  size,
  children,
  title,
}) => {
  const Tag = variant as keyof JSX.IntrinsicElements;
  // const classes = className ? `typography ${className}` : "typography";
  const classes = `typography ${className ? className : ""}
  ${size === "h1lg" ? "text-1000" : ""} 
  ${size === "h1md" ? "text-900" : ""} 
  ${variant === "h2" ? "text-800" : ""}
  ${variant === "h3" ? "text-700" : ""}
  ${variant === "h4" ? "text-600" : ""}
  ${variant === "h5" ? "text-500" : ""}
  ${variant === "h6" ? "text-400" : ""}
  ${size === "xxl" ? "text-500" : ""}
  ${size === "xl" ? "text-450" : ""}
  ${size === "lg" ? "text-400" : ""}
  ${size === "md" ? "text-300" : ""}
  ${size === "sm" ? "text-200" : ""}
  ${size === "xs" ? "text-100" : ""}
  `;

  return <Tag className={classes} title={title}>{children}</Tag>;
};

export default Typography;
