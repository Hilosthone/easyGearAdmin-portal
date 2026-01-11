'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Ticket,
  MessageSquare,
  AlertCircle,
  Clock,
  Search,
  Send,
  User,
  ChevronRight,
  Filter,
  ShieldCheck,
  MoreVertical,
  Paperclip,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const TICKETS = [
  {
    id: 'TKT-108',
    user: 'Sarah Jenkins',
    subject: 'Counterfeit gear report',
    priority: 'Critical',
    status: 'Open',
    time: '5 mins ago',
    messages: [
      {
        sender: 'Sarah Jenkins',
        text: "I received the 'North Face' jacket I ordered, but the stitching is off and the logo is printed, not embroidered. I believe this is a counterfeit item.",
        time: '10:45 AM',
        isStaff: false,
      },
      {
        sender: 'easyGear Bot',
        text: 'Critical Alert: Counterfeit reports are prioritized. A senior auditor has been assigned to your case.',
        time: '10:46 AM',
        isStaff: true,
      },
    ],
  },
  {
    id: 'TKT-102',
    user: 'Chidi Okeke',
    subject: 'Payment failed but debited',
    priority: 'High',
    status: 'Open',
    time: '12 mins ago',
    messages: [
      {
        sender: 'Chidi Okeke',
        text: "I tried to pay for the Nike Air Max but the app crashed. The money was deducted but order is 'Pending'.",
        time: '10:02 AM',
        isStaff: false,
      },
    ],
  },
  {
    id: 'TKT-105',
    user: 'Nike Official',
    subject: 'Store verification delay',
    priority: 'Medium',
    status: 'In Progress',
    time: '2 hours ago',
    messages: [
      {
        sender: 'Nike Official',
        text: "We uploaded our business permits 48 hours ago. When will the 'Verified' badge appear?",
        time: '08:00 AM',
        isStaff: false,
      },
    ],
  },
]

