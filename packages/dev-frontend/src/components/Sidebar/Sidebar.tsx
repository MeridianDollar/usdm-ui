import React, { useState, useEffect } from 'react';
import { useHistory, useLocation   } from "react-router-dom";
import './Sidebar.css'; // Import CSS for styling
import menuConfig, { MenuItemConfig, SubMenuItemConfig } from "./SidebarConfig";
import {SwitchNetwork} from '../NetworkSwitcher';

interface SidebarProps {
    chainId: number;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { chainId } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);
    const history = useHistory();
  
    const toggleExpandOpen = () => {
      setIsExpanded(true);
    };
    const toggleExpandClose = () => {
      setIsExpanded(false);
    };

    useEffect(() => {
        // Function to determine initial expand state based on screen size
        const handleResize = () => {
          const isSmallScreen = window.innerWidth < 768; // Define "small screen" as less than 768px
          setIsExpanded(isSmallScreen);
        };    
        handleResize();    
      }, []);

    const handleItemClick = async (chainId: number, targetChainId: number, path: string, isSubSubMenu: boolean) => {
        if(chainId != targetChainId && targetChainId != 0){ // change networks if required
            let newPath = path
            if (isSubSubMenu) {                
                const hashPath = window.location.hash; 
                const basePath = hashPath.split('/')[0];
                newPath = `#${basePath.replace(/^#/, '')}${path.slice(1)}`;
            }
            try {
                const newChainName = await SwitchNetwork("0x" + targetChainId.toString(16)) 
                // if (newChainName === "Telos") { // getChainName(targetChainId)) {
                window.location.href = newPath;
                // }
            } catch (error) {
                console.error('Error switching network:', error);
            }
        } else {
            if(targetChainId === 0){
                window.open(path, '_blank');
            } else {
                if(isSubSubMenu){
                    history.push(path);
                } else {
                    window.location.href = path
                }
            }
        }
    }; 

    const handleMenuItemClick = async (isExpanded: boolean, chainId: number, targetChainId: number, item: MenuItemConfig) => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches && (item.subMenu || !isExpanded)) { // on small screen open submenus if available
            toggleExpandOpen()
            setActiveSubMenu(activeSubMenu === item.title ? null : item.title); 
        } else {
            handleItemClick(chainId, targetChainId, item.path, false)
        }
    }; 

    const handleArrowClick = (item: MenuItemConfig) => {
        if (item.subMenu) {
            setActiveSubMenu(activeSubMenu === item.title ? null : item.title);      
        };
    }

    const handleSubArrowClick = (subItem: SubMenuItemConfig) => {
        if (subItem.subSubMenu) {
            setActiveSubSubMenu(activeSubSubMenu === subItem.name ? null : subItem.name);      
        };
    }


    return (
        <div className={`icon-bar ${isExpanded ? 'expanded' : ''}`} onMouseEnter={toggleExpandOpen} onMouseLeave={toggleExpandClose}>
            <div className="submenu-container">
                {menuConfig.map((item, index) => (
                    <div key={index} className="menu-item-container">
                        <div className="icon-container">
                            <div className="sidebar-menu-item" >
                                <item.icon className="icon" onClick={() => handleMenuItemClick(isExpanded, chainId, chainId, item)} />
                                <span className="menu-title" onClick={() => handleMenuItemClick(isExpanded, chainId, chainId, item)}>{item.title}</span>
                                {isExpanded && item.subMenu && (
                                    <span className="arrow" onClick={() => handleArrowClick(item)}>
                                        {activeSubMenu === item.title ? "▼" : "▶"}
                                    </span>
                                )}
                            </div>
                        </div>
                        {isExpanded && activeSubMenu === item.title && item.subMenu && (
                            <div className="sub-menu">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <div key={subIndex} className="sub-menu-item">
                                        <span className="submenu-title" onClick={() => handleItemClick(chainId, subItem.networkId, subItem.path, false)}>
                                            {subItem.name}
                                        </span>
                                        {subItem.subSubMenu && (
                                            <span className="submenu-arrow" onClick={() => handleSubArrowClick(subItem)}>
                                                {activeSubSubMenu === subItem.name ? "▼" : "▶"}
                                            </span>
                                        )}
                                        {activeSubSubMenu === subItem.name && subItem.subSubMenu && (
                                            <div className="sub-sub-menu">
                                                {subItem.subSubMenu.map((subSubItem, subSubIndex) => (
                                                    <span key={subSubIndex} className="sub-submenu-title" onClick={() => handleItemClick(chainId, subItem.networkId, subSubItem.path, true)}>
                                                        {subSubItem.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

