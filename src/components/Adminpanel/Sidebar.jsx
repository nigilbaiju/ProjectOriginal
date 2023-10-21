import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <ul>
        <a href='/home'><li>HOME</li></a>
       </ul>
        Registrations
       <ul>
        <a href='/product'><li>Product</li></a>
        <li>Category</li>
        <li>Customer</li>
       </ul>
       View
       <ul>
       <a href="/productview"><li>Product View</li></a>
      </ul>
      
    </div>
  );
};

export default Sidebar;
