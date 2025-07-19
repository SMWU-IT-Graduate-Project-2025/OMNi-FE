import React, { useState } from 'react'
import './App.css'

function App() {
  const [storeName, setStoreName] = useState('')
  const [eventToDetect, setEventToDetect] = useState('')

  const handleConnectCamera = () => {
    // 카메라 연결 로직 구현
    console.log('Connecting camera...')
  }

  return (
    <div className="app">
      <div className="background">
        {/* 대각선 배경 */}
        <div className="diagonal-background"></div>
        
        {/* 카메라 그래픽 */}
        <div className="camera-graphic">
          <div className="camera-body">
            <div className="camera-lens"></div>
            <div className="camera-mount"></div>
          </div>
          <div className="light-beam"></div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="content">
          <div className="welcome-text">
            <h1>Welcome to OMNi</h1>
            <div className="underline"></div>
          </div>

          <div className="form-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter the store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="input-field"
              />
              <div className={`status-icon ${storeName ? 'valid' : 'pending'}`}>
                {storeName ? '✓' : '-'}
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Define the Event to detect"
                value={eventToDetect}
                onChange={(e) => setEventToDetect(e.target.value)}
                className="input-field"
              />
              <div className={`status-icon ${eventToDetect ? 'valid' : 'pending'}`}>
                {eventToDetect ? '✓' : '-'}
              </div>
            </div>

            <button 
              className="connect-button"
              onClick={handleConnectCamera}
            >
              Connect a Camera
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App