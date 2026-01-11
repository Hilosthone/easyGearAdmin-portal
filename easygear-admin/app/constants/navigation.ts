// app/constants/navigation.ts

import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  Package,
  CreditCard,
  BarChart3,
  Ticket,
  Bell,
  Settings,
  Star,
  Tag,
  Wallet,
  PlusSquare,
  UserCog,
  LifeBuoy,
  UserCircle,
} from 'lucide-react'

export const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Vendors', href: '/admin/vendors', icon: Store },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Support', href: '/admin/support', icon: Ticket },
]

const VENDOR_LINKS = [
  { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { name: 'Add Gear', href: '/vendor/products/add', icon: PlusSquare }, // Primary Action
  { name: 'My Products', href: '/vendor/products', icon: Package }, // Inventory Hub
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
  { name: 'Earnings', href: '/vendor/earnings', icon: Wallet },
  { name: 'Reviews', href: '/vendor/reviews', icon: Star },
  { name: 'Promotions', href: '/vendor/promotions', icon: Tag },
  { name: 'Profile', href: '/vendor/profile', icon: UserCircle },
  { name: 'Support', href: '/vendor/support', icon: LifeBuoy },
]