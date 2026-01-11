'use client'

import React, { useEffect, useState } from 'react'
import { Menu, Search, Bell, UserCircle, Settings } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface HeaderProps {
  setIsOpen: (val: boolean) => void
  role: 'admin' | 'vendor'
}

export default function Header({ setIsOpen, role }: HeaderProps) {
  // 1. Create state for the dynamic identity name
  const [identityName, setIdentityName] = useState<string>('Guest')

  // 2. Sync with localStorage on mount
  useEffect(() => {
    const sessionData = localStorage.getItem('user')
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData)
        setIdentityName(user.name || 'User')
      } catch (error) {
        setIdentityName(role === 'admin' ? 'System Admin' : 'Merchant')
      }
    }
  }, [role])

  return (
    <header className='h-24 bg-white border-b-4 border-slate-100 sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between'>
      {/* Left: Mobile Toggle & Context Title */}
      <div className='flex items-center gap-4'>
        <button
          onClick={() => setIsOpen(true)}
          className='lg:hidden p-3 bg-slate-100 text-brand-slate rounded-2xl hover:bg-brand-blue hover:text-white transition-all active:scale-95'
        >
          <Menu size={22} strokeWidth={3} />
        </button>

        <div className='hidden sm:block'>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1'>
            {role === 'admin' ? 'System Control' : 'Merchant Portal'}
          </p>
          <h2 className='text-xl font-black text-brand-slate tracking-tight'>
            {role === 'admin' ? 'Administrator Terminal' : 'Vendor Dashboard'}
          </h2>
        </div>
      </div>

      {/* Center: Search */}
      <div className='hidden md:flex flex-1 max-w-md mx-10 relative group'>
        <Search
          className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors'
          size={18}
          strokeWidth={3}
        />
        <input
          type='text'
          placeholder='Search records, orders, or gear...'
          className='w-full pl-14 pr-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-blue outline-none font-bold text-sm transition-all shadow-sm group-hover:bg-slate-100/50'
        />
      </div>

      {/* Right: Actions */}
      <div className='flex items-center gap-2 md:gap-4'>
        <button className='relative p-3 text-slate-400 hover:text-brand-blue hover:bg-slate-50 rounded-2xl transition-all group'>
          <Bell size={22} strokeWidth={2.5} />
          <span className='absolute top-3 right-3 w-3 h-3 bg-brand-orange border-2 border-white rounded-full animate-pulse' />
        </button>

        {role === 'admin' && (
          <button className='hidden sm:flex p-3 text-slate-400 hover:text-brand-blue hover:bg-slate-50 rounded-2xl transition-all'>
            <Settings size={22} strokeWidth={2.5} />
          </button>
        )}

        <div className='h-10 w-0.5 bg-slate-100 mx-2 hidden sm:block' />

        {/* Profile Identity - Updated to reflect Identity Name */}
        <div className='flex items-center gap-3 pl-2'>
          <div className='hidden lg:block text-right'>
            <p className='text-sm font-black text-brand-slate leading-none'>
              {identityName}
            </p>
            <p className='text-[10px] font-bold text-emerald-500 uppercase mt-1'>
              Online
            </p>
          </div>
          <div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white font-black text-lg',
              role === 'admin'
                ? 'bg-brand-blue shadow-brand-blue/20'
                : 'bg-brand-orange shadow-brand-orange/20'
            )}
          >
            {/* Show First Initial or Icon */}
            {identityName !== 'Guest' ? (
              identityName.charAt(0).toUpperCase()
            ) : (
              <UserCircle size={28} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}