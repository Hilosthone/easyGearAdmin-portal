'use client'

import { useState, useMemo } from 'react'
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  MoreVertical,
  UserMinus,
  UserCheck,
  Mail,
  MapPin,
  Calendar,
  Fingerprint,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const INITIAL_USERS = [
  {
    id: 'USR-001',
    name: 'Amina Yusuf',
    email: 'amina@example.com',
    role: 'Customer',
    status: 'Verified',
    joined: 'Oct 2025',
    location: 'Lagos',
  },
  {
    id: 'USR-002',
    name: 'Chidi Nike Store',
    email: 'vendor@nike.ng',
    role: 'Vendor',
    status: 'Verified',
    joined: 'Nov 2025',
    location: 'Abuja',
  },
  {
    id: 'USR-003',
    name: 'Olawale John',
    email: 'wale@hacker.com',
    role: 'Customer',
    status: 'Flagged',
    joined: 'Jan 2026',
    location: 'Ibadan',
  },
  {
    id: 'USR-004',
    name: 'Sarah Phillips',
    email: 'sarah.p@web.com',
    role: 'Customer',
    status: 'Unverified',
    joined: 'Dec 2025',
    location: 'Port Harcourt',
  },
  {
    id: 'USR-005',
    name: 'Electronics Hub Ltd',
    email: 'admin@ehub.ng',
    role: 'Vendor',
    status: 'Verified',
    joined: 'Sep 2025',
    location: 'Kano',
  },
]

export default function AdminUserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')

  // SEARCH & ROLE FILTER
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTab = activeTab === 'All' || u.role === activeTab

      return matchesSearch && matchesTab
    })
  }, [users, searchQuery, activeTab])

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === 'Suspended' ? 'Verified' : 'Suspended',
          }
        }
        return u
      })
    )
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic'>
            Account Registry
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]'>
            Access Control & User Governance
          </p>
        </div>

        <div className='flex bg-white border-4 border-slate-100 p-1.5 rounded-2xl shadow-sm'>
          {['All', 'Customer', 'Vendor'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-6 py-2.5 rounded-xl text-xs font-black transition-all',
                activeTab === tab
                  ? 'bg-brand-blue text-white shadow-lg'
                  : 'text-slate-400 hover:text-brand-slate'
              )}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className='relative group'>
        <Search
          className='absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue'
          size={20}
          strokeWidth={3}
        />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search by name, email, or digital signature...'
          className='w-full pl-16 pr-8 py-5 bg-white border-4 border-slate-100 rounded-4xl outline-none font-bold focus:border-brand-blue transition-all'
        />
      </div>

      {/* User Cards Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className='bg-white border-4 border-slate-100 rounded-[2.5rem] p-8 hover:border-brand-blue/20 transition-all group relative overflow-hidden'
          >
            <div className='flex items-start justify-between relative z-10'>
              <div className='flex gap-5'>
                <div className='w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-slate-100 group-hover:bg-brand-blue transition-colors'>
                  <Fingerprint
                    size={32}
                    className='text-slate-300 group-hover:text-white'
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-xl font-black text-brand-slate'>
                      {user.name}
                    </h3>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border',
                        user.role === 'Vendor'
                          ? 'bg-purple-50 text-purple-600 border-purple-100'
                          : 'bg-blue-50 text-brand-blue border-blue-100'
                      )}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className='text-slate-400 font-bold text-sm flex items-center gap-1'>
                    <Mail size={12} /> {user.email}
                  </p>
                </div>
              </div>
              <button className='p-2 hover:bg-slate-50 rounded-xl text-slate-300'>
                <MoreVertical size={20} />
              </button>
            </div>

            <div className='grid grid-cols-3 gap-4 mt-8 pt-6 border-t-2 border-slate-50'>
              <div className='space-y-1'>
                <p className='text-[10px] font-black text-slate-300 uppercase tracking-widest'>
                  Status
                </p>
                <div className='flex items-center gap-1.5'>
                  {user.status === 'Verified' ? (
                    <ShieldCheck size={14} className='text-emerald-500' />
                  ) : (
                    <ShieldAlert size={14} className='text-brand-orange' />
                  )}
                  <span className='text-xs font-black text-brand-slate'>
                    {user.status}
                  </span>
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-[10px] font-black text-slate-300 uppercase tracking-widest'>
                  Location
                </p>
                <p className='text-xs font-black text-brand-slate flex items-center gap-1'>
                  <MapPin size={12} className='text-slate-400' />{' '}
                  {user.location}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-[10px] font-black text-slate-300 uppercase tracking-widest'>
                  Registry
                </p>
                <p className='text-xs font-black text-brand-slate flex items-center gap-1'>
                  <Calendar size={12} className='text-slate-400' />{' '}
                  {user.joined}
                </p>
              </div>
            </div>

            <div className='mt-8 flex gap-3'>
              <button
                onClick={() => toggleStatus(user.id)}
                className={cn(
                  'flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all',
                  user.status === 'Suspended'
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                    : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                )}
              >
                {user.status === 'Suspended' ? (
                  <UserCheck size={16} />
                ) : (
                  <UserMinus size={16} />
                )}
                {user.status === 'Suspended' ? 'Unsuspend' : 'Suspend Access'}
              </button>
              <button className='px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue transition-colors'>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}