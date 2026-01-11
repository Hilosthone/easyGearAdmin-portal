'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Store,
  Lock,
  Mail,
  ChevronRight,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Phone,
  Tag,
} from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      // Points to your local XAMPP server
      const response = await fetch(
        'http://localhost/easygear-api/v1/vendor/register.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      if (response.ok) {
        alert('Registration Successful!')
        router.push('/login')
      } else {
        alert(result.message || 'Registration failed')
      }
    } catch (error) {
      alert('Network Error: Make sure XAMPP is running and Apache is started.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans'>
      <div className='w-full max-w-xl'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-5xl font-black italic tracking-tighter text-slate-900 uppercase'>
            easyGear<span className='text-orange-500'>.</span>
          </h1>
          <p className='text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-xs'>
            Vendor Onboarding Portal
          </p>
        </div>

        <div className='bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white'>
          <div className='p-10 space-y-6'>
            <div className='flex items-center gap-2 text-orange-500 mb-2'>
              <Store size={24} strokeWidth={3} />
              <h2 className='text-xl font-black uppercase tracking-tight'>
                Create Vendor Account
              </h2>
            </div>

            <form onSubmit={handleRegister} className='space-y-5'>
              {/* Full Name & Store Name */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                    Full Name
                  </label>
                  <div className='relative'>
                    <User
                      className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                      size={20}
                    />
                    <input
                      name='fullname'
                      type='text'
                      required
                      placeholder='John Doe'
                      className='w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm focus:border-orange-500/10 focus:bg-white transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                    Store Name
                  </label>
                  <div className='relative'>
                    <Tag
                      className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                      size={20}
                    />
                    <input
                      name='store_name'
                      type='text'
                      required
                      placeholder='Gear World'
                      className='w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm focus:border-orange-500/10 focus:bg-white transition-all'
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <Mail
                      className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                      size={20}
                    />
                    <input
                      name='email'
                      type='email'
                      required
                      placeholder='vendor@easygear.ng'
                      className='w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm focus:border-orange-500/10 focus:bg-white transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                    Phone Number
                  </label>
                  <div className='relative'>
                    <Phone
                      className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                      size={20}
                    />
                    <input
                      name='phone'
                      type='tel'
                      required
                      placeholder='+234...'
                      className='w-full pl-14 pr-6 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm focus:border-orange-500/10 focus:bg-white transition-all'
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                  Set Password
                </label>
                <div className='relative'>
                  <Lock
                    className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                    size={20}
                  />
                  <input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder='••••••••'
                    className='w-full pl-14 pr-14 py-5 bg-slate-50 border-4 border-transparent rounded-3xl outline-none font-bold text-sm focus:border-orange-500/10 focus:bg-white transition-all'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-5 top-1/2 -translate-y-1/2 text-slate-300'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className='w-full py-6 rounded-full bg-orange-500 font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-70'
              >
                {loading ? (
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                ) : (
                  <>
                    <span>Register Vendor Node</span>
                    <ChevronRight size={18} strokeWidth={4} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className='p-8 bg-slate-50/50 border-t-2 border-slate-100 text-center'>
            <Link
              href='/login'
              className='text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors flex items-center justify-center gap-2'
            >
              <ArrowLeft size={14} strokeWidth={3} /> Already have an account?
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
