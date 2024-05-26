import { createContext } from 'react';
import { useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ step, setStep ] = useState(1)
    const [ stepLoading, setStepLoading ] = useState(true)

    // calculate user age by user birth date
    const ageByDate = (date) => {
        const birthDate = new Date(date);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // control step changing to show loading animation
    const changeStep = (newStep) => {
        setStepLoading(true)
        setStep(newStep)
        setTimeout(() => {
            setStepLoading(false)
        }, 300)
    }

    return (
        <AppContext.Provider value={{
            user,
            ageByDate,
            setUser,
            step,
            setStep: changeStep,
            stepLoading,
            setStepLoading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };