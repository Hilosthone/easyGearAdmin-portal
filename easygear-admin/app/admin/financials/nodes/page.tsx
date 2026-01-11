'use client'

import React, { useState } from 'react'
import {
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

// Initial Mock Data for Banking Infrastructure
const INITIAL_NODES = [
  {
    bank: 'Zenith Bank',
    status: 'Operational',
    latency: '45ms',
    accounts: 142,
  },
  { bank: 'GT Bank', status: 'Operational', latency: '120ms', accounts: 89 },
  { bank: 'Kuda MFB', status: 'Maintenance', latency: '---', accounts: 34 },
]

export default function BankNodes() {
  const [nodes, setNodes] = useState(INITIAL_NODES)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    bank: '',
    status: 'Operational',
    accounts: 0,
  })

  const handleAddNode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)

    // Simulate API handshake/connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newNode = {
      ...formData,
      latency: formData.status === 'Operational' ? '12ms' : '---',
    }

    setNodes([newNode, ...nodes])
    setIsConnecting(false)
    setIsDrawerOpen(false)
    setFormData({ bank: '', status: 'Operational', accounts: 0 })
  }

  return (
    <div className='relative min-h-screen space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20'>
      {/* Header Area */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-4xl font-black text-brand-slate italic uppercase tracking-tighter'>
            Bank Nodes
          </h2>
          <div className='flex items-center gap-2 mt-1'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
            </span>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]'>
              Settlement Gateway: Active
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className='bg-brand-blue text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-slate transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-3 group'
        >
          <Plus
            size={16}
            strokeWidth={4}
            className='group-hover:rotate-90 transition-transform'
          />
          Link New Node
        </button>
      </div>

      {/* Nodes Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {nodes.map((node, idx) => (
          <div
            key={`${node.bank}-${idx}`}
            className='bg-white border-4 border-slate-100 rounded-[3.5rem] p-8 relative overflow-hidden group hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500'
          >
            {/* Status Background Glow */}
            <div
              className={cn(
                'absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 group-hover:opacity-10 transition-opacity',
                node.status === 'Operational' ? 'bg-emerald-500' : 'bg-red-500'
              )}
            />

            <div className='flex justify-between items-start mb-8'>
              <div className='p-5 bg-slate-50 rounded-3xl text-brand-slate group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 transform group-hover:scale-110'>
                <Building size={28} />
              </div>
              <div
                className={cn(
                  'px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 tracking-widest',
                  node.status === 'Operational'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                )}
              >
                {node.status}
              </div>
            </div>

            <h3 className='text-2xl font-black text-brand-slate mb-1 tracking-tight'>
              {node.bank}
            </h3>

            <div className='space-y-3 mt-6'>
              <div className='flex justify-between items-center py-2 border-b-2 border-slate-50'>
                <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Merchant Pool
                </span>
                <span className='text-xs font-black text-brand-slate'>
                  {node.accounts} Vendors
                </span>
              </div>
              <div className='flex justify-between items-center py-2 border-b-2 border-slate-50'>
                <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  API Latency
                </span>
                <span className='text-xs font-black text-brand-slate flex items-center gap-1.5'>
                  <Zap
                    size={12}
                    className='text-brand-orange fill-brand-orange'
                  />{' '}
                  {node.latency}
                </span>
              </div>
            </div>

            <button className='w-full mt-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase text-slate-400 group-hover:bg-brand-slate group-hover:text-white transition-all flex items-center justify-center gap-2'>
              Node Configuration <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* --- SIDE DRAWER FORM --- */}
      {isDrawerOpen && (
        <>
          <div
            className='fixed inset-0 bg-brand-slate/60 backdrop-blur-md z-100 animate-in fade-in duration-300'
            onClick={() => !isConnecting && setIsDrawerOpen(false)}
          />

          <div className='fixed inset-y-0 right-0 w-full max-w-lg bg-white z-101 shadow-2xl p-12 flex flex-col animate-in slide-in-from-right duration-500 border-l-12 border-brand-blue'>
            <div className='flex justify-between items-center mb-12'>
              <div>
                <h3 className='text-3xl font-black text-brand-slate uppercase italic tracking-tighter'>
                  Link Node
                </h3>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1'>
                  Infrastructure Provisioning
                </p>
              </div>
              <button
                disabled={isConnecting}
                onClick={() => setIsDrawerOpen(false)}
                className='p-4 bg-slate-100 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50'
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            <form
              onSubmit={handleAddNode}
              className='space-y-8 overflow-y-auto pr-4 custom-scrollbar'
            >
              <div className='space-y-3'>
                <label className='text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1'>
                  Banking Institution
                </label>
                <input
                  required
                  disabled={isConnecting}
                  type='text'
                  placeholder='e.g. United Bank for Africa'
                  className='w-full p-5 bg-slate-50 border-4 border-slate-100 rounded-4xl font-black text-brand-slate focus:border-brand-blue outline-none transition-all placeholder:text-slate-300'
                  value={formData.bank}
                  onChange={(e) =>
                    setFormData({ ...formData, bank: e.target.value })
                  }
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <label className='text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1'>
                    Status
                  </label>
                  <select
                    disabled={isConnecting}
                    className='w-full p-5 bg-slate-50 border-4 border-slate-100 rounded-4xl font-black text-brand-slate focus:border-brand-blue outline-none appearance-none cursor-pointer'
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value='Operational'>Operational</option>
                    <option value='Maintenance'>Maintenance</option>
                  </select>
                </div>

                <div className='space-y-3'>
                  <label className='text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1'>
                    Account Pool
                  </label>
                  <input
                    disabled={isConnecting}
                    type='number'
                    className='w-full p-5 bg-slate-50 border-4 border-slate-100 rounded-4xl font-black text-brand-slate focus:border-brand-blue outline-none'
                    value={formData.accounts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accounts: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className='p-8 bg-blue-50/50 rounded-[2.5rem] border-4 border-blue-100/50 relative overflow-hidden'>
                <Activity
                  className='absolute -right-4 -bottom-4 text-blue-100 scale-150 opacity-50'
                  size={100}
                />
                <div className='flex gap-4 relative z-10'>
                  <ShieldCheck className='text-brand-blue shrink-0' size={24} />
                  <p className='text-[12px] font-bold text-blue-900 leading-relaxed'>
                    This node will be used to route{' '}
                    <span className='font-black'>Direct Settlements</span> and{' '}
                    <span className='font-black'>Vendor Payouts</span>. Ensure
                    API credentials are valid before establishing the link.
                  </p>
                </div>
              </div>

              <button
                type='submit'
                disabled={isConnecting}
                className={cn(
                  'w-full py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-xs transition-all shadow-2xl flex items-center justify-center gap-3',
                  isConnecting
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-slate text-white hover:bg-brand-blue shadow-brand-blue/20'
                )}
              >
                {isConnecting ? (
                  <>
                    <Activity className='animate-spin' size={18} /> Connecting
                    API...
                  </>
                ) : (
                  'Establish Node Link'
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}