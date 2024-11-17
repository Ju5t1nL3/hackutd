// App.js
import React from 'react';
import './page.css';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="title">Internvine</h1>
        <button className="sign-in-btn">Sign in</button>
      </nav>

      <main className="subtitle">
        <div className="info-section">
          <h2 className="who-we-are">For College Students</h2>
          <div className="wavy-lines">
          <h3 className="by-who">By College Students</h3>
          </div>
        </div>

        <button className="get-started-btn">
          Get Started
        </button>


      </main>
    </div>
  );
}

export default App;