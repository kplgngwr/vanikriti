'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage the menu visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the state between true and false
    };

    return (
        <nav className="bg-white w-[95%] fixed z-20 top-6 start-0 p-2 mx-6 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-10 rounded-full" alt="VaniKriti Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">VaniKriti</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link href="/sign-in">
                        <Button>
                            Sign In
                        </Button>
                    </Link>
                    <p>&nbsp;</p>
                    <Link href="/sign-up">
                        <Button>
                            Sign Up
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={toggleMenu} type="button" aria-controls="navbar-sticky" aria-expanded={isOpen} className='inline-flex md:hidden'>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </Button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 text-white rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full">
                        <li>
                            <Link href="/#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-blue-700" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                        </li>
                        <li>
                            <Link href="/#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
                        </li>
                        <li>
                            <Link href="/#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text:white dark:hover:bg-gray-700 dark:hover:text:white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
