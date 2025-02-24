import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Zap, LineChart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Track Your sBTC Portfolio
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Monitor your sBTC positions, manage deposits and withdrawals, and track your
          performance with our comprehensive portfolio dashboard.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/portfolio">
            <Button size="lg">
              Launch App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <a
            href="https://docs.stacks.co/docs/sbtc/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Use sBTC?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                100% Bitcoin Finality
              </h3>
              <p className="text-gray-600">
                Your sBTC is always backed 1:1 by real Bitcoin, secured by a
                decentralized network of signers.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Fast Deposits
              </h3>
              <p className="text-gray-600">
                Convert your BTC to sBTC in as little as one Bitcoin block,
                enabling quick access to DeFi opportunities.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                DeFi Integration
              </h3>
              <p className="text-gray-600">
                Use your sBTC in various DeFi protocols on the Stacks blockchain
                while maintaining Bitcoin's security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Join the growing community of sBTC users and start exploring the
            possibilities of Bitcoin DeFi today.
          </p>
          <Link href="/portfolio">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Launch Portfolio Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://docs.stacks.co/docs/sbtc/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/stacks-network/sbtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.stacks.co/explore/sbtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Learn More
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://discord.gg/stacks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/Stacks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://forum.stacks.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>© {new Date().getFullYear()} sBTC Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
