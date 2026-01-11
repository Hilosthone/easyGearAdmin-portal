'use client'

import { useState, useEffect } from 'react'
import {
  CheckCircle,
  XCircle,
  Store,
  AlertCircle,
  Search,
  Filter,
  Package,
  ArrowUpRight,
  ShieldAlert,
  BadgeCheck,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function VendorManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  ) // Toggle for each row

  // 1. Fetch vendors (Ensure your PHP script SELECTs the password column)
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(
          'http://localhost/easygear-api/v1/admin/get_vendors.php'
        )
        const result = await response.json()
        if (result.status === 'success') {
          setVendors(result.data)
        }
      } catch (error) {
        console.error('API Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVendors()
  }, [])

  const togglePassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      const response = await fetch(
        'http://localhost/easygear-api/v1/admin/update_vendor_status.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status: newStatus }),
        }
      )
      const result = await response.json()
      if (result.status === 'success') {
        setVendors((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
        )
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to connect to server.')
    } finally {
      setUpdatingId(null)
    }
  }

  const pendingCount = vendors.filter((v) => v.status === 'Pending').length
  const approvedCount = vendors.filter((v) => v.status === 'Approved').length

  return (
    <div className='max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700'>
      {/* Header Section */}
      <div className='flex flex-col xl:flex-row xl:items-end justify-between gap-6'>
        <div>
          <h1 className='text-5xl font-black text-slate-900 tracking-tighter italic uppercase'>
            Vendor Command
          </h1>
          <p className='text-slate-400 font-black mt-2 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2'>
            <Store size={14} className='text-blue-600' />
            Merchant Ecosystem & Global Compliance
          </p>
        </div>

        <div className='flex flex-wrap gap-4'>
          <div className='relative group'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600'
              size={18}
              strokeWidth={3}
            />
            <input
              type='text'
              placeholder='Filter by Store or ID...'
              className='pl-12 pr-6 py-4 bg-white border-4 border-slate-100 rounded-2xl outline-none font-black text-xs uppercase tracking-widest focus:border-blue-600 transition-all w-full md:w-80 shadow-sm'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className='p-4 bg-white border-4 border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm'>
            <Filter size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          label='Pending Approval'
          value={pendingCount.toString().padStart(2, '0')}
          color='orange'
          icon={<AlertCircle />}
        />
        <StatCard
          label='Verified Merchants'
          value={approvedCount.toString().padStart(2, '0')}
          color='blue'
          icon={<BadgeCheck />}
        />
        <StatCard
          label='Risk Flags'
          value='00'
          color='red'
          icon={<ShieldAlert />}
        />
        <StatCard
          label='Total Entities'
          value={vendors.length.toString()}
          color='slate'
          icon={<Package />}
        />
      </div>

      {/* Vendors Table */}
      <div className='bg-white border-4 border-slate-100 rounded-5xl shadow-2xl overflow-hidden'>
        <div className='overflow-x-auto'>
          {loading ? (
            <div className='flex flex-col items-center justify-center p-24 gap-4'>
              <Loader2 className='animate-spin text-blue-600' size={40} />
              <p className='font-black text-xs uppercase tracking-[0.3em] text-slate-400'>
                Synchronizing Database...
              </p>
            </div>
          ) : (
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50/50 border-b-4 border-slate-100'>
                  <th className='px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
                    Store Hierarchy
                  </th>
                  <th className='px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
                    Access Credentials
                  </th>
                  <th className='px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
                    Compliance
                  </th>
                  <th className='px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right'>
                    Action Node
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y-4 divide-slate-50'>
                {vendors
                  .filter((v) =>
                    v.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((vendor) => (
                    <tr
                      key={vendor.id}
                      className='hover:bg-slate-50/80 transition-all group'
                    >
                      <td className='px-10 py-8'>
                        <div className='flex items-center gap-5'>
                          <div className='w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                            <Store size={24} />
                          </div>
                          <div>
                            <p className='font-black text-slate-900 text-lg tracking-tighter uppercase leading-none'>
                              {vendor.name}
                            </p>
                            <p className='text-[9px] font-black text-slate-300 mt-1 uppercase tracking-widest'>
                              ID: V-{vendor.id} • {vendor.owner}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Password Column */}
                      <td className='px-10 py-8'>
                        <div className='flex flex-col gap-1'>
                          <div className='flex items-center gap-2 text-slate-400'>
                            <KeyRound size={12} />
                            <span className='font-mono text-[10px] font-bold'>
                              {showPasswords[vendor.id]
                                ? vendor.password
                                : '••••••••••••'}
                            </span>
                            <button
                              onClick={() => togglePassword(vendor.id)}
                              className='hover:text-blue-600'
                            >
                              {showPasswords[vendor.id] ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                            </button>
                          </div>
                          <p className='text-[10px] font-bold text-slate-600'>
                            {vendor.email}
                          </p>
                        </div>
                      </td>

                      <td className='px-10 py-8'>
                        <StatusBadge status={vendor.status || 'Pending'} />
                      </td>

                      <td className='px-10 py-8'>
                        <div className='flex items-center justify-end gap-3'>
                          {updatingId === vendor.id ? (
                            <Loader2
                              className='animate-spin text-slate-300'
                              size={24}
                            />
                          ) : vendor.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(vendor.id, 'Approved')
                                }
                                className='p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border-2 border-emerald-100'
                              >
                                <CheckCircle size={20} strokeWidth={3} />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(vendor.id, 'Flagged')
                                }
                                className='p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all border-2 border-red-100'
                              >
                                <XCircle size={20} strokeWidth={3} />
                              </button>
                            </>
                          ) : (
                            <button className='flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-600/10'>
                              Internal View <ArrowUpRight size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

// ... Keep your StatCard and StatusBadge functions exactly as they were ...
function StatCard({ label, value, color, icon }: any) {
  const colors: any = {
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    red: 'bg-red-50 border-red-100 text-red-600',
    slate: 'bg-slate-50 border-slate-100 text-slate-900',
  }
  return (
    <div
      className={cn(
        'border-4 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm transition-transform hover:scale-[1.02]',
        colors[color]
      )}
    >
      <div
        className={cn(
          'p-4 rounded-2xl text-white shadow-lg',
          color === 'orange'
            ? 'bg-orange-500'
            : color === 'blue'
            ? 'bg-blue-600'
            : color === 'red'
            ? 'bg-red-500'
            : 'bg-slate-900'
        )}
      >
        {icon}
      </div>
      <div>
        <p className='text-[10px] font-black uppercase tracking-[0.2em] opacity-70'>
          {label}
        </p>
        <p className='text-3xl font-black tracking-tighter mt-1'>{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Flagged: 'bg-red-50 text-red-600 border-red-100 animate-pulse',
    Suspended: 'bg-slate-100 text-slate-400 border-slate-200',
  }
  return (
    <span
      className={cn(
        'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2',
        styles[status]
      )}
    >
      {status}
    </span>
  )
}