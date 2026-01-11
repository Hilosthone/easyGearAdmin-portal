'use client'

import { useState, useMemo } from 'react'
import {
  Package,
  CheckCircle,
  AlertTriangle,
  Eye,
  Trash2,
  Search,
  Star,
  Inbox,
  X,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const INITIAL_PRODUCTS = [
  {
    id: 'P-901',
    name: 'Nike Air Max 270',
    vendor: 'Nike Store',
    price: '₦85,000',
    status: 'Active',
    reports: 0,
    rating: 4.8,
  },
  {
    id: 'P-902',
    name: 'Professional Hiking Bag',
    vendor: 'Mountain Pros',
    price: '₦32,500',
    status: 'Pending',
    reports: 0,
    rating: 0,
  },
  {
    id: 'P-903',
    name: 'Original Adidas Jersey',
    vendor: 'Sporty-X',
    price: '₦15,000',
    status: 'Reported',
    reports: 12,
    rating: 3.2,
  },
  {
    id: 'P-904',
    name: 'MacBook Pro M3 Case',
    vendor: 'Electronics Hub',
    price: '₦12,000',
    status: 'Active',
    reports: 2,
    rating: 4.5,
  },
  {
    id: 'P-905',
    name: 'Wireless Gym Earbuds',
    vendor: 'Gear Pro',
    price: '₦25,000',
    status: 'Pending',
    reports: 0,
    rating: 0,
  },
]

export default function AdminProductManagement() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyFlagged, setShowOnlyFlagged] = useState(false)

  // FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFlag = showOnlyFlagged ? p.status === 'Reported' : true

      return matchesSearch && matchesFlag
    })
  }, [products, searchQuery, showOnlyFlagged])

  // MODERATION ACTIONS
  const approveProduct = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, status: 'Active' } : p))
    )
  }

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this listing?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <div className='space-y-8'>
      {/* Header Area */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic'>
            Product Catalog
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]'>
            Listing moderation: {filteredProducts.length} items visible
          </p>
        </div>
        <div className='flex gap-4'>
          <button
            onClick={() => setShowOnlyFlagged(!showOnlyFlagged)}
            className={cn(
              'px-6 py-4 border-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 transition-all',
              showOnlyFlagged
                ? 'bg-red-600 text-white border-red-700 shadow-lg scale-105'
                : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
            )}
          >
            <AlertTriangle size={18} strokeWidth={3} />
            {showOnlyFlagged
              ? 'Showing Flagged'
              : `View Flagged (${
                  products.filter((p) => p.status === 'Reported').length
                })`}
          </button>
        </div>
      </div>

      {/* Search Input Area */}
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
          placeholder='Search by product name, ID, or merchant...'
          className='w-full pl-16 pr-12 py-5 bg-white border-4 border-slate-100 rounded-4xl outline-none font-bold focus:border-brand-blue transition-all'
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className='absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-slate'
          >
            <X size={20} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className='bg-white border-4 border-slate-100 rounded-5xl overflow-hidden shadow-sm'>
        <div className='overflow-x-auto'>
          {filteredProducts.length > 0 ? (
            <table className='w-full text-left border-collapse'>
              <thead className='bg-slate-50 border-b-4 border-slate-100'>
                <tr>
                  <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                    Product Info
                  </th>
                  <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                    Vendor
                  </th>
                  <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                    Price
                  </th>
                  <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                    Status
                  </th>
                  <th className='px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right'>
                    Moderation
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y-4 divide-slate-50'>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className='group hover:bg-slate-50/50 transition-colors'
                  >
                    <td className='px-8 py-6'>
                      <div className='flex items-center gap-4'>
                        <div className='w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center border-2 border-slate-200 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all'>
                          <Package
                            size={24}
                            className='text-slate-400 group-hover:text-white'
                            strokeWidth={2.5}
                          />
                        </div>
                        <div>
                          <p className='font-black text-brand-slate text-lg leading-none'>
                            {product.name}
                          </p>
                          <div className='flex items-center gap-1 mt-2'>
                            <Star
                              size={12}
                              className='text-brand-orange fill-brand-orange'
                            />
                            <p className='text-xs font-bold text-slate-400'>
                              {product.rating || 'New'}
                            </p>
                            <span className='text-[10px] text-slate-300 ml-2 font-black uppercase'>
                              {product.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-8 py-6 font-bold text-slate-600 italic'>
                      @{product.vendor}
                    </td>
                    <td className='px-8 py-6 font-black text-brand-slate text-lg'>
                      {product.price}
                    </td>
                    <td className='px-8 py-6'>
                      <ProductStatusBadge
                        status={product.status}
                        reports={product.reports}
                      />
                    </td>
                    <td className='px-8 py-6'>
                      <div className='flex items-center justify-end gap-2'>
                        {product.status === 'Pending' && (
                          <button
                            onClick={() => approveProduct(product.id)}
                            title='Approve Listing'
                            className='p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all'
                          >
                            <CheckCircle size={20} strokeWidth={3} />
                          </button>
                        )}
                        <button className='p-3 bg-slate-100 text-slate-400 hover:bg-brand-blue hover:text-white rounded-xl transition-all'>
                          <Eye size={20} strokeWidth={3} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          title='Delete Listing'
                          className='p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all'
                        >
                          <Trash2 size={20} strokeWidth={3} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='py-32 flex flex-col items-center justify-center text-center'>
              <div className='p-6 bg-slate-50 rounded-full mb-4'>
                <Inbox size={48} className='text-slate-200' />
              </div>
              <h3 className='text-xl font-black text-brand-slate'>
                Catalog is empty
              </h3>
              <p className='text-slate-400 font-bold max-w-xs mx-auto'>
                No products match your current filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductStatusBadge({
  status,
  reports,
}: {
  status: string
  reports: number
}) {
  if (status === 'Reported') {
    return (
      <div className='inline-flex flex-col gap-1'>
        <span className='px-4 py-2 bg-red-100 text-red-600 border-2 border-red-200 rounded-xl text-[10px] font-black uppercase tracking-widest'>
          {status}
        </span>
        <p className='text-[10px] font-bold text-red-400 text-center animate-pulse'>
          {reports} Critical Flags
        </p>
      </div>
    )
  }

  const styles: any = {
    Active: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    Pending: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  }

  return (
    <span
      className={cn(
        'px-4 py-2 border-2 rounded-xl text-[10px] font-black uppercase tracking-widest',
        styles[status]
      )}
    >
      {status}
    </span>
  )
}