'use client'

import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Key,
  Smartphone,
  ShieldAlert,
  Clock,
  Globe,
  Zap,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
  })

  useEffect(() => {
    const sessionData = localStorage.getItem('user')
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData)
        setFormData({
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'Vendor',
          bio:
            user.bio ||
            'Premium gear vendor specializing in professional outdoor equipment.',
        })
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
  }, [])

  const getPasswordStrength = () => {
    if (newPassword.length === 0) return 0
    let score = 0
    if (newPassword.length > 8) score++
    if (/[A-Z]/.test(newPassword)) score++
    if (/[0-9]/.test(newPassword)) score++
    if (/[^A-Za-z0-9]/.test(newPassword)) score++
    return score
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (activeTab === 'profile') {
        localStorage.setItem('user', JSON.stringify(formData))
      }
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1200)
  }

  return (
    <div className='p-6 md:p-10 max-w-5xl mx-auto'>
      <div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate italic uppercase tracking-tighter'>
            Terminal<span className='text-brand-orange'>.</span>Settings
          </h1>
          <p className='text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2'>
            Manage your merchant identity and security protocols
          </p>
        </div>

        <div className='flex bg-slate-100 p-1.5 rounded-2xl w-fit border-2 border-slate-200/50'>
          {['profile', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                'px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                activeTab === tab
                  ? 'bg-white text-brand-orange shadow-md scale-105'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Status Rail */}
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-white p-8 rounded-[2.5rem] border-4 border-slate-100 shadow-xl text-center relative group'>
            <div className='relative mx-auto w-32'>
              <div className='w-32 h-32 rounded-4xl bg-brand-orange flex items-center justify-center text-white text-5xl font-black border-4 border-white shadow-2xl transition-transform group-hover:rotate-3'>
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'H'}
              </div>
              <div className='absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white animate-bounce-subtle'>
                <Shield size={16} strokeWidth={3} />
              </div>
            </div>
            <div className='mt-6'>
              <h3 className='font-black text-brand-slate text-xl uppercase tracking-tight'>
                {formData.name || 'Hilosthone'}
              </h3>
              <p className='text-brand-orange font-bold text-[9px] uppercase tracking-[0.2em] mt-1'>
                {formData.role || 'Verified Merchant'}
              </p>
            </div>
          </div>

          <div className='bg-brand-slate p-6 rounded-[2.5rem] text-white shadow-2xl border-b-8 border-brand-orange/20'>
            <div className='flex items-center gap-3 mb-4'>
              <ShieldAlert className='text-brand-orange' size={20} />
              <p className='text-[10px] font-black uppercase tracking-widest'>
                Encryption Active
              </p>
            </div>
            <p className='text-xs text-slate-400 font-bold leading-relaxed'>
              Your terminal node is protected by 256-bit AES encryption. Syncing
              updates your global profile across the GearHub network.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className='lg:col-span-2 space-y-8'>
          <form
            onSubmit={handleUpdate}
            className='bg-white p-8 md:p-10 rounded-5xl border-4 border-slate-100 shadow-xl space-y-8 relative overflow-hidden'
          >
            {activeTab === 'profile' ? (
              <div className='space-y-6 animate-in fade-in slide-in-from-right-4 duration-500'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                      Identity Name
                    </label>
                    <div className='relative'>
                      <User
                        className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                        size={18}
                      />
                      <input
                        type='text'
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className='w-full pl-14 pr-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2'>
                      Email Address
                    </label>
                    <div className='relative'>
                      <Mail
                        className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                        size={18}
                      />
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className='w-full pl-14 pr-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between items-center px-2'>
                    <label className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
                      Merchant Bio
                    </label>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase',
                        formData.bio.length > 140
                          ? 'text-brand-orange'
                          : 'text-slate-300'
                      )}
                    >
                      {formData.bio.length} / 160
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bio: e.target.value.slice(0, 160),
                      })
                    }
                    className='w-full px-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm resize-none'
                  />
                </div>
              </div>
            ) : (
              <div className='space-y-8 animate-in fade-in slide-in-from-right-4 duration-500'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Lock size={16} className='text-brand-orange' />
                    <p className='text-xs font-black uppercase tracking-widest text-brand-slate'>
                      Security Access Codes
                    </p>
                  </div>
                  <div className='space-y-4'>
                    <input
                      type='password'
                      placeholder='Current Password'
                      className='w-full px-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm'
                    />
                    <div className='space-y-3'>
                      <input
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='New Secure Password'
                        className='w-full px-6 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm'
                      />
                      {/* Password Strength Matrix */}
                      <div className='flex gap-2 px-2'>
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              'h-1.5 flex-1 rounded-full transition-all duration-500',
                              getPasswordStrength() >= level
                                ? getPasswordStrength() <= 2
                                  ? 'bg-orange-400'
                                  : 'bg-emerald-500'
                                : 'bg-slate-100'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6 bg-slate-50 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-slate-200 transition-all'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-slate shadow-sm'>
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className='text-xs font-black uppercase tracking-widest text-brand-slate'>
                        Multi-Factor Auth
                      </p>
                      <p className='text-[10px] font-bold text-slate-400 mt-0.5'>
                        Biometric node verification
                      </p>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={cn(
                      'w-14 h-8 rounded-full transition-all relative',
                      twoFactor ? 'bg-emerald-500' : 'bg-slate-300'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md',
                        twoFactor ? 'left-7' : 'left-1'
                      )}
                    />
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={loading}
              className={cn(
                'w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 group',
                success ? 'bg-emerald-500' : 'bg-brand-slate hover:bg-slate-800'
              )}
            >
              {loading ? (
                <div className='w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin' />
              ) : success ? (
                <>
                  <CheckCircle2 size={18} strokeWidth={3} />
                  <span>Protocol Synchronized</span>
                </>
              ) : (
                <>
                  <Zap
                    size={18}
                    className='text-brand-orange group-hover:scale-125 transition-transform'
                  />
                  <span>Execute {activeTab} Sync</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}