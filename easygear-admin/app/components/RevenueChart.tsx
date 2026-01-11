'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

const data = [
  { name: 'Mon', rev: 4000 },
  { name: 'Tue', rev: 3000 },
  { name: 'Wed', rev: 5000 },
  { name: 'Thu', rev: 2780 },
  { name: 'Fri', rev: 6890 },
  { name: 'Sat', rev: 8390 },
  { name: 'Sun', rev: 9490 },
]

export default function RevenueChart() {
  return (
    <div className='bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm mt-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-xl font-black text-brand-slate tracking-tight'>
            Revenue Analytics
          </h2>
          <p className='text-xs font-bold text-zinc-400'>
            Weekly performance overview
          </p>
        </div>
        <select className='bg-zinc-100 border-none rounded-xl px-4 py-2 text-xs font-bold text-zinc-600 outline-none cursor-pointer'>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className='h-87.5 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='colorRev' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#0052FF' stopOpacity={0.1} />
                <stop offset='95%' stopColor='#0052FF' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#f0f0f0'
            />
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontWeight: 'bold',
              }}
            />
            <Area
              type='monotone'
              dataKey='rev'
              stroke='#0052FF'
              strokeWidth={4}
              fillOpacity={1}
              fill='url(#colorRev)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}