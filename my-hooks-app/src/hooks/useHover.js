import { useState, useRef, useEffect } from 'react';
export function useHover() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

        const element = ref.current;
        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return [ref, hovered];
}
