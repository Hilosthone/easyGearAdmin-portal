'use client'

import React, { useState, useEffect } from 'react'
import {
  Settings,
  Shield,
  Lock,
  Bell,
  Globe,
  Database,
  CreditCard,
  Save,
  User,
  ShieldCheck,
  AlertTriangle,
  Fingerprint,
  Users,
  Key,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('Platform')
  const [isMaintenance, setIsMaintenance] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch for industrial animations
  useEffect(() => setMounted(true), [])

  const handleSave = () => {
    setIsSaving(true)
    // Simulate biometric/identity verification delay
    setTimeout(() => setIsSaving(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className='max-w-7xl mx-auto space-y-10 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      {/* Terminal Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tighter italic uppercase leading-none'>
            Core Terminal
          </h1>
          <p className='text-slate-400 font-black mt-3 uppercase text-[10px] tracking-[0.5em] flex items-center gap-3'>
            <Database size={14} className='text-brand-blue animate-pulse' />
            System Architecture & Security Layers V1.0.6
          </p>
        </div>
        <div className='bg-white border-4 border-slate-100 p-4 rounded-3xl flex items-center gap-6 shadow-sm'>
          <div className='text-right'>
            <p className='text-[9px] font-black text-slate-300 uppercase tracking-widest'>
              Encryption
            </p>
            <p className='text-xs font-black text-emerald-500 uppercase tracking-tighter'>
              AES-256 ACTIVE
            </p>
          </div>
          <div className='h-10 w-0.5 bg-slate-100' />
          <div className='text-right'>
            <p className='text-[9px] font-black text-slate-300 uppercase tracking-widest'>
              Uptime
            </p>
            <p className='text-xs font-black text-brand-blue uppercase tracking-tighter'>
              99.998%
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Settings Navigation Rail */}
        <div className='lg:col-span-3 space-y-4'>
          {['Platform', 'Security', 'Payouts', 'Staff Roles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'w-full flex items-center justify-between px-8 py-6 rounded-4xl font-black text-[11px] uppercase tracking-[0.2em] transition-all border-4 group',
                activeTab === tab
                  ? 'bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/30 -translate-y-1'
                  : 'bg-white border-slate-100 text-slate-400 hover:border-brand-blue/20 hover:text-brand-slate'
              )}
            >
              <div className='flex items-center gap-5'>
                <TabIcon name={tab} isActive={activeTab === tab} />
                {tab}
              </div>
              <ChevronRight
                size={16}
                className={cn(
                  'transition-transform',
                  activeTab === tab ? 'rotate-90' : 'group-hover:translate-x-1'
                )}
              />
            </button>
          ))}

          <div className='p-8 bg-slate-100/50 rounded-[2.5rem] border-4 border-dashed border-slate-200 mt-10'>
            <p className='text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed text-center'>
              Access to these protocols is logged via Hardware ID.
            </p>
          </div>
        </div>

        {/* Dynamic Context Area */}
        <div className='lg:col-span-9'>
          {activeTab === 'Platform' && (
            <div className='bg-white border-4 border-slate-100 rounded-[4rem] p-12 shadow-sm space-y-12 relative overflow-hidden'>
              {/* Marketplace Logic Section */}
              <section className='space-y-10'>
                <div className='flex items-center gap-5 border-b-4 border-slate-50 pb-8'>
                  <div className='p-4 bg-brand-blue text-white rounded-2xl shadow-lg shadow-brand-blue/20'>
                    <Globe size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className='text-2xl font-black text-brand-slate tracking-tighter uppercase italic'>
                      Marketplace Logic
                    </h3>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                      Global Transaction Parameters
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                  <InputGroup
                    label='Platform Commission'
                    unit='%'
                    defaultValue='12.5'
                  />
                  <InputGroup
                    label='Escrow Release Window'
                    unit='DAYS'
                    defaultValue='5'
                  />
                  <InputGroup
                    label='Vendor Limit (Free)'
                    unit='SKUS'
                    defaultValue='15'
                  />
                  <InputGroup
                    label='API Rate Limit'
                    unit='REQ/S'
                    defaultValue='500'
                  />
                </div>

                {/* Maintenance Node - High Visibility */}
                <div
                  className={cn(
                    'p-10 rounded-5xl border-4 transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8',
                    isMaintenance
                      ? 'bg-red-50 border-red-200 shadow-xl shadow-red-500/5'
                      : 'bg-slate-50 border-slate-100'
                  )}
                >
                  <div className='flex gap-6 items-center'>
                    <div
                      className={cn(
                        'p-6 rounded-3xl transition-all duration-500',
                        isMaintenance
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-white text-slate-300 border-2 border-slate-100'
                      )}
                    >
                      <AlertTriangle size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p
                        className={cn(
                          'text-2xl font-black uppercase tracking-tighter italic',
                          isMaintenance ? 'text-red-600' : 'text-brand-slate'
                        )}
                      >
                        Maintenance Mode
                      </p>
                      <p className='text-xs font-bold text-slate-400 mt-1 max-w-xs uppercase tracking-tight'>
                        Emergency protocols: Disconnect checkouts and vendor
                        storefronts immediately.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMaintenance(!isMaintenance)}
                    className={cn(
                      'w-24 h-12 rounded-full relative transition-all duration-500 border-4',
                      isMaintenance
                        ? 'bg-red-500 border-red-600'
                        : 'bg-slate-200 border-slate-300'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-1 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-500 ease-in-out',
                        isMaintenance ? 'left-13' : 'left-1.5'
                      )}
                    />
                  </button>
                </div>
              </section>

              {/* Action Node */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  'w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-6 transition-all shadow-2xl overflow-hidden relative',
                  isSaving
                    ? 'bg-slate-100 text-slate-400 scale-[0.98]'
                    : 'bg-brand-slate text-white hover:bg-brand-blue shadow-brand-blue/20'
                )}
              >
                {isSaving && (
                  <div className='absolute inset-0 bg-brand-blue/10 animate-pulse' />
                )}
                {isSaving ? (
                  <Fingerprint className='animate-bounce' size={24} />
                ) : (
                  <Save size={20} strokeWidth={3} />
                )}
                {isSaving
                  ? 'Validating Root Credentials...'
                  : 'Commit Platform Changes'}
              </button>
            </div>
          )}

          {activeTab === 'Staff Roles' && (
            <div className='bg-white border-4 border-slate-100 rounded-[4rem] p-12 shadow-sm space-y-10 animate-in fade-in duration-500'>
              <div className='flex justify-between items-center border-b-4 border-slate-50 pb-10'>
                <div className='flex items-center gap-5'>
                  <div className='p-4 bg-brand-orange text-white rounded-2xl shadow-lg shadow-brand-orange/20'>
                    <Users size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className='text-2xl font-black text-brand-slate tracking-tighter uppercase italic'>
                      Access Control
                    </h3>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                      Encryption Key Management
                    </p>
                  </div>
                </div>
                <button className='bg-brand-slate text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-blue transition-all'>
                  Add Admin Node
                </button>
              </div>

              <div className='grid gap-6'>
                <RoleRow
                  name='Super Architect'
                  access='Full System Decryption'
                  color='bg-emerald-500'
                />
                <RoleRow
                  name='Financial Lead'
                  access='Treasury & Revenue Flow'
                  color='bg-brand-blue'
                />
                <RoleRow
                  name='Support Commander'
                  access='Conflict Resolution Terminal'
                  color='bg-brand-orange'
                />
              </div>
            </div>
          )}

          {(activeTab === 'Security' || activeTab === 'Payouts') && (
            <div className='bg-white border-4 border-slate-100 rounded-[4rem] p-32 shadow-sm flex flex-col items-center text-center'>
              <div className='w-32 h-32 bg-slate-50 rounded-5xl flex items-center justify-center text-slate-200 mb-10 border-4 border-slate-50 relative'>
                <Lock size={64} strokeWidth={3} />
                <div className='absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-4 border-white animate-pulse' />
              </div>
              <h3 className='text-4xl font-black text-brand-slate uppercase italic tracking-tighter'>
                Protocol Locked
              </h3>
              <p className='text-slate-400 font-bold mt-6 max-w-sm uppercase text-[11px] tracking-widest leading-loose'>
                Access to the {activeTab} Layer requires high-fidelity hardware
                verification. Initiate Terminal Decryption to proceed.
              </p>
              <button className='mt-10 px-10 py-5 border-4 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-brand-blue hover:border-brand-blue/20 transition-all'>
                Initiate Handshake
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InputGroup({
  label,
  unit,
  defaultValue,
}: {
  label: string
  unit: string
  defaultValue: string
}) {
  return (
    <div className='space-y-4'>
      <label className='text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center gap-2'>
        <Zap size={10} className='text-brand-blue' />
        {label}
      </label>
      <div className='relative group'>
        <input
          type='text'
          defaultValue={defaultValue}
          className='w-full px-8 py-6 bg-slate-50 border-4 border-transparent rounded-4xl focus:border-brand-blue focus:bg-white outline-none font-black text-2xl text-brand-slate transition-all shadow-inner'
        />
        <span className='absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border-2 border-slate-50 group-focus-within:border-brand-blue/20 group-focus-within:text-brand-blue transition-all'>
          {unit}
        </span>
      </div>
    </div>
  )
}

function RoleRow({
  name,
  access,
  color,
}: {
  name: string
  access: string
  color: string
}) {
  return (
    <div className='group flex items-center justify-between p-8 bg-slate-50 border-4 border-transparent hover:border-slate-100 rounded-[2.5rem] transition-all hover:scale-[1.01]'>
      <div className='flex items-center gap-6'>
        <div className={cn('w-4 h-4 rounded-full shadow-lg', color)} />
        <div>
          <p className='font-black text-brand-slate uppercase text-lg tracking-tighter leading-none'>
            {name}
          </p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2'>
            <Shield size={10} />
            {access}
          </p>
        </div>
      </div>
      <button className='p-4 bg-white rounded-2xl text-slate-300 hover:text-brand-blue hover:shadow-lg transition-all border-2 border-transparent hover:border-brand-blue/10'>
        <Key size={20} strokeWidth={3} />
      </button>
    </div>
  )
}

function TabIcon({ name, isActive }: { name: string; isActive: boolean }) {
  const size = 22
  const strokeWidth = 3

  switch (name) {
    case 'Platform':
      return (
        <Globe
          size={size}
          strokeWidth={strokeWidth}
          className={isActive ? 'text-white' : 'text-brand-blue'}
        />
      )
    case 'Security':
      return (
        <Lock
          size={size}
          strokeWidth={strokeWidth}
          className={isActive ? 'text-white' : 'text-slate-300'}
        />
      )
    case 'Payouts':
      return (
        <CreditCard
          size={size}
          strokeWidth={strokeWidth}
          className={isActive ? 'text-white' : 'text-slate-300'}
        />
      )
    case 'Staff Roles':
      return (
        <ShieldCheck
          size={size}
          strokeWidth={strokeWidth}
          className={isActive ? 'text-white' : 'text-brand-orange'}
        />
      )
    default:
      return <Settings size={size} strokeWidth={strokeWidth} />
  }
}