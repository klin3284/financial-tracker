import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function AccountSignIn() {
  return (
    <div
      className='flex items-center justify-center min-h-screen'
      style={{ background: '#b7bfb7' }}>
      <div className='w-full lg:w-3/4 xl:w-2/3 bg-cover bg-center rounded-md shadow-2xl overflow-hidden'>
        <div className='lg:grid lg:grid-cols-2'>
          <div className='hidden lg:block h-full w-full' style={{ background: '#798574' }}>
            <Image
              src='/auth-planner.png'
              alt='Authentication'
              height={800}
              width={800}
              className='object-contain h-full w-full my-auto'
            />
          </div>
          <div className='flex items-center justify-center py-12 bg-white'>
            <div className='mx-auto grid w-[350px] gap-6'>
              <SignIn signUpUrl='/sign-up' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
