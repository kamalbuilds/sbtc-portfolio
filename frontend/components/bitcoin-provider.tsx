import { createAppKit } from '@reown/appkit/react'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { bitcoin } from '@reown/appkit/networks'

// Configure AppKit
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || 'default_project_id'
const networks = [bitcoin]

const bitcoinAdapter = new BitcoinAdapter({
  projectId,
})

const metadata = {
  name: 'sBTC Portfolio',
  description: 'Track and manage your sBTC positions',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  icons: ['/logo.png'],
}

// Initialize AppKit
createAppKit({
  adapters: [bitcoinAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
})

interface BitcoinProviderProps {
  children: React.ReactNode
}

export function BitcoinProvider({ children }: BitcoinProviderProps) {
  return <>{children}</>
} 