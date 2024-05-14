import React from "react";

const Layout : React.FC<{children : React.ReactNode}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>Track habits</h1>
      {children}
    </div>
  );
};

export default Layout;