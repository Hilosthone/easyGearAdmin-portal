'use client'

import React, { useEffect, useState } from 'react'
import {
  Package,
  Search,
  Filter,
  Trash2, // Added for delete
  ArrowUpRight,
  Activity,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface Product {
  id: string
  title: string
  sku: string
  variants: {
    price: number | string
    quantity: number | string
    label?: string
  }[]
  status: 'active' | 'out_of_stock' | 'draft'
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 1. FETCH LOGIC (GET)
  const fetchInventory = async () => {
    try {
      const res = await fetch('https://api.easygear.ng/api/v1/products')
      const response = await res.json()

      if (response.success && response.data && response.data.data) {
        setProducts(response.data.data)
      }
    } catch (err) {
      console.error('Terminal Fetch Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  // 2. DELETE LOGIC (DELETE)
  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm(
      'CAUTION: Are you sure you want to decommission this asset from the node?'
    )

    if (!confirmed) return

    try {
      const res = await fetch(`https://api.easygear.ng/api/v1/products/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Optimistic UI Update: Filter out the deleted item instantly
        setProducts((prev) => prev.filter((item) => item.id !== id))
      } else {
        alert('Action Failed: The server rejected the decommission request.')
      }
    } catch (err) {
      console.error('Deletion error:', err)
      alert('Sync Error: Could not reach the API node.')
    }
  }

  return (
    <div className='max-w-7xl mx-auto space-y-10 pb-20 px-4'>
      <header className='flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Activity className='text-brand-orange animate-pulse' size={14} />
            <p className='text-[10px] font-black text-brand-orange uppercase tracking-[0.4em]'>
              Active Inventory Node
            </p>
          </div>
          <h2 className='text-5xl font-black text-brand-slate tracking-tighter italic uppercase leading-none'>
            Stockpile
          </h2>
        </div>

        <div className='flex items-center gap-3'>
          <div className='relative group'>
            <Search
              className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-orange transition-colors'
              size={18}
            />
            <input
              placeholder='Search Asset ID...'
              className='bg-white border-4 border-slate-50 rounded-2xl py-4 pl-14 pr-6 text-xs font-black uppercase outline-none focus:border-brand-orange/10 w-full md:w-64 transition-all'
            />
          </div>
          <button className='p-4 bg-white border-4 border-slate-50 rounded-2xl text-slate-400 hover:text-brand-orange transition-all'>
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className='bg-white border-4 border-slate-50 rounded-5xl overflow-hidden shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse min-w-200'>
            <thead>
              <tr className='border-b-4 border-slate-50'>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Asset Details
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Availability
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Valuation
                </th>
                <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right'>
                  Command
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-4 divide-slate-50'>
              {loading ? (
                <LoadingState />
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className='px-8 py-20 text-center'>
                    <div className='flex flex-col items-center gap-4 opacity-20'>
                      <Package size={48} />
                      <p className='font-black uppercase tracking-widest text-xs'>
                        Bay Empty: No Gear Detected
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr
                    key={item.id}
                    className='group hover:bg-slate-50/50 transition-colors'
                  >
                    <td className='px-8 py-8'>
                      <div className='flex items-center gap-5'>
                        <div className='w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors'>
                          <Package size={24} />
                        </div>
                        <div>
                          <h4 className='font-black text-brand-slate uppercase tracking-tight leading-none mb-1'>
                            {item.title}
                          </h4>
                          <p className='text-[9px] font-bold text-slate-300 uppercase tracking-widest'>
                            {item.sku || 'REF-NOT-ASSIGNED'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-8 py-8'>
                      <StockBadge
                        quantity={Number(item.variants[0]?.quantity || 0)}
                      />
                    </td>
                    <td className='px-8 py-8'>
                      <p className='text-lg font-black italic text-brand-slate leading-none'>
                        ₦{Number(item.variants[0]?.price || 0).toLocaleString()}
                      </p>
                      <p className='text-[8px] font-black text-slate-300 uppercase mt-1'>
                        Current Market Floor
                      </p>
                    </td>
                    <td className='px-8 py-8 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <button className='p-3 bg-slate-100 rounded-xl text-slate-400 hover:bg-brand-slate hover:text-white transition-all'>
                          <ArrowUpRight size={18} />
                        </button>
                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className='p-3 bg-rose-50 rounded-xl text-rose-400 hover:bg-rose-500 hover:text-white transition-all'
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// --- Helpers remain same as previous ---
function StockBadge({ quantity }: { quantity: number }) {
  const isLow = quantity > 0 && quantity < 5
  const isOut = quantity === 0
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border-2',
        isOut
          ? 'bg-rose-50 border-rose-100 text-rose-500'
          : isLow
          ? 'bg-amber-50 border-amber-100 text-amber-500'
          : 'bg-emerald-50 border-emerald-100 text-emerald-500'
      )}
    >
      {isLow && <AlertTriangle size={12} className='animate-bounce' />}
      <span className='text-[10px] font-black uppercase tracking-tighter'>
        {isOut ? 'Depleted' : `${quantity} Units In Bay`}
      </span>
    </div>
  )
}

function LoadingState() {
  return [1, 2, 3, 4].map((i) => (
    <tr key={i} className='animate-pulse'>
      <td colSpan={4} className='px-8 py-10'>
        <div className='flex items-center gap-5'>
          <div className='w-14 h-14 bg-slate-100 rounded-2xl' />
          <div className='space-y-2'>
            <div className='h-4 w-48 bg-slate-100 rounded' />
            <div className='h-2 w-24 bg-slate-100 rounded' />
          </div>
        </div>
      </td>
    </tr>
  ))
}