// src/app/vendor/page.tsx
import { BarChart3, Package, MousePointer2, CreditCard } from 'lucide-react'

export default function VendorDashboardOverview() {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-4xl font-black text-brand-slate tracking-tight'>
          Vendor Terminal
        </h1>
        <p className='text-slate-500 font-bold mt-1'>
          Managing: Storefront Nike-Air
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='bg-brand-blue p-10 rounded-5xl text-white shadow-2xl shadow-brand-blue/30 col-span-1 md:col-span-2 relative overflow-hidden'>
          <p className='text-white/60 font-black text-sm uppercase tracking-widest'>
            Store Earnings
          </p>
          <h2 className='text-6xl font-black mt-2'>₦842,500</h2>
          <div className='mt-8 flex gap-4'>
            <button className='px-8 py-4 bg-white text-brand-blue rounded-2xl font-black hover:scale-105 transition-transform'>
              Withdraw Funds
            </button>
            <button className='px-8 py-4 bg-white/10 text-white rounded-2xl font-black hover:bg-white/20 transition-all border border-white/20'>
              Earnings Log
            </button>
          </div>
          <CreditCard className='absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12' />
        </div>

        <div className='space-y-6'>
          <MiniStat
            title='Order Stats'
            value='24 Pending'
            icon={Package}
            color='text-brand-orange'
          />
          <MiniStat
            title='Gear Views'
            value='1.2k Clicks'
            icon={MousePointer2}
            color='text-purple-500'
          />
        </div>
      </div>
    </div>
  )
}

function MiniStat({ title, value, icon: Icon, color }: any) {
  return (
    <div className='bg-white p-8 rounded-4xl border-4 border-slate-50 shadow-sm flex items-center gap-6'>
      <div className={`p-4 rounded-2xl bg-slate-50 ${color}`}>
        <Icon className='w-6 h-6 stroke-3' />
      </div>
      <div>
        <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
          {title}
        </p>
        <p className='text-xl font-black text-brand-slate leading-none mt-1'>
          {value}
        </p>
      </div>
    </div>
  )
}