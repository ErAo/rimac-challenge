import { createContext } from 'react';
import { useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ step, setStep ] = useState(1)

    const ageByDate = (date) => {
        const birthDate = new Date(date);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <AppContext.Provider value={{
            user,
            ageByDate,
            setUser,
            step,
            setStep
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };