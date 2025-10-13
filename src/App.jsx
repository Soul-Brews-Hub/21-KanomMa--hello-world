import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const animateCounter = useCallback((callback) => {
    setIsAnimating(true)
    callback()
    setTimeout(() => setIsAnimating(false), 200)
  }, [])

  const increment = useCallback(() => {
    animateCounter(() => setCount(prev => prev + 1))
  }, [animateCounter])

  const decrement = useCallback(() => {
    animateCounter(() => setCount(prev => Math.max(0, prev - 1)))
  }, [animateCounter])

  const reset = useCallback(() => {
    animateCounter(() => setCount(0))
  }, [animateCounter])

  
  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          increment()
          break
        case 'ArrowDown':
          event.preventDefault()
          decrement()
          break
        case 'r':
        case 'R':
          event.preventDefault()
          reset()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [increment, decrement, reset])

  return (
    <div className="app">
      <div className="counter-container">
        <h1 className="title">Counter App</h1>
        <div className="counter-display">
          <span className={`counter-value ${isAnimating ? 'animate' : ''}`}>{count}</span>
        </div>
        <div className="button-group">
          <button
            onClick={decrement}
            className="counter-button decrement"
            aria-label="Decrement counter"
          >
            −
          </button>
          <button
            onClick={reset}
            className="counter-button reset"
            aria-label="Reset counter"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="counter-button increment"
            aria-label="Increment counter"
          >
            +
          </button>
        </div>
        <div className="instructions">
          <p>Use the buttons or arrow keys to count</p>
          <p>Press <kbd>R</kbd> to reset</p>
        </div>
      </div>
    </div>
  )
}

export default App