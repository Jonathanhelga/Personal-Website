import { useState, useEffect } from "react";
function getWindowSize(){
    if (typeof window === 'undefined') {
        return { width: 0, height: 0, pixelRatio: 1 };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    };
}
export default function useSizes(){
    const [sizes, setSizes] = useState(getWindowSize)
    useEffect(()=> {
        const onResize = () => {
            setSizes({
                width: window.innerWidth,
                height: window.innerHeight,
                pixelRatio: Math.min(window.devicePixelRatio || 1, 2)
            })
        }
        
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
        onResize();

        return () => { //only called when unmounts happen (when the component is removed (React deletes it from the page).)
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
        }
    }, [])
    return sizes;
}