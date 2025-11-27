import {useState, useEffect} from 'react'
import useSizes from './Sizes';

export default function useCursor(){
    const {width, height} = useSizes()
    const [cursor, setCursor] = useState({x:0, y:0});
    useEffect(() => {
        const onMouseMove = (event) => {
            const newX = (event.clientX / width) - 0.5;
            const newY = (event.clientY / height) - 0.5;
            setCursor({ x:newX,  y:newY})
            // console.log(newX, newY);
        }
        window.addEventListener('mousemove', onMouseMove)
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [width, height])

    return cursor
}
