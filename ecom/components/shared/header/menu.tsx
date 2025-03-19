"use client"

import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <Link href='/auth/login' className='header-button'>
          Hello, Sign In
        </Link>
        <Link href='/cart' className='header-button'>
          <div className='flex items-end'>
            <ShoppingCartIcon className='h-8 w-8' />
            Cart
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className='header-button bg-red-500 text-white px-4 py-2 rounded'
        >
          Logout
        </button>
      </nav>
    </div>
  )
}