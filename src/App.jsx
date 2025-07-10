import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <main>
        <div className='welcome'>
          <div className="welcome--message">
            <h4 className='welcome--message--title'>Os CPU Scheduling</h4>
            <p className='welcome--messsage--paragraph'>Explore and understand CPU scheduling algorithms for efficient process management!</p>
          </div>
          <div className="welcome--graphic">WELCOME</div>
        </div>

        <div className='algorithms'>
          <div className='algorithms--fcfs'>
            <p className='algorithms--fcfs--title'>FCFS</p>
            <div className='algorithms--fcfs--description-button'>
              <p className='fcfs--description'>Proceess are excuted in the order they arrive. Simple but can lead to long waiting times.</p>
              <button className="fcfs--choose">choose</button>
            </div>
          </div>

          <div className='algorithms--sjf'>
            <p className='algorithms--sjf--title'>SJF</p>
            <div className='algorithms--sjf--description-button'>
              <p className="sjf--description">
                Executes the process with the shortest burst time first. Efficient but may cause longer jobs to wait.
              </p>
              <button className="sjf--choose">choose</button>
            </div>
          </div>

          <div className='algorithms--priority'>
            <p className='algorithms--priority--title'>Priority</p>
            <div className='algorithms--priority--description-button'>
              <p className="priority--description">Runs the process with the highest priority first. Lower priority processes may wait longer.</p>
              <button className="priority--choose">choose</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
