'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  User,
  Store,
  Package,
  ArrowRight,
  X,
  ShoppingCart,
  ShieldCheck,
  History,
  Command,
  CornerDownLeft,
  Loader2,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

// 1. Define the shape of a search result to fix the TypeScript error
interface SearchResult {
  id: string | number
  type: 'vendor' | 'user' | 'product' | 'order' | 'log'
  name: string
  detail: string
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  // 2. Explicitly type the results state
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'admin' | 'vendor' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setRole(userData.role === 'System Root' ? 'admin' : 'vendor')
      } catch (e) {
        console.error('Error parsing user role', e)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `http://localhost/easygear-api/search.php?q=${query}&role=${role}`
        )
        const data = await response.json()

        if (Array.isArray(data)) {
          setResults(data)
        } else {
          setResults([])
        }
      } catch (error) {
        console.error('Connection to Node failed:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [query, role])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  const isVendor = role === 'vendor'
  const brandColor = isVendor ? 'text-orange-500' : 'text-blue-600'
  const accentBg = isVendor ? 'bg-orange-50' : 'bg-blue-50'
  const borderFocus = isVendor
    ? 'focus-within:border-orange-500/30'
    : 'focus-within:border-blue-600/30'

  return (
    <div className='fixed inset-0 z-100 flex items-start justify-center pt-[10vh] px-4 sm:px-6'>
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300'
        onClick={onClose}
      />

      <div
        className={cn(
          'relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.35)] border-4 border-white overflow-hidden animate-in zoom-in-95 slide-in-from-top-8 duration-300'
        )}
      >
        <div
          className={cn(
            'p-8 border-b-2 border-slate-50 flex items-center gap-5 transition-all',
            borderFocus
          )}
        >
          <div className={cn('p-3 rounded-2xl shrink-0', accentBg, brandColor)}>
            {loading ? (
              <Loader2 size={24} strokeWidth={3} className='animate-spin' />
            ) : (
              <Search size={24} strokeWidth={3} />
            )}
          </div>
          <input
            ref={inputRef}
            autoFocus
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              role === 'admin'
                ? 'Invoke: vendors, users, logs...'
                : 'Search store: products, orders, records...'
            }
            className='flex-1 bg-transparent outline-none text-xl font-black text-slate-900 placeholder:text-slate-300 uppercase tracking-tight'
          />
          <button
            onClick={onClose}
            className='p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all active:scale-90'
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className='max-h-[50vh] overflow-y-auto custom-scrollbar bg-white'>
          {query.length > 0 ? (
            <div className='p-4 space-y-2'>
              <div className='px-4 py-3 flex items-center justify-between'>
                <p className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-400'>
                  {loading
                    ? 'Retrieving Encrypted Packets...'
                    : `Query Results: ${results.length} Nodes Found`}
                </p>
                <div
                  className={cn(
                    'flex items-center gap-2 px-3 py-1 rounded-full border-2',
                    isVendor ? 'border-orange-100' : 'border-blue-100'
                  )}
                >
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full animate-pulse',
                      isVendor ? 'bg-orange-500' : 'bg-blue-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[9px] font-black uppercase tracking-widest',
                      brandColor
                    )}
                  >
                    {role} Level Search
                  </span>
                </div>
              </div>

              {results.map((item) => (
                <SearchResultItem
                  key={item.id}
                  type={item.type}
                  title={item.name}
                  desc={item.detail}
                  brandColor={brandColor}
                  accentBg={accentBg}
                  onClick={() => {
                    console.log(`Navigating to Node: ${item.id}`)
                    onClose()
                  }}
                />
              ))}

              {!loading && results.length === 0 && (
                <div className='py-20 text-center space-y-4'>
                  <div className='inline-flex p-6 bg-slate-50 rounded-full text-slate-200'>
                    <Command size={48} strokeWidth={3} />
                  </div>
                  <p className='text-sm font-black text-slate-400 uppercase tracking-widest'>
                    Zero records detected
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className='py-24 text-center group'>
              <div
                className={cn(
                  'inline-flex p-8 rounded-[2.5rem] mb-6 transition-transform group-hover:scale-110 duration-500',
                  accentBg
                )}
              >
                <History
                  className={cn(
                    'animate-[spin_4s_linear_infinite]',
                    brandColor
                  )}
                  size={48}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className='text-xl font-black text-slate-900 uppercase italic tracking-tighter'>
                Standby Mode
              </h3>
              <p className='text-[10px] font-bold text-slate-400 mt-3 max-w-70 mx-auto uppercase tracking-widest leading-relaxed'>
                System ready for deep-indexing. Search across{' '}
                <span className={brandColor}>
                  {role === 'admin' ? 'global ecosystem' : 'store inventory'}
                </span>
                .
              </p>
            </div>
          )}
        </div>

        <div className='p-6 bg-slate-50/80 border-t-2 border-slate-100 flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <kbd className='px-2 py-1 bg-white border-2 border-slate-200 rounded-lg text-[10px] font-black shadow-sm'>
                <CornerDownLeft size={10} className='inline mr-1' /> ENTER
              </kbd>
              <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                Select
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <kbd className='px-2 py-1 bg-white border-2 border-slate-200 rounded-lg text-[10px] font-black shadow-sm'>
                ESC
              </kbd>
              <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                Abort
              </span>
            </div>
          </div>
          <div className='hidden sm:flex items-center gap-3'>
            <ShieldCheck size={16} className={brandColor} />
            <span className='text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]'>
              Node Connection Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Updated SearchResultItem with proper types
function SearchResultItem({
  type,
  title,
  desc,
  brandColor,
  accentBg,
  onClick,
}: {
  type: SearchResult['type']
  title: string
  desc: string
  brandColor: string
  accentBg: string
  onClick: () => void
}) {
  const getIcon = () => {
    switch (type) {
      case 'vendor':
        return <Store size={20} strokeWidth={2.5} />
      case 'user':
        return <User size={20} strokeWidth={2.5} />
      case 'product':
        return <Package size={20} strokeWidth={2.5} />
      case 'order':
        return <ShoppingCart size={20} strokeWidth={2.5} />
      default:
        return <ShieldCheck size={20} strokeWidth={2.5} />
    }
  }

  return (
    <button
      onClick={onClick}
      className='w-full flex items-center justify-between p-5 hover:bg-slate-50 rounded-3xl group transition-all border-2 border-transparent hover:border-slate-100'
    >
      <div className='flex items-center gap-5'>
        <div
          className={cn(
            'h-14 w-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12',
            accentBg,
            brandColor
          )}
        >
          {getIcon()}
        </div>
        <div className='text-left'>
          <p className='text-base font-black text-slate-900 uppercase tracking-tighter leading-none'>
            {title}
          </p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2'>
            {desc}
          </p>
        </div>
      </div>
      <div
        className={cn(
          'p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1',
          accentBg,
          brandColor
        )}
      >
        <ArrowRight size={20} strokeWidth={3} />
      </div>
    </button>
  )
}
