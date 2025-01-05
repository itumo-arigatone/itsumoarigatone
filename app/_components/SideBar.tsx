import React, { useState } from "react";
import "@/app/stylesheets/components/sidebar.scss";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a className="list-link" href="/category/bag/">バッグ</a>
          </li>
          <li>
            <a className="list-link" href="/category/wallet/">財布</a>
          </li>
          <li>
            <a className="list-link" href="/category/accessory/">その他小物</a>
          </li>
        </ul>
      </div>
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;