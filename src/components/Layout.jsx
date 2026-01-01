import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      {/* spacer to offset fixed header height */}
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  )
}
