import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface Props extends InputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  children?: React.ReactNode;
}

const Textarea: React.FC<Props> = ({
  label,
  error,
  className,
  containerClassName,
  inputClassName,
  children,
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <label
        className={`flex flex-col gap-2 text-white text-lg w-full ${className}`}
      >
        <span>{label}</span>
        <div className="w-full flex flex-nowrap h-full">
          {children}
          <textarea
            className={`rounded w-full p-2 -md min-h-14 bg-blue-dark border-white border ${inputClassName}`}
            {...rest}
          />
        </div>
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Textarea;
