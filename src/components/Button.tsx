import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-white text-blue-dark py-6 px-20 rounded-3xl ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
