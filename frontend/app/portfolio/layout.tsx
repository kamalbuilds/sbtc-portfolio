'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Wallet, Menu, X } from 'lucide-react'
import { shortenAddress } from '@/lib/utils'
import { useBitcoin } from '@/lib/hooks/use-bitcoin'

interface LayoutProps {
  children: React.ReactNode
}

export default function PortfolioLayout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { address, isConnected } = useBitcoin()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                sBTC Portfolio
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  href="/portfolio"
                  className="text-gray-900 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Link
                  href="/portfolio/transactions"
                  className="text-gray-500 hover:text-blue-600"
                >
                  Transactions
                </Link>
                <Link
                  href="/portfolio/settings"
                  className="text-gray-500 hover:text-blue-600"
                >
                  Settings
                </Link>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="hidden md:flex md:items-center">
              {isConnected && address ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
                    <Wallet className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-mono text-sm">
                      {shortenAddress(address)}
                    </span>
                  </div>
                </div>
              ) : (
                <appkit-button />
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/portfolio"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                href="/portfolio/transactions"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Transactions
              </Link>
              <Link
                href="/portfolio/settings"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Settings
              </Link>
              {isConnected && address ? (
                <div className="border-t border-gray-200 px-3 py-3">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-mono text-sm">
                      {shortenAddress(address)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 px-3 py-3">
                  {/* @ts-expect-error - appkit-button is a web component */}
                  <appkit-button />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="py-6">
        {!isConnected ? (
          <div className="container mx-auto flex items-center justify-center px-4">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Connect your Bitcoin wallet to view your portfolio
              </h2>
              {/* @ts-expect-error - appkit-button is a web component */}
              <appkit-button />
            </div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  )
} 