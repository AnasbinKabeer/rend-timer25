import { useState, useEffect, useRef, useContext } from "react";
import './preTimer.css';
import 'animate.css';
import { TimerData } from '../TimerData';
import { TimerContext } from "../../Context/TimerContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase/firebase";


const PreTimer = () => {
  const { preTime, setPreTime , timeId, setTimeId} = useContext(TimerContext);

  
  // const [pretime, setPreTime] = useState(0);
  const [status, setStatus] = useState("stop");
  const autoWarnimgBellRef = useRef(new Audio('/autoWarning.mp3'));
  const autoLastBellRef = useRef(new Audio('/autolast.mp3'));

  // eslint-disable-next-line no-unused-vars
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {
    const statusRef = ref(db, "timer/status");
    const timeRef = ref(db, "timer/time");
    const timeIdRef = ref(db, "timer/timeId");

    const unsubscribeStatus = onValue(statusRef, (snapshot) => {
      setStatus(snapshot.val());
    });

    const unsubscribeTime = onValue(timeRef, (snapshot) => {
      if (snapshot.val() !== null) setPreTime(snapshot.val());
    });

    const unsubscribeTimeId = onValue(timeIdRef, (snapshot) => {
     setTimeId(snapshot.val());
    });

    return () => {
      unsubscribeStatus();
      unsubscribeTime();
      unsubscribeTimeId();
    };
  }, []);
///////////////////////////////////////////////

const parseTimeToSeconds = (timeStr) => {
  const [minutes, seconds] = timeStr.split(":").map(Number);
  return minutes * 60 + seconds;
};

    const warningTimeInSeconds = parseTimeToSeconds(TimerData[timeId].warning);
    const finalTimeInSeconds = parseTimeToSeconds(TimerData[timeId].final);


    const autoWarningBell = () => {
      // setAlertMessage("Warning bell!");
      autoWarnimgBellRef.current.play();
      // setDisbell(true);
      // triggerAnimation("fadeInDown");

      // setTimeout(() => {
      //     setAlertMessage("");
      //     setDisbell(false);
      // }, 3000);
  };

  const autoLastBell = () => {
    // setDisbell(true);
    // let countdown = 10;
    // setAlertMessage(`Final bell rings in ${countdown} seconds`);
    // setCancelVisible(true);
    // clearInterval(countdownIntervalRef.current); // Clear any previous interval
    // countdownIntervalRef.current = setInterval(() => {
    //     countdown -= 1;
    //     setAlertMessage(`Final bell rings in ${countdown} seconds`);


    //     if (countdown === 0) {
    //         clearInterval(countdownIntervalRef.current);
    //         setCancelVisible(false);

    //         setAlertMessage("Final Bell");
    //         triggerAnimation("fadeInDown");

    //         setTimeout(() => {
    //             setAlertMessage("");
    //             setDisbell(false);
    //         }, 1000);
    //     }
    // }, 1005);

    autoLastBellRef.current.play();
};


useEffect(() => {
  if (preTime === warningTimeInSeconds) {
      autoWarningBell();
  }
  if (preTime === finalTimeInSeconds) {
      autoLastBell();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [preTime, warningTimeInSeconds, finalTimeInSeconds]);






  // ________________________________________

  useEffect(() => {
    let interval;
    if (status === "start") {
      setIsRunning(true);
      interval = setInterval(() => {
        setPreTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (status === "pause") {
      setIsRunning(false);
      clearInterval(interval);
    } else if (status === "reset") {
      setIsRunning(false);
      setPreTime(0);
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

        {formatTime(preTime)}

            </div>
        
        
    
    </div>
  );
};

export default PreTimer;
