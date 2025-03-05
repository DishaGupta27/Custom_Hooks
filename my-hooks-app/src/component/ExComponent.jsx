import React, { useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDebounce } from "../hooks/useDebounce";
import { useWindowSize } from "../hooks/useWindowSize";
import { usePrevious } from "../hooks/usePrevious";
import { useHover } from "../hooks/useHover";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useTimeout } from "../hooks/useTimeout";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function ExampleComponent() {

    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");


    const [name, setName] = useLocalStorage("name", "Disha");


    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);


    const size = useWindowSize();


    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);


    const [hoverRef, isHovered] = useHover();


    const modalRef = useRef();
    const [isModalOpen, setModalOpen] = useState(true);
    useOnClickOutside(modalRef, () => setModalOpen(false));


    useTimeout(() => alert("Time's up!"), 3000);


    const sectionRef = useRef();
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.5 });


    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    return (
        <div>
            {/* useFetch */}
            <h2>useFetch Example</h2>
            {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <p>Data Loaded</p>}

            {/* useLocalStorage */}
            <h2>useLocalStorage Example</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            {/* useDebounce */}
            <h2>useDebounce Example</h2>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <p>Debounced Value: {debouncedSearch}</p>

            {/* useWindowSize */}
            <h2>useWindowSize Example</h2>
            <p>Width: {size.width} | Height: {size.height}</p>

            {/* usePrevious */}
            <h2>usePrevious Example</h2>
            <p>Current: {count} | Previous: {prevCount}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>

            {/* useHover */}
            <h2>useHover Example</h2>
            <div ref={hoverRef} style={{ padding: "10px", background: isHovered ? "yellow" : "lightgray" }}>
                Hover Over Me
            </div>

            {/* useOnClickOutside */}
            <h2>useOnClickOutside Example</h2>
            {isModalOpen && <div ref={modalRef} style={{ padding: "20px", border: "1px solid black" }}>Click outside to close me</div>}

            {/* useIntersectionObserver */}
            <h2>useIntersectionObserver Example</h2>
            <div ref={sectionRef} style={{ marginTop: "50vh", height: "100px", background: isVisible ? "green" : "red" }}>
                {isVisible ? "Visible" : "Not Visible"}
            </div>

            {/* useMediaQuery */}
            <h2>useMediaQuery Example</h2>
            <p>Small Screen: {isSmallScreen ? "Yes" : "No"}</p>
        </div>
    );
}
