'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Menu,
  Search,
  Bell,
  Command,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Activity,
  Cpu,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'
import SearchOverlay from './SearchOverlay'

interface AdminHeaderProps {
  setIsOpen: (open: boolean) => void
}

export default function AdminHeader({ setIsOpen }: AdminHeaderProps) {
  const pathname = usePathname()
  const [adminName, setAdminName] = useState('Easygear')
  const [adminRole, setAdminRole] = useState('System Root')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Sync scroll state for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // UPDATED: Consistency with LoginPage localStorage key
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.name) setAdminName(userData.name)
        if (userData.role) setAdminRole(userData.role)
      } catch (e) {
        console.error('Error parsing header user data', e)
      }
    }
  }, [])

  // CMD+K Shortcut Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-60 w-full transition-all duration-300 border-b border-transparent',
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl border-zinc-200/60 py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10 gap-4 max-w-400 mx-auto'>
          {/* LEFT: Branding & Toggle */}
          <div className='flex items-center gap-4 shrink-0'>
            <button
              onClick={() => setIsOpen(true)}
              className='p-3 hover:bg-zinc-100 rounded-2xl lg:hidden text-zinc-500 active:scale-95 transition-all border border-transparent hover:border-zinc-200'
            >
              <Menu size={20} strokeWidth={3} />
            </button>

            <div className='hidden sm:flex items-center gap-3'>
              <div className='bg-slate-900 p-2 rounded-xl'>
                <Cpu size={16} className='text-blue-500 animate-pulse' />
              </div>
              <div className='flex flex-col'>
                <h1 className='text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] leading-none'>
                  Terminal <span className='text-blue-600'>v1.0</span>
                </h1>
                <p className='text-[8px] font-bold text-zinc-400 uppercase mt-1'>
                  Node: Abuja_Main
                </p>
              </div>
            </div>
          </div>

          {/* CENTER: Command Search */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className='flex-1 max-w-2xl group cursor-text'
          >
            <div className='relative w-full group'>
              <div className='absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none'>
                <Search
                  className='text-zinc-400 group-hover:text-blue-600 transition-colors'
                  size={16}
                  strokeWidth={3}
                />
              </div>
              <div className='w-full bg-zinc-100/50 border-2 border-transparent group-hover:bg-zinc-100 group-hover:border-zinc-200 rounded-[1.25rem] py-2.5 pl-12 pr-4 sm:pr-12 text-xs font-black text-zinc-400 flex items-center transition-all uppercase tracking-widest'>
                <span className='truncate'>Invoke Command...</span>
              </div>

              {/* Hotkey Indicator */}
              <div className='absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 px-2 py-1 bg-white border-2 border-zinc-100 rounded-lg shadow-sm'>
                <Command size={10} strokeWidth={3} className='text-blue-600' />
                <span className='text-[9px] font-black text-slate-900'>K</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Notifications & Identity */}
          <div className='flex items-center gap-2 sm:gap-5 shrink-0'>
            {/* System Notifications */}
            <button className='relative p-3 text-zinc-400 hover:text-blue-600 transition-colors group hidden xs:block'>
              <Bell size={20} strokeWidth={2.5} />
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform' />
            </button>

            <div className='h-8 w-0.5 bg-zinc-100 hidden sm:block' />

            <div className='relative'>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center gap-3 p-1 pr-3 hover:bg-white rounded-2xl transition-all border-2 border-transparent hover:border-zinc-100 group'
              >
                <div className='relative'>
                  <div className='h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-95 overflow-hidden'>
                    <User strokeWidth={2.5} size={20} />
                  </div>
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full' />
                </div>

                <div className='hidden md:block text-left'>
                  <p className='text-xs font-black text-slate-900 leading-none uppercase tracking-tighter'>
                    {adminName}
                  </p>
                  <div className='flex items-center gap-1 mt-1'>
                    <Activity size={8} className='text-emerald-500' />
                    <p className='text-[8px] font-black text-zinc-400 uppercase tracking-widest'>
                      {adminRole}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={14}
                  strokeWidth={3}
                  className={cn(
                    'text-zinc-300 transition-transform hidden md:block',
                    isProfileOpen && 'rotate-180 text-blue-600'
                  )}
                />
              </button>

              {/* Profile Dropdown Module */}
              {isProfileOpen && (
                <div className='absolute right-0 mt-4 w-64 bg-white border-4 border-slate-50 rounded-[2.5rem] shadow-2xl p-3 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 z-70'>
                  <div className='px-5 py-5 bg-slate-50/50 rounded-3xl mb-2 border border-slate-100'>
                    <p className='text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1'>
                      Identity Verified
                    </p>
                    <p className='text-sm font-black text-slate-900 truncate uppercase tracking-tighter'>
                      {adminName}
                    </p>
                  </div>

                  <div className='grid gap-1'>
                    <DropdownItem
                      icon={<ShieldCheck size={16} />}
                      label='Clearance Level'
                      color='text-blue-600'
                    />
                    <DropdownItem
                      icon={<Settings size={16} />}
                      label='Terminal Prefs'
                    />
                  </div>

                  <div className='h-1 bg-slate-50 my-2 rounded-full mx-2' />

                  <button
                    onClick={() => {
                      localStorage.clear()
                      window.location.href = '/login'
                    }}
                    className='w-full flex items-center gap-3 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all'
                  >
                    <LogOut size={16} strokeWidth={3} />
                    Disconnect Node
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

function DropdownItem({
  icon,
  label,
  color = 'text-zinc-400',
}: {
  icon: React.ReactNode
  label: string
  color?: string
}) {
  return (
    <button className='w-full flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-slate-50 rounded-2xl transition-all group'>
      <span className={cn('transition-transform group-hover:scale-110', color)}>
        {icon}
      </span>
      {label}
    </button>
  )
}
