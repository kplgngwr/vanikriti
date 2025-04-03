import Link from 'next/link'
import React from 'react'

const AuthFooter = () => {
    return (
        <footer className="bg-white">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://indian-oil-admin.pages.dev/assets/favicon-9BK-ZSO9.jpeg" className="h-8" alt="VaniKriti Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">VaniKriti</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Terms</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center ">© 2024 <Link href="/" className="hover:underline">VaniKriti</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default AuthFooter