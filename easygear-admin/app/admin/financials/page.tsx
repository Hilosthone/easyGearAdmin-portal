'use client'

import { useState } from 'react'
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Clock,
  CheckCircle2,
  Filter,
  Download,
  Search,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const PAYOUT_DATA = [
  {
    id: 'PAY-8801',
    vendor: 'Tech Haven Nigeria',
    amount: 1420500,
    status: 'Completed',
    date: 'Jan 07, 2026',
    bank: 'Zenith Bank',
  },
  {
    id: 'PAY-8802',
    vendor: 'Peak Performance',
    amount: 890400,
    status: 'Processing',
    date: 'Jan 07, 2026',
    bank: 'GT Bank',
  },
  {
    id: 'PAY-8803',
    vendor: 'Luxe Athletics',
    amount: 210000,
    status: 'Pending',
    date: 'Jan 06, 2026',
    bank: 'Access Bank',
  },
  {
    id: 'PAY-8804',
    vendor: 'Urban Sole',
    amount: 550000,
    status: 'Completed',
    date: 'Jan 05, 2026',
    bank: 'Kuda MFB',
  },
]

export default function FinancialsDashboard() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <div className='space-y-8 pb-12'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic uppercase'>
            Treasury Hub
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]'>
            Settlements & Platform Revenue
          </p>
        </div>
        <div className='flex gap-3'>
          <button className='px-6 py-3 bg-white border-4 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-brand-blue hover:text-brand-blue transition-all flex items-center gap-2'>
            <Download size={14} /> Export CSV
          </button>
          <button className='px-6 py-3 bg-brand-slate text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl shadow-brand-slate/20'>
            Initiate Bulk Payout
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {[
          {
            label: 'Total Volume',
            value: '₦12.4M',
            icon: <ArrowUpRight />,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Platform Revenue',
            value: '₦1.24M',
            icon: <Wallet />,
            color: 'text-brand-blue',
            bg: 'bg-blue-50',
          },
          {
            label: 'Pending Payouts',
            value: '₦4.8M',
            icon: <Clock />,
            color: 'text-brand-orange',
            bg: 'bg-orange-50',
          },
        ].map((card, i) => (
          <div
            key={i}
            className='bg-white border-4 border-slate-100 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-brand-blue/20 transition-all'
          >
            <div
              className={cn(
                'absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10',
                card.bg
              )}
            />
            <div
              className={cn('p-3 w-fit rounded-2xl mb-4', card.bg, card.color)}
            >
              {card.icon}
            </div>
            <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>
              {card.label}
            </p>
            <h2 className='text-4xl font-black text-brand-slate mt-1 tracking-tighter'>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Transactions Section */}
      <div className='bg-white border-4 border-slate-100 rounded-[3.5rem] overflow-hidden shadow-sm'>
        <div className='p-8 border-b-4 border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex bg-slate-100 p-1.5 rounded-2xl gap-1'>
            {['All', 'Completed', 'Processing', 'Pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all',
                  activeTab === tab
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-slate-400 hover:text-brand-slate'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className='relative w-full md:w-72'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300'
              size={16}
            />
            <input
              type='text'
              placeholder='Search vendor or ID...'
              className='w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-brand-blue transition-all'
            />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-slate-50/50'>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Recipient Vendor
                </th>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Transaction ID
                </th>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Bank Node
                </th>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Net Amount
                </th>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                  Status
                </th>
                <th className='px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-4 divide-slate-50'>
              {PAYOUT_DATA.map((payout) => (
                <tr
                  key={payout.id}
                  className='group hover:bg-slate-50/50 transition-colors'
                >
                  <td className='px-8 py-6'>
                    <p className='font-black text-brand-slate leading-none'>
                      {payout.vendor}
                    </p>
                    <p className='text-[10px] text-slate-400 font-bold mt-1 uppercase'>
                      {payout.date}
                    </p>
                  </td>
                  <td className='px-8 py-6'>
                    <span className='font-mono text-xs font-bold text-slate-400'>
                      {payout.id}
                    </span>
                  </td>
                  <td className='px-8 py-6'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-slate-200' />
                      <p className='text-xs font-black text-slate-500 uppercase'>
                        {payout.bank}
                      </p>
                    </div>
                  </td>
                  <td className='px-8 py-6'>
                    <p className='text-lg font-black text-brand-slate tracking-tighter'>
                      ₦{payout.amount.toLocaleString()}
                    </p>
                  </td>
                  <td className='px-8 py-6'>
                    <div
                      className={cn(
                        'px-3 py-1 rounded-full text-[9px] font-black uppercase w-fit border-2',
                        payout.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : payout.status === 'Processing'
                          ? 'bg-blue-50 text-brand-blue border-blue-100'
                          : 'bg-orange-50 text-brand-orange border-orange-100'
                      )}
                    >
                      {payout.status}
                    </div>
                  </td>
                  <td className='px-8 py-6 text-right'>
                    <button className='p-2 hover:bg-brand-blue hover:text-white rounded-xl text-slate-300 transition-all'>
                      <ArrowRight size={18} />
                    </button>
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