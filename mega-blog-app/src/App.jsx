import React from 'react'
import './App.css'

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
      <h1>Blog App With AppWrite</h1>
    </>
  )
}

export default App