'use client'

import { TrendingUp, ArrowDownLeft, ShieldCheck, Filter } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const REVENUE_LOGS = [
  {
    id: 'REV-9901',
    orderId: 'ORD-552',
    total: 450000,
    fee: 45000,
    vendor: 'Tech Haven',
    date: 'Today, 10:45 AM',
  },
  {
    id: 'REV-9902',
    orderId: 'ORD-551',
    total: 120000,
    fee: 12000,
    vendor: 'Zaza Fashion',
    date: 'Today, 09:12 AM',
  },
  {
    id: 'REV-9903',
    orderId: 'ORD-549',
    total: 85000,
    fee: 8500,
    vendor: 'Urban Sole',
    date: 'Yesterday',
  },
]

export default function RevenueLogs() {
  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <div className='flex justify-between items-end'>
        <div>
          <h2 className='text-3xl font-black text-brand-slate italic uppercase'>
            Revenue Logs
          </h2>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]'>
            Platform Commission Tracking (10%)
          </p>
        </div>
        <div className='flex bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl items-center gap-2 border border-emerald-100'>
          <TrendingUp size={16} />
          <span className='text-xs font-black'>+12.5% vs last month</span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {REVENUE_LOGS.map((log) => (
          <div
            key={log.id}
            className='bg-white border-4 border-slate-100 rounded-[2.5rem] p-6 flex items-center justify-between group hover:border-brand-blue/20 transition-all'
          >
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors'>
                <ArrowDownLeft size={20} />
              </div>
              <div>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-tighter'>
                  {log.orderId}
                </p>
                <h4 className='font-black text-brand-slate'>{log.vendor}</h4>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-[10px] font-black text-emerald-500 uppercase'>
                Our Cut
              </p>
              <p className='text-xl font-black text-brand-slate'>
                ₦{log.fee.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
