'use client'

import { Bell, Zap, Users, ShoppingBag, ArrowRight } from 'lucide-react'
import RevenueChart from '../components/RevenueChart'
import DashboardStats from '../components/DashboardStats'

export default function AdminDashboardOverview() {
  return (
    <div className='space-y-10'>
      {/* Welcome Header */}
      <div>
        <h1 className='text-4xl font-black text-brand-slate tracking-tight'>
          System Overview
        </h1>
        <p className='text-slate-500 font-bold mt-1'>
          Real-time platform performance data.
        </p>
      </div>

      {/* Stats Grid Component */}
      <DashboardStats />

      {/* Lower Section: Real Charts & Logs */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <RevenueChart />
        </div>

        {/* Recent Activity Log */}
        <div className='bg-white border-4 border-slate-100 rounded-5xl p-8 shadow-sm flex flex-col'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-brand-slate text-white rounded-xl'>
                <Bell size={18} />
              </div>
              <h3 className='font-black text-brand-slate'>Activity Log</h3>
            </div>
            <button className='text-[10px] font-black uppercase text-brand-blue hover:underline'>
              View All
            </button>
          </div>

          <div className='space-y-6 flex-1'>
            <ActivityItem
              icon={<Zap size={14} className='text-brand-orange' />}
              title='New Vendor Alert'
              desc='Electronics Hub submitted a request'
              time='2m ago'
            />
            <ActivityItem
              icon={<Users size={14} className='text-brand-blue' />}
              title='User Surge'
              desc='150+ new users joined today'
              time='45m ago'
            />
            <ActivityItem
              icon={<ShoppingBag size={14} className='text-emerald-500' />}
              title='Large Order'
              desc='Order #7721 confirmed (₦850k)'
              time='1h ago'
            />
          </div>

          <button className='mt-8 w-full py-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-brand-slate transition-colors'>
            Generate Report
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ icon, title, desc, time }: any) {
  return (
    <div className='flex gap-4 group cursor-default'>
      <div className='h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-md transition-all'>
        {icon}
      </div>
      <div className='flex-1 border-b border-slate-50 pb-4'>
        <div className='flex justify-between'>
          <p className='text-sm font-black text-brand-slate leading-none'>
            {title}
          </p>
          <span className='text-[10px] font-bold text-slate-400 uppercase'>
            {time}
          </span>
        </div>
        <p className='text-xs font-medium text-slate-400 mt-1.5 line-clamp-1'>
          {desc}
        </p>
      </div>
    </div>
  )
}
