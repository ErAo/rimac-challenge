import { useState } from 'react';

export default function useStorage() {
    const [storage, setStorage] = useState(localStorage);

    const setItem = (key, value) => {
        setStorage((prev) => {
            prev.setItem(key, value);
            return prev;
        });
    }

    const getItem = (key) => storage.getItem(key);

    const removeItem = (key) => {
        setStorage((prev) => {
            prev.removeItem(key);
            return prev;
        });
    }

    const clear = () => {
        setStorage((prev) => {
            prev.clear();
            return prev;
        });
    }

    return {
        storage,
        setItem,
        getItem,
        removeItem,
        clear
    };
}