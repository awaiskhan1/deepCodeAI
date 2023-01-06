import { useEffect, useRef, useState } from "react"

export const Typing = ({ text, onFinish, delay = 40 }) => {
    const to = useRef()
    const [charIndex, setCharIndex] = useState(1)
  
    useEffect(() => {
      if(charIndex < text.length) {
        to.current = setTimeout(() => setCharIndex(charIndex + 1), delay)
      } else {
        onFinish()
      }
      return () => clearTimeout(to.current) // cleanup on unmount
    }, [charIndex])
  
    return text.substr(0, charIndex)
  }