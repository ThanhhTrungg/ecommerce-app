import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [deBounceValue, setDebounceValue] = useState();

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value, delay));

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return deBounceValue;
};

export default useDebounce;
