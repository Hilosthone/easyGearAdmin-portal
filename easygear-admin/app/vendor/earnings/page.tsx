// app/vendor/earnings/page.tsx
'use client'

import React, { useState } from 'react'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  History as HistoryIcon,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function EarningsPage() {
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  return (
    <div className='space-y-8'>
      <header className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h2 className='text-5xl font-black text-brand-slate tracking-tighter italic uppercase'>
            Treasury
          </h2>
          <p className='text-zinc-400 font-black mt-2 uppercase text-[10px] tracking-[0.4em]'>
            Financial Liquidity & Payouts
          </p>
        </div>

        {/* Balance Card */}
        <div className='bg-brand-slate text-white p-8 rounded-[2.5rem] min-w-[320px] shadow-2xl shadow-slate-200 relative overflow-hidden group'>
          <div className='absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform'>
            <Wallet size={80} />
          </div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
            Available for Withdrawal
          </p>
          <h3 className='text-4xl font-black mt-2 italic'>₦1,240,500.00</h3>
          <button
            onClick={() => setIsWithdrawing(true)}
            className='mt-6 w-full py-4 bg-brand-orange hover:bg-white hover:text-brand-orange text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2'
          >
            Initiate Payout <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Revenue Breakdown */}
        <div className='lg:col-span-2 space-y-6'>
          <h4 className='text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2'>
            <HistoryIcon size={16} /> Transaction Ledger
          </h4>
          <div className='bg-white border-4 border-slate-50 rounded-[2.5rem] overflow-hidden'>
            <div className='divide-y-2 divide-slate-50'>
              <TransactionRow
                title='Sale: Sony WH-1000XM5'
                date='Oct 24, 2025'
                amount='+₦350,000'
                type='credit'
              />
              <TransactionRow
                title='Withdrawal to GTBank'
                date='Oct 22, 2025'
                amount='-₦500,000'
                type='debit'
              />
              <TransactionRow
                title='Sale: MacBook Air M3'
                date='Oct 21, 2025'
                amount='+₦1,200,000'
                type='credit'
              />
            </div>
          </div>
        </div>

        {/* Payout Channels / Account Info */}
        <div className='space-y-6'>
          <h4 className='text-xs font-black uppercase tracking-widest text-slate-400'>
            Settlement Node
          </h4>
          <div className='bg-slate-50 border-4 border-dashed border-slate-200 p-8 rounded-[2.5rem]'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm'>
                <Landmark className='text-brand-slate' size={20} />
              </div>
              <div>
                <p className='text-[10px] font-black uppercase text-slate-400'>
                  Default Account
                </p>
                <p className='text-sm font-black text-brand-slate uppercase'>
                  GTBank **** 9921
                </p>
              </div>
            </div>
            <button className='w-full py-4 border-2 border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:border-brand-orange hover:text-brand-orange transition-all'>
              Update Bank Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TransactionRow({ title, date, amount, type }: any) {
  const isCredit = type === 'credit'
  return (
    <div className='flex items-center justify-between p-6 hover:bg-slate-50 transition-colors'>
      <div className='flex items-center gap-4'>
        <div
          className={cn(
            'p-3 rounded-xl',
            isCredit
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
          )}
        >
          {isCredit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
        </div>
        <div>
          <p className='text-sm font-black text-brand-slate uppercase tracking-tighter'>
            {title}
          </p>
          <p className='text-[10px] font-bold text-slate-400 uppercase'>
            {date}
          </p>
        </div>
      </div>
      <p
        className={cn(
          'text-sm font-black italic',
          isCredit ? 'text-emerald-600' : 'text-brand-slate'
        )}
      >
        {amount}
      </p>
    </div>
  )
}
