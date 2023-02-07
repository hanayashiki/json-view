import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <header className="p-2 flex items-center gap-x-3 border-b border-white border-opacity-30">
        <img src="/logo.svg" className="h-[2.5rem] w-[2.5rem]" />
        <div>JSON View</div>
      </header>

      {children}
    </div>
  );
};