export default function AdminSupportPage() {
  const [selectedTicket, setSelectedTicket] = useState(TICKETS[0])
  const [reply, setReply] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [selectedTicket])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return

    // In a real app, you'd push to your DB here
    const newMessage = {
      sender: 'Admin (You)',
      text: reply,
      time: 'Just now',
      isStaff: true,
    }

    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
    })
    setReply('')
  }

  return (
    <div className='space-y-8 animate-in fade-in duration-700'>
      {/* Page Header */}
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='text-5xl font-black text-brand-slate tracking-tighter italic uppercase'>
            Support Command
          </h1>
          <p className='text-slate-400 font-black mt-2 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2'>
            <MessageSquare size={14} className='text-brand-blue' />
            Active Dispute Resolution Terminal
          </p>
        </div>
        <div className='flex gap-3'>
          <div className='bg-white border-4 border-slate-100 rounded-2xl px-6 py-3 flex items-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
            <span className='text-[10px] font-black uppercase text-brand-slate'>
              4 Staff Online
            </span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 h-187.5'>
        {/* Ticket List (Left Side) */}
        <div className='xl:col-span-1 bg-white border-4 border-slate-100 rounded-5xl overflow-hidden flex flex-col shadow-sm'>
          <div className='p-8 border-b-4 border-slate-50 space-y-4'>
            <div className='relative group'>
              <Search
                className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400'
                size={18}
                strokeWidth={3}
              />
              <input
                type='text'
                placeholder='Query Ticket ID or User...'
                className='w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none font-black text-xs focus:bg-white border-4 border-transparent focus:border-brand-blue transition-all uppercase tracking-widest'
              />
            </div>
            <div className='flex gap-2'>
              {['All', 'Open', 'Escalated'].map((f) => (
                <button
                  key={f}
                  className='px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:bg-brand-blue hover:text-white transition-all'
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className='flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-slate-50/50'>
            {TICKETS.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  'w-full text-left p-6 rounded-[2.5rem] border-4 transition-all group relative overflow-hidden',
                  selectedTicket.id === ticket.id
                    ? 'bg-brand-slate border-brand-slate shadow-2xl scale-[1.02] z-10'
                    : 'bg-white border-slate-100 hover:border-brand-blue/30'
                )}
              >
                <div className='flex justify-between items-start mb-3'>
                  <span
                    className={cn(
                      'text-[9px] font-black uppercase px-3 py-1 rounded-lg tracking-tighter',
                      selectedTicket.id === ticket.id
                        ? 'bg-white/10 text-white'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {ticket.id}
                  </span>
                  <PriorityIndicator
                    priority={ticket.priority}
                    isDark={selectedTicket.id === ticket.id}
                  />
                </div>
                <p
                  className={cn(
                    'font-black text-sm mb-2 line-clamp-1 uppercase tracking-tight',
                    selectedTicket.id === ticket.id
                      ? 'text-white'
                      : 'text-brand-slate'
                  )}
                >
                  {ticket.subject}
                </p>
                <div className='flex items-center justify-between'>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase',
                      selectedTicket.id === ticket.id
                        ? 'text-white/40'
                        : 'text-slate-400'
                    )}
                  >
                    {ticket.user}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-black italic',
                      selectedTicket.id === ticket.id
                        ? 'text-brand-orange'
                        : 'text-slate-300'
                    )}
                  >
                    {ticket.time}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation View (Right Side) */}
        <div className='xl:col-span-2 bg-white border-4 border-slate-100 rounded-[4rem] overflow-hidden flex flex-col shadow-2xl relative'>
          {/* Ticket Header */}
          <div className='p-10 border-b-4 border-slate-50 flex items-center justify-between bg-white z-10'>
            <div className='flex items-center gap-6'>
              <div className='w-16 h-16 rounded-3xl bg-brand-blue flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform'>
                <Ticket size={28} strokeWidth={3} />
              </div>
              <div>
                <div className='flex items-center gap-3'>
                  <h2 className='text-2xl font-black text-brand-slate uppercase tracking-tighter italic'>
                    {selectedTicket.subject}
                  </h2>
                  <span className='px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full uppercase border-2 border-emerald-100'>
                    {selectedTicket.status}
                  </span>
                </div>
                <p className='text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]'>
                  Protocol:{' '}
                  <span className='text-brand-blue underline cursor-pointer'>
                    {selectedTicket.user}
                  </span>{' '}
                  • Origin: Lagos, NG
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <button className='p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all'>
                <MoreVertical size={20} />
              </button>
              <button className='px-8 py-4 bg-brand-slate text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/10'>
                Resolve Ticket
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className='flex-1 overflow-y-auto p-12 space-y-8 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] background-size-[30px_30px] custom-scrollbar'
          >
            {selectedTicket.messages.map((msg, i) => (
              <Message
                key={i}
                isStaff={msg.isStaff}
                name={msg.sender}
                text={msg.text}
                time={msg.time}
              />
            ))}
          </div>

          {/* Reply Input */}
          <div className='p-10 bg-white border-t-4 border-slate-50'>
            <form
              onSubmit={handleSendMessage}
              className='flex gap-5 items-center'
            >
              <button
                type='button'
                className='p-5 bg-slate-50 text-slate-400 rounded-3xl hover:text-brand-blue transition-all'
              >
                <Paperclip size={24} />
              </button>
              <div className='flex-1 relative group'>
                <input
                  type='text'
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder='Enter command or official response...'
                  className='w-full pl-8 pr-20 py-6 bg-slate-50 border-4 border-transparent rounded-[2.5rem] outline-none font-bold text-brand-slate focus:border-brand-blue focus:bg-white transition-all shadow-inner'
                />
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-brand-blue text-white rounded-3xl hover:bg-brand-slate transition-all shadow-2xl shadow-brand-blue/30 active:scale-95'
                >
                  <Send size={24} strokeWidth={3} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function PriorityIndicator({
  priority,
  isDark,
}: {
  priority: string
  isDark: boolean
}) {
  const colors: any = {
    Critical: 'text-red-500',
    High: 'text-brand-orange',
    Medium: 'text-brand-blue',
    Low: 'text-emerald-500',
  }
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-black text-[10px] uppercase tracking-tighter',
        isDark ? 'text-white' : colors[priority]
      )}
    >
      <AlertCircle size={12} strokeWidth={4} />
      {priority}
    </div>
  )
}

function Message({ isStaff, name, text, time }: any) {
  return (
    <div
      className={cn(
        'flex flex-col max-w-[75%] animate-in slide-in-from-bottom-2 duration-300',
        isStaff ? 'ml-auto items-end' : 'mr-auto'
      )}
    >
      <p className='text-[9px] font-black text-slate-400 uppercase mb-3 px-4 tracking-widest'>
        {name} • {time}
      </p>
      <div
        className={cn(
          'p-8 rounded-[2.5rem] font-bold text-sm shadow-xl border-4 leading-relaxed',
          !isStaff
            ? 'bg-white border-slate-100 text-brand-slate rounded-tl-none'
            : 'bg-brand-blue text-white border-brand-blue rounded-tr-none shadow-brand-blue/20'
        )}
      >
        {text}
      </div>
      {isStaff && (
        <div className='flex items-center gap-1 mt-2 mr-4 text-emerald-500'>
          <ShieldCheck size={12} />
          <span className='text-[8px] font-black uppercase'>
            Official Response
          </span>
        </div>
      )}
    </div>
  )
}