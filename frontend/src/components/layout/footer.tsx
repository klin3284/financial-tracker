'use client';

import Link from 'next/link';

const Footer = () => (
  <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
    <p className='text-xs'>© 2024 Finance Tracker. All rights reserved.</p>
    <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
      <Link className='text-xs hover:underline underline-offset-4' href='#'>
        Terms of Service
      </Link>
      <Link className='text-xs hover:underline underline-offset-4' href='#'>
        Privacy
      </Link>
    </nav>
  </footer>
);

export default Footer;
