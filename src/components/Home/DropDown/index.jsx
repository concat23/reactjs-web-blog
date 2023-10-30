import React from 'react'
import './style.css'
import MenuItems from '../MenuItems';

export const DropDown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
      <ul
        className={`dropdown ${dropdownClass} ${
          dropdown ? 'show' : ''
        }`}
      >
        {submenus.map((submenu, index) => (
          <MenuItems
            items={submenu}
            key={index}
            depthLevel={depthLevel}
          />
        ))}
      </ul>
    );
  };

export default DropDown;
