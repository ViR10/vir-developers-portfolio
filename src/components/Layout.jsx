import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AIChatbot from './AIChatbot'

export default function Layout({ children }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      {/* spacer to offset fixed header height - but not on home page for full-screen hero */}
      <div className={isHomePage ? '' : 'pt-20'}>{children}</div>
      <AIChatbot />
      <Footer />
    </div>
  )
}
