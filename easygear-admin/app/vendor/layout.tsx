'use client'

import { useState } from 'react'
import VendorGuard from '../components/VendorGuard'
import VendorSidebar from '@/app/components/VendorSidebar'
import Header from '@/app/components/Header'

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <VendorGuard>
      <div className='flex min-h-screen bg-zinc-50'>
        {/* Protected Vendor Specific Sidebar */}
        <VendorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className='flex-1 flex flex-col min-w-0'>
          {/* Top Header - Controls sidebar toggle on mobile */}
          <Header setIsOpen={setIsSidebarOpen} role='vendor' />

          {/* Main Content Area */}
          <main className='p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar'>
            <div className='max-w-400 mx-auto'>{children}</div>
          </main>
        </div>
      </div>
    </VendorGuard>
  )
}
