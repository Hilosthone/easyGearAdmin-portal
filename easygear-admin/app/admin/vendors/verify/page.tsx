'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  FileText,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Building2,
  Calendar,
  Fingerprint,
  TrendingUp,
  History,
  MapPin,
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

const PENDING_VENDORS = [
  {
    id: 'V-201',
    businessName: 'Tech Haven Nigeria',
    owner: 'Emeka Obi',
    type: 'Registered Company',
    docType: 'CAC Certificate',
    submittedAt: 'Jan 06, 2026',
    status: 'Pending',
    trustScore: 85,
    location: 'Lagos, NG',
  },
  {
    id: 'V-202',
    businessName: 'Zaza Fashion',
    owner: 'Zainab Ahmed',
    type: 'Sole Proprietor',
    docType: 'Government ID',
    submittedAt: 'Jan 07, 2026',
    status: 'Reviewing',
    trustScore: 42,
    location: 'Kano, NG',
  },
  {
    id: 'V-203',
    businessName: 'Peak Performance Gear',
    owner: 'Kofi Mensah',
    type: 'Registered Company',
    docType: 'CAC Certificate',
    submittedAt: 'Jan 07, 2026',
    status: 'Pending',
    trustScore: 92,
    location: 'Accra, GH',
  },
  {
    id: 'V-204',
    businessName: 'Urban Sole Sneakers',
    owner: 'Tunde Folawiyo',
    type: 'Partnership',
    docType: 'Business Permit',
    submittedAt: 'Jan 08, 2026',
    status: 'Pending',
    trustScore: 68,
    location: 'Abuja, NG',
  },
  {
    id: 'V-205',
    businessName: 'Delta Electronics',
    owner: 'Blessing Okoro',
    type: 'Registered Company',
    docType: 'Tax Identification',
    submittedAt: 'Jan 08, 2026',
    status: 'Reviewing',
    trustScore: 15,
    location: 'Warri, NG',
  },
  {
    id: 'V-206',
    businessName: 'Luxe Athletics',
    owner: 'Sarah Jenkins',
    type: 'Sole Proprietor',
    docType: 'International Passport',
    submittedAt: 'Jan 09, 2026',
    status: 'Pending',
    trustScore: 77,
    location: 'Port Harcourt, NG',
  },
]

