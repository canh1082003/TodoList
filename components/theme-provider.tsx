"use client"
import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [dark])

  return (
    <>
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: 8,
          background: dark ? "#232323" : "#f1f1f1",
          color: dark ? "#f1f1f1" : "#232323",
          border: "1px solid #444",
          cursor: "pointer",
        }}
      >
        {dark ? "🌙 Dark" : "☀️ Light"}
      </button>
      {children}
    </>
  )
}