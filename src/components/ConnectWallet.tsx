import { useState, useEffect, useRef } from 'react'
import { $userStore } from '@clerk/astro/client'
import { useSyncExternalStore } from 'react'
import freighterApi from '@stellar/freighter-api'

// export default function AccountButton()

export const AccountButton = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    checkConnection()
    checkSessionCookie()
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const checkSessionCookie = () => {
    // Check for the existence of a session cookie
    // This is a simple example; you might need to adjust based on your actual cookie name
    const sessionCookie = document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('__session'))
    setIsLoggedIn(sessionCookie)
  }

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
        console.log('Freighter is installed...')
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
    const signOutButton = document.querySelector('#sign-out') as HTMLElement
    if (signOutButton) {
      signOutButton.click()
    }
    // could not find a way to signout from wallet
    // https://github.com/stellar/freighter/issues/943
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

  const user = useSyncExternalStore(
    $userStore.listen,
    $userStore.get,
    $userStore.get,
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn-sm group relative min-h-[31.6px] w-full min-w-[82.1667px] text-slate-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30 hover:text-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="relative">
          {isLoggedIn ? user?.firstName : 'Account'}
        </span>
        <span
          className={`relative ml-2 size-2 rounded-full transition-transform duration-150 ease-in-out group-hover:translate-x-0.5 ${
            isConnected ? 'bg-green-300/80' : 'bg-red-300/80'
          }`}
        ></span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md bg-[#1614174d] shadow-lg backdrop-blur-sm">
          <ul className="w-full space-y-2 p-2 text-sm font-medium text-slate-300 transition duration-150 ease-in-out">
            {!isLoggedIn && (
              <>
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
              </>
            )}
            {isLoggedIn && (
              <>
                <a
                  href="/dashboard"
                  className="block w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white"
                >
                  Dashboard
                </a>

                <a
                  href="/log-action"
                  className="block w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white"
                >
                  Log Action
                </a>
                <button
                  className="w-full rounded p-2 text-left hover:bg-purple-600/30 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
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
