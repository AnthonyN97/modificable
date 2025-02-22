import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const DropdownMenu = ({ linksDropMenu, onMouseEnter, onMouseLeave }) => {
    return (
        <div
            className="absolute left-0 top-full bg-white text-black shadow-lg rounded-md w-40 z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {linksDropMenu.map((link, index) => (
                <Link key={index} to={link.link} className="block px-4 py-2 hover:bg-gray-200 hover:rounded-md">
                    {link.text}
                </Link>
            ))}
        </div>
    );
};

const MobileDropdownMenu = ({ linksDropMenu, isOpen, onLinkClick }) => {
    return (
        <div className={`${isOpen ? 'block' : 'hidden'} bg-white text-black rounded-md w-full`}>
            {linksDropMenu.map((link, index) => (
                <Link
                    key={index}
                    to={link.link}
                    className="block px-4 py-2 hover:bg-gray-200 hover:rounded-md"
                    onClick={onLinkClick} // Cierra el menú al hacer clic en un enlace
                >
                    {link.text}
                </Link>
            ))}
        </div>
    );
};

const NavItem = ({ label, linksNavItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li
            className="relative h-full flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <motion.div
                className="relative w-full h-full flex items-center justify-center overflow-hidden px-4"
                initial={{ background: "bg-pink-200" }}
                whileHover={{ background: "bg-pink-600" }}
                transition={{ duration: 0.3 }}
            >
                <span className="relative z-10">{label}</span>
                <span className="ml-2">&#9660;</span>

                <motion.div
                    className="absolute top-0 right-0 w-0 h-full bg-pink-500"
                    animate={{ width: isOpen ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />

                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white"
                    animate={{ width: isOpen ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </motion.div>

            {isOpen && (
                <DropdownMenu
                    linksDropMenu={linksNavItem}
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                />
            )}
        </li>
    );
};

const MobileNavItem = ({ label, linksNavItem, isOpen, onClick, onLinkClick }) => {
    return (
        <li className="w-full">
            <div
                className="w-full flex justify-between items-center px-4 py-2 bg-pink-500 text-white"
                onClick={onClick}
            >
                <span>{label}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>
            <MobileDropdownMenu linksDropMenu={linksNavItem} isOpen={isOpen} onLinkClick={onLinkClick} />
        </li>
    );
};

const MobileMenu = ({ links, isOpen, onClose }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Cierra la sección si ya está abierta
    };

    const handleLinkClick = () => {
        onClose(); // Cierra el menú móvil al hacer clic en un enlace
    };

    return (
        <motion.div
            className=" fixed top-0 left-0 w-64 h-full bg-pink-500 text-white z-50"
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? '0%' : '-100%' }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-white">×</button>
            </div>
            <ul className="mt-4">
                {links.map((link, index) => (
                    <MobileNavItem
                        key={index}
                        label={link.label}
                        linksNavItem={link.dropMenu}
                        isOpen={openIndex === index}
                        onClick={() => handleItemClick(index)}
                        onLinkClick={handleLinkClick}
                    />
                ))}
            </ul>
        </motion.div>
    );
};

const Navbar = ({ links }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="bg-pink-700 text-white h-15 content-center">
            <div className="max-w-screen-xl h-full mx-auto flex justify-between items-center px-4">
                <Link to="/" className="text-xl lg:text-3xl font-bold">Pastelitos.inc</Link>
                {isMobile ? (
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                        ☰
                    </button>
                ) : (
                    <ul className="flex h-full space-x-0">
                        {links.map((link, index) => (
                            <NavItem
                                key={index}
                                label={link.label}
                                linksNavItem={link.dropMenu}
                            />
                        ))}
                    </ul>
                )}
            </div>
            {isMobile && (
                <MobileMenu
                    links={links}
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;