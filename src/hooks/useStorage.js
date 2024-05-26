export default function useStorage() {
    const KEYS = {
        FORM_QUOTE: btoa('form_quote'),
        PLAN_SELECTION: btoa('plan_selection'),
    }

    const setItem = (key, value) => {
        localStorage.setItem(key, btoa(JSON.stringify(value)));
    }

    const getItem = (key) => {
        try {
            return JSON.parse(atob(localStorage.getItem(key)));
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
        clear,
        KEYS
    };
}