import React from "react";

type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-6 flex w-full items-center justify-between animate-fade-in">
      {/* Title */}
      <div>
        <h1
          className={`${
            isSmallText ? "text-lg" : "text-3xl"
          } font-bold text-gray-800 transition-colors duration-300 group`}
        >
          <span className="relative inline-block pb-1">
            {name}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </span>
        </h1>
      </div>

      {/* Button Component */}
      {buttonComponent && (
        <div className="transition-transform duration-300 group-hover:scale-105">
          {buttonComponent}
        </div>
      )}
    </div>
  );
};

export default Header;