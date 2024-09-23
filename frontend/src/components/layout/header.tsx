import Link from 'next/link';
import { Menu, ChartNoAxesCombined } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { SignedIn, UserButton } from '@clerk/nextjs';
import ThemeToggle from '@components/themeToggle';

const Header = () => (
  <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
      <Link href='#' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
        <ChartNoAxesCombined className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <Link href='#' className='text-foreground transition-colors hover:text-foreground'>
        Dashboard
      </Link>
      <Link href='#' className='text-muted-foreground hover:text-foreground'>
        Analytics
      </Link>
      <Link href='#' className='text-muted-foreground hover:text-foreground'>
        Preferences
      </Link>
    </nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
            <ChartNoAxesCombined className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Link href='#' className='hover:text-foreground'>
            Dashboard
          </Link>
          <Link href='#' className='text-muted-foreground hover:text-foreground'>
            Analytics
          </Link>
          <Link href='#' className='text-muted-foreground hover:text-foreground'>
            Preferences
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
    <div className='flex flex-1 sm:flex-initial gap-4 ml-auto md:gap-2 lg:gap-4'>
      <ThemeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);

export default Header;
