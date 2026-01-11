'use client'

import React, { useState } from 'react'
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Activity,
  Zap,
  Target,
  Layers,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState('GROSS')

  return (
    <div className='max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700'>
      {/* Header & Date Picker */}
      <div className='flex flex-col xl:flex-row xl:items-end justify-between gap-6'>
        <div>
          <h1 className='text-5xl font-black text-brand-slate tracking-tighter italic uppercase'>
            Analytics Engine
          </h1>
          <p className='text-slate-400 font-black mt-2 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2'>
            <Activity size={14} className='text-brand-blue' />
            Real-Time Platform Intelligence Output
          </p>
        </div>
        <div className='flex gap-3'>
          <div className='flex items-center gap-4 bg-white border-4 border-slate-100 px-6 py-4 rounded-3xl shadow-sm'>
            <Calendar size={18} className='text-brand-blue' strokeWidth={3} />
            <span className='font-black text-xs uppercase tracking-widest text-brand-slate'>
              01 Jan — 07 Jan, 2026
            </span>
          </div>
          <button className='p-5 bg-brand-slate text-white rounded-3xl hover:bg-brand-blue transition-all shadow-xl shadow-brand-blue/10 active:scale-95'>
            <Download size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Sales Trend Visualization */}
        <div className='lg:col-span-2 bg-white border-4 border-slate-100 rounded-[3.5rem] p-10 shadow-sm flex flex-col relative overflow-hidden'>
          <div className='flex items-center justify-between mb-12 relative z-10'>
            <div>
              <h3 className='text-2xl font-black text-brand-slate flex items-center gap-3 italic uppercase tracking-tighter'>
                <LineChart
                  className='text-brand-blue'
                  size={24}
                  strokeWidth={3}
                />
                Sales Velocity
              </h3>
              <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1'>
                Unit movement per cycle
              </p>
            </div>
            <div className='flex bg-slate-50 p-1.5 rounded-2xl border-2 border-slate-100'>
              {['GROSS', 'NET'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all',
                    activeTab === tab
                      ? 'bg-brand-slate text-white shadow-lg'
                      : 'text-slate-400 hover:text-brand-slate'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Custom CSS Chart Visualization */}
          <div className='flex-1 min-h-75 flex items-end gap-4 px-2 relative'>
            {/* Grid Lines */}
            <div className='absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='border-b-2 border-brand-slate w-full' />
              ))}
            </div>

            {/* Dynamic Bars */}
            <ChartBar height='60%' label='MON' value='₦400k' />
            <ChartBar height='45%' label='TUE' value='₦280k' />
            <ChartBar height='85%' label='WED' value='₦620k' active />
            <ChartBar height='30%' label='THU' value='₦190k' />
            <ChartBar height='75%' label='FRI' value='₦510k' />
            <ChartBar height='95%' label='SAT' value='₦740k' />
            <ChartBar height='65%' label='SUN' value='₦430k' />
          </div>
        </div>

        {/* Top Performing Vendors Leaderboard */}
        <div className='bg-brand-slate border-4 border-brand-slate rounded-[3.5rem] p-10 shadow-2xl flex flex-col text-white'>
          <h3 className='text-2xl font-black mb-10 flex items-center gap-3 italic uppercase tracking-tighter'>
            <TrendingUp
              className='text-brand-orange'
              size={24}
              strokeWidth={3}
            />
            Leaderboard
          </h3>
          <div className='space-y-8 flex-1'>
            <VendorRank
              rank={1}
              name='Nike Official'
              sales='₦2.4M'
              growth='+18%'
            />
            <VendorRank
              rank={2}
              name='Mountain Pros'
              sales='₦1.8M'
              growth='+12%'
            />
            <VendorRank rank={3} name='Decathlon' sales='₦1.1M' growth='+5%' />
            <VendorRank
              rank={4}
              name='Sporty-X'
              sales='₦850k'
              growth='-2%'
              isDown
            />
          </div>
          <button className='mt-10 w-full py-5 bg-white/5 border-2 border-white/10 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-brand-orange transition-all text-white/60 hover:text-brand-orange'>
            Full Leaderboard Output
          </button>
        </div>
      </div>

      {/* Category Breakdown Matrix */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <CategoryCard
          label='Footwear'
          percentage={45}
          color='bg-brand-blue'
          icon={<Zap size={18} />}
        />
        <CategoryCard
          label='Camping'
          percentage={25}
          color='bg-brand-orange'
          icon={<Target size={18} />}
        />
        <CategoryCard
          label='Apparel'
          percentage={20}
          color='bg-purple-600'
          icon={<Layers size={18} />}
        />
        <CategoryCard
          label='Gym Wear'
          percentage={10}
          color='bg-emerald-500'
          icon={<BarChart3 size={18} />}
        />
      </div>
    </div>
  )
}

function ChartBar({ height, label, value, active }: any) {
  return (
    <div className='flex-1 flex flex-col items-center gap-4 group'>
      <div className='relative w-full flex flex-col justify-end h-64'>
        <div
          style={{ height }}
          className={cn(
            'w-full rounded-2xl transition-all duration-1000 cursor-help relative group-hover:scale-x-105',
            active
              ? 'bg-brand-blue shadow-[0_0_30px_rgba(0,112,243,0.3)]'
              : 'bg-slate-100 group-hover:bg-slate-200'
          )}
        >
          <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-slate text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20'>
            {value}
          </div>
        </div>
      </div>
      <span className='text-[10px] font-black text-slate-400 uppercase tracking-tighter'>
        {label}
      </span>
    </div>
  )
}

function VendorRank({ rank, name, sales, growth, isDown }: any) {
  return (
    <div className='flex items-center justify-between group cursor-pointer'>
      <div className='flex items-center gap-5'>
        <span
          className={cn(
            'text-3xl font-black italic transition-colors',
            rank === 1
              ? 'text-brand-orange'
              : 'text-white/10 group-hover:text-white/40'
          )}
        >
          0{rank}
        </span>
        <div>
          <p className='font-black text-sm uppercase tracking-tight group-hover:text-brand-orange transition-colors'>
            {name}
          </p>
          <p className='text-[10px] font-bold text-white/30 uppercase mt-1'>
            Vol: {sales}
          </p>
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-1 font-black text-[10px] px-3 py-1 rounded-lg border-2',
          isDown
            ? 'text-red-400 border-red-400/20 bg-red-400/5'
            : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
        )}
      >
        {isDown ? (
          <ArrowDownRight size={12} strokeWidth={3} />
        ) : (
          <ArrowUpRight size={12} strokeWidth={3} />
        )}
        {growth}
      </div>
    </div>
  )
}

function CategoryCard({ label, percentage, color, icon }: any) {
  return (
    <div className='bg-white border-4 border-slate-100 p-8 rounded-5xl shadow-sm hover:shadow-xl transition-all group'>
      <div className='flex justify-between items-start'>
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 transition-transform group-hover:rotate-6',
            color
          )}
        >
          {icon}
        </div>
        <div className='text-right'>
          <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
            {label}
          </p>
          <h4 className='text-3xl font-black text-brand-slate tracking-tighter mt-1'>
            {percentage}%
          </h4>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='h-4 bg-slate-50 rounded-full border-2 border-slate-100 overflow-hidden'>
          <div
            className={cn(
              'h-full transition-all duration-1000 ease-out',
              color
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className='text-[9px] font-black text-slate-300 uppercase tracking-tighter flex justify-between'>
          <span>Index Saturation</span>
          <span className='text-brand-blue'>Live</span>
        </p>
      </div>
    </div>
  )
}