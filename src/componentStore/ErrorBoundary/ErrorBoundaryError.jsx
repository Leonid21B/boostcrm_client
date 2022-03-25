import React, { Component } from 'react'
import ErrorBoundary from './ErrorBoundary'

export default class ErrorBoundaryError extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    console.log('error,info', error, info)
    this.setState({ hasError: true })
    console.log('componentDidCatch', true)
  }

  render () {
    if (this.state.hasError) {
      return <ErrorBoundary />
    } else {
      return this.props.children
    }
  }
}
