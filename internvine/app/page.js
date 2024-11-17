// App.js
import React from 'react';
import './page.css';
import Link from 'next/link'

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="title">ResuMate</h1>
        <Link href = "/auth">
          <button className="sign-in-btn">Sign in</button>
        </Link>
      </nav>

      <main className="subtitle">
        <div className="info-section">
          <h2 className="for-who">For College Students,</h2><h3 className= "by-who">by College Students</h3>
        </div>
        <div>
          <p className= "blurb"> Blah Blah Blah</p>
         </div> 
        <Link href = "/auth/signup">
          <button className="get-started-btn">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
}

export default App;