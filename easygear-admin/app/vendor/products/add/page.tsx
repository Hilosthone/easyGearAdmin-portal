'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Plus,
  Camera,
  ArrowLeft,
  Tag,
  Layers,
  DollarSign,
  Info,
  CheckCircle2,
  Cpu,
  Activity,
  Eye,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Dumbbell,
  Trash2,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'
import Link from 'next/link'

export default function AddGymGear() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '',
    category: 'Strength',
    price: '',
    stock: '1',
    specs: '',
  })

  // Gym Specific Categories
  const gymClasses = [
    'Strength',
    'Cardio',
    'Recovery',
    'Functional',
    'Storage',
    'Accessories',
  ]

  // Image Upload Logic
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const triggerUpload = () => fileInputRef.current?.click()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div className='p-6 md:p-10 max-w-6xl mx-auto'>
      {/* Navigation */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
        <div>
          <Link
            href='/vendor/products'
            className='flex items-center gap-2 text-slate-400 hover:text-brand-orange transition-colors font-black text-[10px] uppercase tracking-widest mb-6 group w-fit'
          >
            <ArrowLeft
              size={16}
              className='group-hover:-translate-x-1 transition-transform'
            />
            Return to Floor Overview
          </Link>
          <h1 className='text-5xl font-black text-brand-slate italic uppercase tracking-tighter'>
            Deploy<span className='text-brand-orange'>.</span>Asset
          </h1>
          <p className='text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2 flex items-center gap-2'>
            <Cpu size={14} className='text-brand-orange' /> Gym Registry Node
            v2.04
          </p>
        </div>

        {/* Recent Deployment Slot (Shows last uploaded) */}
        <div className='flex items-center gap-4 bg-slate-50 border-2 border-slate-100 p-3 rounded-2xl'>
          <div className='w-10 h-10 rounded-xl bg-slate-200 overflow-hidden border-2 border-white shadow-sm'>
            {previewUrl ? (
              <img
                src={previewUrl}
                className='w-full h-full object-cover'
                alt='Recent'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <Dumbbell size={16} className='text-slate-400' />
              </div>
            )}
          </div>
          <p className='text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none'>
            Active Deployment
            <br />
            <span className='text-brand-slate'>
              {form.name || 'Pending Entry...'}
            </span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-12 gap-10'
      >
        {/* Left Column: Media & Instructions */}
        <div className='lg:col-span-4 space-y-6'>
          <div className='sticky top-10 space-y-6'>
            {/* Image Upload Zone - Functional */}
            <div className='relative group' onClick={triggerUpload}>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleImageChange}
                className='hidden'
                accept='image/*'
              />
              <div className='absolute -inset-1 bg-linear-to-r from-brand-orange to-orange-600 rounded-5xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
              <div className='relative bg-white p-4 rounded-5xl border-4 border-slate-100 shadow-xl text-center cursor-pointer overflow-hidden aspect-square flex items-center justify-center'>
                {previewUrl ? (
                  <div className='relative w-full h-full rounded-[2.5rem] overflow-hidden'>
                    <img
                      src={previewUrl}
                      alt='Preview'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-brand-slate/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <Camera className='text-white' size={32} />
                    </div>
                  </div>
                ) : (
                  <div className='w-full h-full bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 group-hover:bg-brand-orange/5 transition-all'>
                    <div className='w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-md group-hover:scale-110 group-hover:text-brand-orange transition-all duration-500'>
                      <Camera size={38} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className='text-[11px] font-black uppercase tracking-widest text-brand-slate'>
                        Upload Equipment Image
                      </p>
                      <p className='text-[9px] font-bold text-slate-400 uppercase mt-1'>
                        PNG, JPG (Square preferred)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Data Preview Card */}
            <div className='bg-brand-slate p-8 rounded-5xl text-white shadow-2xl relative overflow-hidden'>
              <div className='absolute top-0 right-0 p-4 opacity-10'>
                <Eye size={80} />
              </div>
              <div className='flex items-center gap-3 mb-6'>
                <Activity
                  className='text-brand-orange animate-pulse'
                  size={20}
                />
                <p className='text-[10px] font-black uppercase tracking-widest'>
                  Telemetry Check
                </p>
              </div>
              <div className='space-y-4'>
                <div className='h-px bg-white/10 w-full' />
                <div>
                  <p className='text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]'>
                    Equipment Designation
                  </p>
                  <p className='text-lg font-black italic uppercase truncate'>
                    {form.name || 'Awaiting Input...'}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]'>
                      Purchase Rate
                    </p>
                    <p className='font-black'>
                      ₦{Number(form.price).toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]'>
                      Class
                    </p>
                    <p className='font-black uppercase text-[10px]'>
                      {form.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Specs */}
        <div className='lg:col-span-8 space-y-8'>
          <div className='bg-white p-8 md:p-12 rounded-[4rem] border-4 border-slate-100 shadow-2xl relative'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {/* Asset Name */}
              <div className='space-y-3 md:col-span-2'>
                <label className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2'>
                  <Tag size={12} className='text-brand-orange' /> Asset
                  Designation
                </label>
                <input
                  required
                  type='text'
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder='e.g. Rogue Echo Bike V3'
                  className='w-full px-8 py-5 bg-slate-50 border-3 border-transparent rounded-4xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm transition-all shadow-inner'
                />
              </div>

              {/* Gym Category (Class) */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2'>
                  <Layers size={12} className='text-brand-orange' /> Equipment
                  Class
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className='w-full px-8 py-5 bg-slate-50 border-3 border-transparent rounded-4xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm transition-all appearance-none cursor-pointer shadow-inner'
                >
                  {gymClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rate */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2'>
                  <DollarSign size={12} className='text-brand-orange' />{' '}
                  Acquisition Cost (₦)
                </label>
                <input
                  required
                  type='number'
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder='0.00'
                  className='w-full px-8 py-5 bg-slate-50 border-3 border-transparent rounded-4xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm transition-all shadow-inner'
                />
              </div>

              {/* Manifest Detail */}
              <div className='space-y-3 md:col-span-2 pt-4'>
                <label className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2'>
                  <Info size={12} className='text-brand-orange' /> Maintenance
                  Manifest
                </label>
                <textarea
                  rows={4}
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  placeholder='Note current condition, serial numbers, and warranty expiration...'
                  className='w-full px-8 py-6 bg-slate-50 border-3 border-transparent rounded-[2.5rem] focus:bg-white focus:border-brand-orange outline-none font-bold text-sm resize-none transition-all shadow-inner'
                />
              </div>
            </div>

            {/* Action Area */}
            <div className='pt-8'>
              <button
                disabled={loading}
                className={cn(
                  'w-full py-8 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] text-white shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] relative overflow-hidden group',
                  success
                    ? 'bg-emerald-500 shadow-emerald-200'
                    : 'bg-brand-slate hover:bg-slate-800'
                )}
              >
                {loading ? (
                  <Loader2 className='w-6 h-6 animate-spin' />
                ) : success ? (
                  <>
                    <CheckCircle2 size={20} className='animate-bounce' />
                    <span>Asset Registered</span>
                  </>
                ) : (
                  <>
                    <div className='absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0' />
                    <Plus size={20} strokeWidth={4} className='z-10' />
                    <span className='z-10'>Execute Deployment Sequence</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}