'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldCheck,
  Store,
  Lock,
  Mail,
  ChevronRight,
  User,
  Eye,
  EyeOff,
  UserPlus,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'vendor'>('admin')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    const passwordInput = form.elements.namedItem(
      'password'
    ) as HTMLInputElement
    const usernameInput = form.elements.namedItem(
      'username'
    ) as HTMLInputElement

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    const username = usernameInput.value.trim()

    if (role === 'vendor') {
      // --- VENDOR LOGIN LOGIC ---
      if (!email || !password) {
        alert('Please enter both email and password')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          'http://localhost/easygear-api/v1/vendor/login.php',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        )

        const result = await response.json()

        if (response.ok) {
          const userData = {
            name: result.user.fullname,
            store: result.user.store_name,
            email: email,
            role: 'Vendor',
          }
          localStorage.setItem('user', JSON.stringify(userData))
          router.push('/vendor')
        } else {
          alert(result.message || 'Invalid Credentials')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Backend Error: Is XAMPP running?')
      } finally {
        setLoading(false)
      }
    } else {
      // --- ADMIN LOGIN LOGIC (SPECIFIC CREDENTIALS) ---
      setTimeout(() => {
        // Validation for specific Admin details
        const isAdminEmailValid = email === 'admin@easygear.com'
        const isAdminPassValid = password === 'password123'
        const isAdminNameValid = username.toLowerCase() === 'easygear'

        if (isAdminEmailValid && isAdminPassValid && isAdminNameValid) {
          const userData = {
            name: 'Easygear Admin',
            email: email,
            role: 'System Root',
          }
          localStorage.setItem('user', JSON.stringify(userData))
          router.push('/admin')
        } else {
          alert('ACCESS DENIED: Invalid Admin Credentials')
        }
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans'>
      <div className='w-full max-w-xl'>
        {/* Logo Section */}
        <div className='text-center mb-10'>
          <h1 className='text-5xl font-black italic tracking-tighter text-slate-900 uppercase'>
            easyGear<span className='text-orange-500'>.</span>
          </h1>
          <p className='text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-xs'>
            Terminal Access Control
          </p>
        </div>

        <div className='bg-white rounded-5xl border-4 border-white shadow-2xl overflow-hidden'>
          {/* Role Selector Tabs */}
          <div className='flex p-2 bg-slate-100/50 m-6 rounded-3xl'>
            <button
              type='button'
              onClick={() => setRole('admin')}
              className={cn(
                'flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all',
                role === 'admin'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <ShieldCheck size={18} strokeWidth={3} /> Admin
            </button>
            <button
              type='button'
              onClick={() => setRole('vendor')}
              className={cn(
                'flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all',
                role === 'vendor'
                  ? 'bg-white text-orange-500 shadow-lg'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <Store size={18} strokeWidth={3} /> Vendor
            </button>
          </div>

          <form onSubmit={handleLogin} className='p-10 pt-4 space-y-5'>
            {/* Identity Name (Username) */}
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                Identity Name
              </label>
              <div className='relative group'>
                <User
                  className={cn(
                    'absolute left-5 top-1/2 -translate-y-1/2 transition-colors',
                    role === 'admin'
                      ? 'text-slate-300 group-focus-within:text-blue-600'
                      : 'text-slate-300 group-focus-within:text-orange-500'
                  )}
                  size={20}
                />
                <input
                  name='username'
                  type='text'
                  required
                  placeholder={role === 'admin' ? 'Easygear' : 'e.g. John Doe'}
                  className={cn(
                    'w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm transition-all',
                    role === 'admin'
                      ? 'focus:border-blue-500/10 focus:bg-white'
                      : 'focus:border-orange-500/10 focus:bg-white'
                  )}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                Email Address
              </label>
              <div className='relative group'>
                <Mail
                  className={cn(
                    'absolute left-5 top-1/2 -translate-y-1/2 transition-colors',
                    role === 'admin'
                      ? 'text-slate-300 group-focus-within:text-blue-600'
                      : 'text-slate-300 group-focus-within:text-orange-500'
                  )}
                  size={20}
                />
                <input
                  name='email'
                  type='email'
                  required
                  placeholder={
                    role === 'admin' ? 'admin@easygear.com' : 'name@company.com'
                  }
                  className={cn(
                    'w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm transition-all',
                    role === 'admin'
                      ? 'focus:border-blue-500/10 focus:bg-white'
                      : 'focus:border-orange-500/10 focus:bg-white'
                  )}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                Secure Password
              </label>
              <div className='relative group'>
                <Lock
                  className={cn(
                    'absolute left-5 top-1/2 -translate-y-1/2 transition-colors',
                    role === 'admin'
                      ? 'text-slate-300 group-focus-within:text-blue-600'
                      : 'text-slate-300 group-focus-within:text-orange-500'
                  )}
                  size={20}
                />
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder='••••••••'
                  className={cn(
                    'w-full pl-14 pr-14 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm transition-all',
                    role === 'admin'
                      ? 'focus:border-blue-500/10 focus:bg-white'
                      : 'focus:border-orange-500/10 focus:bg-white'
                  )}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 p-1'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              disabled={loading}
              className={cn(
                'w-full py-6 rounded-full font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 mt-4',
                role === 'admin'
                  ? 'bg-blue-600 shadow-blue-600/20 hover:bg-blue-700'
                  : 'bg-orange-50 shadow-orange-500/20 hover:bg-orange-600'
              )}
            >
              {loading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                <>
                  <span>
                    Initialize {role === 'admin' ? 'Terminal' : 'Portal'}
                  </span>
                  <ChevronRight size={18} strokeWidth={4} />
                </>
              )}
            </button>

            {role === 'vendor' && (
              <div className='pt-2'>
                <Link
                  href='/register'
                  className='w-full py-5 rounded-full border-4 border-orange-500/20 bg-transparent font-black text-[10px] uppercase tracking-[0.2em] text-orange-500 flex items-center justify-center gap-3 hover:bg-orange-500/5 transition-all active:scale-95'
                >
                  <UserPlus size={18} strokeWidth={3} />
                  New here? Register as Vendor
                </Link>
              </div>
            )}
          </form>

          <div className='p-8 bg-slate-50/50 border-t-2 border-slate-100 text-center'>
            <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
              Access Issues?{' '}
              <span
                className={cn(
                  'cursor-pointer font-bold',
                  role === 'admin'
                    ? 'text-blue-600 hover:underline'
                    : 'text-orange-500 hover:underline'
                )}
              >
                Contact System IT
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}