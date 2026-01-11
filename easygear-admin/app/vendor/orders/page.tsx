'use client'

import React, { useState } from 'react'
import {
  ShoppingBag,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

// Mock Data for Order Tracking
const ORDERS = [
  {
    id: 'ORD-7721',
    item: 'Blackmagic Pocket 6K',
    client: 'Femi Adebayo',
    date: 'Jan 12 - Jan 15',
    total: '₦1,350,000',
    status: 'in-progress',
    location: 'Lekki, Phase 1',
  },
  {
    id: 'ORD-7718',
    item: 'Aputure 600d Pro',
    client: 'Sarah Chen',
    date: 'Jan 10 - Jan 11',
    total: '₦240,000',
    status: 'completed',
    location: 'Victoria Island',
  },
  {
    id: 'ORD-7725',
    item: 'DJI Ronin RS3 Pro',
    client: 'Ibrahim Musa',
    date: 'Jan 18 - Jan 20',
    total: '₦170,000',
    status: 'pending',
    location: 'Surulere',
  },
]

export default function OrdersPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div className='p-6 md:p-10 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-10'>
        <h1 className='text-4xl font-black text-brand-slate italic uppercase tracking-tighter'>
          Mission<span className='text-brand-orange'>.</span>Control
        </h1>
        <p className='text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2'>
          Track active deployments and rental logistics
        </p>
      </div>

      {/* Order Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        {[
          { label: 'Active Rentals', value: '12', color: 'text-brand-blue' },
          { label: 'Pending Pickups', value: '05', color: 'text-brand-orange' },
          {
            label: 'Completed Missions',
            value: '128',
            color: 'text-emerald-500',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className='bg-white p-6 rounded-[2.5rem] border-4 border-slate-100 shadow-sm'
          >
            <p className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
              {stat.label}
            </p>
            <p className={cn('text-4xl font-black mt-2', stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className='space-y-4'>
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className='bg-white rounded-[2.5rem] border-4 border-slate-100 p-6 md:p-8 hover:border-brand-orange/20 transition-all group'
          >
            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
              {/* Gear & ID */}
              <div className='flex items-start gap-6'>
                <div className='w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all'>
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <div className='flex items-center gap-3 mb-1'>
                    <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                      {order.id}
                    </span>
                    <div
                      className={cn(
                        'px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter',
                        order.status === 'in-progress'
                          ? 'bg-blue-50 text-blue-600'
                          : order.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-amber-50 text-amber-600'
                      )}
                    >
                      {order.status.replace('-', ' ')}
                    </div>
                  </div>
                  <h3 className='text-xl font-black text-brand-slate uppercase tracking-tight'>
                    {order.item}
                  </h3>
                  <div className='flex items-center gap-4 mt-2'>
                    <div className='flex items-center gap-1.5 text-slate-400'>
                      <User size={14} />
                      <p className='text-[10px] font-bold uppercase'>
                        {order.client}
                      </p>
                    </div>
                    <div className='flex items-center gap-1.5 text-slate-400'>
                      <MapPin size={14} />
                      <p className='text-[10px] font-bold uppercase'>
                        {order.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistics & Price */}
              <div className='flex flex-wrap items-center gap-4 lg:gap-12'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2 text-slate-400'>
                    <Calendar size={14} />
                    <p className='text-[10px] font-black uppercase tracking-widest'>
                      Deployment Window
                    </p>
                  </div>
                  <p className='text-sm font-black text-brand-slate uppercase'>
                    {order.date}
                  </p>
                </div>

                <div className='text-left lg:text-right'>
                  <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1'>
                    Total Revenue
                  </p>
                  <p className='text-2xl font-black text-brand-slate'>
                    {order.total}
                  </p>
                </div>

                <button className='bg-slate-50 p-4 rounded-2xl text-slate-400 hover:bg-brand-slate hover:text-white transition-all'>
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Urgent Notice */}
      <div className='mt-10 p-8 bg-amber-50 rounded-5xl border-4 border-amber-100 flex items-center gap-6'>
        <div className='w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm'>
          <AlertTriangle size={28} strokeWidth={3} />
        </div>
        <div>
          <h4 className='font-black text-amber-900 uppercase text-xs tracking-widest'>
            Late Return Warning
          </h4>
          <p className='text-[11px] text-amber-700 font-bold uppercase mt-1'>
            The "Sony G-Master Lens" from ORD-7690 is 4 hours overdue. Initiate
            contact protocol.
          </p>
        </div>
      </div>
    </div>
  )
}
