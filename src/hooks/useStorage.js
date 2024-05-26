export default function useStorage() {
    const setItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getItem = (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            return localStorage.getItem(key);
        }
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
    }

    const clear = () => {
        localStorage.clear();
    }

    return {
        setItem,
        getItem,
        removeItem,
        clear
    };
}