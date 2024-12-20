import { createContext, useState } from "react";

export const TimerContext = createContext();

export  const TimerProvider = ({ children }) => {

        const [preTime , setPreTime] = useState(0)
        const [timeId, setTimeId ] = useState(0);
          
    return (
        <TimerContext.Provider
            value={{

                
                preTime , setPreTime,timeId, setTimeId
                
            }}
            >
                {children}
            </TimerContext.Provider>
        );
    };
    