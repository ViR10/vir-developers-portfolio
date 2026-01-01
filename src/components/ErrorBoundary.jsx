import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // Also log to console
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ color: '#ff6b6b' }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fff', background: '#111', padding: 16, borderRadius: 8 }}>
            {this.state.error && this.state.error.toString()}
            {this.state.info && this.state.info.componentStack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
