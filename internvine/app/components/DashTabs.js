// app/auth/AuthTabs.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashTabs() {
  const pathname = usePathname();
  const isSignUp = pathname === '/auth/signup';

  return (
    <div className="relative flex justify-center space-x-8 mb-8 border-b">
      <div className="flex space-x-8">
        <Link
          href="/auth"
          className={`pb-2 px-4 ${
            !isSignUp
              ? 'border-b-2 border-white font-semi-bold'
              : 'text-white-500 hover:text-gray-400"'
          }`}
        >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className={`pb-2 px-4 ${
            isSignUp
              ? 'border-b-2 border-white font-semibold'
              : 'text-white-500 hover:text-gray-400"'
          }`}
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signup"
          className={`pb-2 px-4 ${
            isSignUp
              ? 'border-b-2 border-white font-semibold'
              : 'text-white-500 hover:text-gray-400"'
          }`}
        >
          Hongga
        </Link>
      </div>
      <Link
        href="/profile"
        className="absolute top-0 right-0 pb-2 px-4 text-white-500 hover:text-gray-400"
      >
        Profile
      </Link>
    </div>
  );
}

export default DashTabs;