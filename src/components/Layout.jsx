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
<<<<<<< HEAD
      {/* spacer to offset fixed header height - but not on home page for full-screen hero */}
      <div className={isHomePage ? '' : 'pt-20'}>{children}</div>
=======
      {/* spacer to offset fixed header height */}
      <div className="pt-20">{children}</div>
      <AIChatbot />
>>>>>>> 7028622 (feat: complete transform into Enterprise AI Automation Agency with AI Assistant & CEO Executive Profile)
      <Footer />
    </div>
  )
}
