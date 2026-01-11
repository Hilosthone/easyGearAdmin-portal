'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // 1. Get the unified 'user' object you saved in LoginPage
    const savedUser = localStorage.getItem('user')

    if (!savedUser) {
      router.replace('/login')
      return
    }

    try {
      const user = JSON.parse(savedUser)

      // 2. Strict Role Check: Ensure only 'System Root' enters the Admin Layout
      if (user.role === 'System Root') {
        setAuthorized(true)
      } else {
        // If they are a Vendor trying to peek at Admin pages, send them to their own portal
        router.replace('/vendor')
      }
    } catch (error) {
      localStorage.removeItem('user')
      router.replace('/login')
    }
  }, [router])

  if (!authorized) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-white'>
        <div className='h-8 w-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin' />
      </div>
    )
  }

  return <>{children}</>
}
