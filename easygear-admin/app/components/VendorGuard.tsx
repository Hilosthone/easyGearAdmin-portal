'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VendorGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      router.replace('/login')
      return
    }

    const user = JSON.parse(savedUser)
    if (user.role === 'Vendor') {
      setAuthorized(true)
    } else {
      router.replace('/admin') // Redirect Admins to Admin area
    }
  }, [router])

  if (!authorized) return null
  return <>{children}</>
}
