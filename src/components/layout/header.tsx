'use client'

import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { base } from '@/lib/base';
import { Loader2 } from 'lucide-react';


export default function Header() {

  const [isLoading, setIsLoading] = useState(false);

  const [userBalance, setUserBalance] = useState([]);

  const fetchUserBalance = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base}/api/v1/auth/balance/testing`)
      setUserBalance(response.data.message)
      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserBalance()
  }, [])

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="h-10 rounded-full" alt="VaniKriti Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">VaniKriti</span>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <IconCurrencyDollar className="h-6 w-6 text-green-500" />
            <span className="text-lg font-medium text-gray-700 flex">{isLoading ? <Loader2 className="mr-2 animate-spin" /> : userBalance} Credits</span>
          </div>
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
