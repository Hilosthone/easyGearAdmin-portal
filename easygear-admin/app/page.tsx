'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LogIn, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulating Auth Logic
    setTimeout(() => {
      localStorage.setItem('user_name', 'Super Admin')
      localStorage.setItem('user_role', 'System Root')
      router.push('/admin')
    }, 1500)
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-50 p-6'>
      <div className='w-full max-w-112.5 space-y-8'>
        {/* Branding Area */}
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-16 w-40 mb-2'>
            <Image
              src='/easyGearlogo_Black.png'
              alt='easyGear'
              fill
              className='object-contain'
              priority
            />
          </div>
          <p className='text-sm font-bold text-zinc-500 uppercase tracking-widest'>
            Admin Terminal Access
          </p>
        </div>

        {/* Login Card */}
        <div className='bg-white p-10 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100'>
          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-4'>
              {/* Email Input */}
              <div className='space-y-2'>
                <label className='text-xs font-black uppercase tracking-wider text-zinc-400 ml-1'>
                  Secure Identifier
                </label>
                <div className='relative group'>
                  <Mail
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-blue transition-colors'
                    size={18}
                  />
                  <input
                    required
                    type='email'
                    placeholder='admin@easygear.com'
                    className='w-full bg-zinc-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold transition-all'
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className='space-y-2'>
                <label className='text-xs font-black uppercase tracking-wider text-zinc-400 ml-1'>
                  Access Key
                </label>
                <div className='relative group'>
                  <Lock
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-blue transition-colors'
                    size={18}
                  />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='w-full bg-zinc-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold transition-all'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-blue'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className={cn(
                'w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-200',
                isLoading && 'opacity-80 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <div className='h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                <>
                  <LogIn size={18} strokeWidth={3} />
                  Authenticate
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className='mt-8 text-center'>
            <button className='text-xs font-bold text-zinc-400 hover:text-brand-orange transition-colors'>
              Encrypted Session: AES-256 Enabled
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}