import { useEffect } from 'react';
export function useTimeout(callback, delay) {
    useEffect(() => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }, [callback, delay]);
}