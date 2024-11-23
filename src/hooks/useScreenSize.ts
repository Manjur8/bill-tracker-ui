import { useEffect, useState } from "react";

const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export default function useScreenSize() {
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        const onResize = () => {
            setScreenSize(getScreenSize());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return screenSize;
}