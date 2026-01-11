//amin/layout
'use client'

import { useState } from 'react'
import AdminGuard from '../components/AdminGuard'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Real state management for mobile responsiveness
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <AdminGuard>
      <div className='flex min-h-screen bg-zinc-50'>
        {/* Sidebar controlled by isSidebarOpen */}
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className='flex-1 flex flex-col min-w-0'>
          {/* Header provides the toggle button for the Sidebar */}
          <AdminHeader setIsOpen={setIsSidebarOpen} />

          {/* Main Content Area */}
          <main className='flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar'>
            <div className='max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}