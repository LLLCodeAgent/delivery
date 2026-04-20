'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/orders/new', label: 'Create Order' },
  { href: '/tracking', label: 'Tracking' },
  { href: '/drivers', label: 'Driver Panel' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <h1>LogistiX</h1>
      <nav>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
