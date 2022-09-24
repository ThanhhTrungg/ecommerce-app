import { useEffect, useState } from "react";

const useViewPort = () => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;

    const [windowSize, setWindowSize] = useState({ width, height });

    useEffect(() => {
        const handleSize = () => {
            setWindowSize({ width, height });
        };
        handleSize();
        window.addEventListener("resize", handleSize);

        return () => {
            window.removeEventListener("resize", handleSize);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [windowSize];
};

export default useViewPort;
