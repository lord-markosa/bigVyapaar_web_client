import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import "./DropdownMenu.scss";

const DropdownMenu = ({ position = "left", options = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onOptionClickHandler = (option) => {
        return () => {
            setIsOpen(false);
            option.onClick();
        };
    };

    return (
        <div className="dropdown-menu-container" ref={menuRef}>
            <button className="menu-button" onClick={toggleMenu}>
                <IoMdMore />
            </button>
            {isOpen && (
                <div className={`menu-options ${position}`}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={onOptionClickHandler(option)}
                            className="menu-option"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
