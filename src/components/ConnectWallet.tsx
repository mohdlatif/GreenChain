import { useState, useEffect, useRef } from 'react'
import freighterApi from '@stellar/freighter-api'

export default function AccountButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    checkConnection()
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const checkConnection = async () => {
    const { isConnected } = await freighterApi.isConnected()

    if (isConnected) {
      const { isAllowed } = await freighterApi.isAllowed()

      if (isAllowed && publicKey !== null) {
        const { address } = await freighterApi.getAddress()
        setPublicKey(address)
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    } else {
      setIsConnected(false)
    }
  }

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        console.log('Connecting to Freighter...')
        const { isConnected } = await freighterApi.isConnected()
        if (!isConnected) {
          console.error('Freighter is not installed')

          return
        }

        const { address } = await freighterApi.requestAccess()
        setPublicKey(address)
        setIsConnected(true)
      } catch (e) {
        console.error('Error connecting wallet:', e)
      }
    }
  }

  const handleLogout = () => {
    // Your logout logic here

    const signOutButton = document.querySelector('#sign-out') as HTMLElement
    if (signOutButton) {
      signOutButton.click()
    }

    setIsConnected(false)
    setPublicKey('')
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn-sm group relative w-full text-slate-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30 hover:text-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="relative">Account</span>
        <span
          className={`relative ml-2 size-2 rounded-full transition-transform duration-150 ease-in-out group-hover:translate-x-0.5 ${
            isConnected ? 'bg-green-300/80' : 'bg-red-300/80'
          }`}
        ></span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md bg-[#1614174d] shadow-lg backdrop-blur-sm">
          <ul className="w-full space-y-2 p-2 text-sm font-medium text-slate-300 transition duration-150 ease-in-out">
            <li className="w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white">
              <a className="block" href="/sign-in">
                Login
              </a>
            </li>

            <li className="w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white">
              <a className="block" href="/sign-up">
                Signup
              </a>
            </li>
            <button
              className="w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
            <hr className="border-slate-600" />
            <button
              id="wallet-button"
              className="w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white"
              onClick={isConnected ? undefined : handleConnect}
            >
              {isConnected
                ? `Connected: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
                : 'Connect Wallet'}
            </button>
          </ul>
        </div>
      )}
    </div>
  )
}
