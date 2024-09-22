'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LineChart, PiggyBank, Wallet, Lock, Target, ArrowRight } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='w-full border-b'>
        <div className='container mx-auto px-4 md:px-6 max-w-7xl flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2 font-bold text-lg'>Fitness Tracker</div>
          <nav className='ml-auto flex gap-4 sm:gap-6'>
            <Button asChild size='sm' variant='outline' className='font-semibold'>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button asChild size='sm' className='font-semibold flex items-center gap-2'>
              <Link href='/sign-up'>
                Get Started
                <ArrowRight className='h-5 w-5' />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className='flex flex-col flex-grow'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary-foreground to-secondary-foreground/35'>
          <div className='container mx-auto px-4 md:px-6 max-w-7xl'>
            <div className='grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-primary text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                    Manage Your Finances with Ease
                  </h1>
                  <p className='text-primary/70 md:text-xl'>
                    Finance Tracker helps you track expenses, set budgets, and achieve your
                    financial goals. All for free.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button asChild size='lg' className='font-semibold'>
                    <Link href='/sign-up'>Get Started</Link>
                  </Button>
                  <Button asChild variant='outline' size='lg'>
                    <Link href='#features' className='font-semibold'>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Image
                  src='/task-management.png'
                  alt='Financial management illustration'
                  width={550}
                  height={300}
                />
              </div>
            </div>
          </div>{' '}
        </section>
        <section id='features' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6 max-w-5xl'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
              Powerful Features to Manage Your Money
            </h2>
            <motion.div
              className='mt-12 text-center'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={cardVariants}>
              <div className='grid gap-6 mb-6 lg:grid-cols-3 lg:gap-12 mx-auto lg:mb-12'>
                <Card className='py-4 px-6'>
                  <CardHeader>
                    <Wallet className='h-14 w-14 mb-2 text-primary mx-auto' />
                    <CardTitle className='text-center'>Expense Tracking</CardTitle>
                    <CardDescription className='text-center'>
                      Easily log and categorize your expenses to understand your spending habits.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className='py-4 px-6'>
                  <CardHeader>
                    <PiggyBank className='h-14 w-14 mb-2 text-primary mx-auto' />
                    <CardTitle className='text-center'>Budget Planning</CardTitle>
                    <CardDescription className='text-center'>
                      Set budgets for different categories and track your progress throughout the
                      month.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className='py-4 px-6'>
                  <CardHeader>
                    <LineChart className='h-14 w-14 mb-2 text-primary mx-auto' />
                    <CardTitle className='text-center'>Financial Insights</CardTitle>
                    <CardDescription className='text-center'>
                      Gain valuable insights into your financial health with detailed reports and
                      analytics.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 mx-auto'>
                <Card className='py-4 px-6'>
                  <CardHeader className='items-center'>
                    <Target className='h-14 w-14 mb-2 text-primary mx-auto' />
                    <CardTitle className='text-center'>Goal Setting & Tracking</CardTitle>
                    <CardDescription className='text-center'>
                      Set financial goals like saving for a vacation or paying off debt. Track your
                      progress with visual indicators and receive motivational updates.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className='py-4 px-6'>
                  <CardHeader className='items-center'>
                    <Lock className='h-14 w-14 mb-2 text-primary mx-auto' />
                    <CardTitle className='text-center'>Bank-Level Security</CardTitle>
                    <CardDescription className='text-center'>
                      Your financial data is protected with state-of-the-art encryption and security
                      measures. We prioritize your privacy and the safety of your sensitive
                      information.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Trusted by Leading Banks
              </h2>
              <p className='max-w-[600px] text-primary-foreground/70 md:text-xl'>
                Connect your bank for automatic transaction uploads and seamless financial
                management.
              </p>
              <div className='flex flex-wrap justify-center gap-x-12 gap-y-10 py-8'>
                {[
                  '/citi-bank.png',
                  '/td-bank.png',
                  '/chase.png',
                  '/wells-fargo.png',
                  '/capitol-one.png',
                ].map(i => (
                  <div key={i} className='bg-transparent flex items-center justify-center'>
                    <Image
                      src={i}
                      alt={`Bank ${i} logo`}
                      width={120}
                      height={120}
                      className='object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id='about' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-primary text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  About Finance Tracker
                </h2>
                <p className='max-w-3xl text-primary/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Finance Tracker was created with a simple mission: to make personal finance
                  management accessible to everyone. We believe that understanding and controlling
                  your finances shouldn't be a luxury, but a fundamental right.
                </p>
              </div>
              <div className='flex flex-row gap-4'>
                <Button asChild size='default'>
                  <Link href='/sign-up' className='font-semibold py-2 px-6'>
                    Get Started
                  </Link>
                </Button>
                <Button asChild variant='outline' size='default'>
                  <Link href='/' className='font-semibold py-2 px-6'>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
