'use client'

import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingBag,
  CreditCard,
  Activity,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const stats = [
  {
    label: 'Total Revenue',
    value: '$128,430',
    change: '+12.5%',
    trend: 'up',
    icon: CreditCard,
    color: 'blue',
  },
  {
    label: 'Active Vendors',
    value: '1,240',
    change: '+3.2%',
    trend: 'up',
    icon: Users,
    color: 'purple',
  },
  {
    label: 'Pending Orders',
    value: '43',
    change: '-5.1%',
    trend: 'down',
    icon: ShoppingBag,
    color: 'orange',
  },
  {
    label: 'System Load',
    value: '24%',
    change: 'Stable',
    trend: 'neutral',
    icon: Activity,
    color: 'emerald',
  },
]

export default function DashboardStats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className='bg-white p-6 rounded-4xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-shadow group'
        >
          <div className='flex justify-between items-start mb-4'>
            <div
              className={cn(
                'p-3 rounded-2xl transition-colors',
                stat.color === 'blue' && 'bg-blue-50 text-brand-blue',
                stat.color === 'purple' && 'bg-purple-50 text-purple-600',
                stat.color === 'orange' && 'bg-orange-50 text-brand-orange',
                stat.color === 'emerald' && 'bg-emerald-50 text-emerald-600'
              )}
            >
              <stat.icon size={24} />
            </div>
            <div
              className={cn(
                'flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg',
                stat.trend === 'up'
                  ? 'bg-emerald-50 text-emerald-600'
                  : stat.trend === 'down'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-zinc-100 text-zinc-500'
              )}
            >
              {stat.trend === 'up' ? (
                <ArrowUpRight size={12} />
              ) : stat.trend === 'down' ? (
                <ArrowDownRight size={12} />
              ) : null}
              {stat.change}
            </div>
          </div>
          <div>
            <p className='text-[10px] font-black text-zinc-400 uppercase tracking-widest'>
              {stat.label}
            </p>
            <h3 className='text-2xl font-black text-brand-slate mt-1'>
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
