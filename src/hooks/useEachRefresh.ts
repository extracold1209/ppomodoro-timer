import {useEffect} from 'react';

type DependencyList = any | any[];
type Target = any;
type SetStateAction = (target: any) => void;

export default (...pairs: [DependencyList, Target, SetStateAction][]) => {
    pairs.forEach(([deps, target, setState]) => {
        useEffect(() => {
            setState(target);
        }, Array.isArray(deps) ? deps : [deps]);
    });
};
