import {useCallback, useEffect, useState} from 'react';

export default (initialSecond: number): [() => void, () => void, number, (newInitialSecond: number) => void] => {
    const [remainSeconds, changeSeconds] = useState(initialSecond);
    const [isStarted, setToggle] = useState(false);
    const start = useCallback(() => {
        setToggle(true);
    }, []);
    const stop = useCallback(() => {
        setToggle(false);
    }, []);

    useEffect(() => {
        let timeout: number | undefined = undefined;

        if (!isStarted) {
            timeout && clearTimeout(timeout);
            changeSeconds(initialSecond);
        } else {
            timeout = window.setTimeout(() => {
                if (remainSeconds === 0) {
                    clearTimeout(timeout);
                } else {
                    changeSeconds(remainSeconds - 1);
                }
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [isStarted, remainSeconds, initialSecond]);

    return [start, stop, remainSeconds, changeSeconds];
};
