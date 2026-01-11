'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  UserCircle,
  Star,
  Tag,
  LifeBuoy,
  LogOut,
  X,
  Store,
  PlusSquare,
  ChevronRight,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const VENDOR_LINKS = [
  { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { name: 'Add Gear', href: '/vendor/products/add', icon: PlusSquare },
  { name: 'My Products', href: '/vendor/products', icon: Package },
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
  { name: 'Earnings', href: '/vendor/earnings', icon: Wallet },
  { name: 'Reviews', href: '/vendor/reviews', icon: Star },
  { name: 'Promotions', href: '/vendor/promotions', icon: Tag },
  { name: 'Profile', href: '/vendor/profile', icon: UserCircle },
  { name: 'Support', href: '/vendor/support', icon: LifeBuoy },
]

export default function VendorSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const pathname = usePathname()
  const [identityName, setIdentityName] = useState<string>('Initializing...')
  const [isSyncing, setIsSyncing] = useState(false)

  // Trigger sync animation on path change
  useEffect(() => {
    setIsSyncing(true)
    const timer = setTimeout(() => setIsSyncing(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const sessionData = localStorage.getItem('user')
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData)
        setIdentityName(user.name || user.username || 'Gear Vendor')
      } catch (error) {
        setIdentityName('Elite Vendor')
      }
    } else {
      setIdentityName('Guest Terminal')
    }
  }, [])

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-brand-orange/20 backdrop-blur-sm z-50 lg:hidden transition-all duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-60 w-80 bg-white text-brand-slate flex flex-col transition-transform duration-500 ease-tight lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 border-r-4 border-slate-100',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sync Progress Bar */}
        <div className='h-1 w-full bg-slate-50 overflow-hidden relative'>
          <div
            className={cn(
              'absolute inset-y-0 left-0 bg-linear-to-r from-brand-orange to-orange-300 transition-all duration-700 ease-out',
              isSyncing ? 'w-full opacity-100' : 'w-0 opacity-0'
            )}
          />
        </div>

        {/* Branding Hub */}
        <div className='p-8 flex items-center justify-between shrink-0 border-b-4 border-slate-50 relative'>
          <Link
            href='/vendor'
            className='text-2xl font-black italic tracking-tighter uppercase group'
          >
            Gear
            <span className='text-brand-orange group-hover:drop-shadow-[0_0_8px_rgba(255,115,0,0.8)] transition-all'>
              Hub
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className='lg:hidden p-2.5 bg-orange-50 rounded-xl text-brand-orange active:scale-95 transition-all border-2 border-brand-orange/20 shadow-[0_0_15px_rgba(255,115,0,0.1)]'
          >
            <X size={20} strokeWidth={4} />
          </button>
        </div>

        {/* Navigation Rail with ORANGE SCROLLBAR */}
        <nav
          className={cn(
            'flex-1 px-4 py-6 space-y-2 overflow-y-auto',
            '[&::-webkit-scrollbar]:w-1.5',
            '[&::-webkit-scrollbar-track]:bg-slate-50',
            '[&::-webkit-scrollbar-thumb]:bg-brand-orange',
            '[&::-webkit-scrollbar-thumb]:rounded-full',
            'hover:[&::-webkit-scrollbar-thumb]:bg-orange-400'
          )}
        >
          <div className='flex items-center justify-between mb-4 ml-4 pr-4'>
            <p className='text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]'>
              Navigation System
            </p>
            {isSyncing && (
              <RefreshCw size={10} className='text-brand-orange animate-spin' />
            )}
          </div>

          {VENDOR_LINKS.map((link) => {
            const isActive = pathname === link.href
            const isAddAction = link.name === 'Add Gear'

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group relative overflow-hidden',
                  isActive
                    ? 'bg-brand-orange text-white shadow-[0_10px_25px_-5px_rgba(255,115,0,0.4)] scale-[1.02]'
                    : isAddAction
                    ? 'text-brand-orange bg-orange-50 border-2 border-brand-orange/10 hover:bg-brand-orange hover:text-white hover:shadow-[0_10px_20px_-5px_rgba(255,115,0,0.3)]'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-brand-slate hover:translate-x-1'
                )}
              >
                <div className='flex items-center gap-4 z-10'>
                  <link.icon
                    size={18}
                    className={cn(
                      'transition-all stroke-[2.5]',
                      isActive
                        ? 'text-white'
                        : 'text-brand-orange group-hover:scale-110',
                      isAddAction && !isActive && 'animate-[pulse_3s_infinite]'
                    )}
                  />
                  <span>{link.name}</span>
                </div>

                <ChevronRight
                  size={14}
                  strokeWidth={isActive ? 5 : 3}
                  className={cn(
                    'transition-all duration-300 z-10',
                    isActive
                      ? 'text-white translate-x-0 opacity-100'
                      : 'text-brand-orange -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  )}
                />
              </Link>
            )
          })}
        </nav>

        {/* Profile Section */}
        <div className='p-6 mt-auto bg-slate-50/50 border-t-4 border-slate-100 space-y-4'>
          {isSyncing && (
            <div className='flex items-center gap-2 justify-center mb-2'>
              <div className='w-1 h-1 bg-brand-orange rounded-full animate-bounce [animation-delay:-0.3s]' />
              <div className='w-1 h-1 bg-brand-orange rounded-full animate-bounce [animation-delay:-0.15s]' />
              <div className='w-1 h-1 bg-brand-orange rounded-full animate-bounce' />
              <span className='text-[8px] font-black text-brand-orange uppercase tracking-widest'>
                Syncing Node
              </span>
            </div>
          )}

          <div className='flex items-center gap-3 p-3 bg-white border-2 border-slate-100 rounded-2xl shadow-sm group cursor-default'>
            <div className='relative shrink-0'>
              <div className='w-11 h-11 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-[0_5px_15px_rgba(255,115,0,0.3)] overflow-hidden transition-transform group-hover:scale-110'>
                <Store size={22} strokeWidth={2.5} />
              </div>
              <div className='absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full ring-2 ring-emerald-500/20 animate-pulse' />
            </div>
            <div className='min-w-0'>
              <p className='text-[11px] font-black truncate text-brand-slate uppercase tracking-tighter leading-tight'>
                {identityName}
              </p>
              <p className='text-[9px] text-brand-orange uppercase tracking-widest font-black mt-0.5 flex items-center gap-1'>
                <span className='w-1 h-1 bg-brand-orange rounded-full' />{' '}
                Verified Node
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className='flex items-center gap-3 px-5 py-4 w-full rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-red-500 hover:text-white transition-all group'
          >
            <LogOut
              size={18}
              strokeWidth={3}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>
    </>
  )
}