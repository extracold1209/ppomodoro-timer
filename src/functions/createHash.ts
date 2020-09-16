export default (target: string = Math.random().toString()) => {
    let hash = 0;

    for (let i = 0; i < target.length; i++) {
        const chr = target.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
