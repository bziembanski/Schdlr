import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

const TextInput: React.FC<Props> = ({ label, error, className, ...rest }) => {
  return (
    <div className="w-full">
      <label
        className={`flex flex-col gap-2 text-white text-2xl w-full ${className}`}
      >
        <span>{label}</span>
        <input
          className="h-20 p-2 rounded-md bg-blue-dark border-white border"
          type="text"
          {...rest}
        />
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextInput;
