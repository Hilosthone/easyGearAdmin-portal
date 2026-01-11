'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  Dumbbell,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  X,
  ShieldAlert,
  Check,
  RefreshCcw,
  Undo2,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'
import Link from 'next/link'

const INITIAL_GYM_EQUIPMENT = [
  {
    id: 'GYM-101',
    name: 'Concept2 RowErg',
    category: 'Cardio',
    price: 15000,
    stock: 4,
    status: 'available',
  },
  {
    id: 'GYM-102',
    name: 'Rogue RML-390F Power Rack',
    category: 'Strength',
    price: 25000,
    stock: 1,
    status: 'low-stock',
  },
  {
    id: 'GYM-103',
    name: 'Theragun PRO G5',
    category: 'Recovery',
    price: 5000,
    stock: 8,
    status: 'available',
  },
  {
    id: 'GYM-104',
    name: 'Peloton Bike+',
    category: 'Cardio',
    price: 35000,
    stock: 0,
    status: 'out-of-stock',
  },
  {
    id: 'GYM-105',
    name: 'Olympic Bumper Plate Set (140kg)',
    category: 'Strength',
    price: 12000,
    stock: 12,
    status: 'available',
  },
  {
    id: 'GYM-106',
    name: 'Assault AirBike Classic',
    category: 'Cardio',
    price: 18000,
    stock: 2,
    status: 'available',
  },
]

export default function MyGymInventory() {
  const [products, setProducts] = useState(INITIAL_GYM_EQUIPMENT)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<
    (typeof INITIAL_GYM_EQUIPMENT)[0] | null
  >(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  const categories = [
    'All Categories',
    ...Array.from(new Set(INITIAL_GYM_EQUIPMENT.map((p) => p.category))),
  ]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      completeDeletion()
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const startDeletionSequence = () => setCountdown(3)
  const abortDeletion = () => {
    setCountdown(null)
    setDeleteId(null)
  }

  const completeDeletion = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId))
      setDeleteId(null)
      setCountdown(null)
      setIsProcessing(false)
    }, 500)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === 'All Categories' ||
        product.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, categoryFilter])

  const updateStatus = (newStatus: string) => {
    if (!editItem) return
    setIsProcessing(true)
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editItem.id ? { ...p, status: newStatus } : p
        )
      )
      setIsProcessing(false)
      setEditItem(null)
    }, 600)
  }

  return (
    <div className='p-6 md:p-10 max-w-7xl mx-auto relative'>
      {/* DELETE MODAL */}
      {deleteId && (
        <div className='fixed inset-0 z-60 flex items-center justify-center p-6 bg-brand-slate/80 backdrop-blur-md animate-in fade-in duration-300'>
          <div className='bg-white w-full max-w-md rounded-5xl border-4 border-slate-100 shadow-2xl overflow-hidden'>
            <div className='p-10 text-center'>
              <div
                className={cn(
                  'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500',
                  countdown !== null
                    ? 'bg-red-500 text-white scale-110'
                    : 'bg-red-50 text-red-500'
                )}
              >
                {countdown !== null ? (
                  <span className='text-4xl font-black'>{countdown}</span>
                ) : (
                  <ShieldAlert size={48} strokeWidth={2.5} />
                )}
              </div>
              <h3 className='text-xl font-black text-brand-slate uppercase'>
                {countdown !== null
                  ? 'Deleting Asset...'
                  : 'Confirm Termination'}
              </h3>
              <p className='text-slate-400 font-bold text-[11px] uppercase tracking-widest mt-2 px-4 italic'>
                PURGING: {products.find((p) => p.id === deleteId)?.name}
              </p>
            </div>
            <div className='flex border-t-4 border-slate-50'>
              <button
                onClick={abortDeletion}
                className='flex-1 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 flex items-center justify-center gap-2'
              >
                <Undo2 size={14} /> {countdown !== null ? 'Abort' : 'Cancel'}
              </button>
              {countdown === null && (
                <button
                  onClick={startDeletionSequence}
                  className='flex-1 py-6 text-[10px] font-black uppercase bg-red-500 text-white hover:bg-red-600 transition-colors'
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-slate/60 backdrop-blur-sm'>
          <div className='bg-white w-full max-w-md rounded-5xl border-4 border-slate-100 shadow-2xl overflow-hidden p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-black text-brand-slate uppercase italic'>
                Update Status
              </h3>
              <button
                onClick={() => setEditItem(null)}
                className='text-slate-300 hover:text-brand-orange'
              >
                <X size={20} />
              </button>
            </div>
            <div className='space-y-3'>
              {['available', 'low-stock', 'out-of-stock'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className={cn(
                    'w-full p-4 rounded-2xl border-3 text-left transition-all flex items-center justify-between',
                    editItem.status === status
                      ? 'border-brand-orange bg-brand-orange/5'
                      : 'border-slate-50 hover:border-slate-200'
                  )}
                >
                  <span className='text-[11px] font-black uppercase text-brand-slate'>
                    {status.replace('-', ' ')}
                  </span>
                  {editItem.status === status && (
                    <Check
                      size={16}
                      className='text-brand-orange'
                      strokeWidth={4}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate italic uppercase tracking-tighter'>
            Iron<span className='text-brand-orange'>.</span>Assets
          </h1>
          <p className='text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2'>
            Warehouse Mission Control
          </p>
        </div>
        <Link
          href='/vendor/products/add'
          className='bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center gap-3'
        >
          <Plus size={18} strokeWidth={3} /> Register Equipment
        </Link>
      </div>

      {/* Filter Bar */}
      <div className='bg-white p-4 rounded-4xl border-4 border-slate-100 mb-8 flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search
            className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
            size={18}
          />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search assets...'
            className='w-full pl-14 pr-12 py-4 bg-slate-50 border-3 border-transparent rounded-2xl focus:bg-white focus:border-brand-orange outline-none font-bold text-sm transition-all'
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase outline-none'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className='bg-white rounded-5xl border-4 border-slate-100 shadow-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b-4 border-slate-50'>
                <th className='px-8 py-6 text-[10px] font-black uppercase text-slate-400'>
                  Equipment
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase text-slate-400'>
                  Type
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase text-slate-400'>
                  Status
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase text-slate-400 text-right'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-2 divide-slate-50'>
              {filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className='group hover:bg-slate-50/50 transition-colors'
                >
                  <td className='px-8 py-6'>
                    <div className='flex items-center gap-4'>
                      <div className='w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-orange transition-all'>
                        <Dumbbell size={24} />
                      </div>
                      <div>
                        <p className='text-sm font-black text-brand-slate uppercase tracking-tight'>
                          {item.name}
                        </p>
                        <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1'>
                          ID: {item.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-8 py-6'>
                    <span className='text-[10px] font-black text-slate-500 uppercase bg-slate-100 px-3 py-1.5 rounded-lg'>
                      {item.category}
                    </span>
                  </td>
                  <td className='px-8 py-6'>
                    <div
                      className={cn(
                        'px-4 py-2 rounded-xl border-2 font-black text-[9px] uppercase tracking-widest w-fit',
                        item.status === 'available'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : item.status === 'low-stock'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      )}
                    >
                      {item.status.replace('-', ' ')}
                    </div>
                  </td>
                  <td className='px-8 py-6 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => setEditItem(item)}
                        className='p-2.5 text-slate-400 hover:text-brand-blue transition-all'
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className='p-2.5 text-slate-400 hover:text-red-500 transition-all'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
