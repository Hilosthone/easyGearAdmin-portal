'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  Package,
  BarChart3,
  Ticket,
  Settings,
  LogOut,
  X,
  ShieldCheck,
  Wallet,
  ChevronDown,
  ChevronRight,
  Banknote,
  History,
  Building,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const ADMIN_LINKS = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Vendors', href: '/admin/vendors', icon: Store, badgeKey: 'Vendors' },
  {
    name: 'KYC Verification',
    href: '/admin/vendors/verify',
    icon: ShieldCheck,
    badgeKey: 'KYC',
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    badgeKey: 'Orders',
  },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  {
    name: 'Support',
    href: '/admin/support',
    icon: Ticket,
    badgeKey: 'Support',
  },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const pathname = usePathname()
  const [adminName, setAdminName] = useState('Easygear')
  const [adminRole, setAdminRole] = useState('System Root')
  const [mounted, setMounted] = useState(false)
  const [isTreasuryOpen, setIsTreasuryOpen] = useState(
    pathname.includes('/admin/financials')
  )

  useEffect(() => {
    setMounted(true)

    // UPDATED: Parsing the 'user' object from LoginPage
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setAdminName(userData.name || 'Easygear')
        setAdminRole(userData.role || 'System Root')
      } catch (e) {
        console.error('Error parsing user data', e)
      }
    }
  }, [])

  const essentials: Record<string, number> = {
    Vendors: 2,
    KYC: 6,
    Orders: 5,
    Payments: 2,
    Support: 7,
    Reports: 2,
  }

  if (!mounted) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 lg:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-70 w-72 bg-blue-600 text-slate-200 flex flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 border-r border-blue-500 shadow-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Section */}
        <div className='p-8 flex items-center justify-between shrink-0'>
          <Link
            href='/admin'
            className='text-2xl font-black italic tracking-tighter text-white'
            onClick={() => setIsOpen(false)}
          >
            easyGear<span className='text-orange-500'>.</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className='lg:hidden p-2 bg-blue-700/50 rounded-xl text-white'
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar scroll-smooth'>
          {ADMIN_LINKS.map((link, index) => {
            const isActive = pathname === link.href
            const badgeCount = link.badgeKey ? essentials[link.badgeKey] : null
            const showTreasuryAfter = index === 5

            return (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-5 py-3 rounded-xl text-[13px] font-black transition-all group border-2',
                    isActive
                      ? 'bg-blue-800 border-blue-400 text-white shadow-lg shadow-blue-900/20'
                      : 'bg-transparent border-transparent text-blue-100 hover:bg-blue-700 hover:text-white'
                  )}
                >
                  <div className='flex items-center gap-3'>
                    <link.icon
                      size={18}
                      className={cn(
                        'stroke-[2.5]',
                        isActive
                          ? 'text-white'
                          : 'text-blue-200 group-hover:text-white'
                      )}
                    />
                    <span className='uppercase tracking-tight'>
                      {link.name}
                    </span>
                  </div>
                  {badgeCount && (
                    <span
                      className={cn(
                        'flex items-center justify-center min-w-5 h-5 px-1.5 rounded-lg text-[9px] font-black',
                        isActive
                          ? 'bg-white text-blue-800'
                          : 'bg-blue-900 text-white'
                      )}
                    >
                      {badgeCount}
                    </span>
                  )}
                </Link>

                {showTreasuryAfter && (
                  <div className='my-2'>
                    <button
                      onClick={() => setIsTreasuryOpen(!isTreasuryOpen)}
                      className={cn(
                        'w-full flex items-center justify-between px-5 py-3 rounded-xl text-[13px] font-black transition-all group border-2',
                        isTreasuryOpen || pathname.includes('/admin/financials')
                          ? 'border-blue-400/30 text-white bg-blue-700/50 shadow-inner'
                          : 'border-transparent text-blue-100 hover:text-white hover:bg-blue-700'
                      )}
                    >
                      <div className='flex items-center gap-3'>
                        <Wallet
                          size={18}
                          className='stroke-[2.5] text-blue-100'
                        />
                        <span className='uppercase tracking-tight'>
                          Treasury Hub
                        </span>
                      </div>
                      {isTreasuryOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {isTreasuryOpen && (
                      <div className='mt-1 ml-6 pl-4 border-l-2 border-blue-900/40 space-y-1 animate-in slide-in-from-top-2 duration-200'>
                        {[
                          {
                            name: 'Settlements',
                            href: '/admin/financials',
                            icon: Banknote,
                            badge: essentials.Payments,
                          },
                          {
                            name: 'Revenue Logs',
                            href: '/admin/financials/revenue',
                            icon: History,
                          },
                          {
                            name: 'Bank Nodes',
                            href: '/admin/financials/nodes',
                            icon: Building,
                          },
                        ].map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={cn(
                              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
                              pathname === sub.href
                                ? 'text-white bg-blue-800 shadow-sm'
                                : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                            )}
                          >
                            <sub.icon size={14} /> {sub.name}
                            {sub.badge && (
                              <span className='ml-auto bg-blue-900 text-white text-[8px] px-1.5 py-0.5 rounded'>
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </nav>

        {/* Footer Profile Section */}
        <div className='p-4 mt-auto border-t border-blue-500 space-y-2 bg-blue-700/40'>
          <div className='flex items-center gap-3 px-4 py-4 rounded-3xl bg-blue-800/60 border border-blue-400/20 shadow-xl'>
            <div className='w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-blue-600 shrink-0 shadow-inner'>
              <ShieldCheck size={22} strokeWidth={3} />
            </div>
            <div className='min-w-0'>
              <p className='text-[14px] font-black truncate text-white leading-none uppercase tracking-tight'>
                {adminName}
              </p>
              <p className='text-[10px] text-blue-200 uppercase tracking-[0.15em] font-black mt-2'>
                {adminRole} Node
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className='flex items-center gap-3 px-5 py-4 w-full rounded-2xl text-[11px] font-black uppercase tracking-widest text-blue-100  hover:bg-red-500 hover:text-white hover:border-red-700 border border-transparent transition-all group'
          >
            <LogOut
              size={18}
              strokeWidth={3}
              className='group-hover:rotate-12 transition-transform'
            />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>
    </>
  )
}
