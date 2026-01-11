'use client'

import { useState } from 'react'
import {
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  Wallet,
  Banknote,
  Filter,
  Download,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const TRANSACTIONS = [
  {
    id: 'TXN-4401',
    vendor: 'Nike Store',
    amount: '₦120,000',
    type: 'Payout',
    status: 'Completed',
    date: 'Jan 05, 2026',
  },
  {
    id: 'TXN-4402',
    customer: 'Sarah J.',
    amount: '₦45,000',
    type: 'Payment',
    status: 'Completed',
    date: 'Jan 06, 2026',
  },
  {
    id: 'TXN-4403',
    vendor: 'Mountain Pros',
    amount: '₦82,000',
    type: 'Payout',
    status: 'Pending',
    date: 'Jan 07, 2026',
  },
  {
    id: 'TXN-4404',
    customer: 'Abebe B.',
    amount: '₦12,000',
    type: 'Refund',
    status: 'Processing',
    date: 'Jan 07, 2026',
  },
]

export default function AdminPaymentsPage() {
  return (
    <div className='space-y-8'>
      {/* Financial Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-brand-slate p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group'>
          <p className='text-white/40 font-black text-xs uppercase tracking-widest'>
            Platform Revenue
          </p>
          <h2 className='text-4xl font-black mt-2'>₦12.8M</h2>
          <div className='mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold'>
            <ArrowUpRight size={14} /> +12.5% this month
          </div>
          <Banknote className='absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500' />
        </div>

        <div className='bg-white border-4 border-slate-100 p-8 rounded-[2.5rem] shadow-sm'>
          <p className='text-slate-400 font-black text-xs uppercase tracking-widest'>
            Pending Payouts
          </p>
          <h2 className='text-4xl font-black text-brand-slate mt-2'>₦1.2M</h2>
          <button className='mt-4 text-brand-blue font-black text-xs uppercase tracking-widest hover:underline'>
            Process Batches →
          </button>
        </div>

        <div className='bg-white border-4 border-slate-100 p-8 rounded-[2.5rem] shadow-sm'>
          <p className='text-slate-400 font-black text-xs uppercase tracking-widest'>
            Refund Requests
          </p>
          <h2 className='text-4xl font-black text-red-500 mt-2'>08</h2>
          <p className='mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest italic'>
            Requires Attention
          </p>
        </div>
      </div>

      {/* Transaction Logs */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between px-4'>
          <h3 className='text-xl font-black text-brand-slate'>
            Transaction Ledger
          </h3>
          <div className='flex gap-2'>
            <button className='p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-500 hover:text-brand-blue transition-all'>
              <Download size={20} strokeWidth={3} />
            </button>
            <button className='p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-500 hover:text-brand-blue transition-all'>
              <Filter size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className='bg-white border-4 border-slate-100 rounded-5xl overflow-hidden'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50 border-b-4 border-slate-100'>
              <tr>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Transaction ID
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Entity
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Amount
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Type
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-4 divide-slate-50'>
              {TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className='group hover:bg-slate-50/50'>
                  <td className='px-8 py-6 font-black text-slate-400 group-hover:text-brand-blue transition-colors'>
                    {txn.id}
                  </td>
                  <td className='px-8 py-6 font-black text-brand-slate italic underline decoration-slate-200 decoration-2 underline-offset-4'>
                    {txn.vendor || txn.customer}
                  </td>
                  <td className='px-8 py-6 font-black text-brand-slate text-lg'>
                    {txn.amount}
                  </td>
                  <td className='px-8 py-6'>
                    <TypeBadge type={txn.type} />
                  </td>
                  <td className='px-8 py-6 text-right'>
                    <StatusPill status={txn.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TypeBadge({ type }: { type: string }) {
  const isOut = type === 'Payout' || type === 'Refund'
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter',
        isOut ? 'text-red-500 bg-red-50' : 'text-emerald-500 bg-emerald-50'
      )}
    >
      {isOut ? (
        <ArrowUpRight size={12} strokeWidth={3} />
      ) : (
        <ArrowDownLeft size={12} strokeWidth={3} />
      )}
      {type}
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const colors: any = {
    Completed: 'text-emerald-500',
    Pending: 'text-amber-500',
    Processing: 'text-brand-blue',
  }
  return (
    <div className='flex items-center justify-end gap-2'>
      <div
        className={cn(
          'w-2 h-2 rounded-full animate-pulse',
          colors[status] || 'bg-slate-300'
        )}
        style={{ backgroundColor: 'currentColor' }}
      />
      <span
        className={cn(
          'font-black text-[10px] uppercase tracking-widest',
          colors[status]
        )}
      >
        {status}
      </span>
    </div>
  )
}