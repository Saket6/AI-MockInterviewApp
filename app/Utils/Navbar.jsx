"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { ContactRound } from 'lucide-react';
import { Library } from 'lucide-react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ThemeBtn';

function Navbar() {
  const { user } = useUser();
  const path = usePathname();
  const [isopen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const navitems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard />
    },
    {
      href: '/interview',
      label: 'Mock Interview',
      icon: <ContactRound />
    },
    {
      href: '/prepare',
      label: 'Prepare',
      icon: <Library />
    }
  ];

  // const handleClickOutside = (event) => {
  //   if (navRef.current && !navRef.current.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isopen) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isopen]);

  return (
    <>
      <div onClick={() => setIsOpen(!isopen)} className="bg-neutral-900 z-50 border-2 border-neutral-700 p-2 md:hidden rounded-full fixed top-7 right-5">
        {isopen ? <X /> : <Menu />}
      </div>


      <div ref={navRef} className={`dark:bg-opacity-95 transition-all duration-500 ${!isopen ? 'translate-x-[-500px] md:translate-x-[0px] ' : "translate-x-[0px]"} fixed w-64 lg:z-10 z-50 md:w-full border-r-2 grid grid-rows-12 h-screen md:sticky left-0 top-0 col-span-2 dark:bg-neutral-900 border-neutral-200 py-10 px-4 md:px-8 dark:border-neutral-800`}>
        <div className='row-span-10 flex flex-col items-center'>
          <div>
            <Link href='/'>
              <Image src="/images/logo2.svg" height={200} width={200} alt='' />
            </Link>
          </div>
          <ul className='mt-4 w-full'>
            {navitems.map((item) => (
              <li key={item.href} className={`rounded-lg ${path.includes(item.href) ? 'bg-orange-500' : ''} my-3 hover:bg-orange-500 transition-all duration-100`}>
                <Link href={item.href} className='p-2 md:p-3 md:text-base text-sm flex'>
                  <span className='mr-3'>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}

            {
              !user ? <li className={`rounded-lg ${path.includes('/sign-in') ? 'bg-orange-500' : ''} my-3 hover:bg-orange-500 transition-all duration-100`}>
                <Link href={'/sign-in'} className='p-2 md:p-3 md:text-base text-sm flex'>
                  <span className='mr-3'>
                    <LogIn/>
                  </span>
                  Sign-In
                </Link>
              </li> : ''
            }

          </ul>
        </div>
        <div className='row-span-2 flex justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <UserButton />
            <span className='mt-3'>
              <ModeToggle className='mt-2' />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;