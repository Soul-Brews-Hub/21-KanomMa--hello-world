import React, { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(1)
  const [emojisEnabled, setEmojisEnabled] = useState(true)
  const [activeEmojis, setActiveEmojis] = useState([])
  const emojiContainerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  // Emoji sets
  const emojiSets = {
    celebration: ['🎉', '🎊', '✨', '🎈', '🎁', '🎆', '🥳', '🎉', '🎊', '🎉'],
    nature: ['🌟', '⭐', '🌈', '🌸', '🦋', '🌟', '⭐', '🌈', '🌟', '⭐'],
    fun: ['🎮', '🎯', '🎪', '🎨', '🎭', '🎮', '🎯', '🎪', '🎮', '🎯'],
    minimal: ['⚡', '💫', '🔥', '✨', '🌟', '⚡', '💫', '🔥', '✨', '🌟']
  }

  // Animation types
  const animationTypes = ['float', 'bounce', 'rotate', 'pulse', 'spiral']

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Update CSS custom property for parallax effects
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const animateCounter = useCallback((callback) => {
    setIsAnimating(true)
    setPulseIntensity(1.3)
    callback()
    setTimeout(() => {
      setIsAnimating(false)
      setPulseIntensity(1)
    }, 200)
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

  // Emoji management functions
  const createEmoji = useCallback(() => {
    if (!emojisEnabled || !emojiContainerRef.current) return null

    const emojiSetsList = Object.values(emojiSets)
    const randomSet = emojiSetsList[Math.floor(Math.random() * emojiSetsList.length)]
    const emoji = randomSet[Math.floor(Math.random() * randomSet.length)]
    const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)]

    const emojiData = {
      id: Date.now() + Math.random(),
      emoji,
      animationType,
      left: Math.random() * 100,
      size: 0.8 + Math.random() * 0.8, // 0.8x to 1.6x base size
      duration: 0.7 + Math.random() * 0.6, // 0.7x to 1.3x base duration
      opacity: 0.5 + Math.random() * 0.4 // 0.5 to 0.9 opacity
    }

    return emojiData
  }, [emojisEnabled, emojiSets, animationTypes])

  const spawnEmoji = useCallback(() => {
    const emojiData = createEmoji()
    if (emojiData) {
      setActiveEmojis(prev => {
        const newEmojis = [...prev, emojiData]
        // Limit emoji count based on CSS variable
        const maxEmojis = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--emoji-max-count')) || 25
        return newEmojis.slice(-maxEmojis)
      })
    }
  }, [createEmoji])

  const spawnEmojiBurst = useCallback((count = 5) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnEmoji(), i * 100) // Spawn with delay
    }
  }, [spawnEmoji])

  const removeEmoji = useCallback((emojiId) => {
    setActiveEmojis(prev => prev.filter(emoji => emoji.id !== emojiId))
  }, [])

  const toggleEmojis = useCallback(() => {
    setEmojisEnabled(prev => !prev)
  }, [])

  
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
        case 'e':
        case 'E':
          event.preventDefault()
          toggleEmojis()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [increment, decrement, reset, toggleEmojis])

  // Continuous emoji generation
  useEffect(() => {
    if (!emojisEnabled) return

    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to spawn emoji each interval
        spawnEmoji()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [emojisEnabled, spawnEmoji])

  // Emoji cleanup - remove old emojis
  useEffect(() => {
    if (activeEmojis.length === 0) return

    const cleanup = setInterval(() => {
      const now = Date.now()
      setActiveEmojis(prev => {
        // Remove emojis older than 30 seconds
        return prev.filter(emoji => now - emoji.id < 30000)
      })
    }, 5000)

    return () => clearInterval(cleanup)
  }, [activeEmojis.length])

  // Interactive emoji spawning on counter changes
  useEffect(() => {
    if (!emojisEnabled) return

    // Spawn emoji burst when counter changes
    spawnEmojiBurst(3)
  }, [count, emojisEnabled, spawnEmojiBurst])

  // Update animateCounter to trigger emojis
  const enhancedAnimateCounter = useCallback((callback) => {
    setIsAnimating(true)
    setPulseIntensity(1.3)
    callback()
    setTimeout(() => {
      setIsAnimating(false)
      setPulseIntensity(1)
    }, 200)
  }, [])

  // Update counter functions to use enhanced version
  const enhancedIncrement = useCallback(() => {
    enhancedAnimateCounter(() => setCount(prev => prev + 1))
  }, [enhancedAnimateCounter])

  const enhancedDecrement = useCallback(() => {
    enhancedAnimateCounter(() => setCount(prev => Math.max(0, prev - 1)))
  }, [enhancedAnimateCounter])

  const enhancedReset = useCallback(() => {
    enhancedAnimateCounter(() => setCount(0))
  }, [enhancedAnimateCounter])

  return (
    <div className="app">
      <div className="background-animation">
        {/* Parallax Layers */}
        <div className="parallax-layer-1"></div>
        <div className="parallax-layer-2"></div>
        <div className="parallax-layer-3"></div>
        <div className="parallax-layer-4"></div>

        {/* Geometric Patterns */}
        <div className="geometric-pattern">
          <div className="geometric-shape geometric-shape-1"></div>
          <div className="geometric-shape geometric-shape-2"></div>
          <div className="geometric-shape geometric-shape-3"></div>
          <div className="geometric-shape geometric-shape-4"></div>
        </div>

        {/* Architectural Grid Overlay */}
        <div className="architectural-overlay"></div>

        <div className={`particle-field ${isAnimating ? 'pulse' : ''}`}></div>
        <div className="emoji-background" aria-hidden="true">
          <div className="emoji-container" ref={emojiContainerRef}>
            {activeEmojis.map(emoji => (
              <div
                key={emoji.id}
                className={`emoji emoji-${emoji.animationType}`}
                style={{
                  left: `${emoji.left}%`,
                  fontSize: `${emoji.size}rem`,
                  opacity: emoji.opacity,
                  animationDuration: `${emoji.duration * (emoji.animationType === 'float' ? 8 : emoji.animationType === 'bounce' ? 3 : emoji.animationType === 'rotate' ? 12 : emoji.animationType === 'pulse' ? 4 : 15)}s`
                }}
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="counter-container">
        <h1 className="title">Counter</h1>
        <div className="counter-display">
          <span className={`counter-value ${isAnimating ? 'animate' : ''}`}>{count}</span>
        </div>
        <div className="button-group">
          <button
            onClick={enhancedDecrement}
            className="counter-button decrement"
            aria-label="Decrement counter"
          >
            −
          </button>
          <button
            onClick={enhancedReset}
            className="counter-button reset"
            aria-label="Reset counter"
          >
            Reset
          </button>
          <button
            onClick={enhancedIncrement}
            className="counter-button increment"
            aria-label="Increment counter"
          >
            +
          </button>
        </div>
        <div className="instructions">
          <p>Use the buttons or arrow keys to count</p>
          <p>Press <kbd>R</kbd> to reset, <kbd>E</kbd> to toggle emojis {emojisEnabled ? '🔛' : '🔜'}</p>
        </div>
      </div>
    </div>
  )
}

export default App