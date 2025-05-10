import React, { useState } from 'react'
import './State.css'

function RateUS() {
    

    const [count, setCount] = useState(0)
    
    function increment(){
        if(count<10){
            setCount((prevState)=> (prevState +1) )
        }
    }
    function decrement(){
        if(count>0){
            setCount((prevState)=> (prevState -1) )
        }
    }
    function reset(){
        setCount(()=> 0 )
    }
  return (
    <>
    <br />
    <br />
    <br />
                <div className="counter-container">
                    <h1 className="counter-value">Rate us</h1>
                    <div className="counter-value-real" id="value">You rate us:{count}</div>
                    <div className="button-group">
                    <button className="btn increment" onClick={increment}>Increment</button>
                    <button className="btn decrement" onClick={decrement}>Decrement</button>
                    </div>
                </div>

    </>
  )
}

export default RateUS
