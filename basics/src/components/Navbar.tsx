'use client'; // Ensure this component is rendered on the client side

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';

function Navbar() {
    const [active, setActive] = useState<string | null>('home'); // Default active item

    return (
        <div className="w-full bg-transparent z-50 fixed">
            <ul className="max-w-xl mt-10 mx-auto h-16 flex items-center justify-between text-white text-lg">
                <div className='w-full'>
                <Menu setActive={setActive}>
                    <MenuItem setActive={setActive} active={active} item="home">
                        
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="about">
                        <li
                            className={`cursor-pointer ${active === 'about' ? 'font-bold border-b-2 border-white' : ''}`}
                            onClick={() => setActive('about')}
                        >
                            <Link href="/about">About</Link>
                        </li>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="contact">
                        <li
                            className={`cursor-pointer ${active === 'contact' ? 'font-bold border-b-2 border-white' : ''}`}
                            onClick={() => setActive('contact')}
                        >
                            <Link href="/contact">Contact Us</Link>
                        </li>
                    </MenuItem>
                </Menu>
                </div>
                {/* Add more links here if needed */}
            </ul>
        </div>
    );
}

export default Navbar;
