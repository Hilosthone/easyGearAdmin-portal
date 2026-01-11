'use client'

import { useState, useMemo } from 'react'
import {
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  Search,
  ListFilter,
  ArrowUpRight,
  Package,
  AlertCircle,
  Inbox,
  X,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

// Initial Data
const INITIAL_ORDERS = [
  {
    id: 'ORD-8821',
    customer: 'John Doe',
    vendor: 'Nike Store',
    total: '₦45,000',
    status: 'Delivered',
    date: 'Jan 05, 2026',
  },
  {
    id: 'ORD-8822',
    customer: 'Sarah Williams',
    vendor: 'Mountain Pros',
    total: '₦120,500',
    status: 'Processing',
    date: 'Jan 06, 2026',
  },
  {
    id: 'ORD-8823',
    customer: 'David Mark',
    vendor: 'Decathlon',
    total: '₦12,000',
    status: 'Shipped',
    date: 'Jan 07, 2026',
  },
  {
    id: 'ORD-8824',
    customer: 'Grace Ali',
    vendor: 'Nike Store',
    total: '₦88,300',
    status: 'Pending',
    date: 'Jan 07, 2026',
  },
  {
    id: 'ORD-8825',
    customer: 'Bose Afolabi',
    vendor: 'Electronics Hub',
    total: '₦450,000',
    status: 'Processing',
    date: 'Jan 08, 2026',
  },
  {
    id: 'ORD-8826',
    customer: 'Chidi Oke',
    vendor: 'Gear Pro',
    total: '₦32,000',
    status: 'Delivered',
    date: 'Jan 08, 2026',
  },
  {
    id: 'ORD-8827',
    customer: 'Fatima Umar',
    vendor: 'Nike Store',
    total: '₦65,200',
    status: 'Shipped',
    date: 'Jan 09, 2026',
  },
  {
    id: 'ORD-8828',
    customer: 'Emeka Obi',
    vendor: 'Decathlon',
    total: '₦18,900',
    status: 'Pending',
    date: 'Jan 09, 2026',
  },
]

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // FILTER ENGINE
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.vendor.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTab = activeFilter === 'All' || order.status === activeFilter

      return matchesSearch && matchesTab
    })
  }, [searchQuery, activeFilter, orders])

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
    setSelectedOrder(null)
  }

  return (
    <div className='space-y-8 relative'>
      {/* Header & Tabs */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic'>
            Logistics Terminal
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]'>
            {filteredOrders.length} active results in {activeFilter} scope
          </p>
        </div>

        <div className='flex bg-white border-4 border-slate-100 p-1.5 rounded-2xl shadow-sm overflow-x-auto no-scrollbar'>
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-tighter',
                  activeFilter === filter
                    ? 'bg-brand-blue text-white shadow-lg'
                    : 'text-slate-400 hover:text-brand-slate'
                )}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className='relative group'>
        <Search
          className={cn(
            'absolute left-6 top-1/2 -translate-y-1/2 transition-colors',
            searchQuery ? 'text-brand-blue' : 'text-slate-400'
          )}
          size={20}
          strokeWidth={3}
        />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Query Order ID, Merchant, or Customer Name...'
          className='w-full pl-16 pr-8 py-5 bg-white border-4 border-slate-100 rounded-4xl outline-none font-bold focus:border-brand-blue transition-all text-brand-slate'
        />
      </div>

      {/* Table */}
      <div className='bg-white border-4 border-slate-100 rounded-5xl overflow-hidden shadow-sm'>
        {filteredOrders.length > 0 ? (
          <table className='w-full text-left'>
            <thead className='bg-slate-50 border-b-4 border-slate-100'>
              <tr className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
                <th className='px-8 py-6'>Identification</th>
                <th className='px-8 py-6'>Stakeholders</th>
                <th className='px-8 py-6'>Capital</th>
                <th className='px-8 py-6'>Stage</th>
                <th className='px-8 py-6 text-right'>Control</th>
              </tr>
            </thead>
            <tbody className='divide-y-4 divide-slate-50 font-bold'>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className='group hover:bg-slate-50/50 transition-colors'
                >
                  <td className='px-8 py-6'>
                    <span className='font-black text-brand-slate'>
                      {order.id}
                    </span>
                  </td>
                  <td className='px-8 py-6'>
                    <p className='text-brand-slate'>{order.vendor}</p>
                    <p className='text-[10px] text-slate-400 uppercase'>
                      Cust: {order.customer}
                    </p>
                  </td>
                  <td className='px-8 py-6 text-brand-slate'>{order.total}</td>
                  <td className='px-8 py-6'>
                    <StatusBadge status={order.status} />
                  </td>
                  <td className='px-8 py-6 text-right'>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className='p-3 bg-slate-100 rounded-xl text-slate-400 hover:bg-brand-blue hover:text-white transition-all'
                    >
                      <ArrowUpRight size={18} strokeWidth={3} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='py-24 text-center'>
            <Inbox size={48} className='mx-auto text-slate-200 mb-4' />
            <p className='font-black text-brand-slate'>
              No records found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Quick Status Update Modal */}
      {selectedOrder && (
        <div className='fixed inset-0 z-110 flex items-center justify-center p-4 bg-brand-slate/40 backdrop-blur-sm animate-in fade-in'>
          <div className='bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border-4 border-slate-100 animate-in zoom-in-95'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-black text-brand-slate italic'>
                Update Order Stage
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className='p-2 hover:bg-slate-100 rounded-full'
              >
                <X size={20} />
              </button>
            </div>

            <p className='text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest'>
              Current: {selectedOrder.id} • {selectedOrder.status}
            </p>

            <div className='grid gap-3'>
              {['Pending', 'Processing', 'Shipped', 'Delivered'].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selectedOrder.id, s)}
                  className={cn(
                    'w-full p-4 rounded-2xl flex items-center justify-between font-black text-sm transition-all border-4',
                    selectedOrder.status === s
                      ? 'border-brand-blue bg-blue-50 text-brand-blue'
                      : 'border-slate-50 hover:border-slate-200 text-slate-500'
                  )}
                >
                  {s}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    Delivered: {
      color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      icon: CheckCircle,
    },
    Processing: {
      color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      icon: Clock,
    },
    Shipped: {
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      icon: Truck,
    },
    Pending: {
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      icon: AlertCircle,
    },
  }
  const { color, icon: Icon } = config[status] || config['Pending']
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-[9px] font-black uppercase tracking-widest',
        color
      )}
    >
      <Icon size={12} strokeWidth={3} /> {status}
    </div>
  )
}