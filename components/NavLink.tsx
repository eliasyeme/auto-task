'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  className,
  ...params
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const path = usePathname()
  const isActive = href === path

  return (
    <Link
      href={href}
      className={clsx(isActive && 'underline', className)}
      {...params}
    />
  )
}
