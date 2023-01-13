import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends InputProps {
  label?: string;
  error?: string;
  type?: InputProps["type"] | "textarea";
  containerClassName?: string;
  children?: React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  label,
  error,
  className,
  containerClassName,
  children,
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <label
        className={`flex flex-col gap-2 text-white text-lg w-full ${className}`}
      >
        <span>{label}</span>
        <div className="w-full flex flex-nowrap">
          {children}
          <input
            className="rounded w-full p-2 -md h-14 bg-blue-dark border-white border"
            type="text"
            {...rest}
          />
        </div>
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextInput;