export default function VendorVerification() {
  const [vendors, setVendors] = useState(PENDING_VENDORS)
  const [selectedVendor, setSelectedVendor] = useState<any>(null)

  // State for Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean
    type: 'Approved' | 'Rejected' | null
    vendorId: string | null
  }>({ show: false, type: null, vendorId: null })

  const handleAction = (id: string, newStatus: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id))
    setSelectedVendor(null)
    setConfirmModal({ show: false, type: null, vendorId: null })
  }

  return (
    <div className='relative space-y-8 pb-12'>
      {/* 1. CONFIRMATION OVERLAY */}
      {confirmModal.show && (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-6 bg-brand-slate/60 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='bg-white border-8 border-slate-100 rounded-5xl p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300'>
            <div
              className={cn(
                'w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto',
                confirmModal.type === 'Approved'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-600'
              )}
            >
              {confirmModal.type === 'Approved' ? (
                <ShieldCheck size={40} />
              ) : (
                <AlertCircle size={40} />
              )}
            </div>

            <h3 className='text-2xl font-black text-brand-slate text-center leading-tight'>
              {confirmModal.type === 'Approved'
                ? 'Confirm Verification?'
                : 'Reject Merchant?'}
            </h3>
            <p className='text-slate-400 font-bold text-center mt-3 text-sm'>
              {confirmModal.type === 'Approved'
                ? 'This will grant the vendor full access to list products and receive payments.'
                : 'The vendor will be notified of the rejection and restricted from the platform.'}
            </p>

            <div className='grid grid-cols-2 gap-4 mt-10'>
              <button
                onClick={() =>
                  setConfirmModal({ show: false, type: null, vendorId: null })
                }
                className='py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all'
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleAction(confirmModal.vendorId!, confirmModal.type!)
                }
                className={cn(
                  'py-4 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg',
                  confirmModal.type === 'Approved'
                    ? 'bg-emerald-600 shadow-emerald-200'
                    : 'bg-red-600 shadow-red-200'
                )}
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h1 className='text-4xl font-black text-brand-slate tracking-tight italic uppercase'>
            KYC Terminal
          </h1>
          <p className='text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]'>
            Merchant Identity & Business Verification
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:bg-slate-200 transition-colors'>
            <History size={14} /> Revision History
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* Left: Pending List (Span 4) */}
        <div className='lg:col-span-4 space-y-4 max-h-200 overflow-y-auto pr-2 custom-scrollbar'>
          <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-brand-orange animate-pulse' />
            Live Queue ({vendors.length})
          </h3>

          <div className='space-y-3'>
            {vendors.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => setSelectedVendor(vendor)}
                className={cn(
                  'w-full text-left p-6 bg-white border-4 rounded-[2.5rem] transition-all relative overflow-hidden group',
                  selectedVendor?.id === vendor.id
                    ? 'border-brand-blue shadow-xl shadow-blue-900/10 -translate-y-1'
                    : 'border-slate-100 hover:border-slate-200 shadow-sm'
                )}
              >
                {selectedVendor?.id === vendor.id && (
                  <div className='absolute top-0 left-0 w-2 h-full bg-brand-blue' />
                )}
                <div className='flex justify-between items-start mb-4'>
                  <div
                    className={cn(
                      'p-3 rounded-2xl transition-colors',
                      selectedVendor?.id === vendor.id
                        ? 'bg-brand-blue text-white'
                        : 'bg-slate-50 text-brand-slate'
                    )}
                  >
                    <Building2 size={20} />
                  </div>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border-2',
                      vendor.status === 'Reviewing'
                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                        : 'bg-blue-50 text-brand-blue border-blue-100'
                    )}
                  >
                    {vendor.status}
                  </span>
                </div>
                <h4 className='font-black text-brand-slate text-lg leading-tight group-hover:text-brand-blue transition-colors'>
                  {vendor.businessName}
                </h4>
                <div className='flex items-center gap-1 mt-1'>
                  <MapPin size={10} className='text-slate-300' />
                  <p className='text-[10px] font-bold text-slate-400 uppercase tracking-tight'>
                    {vendor.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detailed Review Area (Span 8) */}
        <div className='lg:col-span-8'>
          {selectedVendor ? (
            <div className='bg-white border-4 border-slate-100 rounded-[3.5rem] p-8 md:p-12 shadow-sm animate-in zoom-in-95 duration-300'>
              {/* Review Header */}
              <div className='flex flex-col md:flex-row justify-between items-start gap-6 mb-12'>
                <div className='flex gap-6'>
                  <div className='w-24 h-24 bg-brand-slate rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-brand-slate/20'>
                    <Fingerprint size={48} strokeWidth={1} />
                  </div>
                  <div>
                    <h2 className='text-3xl font-black text-brand-slate tracking-tighter'>
                      {selectedVendor.businessName}
                    </h2>
                    <div className='flex flex-wrap items-center gap-3 mt-2'>
                      <p className='text-slate-400 font-bold text-sm'>
                        Owner: {selectedVendor.owner}
                      </p>
                      <div className='w-1.5 h-1.5 rounded-full bg-slate-200' />
                      <p className='text-slate-400 font-bold text-sm uppercase tracking-tighter'>
                        {selectedVendor.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 min-w-32 text-center'>
                  <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>
                    Trust Score
                  </p>
                  <div className='flex items-center justify-center gap-2'>
                    <TrendingUp
                      size={16}
                      className={
                        selectedVendor.trustScore > 70
                          ? 'text-emerald-500'
                          : 'text-brand-orange'
                      }
                    />
                    <span
                      className={cn(
                        'text-2xl font-black',
                        selectedVendor.trustScore > 70
                          ? 'text-emerald-600'
                          : 'text-brand-orange'
                      )}
                    >
                      {selectedVendor.trustScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Section */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
                <div className='space-y-4'>
                  <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest ml-2'>
                    Primary Attachment
                  </h3>
                  <div className='aspect-square bg-slate-50 border-4 border-dashed border-slate-200 rounded-5xl flex flex-col items-center justify-center group hover:bg-slate-100 hover:border-brand-blue/30 transition-all cursor-pointer relative overflow-hidden'>
                    <FileText
                      size={64}
                      className='text-slate-200 mb-4 group-hover:scale-110 transition-transform duration-500'
                    />
                    <p className='font-black text-slate-500 group-hover:text-brand-blue'>
                      {selectedVendor.docType}.pdf
                    </p>
                    <button className='mt-6 flex items-center gap-2 text-[10px] font-black text-white uppercase bg-brand-slate px-6 py-3 rounded-2xl shadow-xl hover:bg-brand-blue transition-colors'>
                      <ExternalLink size={14} /> Preview Doc
                    </button>
                  </div>
                </div>

                <div className='flex flex-col justify-center gap-6'>
                  <div className='p-6 bg-blue-50 border-2 border-blue-100 rounded-[2.5rem]'>
                    <div className='flex gap-3 mb-2'>
                      <AlertCircle
                        size={20}
                        className='text-brand-blue shrink-0'
                      />
                      <p className='text-xs font-black text-brand-blue uppercase tracking-widest'>
                        Verification Guide
                      </p>
                    </div>
                    <p className='text-xs font-bold text-brand-blue/70 leading-relaxed'>
                      Ensure the registration number matches the government
                      database. Check that the signature is legible and matching
                      the owner profile.
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='p-4 bg-slate-50 rounded-2xl border-2 border-slate-100'>
                      <p className='text-[10px] font-black text-slate-400 uppercase mb-1'>
                        Submitted
                      </p>
                      <p className='text-sm font-black text-brand-slate'>
                        {selectedVendor.submittedAt}
                      </p>
                    </div>
                    <div className='p-4 bg-slate-50 rounded-2xl border-2 border-slate-100'>
                      <p className='text-[10px] font-black text-slate-400 uppercase mb-1'>
                        Ref Code
                      </p>
                      <p className='text-sm font-black text-brand-slate'>
                        KYC-{selectedVendor.id.split('-')[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={() =>
                    setConfirmModal({
                      show: true,
                      type: 'Rejected',
                      vendorId: selectedVendor.id,
                    })
                  }
                  className='flex-1 py-6 bg-red-50 text-red-600 rounded-4xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 group'
                >
                  <X
                    size={20}
                    strokeWidth={3}
                    className='group-hover:rotate-90 transition-transform'
                  />
                  Reject Application
                </button>
                <button
                  onClick={() =>
                    setConfirmModal({
                      show: true,
                      type: 'Approved',
                      vendorId: selectedVendor.id,
                    })
                  }
                  className='flex-[1.5] py-6 bg-emerald-50 text-emerald-600 rounded-4xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border-4 border-emerald-100 shadow-xl shadow-emerald-900/10 group'
                >
                  <Check
                    size={20}
                    strokeWidth={3}
                    className='group-hover:scale-125 transition-transform'
                  />
                  Confirm & Verify
                </button>
              </div>
            </div>
          ) : (
            <div className='h-full min-h-150 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[4rem] flex flex-col items-center justify-center text-center p-12'>
              <div className='w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6'>
                <ShieldCheck size={48} className='text-slate-200' />
              </div>
              <h3 className='text-2xl font-black text-brand-slate italic'>
                Awaiting Selection
              </h3>
              <p className='text-slate-400 font-bold max-w-sm mt-3 leading-relaxed'>
                Select a merchant from the live queue to begin the security
                audit and business verification process.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}