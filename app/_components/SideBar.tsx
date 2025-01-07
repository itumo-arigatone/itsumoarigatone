import React, { useState } from "react";
import "@/app/stylesheets/components/sidebar.scss";
import Image from 'next/image'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ?
          <Image className="" src="/icons/close.svg" alt="menu close" width={24} height={24} priority />
          :
          <Image className="" src="/icons/menu.svg" alt="open menu" width={24} height={24} priority />
        }
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a className="" href="/category/bag/">バッグ</a>
          </li>
          <li>
            <a className="" href="/category/wallet/">財布</a>
          </li>
          <li>
            <a className="" href="/category/accessory/">その他小物</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className="" href="/blog/">ブログ</a>
          </li>
        </ul>
      </div>
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;