// app/auth/AuthTabs.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashTabs() {
  const pathname = usePathname();

  const getTabStyle = (path) => {
    return pathname === path
      ? 'border-b-2 border-white font-semibold'
      : 'text-white-500 hover:text-gray-400';
  };

  return (
    <div className="relative flex justify-center space-x-8 mb-8 border-b">
      <div className="flex space-x-8">
        <Link
          href="/auth/login"
          className={`pb-2 px-4 ${getTabStyle('/auth/login')}`}
        >
          My Work
        </Link>
        <Link
          href="/dashboard"
          className={`pb-2 px-4 ${getTabStyle('/dashboard')}`}
        >
          Submit
        </Link>
        <Link
          href="/auth/hongga"
          className={`pb-2 px-4 ${getTabStyle('/auth/hongga')}`}
        >
          Review
        </Link>
      </div>
      <Link
        href="/profile"
        className={`absolute top-0 right-0 pb-2 px-4 ${getTabStyle('/profile')}`}
      >
        Profile
      </Link>
    </div>
  );
}

export default DashTabs;