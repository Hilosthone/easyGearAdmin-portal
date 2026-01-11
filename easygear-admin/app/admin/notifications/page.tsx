'use client'

import React, { useState } from 'react'
import {
  Bell,
  Check,
  Trash2,
  AlertTriangle,
  Info,
  ShoppingBag,
  UserPlus,
  Store,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'ALERT',
    title: 'Suspicious Login Attempt',
    message: 'Failed login from IP 192.168.1.45 (Lagos, NG)',
    time: '2 mins ago',
    read: false,
  },
  {
    id: 2,
    type: 'SALE',
    title: 'New High-Value Order',
    message: 'User "Musa Ibrahim" placed an order for ₦450,000',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'VENDOR',
    title: 'New Store Application',
    message: 'Adidas Outlet is requesting store verification',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'SYSTEM',
    title: 'Server Maintenance',
    message: 'Weekly database optimization scheduled for 02:00 AM',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'USER',
    title: 'Account Deletion Request',
    message: 'User "Sarah Jenkins" requested to close account',
    time: '1 day ago',
    read: true,
  },
]

export default function AdminNotificationsPage() {
  return (
    <div className='max-w-5xl mx-auto space-y-8'>
      {/* Header & Global Actions */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic'>
            Notifications
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]'>
            Monitor platform-wide activity
          </p>
        </div>
        <div className='flex gap-3'>
          <button className='px-6 py-3 bg-white border-4 border-slate-100 rounded-2xl font-black text-xs text-brand-blue hover:bg-brand-blue hover:text-white transition-all'>
            Mark All as Read
          </button>
          <button className='p-3 bg-red-50 text-red-600 rounded-2xl border-2 border-red-100 hover:bg-red-600 hover:text-white transition-all'>
            <Trash2 size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
        {['All Alerts', 'Security', 'Sales', 'Vendor Requests', 'System'].map(
          (tab, i) => (
            <button
              key={tab}
              className={cn(
                'px-6 py-3 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-4',
                i === 0
                  ? 'bg-brand-slate text-white border-brand-slate shadow-xl'
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
              )}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Notifications List */}
      <div className='space-y-4'>
        {NOTIFICATIONS.map((notif) => (
          <div
            key={notif.id}
            className={cn(
              'group relative p-6 rounded-[2.5rem] border-4 transition-all flex items-start gap-6',
              notif.read
                ? 'bg-white border-slate-50 opacity-70'
                : 'bg-white border-brand-blue/10 shadow-lg'
            )}
          >
            {/* Type-Specific Icon */}
            <div
              className={cn(
                'shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg',
                getTypeStyle(notif.type)
              )}
            >
              {getTypeIcon(notif.type)}
            </div>

            {/* Content */}
            <div className='flex-1 pr-12'>
              <div className='flex items-center gap-3 mb-1'>
                <h3 className='font-black text-lg text-brand-slate leading-tight'>
                  {notif.title}
                </h3>
                {!notif.read && (
                  <span className='w-2 h-2 bg-brand-orange rounded-full animate-ping' />
                )}
              </div>
              <p className='text-slate-500 font-bold text-sm leading-relaxed'>
                {notif.message}
              </p>
              <p className='text-[10px] font-black text-slate-300 uppercase tracking-widest mt-3 flex items-center gap-2'>
                <CheckCircle2 size={12} /> {notif.time}
              </p>
            </div>

            {/* Quick Actions (Hover Only) */}
            <div className='absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button className='p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-brand-blue hover:text-white transition-all'>
                <Check size={18} strokeWidth={3} />
              </button>
              <button className='p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all'>
                <Trash2 size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper for Icons
function getTypeIcon(type: string) {
  switch (type) {
    case 'ALERT':
      return <ShieldAlert size={28} strokeWidth={2.5} />
    case 'SALE':
      return <ShoppingBag size={28} strokeWidth={2.5} />
    case 'VENDOR':
      return <Store size={28} strokeWidth={2.5} />
    default:
      return <Info size={28} strokeWidth={2.5} />
  }
}

// Helper for Colors
function getTypeStyle(type: string) {
  switch (type) {
    case 'ALERT':
      return 'bg-red-500 shadow-red-200'
    case 'SALE':
      return 'bg-emerald-500 shadow-emerald-200'
    case 'VENDOR':
      return 'bg-brand-blue shadow-brand-blue/20'
    default:
      return 'bg-brand-slate shadow-slate-200'
  }
}