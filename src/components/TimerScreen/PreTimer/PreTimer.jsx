import { timerData } from "./TimeData";
import { useState, useEffect, useRef } from "react";
import './preTimer.css';
import 'animate.css';

import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase/firebase";


const PreTimer = () => {

  

  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("stop");
  // eslint-disable-next-line no-unused-vars
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const statusRef = ref(db, "timer/status");
    const timeRef = ref(db, "timer/time");

    const unsubscribeStatus = onValue(statusRef, (snapshot) => {
      setStatus(snapshot.val());
    });

    const unsubscribeTime = onValue(timeRef, (snapshot) => {
      if (snapshot.val() !== null) setTime(snapshot.val());
    });

    return () => {
      unsubscribeStatus();
      unsubscribeTime();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (status === "start") {
      setIsRunning(true);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (status === "pause") {
      setIsRunning(false);
      clearInterval(interval);
    } else if (status === "reset") {
      setIsRunning(false);
      setTime(0);
      clearInterval(interval);
    } else if (status === "stop") {
      setIsRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  return (
    <div className="pretimer_container">

      
        
            
            <div className="timer_display_board">

        {formatTime(time)}

            </div>
        
        
    
    </div>
  );
};

export default PreTimer;
